global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.Command = function(commandID, args) {
    this.commandID = commandID.toLowerCase();
    this.args = args || [];
    this.op = function(argv) {
        console.log("No operation specified for command: " + this.commandID + ".");
    }

    this.registerSelf();
};

ROOT.Command.prototype.registerOperation = function(opFunction) {
    if (opFunction) {
        this.op = opFunction;
    }

    return this;
}

ROOT.Command.prototype.registerSelf = function() {
    ROOT.CommandRegistry.register(this);
}

ROOT.CommandRegistry = {
    commands: {},

    register: function(commandObj) {
        this.commands[commandObj.commandID] = commandObj;
    },

    find: function(commandID) {
        return this.commands[commandID.toLowerCase()];
    },

    run: function(context, input) {
        input = String(input || "");

        const messageSpliced = input.trim().toLowerCase().split(" ").filter(function(arg) {
            return arg.length > 0;
        });

        const commandName = messageSpliced[0];

        console.log(`[Command Registry] input=${input}, commandName=${commandName}`)

        if (!commandName) {
            return 0;
        }

        const command = this.find(commandName);

        if (!command) {
            return 0;
        }

        console.log(`[Command Registry] Successfully found command: ${commandName}.`)
        command.op(context, messageSpliced.slice(1));
        return 1;
    },

};
