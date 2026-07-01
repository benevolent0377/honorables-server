
global.Honorables = global.Honorables || {};
global.Honorables.Log = global.Honorables.Log || {};

 function logData (type, fileName, functionName, params, msg) {
        this.type = type,
        this.fileName = fileName;
        this.functionName = functionName;
        this.params = params,
        this.msg = msg
    }

function writeLog (data) {

    console.log(`[${data.type}] @ (${data.fileName}:${data.functionName}) ${data.msg}`);

}

global.Honorables.Log.write = function(type, fileName, functionName, argv, msg){

    const data = new logData(type, fileName, functionName, argv, msg);

    writeLog(data);

};
