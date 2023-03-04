import IGameState from "./IGameState";

export default class ProcessingState implements IGameState {
    actionsMap = {};
    onEnter(state: Object): void {};
    onExit(state: Object): void {};
}