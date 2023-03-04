import GAME_ACTIONS from "../../types/GameActions.js";
import GameStateObject from "../../types/GameStateType";
import IGameState from "./IGameState";

export default class LobbyState implements IGameState {
    actionsMap = {
        [GAME_ACTIONS.SELECT_OPPONENT]: this.setOpponent,
        [GAME_ACTIONS.START_GAME]: this.startGame
    }

    onEnter(state: Record<string, any>): void {
        state.state = LobbyState.name;
    };
    onExit(state: Record<string, any>): void {};

    setOpponent(state: GameStateObject, data: Object): IGameState {
        return this;
    }

    startGame(state: GameStateObject, data: Object): IGameState {
        return this;
    }
}