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
                ROOT.Log.Write("DEBUG", "events/onCommandRegistry.js", "argsBranch", [input], ["[Honorables Command] args branch input: ", ""]);
                return ROOT.Commands.Registry.Run(context, input);
            })
    );

    root.executes(context => {
        ROOT.Log.Write("DEBUG", "events/onCommandRegistry.js", "rootBranch", [], ["[Honorables Command] root branch"]);
        // Empty input lets Commands.Registry decide whether a default/root handler exists.
        return ROOT.Commands.Registry.Run(context, "");
    });

    event.register(root);
});
