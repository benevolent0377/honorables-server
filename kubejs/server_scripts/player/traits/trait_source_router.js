import { CONSTANTS } from "../../core/constants";

export function getValueFromSource(player, source, factor) {

    const sourceTypes = CONSTANTS.TRAIT_FACTOR_TYPES.LIST;

    switch (source) {

        case "vanilla_stat":
            return readVanillaStat(player, factor);
        
        case "player_history":
            return readPlayerHistory(player, factor);

        case "stage":
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