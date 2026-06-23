import { CONSTANTS } from "../../core/constants";

export function getValueFromSource(player, source, factor) {

    const sourceTypes = CONSTANTS.TRAIT_FACTOR_TYPES.LIST;

    switch (source) {

        case CONSTANTS.TRAIT_FACTOR_TYPES.VANILLA_STATS:
            return readVanillaStat(player, factor);
        
        case CONSTANTS.TRAIT_FACTOR_TYPES.PLAYER_HISTORY:
            return readPlayerHistory(player, factor);

        case CONSTANTS.TRAIT_FACTOR_TYPES.STAGES:
            return readStageValue(player, factor);

        default:
            return undefined;
    }

}

function readVanillaStat(player, factor) {

    playerData = player.fullNBT;
    
    if (playerData[factor] == undefined) {
        return 0;
    }
    else {
        return playerData[factor];
    }

}

function readPlayerHistory(player, factor) {
    history = player.fullNBT.honorables.history;

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