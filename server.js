var jrc = require("./lib/server.js");
var fs = require("fs");

var config = {};
var state = {};
var server = null;

fs.readFile("./config.json", function(err,data) {
    if(!err) {
        config = JSON.parse(data);
    }
    fs.readFile("./state.json", function(err,data) {
        if(!err) {
            state = JSON.parse(data);
        }
        //god this is ugly.
        server = jrc.createServer("127.0.0.1",config,state);
        server.listen(41528);

    });
});

var exit = function() {
    console.log("Saving state and exiting.");
    var state = server.saveState();
    fs.writeFileSync("./state.json",state);
    console.log("Goodbye.");
};

process.on('SIGINT',function() {
    process.exit();
});

process.on('exit', exit);
