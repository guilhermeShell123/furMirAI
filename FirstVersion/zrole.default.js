/*
var harvest_energy = require('harvest_energy');
var nextRole = require('role.nextRole');
var roleDefault = {

    role_action: function(){
        //DO something
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }else{
            //Se nao puder, muda de role
            nextRole.role_action(creep);
        }
    },
    run: function(creep) {
        if(!harvest_energy.should_harvest(creep)){
            this.role_action(creep);  
        }
    }
};

module.exports = roleDefault;
*/