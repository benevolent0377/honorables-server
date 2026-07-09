global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.Commands = ROOT.Commands || {};
ROOT.Commands.Debug = ROOT.Commands.Debug || {};
ROOT.Commands.Debug.Player = ROOT.Commands.Debug.Player || {};

// Debug subcommand for inspecting the caller's Honorables persistent data.
new ROOT.Commands.Command("getplayerdata", undefined)
    .RegisterOperation(function(context, argv) {
        const player = context.source.player;
        const dump = ROOT.Player.Data.Dump(player);

        // Log to server console and whisper the same dump back to the player.
        console.log(dump);
        context.source.server.runCommandSilent(`/w ${player.username} ${dump}`);
    });
