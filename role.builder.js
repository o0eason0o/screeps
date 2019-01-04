var assignResource = require('assignResource'),
    roleBuilder, 
    builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),

    /** @param {Creep} creep **/
    run = function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {

	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
            	var spawnPos = Game.spawns['Spawn1'].pos, 
            	structureExtCount, 
            	newExtPosX;

            	structureExtCount = creep.room.find(FIND_STRUCTURES, {
            		filter: (structure) => {
            			return (structure.structureType == STRUCTURE_EXTENSION)
            		}
            	}).length;

            	newExtPosX = spawnPos.x - 3 + structureExtCount * 2;

            	Game.rooms.sim.createConstructionSite(newExtPosX, spawnPos.y + 2, STRUCTURE_EXTENSION);
            }
	    }
	    else {

            // assign resouce then harvest
            assignResource(creep);
            if(creep.harvest(creep.memory.assignedResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.assignedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	};

roleBuilder = {
	run: run
};

module.exports = roleBuilder;