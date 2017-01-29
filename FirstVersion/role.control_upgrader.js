var harvest_energy = require('harvest_energy');

var roleControlUpgrader = {

    role_action: function(creep){
        
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        else {
          //Do something else
        }
    },
    
    run: function(creep) {
        if(!harvest_energy.should_harvest(creep, true)){
            this.role_action(creep);      
            creep.memory.action = creep.memory.role;
        }
    }
};

module.exports = roleControlUpgrader;