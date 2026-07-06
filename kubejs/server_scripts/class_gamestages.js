// Mirrors a player's chosen DawnCraft class into GameStages and Puffish Skills access.
PlayerEvents.tick(event => {

    const player = event.player;
    const server = event.server;
    var pickedClass = player.nbt.ForgeCaps["dcclasses:picked_class"].class;
    const classList = ["warrior", "naturalist", "miner", "adventurer", "mage"];
    const skillRootList = {"warrior": "y6pqwrf4us04ip0l", "mage": "0tc1j24jbasikl9s"};
    pickedClass = pickedClass.split(":")[1];
    const stageName = `class_${pickedClass}`;
    const puffCategory = pickedClass;

    // Once the class stage exists, the player has already been synced.
    if (player.stages.has(stageName)) {
        return;
    }

    server.runCommandSilent(`gamestage add ${player.username} ${stageName}`);

    // Lock every class category before opening the chosen class category.
    for (const classType of classList) {

        server.runCommandSilent(`puffish_skills category lock ${player.username} ${classType}`);

    }

    server.runCommandSilent(`puffish_skills category unlock ${player.username} ${puffCategory}`);
    // TODO: This currently always unlocks the warrior root ID; wire per-class root IDs before relying on it.
    server.runCommandSilent(`puffish_skills skills unlock ${player.username} ${puffCategory} ${skillRootList["warrior"]}`);

});
