global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

// Trait recalculation pipeline: validate trait -> collect factors -> weight sources -> export to player data.
ROOT.Traits = ROOT.Traits || {};

ROOT.Traits.Attenuation.VALUE = ROOT.Traits.Attenuation.CONFIG.BLEND.LOOSE;

function isValidTrait(player, trait) {

    // Undefined means "calculate all traits"; otherwise require a known trait and matching player data.
    if (trait == undefined) {
        return true;
    }

    else if (!ROOT.Traits.VerifyTraitExists(trait)){
        //log the error as an invalid trait
        return false;
    }

    else if (ROOT.Player.Data.Get(player).traits[trait] == undefined) {
        //log the error as malformed player data
        return false;
    }
    
    else {
        return true;
    }
}

/**
 *  Calculates the new trait values for a player, specifed or unspecified, and writes them to persistent data.
 * @param {playerobject} player 
 * @param {string} trait (specified by ID. For example: trait_[traitName].) 
 * @returns None
 */
ROOT.Traits.CalculateTraitValue = function(player, trait) {

    // the trait calculation should be a wholistic recalculation of the player's traits, not an additive bonus
    // so all the factors should be weighted individually, then summed, then weighted by category, and finally summed again.
    // a calculation test function should exist to test different values against a range of predefined values
    // this range will be the allowed amount, per factor and per category, that a trait may increase in one calculation
    // settings to adjust this value will be simple, multiplicative constants like: None, Loose, Moderate, and Tight.
    // where none has no ceiling (0), LOOSE has a generous attenuation cap, MODERATE has a medium strength (noticable) cap, and TIGHT is strict.
    // this config will, for now, be stored in a local variable, but it will soon be stored in persistent data so it can be altered by a command

    // Public entrypoint used by commands and future scheduled recalculation hooks.
    if (!isValidTrait(player, trait)) {
        return 0;
    }

    var weightedValues = calculateWeightedValues(player, getFactors(player, trait));

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

            if (sourceKey != "id") {

               traitValue = (sourceData["categoryWeight"] * sourceData["sum"])+ traitValue;
               ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "CalculateTraitValue", [traitKey, traitValue], ["New value of ", " is ", "."]);

            }

        }

        traitValues[traitData["id"]] = traitValue + 10;
    }

    exportTraits(player, traitValues);
    
};

function exportTraits(player, traitValues) {

    ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "exportTraits", [], ["Exporting new trait values...."]);

    // Writes newly calculated base values back into persistent player trait data.
    for (const [traitID, traitValue] of Object.entries(traitValues)) {

        if (traitValue == 0) {
            traitValue = 10;
        }

        ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "exportTraits", [traitValue], ["", ""]);

        const roundedTraitValue = Number(Number.parseFloat(traitValue).toFixed(3));
        ROOT.Player.Data.EditTrait(player, traitID, "base", roundedTraitValue);

    }

}

function getFactors(player, trait) {
    // Selects factor definitions for one trait, or all traits when trait is undefined.

    const traitIDList = ROOT.Constants.TRAIT_ID.LIST;
    const traitKeys = ROOT.Constants.TRAIT_ID.LIST_KEYS;

    var factors = {};

    for (var index in traitIDList) {

        if (trait == traitIDList[index] || trait == undefined) {

            factors[traitKeys[index]] = ROOT.Traits.Factors.ByTrait(player)[traitKeys[index]];

        }

    }

    return factors;
    // factors here should look something like: 
    /**
        {any_trait_ID: {
            VANILLA_STATS: {
                    factor_1: weight_1,
                    factor_2: weight_2,
                    ....
                    factor_N: weight_N
                },
            .....
            STAGES: {
                    factor_1: weight_1,
                    factor_2: weight_2,
                    ....
                    factor_N: weight_N
                }
            },
        .....
        }

        and this repeats for each trait specified
    */

}


function calculateWeightedValues(player, factors) {
    // Weighs factor values by source category and by individual subfactor.
    /**
     * This function should take the weights of each factor given and apply it to the value of the factor,
     * then it should return the value as a formatted dict called weightedValues.
     */

    var weightedValues = {};

    for (const [traitKey, sourceCategories] of Object.entries(factors)) {

        ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "calculateWeightedValues", [traitKey, sourceCategories], ["TraitKey: ", ", sourceCategories: ", ""]);

        weightedValues[traitKey] = {};
        weightedValues[traitKey]["id"] = ROOT.Constants.TRAIT_ID.TRAIT_KEY_TO_ID[traitKey];

        for (const [sourceType, factorList] of Object.entries(sourceCategories)) {

            weightedValues[traitKey][sourceType] = {};
            weightedValues[traitKey][sourceType]["categoryWeight"] = ROOT.Traits.Factors.CategoryWeights[sourceType];
            weightedValues[traitKey][sourceType]["factors"] = {};

            var categorySum = 0;

            // Each factor is read through Traits.SourceRouter so source-specific logic stays isolated.
            for (const [factorName, weight] of Object.entries(factorList)) {

                var factorWeight = weight;

                    if (factorWeight == undefined){
                        factorWeight = 1;
                    }
                
                ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "calculateWeightedValues", [factorName], ["Getting value for factor named: ", "."]);
                var factorValue = ROOT.Traits.SourceRouter.GetValueFromSource(player, sourceType, factorName);


                    if (factorValue == undefined) {
                        factorValue = 0;
                    }

                var weightedValue = factorWeight * factorValue;

                ROOT.Log.Write("DEBUG", "player/traits/trait_calculations.js", "calculateWeightedValues", [factorName, weightedValue, factorWeight, factorValue], ["The weighted value for ", " is ", ". (weight: ", " & qty: ", ")"]);

                categorySum = categorySum + weightedValue;

                weightedValues[traitKey][sourceType]["factors"][factorName] = weightedValue;

            }

            weightedValues[traitKey][sourceType]["sum"] = categorySum;

        }
    }

    return weightedValues;

}

// Placeholder for a future onTick wrapper that throttles trait recalculation.
ROOT.Traits.RecalculateAtInterval = function(player) {

    //when game tick reaches recalulate tick, then recalculate

};

function Attenuate(oldTraitValue, newTraitValue) {

    newTraitValue = (oldTraitValue*ROOT.Traits.Attenuation.TOLERANCE) * ROOT.TRAITS.Attenuation.VALUE;

    if (newTraitValue > ROOT.Traits.Attenuation.CONFIG.CEILING){
        return ROOT.Traits.Attenuation.CONFIG.CEILING;
    }

    return newTraitValue;

}
