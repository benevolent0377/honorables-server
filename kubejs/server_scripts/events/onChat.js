global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ServerEvents.commandRegistry(event => {
    const Commands = event.commands;
    const Arguments = event.arguments;
    const rootCommand = ROOT.Constants.COMMAND.ROOT_ADDR.replace("/", "");

    const root = Commands.literal(rootCommand);

    root.then(
        Commands.argument("args", Arguments.WORD.create(event))
            .executes(context => {
                const input = Arguments.WORD.getResult(context, "args");
                console.log("[Honorables Command] args branch input: " + input);
                return ROOT.CommandRegistry.run(context, input);
            })
    );

    root.executes(context => {
        console.log("[Honorables Command] root branch");
        return ROOT.CommandRegistry.run(context, "");
    });

    event.register(root);
});