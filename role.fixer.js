var assignResourceThenHarvest = require('assignResourceThenHarvest'),
    say = require('util.say'),
    fixer,
    /** @param {Creep} creep **/
    run = function() {
        var me = this;
        if (me.memory.fixing && me.carry.energy == 0) {
            me.memory.fixing = false;
            say.harvest.call(me);
        }
        if (!me.memory.fixing && me.carry.energy == me.carryCapacity) {
            me.memory.fixing = true;
            say.fix.call(me);
        }

        if (me.memory.fixing) {
            var targets = me.room.find(FIND_STRUCTURES, {
                filter: site => site.hits < site.hitsMax
            }),
            closestSite = _.sortBy(targets, s => me.pos.getRangeTo(s))[0];
            
            // targets.sort((a, b) => a.hits - b.hits);
            if (closestSite) {
                if (me.repair(closestSite) == ERR_NOT_IN_RANGE) {
                    me.moveTo(closestSite);
                }
            } else {
            	targets = me.room.find(FIND_CONSTRUCTION_SITES)[0];
				if (me.build(targets) == ERR_NOT_IN_RANGE) {
                    me.moveTo(targets);
                }
            }
            // var constructionSites = me.room.find(FIND_CONSTRUCTION_SITES),
            //     // targets = me.room.find(FIND_CONSTRUCTION_SITES),
            //     targets = me.room.find(FIND_CONSTRUCTION_SITES, {
            //         filter: (site) => {
            //             return (site.structureType === STRUCTURE_EXTENSION ||
            //                 site.structureType === STRUCTURE_TOWER
            //             );
            //         }
            //     }),
            //     closestSite = _.sortBy(constructionSites, s => me.pos.getRangeTo(s))[0];
            // // console.log(closestSite);

            // // console.log(targets);
            // if (targets.length) {
            //     // console.log('in');
            //     if (me.build(targets[0]) == ERR_NOT_IN_RANGE) {
            //         me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            //     }
            // } else {
            //     if (me.build(closestSite) == ERR_NOT_IN_RANGE) {
            //         me.moveTo(closestSite, { visualizePathStyle: { stroke: '#ffffff' } });
            //     }
            // }

        } else {
            assignResourceThenHarvest.call(me);
        }
    };

fixer = {
    run: run
};

module.exports = fixer;