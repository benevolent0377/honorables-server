global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Static class/subclass registry. These IDs are used by GameStages and Puffish Skills wiring.
ROOT.Classes = {
    WARRIOR: { 
        ID: ROOT.Constants.PLAYER_CLASS_ID.WARRIOR,
        DISPLAY: "Warrior",
        SUBCLASS: {
            KNIGHT: {
                ID: "subclass_knight",
                DISPLAY: "Knight"
            },
            BERSERKER: {
                ID: "subclass_berserker",
                DISPLAY: "Berserker"
            },
            SKIRMISHER: {
                ID: "subclass_skirmisher",
                DISPLAY: "Skirmisher"
            },


            LIST: [
                "subclass_knight",
                "subclass_berserker",
                "subclass_skirmisher"
            ],

            LIST_F: [
                "knight",
                "berserker",
                "skirmisher"
            ]
        },
        DEFAULT_TRAITS: {
            "trait_strength": 14,
            "trait_endurance": 14,
            "trait_constitution": 13,
            "trait_agility": 11,
            "trait_dexterity": 10,
            "trait_intelligence": 10,
            "trait_wisdom": 8 
        },
        ROOT_SKILL_NODE_ID: "", //this is for the puffish skills skill id for the root of the class
        CLASS_GAMESTAGE: "class_warrior"

    },

    NATURALIST: {
        ID: ROOT.Constants.PLAYER_CLASS_ID.NATURALIST,
        DISPLAY: "Naturalist",
        SUBCLASS: {
            AGRICULTURALIST: {
                ID: "subclass_agriculturalist",
                DISPLAY: "Agriculturalist"
            },
            HUSBANDER: {
                ID: "subclass_husbander",
                DISPLAY: "Husbander"
            },
            APOTHECARY: {
                ID: "subclass_apothecary",
                DISPLAY: "Apothecary"
            },

            LIST: [
                "subclass_agriculturalist",
                "subclass_husbander",
                "subclass_apothecary"
            ],

            LIST_F: [
                "agricultralist",
                "husbander",
                "apothecary"
            ]
        },
        DEFAULT_TRAITS: {
            "trait_strength": 12,   
            "trait_endurance": 10,
            "trait_constitution": 13,
            "trait_agility": 9,
            "trait_dexterity": 11,
            "trait_intelligence": 10,
            "trait_wisdom": 12 
        },
        ROOT_SKILL_NODE_ID: "",
        CLASS_GAMESTAGE: "class_naturalist"
    },

    MINER: {
        ID: ROOT.Constants.PLAYER_CLASS_ID.MINER,
        DISPLAY: "Miner",
        SUBCLASS: {
            QUARRYMAN: {
                ID: "subclass_quarryman",
                DISPLAY: "Quarryman"
            },
            PROSPECTOR: {
                ID: "subclass_prospector",
                DISPLAY: "Prospector"
            },
            BLACKSMITH: {
                ID: "subclass_blacksmith",
                DISPLAY: "Blacksmith"
            },


            LIST: [
                "subclass_quarryman",
                "subclass_prospector",
                "subclass_blacksmith"
            ],

            LIST_F: [
                "quarryman",
                "prospector",
                "blacksmith"
            ]
        },
        DEFAULT_TRAITS: {
            "trait_strength": 13,   
            "trait_endurance": 14,
            "trait_constitution": 12,
            "trait_agility": 9,
            "trait_dexterity": 10,
            "trait_intelligence": 10,
            "trait_wisdom": 11 
        },
        ROOT_SKILL_NODE_ID: "",
        CLASS_GAMESTAGE: "class_miner"
    },

    MAGE: {
        ID: ROOT.Constants.PLAYER_CLASS_ID.MAGE,
        DISPLAY: "Mage",
        SUBCLASS: {
            ARCANIST: {
                ID: "subclass_arcanist",
                DISPLAY: "Arcanist"
            },
            SPELLSWORD: {
                ID: "subclass_spellsword",
                DISPLAY: "Spellsword"
            },
            ENCHANTER: {
                ID: "subclass_enchanter",
                DISPLAY: "Enchanter"
            },


            LIST: [
                "subclass_arcanist",
                "subclass_spellsword",
                "subclass_enchanter"
            ],

            LIST_F: [
                "arcanist",
                "spellsword",
                "enchanter"
            ]
        },
        DEFAULT_TRAITS: {
            "trait_strength": 8,   
            "trait_endurance": 9,
            "trait_constitution": 9,
            "trait_agility": 10,
            "trait_dexterity": 10,
            "trait_intelligence": 15,
            "trait_wisdom": 14 
        },
        ROOT_SKILL_NODE_ID: "",
        CLASS_GAMESTAGE: "class_mage"
    },
    ADVENTURER: {
        ID: ROOT.Constants.PLAYER_CLASS_ID.ADVENTURER,
        DISPLAY: "Adventurer",
        SUBCLASS: {
            EXPLORER: {
                ID: "subclass_explorer",
                DISPLAY: "Explorer"
            },
            EXPEDITIONIST: {
                ID: "subclass_expeditionist",
                DISPLAY: "Expeditionist"
            },
            DELVER: {
                ID: "subclass_delver",
                DISPLAY: "Delver"
            },

            LIST: [
                "subclass_explorer",
                "subclass_expeditionist",
                "subclass_delver"
            ],

            LIST_F: [
                "explorer",
                "expeditionist",
                "delver"
            ]
        },
        DEFAULT_TRAITS: {
            "trait_strength": 9,   
            "trait_endurance": 11,
            "trait_constitution": 10,
            "trait_agility": 13,
            "trait_dexterity": 13,
            "trait_intelligence": 11,
            "trait_wisdom": 11 
        },
        ROOT_SKILL_NODE_ID: "",
        CLASS_GAMESTAGE: "class_adventurer"
    },

    // lists internal, raw classnames
    // These should match ROOT.Constants.PLAYER_CLASS_ID.LIST.
    LIST: [
        "class_warrior",
        "class_naturalist",
        "class_miner",
        "class_mage",
        "class_adventurer"
    ],

    // lists stripped, or split and formatted class names, for easy abstraction
    // Useful for commands or UI-facing formatting that does not want the class_ prefix.
    LIST_F: [
        "warrior",
        "naturalist",
        "miner",
        "mage",
        "adventurer"
    ],

};
