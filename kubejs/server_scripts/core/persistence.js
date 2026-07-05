global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// this file is responsible for all nbt operations
ROOT.Persistence = ROOT.Persistence || {};
ROOT.Persistence.Filter = ROOT.Persistence.Filter || {};
ROOT.PlayerData = ROOT.PlayerData || {};
ROOT.ItemData = ROOT.ItemData || {};

ROOT.Persistence.Filter.toString = function(value) {
    if (value == undefined) {
        return "";
    }

    return String(value);
};

ROOT.Persistence.Filter.toData = function(value, depth) {
    if (depth == undefined) {
        depth = 0;
    }

    if (depth > 32) {
        return ROOT.Persistence.Filter.toString(value);
    }

    if (value == undefined || value === null) {
        return value;
    }

    const valueType = typeof value;

    if (valueType == "string" || valueType == "number" || valueType == "boolean") {
        return value;
    }

    const tagValue = ROOT.Persistence.Filter.unwrapTag(value);

    if (tagValue !== value) {
        return tagValue;
    }

    if (Array.isArray(value)) {
        const arrayOut = [];

        for (var arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
            arrayOut.push(ROOT.Persistence.Filter.toData(value[arrayIndex], depth + 1));
        }

        return arrayOut;
    }

    if (ROOT.Persistence.Filter.isCompoundTag(value)) {
        const compoundOut = {};
        const keys = value.getAllKeys().toArray();

        for (var compoundIndex = 0; compoundIndex < keys.length; compoundIndex++) {
            const compoundKey = String(keys[compoundIndex]);
            compoundOut[compoundKey] = ROOT.Persistence.Filter.toData(value.get(compoundKey), depth + 1);
        }

        return compoundOut;
    }

    if (ROOT.Persistence.Filter.isListTag(value)) {
        const listOut = [];

        for (var listIndex = 0; listIndex < value.size(); listIndex++) {
            listOut.push(ROOT.Persistence.Filter.toData(value.get(listIndex), depth + 1));
        }

        return listOut;
    }

    const objectOut = {};
    const objectKeys = Object.keys(value);

    for (var objectIndex = 0; objectIndex < objectKeys.length; objectIndex++) {
        const objectKey = objectKeys[objectIndex];
        objectOut[objectKey] = ROOT.Persistence.Filter.toData(value[objectKey], depth + 1);
    }

    return objectOut;
};

ROOT.Persistence.Filter.fromData = function(value) {
    return ROOT.Persistence.Filter.toData(value);
};

ROOT.Persistence.Filter.getJavaClassName = function(value) {
    if (value == undefined || value.getClass == undefined) {
        return "";
    }

    return String(value.getClass().getName());
};

ROOT.Persistence.Filter.isCompoundTag = function(value) {
    return ROOT.Persistence.Filter.getJavaClassName(value) == "net.minecraft.nbt.CompoundTag";
};

ROOT.Persistence.Filter.isListTag = function(value) {
    return ROOT.Persistence.Filter.getJavaClassName(value) == "net.minecraft.nbt.ListTag";
};

ROOT.Persistence.Filter.unwrapTag = function(value) {
    const className = ROOT.Persistence.Filter.getJavaClassName(value);

    if (className == "net.minecraft.nbt.StringTag") {
        return String(value.getAsString());
    }

    if (
        className == "net.minecraft.nbt.ByteTag" ||
        className == "net.minecraft.nbt.ShortTag" ||
        className == "net.minecraft.nbt.IntTag" ||
        className == "net.minecraft.nbt.LongTag" ||
        className == "net.minecraft.nbt.FloatTag" ||
        className == "net.minecraft.nbt.DoubleTag"
    ) {
        return Number(value.getAsString());
    }

    if (className == "net.minecraft.nbt.ByteArrayTag" || className == "net.minecraft.nbt.IntArrayTag" || className == "net.minecraft.nbt.LongArrayTag") {
        const arrayOut = [];

        for (var arrayIndex = 0; arrayIndex < value.size(); arrayIndex++) {
            arrayOut.push(Number(value.get(arrayIndex)));
        }

        return arrayOut;
    }

    return value;
};

ROOT.PlayerData.init = function(player){

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

    const playerData = ROOT.PlayerData.get(player);
    
    for (const [key, trait] of Object.entries(ROOT.Traits.registry)) {
        playerData.traits[trait.id] = trait.exportData();
    }

    return 0;

};

ROOT.PlayerData.hasRoot = function(player, quickInit) {

    if (quickInit == undefined) { 
        quickInit = false;
    }

    if (player.persistentData.honorables == undefined){
        if (quickInit) {
            ROOT.PlayerData.init(player);
            return true;
        }

        return false;
    }
    else {
        return true;
    }
};

ROOT.PlayerData.getTrait = function(player, trait, item) {

    if (item !== null) {
        return player.persistentData.honorables.traits[trait][item]
    }

    return player.persistentData.honorables.traits[trait];

};

ROOT.PlayerData.editTrait = function(player, trait, item, value, append) {

    const playerData = player.persistentData.honorables;
    const traitData = playerData.traits[trait];

    if (traitData[item] == undefined) {
        return 1;
    }

    if (append) {
        traitData[item].insert(value);
    }
    else {
        traitData[item] = value;
    }

    return 0;

};

ROOT.PlayerData.addTraitModifier = function(player, trait, item, value) {

    const playerData = player.persistentData.honorables;
    const traitData = playerData.traits[trait];

    if (traitData.modifiers[item] == undefined) {
        console.log(`[ERROR] @ (nbt.js:modTrait) -> Item ${item} not found in player data under ${trait} trait.`);
        return 1;
    }

    traitData.modifiers[item].insert(value);

    return 0;

};

ROOT.PlayerData.hasAbility = function(player, abilityID) {
    if (player.persistentData.honorables.abilities[abilityID] == undefined){
        return false;
    }
    
    return true;
};

ROOT.PlayerData.getAbilities = function(player, ability) {

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

ROOT.PlayerData.editAbilities = function(player, abilityExport, operation){

    const abilityList = ROOT.PlayerData.getAbilities(player);
    const newAbilityID = abilityExport.ID;

    //validateAbility() a function to check the ability registry to ensure this ability exists

    // checking the existence of the ability in the data
    var abilityExists = ROOT.PlayerData.hasAbility(player, newAbilityID);

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
        console.log(`[ERROR] @ (nbt.js:editAbilities) -> ${operation} operation does not exist.`);
        return 1;
    }

};

ROOT.PlayerData.get = function(player, isNBT) {

    if (!isNBT) {
        return player.persistentData.honorables;
    }
    else {
        return player.fullNBT;
    }

};

ROOT.PlayerData.dump = function(player) {
    const playerData = ROOT.PlayerData.get(player);
    return ROOT.Persistence.Filter.toString(playerData);
};

ROOT.PlayerData.exportData = function(player) {
    const playerData = ROOT.PlayerData.get(player);
    return ROOT.Persistence.Filter.toData(playerData);
};

ROOT.PlayerData.modAbility = function(player, abilityID, modifierExport, operation) {

    const playerData = player.persistentData.honorables;
    const abilityList = playerData.abilities;

    if (ROOT.PlayerData.hasAbility(player, abilityID)){
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

// the quality functions are hard to implement here, as the quality system has not been developed yet

ROOT.ItemData.editQuality = function(item, qualityValue, operation){

    //add the function here to add or remove the item quality

};

ROOT.ItemData.getQuality = function(item) {

    //return the quality of the item

};
