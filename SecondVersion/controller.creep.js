var roleBasicSpawnCaretaker = require('role.basicSpawnCaretaker');
var roleSpawnCaretaker = require('role.spawnCaretaker');
var roleExtensionCaretaker = require('role.extensionCaretaker');
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleRoomControllerUpgrader = require('role.roomControllerUpgrader');
var roleTowerCaretaker = require('role.towerCaretaker');


var controlSpawn = {
    new_creep: function(spawn, roleName){
        var roleVar = eval('role'+roleName);
        var creep_check = roleVar.checkIfNeedToSpawnMore(spawn);
        
        if(creep_check) {
            var result = spawn.createCreep(roleVar.generateBody(spawn), undefined, {role: roleVar.role, spawnId: spawn.id});
            if(result != ERR_BUSY && result != ERR_NOT_ENOUGH_ENERGY){
                console.log('Spawning new creep: ' + roleVar.role + ' result: ' + result);
                return true;
            }
        }
    },
    
    run: function(spawn){
        var list_creep_types = [];
        var default_body = [WORK,WORK,CARRY,MOVE,MOVE];
        
        var creep_check = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == 'SpawnCaretaker' && spawn.id == creep.memory.spawnId );
		creep_check = creep_check.length;
		
		if(creep_check == 0 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable){
		    list_creep_types.push('BasicSpawnCaretaker');
		}else{
		    if(creep_check == 0){
		        list_creep_types.push('Harvester');
		        list_creep_types.push('SpawnCaretaker');
		    }
		    
		    list_creep_types.push('SpawnCaretaker');    
        	list_creep_types.push('Harvester');
            //list_creep_types.push('ExtensionCaretaker');
            list_creep_types.push('Builder');   
            list_creep_types.push('RoomControllerUpgrader'); 
            list_creep_types.push('TowerCaretaker'); 
            
		}
        
        //TODO: Verificar spawns depois
        
        for(var i = 0; i < list_creep_types.length; i++)
        {
            if(this.new_creep(spawn,list_creep_types[i])){
                return true;
            }
        }
        
    }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
var controllerCreep = {
    basicController: function(creep){
        //Get Energy
        if(creep.carry.energy < creep.carryCapacity){
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0]);
                }
            }
        }else{//Work
            if(eval('role'+creep.memory.role+'.checkIfNeedToWork(creep)')){
                eval('role'+creep.memory.role+'.work(creep);');    
            }
        }
    },
    
    normalController: function(creep){
        if(creep.carry.energy == 0 ){
            //Refil if not basicHarvester or towerCaretaker
            if(!creep.memory.container_target){
                var containers;
                if(creep.memory.role != 'TowerCaretaker'){
                    containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (str) => {
                            return str.structureType == STRUCTURE_CONTAINER && str.store.energy > 0 ;
                    }});
                    if(containers.length){
                        //Aleatorio
                        /*var randomContainer = Math.floor(Math.random() * containers.length);
                        creep.memory.container_target = containers[randomContainer].id;*/
                        
                        //Pegando o maior
                        containers.sort((a,b) => b.store.energy - a.store.energy);
                        
                        creep.memory.container_target = containers[0].id;
                        
                    }else{
                        //console.log('all containers are depleted');
                        creep.say('cont depleted');
                    }
                }else{
                    //TowerCareTaker
                    //Provavelmente dara error se estiver longe de um container
                    containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (str) => {return (str.structureType == STRUCTURE_CONTAINER && str.store.energy > 0)}});
                    if(creep.pos.getRangeTo(containers) < 10){
                        creep.memory.container_target = containers;
                    }
                } 
            }
            if(creep.memory.container_target){
                var container = Game.getObjectById(creep.memory.container_target);
                
                if(container){
                    if(container.transfer(creep,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container);
                    }else{
                        delete creep.memory.container_target;
                    }
                }
                if(!container){
                 delete creep.memory.container_target;
                }
            }
            //Finish refill
        }
        if(creep.carry.energy > 0){
            //Procura algo para fazer
            creep.memory.currentRole = creep.memory.role;
            var achouTarefa = false;
            while(!achouTarefa){
                if(eval('role'+creep.memory.role+'.checkIfNeedToWork(creep)')){
                    eval('role'+creep.memory.role+'.work(creep);');    
                    achouTarefa = true;
                }else{
                    if(eval('role'+creep.memory.currentRole+'.checkIfNeedToWork(creep)')){
                        eval('role'+creep.memory.currentRole+'.work(creep);');    
                        achouTarefa = true;
                    }else{
                        if(eval('role'+creep.memory.currentRole+'.nextRole')){
                            creep.memory.currentRole = eval('role'+creep.memory.currentRole+'.nextRole');
                            
                        }else{
                            achouTarefa = true;//Nao tem o que fazer
                        }
                    }    
                }
                   
            }
            creep.memory.currentRole = creep.memory.role;
        }//End if energy > 0  
    },
//---------------------------------------------------------------------------------------------------------------------------------------------------------    
    run: function(){
        
        for(var spawnName in Game.spawns){controlSpawn.run(Game.spawns[spawnName]);}
        
        
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            switch(creep.memory.role){
                case 'BasicSpawnCaretaker':
                    this.basicController(creep);
                    break;
                    
                case 'TowerCaretaker':
                    if(roleTowerCaretaker.checkIfNeedToWork(creep)){
                        roleTowerCaretaker.work(creep);
                    }
                    break;
                case 'Harvester':
                    if(roleHarvester.checkIfNeedToWork(creep)){
                        roleHarvester.work(creep);
                    }
                    break;
                    
                default:
                    this.normalController(creep);
                    break;
            }
        }//End for name in creeps
        
    }//End run
};


module.exports = controllerCreep;