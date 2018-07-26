const bindings = require('./bindings')

// Initializes the networking mutexes when the library is built with thread safety.
// This function must always be called before any other libshout function.
bindings.shout_init()

class Libshout {
	constructor() {
		this.pointer = bindings.shout_new()
	}

	static version() {
		return bindings.shout_version(Buffer.alloc(0), Buffer.alloc(0), Buffer.alloc(0))
	}

	static shutdown() {
		console.log('shutdown')
		bindings.shout_shutdown()
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

console.log(Libshout.version())
module.exports = Libshout