import { EthicalAlignment, MoralAlignment } from "./AlignmentType";
import Card from "./CardType";
import { Turn } from "./TurnEnum";
import { Visibility } from "./VisibilityEnum";

type PlayerBoardState = {
    board: Card[],
    hand: {
        card: Card,
        visibility: Visibility
    }[],
    wager: number,
    ethicalAlignment: EthicalAlignment,
    turn: boolean,
    resting: boolean
}

type GameStateObject = {
    state: string;
    players: { // Strings are socket IDs
        creator: string[],
        player: string[],
        guests: Record<string, { name: string, sockets: string[]}>
    };
    game?: {
        deck: Card[],
        discard: {
            card: Card
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
        turn: Turn;
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