

var extensionCaretaker = {
		nextRole: 'Builder',
		role: 'ExtensionCaretaker',
		work: function(creep){
		    creep.say('e');
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
			if(!target){
			    delete creep.memory.target;
			}
		},
		checkIfNeedToWork: function(creep){
			var spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			    filter:(str) => {return (str.structureType == STRUCTURE_EXTENSION && (str.energy < str.energyCapacity || str.hits < str.hitsMax ))} 
			    
			});
			if(spawn){
				creep.memory.target = spawn.id;
				return true;
			}
			return false;
		},
		generateBody: function(spawn){
		    //spawn -> veriicar a quantidade de energia
			var body = [];
			var xWork = 1;
			var xMove = Math.floor(((spawn.room.energyCapacityAvailable - xWork * BODYPART_COST[WORK]) /2)/BODYPART_COST[MOVE]);
			var xCarry = Math.floor((spawn.room.energyCapacityAvailable - xWork * BODYPART_COST[WORK] - xMove * BODYPART_COST[MOVE]) / BODYPART_COST[CARRY]);
			
			for(var i = 0; i < xWork; i++)
				body.push(WORK);
			for(var i = 0; i < xMove; i++)
				body.push(MOVE);
			for(var i = 0; i < xCarry; i++)
				body.push(CARRY);
			
			return body;
		},
		checkIfNeedToSpawnMore: function(spawn){
			var max_creep = 0;
			
			var creep_check = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == this.role && spawn.id == creep.memory.spawnId );
    
			if(creep_check.length < max_creep) {
			   return true;
			}else{
				return false;
			}
		}
	
};

module.exports = extensionCaretaker;