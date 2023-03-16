import cards from "../../data/cards.js";
import Game from "../../models/Game.js";
import User from "../../models/User.js";
import { EthicalAlignment, MoralAlignment } from "../../types/AlignmentType.js";
import GAME_ACTIONS from "../../types/GameActions.js";
import { Turn } from "../../types/TurnEnum.js";
import IGameState from "./IGameState";
import WaitingForPlayerState from "./WaitingForPlayer.js";
import logger from "../../logger.js";

export default class LobbyState implements IGameState {
    actionsMap = {
        [GAME_ACTIONS.SELECT_OPPONENT]: this.setOpponent.bind(this),
        [GAME_ACTIONS.START_GAME]: this.startGame.bind(this)
    }

    onEnter(state: Record<string, any>): void {
        state.state = LobbyState.name;
    };
    onExit(state: Record<string, any>): void { };

    async setOpponent(game: Game, data: Record<string, unknown>): Promise<IGameState> {
        if (typeof data.id != 'string') { game.logger.warn('Error: no player ID provided'); return this; }

        game.logger.debug(`Setting Opponent to ${data.id}`)

        if (game.player != undefined) { LobbyState._returnPlayerToGuest(game) }

        game.player = await User.find(data.id)
        if (typeof game.state.players.guests[data.id] == 'undefined') {
            game.state.players.player = []
        } else {
            game.state.players.player = game.state.players.guests[data.id].sockets
        }
        delete game.state.players.guests[data.id]

        console.groupEnd();
        return new LobbyState;
    }

    static _returnPlayerToGuest(game: Game) {
        if (game.player == undefined) throw new Error('Player is supposed to be defined');

        if (game.state.players.player.length > 0) {
            game.state.players.guests[game.player.id] = {
                name: game.player.name,
                sockets: game.state.players.player
            }
        } 

        delete game.player
    }

    async startGame(game: Game, data: Object): Promise<IGameState> {
        game.logger.info('Starting Game')

        // init game object
        this._initGameObject(game)
        // shuffle deck
        // start round


        return new WaitingForPlayerState;
    }

    _initGameObject(game:Game) {
        game.state.game = {
            deck: cards,
            discard: [],
            players: {
                creator: {
                    gold: 50
                },
                player: {
                    gold: 50
                }
            },
            effects: [],
            turn: Turn.Creator,
            round: {
                number: 0,
                moralAlignment: {
                    alignment: MoralAlignment.Neutral,
                    traits: []
                },
                players: {
                    creator: {
                        board: [],
                        hand: [],
                        wager: 0,
                        ethicalAlignment: {
                            alignment: EthicalAlignment.Neutral,
                            traits: []
                        },
                        first: false,
                        resting: false
                    },
                    player: {
                        board: [],
                        hand: [],
                        wager: 0,
                        ethicalAlignment: {
                            alignment: EthicalAlignment.Neutral,
                            traits: []
                        },
                        first: true,
                        resting: false
                    }
                }
            }
        }
    }
}