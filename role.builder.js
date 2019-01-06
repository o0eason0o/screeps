var assignResouceThenHarvest = require('assignResouceThenHarvest'),
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
            buildRoads(creep);

            // if(creep.memory.assignedSite !== undefined){
            //     if(creep.build(creep.memory.assignedSite) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(creep.memory.assignedSite, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }

	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                buildExtension(creep);
            }
	    } else {
            // assign resouce then harvest
            assignResouceThenHarvest(creep);
	    }
	}, 
    buildExtension = function (creep) {
        // build new structure_extension
        var spawnPos = Game.spawns['Spawn1'].pos, 
        structureExtCount, 
        newExtPosX;

        structureExtCount = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION)
            }
        }).length;

        newExtPosX = spawnPos.x - 3 + (structureExtCount * 2);

        Game.rooms.sim.createConstructionSite(newExtPosX, (spawnPos.y + 2), STRUCTURE_EXTENSION);
    },
    buildRoads = function (creep) {
        console.log('building roads');
        var spawnPos = Game.spawns['Spawn1'].pos,
            goals = _.map(creep.room.find(FIND_SOURCES), function(source) {return {pos: source.pos, range:1};});
        
        PathFinder.search(spawnPos, goals).path.forEach(function (site) {
            Game.rooms.sim.createConstructionSite(site.x, site.y, STRUCTURE_ROAD);
        });


    };

roleBuilder = {
	run: run
};

module.exports = roleBuilder;