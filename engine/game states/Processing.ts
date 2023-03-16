import IGameState from "./IGameState";

export default class ProcessingState implements IGameState {
    actionsMap = {};
    onEnter(state: Record<string, any>): void {
        state.state = ProcessingState.name;
    };
    onExit(state: Record<string, any>): void { };
}