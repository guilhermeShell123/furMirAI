/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvest_energy');
 * mod.thing == 'a thing'; // true
 */
var harvest_energy = {
    harvest_energy: function(creep, closest){
        if(creep.carry.energy < creep.carryCapacity){
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length){
                if(closest){
                    if(creep.harvest(sources[sources.length-1]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[sources.length-1]);
                    }
                }else{
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0]);
                    }
                }
            }//Talvez verificar se nao tiver mais recursos
            return true;
        };
        return false;
    },
    
    should_harvest: function(creep, closest){
        if(creep.carry.energy == 0){
            creep.memory.action = 'harvester';
        }
        
        if(creep.memory.action == 'harvester'){
            if(!this.harvest_energy(creep, closest)){
                creep.memory.acion = 'full';
                return false;
            }
            return true;
        }
    }
};
module.exports = harvest_energy;