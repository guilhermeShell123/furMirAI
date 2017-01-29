

var builder = {
		nextRole: 'RoomControllerUpgrader',
		role: 'Builder',
		work: function(creep){
		    creep.say('b');
			var target = Game.getObjectById(creep.memory.target);
			
			if(target){
    		    if(creep.build(target) == ERR_NOT_IN_RANGE){
    			    creep.moveTo(target);
    		    }   
    		    if(!target.progressTotal){
    			    delete creep.memory.target;
    			}
			}else{
			    delete creep.memory.target;
			}
			
			
			
		},
		checkIfNeedToWork: function(creep){
			var targets =creep.room.find(FIND_CONSTRUCTION_SITES);
			if(!creep.memory.target){
    			if(targets.length){
    				creep.memory.target = targets[Math.floor(Math.random() * targets.length)].id;
    				return true;
    			}
    			return false;
			}else{
			    return true;
			}
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
			var max_creep = 2;
			
			var creep_check = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == this.role && spawn.id == creep.memory.spawnId );
    
			if(creep_check.length < max_creep) {
			   return true;
			}else{
				return false;
			}
		}
	
};

module.exports = builder;