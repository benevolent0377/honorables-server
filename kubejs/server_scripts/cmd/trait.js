global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Debug/admin subcommand: /honorables traits recalculates the caller's trait values.
new ROOT.Commands.Command("traits", ["operation"])
    .RegisterOperation(function(context, argv){

        const player = context.source.player;

        //ROOT.Log.Write("DEBUG", "cmd/trait.js", "traits", [argv], ["Argv format: ", ""]);

        //ROOT.Log.Write("DEBUG", "cmd/trait.js", "traits", [argv[0]], ["Argv[0]: ", ""]);

        if (argv[0] == "recalculate" || argv[0] == "recalc"){

            ROOT.Log.Write("INFO", "cmd/trait.js", "traits", [player.username], ["Recalculating ", "'s traits on command."]);

            // ROOT.Constants.NONE signals "all traits" to the calculation pipeline.
            ROOT.Traits.CalculateTraitValue(player, argv[1]);
        }

        else if (argv[0] == "ping") {
            context.source.server.runCommandSilent(`/w ${player.username} Successfully pinged the trait command.`);
        }

        else if (argv[0] == "mod") {
            ROOT.Player.Data.EditTrait(player, argv[1], "base", Number(argv[2]), false);
        }

    });
