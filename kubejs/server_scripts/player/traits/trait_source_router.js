global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

const Stats = Java.loadClass("net.minecraft.stats.Stats")

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
        
        case ROOT.Constants.TRAIT_FACTOR_TYPES.MODDED_STATS.toLowerCase():
            return readStageValue(player, factor);

        default:
            return undefined;
    }

};

function readVanillaStat(player, factor) {

    // Placeholder for stat/NBT-backed sources; currently contributes zero to calculations.
    const playerStats = player.getStats();



 /**   for (let method of player.getStats().getClass().getMethods()) {
        console.log(method.getName())
    }

    list of methods for getStats()
getMobKills
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getAnimalsBred
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getPlayerKills
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getFishCaught
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getBlocksMined
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getItemsCrafted
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getItemsUsed
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getItemsBroken
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getItemsPickedUp
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getItemsDropped
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getKilled
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getKilledBy
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getPlayTime
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getTimeSinceDeath
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getTimeSinceRest
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getTimeCrouchTime
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getJumps
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getWalkDistance
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getSprintDistance
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getSwimDistance
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getCrouchDistance
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageDealt
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageDealt_absorbed
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageDealt_resisted
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageTaken
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageBlocked_by_shield
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageAbsorbed
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDamageResisted
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getDeaths
[16:18:14] [INFO] player/traits/trait_source_router.js#43: statOf
[16:18:14] [INFO] player/traits/trait_source_router.js#43: add
[16:18:14] [INFO] player/traits/trait_source_router.js#43: get
[16:18:14] [INFO] player/traits/trait_source_router.js#43: get
[16:18:14] [INFO] player/traits/trait_source_router.js#43: set
[16:18:14] [INFO] player/traits/trait_source_router.js#43: wait
[16:18:14] [INFO] player/traits/trait_source_router.js#43: wait
[16:18:14] [INFO] player/traits/trait_source_router.js#43: wait
[16:18:14] [INFO] player/traits/trait_source_router.js#43: equals
[16:18:14] [INFO] player/traits/trait_source_router.js#43: toString
[16:18:14] [INFO] player/traits/trait_source_router.js#43: hashCode
[16:18:14] [INFO] player/traits/trait_source_router.js#43: getClass
[16:18:14] [INFO] player/traits/trait_source_router.js#43: notify
[16:18:14] [INFO] player/traits/trait_source_router.js#43: notifyAll
        */

    factor = String(factor || "").replace(/^minecraft[:.]/, "");

    var FactortoFunction = {
        "mob_kills": function() { return playerStats.getMobKills(); },
        "animals_bred": function() { return playerStats.getAnimalsBred(); },
        "player_kills": function() { return playerStats.getPlayerKills(); },
        "fish_caught": function() { return playerStats.getFishCaught(); },
        "blocks_mined": function() { return playerStats.getBlocksMined(); },
        "items_crafted": function() { return playerStats.getItemsCrafted(); },
        "items_used": function() { return playerStats.getItemsUsed(); },
        "items_broken": function() { return playerStats.getItemsBroken(); },
        "items_picked_up": function() { return playerStats.getItemsPickedUp(); },
        "items_dropped": function() { return playerStats.getItemsDropped(); },
        "killed": function() { return playerStats.getKilled(); },
        "killed_by": function() { return playerStats.getKilledBy(); },
        "play_time": function() { return playerStats.getPlayTime(); },
        "time_since_death": function() { return playerStats.getTimeSinceDeath(); },
        "time_since_rest": function() { return playerStats.getTimeSinceRest(); },
        "time_crouch_time": function() { return playerStats.getTimeCrouchTime(); },
        "jump": function() { return playerStats.getJumps(); },
        "walk_one_cm": function() { return playerStats.getWalkDistance(); },
        "sprint_one_cm": function() { return playerStats.getSprintDistance(); },
        "swim_one_cm": function() { return playerStats.getSwimDistance(); },
        "crouch_one_cm": function() { return playerStats.getCrouchDistance(); },
        "damage_dealt": function() { return playerStats.getDamageDealt(); },
        "damage_dealt_absorbed": function() { return playerStats.getDamageDealt_absorbed(); },
        "damage_dealt_resisted": function() { return playerStats.getDamageDealt_resisted(); },
        "damage_taken": function() { return playerStats.getDamageTaken(); },
        "damage_blocked_by_shield": function() { return playerStats.getDamageBlocked_by_shield(); },
        "damage_absorbed": function() { return playerStats.getDamageAbsorbed(); },
        "damage_resisted": function() { return playerStats.getDamageResisted(); },
        "deaths": function() { return playerStats.getDeaths(); }
    };

    if (FactortoFunction[factor] == undefined) {
        return 0;
    }

    console.log(`The fetched value of ${factor} is: ${FactortoFunction[factor]()}`);

    return Number(FactortoFunction[factor]());

    // undeveloped call to minecraft nbt data
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

function readModdedStat(player, factor) {
    //nothing is here

    return 0;
}
