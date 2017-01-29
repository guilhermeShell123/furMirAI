
function Creeps(memory_role, max_count, body){
    this.memory_role = memory_role;
    this.max_count = max_count;
    this.body = body;
}

 
var controlSpawn = {
    new_creep: function(spawn, creep_object){
        //TODO: verificar se exite Spawn.room e comparar com o creep.room, controle por sala
        var creep_check = _.filter(Game.creeps, (creep) => creep.memory.role == creep_object.memory_role);
        //console.log('Harvesters: ' + creep_check.length);
    
        if(creep_check.length < creep_object.max_count) {
            var result = spawn.createCreep(creep_object.body, undefined, {role: creep_object.memory_role, action: creep_object.memory_role});
            if(result != ERR_BUSY && result != ERR_NOT_ENOUGH_ENERGY){
                console.log('Spawning new creep: ' + creep_object.memory_role + ' result: ' + result);
            }
        }
    },
    
    run: function(){
        var list_creep_types = [];
        var default_body = [WORK,WORK,CARRY,MOVE,MOVE];
        
        list_creep_types.push(new Creeps('harvester', 3, [WORK, CARRY, MOVE]));
        list_creep_types.push(new Creeps('power_tower', 2, default_body));
        //list_creep_types.push(new Creeps('harvester', 6, default_body));
        list_creep_types.push(new Creeps('control_upgrader', 1, [WORK,CARRY,MOVE]));
        //list_creep_types.push(new Creeps('repair', 2, default_body));
        //list_creep_types.push(new Creeps('wall_repair', 2, default_body));
        list_creep_types.push(new Creeps('builder',5, default_body));
        list_creep_types.push(new Creeps('control_upgrader', 3, default_body));
        //list_creep_types.push(new Creeps('repair', 1, [WORK, CARRY,MOVE]));
        
        //TODO: Verificar spawns depois
        spawn = Game.spawns.spawn1;
        
        for(var i = 0; i < list_creep_types.length; i++)
        {
            this.new_creep(spawn,list_creep_types[i]);
        }
        
        
    }
};
module.exports = controlSpawn;