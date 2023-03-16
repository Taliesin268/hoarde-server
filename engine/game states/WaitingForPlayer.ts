import IGameState from "./IGameState";

export default class WaitingForPlayerState implements IGameState {
    actionsMap = {

    };

    onEnter(state: Record<string, any>): void {
        state.state = WaitingForPlayerState.name;
    };
    onExit(state: Record<string, any>): void { };
}