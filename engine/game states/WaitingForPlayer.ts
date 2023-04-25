import Game from "../../models/Game.js";
import { EthicalAlignment, MoralAlignment } from "../../types/AlignmentType";
import { Visibility } from "../../types/VisibilityEnum";
import IGameState from "./IGameState";
import GAME_ACTIONS from "../../types/GameActions.js";
import cards from "../../data/cards.js";
import { TurnState } from "../../types/TurnStateEnum";
import User from "../../models/User.js";

export default class WaitingForPlayerState implements IGameState {
    actionsMap = {
        [GAME_ACTIONS.ACTIVATE_CARD]: this.activateCard.bind(this),
        [GAME_ACTIONS.END_TURN]: this.endTurn.bind(this)
    };

    onEnter(state: Record<string, any>): void {
        state.state = WaitingForPlayerState.name;
    };
    onExit(state: Record<string, any>): void { };

    public startRound(game: Game) {
        if (game.state.game == undefined) throw new Error("Cannot start round when there is no game")
        const prevRound = game.state.game.round

        // Empty hand and board
        game.state.game.discard.concat(
            prevRound.players.player.hand,
            prevRound.players.player.board.map(
                card => { return Object.assign({}, { card: card, visibility: Visibility.Public }) }
            ),
            prevRound.players.creator.hand,
            prevRound.players.creator.board.map(
                card => { return Object.assign({}, { card: card, visibility: Visibility.Public }) }
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
                    turn: prevRound.number % 2 == 1 ? TurnState.Waiting : TurnState.Ready,
                },
                player: {
                    board: [],
                    hand: [],
                    wager: 0,
                    ethicalAlignment: EthicalAlignment.Neutral,
                    turn: prevRound.number % 2 == 0 ? TurnState.Waiting : TurnState.Ready,
                }
            }
        }

        game.logger.log('trace', "About to deal hands")

        // deal hands
        this._dealHand(newRound.players.creator.hand, game.state.game.deck, Visibility.Creator)
        this._dealHand(newRound.players.player.hand, game.state.game.deck, Visibility.Player)

        game.state.game.round = newRound
    }

    async activateCard(game: Game, data: Record<string, unknown>): Promise<WaitingForPlayerState> {
        game.logger.log('trace', 'Starting the Activate Card function')
        // Pre-assertions
        if (
            !data ||
            !data.hasOwnProperty('card') ||
            typeof data.card != 'number' ||
            game.state.game === undefined
        ) {
            game.logger.log('warn', 'One of the activateCard preassertions failed')
            return this;
        }
        if (!game.players![game.getTurn()].hand.map(card => card.card).includes(data.card)) {
            game.logger.log('warn', 'card was not in current players hand')
            return this
        }

        if(game.players![game.getTurn()].turn != TurnState.Ready) {
            game.logger.log('debug', 'The player cannot play anymore cards this turn')
            return this
        }

        // Pay wager
        game.payWager(game.getTurn(), cards[data.card].wager)

        // Move card to field
        game.players![game.getTurn()].hand.forEach((card, i) => {
            if(card.card == data.card) game.players![game.getTurn()].hand.splice(i,1)
        })
        
        game.players![game.getTurn()].board.push(data.card)

        // Activate card effect
        // TODO

        // Set Turn State
        game.players![game.getTurn()].turn = TurnState.Played

        return new WaitingForPlayerState
    }

    async endTurn(game: Game, data: Record<string, unknown>): Promise<WaitingForPlayerState> {
        if(game.state.game === undefined || 
            game.player === undefined || 
            !data.hasOwnProperty("user") ||
            !(data.user instanceof User)
            ) { 
            game.logger.warn("end turn preassetion failed")
            return this; 
        }
        if(game[game.getTurn()]!.id != data.user.id) { 
            game.logger.debug("This player cannot end their turn. It is not their turn")
            return this
        }

        let player = game.getTurn()
        let enemy = Game.getOther(player)

        if(game.players![enemy].turn == TurnState.Resting) {
            // End round
            game.logger.debug("Ending Round")
            return this
        }

        switch (game.players![player].turn) {
            case TurnState.FreePlayed:
            case TurnState.Played:
                game.players![player].turn = TurnState.Waiting
                break;
            case TurnState.Ready:
                game.players![player].turn = TurnState.Resting
                break;
        }

        game.players![enemy].turn = TurnState.Ready

        return this
    } 

    _dealHand(hand: { card: number, visibility: Visibility }[], deck: number[], playerVisibility: Visibility) {
        for (let i = 0; i < 4; i++) {
            hand.push(
                {
                    card: deck.pop()!,
                    visibility: i == 0 ? Visibility.Public : playerVisibility
                }
            )

        }
    }
}