// this file will hold all of the class information

const PLAYER_CLASS = {
    WARRIOR: { 
        ID: "class_warrior",
        SUBCLASS: {
            KNIGHT: {
                ID: "subclass_knight"
            },
            BERSERKER: {
                ID: "subclass_berserker"
            },
            SKIRMISHER: {
                ID: "subclass_skirmisher"
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
        }
    },

    NATURALIST: {
        ID: "class_naturalist",
        SUBCLASS: {
            AGRICULTURALIST: {
                ID: "subclass_agriculturalist"
            },
            HUSBANDER: {
                ID: "subclass_husbander"
            },
            APOTHECARY: {
                ID: "subclass_apothecary"
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
        }
    },

    MINER: {
        ID: "class_miner",
        SUBCLASS: {
            QUARRYMAN: {
                ID: "subclass_quarryman"
            },
            PROSPECTOR: {
                ID: "subclass_prospector"
            },
            BLACKSMITH: {
                ID: "subclass_blacksmith"
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
        }
    },

    MAGE: {
        ID:"class_mage",
        SUBCLASS: {
            ARCANIST: {
                ID: "subclass_arcanist"
            },
            SPELLSWORD: {
                ID: "subclass_spellsword"
            },
            ENCHANTER: {
                ID: "subclass_enchanter"
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
        }
    },
    ADVENTURER: {
        ID:"class_adventurer",
        SUBCLASS: {
            EXPLORER: {
                ID: "subclass_explorer"
            },
            EXPEDITIONIST: {
                ID: "subclass_expeditionist"
            },
            DELVER: {
                ID: "subclass_delver"
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

    },

    // lists internal, raw classnames
    LIST: [
        "class_warrior",
        "class_naturalist",
        "class_miner",
        "class_mage",
        "class_adventurer"
    ],

    // lists stripped, or split and formatted class names, for easy abstraction
    LIST_F: [
        "warrior",
        "naturalist",
        "miner",
        "mage",
        "adventurer"
    ],

},

