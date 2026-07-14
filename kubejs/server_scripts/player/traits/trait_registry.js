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

Trait.prototype.ExportData = function() {
        // Stored per player at honorables.traits[trait_id].
        return {
            "base": this.defaultBase,
            "active": null,
            "modifiers": []
        };
    };

ROOT.Traits.Registry = {
    STRENGTH: new Trait(ROOT.Constants.TRAIT_ID.STR, "Strength", 10, ""),
    CONSTITUTION: new Trait(ROOT.Constants.TRAIT_ID.CONS, "Constitution", 10, ""),
    ENDURANCE: new Trait(ROOT.Constants.TRAIT_ID.END, "Endurance", 10, ""),
    AGILITY: new Trait(ROOT.Constants.TRAIT_ID.AGL, "Agility", 10, ""),
    DEXTERITY: new Trait(ROOT.Constants.TRAIT_ID.DEX, "Dexterity", 10, ""),
    INTELLIGENCE: new Trait(ROOT.Constants.TRAIT_ID.INT, "Intelligence", 10, ""),
    WISDOM: new Trait(ROOT.Constants.TRAIT_ID.WIS, "Wisdom", 10, ""),
};

ROOT.Traits.VerifyTraitExists = function(trait) {

    // Verifies against canonical trait IDs, not display names or registry keys.
    const traitList = ROOT.Constants.TRAIT_ID.LIST;

    for (const eachTrait of traitList) {
        if (trait == eachTrait) {
            return true;
        }
    }

    return false;

};

ROOT.Traits.GetEffectiveTrait = function(player, traitId) {
    // Active overrides base when temporary or recalculated effects are present.
    const trait = ROOT.Player.Data.GetTrait(player, traitId);
    return trait.active == null ? trait.base : trait.active;
};

ROOT.Traits.Attenuation = {

    VALUE: 0,

    CONFIG: {
        BLEND: { // these are relative attenuation 'bands' to allow level caps to scale with player level
            NONE: 1,
            LOOSE: .25,
            MODERATE: .135,
            STRICT: .05,
        },
        CEILING: 10 // the absolute maximum increase a trait can undergo per calculation
    },

    // this value determines how much of the player's current trait value will be used to determine attenuation
    // max value is 1, minimum value is .05
    // the higher the value, the more tolerant the configs and the more growth allowed,
    // the lower the tolerance, the tighter the growth is restricted.
    TOLERANCE: 1

    /**
     * Attenuation will be determined as follows:
     * 
     * Current (pre-calculation) traits will be determined, and this will be multiplied by the tolerance to determine
     * how much growth will be allowed
     * 
     * Then, this product will be multiplied by the VALUE.
     * 
     * The resulting value will be the maximum increase a player's trait can have at one calculation....
     * 
     * For example:
     * 
     * If a player has 100 in the strength trait, and tolerance is 1 while on a strict config,
     * the maximum increase the trait can undergo this calculation cycle is 10 points, which is quite high.
     *  
     */

};