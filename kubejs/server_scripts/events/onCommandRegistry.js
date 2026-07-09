global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;
const StringArgumentType = Java.loadClass("com.mojang.brigadier.arguments.StringArgumentType");

// Registers the Minecraft command bridge for /honorables.
ServerEvents.commandRegistry(event => {
    const Commands = event.commands;
    const rootCommand = ROOT.Constants.COMMAND.ROOT_ADDR.replace("/", "");

    const root = Commands.literal(rootCommand);

    // Forward the full text after /honorables so subcommands can parse multiple args.
    root.then(
        Commands.argument("args", StringArgumentType.greedyString())
            .executes(context => {
                const input = StringArgumentType.getString(context, "args");
                console.log("[Honorables Command] args branch input: " + input);
                return ROOT.Commands.Registry.Run(context, input);
            })
    );

    root.executes(context => {
        console.log("[Honorables Command] root branch");
        // Empty input lets Commands.Registry decide whether a default/root handler exists.
        return ROOT.Commands.Registry.Run(context, "");
    });

    event.register(root);
});
