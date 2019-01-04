var assignResource = require('assignResource'),
    roleHarvester, 

    /** @param {Creep} creep **/
    run = function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
            // assign resouce then harvest
            assignResource(creep);
            if(creep.harvest(creep.memory.assignedResource) == ERR_NOT_IN_RANGE) {
                creep.say('🔄 harvest');
                creep.moveTo(creep.memory.assignedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                // transfer energy to targets
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // help building if idle
                creep.say('🚧 helping builders');
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	};

roleHarvester = {
    run: run
};

module.exports = roleHarvester;