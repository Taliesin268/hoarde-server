import Game from "../../models/Game";
import { EthicalAlignment, MoralAlignment } from "../../types/AlignmentType";
import Card from "../../types/CardType";
import { Visibility } from "../../types/VisibilityEnum";
import IGameState from "./IGameState";

export default class WaitingForPlayerState implements IGameState {
    actionsMap = {

    };

    onEnter(state: Record<string, any>): void {
        state.state = WaitingForPlayerState.name;
    };
    onExit(state: Record<string, any>): void { };

    public startRound(game: Game){
        if(game.state.game == undefined) throw new Error("Cannot start round when there is no game")
        const prevRound = game.state.game.round

        // Empty hand and board
        game.state.game.discard.concat(
            prevRound.players.player.hand,
            prevRound.players.player.board.map(
                card => { return Object.assign({},{card: card, visibility: Visibility.Public})}
            ),
            prevRound.players.creator.hand,
            prevRound.players.creator.board.map(
                card => { return Object.assign({},{card: card, visibility: Visibility.Public})}
            )
        )

        const newRound = {
            number: prevRound.number + 1,
            moralAlignment: MoralAlignment.Neutral,
            players: {
                creator: {
                    board: [],
                    hand: [],
                    wager: 0,
                    ethicalAlignment: EthicalAlignment.Neutral,
                    turn: !prevRound.players.creator.turn,
                    resting: false
                },
                player: {
                    board: [],
                    hand: [],
                    wager: 0,
                    ethicalAlignment: EthicalAlignment.Neutral,
                    turn: !prevRound.players.player.turn,
                    resting: false
                }
            }
        }

        game.logger.log('trace', "About to deal hands")

        // deal hands
        this._dealHand(newRound.players.creator.hand, game.state.game.deck, Visibility.Creator)
        this._dealHand(newRound.players.player.hand, game.state.game.deck, Visibility.Player)

        game.state.game.round = newRound
    }

    _dealHand(hand: {card: Card, visibility: Visibility}[], deck: Card[], playerVisibility: Visibility) {
        for(let i = 0; i < 4; i++) {
            hand.push(
                {
                    card: deck.pop()!,
                    visibility: i == 0 ? Visibility.Public : playerVisibility
                }
            )

        }
    }
}