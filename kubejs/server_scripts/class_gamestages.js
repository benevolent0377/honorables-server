PlayerEvents.tick(event => {

    const player = event.player;
    const server = event.server;
    var pickedClass = player.nbt.ForgeCaps["dcclasses:picked_class"].class;
    const classList = ["warrior", "farmer", "miner", "ranger", "explorer", "mage"];
    const skillRootList = {"warrior": "y6pqwrf4us04ip0l"};
    pickedClass = pickedClass.split(":")[1];
    const stageName = `class_${pickedClass}`;
    const puffCategory = pickedClass;

    if (player.stages.has(stageName)) {
        return;
    }

    server.runCommandSilent(`gamestage add ${player.username} ${stageName}`);

    for (const classType of classList) {

        server.runCommandSilent(`puffish_skills category lock ${player.username} ${classType}`);

    }

    server.runCommandSilent(`puffish_skills category unlock ${player.username} ${puffCategory}`);
    server.runCommandSilent(`puffish_skills skills unlock ${player.username} ${puffCategory} ${skillRootList["warrior"]}`);

});
