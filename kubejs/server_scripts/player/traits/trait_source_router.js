import { CONSTANTS } from "../../core/constants";

export function getValueFromSource(player, source, factor) {

    const sourceTypes = CONSTANTS.TRAIT_FACTOR_TYPES.LIST;

    switch (source) {

        case CONSTANTS.TRAIT_FACTOR_TYPES.VANILLA_STATS:
            return readVanillaStat(player, factor);
        
        case CONSTANTS.TRAIT_FACTOR_TYPES.PLAYER_HISTORY:
            return readPlayerHistory(player, factor);

        case CONSTANTS.TRAIT_FACTOR_TYPES.STAGES:
            return hasStage(player, factor);

        default:
            return undefined;
    }

}

function readVanillaStat(player, factor) {
    return 0;
}

function readPlayerHistory(player, factor) {
    return 0;
}

function hasStage(player, factor) {
    return 0;   
}