global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Simple command abstraction for subcommands under /honorables.
ROOT.Command = function(commandID, args) {
    this.commandID = commandID.toLowerCase();
    this.args = args || [];
    this.op = function(argv) {
        console.log("No operation specified for command: " + this.commandID + ".");
    }

    this.registerSelf();
};

ROOT.Command.prototype.registerOperation = function(opFunction) {
    // Replaces the default no-op handler and returns the command for chaining.
    if (opFunction) {
        this.op = opFunction;
    }

    return this;
}

ROOT.Command.prototype.registerSelf = function() {
    // Commands register at construction time so loading the file is enough to make them available.
    ROOT.CommandRegistry.register(this);
}

ROOT.CommandRegistry = {
    commands: {},

    register: function(commandObj) {
        // Later registrations with the same ID overwrite earlier ones.
        this.commands[commandObj.commandID] = commandObj;
    },

    find: function(commandID) {
        return this.commands[commandID.toLowerCase()];
    },

    run: function(context, input) {
        // Dispatch input forwarded by onCommandRegistry.js after /honorables.
        input = String(input || "");

        const messageSpliced = input.trim().toLowerCase().split(" ").filter(function(arg) {
            return arg.length > 0;
        });

        const commandName = messageSpliced[0];

        console.log(`[Command Registry] input=${input}, commandName=${commandName}`)

        // Return 0 so Minecraft treats unknown/empty subcommands as unhandled.
        if (!commandName) {
            return 0;
        }

        const command = this.find(commandName);

        if (!command) {
            return 0;
        }

        console.log(`[Command Registry] Successfully found command: ${commandName}.`)
        // argv contains everything after the subcommand name.
        command.op(context, messageSpliced.slice(1));
        return 1;
    },

};
