// this file will contain all the weights for each factor used in trait calculation

const FACTOR_WEIGHTS = {
    VANILLA_STATS: {
        WEIGHT: 1,
        SUBFACTOR_WEIGHTS: {
            //various subfactors and their weights go here
        }
    },

    PLAYER_HISTORY: {
        WEIGHT: 1,
        SUBFACTOR_WEIGHTS: {
            //ibid
        }
    },

    STAGES: {
        WEIGHT: 1,
        SUBFACTOR_WEIGHTS: {
            //ibid
        }
    }
}

// this contains all the factors, sorted by type, that affect each trait
const TRAIT_FACTORS = {
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