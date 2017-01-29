var controllerTower = {
    defense: function(spawn){
        
         var towers = spawn.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                                (structure.structureType == STRUCTURE_TOWER)
                            );
                }
        });
        
        if(towers){
            for(var i in towers){
                var hostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                //Se tiver inimigos, ataca
                if(hostile){
                    towers[i].attack(hostile);
                }
                //se tiver o que reparar e tenho uma boa quantidade de reserva, manda reparar
                var friendlyStructure = towers[i].room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                       return (structure.hits < structure.hitsMax
                       && structure.structureType != STRUCTURE_WALL);
                   } 
                });
                friendlyStructure.sort((a,b) => a.hits - b.hits);
                
                if(towers[i].energy > towers[i].energyCapacity/2 +towers[i].energyCapacity/4){
                    if(friendlyStructure[0] ){
                        towers[i].repair(friendlyStructure[0]);
                    }else{
                        if(Memory.TowerConfig.RepairWall ){
                            console.log('i am here');
                            var friendlyStructure = towers[i].room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                               return (structure.hits < structure.hitsMax)
                               && structure.structureType == STRUCTURE_WALL;
                            }});
                            friendlyStructure.sort((a,b) => a.hits - b.hits); 
                            //Ultima prioridade, as paredes
                            if(friendlyStructure[0] ){
                                towers[i].repair(friendlyStructure[0]);
                            }
                        }
                        
                    }
                }
                
                
            }
        }//end if towers
        
    },
    run: function(){
        for(var spawn in Game.spawns){
            this.defense(Game.spawns[spawn]);
        }
    }
    
    
};

module.exports = controllerTower;