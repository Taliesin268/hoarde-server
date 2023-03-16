import { Socket } from "socket.io";
import Game from "../models/Game"
import GAME_ACTIONS from "../types/GameActions.js";
import GameStateObject from "../types/GameStateType";
import IGameState from "./game states/IGameState"
import LobbyState from "./game states/Lobby.js"

export default class GameStateManager {
    static possibleStates: Record<string, IGameState> = {
        [LobbyState.name]: new LobbyState
    }

    public globalActions: Record<string, (state: GameStateObject, socket: Socket) => Promise<IGameState>> = {
        [GAME_ACTIONS.CONNECT]: (state, socket) => this.handleConnection(state, socket),
        [GAME_ACTIONS.DISCONNECT]: (state, socket) => this.handleDisconnection(state, socket)
    }

    private _currentState: IGameState = new LobbyState;
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
        if (typeof state !== 'undefined') {
            this.loadState(state)
        }
    }

    setState(state: IGameState) {
        if (this._currentState !== undefined) {
            if (typeof this._currentState === typeof state) {
                return;
            }
            this._currentState.onExit(this._stateObject);
        }
        this._currentState = state;
        this._currentState.onEnter(this._stateObject);
    }

    loadState(state: GameStateObject) {
        this._stateObject = state;
        this._currentState = GameStateManager.possibleStates[state.state];
    }

    async processAction(action: string, content: Record<string, unknown>) {
        console.log(`Processing Action '${action}'`)
        let newGameState = this._currentState
        if (this.globalActions[action] !== undefined) {
            if(GameStateManager.isSocket(content))
                newGameState = await this.globalActions[action](this._stateObject, content)
        } else if (this._currentState.actionsMap[action] !== undefined){
            newGameState = await this._currentState.actionsMap[action](this._game, content)
        }


        this.setState(newGameState)
    }

    static isSocket(variable: unknown): variable is Socket {
        return variable instanceof Socket;
    }

    getStateObject(): GameStateObject {
        return this._stateObject
    }

    async handleConnection(state: GameStateObject, socket: Socket): Promise<IGameState> {
        await this._game.load()

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

    }

    async handleDisconnection(state: GameStateObject, socket: Socket): Promise<IGameState> {
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

        return this._currentState;
    }
}