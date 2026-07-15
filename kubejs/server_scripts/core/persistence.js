global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Persistence boundary for player-owned and item-owned Honorables data.
// Player data lives under player.persistentData.honorables; item quality should live on item NBT.
ROOT.Persistence = ROOT.Persistence || {};
ROOT.Persistence.Filter = ROOT.Persistence.Filter || {};
ROOT.Player = ROOT.Player || {};
ROOT.Player.Data = ROOT.Player.Data || {};
ROOT.Item = ROOT.Item || {};
ROOT.Item.Data = ROOT.Item.Data || {};

ROOT.Persistence.Filter.ToString = function(value) {
    // Console-safe conversion for debug output.
    if (value == undefined) {
        return "";
    }

    return String(value);
};

ROOT.Persistence.Filter.ToData = function(value, depth) {
    // Converts Java NBT tags and KubeJS/JS objects into plain data for dumps and exports.
    if (depth == undefined) {
        depth = 0;
    }

    if (depth > 32) {
        return ROOT.Persistence.Filter.ToString(value);
    }

    if (value == undefined || value === null) {
        return value;
    }

    if (ROOT.Persistence.Filter.IsCompoundTag(value)) {
        const compoundOut = {};
        const compoundKeys = [];
        var keyIterator = value.getAllKeys().iterator();

        // Snapshot keys before recursing so nested calls cannot replace the active Java iterator.
        while (keyIterator.hasNext()) {
            compoundKeys.push(String(keyIterator.next()));
        }

        for (var compoundIndex = 0; compoundIndex < compoundKeys.length; compoundIndex++) {
            var compoundKey = compoundKeys[compoundIndex];
            var childType = Number(value.getTagType(compoundKey));

            if (childType == 1) {
                compoundOut[compoundKey] = Number(value.getByte(compoundKey));
            }
            else if (childType == 2) {
                compoundOut[compoundKey] = Number(value.getShort(compoundKey));
            }
            else if (childType == 3) {
                compoundOut[compoundKey] = Number(value.getInt(compoundKey));
            }
            else if (childType == 4) {
                compoundOut[compoundKey] = Number(value.getLong(compoundKey));
            }
            else if (childType == 5) {
                compoundOut[compoundKey] = Number(value.getFloat(compoundKey));
            }
            else if (childType == 6) {
                compoundOut[compoundKey] = Number(value.getDouble(compoundKey));
            }
            else if (childType == 8) {
                compoundOut[compoundKey] = String(value.getString(compoundKey));
            }
            else {
                compoundOut[compoundKey] = ROOT.Persistence.Filter.ToData(value.get(compoundKey), depth + 1);
            }
        }

        return compoundOut;
    }

    if (ROOT.Persistence.Filter.IsListTag(value)) {
        const listOut = [];

        for (var listIndex = 0; listIndex < value.size(); listIndex++) {
            listOut.push(ROOT.Persistence.Filter.ToData(value.get(listIndex), depth + 1));
        }

        return listOut;
    }

    const tagValue = ROOT.Persistence.Filter.UnwrapTag(value);

    if (tagValue !== value) {
        return tagValue;
    }

    // Rhino cannot apply typeof to Java NBT values, so tags must be handled first.
    const valueType = typeof value;

    if (valueType == "string" || valueType == "number" || valueType == "boolean") {
        return value;
    }

    if (Array.isArray(value)) {
        const arrayOut = [];

        for (var arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
            arrayOut.push(ROOT.Persistence.Filter.ToData(value[arrayIndex], depth + 1));
        }

        return arrayOut;
    }

    const objectOut = {};
    const objectKeys = Object.keys(value);

    for (var objectIndex = 0; objectIndex < objectKeys.length; objectIndex++) {
        const objectKey = objectKeys[objectIndex];
        objectOut[objectKey] = ROOT.Persistence.Filter.ToData(value[objectKey], depth + 1);
    }

    return objectOut;
};

ROOT.Persistence.Filter.FromData = function(value) {
    return ROOT.Persistence.Filter.ToData(value);
};

ROOT.Persistence.Filter.GetJavaClassName = function(value) {
    if (value == undefined || value === null) {
        return "";
    }

    // Rhino can report Java methods as undefined even when they are callable.
    try {
        return String(value.getClass().getName());
    }
    catch (error) {
        return "";
    }
};

ROOT.Persistence.Filter.GetTagID = function(value) {
    if (value == undefined || value === null) {
        return -1;
    }

    try {
        return Number(value.getId());
    }
    catch (error) {
        return -1;
    }
};

ROOT.Persistence.Filter.IsCompoundTag = function(value) {
    return ROOT.Persistence.Filter.GetTagID(value) == 10;
};

ROOT.Persistence.Filter.IsListTag = function(value) {
    return ROOT.Persistence.Filter.GetTagID(value) == 9;
};

ROOT.Persistence.Filter.UnwrapTag = function(value) {
    // Primitive NBT tags are flattened here; compound/list tags are handled by ToData.
    const tagID = ROOT.Persistence.Filter.GetTagID(value);
    const className = ROOT.Persistence.Filter.GetJavaClassName(value);

    if (tagID == 8) {
        return String(value.getAsString());
    }

    if (tagID >= 1 && tagID <= 6) {
        return Number(value.getAsDouble());
    }

    if (className == "java.lang.String" || className == "java.lang.Character") {
        return String(value);
    }

    if (className == "java.lang.Boolean") {
        return Boolean(value.booleanValue());
    }

    if (
        className == "java.lang.Byte" ||
        className == "java.lang.Short" ||
        className == "java.lang.Integer" ||
        className == "java.lang.Long" ||
        className == "java.lang.Float" ||
        className == "java.lang.Double"
    ) {
        return Number(value.doubleValue());
    }

    if (tagID == 7 || tagID == 11 || tagID == 12) {
        const arrayOut = [];

        for (var arrayIndex = 0; arrayIndex < value.size(); arrayIndex++) {
            arrayOut.push(Number(value.get(arrayIndex)));
        }

        return arrayOut;
    }

    return value;
};

ROOT.Player.Data.Init = function(player){

    // Base shape expected by login repair, trait recalculation, abilities, and debug commands.
    player.persistentData.honorables = {
        class: "",
        traits: {
            "$runtime": {
                "recalculate-tick": 0
            }
        },
        abilities: {
            "$runtime": {}
        },
        history: {},
        $debug: {}
    };

    const playerData = ROOT.Player.Data.Get(player);
    
    // Seed every registered trait with its default structure.
    for (const [key, trait] of Object.entries(ROOT.Traits.Registry)) {
        playerData.traits[trait.id] = trait.ExportData();
    }

    return 0;

};

ROOT.Player.Data.HasRoot = function(player, quickInit) {

    // quickInit lets login repair missing data without every caller needing a separate init branch.
    if (quickInit == undefined) { 
        quickInit = false;
    }

    if (player.persistentData.honorables == undefined){
        if (quickInit) {
            ROOT.Player.Data.Init(player);
            return true;
        }

        return false;
    }
    else {
        return true;
    }
};

ROOT.Player.Data.GetTrait = function(player, trait, item) {

    // If item is null, return the full trait object; otherwise read a named field such as base.
    if (item !== null) {
        return player.persistentData.honorables.traits[trait][item]
    }

    return player.persistentData.honorables.traits[trait];

};

ROOT.Player.Data.EditTrait = function(player, trait, item, value, append) {

    // Return code 0 means success; 1 means the requested trait field was not present.
    const playerData = player.persistentData.honorables;
    const traitData = playerData.traits[trait];

    ROOT.Log.Write("DEBUG", "core/persistence.js", "EditTrait", [trait], ["Accessing data for trait: ", "...."]);

    if (traitData[item] == undefined) {
        ROOT.Log.Write("WARN", "core/persistence.js", "EditTrait", [trait], ["Failed to find trait: ", ".."]);
        return 1;
    }

    if (append) {
        traitData[item].insert(value);
    }
    else {
        traitData[item] = value;
        ROOT.Log.Write("DEBUG", "core/persistence.js", "EditTrait", [item, value], ["Set trait ", " to ", "."]);
    }

    return 0;

};

ROOT.Player.Data.AddTraitModifier = function(player, trait, item, value) {

    // Modifiers are stored inside the trait data and are intended to affect derived active values.
    const playerData = player.persistentData.honorables;
    const traitData = playerData.traits[trait];

    if (traitData.modifiers[item] == undefined) {
        ROOT.Log.Write("ERROR", "core/persistence.js", "AddTraitModifier", [item, trait], ["[ERROR] @ (nbt.js:modTrait) -> Item ", " not found in player data under ", " trait."]);
        return 1;
    }

    traitData.modifiers[item].insert(value);

    return 0;

};

ROOT.Player.Data.HasAbility = function(player, abilityID) {
    // Ability presence check is intentionally data-based; registry validation belongs elsewhere.
    if (player.persistentData.honorables.abilities[abilityID] == undefined){
        return false;
    }
    
    return true;
};

ROOT.Player.Data.GetAbilities = function(player, ability) {

    // With no ability ID, expose the whole ability map for command/debug use.
    const playerData = player.persistentData.honorables;
    const abilityList = playerData.abilities;

    if (ability == undefined) {
        return abilityList;
    }

    if (abilityList[ability] == undefined) {
        return undefined
    }
    
    return abilityList[ability];

};

ROOT.Player.Data.EditAbilities = function(player, abilityExport, operation){

    // Adds or removes serialized ability data from the player's persistent ability map.
    const abilityList = ROOT.Player.Data.GetAbilities(player);
    const newAbilityID = abilityExport.ID;

    //validateAbility() a function to check the ability registry to ensure this ability exists

    // checking the existence of the ability in the data
    var abilityExists = ROOT.Player.Data.HasAbility(player, newAbilityID);

    //parsing operation

    if (operation == "add"){

        if (abilityExists){
            return 1;
        }

        abilityList[newAbilityID] = abilityExport;
        return 0;

    }
    else if (operation == "remove"){

        if (!abilityExists){
            return 1;
        }

        delete abilityList[newAbilityID];
        return 0;

    }
    else {
        ROOT.Log.Write("ERROR", "core/persistence.js", "EditAbilities", [operation], ["[ERROR] @ (nbt.js:editAbilities) -> ", " operation does not exist."]);
        return 1;
    }

};

ROOT.Player.Data.Get = function(player, isNBT) {

    // Default path is Honorables persistent data; isNBT exposes full player NBT for source readers.
    if (!isNBT) {
        return player.persistentData.honorables;
    }
    else {
        return player.nbt;
    }

};

ROOT.Player.Data.Dump = function(player) {
    // Human-readable-ish dump for debug commands.
    const playerData = ROOT.Player.Data.Get(player);
    return ROOT.Persistence.Filter.ToString(playerData);
};

ROOT.Player.Data.ExportData = function(player) {
    // Plain JS export suitable for logging, comparison, or future migration helpers.
    const playerData = ROOT.Player.Data.Get(player);
    return ROOT.Persistence.Filter.ToData(playerData);
};

ROOT.Player.Data.ModAbility = function(player, abilityID, modifierExport, operation) {

    // Modifier updates target an existing ability entry and use the modifier export ID as the key.
    const playerData = player.persistentData.honorables;
    const abilityList = playerData.abilities;

    if (ROOT.Player.Data.HasAbility(player, abilityID)){
        //log goes here
        return 1;
    }

    var modifierExists = false;

    if (abilityList[abilityID].modifiers[modifierExport.ID] !== undefined){
        modifierExists = true;
    }

    if (operation == "add"){
        if (modifierExists) {
            //log error
            return 1;
        }

        abilityList[abilityID].modifiers[modifierExport.ID] = (modifierExport);
    }
    else if (operation == "remove") {
        if (!modifierExists) {
            //log error
            return 1;
        }

        delete abilityList[abilityID].modifiers[modifierExport.ID]
    }
    return 0;

};

// Quality helpers are placeholders. Canonically, quality is item-owned state at honorables.quality.

ROOT.Item.Data.EditQuality = function(item, qualityValue, operation){

    //add the function here to add or remove the item quality

};

ROOT.Item.Data.GetQuality = function(item) {

    //return the quality of the item

};
