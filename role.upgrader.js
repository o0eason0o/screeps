var assignResouceThenHarvest = require('assignResouceThenHarvest'),
    say = require('util.say'),
    roleUpgrader,
    /** @param {Creep} creep **/
    run = function(creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            say.harvest.call(creep);
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            say.upgrade.call(creep);
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            // assign resouce then harvest
            assignResouceThenHarvest(creep);
        }
    };

roleUpgrader = {
    run: run
};

module.exports = roleUpgrader;