module.exports = Core;

/************
 * Requires *
 ************/
var Server = require("./server");
var Rest = require("./rest");
var DB = require("./db");
var IO = require("./io");

function Core(mode) {
  if (!(this instanceof Core)) {
    return new Core();
  }
  var self = this;
  self.mode = mode;

  self.on("serverSetup", function(express){
    self.rest = new Rest(self, this.express);
  });

  self.server = new Server(this, 3000);
}

Core.prototype = {
  server: null,
  rest: null,

  close: function(){
    if(this.server) {
      this.server.close();
    }
  },

  log: function(message){
    console.log('Dashboard: '+message);
  },

  events: {},

  /**
   * On Event
   * @param  {String}   identifier [name of the event]
   * @param  {Function} callback   [method called when event is active]
   */
  on: function(identifier, callback) {
    if(!identifier || !callback) {
      throw new IncorrectArgumentType("The identifier or callback cant be null.");
    }


    if(!this.events[identifier]) {
      this.events[identifier] = [];
    }
    this.events[identifier].push(callback);
  },

  /**
   * Call Event
   * @param  {String} identifier [name of the event]
   */
  call: function(identifier, data) {
    for(var event in this.events[identifier]) {
      if (typeof event == "function") {
        event(data);
      }
    }
  }
};

/**********
 * Errors *
 *********/
function IncorrectArgumentType(message) {
  this.name = "IncorrectArgumentType";
  this.message = message || "";
}
IncorrectArgumentType.prototype = Error.prototype;