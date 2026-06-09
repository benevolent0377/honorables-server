PlayerEvents.loggedIn(event => {

    const player = event.player;
    const server = event.server;
    var pickedClass = player.nbt.ForgeCaps["dcclasses:picked_class"].class;
    const classList = ["warrior", "berserker", "agriculturalist", "marauder", "miner", "ranger", "scout", "mage"];

    pickedClass = pickedClass.split(":")[1];
    const stageName = `class_${pickedClass}`;
    const puffCategory = pickedClass;

    server.runCommandSilent(`gamestage add ${player.username} ${stageName}`);

    for (const classType of classList) {

        server.runCommandSilent(`puffish_skills category lock ${player.username} ${classType}`);

    }

    server.runCommandSilent(`puffish_skills category unlock ${player.username} ${puffCategory}`);

});
