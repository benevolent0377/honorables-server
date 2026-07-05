global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.debug = ROOT.debug || {};
ROOT.debug.player = ROOT.debug.player || {};

new ROOT.Command("getplayerdata", "playerObj")
    .registerOperation(function(context, argv) {
        const player = context.source.player;
        const dump = ROOT.PlayerData.dump(player);

        console.log(dump);
        context.source.server.runCommandSilent(`/w ${player.username} ${dump}`);
    });
