function harvest() {
    this.say('🔄 harvest');
}

function build() {
    this.say('🚧 build');
}

function helpingBuilders () {
    this.say('🚧 helping builders');
}

function upgrade() {
    this.say('⚡ upgrade');
}

var say = {
    harvest: harvest,
    build: build,
    helpingBuilders: helpingBuilders,
    upgrade: upgrade
};

module.exports = say;