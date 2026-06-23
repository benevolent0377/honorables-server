// this file will contain all the calculations for trait data, including the recalculation function

import { CONSTANTS } from "../../core/constants";
import { TRAITS, verifyTraitExists } from "./trait_registry";
import { TRAIT_FACTORS, FACTOR_WEIGHTS } from "./trait_factors"

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
        return 0;
    }

    var weightedValues = calculateWeightedValues(trait, getFactors(trait));

    // calculation goes here
    
}

function getFactors(trait) {
    // this function gets the applicable factors for the trait given

    const traitIDList = CONSTANTS.TRAIT_ID.LIST;
    const traitKeys = CONSTANTS.TRAIT_ID.LIST_KEYS;

    var factors = {};

    for (index in traitIDList) {

        if (trait == traitIDList[index] || trait == undefined) {

            factors[traitKeys[index]] = TRAIT_FACTORS[traitKeys[index]];

        }

    }

    return factors;

}

function getFactorValuesFromSource(factors) {
    // this function will return the values of the factors


}

function getWeights(factors) {
    // this function gets the weights of the factors provided to it
    // the factors dict will be organized like TRAIT: {
    //      SUBCAT_1: [factor 1, factor 2, factor 3, ....],
    //      SUBCAT_2: [factor 1, factor 2, ....],
    //         ....
    //}



}

function calculateWeightedValues(trait, factors) {
    // this function weighs the values of the factors and returns them in a formatted dict



}

export async function recalculateAtInterval(player) {

    //when game tick reaches recalulate tick, then recalculate

}