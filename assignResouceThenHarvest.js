var assignResouceThenHarvest = function (creep) {

		if(creep.memory.assignedResource !== null){
			var sources = creep.room.find(FIND_SOURCES), 
	    	role = creep.memory.role,
	    	sameRoleCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
	
		    for(var i = 0; i < sameRoleCreeps.length; i++) {
		        if(creep.name === sameRoleCreeps[i].name) {
		            creep.memory.assignedResource = Game.getObjectById(sources[i].id);
		        }
		    }
		}

	    if(creep.harvest(creep.memory.assignedResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.assignedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	};

	

module.exports = assignResouceThenHarvest;
