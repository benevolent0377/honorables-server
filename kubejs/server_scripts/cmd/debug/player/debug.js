global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.debug = ROOT.debug || {};
ROOT.debug.player = ROOT.debug.player || {};

new ROOT.Command("gethonorablesplayerdata", "playerObj")
    .registerOperation(function(event, argv) {

        console.log(event.player.PersistentData.honorables);
        event.server.runCommandSilent(`/say ${JSON.stringify(event.player.PersistentData.honorables)}`);

    });