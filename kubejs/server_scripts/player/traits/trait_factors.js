global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Weight tables for trait recalculation. Source categories are routed in trait_source_router.js.

ROOT.Traits = ROOT.Traits || {};
ROOT.Traits.Factors = ROOT.Traits.Factors || {};

ROOT.Traits.Factors.StatWeightConstants = {

    EX_LOW: .0005,
    LOW: .001,
    EX_SMALL: .005,
    SMALL: .01,
    MODERATE: .025,
    LARGE: .1,
    EX_LARGE: .2,
    SIGNIFICANT: .5,
    EX_SIGNIFICANT: .10,

    DOUBLE: function(weight) {
        return weight*2;
    },

    GROW_SHRINK: function(value, factor) {
        return value * 10^(factor);
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
                var directionVector = 1;
            break;

            case "negative" || "neg":
                var directionVector = -1;
            break

            default:
                return itemWeight;

        }

        var newWeight = Number(statQty^(((1/2)*factor + direction)/(factor + padX)) + padY);
        var newWeight = Number(newWeight, -3);

        return newWeight;
    }

}

ROOT.Traits.Factors.Weights = {

    REGISTRY: ROOT.Traits.Factors.StatWeightConstants,
    // WEIGHT applies to the whole source category; SUBFACTOR_WEIGHTS tune individual factors.
    VANILLA_STATS: {
        WEIGHT: .35,
        SUBFACTOR_WEIGHTS: {
            //various subfactors and their weights go here
            "minecraft:damage_dealt": ROOT.Traits.Factors.StatWeightConstants.EX_LOW,
            "minecraft:killed": ROOT.Traits.Factors.StatWeightConstants.LOW
        }
    },

    PLAYER_HISTORY: {
        WEIGHT: .15,
        SUBFACTOR_WEIGHTS: {
            //ibid
        }
    },

    STAGES: {
        WEIGHT: .75,
        SUBFACTOR_WEIGHTS: {
            //ibid
        }
    }
}

// Factors are grouped by trait, then by source type. Empty arrays mean that source is not wired yet.
ROOT.Traits.Factors.ByTrait = {
    STRENGTH: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    ENDURANCE: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    CONSTITUTION: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    AGILITY: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    DEXTERITY: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    INTELLIGENCE: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    },
    WISDOM: {
        VANILLA_STATS: [],
        PLAYER_HISTORY: [],
        STAGES: []
    }
}
