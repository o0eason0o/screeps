var assignResourceThenHarvest = require('assignResourceThenHarvest'),
    say = require('util.say'),
    roleBuilder,
    builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),

    /** @param {Creep} creep **/
    run = function() {
        var me = this;
        if (me.memory.building && me.carry.energy == 0) {
            me.memory.building = false;
            say.harvest.call(me);
        }
        if (!me.memory.building && me.carry.energy == me.carryCapacity) {
            me.memory.building = true;
            say.build.call(me);
        }

        if (me.memory.building) {
            var basicCreepsAvg = Object.keys(Game.creeps).length / 3,
                structureExt = me.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION)
                    }
                }),
                extCount = structureExt.length,
                constructionSites = me.room.find(FIND_CONSTRUCTION_SITES),
                // targets = me.room.find(FIND_CONSTRUCTION_SITES),
                targets = me.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (site) => {
                        return (site.structureType === STRUCTURE_EXTENSION ||
                            site.structureType === STRUCTURE_TOWER
                        );
                    }
                }),
                closestSite = _.sortBy(constructionSites, s => me.pos.getRangeTo(s))[0];
            // console.log(closestSite);
            if (extCount < basicCreepsAvg * 2) {
                buildExtension.call(me);
            }

            // console.log(targets);
            if (targets.length) {
                // console.log('in');
                if (me.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    me.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                buildRoads.call(me);
                if (me.build(closestSite) == ERR_NOT_IN_RANGE) {
                    me.moveTo(closestSite, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }

            // if(me.memory.assignedSite !== undefined){
            //     if(me.build(me.memory.assignedSite) == ERR_NOT_IN_RANGE) {
            //         me.moveTo(me.memory.assignedSite, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        } else {
            assignResourceThenHarvest.call(me);
        }
    },
    buildExtension = function() {
        // build new structure_extension
        var me = this;
        var spawnPos = Game.spawns['Spawn1'].pos,
            structureExtCount,
            newExtPosX,
            newExtPosY;

        structureExtCount = me.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION)
            }
        }).length;
        newExtPosX = spawnPos.x - 4 + ((structureExtCount % 4) * 2);
        newExtPosY = spawnPos.y + 2 + Math.floor(structureExtCount / 4);

        if (Game.rooms.sim.createConstructionSite(newExtPosX, newExtPosY, STRUCTURE_EXTENSION) ===ERR_RCL_NOT_ENOUGH) {
            // controller level not enough
        };
      
        // console.log(Game.rooms.sim.createConstructionSite(newExtPosX, (spawnPos.y + 2), STRUCTURE_EXTENSION));
    },
    buildRoads = function() {
        // TODO: fix building roads, start from assigned resource to home
        // console.log('building roads');
        var me = this;
        var spawnPos = Game.spawns['Spawn1'].pos,
            goals = { pos: Game.getObjectById(me.memory.assignedResourceId).pos, range: 1 };
        // goals = _.map(me.room.find(FIND_SOURCES), function(source) { return { pos: source.pos, range: 1 }; });

        var thePath = PathFinder.search(spawnPos, goals).path;
        thePath.forEach(function(site) {
            Game.rooms.sim.createConstructionSite(site.x, site.y, STRUCTURE_ROAD);
        });


    };

roleBuilder = {
    run: run
};

module.exports = roleBuilder;