global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Read layer for trait calculation sources. Calculation code should call this instead of reading NBT directly.

ROOT.TraitSourceRouter = ROOT.TraitSourceRouter || {};

ROOT.TraitSourceRouter.getValueFromSource = function(player, source, factor) {

    // Returns a numeric source value or undefined for unsupported source types.
    const sourceTypes = ROOT.Constants.TRAIT_FACTOR_TYPES.LIST;

    switch (source.toLowerCase()) {

        case ROOT.Constants.TRAIT_FACTOR_TYPES.VANILLA_STATS:
            return readVanillaStat(player, factor);
        
        case ROOT.Constants.TRAIT_FACTOR_TYPES.PLAYER_HISTORY:
            return readPlayerHistory(player, factor);

        case ROOT.Constants.TRAIT_FACTOR_TYPES.STAGES:
            return readStageValue(player, factor);

        default:
            return undefined;
    }

};

function readVanillaStat(player, factor) {

    // Placeholder for stat/NBT-backed sources; currently contributes zero to calculations.
    const playerData = ROOT.PlayerData.get(player, true);
    
    // undeveloped call to minecraft nbt data
    return 0;

}

function readPlayerHistory(player, factor) {
    // Player history is Honorables-owned persistent data, not vanilla stat NBT.
    const history = ROOT.PlayerData.get(player).history;

    if (history[factor] == undefined){
        return 0;
    }
    else {
        return history[factor];
    }
}

function readStageValue(player, factor) {
    // Placeholder for GameStage/Puffish-derived signals.
    return 0;
}
