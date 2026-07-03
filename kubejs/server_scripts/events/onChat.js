global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

var StringArgumentType = Java.loadClass("com.mojang.brigadier.arguments.StringArgumentType");

ServerEvents.commandRegistry(event => {
    const Commands = event.commands;
    const rootCommand = ROOT.Constants.COMMAND.ROOT_ADDR.replace("/", "");

    event.register(
        Commands.literal(rootCommand)
            .executes(context => {
                return ROOT.CommandRegistry.run(context, "");
            })
            .then(
                Commands.argument("args", StringArgumentType.greedyString())
                    .executes(context => {
                        return ROOT.CommandRegistry.run(
                            context,
                            StringArgumentType.getString(context, "args")
                        );
                    })
            )
    );
});
