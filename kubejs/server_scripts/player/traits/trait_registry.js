// this file will hold all of the basic trait data
import { CONSTANTS } from "../../core/constants";

class Trait {
    constructor(id, display, DEFAULT_BASE, description) {
        this.id = id,
        this.display = display,
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
    STRENGTH: new Trait(CONSTANTS.TRAIT_ID.STR, "Strength", 10, ""),
    CONSTITUTION: new Trait(CONSTANTS.TRAIT_ID.CONS, "Constitution", 10, ""),
    ENDURANCE: new Trait(CONSTANTS.TRAIT_ID.END, "Endurance", 10, ""),
    AGILITY: new Trait(CONSTANTS.TRAIT_ID.AGL, "Agility", 10, ""),
    DEXTERITY: new Trait(CONSTANTS.TRAIT_ID.DEX, "Dexterity", 10, ""),
    INTELLIGENCE: new Trait(CONSTANTS.TRAIT_ID.INT, "Intelligence", 10, ""),
    WISDOM: new Trait(CONSTANTS.TRAIT_ID.WIS, "Wisdom", 10, ""),
}