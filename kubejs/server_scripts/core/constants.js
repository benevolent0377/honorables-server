// this file will store all the constant data names and types

export const CONSTANTS = {

    VERSION : {
        DATA: 1
    },

    TRAITS: {
        STR: "strength",
        END: "endurance",
        CONS: "constitution",
        AGL: "agility",
        DEX: "dexterity",
        WIS: "wisdom",
        INT: "intelligence",

        // lists internal attribute names, unformatted
        LIST: [
            "strength",
            "endurance",
            "constitution",
            "agility",
            "dexterity",
            "wisdom",
            "intelligence"
        ]
    },

    PLAYER_CLASS: {
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

    PLAYER_SUBCLASS: {
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

    QUALITY: {
        MIN: 1.00,
        MAX: 5.00,
    }
}