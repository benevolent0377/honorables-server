global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.Commands = ROOT.Commands || {};
ROOT.Commands.Debug = ROOT.Commands.Debug || {};
ROOT.Commands.Debug.Player = ROOT.Commands.Debug.Player || {};

// Debug subcommand for inspecting the caller's Honorables persistent data.
new ROOT.Commands.Command("getplayerdata", undefined)
    .RegisterOperation(function(context, argv) {
        const player = context.source.player;
        const rawData = ROOT.Player.Data.Get(player);
        const dump = JSON.stringify(ROOT.Player.Data.ExportData(player), null, 2);
        const lines = dump.split("\n");

        for (var i = 0; i < lines.length; i++) {
            player.tell(lines[i]);
        }

        ROOT.Log.Write(
            "DEBUG",
            "cmd/debug/player/debug.js",
            "getplayerdata",
            [String(rawData), dump],
            ["Raw:\n", "\nExported:\n", ""]
        );

    }).AddDescription("Returns persistent player data. Takes no arguments.");
