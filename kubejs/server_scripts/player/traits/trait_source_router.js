global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Read layer for trait calculation sources. Calculation code should call this instead of reading NBT directly.

ROOT.Traits = ROOT.Traits || {};
ROOT.Traits.SourceRouter = ROOT.Traits.SourceRouter || {};

ROOT.Traits.SourceRouter.GetValueFromSource = function(player, source, factor) {

    // Returns a numeric source value or undefined for unsupported source types.
    const sourceTypes = ROOT.Constants.TRAIT_FACTOR_TYPES.LIST;
    const sourceKey = String(source || "").toLowerCase();

    switch (sourceKey) {

        case ROOT.Constants.TRAIT_FACTOR_TYPES.VANILLA_STATS.toLowerCase():
            return readVanillaStat(player, factor);
        
        case ROOT.Constants.TRAIT_FACTOR_TYPES.PLAYER_HISTORY.toLowerCase():
            return readPlayerHistory(player, factor);

        case ROOT.Constants.TRAIT_FACTOR_TYPES.STAGES.toLowerCase():
            return readStageValue(player, factor);

        default:
            return undefined;
    }

};

function readVanillaStat(player, factor) {

    // Placeholder for stat/NBT-backed sources; currently contributes zero to calculations.
    const playerData = ROOT.Player.Data.Get(player, true);
    
    // undeveloped call to minecraft nbt data
    return 0;

}

function readPlayerHistory(player, factor) {
    // Player history is Honorables-owned persistent data, not vanilla stat NBT.
    const history = ROOT.Player.Data.Get(player).history;

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
