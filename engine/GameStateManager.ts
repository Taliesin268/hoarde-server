import { Socket } from "socket.io";
import Game from "../models/Game.js"
import GAME_ACTIONS from "../types/GameActions.js";
import GameStateObject from "../types/GameStateType";
import IGameState from "./game states/IGameState"
import LobbyState from "./game states/Lobby.js"
import ProcessingState from "./game states/Processing.js";
import WaitingForPlayerState from "./game states/WaitingForPlayer.js";

export default class GameStateManager {
    static possibleStates: Record<string, IGameState> = {
        [LobbyState.name]: new LobbyState,
        [ProcessingState.name]: new ProcessingState,
        [WaitingForPlayerState.name]: new WaitingForPlayerState
    }

    public globalActions: Record<string, (state: GameStateObject, socket: Socket, prevState: IGameState) => Promise<IGameState>> = {
        [GAME_ACTIONS.CONNECT]: (state, socket, prevState) => this.handleConnection(state, socket, prevState),
        [GAME_ACTIONS.DISCONNECT]: (state, socket, prevState) => this.handleDisconnection(state, socket, prevState)
    }

    private _currentState!: IGameState;
    private _stateObject: GameStateObject = {
        state: LobbyState.name,
        players: {
            creator: [],
            player: [],
            guests: {} 
        },
    };
    private _game: Game;

    constructor(game: Game, state?: GameStateObject) {
        this._game = game
        this.loadState(state)
    }

    setState(state: IGameState) {
        if (this._currentState !== undefined) {
            this._game.logger.debug(`Setting current state (${this._currentState.constructor.name}) to ${state.constructor.name}`)
            if (state.constructor.name === this._currentState.constructor.name) {
                return;
            }
            this._currentState.onExit(this._stateObject);
        }
        this._currentState = state;
        this._currentState.onEnter(this._stateObject);
        this._game.logger.log('trace',`Successfully set state to ${state.constructor.name}`)
    }

    loadState(state: GameStateObject | undefined) {
        if(state == undefined) { this._currentState = new LobbyState; return }
        this._stateObject = state;
        this._currentState = GameStateManager.possibleStates[state.state];
    }

    async processAction(action: string, content: Record<string, unknown>) {
        this._game.logger.log('trace', `The current state is ${this._currentState.constructor.name}`)
        // Create a new copy of the game state
        let newGameState = this._currentState
        this.setState(new ProcessingState());
        await this._game.save();

        if (this.globalActions[action] !== undefined) {
            if(GameStateManager.isSocket(content)) {
                newGameState = await this.globalActions[action](this._stateObject, content, newGameState)
            }
        } else if (newGameState.actionsMap[action] !== undefined){
            newGameState = await newGameState.actionsMap[action](this._game, content)
        }

        this.setState(newGameState)
    }

    static isSocket(variable: unknown): variable is Socket {
        return variable instanceof Socket;
    }

    getStateObject(): GameStateObject {
        return this._stateObject
    }

    async handleConnection(state: GameStateObject, socket: Socket, prevState: IGameState): Promise<IGameState> {
        // Check if they're the creator
        if (this._game.creator.id == socket.data.user.id) {
            state.players.creator.push(socket.id)
        }
        // Check if they're the player
        else if (typeof this._game.player !== 'undefined' && this._game.player.id == socket.data.user.id) {
            state.players.player.push(socket.id)
        } else {
            // They're a guest
            if (state.players.guests[socket.data.user.id] !== undefined) {
                state.players.guests[socket.data.user.id].sockets.push(socket.id)
            } else {
                state.players.guests[socket.data.user.id] = {name: socket.data.user.name, sockets: [socket.id]}
            }
        }

        this._game.logger.info(`A user connected: ${socket.data.user.id}`)

        return prevState;
    }

    async handleDisconnection(state: GameStateObject, socket: Socket, prevState: IGameState): Promise<IGameState> {
        // Remove from Creators
        let creatorIndex = state.players.creator.indexOf(socket.id)
        if (creatorIndex > -1) { state.players.creator.splice(creatorIndex, 1) }

        // Remove from players
        let playerIndex = state.players.creator.indexOf(socket.id)
        if (playerIndex > -1) { state.players.creator.splice(playerIndex, 1) }

        // Remove from guests
        let guest = state.players.guests[socket.data.user.id]
        if (guest !== undefined) {
            let guestIndex = guest.sockets.indexOf(socket.id)
            if (guestIndex > -1) { guest.sockets.splice(guestIndex, 1) }
            if(guest.sockets.length <= 0) {
                delete state.players.guests[socket.data.user.id]
            }
        }

        this._game.logger.info(`A user disconnected: ${socket.data.user.id}`)

        return prevState;
    }
}