

var basicSpawnCaretaker = {
		//nextRole: 'ExtensionCaretaker',
		role: 'BasicSpawnCaretaker',
		work: function(creep){
		    creep.say('bs');
			var target = Game.getObjectById(creep.memory.target);
			if(target.hits < target.hitsMax){
			    if(creep.repair(target) == ERR_NOT_IN_RANGE){
				    creep.moveTo(target);
			    }   
			}else{
			    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
				    creep.moveTo(target);
			    }    
			}
		},
		checkIfNeedToWork: function(creep){
		    //console.log('check basic spawn caretaker');
			var spawn = creep.room.find(FIND_STRUCTURES, {
			    filter:(str) => {return ((str.structureType == STRUCTURE_SPAWN || str.structureType == STRUCTURE_EXTENSION) && (str.energy < str.energyCapacity || str.hits < str.hitsMax ))} 
			    
			});
			if(spawn.length){
				creep.memory.target = spawn[0].id;
				return true;
			}
			return false;
		},
		generateBody: function(spawn){
		    
			var body = [];
			var xWork = 1;
			var xMove = 1;
			var xCarry = 1;
			
			for(var i = 0; i < xWork; i++)
				body.push(WORK);
			for(var i = 0; i < xMove; i++)
				body.push(MOVE);
			for(var i = 0; i < xCarry; i++)
				body.push(CARRY);
			
			return body;
		},
		checkIfNeedToSpawnMore: function(spawn){
			var max_creep = 2;
			
			var creep_check_spawn_caretaker = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == 'SpawnCaretaker' && spawn.id == creep.memory.spawnId );
			            
			var creep_check_self = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == this.role && spawn.id == creep.memory.spawnId );
			            
			if(creep_check_spawn_caretaker.length == 0 && creep_check_self.length == 0) {
			   return true;
			}else{
				return false;
			}
		}
	
};

module.exports = basicSpawnCaretaker;