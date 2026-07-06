global.Honorables = global.Honorables || {};
var ROOT = global.HonorablesRoot || global.Honorables;


ROOT.Log = ROOT.Log || {};

// Lightweight structured log payload. Kept constructor-based for Rhino/KubeJS compatibility.
 function logData (type, fileName, functionName, params, msg) {
        this.type = type,
        this.fileName = fileName;
        this.functionName = functionName;
        this.params = params,
        this.msg = msg
    }

function writeLog (data) {

    // Central output format for code paths that should be traceable in kubejs/server.log.
    console.log(`[${data.type}] @ (${data.fileName}:${data.functionName}) ${data.msg}`);

}

ROOT.Log.write = function(type, fileName, functionName, argv, msg){

    // Public logging helper used by other namespaces.
    const data = new logData(type, fileName, functionName, argv, msg);

    writeLog(data);

};
