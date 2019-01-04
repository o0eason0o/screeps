var assignResouce = function (creep) {
	    var sources = creep.room.find(FIND_SOURCES), 
	    	role = creep.memory.role,
	    	creepsWithSameRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
	
	    for(var i = 0; i < creepsWithSameRole.length; i++) {
	        if(creep.name === creepsWithSameRole[i].name) {
	            creep.memory.assignedResource = Game.getObjectById(sources[i].id);
	        }
	    }
	};

module.exports = assignResouce;
