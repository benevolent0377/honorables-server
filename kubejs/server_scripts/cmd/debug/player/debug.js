global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.debug = ROOT.debug || {};
ROOT.debug.player = ROOT.debug.player || {};

// Debug subcommand for inspecting the caller's Honorables persistent data.
new ROOT.Command("getplayerdata", undefined)
    .registerOperation(function(context, argv) {
        const player = context.source.player;
        const dump = ROOT.PlayerData.dump(player);

        // Log to server console and whisper the same dump back to the player.
        console.log(dump);
        context.source.server.runCommandSilent(`/w ${player.username} ${dump}`);
    });
