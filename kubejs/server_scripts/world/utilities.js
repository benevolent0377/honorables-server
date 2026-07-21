global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;

ROOT.World = ROOT.World || {};
ROOT.World.Utils = ROOT.World.Utils || {};


// time unit conversions

ROOT.World.Utils.SecondstoTicks = function(timeInSeconds) {
    return timeInSeconds * 20;
}

ROOT.World.Utils.MinutestoTicks = function(timeInMinutes) {
    return (timeInMinutes *60 ) *20;
}

ROOT.World.Utils.TickstoSeconds = function(timeInTicks) {
    return timeInTicks / 20;
}

ROOT.World.Utils.TickstoMinutes = function(timeInTicks) {
    return (timeInTicks / 20) / 60;
}