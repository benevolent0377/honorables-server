import { CONSTANTS } from "../../core/constants";

export function getValueFromSource(player, source, factor) {

    const playerData = player.fullNBT;
    const honorablesData = playerData.honorables;
    const history = honorablesData.history;
    const sourceTypes = CONSTANTS.TRAIT_FACTOR_TYPES.LIST;

    var isFound = false;

    for (const sourceType of sourceTypes) {
        if (source == sourceType) {
            isFound = true;
        }
    }

    if (!isFound) {
        return 1;
    }

    switch (source) {

        case "vanilla_stat":
            return fetchVanillaData(player, factor);
            break;
        
        case "player_history":
            return fetchPlayerData(player, factor);
            break;

        case "stage":
            return fetchPlayerStages(player, factor);
            break;
    }

}

function fetchVanillaData(player, factor) {
    return 0;
}

function fetchPlayerData(player, factor) {
    return 0;
}

function fetchPlayerStage(player, factor) {
    return 0;   
}