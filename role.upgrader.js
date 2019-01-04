var assignResource = require('assignResource'),
    roleUpgrader, 
    /** @param {Creep} creep **/
    run = function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            
            assignResource(creep);
            if(creep.harvest(creep.memory.assignedResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.assignedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	};

    roleUpgrader = {
        run: run
    };

module.exports = roleUpgrader;