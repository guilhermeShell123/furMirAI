var buildingTower = {
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
                       return (structure.hits < structure.hitsMax);
                   } 
                });
                friendlyStructure.sort((a,b) => a.hits - b.hits);
                
                if(friendlyStructure[0] && towers[i].energy > towers[i].energyCapacity/2 +towers[i].energyCapacity/4 ){
                    towers[i].repair(friendlyStructure[0]);
                }
                
            }
        }//end if towers
        
    }
    
};

module.exports = buildingTower;