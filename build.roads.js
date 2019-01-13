function buildRoads() {
    var roadHeads = [],
        roadEnds = [],
        harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    harvesters.forEach((unit) => {
        roadHeads.push(Game.getObjectById(unit.memory.assignedResourceId));
    });

    _.filter(Game.structures, (structure) => {
        roadEnds.push(structure);
    });

    for (var i = 0; i < roadHeads.length; i++) {
        for (var j = 0; j < roadEnds.length; j++) {
            var x = roadHeads[i].pos,
                y = roadEnds[j].pos;
            var thePath = PathFinder.search(x, y).path;
            thePath.forEach(function(site) {
                Game.rooms.sim.createConstructionSite({pos: site.x, range: 1}, site.y, STRUCTURE_ROAD);
            });
        }
    }
}


module.exports = buildRoads;