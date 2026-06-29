// this file will contain all the weights for each factor used in trait calculation

global.Honorables = global.Honorables || {};
global.Honorables.TraitFactors = global.Honorables.TraitFactors || {};

global.Honorables.TraitFactors.factorWeights = {
    VANILLA_STATS: {
        WEIGHT: .35,
        SUBFACTOR_WEIGHTS: {
            //various subfactors and their weights go here
            "minecraft:damage_dealt": .02,
            "minecraft:killed": .05
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

// this contains all the factors, sorted by type, that affect each trait
global.Honorables.TraitFactors.traitFactors = {
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
