var assignResouceThenHarvest = require('assignResouceThenHarvest'),
    say = require('util.say'),
    roleHarvester,

    /** @param {Creep} creep **/
    run = function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            say.harvest.call(creep);

            // assign resouce then harvest
            assignResouceThenHarvest(creep);
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                // transfer energy to targets
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // help building if idle
                say.helpingBuilders.call(creep);

                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    };

roleHarvester = {
    run: run
};

module.exports = roleHarvester;