var harvest_energy = require('harvest_energy');
var roleBuilder = require('role.builder');

var roleHarvester = {
    
    role_action: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                }
        });
        if(targets.length){
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
                //console.log('overhere-----------------------------------------------');
            }
        }else{
            //Se ele nao tiver mais o que fazer, ir construir
            //console.log('iamhere+++++++++++++++++++++++++++++++++++++++++++++++');
            roleBuilder.role_action(creep, true);
        }
    },
    
    run: function(creep){
        if(!harvest_energy.should_harvest(creep, true)){
            this.role_action(creep);
            creep.memory.action = 'full';
        }
    }
};

module.exports = roleHarvester;