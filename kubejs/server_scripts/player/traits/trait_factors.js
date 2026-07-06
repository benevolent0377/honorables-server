global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Weight tables for trait recalculation. Source categories are routed in trait_source_router.js.

ROOT.TraitFactors = ROOT.TraitFactors || {};

ROOT.TraitFactors.factorWeights = {
    // WEIGHT applies to the whole source category; SUBFACTOR_WEIGHTS tune individual factors.
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

// Factors are grouped by trait, then by source type. Empty arrays mean that source is not wired yet.
ROOT.TraitFactors.traitFactors = {
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
