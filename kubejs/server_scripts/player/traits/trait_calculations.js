global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// this file will contain all the calculations for trait data, including the recalculation function

ROOT.TraitCalculations = ROOT.TraitCalculations || {};

function isValidTrait(player, trait) {

    //error testing, return code 1 is an error
    if (trait == undefined) {
        return true;
    }

    else if (!ROOT.Traits.verifyTraitExists(trait)){
        //log the error as an invalid trait
        return false;
    }

    else if (ROOT.PlayerData.get(player).traits[trait] == undefined) {
        //log the error as malformed player data
        return false;
    }
    
    else {
        return true;
    }
}

ROOT.TraitCalculations.calculateTraitValue = function(player, trait) {

    if (!isValidTrait(player, trait)) {
        return 0;
    }

    var weightedValues = calculateWeightedValues(player, getFactors(trait));

    /**
     * weightedValues structure: {
     *      TRAIT: {
     *          FACTORTYPE_1: {
     *              categoryWeight: categoryWeight,
     *              factor_1: weightedValue,
     *              factor_2: weightedValue,
     *              .....
     *          },
     *          FACTORTYPE_2: {
     *              categoryWeight: categoryWeight,
     *              factor_1: weightedValue,
     *              ....
     *          },
     *          .....
     *      },
     *      .... (more traits if any)
     * }
     * 
     * NOTE that the weighted values are precalculated, meaning the calculation function
     * never sees the value of mods_killed or the value of a gamestage, it only sees the
     * product of that value times the weight, already precalculated.
     * 
     * Thsi function takes all the subfactor weightedValues and derives
     * the associated trait value from the categoryWeight and the sum of all the subfactor
     * weighted values. It will then subtract the total trait value from the current player
     * trait value, and package all the information in an easily digestible export.
     */
    const traitValues = {};

    for (const [traitKey, traitData] of Object.entries(weightedValues)) { 

        var traitValue = 0;

        for (const [sourceKey, sourceData] of Object.entries(traitData)) {

            if (sourceKey !== "id") {

               traitValue = (sourceData["categoryWeight"] * sourceData["sum"]) + traitValue;

            }

        }

        traitValues[traitData["id"]] = traitValue;

    }

    exportTraits(player, traitValues);
    
};

function exportTraits(player, traitValues) {

    for (const [traitID, traitValue] of Object.entries(traitValues)) {

        ROOT.PlayerData.editTrait(player, traitID, "base", traitValue);

    }

}

function getFactors(trait) {
    // this function gets the applicable factors for the trait given

    const traitIDList = ROOT.Constants.TRAIT_ID.LIST;
    const traitKeys = ROOT.Constants.TRAIT_ID.LIST_KEYS;

    var factors = {};

    for (var index in traitIDList) {

        if (trait == traitIDList[index] || trait == undefined) {

            factors[traitKeys[index]] = ROOT.TraitFactors.traitFactors[traitKeys[index]];

        }

    }

    return factors;

}

function calculateWeightedValues(player, factors) {
    // this function weighs the values of the factors and returns them in a formatted dict
    /**
     * This function should take the weights of each factor given and apply it to the value of the factor,
     * then it should return the value as a formatted dict called weightedValues.
     */

    var weightedValues = {};

    for (const [traitKey, sourceCategories] of Object.entries(factors)) {

        weightedValues[traitKey] = {};
        weightedValues[traitKey]["id"] = ROOT.Constants.TRAIT_ID.TRAIT_KEY_TO_ID[traitKey];

        for (const [sourceType, factorList] of Object.entries(sourceCategories)) {

            weightedValues[traitKey][sourceType] = {};
            weightedValues[traitKey][sourceType]["categoryWeight"] = ROOT.TraitFactors.factorWeights[sourceType].WEIGHT;
            weightedValues[traitKey][sourceType]["factors"] = {};

            var categorySum = 0;

            for (const factor of factorList) {

                var factorWeight = ROOT.TraitFactors.factorWeights[sourceType].SUBFACTOR_WEIGHTS[factor];

                    if (factorWeight == undefined){
                        factorWeight = 1;
                    }

                var factorValue = ROOT.TraitSourceRouter.getValueFromSource(player, sourceType, factor);

                    if (factorValue == undefined) {
                        factorValue = 0;
                    }

                const weightedValue = factorWeight * factorValue;

                categorySum = categorySum + weightedValue;

                weightedValues[traitKey][sourceType]["factors"][factor] = weightedValue;

            }

            weightedValues[traitKey][sourceType]["sum"] = categorySum;

        }
    }

    return weightedValues;

}

// this need to be made an onTick hook, or needs to be a wrapper for the ontick hook call in events
ROOT.TraitCalculations.recalculateAtInterval = function(player) {

    //when game tick reaches recalulate tick, then recalculate

};
