function buildRoads() {
    var roadHeads = [],
        roadEnds = [],
        harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    _.filter(Game.structures, (structure) => {
        roadHeads.push(structure);
    });

    harvesters.forEach((unit) => {
        roadEnds.push(Game.getObjectById(unit.memory.assignedResourceId));
    });

    for (var i = 0; i < roadHeads.length; i++) {
        for (var j = 0; j < roadEnds.length; j++) {
            var x = roadHeads[i].pos,
                y = { pos: roadEnds[j].pos, range: 1 },
                thePath = PathFinder.search(x, y).path;
            thePath.forEach((site) => {
                Game.rooms.sim.createConstructionSite(site.x, site.y, STRUCTURE_ROAD);
            });
        }
    }

    // for (var i = 0; i < roadHeads.length; i++) {
    //     for (var j = 0; j < roadEnds.length; j++) {
    //         var x = roadHeads[i].pos,
    //             y = roadEnds[j].pos;
    //         var thePath = PathFinder.search(x, y).path;
    //         console.log(thePath);
    //         thePath.forEach(function(site) {
    //             // Game.rooms.sim.createConstructionSite({pos: site.x, range: 1}, {pos: site.y, range: 1}, STRUCTURE_ROAD);
    //             // console.log(Game.rooms.sim.createConstructionSite({pos: site.x, range: 1}, {pos: site.y, range: 1}, STRUCTURE_ROAD));
    //         });
    //     }
    // }
}


module.exports = buildRoads;