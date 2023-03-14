import Game from "../../models/Game.js";
import User from "../../models/User.js";
import GAME_ACTIONS from "../../types/GameActions.js";
import IGameState from "./IGameState";

export default class LobbyState implements IGameState {
    actionsMap = {
        [GAME_ACTIONS.SELECT_OPPONENT]: this.setOpponent,
        [GAME_ACTIONS.START_GAME]: this.startGame
    }

    onEnter(state: Record<string, any>): void {
        state.state = LobbyState.name;
    };
    onExit(state: Record<string, any>): void { };

    async setOpponent(game: Game, data: Record<string, unknown>): Promise<IGameState> {
        if (typeof data.id != 'string') { console.log('Error: no player ID provided'); return this; }

        if (game.player != undefined) { LobbyState._returnPlayerToGuest(game) }

        game.player = await User.find(data.id)
        game.state.players.player = game.state.players.guests[data.id].sockets
        delete game.state.players.guests[data.id]

        return this;
    }

    static _returnPlayerToGuest(game: Game) {
        if (game.player == undefined) throw new Error('Player is supposed to be defined');
        game.state.players.guests[game.player.id] = {
            name: game.player.name,
            sockets: game.state.players.player
        }

        delete game.player
    }

    async startGame(game: Game, data: Object): Promise<IGameState> {
        return this;
    }
}