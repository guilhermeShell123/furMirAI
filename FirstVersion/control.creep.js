var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleControlUpgrader = require('role.control_upgrader');
var roleRepair = require('role.repair');
var roleWallRepair = require('role.wall_repair');
var rolePowerTower = require('role.power_tower');

var controlCreep = {
    
    run: function(){
        for(var name in Game.creeps){
            
            //console.log(name);
            creep = Game.creeps[name];
            //console.log(creep.ticksToLive);
            
            switch(creep.memory.role){
                case 'harvester':
                    var say_string = 'harv: ' + creep.carry.energy;
                    creep.say(say_string);
                    roleHarvester.run(creep);
                    break;
                case 'builder':
                    var say_string = 'build: ' + creep.carry.energy;
                    creep.say(say_string);
                    roleBuilder.run(creep);
                    break;
                case 'control_upgrader':
                    var say_string = 'upgr: ' + creep.carry.energy;
                    creep.say(say_string);
                    roleControlUpgrader.run(creep);
                    break;
                case 'repair':
                    creep.say('rpair: ' + creep.carry.energy);
                    roleRepair.run(creep);
                    break;
                case 'wall_repair':
                    creep.say('wall: ' + creep.carry.energy);
                    roleWallRepair.run(creep);
                    break;
                case 'power_tower':
                    creep.say('pow: ' + creep.carry.energy);
                    rolePowerTower.run(creep);
                    break;
                
                default:
                console.log('something is wrong with this creep: ' + creep.memory.role);
                break;
            }
        }
    }
    
};
module.exports = controlCreep;