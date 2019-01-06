var assignResouceThenHarvest = function (creep) {
		var assignedResource = creep.memory.assignedResource;

		if(assignedResource === undefined || assignedResource.energy === 0){
			var sources = creep.room.find(FIND_SOURCES), 
	    		role = creep.memory.role,
	    		sameRoleCreeps = _.filter(Game.creeps, (unit) => unit.memory.role == role);

    		// TODO: currently avoiding source with enemy, need to deal with the enemy later
    		var safeList = _.filter(sources, (source) => source.id !== '0f8396d2b0ace3b483ca095e')
		    for(var i = 0; i < sameRoleCreeps.length; i++) {
		        if(creep.name === sameRoleCreeps[i].name) {
		            creep.memory.assignedResource = Game.getObjectById(safeList[i].id);
		        }
		    }

		    // // original code; remove above TODO and use this to assign resouces
		    // for(var i = 0; i < sameRoleCreeps.length; i++) {
		    //     if(creep.name === sameRoleCreeps[i].name) {
		    //         creep.memory.assignedResource = Game.getObjectById(sources[i].id);
		    //     }
		    // }

		}

	    if(assignedResource && creep.harvest(Game.getObjectById(assignedResource.id)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(assignedResource.id), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	};

module.exports = assignResouceThenHarvest;
