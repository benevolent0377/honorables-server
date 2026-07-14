global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Weight tables for trait recalculation. Source categories are routed in trait_source_router.js.

ROOT.Traits = ROOT.Traits || {};
ROOT.Traits.Factors = ROOT.Traits.Factors || {};
ROOT.Traits.Factors.Weight = ROOT.Traits.Factors.Weight || {};
ROOT.Traits.Factors.Weight.Stats = ROOT.Traits.Factors.Weight.Stats || {};

ROOT.Traits.Factors.Weight.Stats.Constants = {

    EX_LOW: .0005,
    LOW: .001,
    EX_SMALL: .005,
    SMALL: .01,
    MODERATE: .025,
    LARGE: .1,
    EX_LARGE: .2,
    SIGNIFICANT: .5,
    EX_SIGNIFICANT: .10
}

ROOT.Traits.Factors.Weight.Mutations = {

    DOUBLE: function(weight) {
        return Number(weight)*2;
    },

    HALVE: function(weight) {
        return Number(weight)/2;
    },

    GROW_SHRINK: function(value, factor) {
        return Number(value) * 10^(Number(factor));
    },

    /**
     * Vary weighting of a factor based on the amount of a stat a player has upon calculation.
     * 
     * @param statQty {integer} The exact number of any given stat the player has at calculation.
     * @param direction {string} Either positive or negative. Controls the direction of the exponent.
     * @param factor {float} A number from 1 to N. The multiplicative increase or decrease in slope of the exponent.
     * @param padX {float} A number from 0 to N. Skews the function graphically on the X-axis.
     * @param padY {float} A number from 0 to N. Skews the function grapically on the Y-axis.
     * 
     * @return newWeight {number} The new weight value for the factor.
     */
    EXPONENTIALIZE: function(statQty, direction, factor, padX, padY){

        if (factor < 1) {
            factor = 1;
        }

        switch (direction.toLowerCase()) {
            case "positive" || "pos":
                direction = 1;
            break;

            case "negative" || "neg":
                direction = -1;
            break

            default:
                return itemWeight;

        }

        var newWeight = Number(statQty^(((1/2)*factor + direction)/(factor + padX)) + padY);
        newWeight = Number(newWeight, -3);

        return newWeight;
    }

}

//the weight of each category of factors
ROOT.Traits.Factors.CategoryWeights = {
    // WEIGHT applies to the whole source category; SUBFACTOR_WEIGHTS tune individual factors.
    VANILLA_STATS: .33,
    PLAYER_HISTORY: .33,
    MODDED_STATS: .33,
    STAGES: .65
}

// Factors are grouped by trait, then by source type. Empty arrays mean that source is not wired yet.
ROOT.Traits.Factors.ByTrait = function() {

    const StatWeights = ROOT.Traits.Factors.Weight.Stats.Constants;
    const Mutate = ROOT.Traits.Factors.Weight.Stats.Mutations;

    return {
        STRENGTH: {
            VANILLA_STATS: {
                //damage to entities
                "minecraft:mob_kills": StatWeights.EX_SMALL,
                "minecraft.damage_dealt": StatWeights.EX_LOW,

                //damage taken
                "minecraft:damage_taken": Mutate.EXPONENTIALIZE(ROOT.Traits.SourceRouter.GetValueBySource(player, "VANILLA_STATS", "minecraft:damage_taken"), "neg", 1, 0, 0),
                "minecraft:damage_resisted": StatWeights.LOW,
                "minecraft:damage_blocked_by_shield": StatWeights.LOW,
                "minecraft:damage_absorbed": StatWeights.EX_LOW,

                //distances
                "minecraft:sprint_one_cm": StatWeights.EX_LOW,
                "minecraft:climb_one_cm": StatWeights.EX_LOW
            },
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        ENDURANCE: {
            VANILLA_STATS: {
                //damage taken
                "minecraft:damage_taken": StatWeights.LOW,
                "minecraft:damage_resisted": StatWeights.SMALL,
                "minecraft:damage_absorbed": StatWeights.SMALL,
                "minecraft:damage_blocked_by_shield": StatWeights.LOW,

                //distance
                "minecraft:sprint_one_cm": StatWeights.EX_LOW,
                "minecraft:walk_one_cm": StatWeights.EX_LOW,
                "minecraft:swim_one_cm": StatWeights.EX_LOW
            },
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        CONSTITUTION: {
            VANILLA_STATS: {},
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        AGILITY: {
            VANILLA_STATS: {
                "minecraft:jump": StatWeights.LOW,
                "minecraft:sprint_one_cm": StatWeights.LOW,
                "minecraft:climb_one_cm": StatWeights.LOW
            },
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        DEXTERITY: {
            VANILLA_STATS: {},
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        INTELLIGENCE: {
            VANILLA_STATS: {},
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        },
        WISDOM: {
            VANILLA_STATS: {},
            PLAYER_HISTORY: {},
            MODDED_STATS: {},
            STAGES: {}
        }
    }
}