import { CONSTANTS } from "../../core/constants";

export function getValueFromSource(player, source, factor) {

    const sourceTypes = CONSTANTS.TRAIT_FACTOR_TYPES.LIST;

    var isFound = false;

    for (const sourceType of sourceTypes) {
        if (source == sourceType) {
            isFound = true;
        }
    }

    if (!isFound) {
        return undefined;
    }

    switch (source) {

        case "vanilla_stat":
            return readVanillaStat(player, factor);
            break;
        
        case "player_history":
            return readPlayerHistory(player, factor);
            break;

        case "stage":
            return hasStage(player, factor);
            break;
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