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

    public globalActions: Record<string,(state: GameStateObject, data: Object) => Promise<IGameState>> = {
        [GAME_ACTIONS.CONNECT]: (state, data) => this.handleConnection(state, data),
        [GAME_ACTIONS.DISCONNECT]: (state, data) => this.handleDisconnection(state,data)
    }

    private _currentState: IGameState = new LobbyState;
    private _stateObject: GameStateObject = {
        state: LobbyState.name,
        players: {
            creator: [],
            player: [],
            guests: {}
        }
    };
    private _game: Game;

    constructor(game: Game, state?: GameStateObject) {
        this._game = game
        if(typeof state !== 'undefined') {
            this.loadState(state)
        }
    }

    setState(state: IGameState) {
        if(this._currentState !== undefined) {
            if(typeof this._currentState === typeof state) { 
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

    async processAction(action: string, content: Object) {
        console.log(`Processing Action ${action}`)
        let newGameState = this._currentState
        if(this.globalActions[action] !== undefined) {
            newGameState = await this.globalActions[action](this._stateObject, content)
        } 

        this.setState(newGameState)
    }

    getStateObject(): Record<string, any> {
        return this._stateObject
    }

    async handleConnection(state: GameStateObject, data: Object): Promise<IGameState> {
        const socket = data as Socket
        await this._game.load()

        // Check if they're the creator
        if(this._game.creator.id == socket.data.user.id) {
            this._stateObject.players.creator.push(socket.id)
        }
        // Check if they're the player
        else if(typeof this._game.player !== 'undefined' && this._game.player.id == socket.data.user.id) {
            this._stateObject.players.player.push(socket.id)
        } else {
            // They're a guest
            if(this._stateObject.players.guests[socket.data.user.id] !== undefined) {
                this._stateObject.players.guests[socket.data.user.id].push(socket.id)
            } else {
                this._stateObject.players.guests[socket.data.user.id] = [socket.id]
            }
        }
        return this._currentState;
    }

    async handleDisconnection(state: GameStateObject, data: Object): Promise<IGameState> {
        return this._currentState;
    }
}