global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;


// Small ID helper for resources owned by the Honorables namespace.
ROOT.Namespaces = {
    MOD_ID: "honorables",

    ID(path) {
        return this.MOD_ID + ":" + path;
    }
}
