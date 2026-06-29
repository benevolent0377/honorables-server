// this file will be the access point for all the trait calculation data

global.Honorables = global.Honorables || {};
global.Honorables.TraitSourceRouter = global.Honorables.TraitSourceRouter || {};

global.Honorables.TraitSourceRouter.getValueFromSource = function(player, source, factor) {

    const sourceTypes = global.Honorables.Constants.TRAIT_FACTOR_TYPES.LIST;

    switch (source.toLowerCase()) {

        case global.Honorables.Constants.TRAIT_FACTOR_TYPES.VANILLA_STATS:
            return readVanillaStat(player, factor);
        
        case global.Honorables.Constants.TRAIT_FACTOR_TYPES.PLAYER_HISTORY:
            return readPlayerHistory(player, factor);

        case global.Honorables.Constants.TRAIT_FACTOR_TYPES.STAGES:
            return readStageValue(player, factor);

        default:
            return undefined;
    }

};

function readVanillaStat(player, factor) {

    const playerData = global.Honorables.PlayerData.get(player, true);
    
    // undeveloped call to minecraft nbt data
    return 0;

}

function readPlayerHistory(player, factor) {
    const history = global.Honorables.PlayerData.get(player).history;

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
