import { EthicalAlignment, MoralAlignment } from '../types/AlignmentType'

export const enum EFFECT_NAMES {
    SET_ALIGNMENT = "SetAlignment",
    ADJUST_WAGER = "AdjustWager"
}

export const enum Target  {
    PLAYER,
    ENEMY,
    NONE
}

export type Effect = {
    [EFFECT_NAMES.SET_ALIGNMENT]?: {
        target: Target.ENEMY | Target.PLAYER,
        value: {
            moral?: MoralAlignment
            ethical: EthicalAlignment
        }
    } | {
        target: Target.NONE,
        value: {
            moral: MoralAlignment
        }
    },
    [EFFECT_NAMES.ADJUST_WAGER]?: {
        target: Target,
        value: number
    }
}