var controllerCreep = require('controller.creep');
//var roleextensionCaretaker = require('role.extensionCaretaker');
//var rolespawnCaretaker = require('role.spawnCaretaker');
var controllerTower = require('controller.tower');
module.exports.loop = function () {
    Memory.TowerConfig = {RepairWall: false};
    
    controllerCreep.run();
    controllerTower.run();
    
}