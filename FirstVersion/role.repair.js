var harvest_energy = require('harvest_energy');
var roleControlUpgrader = require('role.control_upgrader');

var roleRepair = {
    
    role_action: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                                (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax) 
                                || (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity)
                                || (strucure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
                                //|| (structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax) 
                                //|| (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax)
                                
                                
                            );
                }
        });
        //targets.sort((a,b) => a.hits - b.hits);
        if(targets.length){
            if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
                //console.log('overhere-----------------------------------------------');
            }
        }else{
            //Se ele nao tiver mais o que fazer, ir construir
            //console.log('iamhere+++++++++++++++++++++++++++++++++++++++++++++++');
            roleControlUpgrader.role_action(creep);
        }
    },
    
    run: function(creep){
        if(!harvest_energy.should_harvest(creep, false)){
            this.role_action(creep);
            creep.memory.action = creep.memory.role;
        }
    }
};

module.exports = roleRepair;