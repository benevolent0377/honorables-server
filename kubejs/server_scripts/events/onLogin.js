global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

PlayerEvents.loggedIn(event => {

    // login functions go here

    //validate player data:
    ROOT.PlayerData.hasRoot(event.player, true);

});

// the above event hook is meant to call functions in this file. it should not have its own operations hardcoded.
