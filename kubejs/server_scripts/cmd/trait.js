global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Debug/admin subcommand: /honorables traits recalculates the caller's trait values.
new ROOT.Command("traits", ["operation"])
    .registerOperation(function(context, argv){

        const player = context.source.player;

        console.log(`Recalculating ${player.username}'s traits on command.`);

        // ROOT.Constants.NONE signals "all traits" to the calculation pipeline.
        ROOT.player.traits.calculateTraitValue(player, ROOT.Constants.NONE);

    });
