var assignResouceThenHarvest = function (creep) {
		var assignedResource = Game.getObjectById(creep.memory.assignedResourceId);
		// console.log(assignedResource);
		// console.log('---start');
		// console.log(assignedResource.id);

		// TODO: when energy is finished || assignedResource.energy === 0
		if(assignedResource === null){
			assignResource(creep);		
		}
		// console.log(assignedResource.id);
		// if( creep.memory.assignedResourceId.id === '4fcbec18b5037f71f185cd6c'){
		// 	console.log('yes');
		// }
		// console.log('end---');

	    if(creep.harvest(assignedResource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assignedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}, 
	assignResource = function (creep) {
			var sources = creep.room.find(FIND_SOURCES), 
	    		role = creep.memory.role,
	    		sameRoleCreeps = _.filter(Game.creeps, (unit) => unit.memory.role === role);

    		// TODO: currently avoiding source with enemy, need to deal with the enemy later
    		var safeList = _.filter(sources, (source) => source.id !== '2c686d4f81753c261844a6fd');
		    for(var i = 0; i < sameRoleCreeps.length; i++) {
		        if(creep.name === sameRoleCreeps[i].name) {
		        	console.log(safeList[i].id);
		            creep.memory.assignedResourceId = safeList[i].id;
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
