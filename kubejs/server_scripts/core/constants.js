global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Canonical IDs and magic strings used across the KubeJS backend.
// Keep these values stable once player data or progression gates depend on them.

ROOT.Constants = {

    NONE: undefined,

    VERSION: {
        DATA: 1
    },

    TRAIT_ID: {
        // Internal persistent-data IDs for the primary progression traits.
        STR: "trait_strength",
        END: "trait_endurance",
        CONS: "trait_constitution",
        AGL: "trait_agility",
        DEX: "trait_dexterity",
        WIS: "trait_wisdom",
        INT: "trait_intelligence",

        // lists internal attribute names, unformatted
        LIST: [
            "trait_strength",
            "trait_endurance",
            "trait_constitution",
            "trait_agility",
            "trait_dexterity",
            "trait_wisdom",
            "trait_intelligence"
        ],

        LIST_F: [
            "strength",
            "endurance",
            "constitution",
            "agility",
            "dexterity",
            "wisdom",
            "intelligence"
        ],

        LIST_KEYS: [
            "STRENGTH",
            "ENDURANCE",
            "CONSTITUTION",
            "AGILITY",
            "DEXTERITY",
            "WISDOM",
            "INTELLIGENCE",
        ],

        TRAIT_ID_TO_KEY: {
            "trait_strength": "STRENGTH",
            "trait_endurance": "ENDURANCE",
            "trait_constitution": "CONSTITUTION",
            "trait_agility": "AGILITY",
            "trait_dexterity": "DEXTERITY",
            "trait_wisdom": "WISDOM",
            "trait_intelligence": "INTELLIGENCE"
        },

        TRAIT_KEY_TO_ID: {
            "STRENGTH": "trait_strength",
            "ENDURANCE": "trait_endurance",
            "CONSTITUTION": "trait_constitution",
            "AGILITY": "trait_agility",
            "DEXTERITY": "trait_dexterity",
            "WISDOM": "trait_wisdom",
            "INTELLIGENCE": "trait_intelligence"
        }
    },

    PLAYER_CLASS_ID: {
        // Class IDs double as GameStage names in class/progression integrations.
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
        // Subclass IDs are registry/progression handles; display text belongs elsewhere.
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
        // Ability runtime effects are grouped by these trigger names.
        ON_HIT: "onHit",
        ON_KILL: "onKill",
        ON_CAST: "onCast",
        ON_BLOCK_BREAK: "onBlockBreak",
        ON_TIMER: "onTimer"
    },

    TRAIT_FACTOR_TYPES: {
        // Source categories consumed by TraitSourceRouter during recalculation.
        VANILLA_STATS: "vanilla_stats",
        PLAYER_HISTORY: "player_history",
        STAGES: "stages",

        LIST_KEYS: [
            "VANILLA_STATS",
            "PLAYER_HISTORY",
            "STAGES"
        ],

        LIST: [
            "vanilla_stats",
            "player_history",
            "stages"
        ]
    },

    QUALITY: {
        // Item quality is item-owned state; player data may only mirror or derive from it.
        MIN: 1.00,
        MAX: 5.00,
    },

    COMMAND: {
        // Registered without the slash in onCommandRegistry.
        ROOT_ADDR: "/honorables"
    }
}
