var assignResourceThenHarvest = require('assignResourceThenHarvest'),
    say = require('util.say'),
    fixer,
    /** @param {Creep} creep **/
    run = function() {
        // var me = this;

        // if (me.memory.upgrading && me.carry.energy == 0) {
        //     me.memory.upgrading = false;
        //     say.harvest.call(me);
        // }
        // if (!me.memory.upgrading && me.carry.energy == me.carryCapacity) {
        //     me.memory.upgrading = true;
        //     say.upgrade.call(me);
        // }

        // if (me.memory.upgrading) {
        //     if (me.upgradeController(me.room.controller) == ERR_NOT_IN_RANGE) {
        //         me.moveTo(me.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        //     }
        // } else {
        //     // assign resouce then harvest
        //     assignResourceThenHarvest.call(me);
        // }
    };

fixer = {
    run: run
};

module.exports = fixer;