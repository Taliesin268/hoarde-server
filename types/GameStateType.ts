import { EthicalAlignment, MoralAlignment } from "./AlignmentType";
import Card from "./CardType";
import { Turn } from "./TurnEnum";
import { Visibility } from "./VisibilityEnum";
import { TurnState } from "./TurnStateEnum"



type PlayerBoardState = {
    board: number[],
    hand: {
        card: number,
        visibility: Visibility
    }[],
    wager: number,
    ethicalAlignment: EthicalAlignment,
    turn: TurnState
}

type GameStateObject = {
    state: string;
    players: { // Strings are socket IDs
        creator: string[],
        player: string[],
        guests: Record<string, { name: string, sockets: string[]}>
    };
    game?: {
        deck: number[],
        discard: {
            card: number
            visibility: Visibility
        }[],
        players: {
            creator: {
                gold: number
            },
            player: {
                gold: number
            }
        },
        effects: []; // TODO
        round: {
            number: number,
            moralAlignment: MoralAlignment,
            players: {
                creator: PlayerBoardState,
                player: PlayerBoardState
            }
        }
    }
}

export default GameStateObject