global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Login repair/init hook for the Honorables player data root.
PlayerEvents.loggedIn(event => {

    // Add future login operations here as calls into shared helpers, not inline systems.

    //validate player data:
    ROOT.PlayerData.hasRoot(event.player, true);

});

// Keep this event thin so player state behavior remains testable through ROOT helpers.
