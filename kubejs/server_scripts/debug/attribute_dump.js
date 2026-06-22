ServerEvents.commandRegistry(event => {
    console.log("=== ATTRIBUTE DUMP START ===")

    Utils.getRegistryIds('attribute').forEach(id => {
        console.log(id)
    })

    console.log("=== ATTRIBUTE DUMP END ===")
});