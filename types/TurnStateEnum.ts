export const enum TurnState {
    Ready = "Ready",
    Played = "Played",
    Waiting = "Waiting",
    Resting = "Resting",
    FreePlayed = "FreePlayed"
}

export function isPlayersTurn(turnState: TurnState): boolean {
    return turnState == TurnState.Ready || turnState == TurnState.Played || turnState == TurnState.FreePlayed
}