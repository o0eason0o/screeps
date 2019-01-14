function harvest() {
    this.say('🔄 harvest');
}

function distribute() {
    this.say('🚚 distribute');
}

function build() {
    this.say('🚧 build');
}

function fix() {
    this.say('🔧 fix');
}

function helpingBuilders () {
    this.say('🚧 helping builders');
}

function upgrade() {
    this.say('⚡ upgrade');
}

function tool() {
    this.say('🛠 tool');
}

var say = {
    harvest: harvest,
    build: build,
    helpingBuilders: helpingBuilders,
    upgrade: upgrade, 
    distribute: distribute,
    fix: fix
};

module.exports = say;