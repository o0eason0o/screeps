var assignResouceThenHarvest = function(creep) {
        var assignedResource;

        // TODO: when energy is finished || assignedResource.energy === 0
        // console.log(creep.memory.assignedResourceId);
        // if (creep.memory.assignedResourceId === undefined) {
            assignResource(creep);
        // }

        assignedResource = Game.getObjectById(creep.memory.assignedResourceId);
        // console.log(assignedResource.id);

        if (creep.harvest(assignedResource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assignedResource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    assignResource = function(creep) {
        var sources = creep.room.find(FIND_SOURCES),
            role = creep.memory.role,
            sameRoleCreeps = _.filter(Game.creeps, (unit) => unit.memory.role === role);


            // TODO: need to deal with the source keeper
            for(var i = 0; i < sources.length; i++){
            	if(sources[i].id === 'a861c37fecddba5bb492a056') {
            		sources.splice(i, 1);
            	}
            }

            for(var i = 0; i < sources.length; i++){
            	if(sameRoleCreeps[i] && creep.id === sameRoleCreeps[i].id) {
            		creep.memory.assignedResourceId = sources[i].id;
            	}
            }

        // // original code; remove above TODO and use this to assign resouces
        // for(var i = 0; i < sameRoleCreeps.length; i++) {
        //     if(creep.name === sameRoleCreeps[i].name) {
        //         creep.memory.assignedResourceId = sources[i].id;
        //     }
        // }
    };

module.exports = assignResouceThenHarvest;