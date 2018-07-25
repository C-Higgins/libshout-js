const bindings = require('./bindings')

class Libshout {
	constructor() {
		bindings.shout_init()
		this.pointer = bindings.shout_new()
	}

	static version() {
		return bindings.shout_version(Buffer.alloc(0), Buffer.alloc(0), Buffer.alloc(0))
	}

	static shutdown() {
		console.log('shutdown')
		// bindings.shout_shutdown()
	}

	shutdown() {
		// Alias for the static method
		Libshout.shutdown()
	}

	free() {
		console.log('free')
		// bindings.shout_free(this.pointer)
	}
}

const instance = new Libshout()


module.exports = Libshout