// this file is responsible for all nbt operations
import { log } from "./log";
import { TRAITS } from "../player/traits/trait_registry";

export function initPlayerData(player){

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

    playerData = getPlayerData(player);
    
    for (const [key, trait] of Object.entries(TRAITS)) {
        playerData.traits[trait.id] = trait.export();
    }

    return 0;

}

export function playerHasRoot(player, quickInit=false) {
    if (player.persistentData.honorables == undefined){
        if (quickInit) {
            initPlayerData(player);
            return true;
        }

        return false;
    }
    else {
        return true;
    }
}

export function getTrait(player, trait, item=null) {

    if (item !== null) {
        return player.persistentData.honorables.traits[trait][item]
    }

    return player.persistentData.honorables.traits[trait];

}

export function editTrait(player, trait, item, value, append=false) {

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

}

export function addTraitModifier(player, trait, item, value) {

    const playerData = player.persistentData.honorables;
    const traitData = playerData.traits[trait];

    if (traitData.modifiers[item] == undefined) {
        console.log(`[ERROR] @ (nbt.js:modTrait) -> Item ${item} not found in player data under ${trait} trait.`);
        return 1;
    }

    traitData.modifiers[item].insert(value);

    return 0;

}

export function hasAbility(player, abilityID) {
    if (player.persistentData.honorables.abilities[abilityID] == undefined){
        return false;
    }
    
    return true;
}

export function getAbilities(player, ability=undefined) {

    const playerData = player.persistentData.honorables;
    const abilityList = playerData.abilities;

    if (ability == undefined) {
        return abilityList;
    }

    if (abilityList[ability] == undefined) {
        return undefined
    }
    
    return abilityList[ability];

}

export function editAbilities(player, abilityExport, operation){

    const abilityList = getAbilities(player);
    const newAbilityID = abilityExport.ID;

    //validateAbility() a function to check the ability registry to ensure this ability exists

    // checking the existence of the ability in the data
    var abilityExists = hasAbility(player, newAbilityID);

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

}

export function getPlayerData(player, isNBT=false) {

    if (!isNBT) {
    return player.persistentData.honorables;
    }
    else {
        return player.fullNBT;
    }

}

export function modAbility(player, abilityID, modifierExport, operation) {

    const playerData = player.persistentData.honorables;
    const abilityList = playerData.abilities;

    if (hasAbility(player, abilityID)){
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

}

// the quality functions are hard to implement here, as the quality system has not been developed yet

export function editQuality(player, itemID, qualityValue, operation="add"){

    //add the function here to add or remove the item quality

}

export function getQuality(player, item) {

    //return the quality of the item

}