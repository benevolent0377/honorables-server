global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;


ROOT.Log = ROOT.Log || {};

// Lightweight structured log payload. Kept constructor-based for Rhino/KubeJS compatibility.
function logData (type, fileName, functionName, vars, strings) {
        this.type = type,
        this.fileName = fileName;
        this.functionName = functionName;
        this.vars = vars || [];
        this.strings = strings || [""];
        this.shift = false;
        this.msg = "";

    }

logData.prototype.SetShift = function(isShifted) {

    // must be a bool
    this.shift = isShifted;

}

ROOT.Log.Format = function(logData) {

    var msg = "";

    for (var i = 0; i < logData.vars.length; i++) {
        msg = msg + String(logData.strings[i] || "");
        msg = msg + String(logData.vars[i]);
    }

    if (logData.vars.length < logData.strings.length) {
        msg = msg + logData.strings[logData.vars.length];
    }

    return msg;

} 

ROOT.Log.Write = function(type, fileName, functionName, argv, strings){

    // Public logging helper used by other namespaces.
    const data = new logData(type, fileName, functionName, argv, strings);

    data.msg = ROOT.Log.Format(data);    

    if (data.type == "DEBUG" && !ROOT.Constants.DEBUG_MODE)  {

        return 0;

    }

    console.log(`[${data.type}]->\n\t (${data.fileName} @ ${data.functionName}) \n\t\t${data.msg}`);

};
