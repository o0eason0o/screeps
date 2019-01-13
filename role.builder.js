var assignResouceThenHarvest = require('assignResouceThenHarvest'),
    say = require('util.say'),
    roleBuilder,
    builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),

    /** @param {Creep} creep **/
    run = function(creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            say.harvest.call(creep);
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            say.build.call(creep);
        }

        if (creep.memory.building) {

            var basicCreepsAvg = Object.keys(Game.creeps).length / 3,
                structureExt = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION)
                    }
                }),
                extCount = structureExt.length,
                constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES),
                // targets = creep.room.find(FIND_CONSTRUCTION_SITES),
                targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (site) => {
                        return (site.structureType === STRUCTURE_EXTENSION ||
                                site.structureType === STRUCTURE_TOWER
                            );
                    }
                }), 
                closestSite = _.sortBy(constructionSites, s => creep.pos.getRangeTo(s))[0];
                // console.log(closestSite);

                if (extCount < basicCreepsAvg) {
                    buildExtension(creep);
                }

                // console.log(targets);
                if (targets.length) {
                    // console.log('in');
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    buildRoads(creep);
                    if (creep.build(closestSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestSite, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }

            // if(creep.memory.assignedSite !== undefined){
            //     if(creep.build(creep.memory.assignedSite) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(creep.memory.assignedSite, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        } else {
            assignResouceThenHarvest(creep);
        }
    },
    buildExtension = function(creep) {
        // build new structure_extension
        var spawnPos = Game.spawns['Spawn1'].pos,
            structureExtCount,
            newExtPosX,
            newExtPosY;

        structureExtCount = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION)
            }
        }).length;

        newExtPosX = spawnPos.x - 4 + ((structureExtCount * 2)%5);
        newExtPosY = spawnPos.y + 2 + Math.floor(structureExtCount/5);

        Game.rooms.sim.createConstructionSite(newExtPosX, newExtPosY, STRUCTURE_EXTENSION);
        // console.log(Game.rooms.sim.createConstructionSite(newExtPosX, (spawnPos.y + 2), STRUCTURE_EXTENSION));
    },
    buildRoads = function(creep) {
        // TODO: fix building roads, start from assigned resource to home
        // console.log('building roads');
        var spawnPos = Game.spawns['Spawn1'].pos,
            goals = {pos: Game.getObjectById(creep.memory.assignedResourceId).pos, range: 1};
        // goals = _.map(creep.room.find(FIND_SOURCES), function(source) { return { pos: source.pos, range: 1 }; });

        var thePath = PathFinder.search(spawnPos, goals).path;
        thePath.forEach(function(site) {
            Game.rooms.sim.createConstructionSite(site.x, site.y, STRUCTURE_ROAD);
        });


    };

roleBuilder = {
    run: run
};

module.exports = roleBuilder;