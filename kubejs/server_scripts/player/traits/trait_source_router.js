global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// this file will be the access point for all the trait calculation data

ROOT.TraitSourceRouter = ROOT.TraitSourceRouter || {};

ROOT.TraitSourceRouter.getValueFromSource = function(player, source, factor) {

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

    const playerData = ROOT.PlayerData.get(player, true);
    
    // undeveloped call to minecraft nbt data
    return 0;

}

function readPlayerHistory(player, factor) {
    const history = ROOT.PlayerData.get(player).history;

    if (history[factor] == undefined){
        return 0;
    }
    else {
        return history[factor];
    }
}

function readStageValue(player, factor) {
    return 0;
}
