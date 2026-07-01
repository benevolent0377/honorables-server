global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// event listener
PlayerEvent.chat(event => {

    messageSpliced = event.message.trim().toLowerCase().split(" ");

        if (messageSpliced[0] == ROOT.Constants.COMMAND.ROOT_ADDR) {

            const commandName = messageSpliced[1];

            if (!commandName) {
                return;
            }

            const argv = messageSpliced.slice(2);

            const command = ROOT.CommandRegistry.find(commandName.toLowerCase());

            if (command) {
                command.op(event, argv);
            }

        }

});
