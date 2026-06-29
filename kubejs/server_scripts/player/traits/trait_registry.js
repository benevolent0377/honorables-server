// this file will hold all of the basic trait data
global.Honorables = global.Honorables || {};
global.Honorables.Traits = global.Honorables.Traits || {};

class Trait {
    constructor(id, display, defaultBase, description) {
        this.id = id;
        this.display = display;
        this.defaultBase = defaultBase;
        this.description = description;
        this.maxValue = 300;
        this.minValue = 1;
    }

    export(){
        return {
            "base": this.defaultBase,
            "active": null,
            "modifiers": []
        };
    }
}

global.Honorables.Traits.registry = {
    STRENGTH: new Trait(global.Honorables.Constants.TRAIT_ID.STR, "Strength", 10, ""),
    CONSTITUTION: new Trait(global.Honorables.Constants.TRAIT_ID.CONS, "Constitution", 10, ""),
    ENDURANCE: new Trait(global.Honorables.Constants.TRAIT_ID.END, "Endurance", 10, ""),
    AGILITY: new Trait(global.Honorables.Constants.TRAIT_ID.AGL, "Agility", 10, ""),
    DEXTERITY: new Trait(global.Honorables.Constants.TRAIT_ID.DEX, "Dexterity", 10, ""),
    INTELLIGENCE: new Trait(global.Honorables.Constants.TRAIT_ID.INT, "Intelligence", 10, ""),
    WISDOM: new Trait(global.Honorables.Constants.TRAIT_ID.WIS, "Wisdom", 10, ""),
};

global.Honorables.Traits.verifyTraitExists = function(trait) {

    const traitList = global.Honorables.Constants.TRAIT_ID.LIST;

    for (const eachTrait of traitList) {
        if (trait == eachTrait) {
            return true;
        }
    }

    return false;

};

global.Honorables.Traits.getEffectiveTrait = function(player, traitId) {
    const trait = global.Honorables.PlayerData.getTrait(player, traitId);
    return trait.active == null ? trait.base : trait.active;
};
