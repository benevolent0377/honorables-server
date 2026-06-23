// this file will store all the constant data names and types

export const CONSTANTS = {

    VERSION: {
        DATA: 1
    },

    TRAIT_ID: {
        STR: "traits_strength",
        END: "traits_endurance",
        CONS: "traits_constitution",
        AGL: "traits_agility",
        DEX: "traits_dexterity",
        WIS: "traits_wisdom",
        INT: "traits_intelligence",

        // lists internal attribute names, unformatted
        LIST: [
            "traits_strength",
            "traits_endurance",
            "traits_constitution",
            "traits_agility",
            "traits_dexterity",
            "traits_wisdom",
            "traits_intelligence"
        ],

        LIST_F: [
            "strength",
            "endurance",
            "constitution",
            "agility",
            "dexterity",
            "wisdom",
            "intelligence"
        ]
    },

    PLAYER_CLASS_ID: {
        WARRIOR: "class_warrior",
        NATURALIST: "class_naturalist",
        MINER: "class_miner",
        MAGE: "class_mage",
        ADVENTURER: "class_adventurer",

        LIST: [
            "class_warrior",
            "class_naturalist",
            "class_miner",
            "class_mage",
            "class_adventurer"
        ]
    },

    PLAYER_SUBCLASS_ID: {
        KNIGHT: "subclass_knight",
        BERSERKER: "subclass_berserker",
        SKIRMISHER: "subclass_skirmisher",

        AGRICULTURALIST: "subclass_agriculturalist",
        HUSBANDER: "subclass_husbander",
        APOTHECARY: "subclass_apothecary",

        QUARRYMAN: "subclass_quarryman",
        PROSPECTOR: "subclass_prospector",
        BLACKSMITH: "subclass_blacksmith",

        ARCANIST: "subclass_arcanist",
        SPELLSWORD: "subclass_spellsword",
        ENCHANTER: "subclass_enchanter",

        EXPLORER: "subclass_explorer",
        EXPEDITIONIST: "subclass_expeditionist",
        DELVER: "subclass_delver",

        LIST: [
            
        "subclass_knight",
        "subclass_berserker",
        "subclass_skirmisher",

        "subclass_agriculturalist",
        "subclass_husbander",
        "subclass_apothecary",

        "subclass_quarryman",
        "subclass_prospector",
        "subclass_blacksmith",

        "subclass_arcanist",
        "subclass_spellsword",
        "subclass_enchanter",

        "subclass_explorer",
        "subclass_expeditionist",
        "subclass_delver"
        ]
    },

    TRIGGERS: {
        ON_HIT: "onHit",
        ON_KILL: "onKill",
        ON_CAST: "onCast",
        ON_BLOCK_BREAK: "onBlockBreak",
        ON_TIMER: "onTimer"
    },

    TRAIT_FACTOR_TYPES: {
        VANILLA_STATS: "vanilla_stats",
        PLAYER_HISTORY: "player_history",
        STAGES: "stages",

        LIST = [
            "vanilla_stats",
            "player_history",
            "stages"
        ]
    },

    QUALITY: {
        MIN: 1.00,
        MAX: 5.00,
    }
}