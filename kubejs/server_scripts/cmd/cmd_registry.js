global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Simple command abstraction for subcommands under /honorables.
ROOT.Commands = ROOT.Commands || {};

ROOT.Commands.Command = function(commandID, args) {
    this.commandID = commandID.toLowerCase();
    this.args = args || [];
    this.op = function(argv) {
        ROOT.Log.Write("WARN", "cmd/cmd_registry.js", "Command", [this.commandID], ["No operation specified for command: ", "."]);
    }

    this.RegisterSelf();
    this.AddDescription("No description yet.");
};

ROOT.Commands.Command.prototype.RegisterOperation = function(opFunction) {
    // Replaces the default no-op handler and returns the command for chaining.
    if (opFunction) {
        this.op = opFunction;
    }

    return this;
}

ROOT.Commands.Command.prototype.RegisterSelf = function() {
    // Commands register at construction time so loading the file is enough to make them available.
    ROOT.Commands.Registry.Register(this);
}

ROOT.Commands.Command.prototype.AddDescription = function(description) {

    this.description = description;

}

ROOT.Commands.Registry = {
    Table: {},

    Register: function(commandObj) {
        // Later registrations with the same ID overwrite earlier ones.
        this.Table[commandObj.commandID] = commandObj;
    },

    Find: function(commandID) {
        return this.Table[commandID.toLowerCase()];
    },

    Run: function(context, input) {
        // Dispatch input forwarded by onCommandRegistry.js after /honorables.
        input = String(input || "");

        const messageSpliced = input.trim().toLowerCase().split(" ").filter(function(arg) {
            return arg.length > 0;
        });

        const commandName = messageSpliced[0];

        ROOT.Log.Write("DEBUG", "cmd/cmd_registry.js", "Registry.Run", [input, commandName], ["[Command Registry] input=", ", commandName=", ""]);

        // Return 0 so Minecraft treats unknown/empty subcommands as unhandled.
        if (!commandName) {
            return 0;
        }

        const command = this.Find(commandName);

        if (!command) {
            return 0;
        }

        ROOT.Log.Write("DEBUG", "cmd/cmd_registry.js", "Registry.Run", [commandName], ["[Command Registry] Successfully found command: ", "."]);
        // argv contains everything after the subcommand name.
        command.op(context, messageSpliced.slice(1));
        return 1;
    },

    List: function() {
        return this.Table;
    }

};

new ROOT.Commands.Command("help")
    .RegisterOperation(function(context, args) {

        const commandList = ROOT.Commands.Registry.List();

        var formattedList = "\n";

        for (const [commandID, command] of Object.entries(commandList)) {

            formattedList = formattedList + commandID + " -> " + command.description + "\n";

        }

        context.source.server.runCommandSilent(`/w ${context.source.player.username} ${formattedList}`);

        return 0;

    });
