import Game from "../../models/Game";

export default interface IGameState {
    actionsMap: Record<string, (game: Game, data: Record<string, unknown>) => Promise<IGameState>>;
    onEnter: (state: Object) => void;
    onExit: (state: Object) => void;
}