global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Registry for primary progression traits and the default persistent-data shape.
ROOT.Traits = ROOT.Traits || {};

function Trait (id, display, defaultBase, description) {
        this.id = id;
        this.display = display;
        this.defaultBase = defaultBase;
        this.description = description;
        this.maxValue = 300;
        this.minValue = 1;

}

Trait.prototype.exportData = function() {
        // Stored per player at honorables.traits[trait_id].
        return {
            "base": this.defaultBase,
            "active": null,
            "modifiers": []
        };
    };

ROOT.Traits.registry = {
    STRENGTH: new Trait(ROOT.Constants.TRAIT_ID.STR, "Strength", 10, ""),
    CONSTITUTION: new Trait(ROOT.Constants.TRAIT_ID.CONS, "Constitution", 10, ""),
    ENDURANCE: new Trait(ROOT.Constants.TRAIT_ID.END, "Endurance", 10, ""),
    AGILITY: new Trait(ROOT.Constants.TRAIT_ID.AGL, "Agility", 10, ""),
    DEXTERITY: new Trait(ROOT.Constants.TRAIT_ID.DEX, "Dexterity", 10, ""),
    INTELLIGENCE: new Trait(ROOT.Constants.TRAIT_ID.INT, "Intelligence", 10, ""),
    WISDOM: new Trait(ROOT.Constants.TRAIT_ID.WIS, "Wisdom", 10, ""),
};

ROOT.Traits.verifyTraitExists = function(trait) {

    // Verifies against canonical trait IDs, not display names or registry keys.
    const traitList = ROOT.Constants.TRAIT_ID.LIST;

    for (const eachTrait of traitList) {
        if (trait == eachTrait) {
            return true;
        }
    }

    return false;

};

ROOT.Traits.getEffectiveTrait = function(player, traitId) {
    // Active overrides base when temporary or recalculated effects are present.
    const trait = ROOT.PlayerData.getTrait(player, traitId);
    return trait.active == null ? trait.base : trait.active;
};
