function objectTarget(quantidadeRepeticoes, targetId){
  this.quantidadeRepeticoes = quantidadeRepeticoes;
  this.targetId = targetId;
}

var towerCaretaker = {
		//nextRole: 'Nothing',
		role: 'TowerCaretaker',
		work: function(creep){
		    creep.say('t');
			var target = Game.getObjectById(creep.memory.target);
			//console.log(creep.carry.energy + this.xwork * 2);
			//console.log(creep.carryCapacity);
			if(creep.carry.energy == 0){
			    //console.log('container?');
			    //Escolher um container proximo
			    if(!creep.memory.container){
		            var distanciaMaxima = 10;
        		    var conteiner_proximo = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (str) => {return str.structureType == STRUCTURE_CONTAINER && str.store.energy < str.storeCapacity}});
        		    
        		    if(conteiner_proximo){
        		        creep.memory.container = conteiner_proximo.id;
        		    }
			    }
			    if(creep.memory.container){
			        var conteiner = Game.getObjectById(creep.memory.container);
			        
			        if(conteiner.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                    creep.moveTo(Game.getObjectById(creep.memory.container));
	                }else{
	                    delete creep.memory.container;
	                }
			    }else{
			        //console.log('nothing to do here');
			        delete creep.memory.container;
			    }
			}else{
			    if(!creep.memory.tower){
			        var tower = creep.room.find(FIND_STRUCTURES, {filter: (str) => 
			        {return str.structureType == STRUCTURE_TOWER && str.energy < str.energyCapacity}});
			        
			        tower.sort((a,b)=> b.energy - a.energy);
			        creep.memory.tower = tower[0].id;
			    }
			    if(creep.memory.tower){
			        var tower = Game.getObjectById(creep.memory.tower);
			        if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
			            creep.moveTo(tower);
			        }
			    }
			}
		},
		
		checkIfNeedToWork: function(creep){
		    //Escolher uma fonte de energia
			if(!creep.memory.target){
			    var possibleTargets = creep.room.find(FIND_SOURCES);
			    var list_possibleTargets = [];
			    
			    for(var indexPossibleTargets in possibleTargets){
			        var creepsInTarget = _.filter(Game.creeps,(creep) => creep.memory.role == this.role && creep.memory.target == possibleTargets[indexPossibleTargets].id);
			        list_possibleTargets.push(new objectTarget(creepsInTarget.length, possibleTargets[indexPossibleTargets].id));
			    }
			    list_possibleTargets.sort((a,b) => b.quantidadeRepeticoes - a.quantidadeRepeticoes);
			    
			    creep.memory.target = list_possibleTargets[0].targetId;
			}
            return true;
			
		},
		generateBody: function(spawn){
		    
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
			//Variavel de controle para testes
			//deixar no 0 caso queira que o max_creep seja um numero exato de creeps
			//deixar no 1 caso max_creep multiplique pela quantidade de energias
			var controle_multiplicar_1_e_Contar_0 = 1;
			
			var creep_check = _.filter(Game.creeps, 
			            (creep) => creep.memory.role == this.role && spawn.id == creep.memory.spawnId );
            
            var sources = spawn.room.find(FIND_STRUCTURES, {filter: (str) => {return str.structureType == STRUCTURE_TOWER}});
            var sources = sources.length;
            
			if(creep_check.length < (sources * max_creep * controle_multiplicar_1_e_Contar_0) + (max_creep - (max_creep * controle_multiplicar_1_e_Contar_0))) {
			   return true;
			}else{
				return false;
			}
			
		}
	
};

module.exports = towerCaretaker;