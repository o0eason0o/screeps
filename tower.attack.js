var run = function(tower) {

    // TODO: fine-tune tower logic. 
    var me = this,
        closestHostile = me.pos.findClosestByRange(FIND_HOSTILE_CREEPS),
        closestDamagedStructure;

    if (closestHostile) {
        me.attack(closestHostile);
    } else {
        closestDamagedStructure = me.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        try {
            me.repair(closestDamagedStructure);
        } catch (err) {
            console.log(me.id, err);
        }
    }
};

tower = {
    run: run
};

module.exports = tower;

// var tower = Game.getObjectById('86aa99a5f08da111e6c4f444');
// if(tower) {
//     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//         filter: (structure) => structure.hits < structure.hitsMax
//     });
//     if(closestDamagedStructure) {
//         tower.repair(closestDamagedStructure);
//     }

//     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//     if(closestHostile) {
//         tower.attack(closestHostile);
//     }
// }