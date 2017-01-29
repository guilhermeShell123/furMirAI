//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');

var controlMemory = require('control.memory');
var controlSpawn = require('control.spawn');
var controlCreep = require('control.creep');
var buildingTower = require('building.tower');

module.exports.loop = function () {
    
    controlMemory.clear_dead_memory();
    controlSpawn.run();
    controlCreep.run();
    
    buildingTower.defense(Game.spawns.spawn1);
    /*
    var list_obj = Game.spawns.spawn1.room.lookAt(45,24);
    for(var prop in Game.creeps['Evelyn']){
        console.log(prop);
    }
   console.log('---------');*/
}