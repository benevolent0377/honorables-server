// this file will hold all of the basic trait data
import { CONSTANTS } from "../../core/constants";

class TRAIT {
    constructor(id, display, DEFAULT_BASE, description) {
        this.id = id,
        this.display = display
        this.DEFAULT_BASE = DEFAULT_BASE,
        this.description = description
    }

    export(){
        return {
            "base": this.DEFAULT_BASE,
            "active": null,
            "modifiers": []
        };
    }
}

export const TRAITS = {
    STRENGTH: new TRAIT(CONSTANTS.TRAIT_ID.STR, "Strength", 10, ""),
    CONSTITUTION: new TRAIT(CONSTANTS.TRAIT_ID.CONS, "Constitution", 10, ""),
    ENDURANCE: new TRAIT(CONSTANTS.TRAIT_ID.END, "Endurance", 10, ""),
    AGILITY: new TRAIT(CONSTANTS.TRAIT_ID.AGL, "Agility", 10, ""),
    DEXTERITY: new TRAIT(CONSTANTS.TRAIT_ID.DEX, "Dexterity", 10, ""),
    INTELLIGENCE: new TRAIT(CONSTANTS.TRAIT_ID.INT, "Intelligence", 10, ""),
    WISDOM: new TRAIT(CONSTANTS.TRAIT_ID.WIS, "Wisdom", 10, ""),
}