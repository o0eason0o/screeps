var assignResourceThenHarvest = require('assignResourceThenHarvest'),
    say = require('util.say'),
    roleHarvester,

    /** @param {Creep} creep **/
    run = function() {
        var me = this;

        if(me.memory.distributing && me.carry.energy === 0) {
            me.memory.distributing = false;
            say.harvest.call(me);
        }

        if(!me.memory.distributing && me.carry.energy === me.carryCapacity) {
            me.memory.distributing = true;
            say.distribute.call(me);
        }



        if(me.memory.distributing) {
            var targets = me.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length) {
                // transfer energy to targets
                if (me.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // help building if idle
                say.helpingBuilders.call(me);

                var targets = me.room.find(FIND_CONSTRUCTION_SITES);

                if (targets.length) {
                    if (me.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else {
            assignResourceThenHarvest.call(me);
        }

        // if (me.carry.energy < me.carryCapacity) {
        // // if (me.carry.energy === 0) {
        //     var sources = me.room.find(FIND_SOURCES);
        //     say.harvest.call(me);

        //     // assign resouce then harvest
        //     assignResourceThenHarvest.call(me);
        // } else {
        //     var targets = me.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (structure.structureType == STRUCTURE_EXTENSION ||
        //                 structure.structureType == STRUCTURE_SPAWN ||
        //                 structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        //         }
        //     });
        //     if (targets.length > 0) {
        //         // transfer energy to targets
        //         if (me.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        //         }
        //     } else {
        //         // help building if idle
        //         say.helpingBuilders.call(me);

        //         var targets = me.room.find(FIND_CONSTRUCTION_SITES);

        //         if (targets.length) {
        //             if (me.build(targets[0]) == ERR_NOT_IN_RANGE) {
        //                 me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        //             }
        //         }
        //     }
        // }

    };

roleHarvester = {
    run: run
};

module.exports = roleHarvester;