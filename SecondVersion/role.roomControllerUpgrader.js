

var roomControllerUpgrader = {
		//nextRole: 'RoomControllerUpgrader',
		role: 'RoomControllerUpgrader',
		work: function(creep){
		    creep.say('cupgrader');
			
		    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
			
			
			
		},
		checkIfNeedToWork: function(creep){
			return true;
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
			var max_creep = 1;
			
			var creep_check = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == this.role && spawn.id == creep.memory.spawnId );
    
			if(creep_check.length < max_creep) {
			   return true;
			}else{
				return false;
			}
		}
	
};

module.exports = roomControllerUpgrader;