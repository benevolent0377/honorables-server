global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;


new ROOT.Commands.Command("dump", ["dataType"])
    .RegisterOperation(function(context, argv) {

        if (argv[0].toLowerCase() == "fullnbt" || argv[0].toLowerCase() == "nbt"){
            const player = context.source.player;
            const path = `kubejs/export/player_nbt.json`;

            JsonIO.write(path, player.nbt);
        }

    });