PlayerEvents.onLogin(event => {

    // login functions go here

    //validate player data:
    global.Honorables.PlayerData.hasRoot(event.player, true);

});

// the above event hook is meant to call functions in this file. it should not have its own operations hardcoded.
