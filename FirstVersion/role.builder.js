var harvest_energy = require('harvest_energy');
var roleControlUpgrader = require('role.control_upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    role_action: function(creep, reverse){
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(reverse){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                if(creep.build(targets[targets.length-1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targets.length-1]);
                }
            }
        }else{
            //Se nao tiver mais nada para construir, upgrade controller 
            roleControlUpgrader.role_action(creep);
        }
    },
    run: function(creep) {
        
        if(!harvest_energy.should_harvest(creep, false)){
            this.role_action(creep, true);   
            creep.memory.action = creep.memory.role;
        }
    }
};

module.exports = roleBuilder;