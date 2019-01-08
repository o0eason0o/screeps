var basicFighter,
    /** @param {Creep} creep **/
    //    run = function(creep) {

    //        if(creep.memory.upgrading && creep.carry.energy == 0) {
    //            creep.memory.upgrading = false;
    //            creep.say('í ½í´„ harvest');
    //     }
    //     if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    //         creep.memory.upgrading = true;
    //         creep.say('âš¡ upgrade');
    //     }

    //     if(creep.memory.upgrading) {
    //            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    //            }
    //        }
    //        else {
    //            // assign resouce then harvest
    //            assignResouceThenHarvest(creep);
    //        }
    // };

    run = function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    };

basicFighter = {
    run: run
};

module.exports = basicFighter;