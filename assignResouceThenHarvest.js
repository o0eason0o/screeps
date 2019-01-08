var assignResouceThenHarvest = function(creep) {
        var assignedResource;

        // TODO: when energy is finished || assignedResource.energy === 0
        if (creep.memory.assignedResourceId === undefined) {
            assignResource(creep);
        }

        assignedResource = Game.getObjectById(creep.memory.assignedResourceId);
        console.log(assignedResource.id);


        if (creep.harvest(assignedResource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assignedResource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    assignResource = function(creep) {
        var sources = creep.room.find(FIND_SOURCES),
            role = creep.memory.role,
            sameRoleCreeps = _.filter(Game.creeps, (unit) => unit.memory.role === role);

        // TODO: currently avoiding source with enemy, need to deal with the enemy later
        var safeList = _.filter(sources, (source) => source.id !== 'aa817c642a969c5f77d22b45');
        for (var i = 0; i < sameRoleCreeps.length; i++) {
            (function(j) {
                var index = j % sameRoleCreeps.length;
                if (creep.name === sameRoleCreeps[j].name) {
                    creep.memory.assignedResourceId = safeList[index].id;
                }
            })(i);
        }

        // // original code; remove above TODO and use this to assign resouces
        // for(var i = 0; i < sameRoleCreeps.length; i++) {
        //     if(creep.name === sameRoleCreeps[i].name) {
        //         creep.memory.assignedResourceId = sources[i].id;
        //     }
        // }
    };

module.exports = assignResouceThenHarvest;