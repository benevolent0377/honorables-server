global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.debug = ROOT.debug || {};
ROOT.debug.player = ROOT.debug.player || {};

new ROOT.Command("gethonorablesplayerdata", "playerObj")
    .registerOperation(function(context, argv) {
        const player = context.source.player;
        const data = player.persistentData.honorables;

        console.log(data);
        context.source.server.runCommandSilent(`/w ${player.username} ${JSON.stringify(data)}`);
    });
