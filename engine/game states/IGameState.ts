import GameStateObject from "../../types/GameStateType";

export default interface IGameState {
    actionsMap: Record<string, (state: GameStateObject, data: Object) => IGameState>;
    onEnter: (state: Object) => void;
    onExit: (state: Object) => void;
}