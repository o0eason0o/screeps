var assignResourceThenHarvest = function() {
        var me = this,
            assignedResource;

        // TODO: when energy is finished || assignedResource.energy === 0
        // console.log(me.memory.assignedResourceId);
        // if (me.memory.assignedResourceId === undefined) {
        	assignResource.call(me);
        // }

        assignedResource = Game.getObjectById(me.memory.assignedResourceId);
        // console.log(assignedResource.id);

        if (me.harvest(assignedResource) == ERR_NOT_IN_RANGE) {
            me.moveTo(assignedResource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    assignResource = function() {
        var me = this,
            sources = me.room.find(FIND_SOURCES),
            role = me.memory.role,
            sameRoleCreeps = _.filter(Game.creeps, (unit) => unit.memory.role === role);

        // TODO: need to deal with the source keeper
        for (var i = 0; i < sources.length; i++) {
            if (sources[i].id === '47ebfb3cec242850c19e2817') {
                sources.splice(i, 1);
            }
        }

        for (var i = 0; i < sources.length; i++) {
            if (sameRoleCreeps[i] && me.id === sameRoleCreeps[i].id) {
                me.memory.assignedResourceId = sources[i].id;
            } 
        }
    };

module.exports = assignResourceThenHarvest;