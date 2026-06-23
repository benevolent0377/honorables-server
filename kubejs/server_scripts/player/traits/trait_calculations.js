// this file will contain all the calculations for trait data, including the recalculation function

import { CONSTANTS } from "../../core/constants";
import { verifyTraitExists } from "./trait_registry";

function isValidTrait(player, trait=undefined) {

    //error testing, return code 1 is an error

    if (!verifyTraitExists(trait)){
        //log the error as an invalid trait
        return false;
    }

    else if (trait == undefined) {
        //log the error as malformed player data
        return false;
    }
    
    else {
        return true;
    }
}



export function calculateTraitValue(player, trait=undefined) {

    if (!isValidTrait(player, trait)) {

    }
    

}

export async function recalculateAtInterval(player) {

    //when game tick reaches recalulate tick, then recalculate

}