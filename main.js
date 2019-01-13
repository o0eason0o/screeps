var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBasicFighter = require('role.basicFighter');

module.exports.loop = function() {

    var harvesters,
        builders,
        upgraders,
        basicFighter,
        basicCreepsAvg;

    // cleanup console & memory
    if (Game.time % 30 === 0) {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        console.log("<script>angular.element(document.getElementsByClassName('fa fa-trash ng-scope')[0].parentNode).scope().Console.clear()</script>")
    }

    harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // basicFighter = _.filter(Game.creeps, (creep) => creep.memory.role == 'basicFighter');

    // console.log('Harvesters: ' + harvesters.length + ', builders: ' + builders.length + ', upgraders: ' + upgraders.length);

    // total 3 types of basic creeps
    basicCreepsAvg = Object.keys(Game.creeps).length / 3;

    // to increase creeps to total of 3 each
    if (basicCreepsAvg > 2) {
        basicCreepsAvg = 2;
    }

    function spawnBaiscCreep(type) {
        var newName = type.charAt(0).toUpperCase() + type.slice(1) + Game.time,
            parts = [],
            i = 0;

        do {
            parts.push(WORK, CARRY, MOVE);
            i++;
        // } while (i < Game.rooms.sim.controller.level);
        } while (i < basicCreepsAvg);
        // console.log('creep parts: ', parts);

        if (Game.spawns['Spawn1'].spawnCreep(parts, newName, {memory: { role: type } }) === ERR_NOT_ENOUGH_RESOURCES) {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: type } });
        }
        
    };

    // if(basicFighter.length <= 1) {
    //     var newName = 'basicFighter' + Game.time;
    //     Game.spawns['Spawn1'].spawnCreep([ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE], newName, 
    //         {memory: {role: 'basicFighter'}});
    // }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        console.log('Spawning new creep' + ': ' + Game.spawns['Spawn1'].spawning.name);

        Game.spawns['Spawn1'].room.visual.text(
            '🛠️ ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
    } else {
        // respawn new workers
        // if(basicFighter.length == 0 && harvesters.length !== 0) {
        //     var newName = 'basicFighter' + Game.time;
        //     Game.spawns['Spawn1'].spawnCreep([ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE], newName, 
        //         {memory: {role: 'basicFighter'}});
        // } else {
        if (harvesters.length <= basicCreepsAvg) {
            spawnBaiscCreep('harvester');
        } else if (upgraders.length <= basicCreepsAvg) {
            spawnBaiscCreep('upgrader');
        } else if (builders.length <= basicCreepsAvg) {
            spawnBaiscCreep('builder');
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            // roleHarvester.run(creep);
            roleHarvester.run.call(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if (creep.memory.role == 'basicFighter') {
        //     roleBasicFighter.run(creep);
        // }
    }
}