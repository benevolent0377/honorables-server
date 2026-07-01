global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;


ROOT.Namespaces = {
    MOD_ID: "honorables",

    id(path) {
        return this.MOD_ID + ":" + path;
    }
}
