function objectTarget(quantidadeRepeticoes, targetId){
  this.quantidadeRepeticoes = quantidadeRepeticoes;
  this.targetId = targetId;
}

var extensionCaretaker = {
		//nextRole: 'Nothing',
		role: 'Harvester',
		work: function(creep){
		    
		    creep.say('h');
			var target = Game.getObjectById(creep.memory.target);
			//console.log(creep.carry.energy + this.xwork * 2);
			//console.log(creep.carryCapacity);
			
			if(creep.carry.energy + creep.memory.amountEnergyPerTick  < creep.carryCapacity){
			    //console.log('i whousl wosdf');
			    if(creep.harvest(target) == ERR_NOT_IN_RANGE){
			        creep.moveTo(target);
			    }
			}else{
			    //console.log('container?');
			    //Escolher um container proximo
			    if(!creep.memory.container){
		            var distanciaMaxima = 10;
        		    var conteiner_proximo = creep.room.find(FIND_STRUCTURES, {filter: (str) => {return str.structureType == STRUCTURE_CONTAINER && str.store.energy + creep.carry.energy < str.storeCapacity}});
        		    
        		    if(conteiner_proximo.length){
        		        var list_container_proximo = [];
        		        for(var index in conteiner_proximo){
        		            //console.log(creep.pos.getRangeTo(conteiner_proximo[index]));
        		            if(creep.pos.getRangeTo(conteiner_proximo[index]) < distanciaMaxima){
    		                    //console.log('push');
    		                    list_container_proximo.push(new objectTarget(creep.pos.getRangeTo(conteiner_proximo[index]),conteiner_proximo[index].id));
        		            }
        		        }
        		        //after for
        		        list_container_proximo.sort((a,b) => a.quantidadeRepeticoes - b.quantidadeRepeticoes);
        		        
        		        creep.memory.container = list_container_proximo[0].targetId;
        		    }
			    }
			    if(creep.memory.container){
			        if(creep.transfer(Game.getObjectById(creep.memory.container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                    creep.moveTo(Game.getObjectById(creep.memory.container));
	                }else{
	                    delete creep.memory.container;
	                }
			    }else{
			        //console.log('nothing to do here');
			        delete creep.memory.container;
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
			    list_possibleTargets.sort((a,b) => a.quantidadeRepeticoes - b.quantidadeRepeticoes);
			    //console.log('list lenght: ' + list_possibleTargets.length);
                //console.log('quantidadeRepeticoes: ' + list_possibleTargets[0].quantidadeRepeticoes);
                //Testar os valores
			    creep.memory.target = list_possibleTargets[0].targetId;
			    
			    
			    //Amount energy per tick
			    var amountEnergyPerTick = 0;
    			for(var bodyIndex in creep.body){
    			    if(creep.body[bodyIndex].type == WORK){
    			        amountEnergyPerTick += 2;
    			    }
    			}
    			creep.memory.amountEnergyPerTick = amountEnergyPerTick;
			}
			
            return true;
			
		},
		generateBody: function(spawn){
		    
		    //spawn -> veriicar a quantidade de energia
			var body = [];
			var xMove = 1;
			var xCarry = 1;
			var xWork = Math.floor((spawn.room.energyCapacityAvailable - xCarry * BODYPART_COST[CARRY] - xMove * BODYPART_COST[MOVE]) / BODYPART_COST[WORK]);
			
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
            
            var sources = spawn.room.find(FIND_SOURCES);
            var sources = sources.length;
            
			if(creep_check.length < (sources * max_creep * controle_multiplicar_1_e_Contar_0) + (max_creep - (max_creep * controle_multiplicar_1_e_Contar_0))) {
			   return true;
			}else{
				return false;
			}
			
		}
	
};

module.exports = extensionCaretaker;