/* eslint-disable no-param-reassign */
const c = require('./bindings')
const {ERRORS, PROTOCOLS, FORMATS, AUDIOINFO, META, TLS} = require('./constants')

// Initializes the networking mutexes when the library is built with thread safety.
// This function must always be called before any other libshout function.
c.shout_init()

class Metadata {
	constructor() {
		this.pointer = c.shout_metadata_new()
	}

	free() {
		c.shout_metadata_free(this.pointer)
	}

	add(name, value) {
		if (name.includes('_')) {
			name = META[name]
		}
		return handleErrors(c.shout_metadata_add(this.pointer, name, value))
	}
}

class Libshout {
	constructor() {
		this.pointer = c.shout_new()
	}

	static get version() {
		return c.shout_version(Buffer.alloc(0), Buffer.alloc(0), Buffer.alloc(0))
	}

	static shutdown() {
		c.shout_shutdown()
	}

	/* ----- Managing Connections ----- */
	free() {
		c.shout_free(this.pointer)
	}

	open() {
		return handleErrors(c.shout_open(this.pointer))
	}

	close() {
		return handleErrors(c.shout_close(this.pointer))
	}

	getConnected() {
		return handleErrors(c.shout_get_connected(this.pointer))
	}

	getError() {
		return c.shout_get_error(this.pointer)
	}

	getErrno() {
		return c.shout_get_errno(this.pointer)
	}

	/* ----- Sending Data ----- */
	send(data, len) {
		return handleErrors(c.shout_send(this.pointer, data, len))
	}

	sendRaw(data, len) {
		return handleErrors(c.shout_send_raw(this.pointer, data, len))
	}

	sync() {
		c.shout_sync(this.pointer)
	}

	getDelay() {
		return c.shout_delay(this.pointer)
	}

	getQueueLen() {
		return c.shout_queuelen(this.pointer)
	}

	/* ----- Connection Parameters ----- */
	setNonblocking(nonblocking) {
		return handleErrors(c.shout_set_nonblocking(this.pointer, nonblocking))
	}

	getNonblocking() {
		return c.shout_get_nonblocking()
	}

	setHost(host) {
		return handleErrors(c.shout_set_host(this.pointer, host))
	}

	getHost() {
		return c.shout_get_host(this.pointer)
	}

	setPort(port) {
		return handleErrors(c.shout_set_port(this.pointer, port))
	}

	getPort() {
		return c.shout_get_port(this.pointer)
	}

	setUser(user) {
		return handleErrors(c.shout_set_user(this.pointer, user))
	}

	getUser() {
		return c.shout_get_user(this.pointer)
	}

	setPassword(pass) {
		return handleErrors(c.shout_set_password(this.pointer, pass))
	}

	getPassword() {
		return c.shout_get_password(this.pointer)
	}

	// Protocol constants
	setProtocol(protocol) {
		if (typeof protocol === 'string') {
			protocol = PROTOCOLS[protocol]
		}
		return handleErrors(c.shout_set_protocol(this.pointer, protocol))
	}

	getProtocol() {
		return PROTOCOLS[c.shout_get_protocol(this.pointer)]
	}

	// Format constants
	setFormat(format) {
		if (typeof format === 'string') {
			format = FORMATS[format]
		}
		return handleErrors(c.shout_set_format(this.pointer, format))
	}

	getFormat() {
		return FORMATS[c.shout_get_format(this.pointer)]
	}

	setMount(mountPoint) {
		return handleErrors(c.shout_set_mount(this.pointer, mountPoint))
	}

	getMount() {
		return c.shout_get_mount()
	}

	setDumpfile(dumpfile) {
		return handleErrors(c.shout_set_dumpfile(this.pointer, dumpfile))
	}

	getDumpfile() {
		return c.shout_get_dumpfile(this.pointer)
	}

	setAgent(agent) {
		return handleErrors(c.shout_set_agent(this.pointer, agent))
	}

	getAgent() {
		return c.shout_get_agent(this.pointer)
	}

	// TLS Constants
	setTls(mode) {
		if (typeof mode === 'string') {
			mode = TLS[mode]
		}
		return handleErrors(c.shout_set_tls(this.pointer, mode))
	}

	getTls() {
		return TLS[c.shout_get_tls(this.pointer)]
	}

	setCaDirectory(directory) {
		return handleErrors(c.shout_set_ca_directory(this.pointer, directory))
	}

	getCaDirectory() {
		return c.shout_get_ca_directory(this.pointer)
	}

	setCaFile(file) {
		return handleErrors(c.shout_set_ca_file(this.pointer))
	}

	getCaFile() {
		return c.shout_get_ca_file(this.pointer)
	}

	setCiphers(ciphers) {
		return handleErrors(c.shout_set_allowed_ciphers(this.pointer, ciphers))
	}

	getCiphers() {
		return c.shout_get_allowed_ciphers(this.pointer)
	}

	setClientCert(certificate) {
		return handleErrors(c.shout_set_client_certificate(this.pointer, certificate))
	}

	getClientCert() {
		return c.shout_get_client_certificate(this.pointer)
	}

	/* ----- Directory Parameters ----- */
	setPublic(makepublic) {
		return handleErrors(c.shout_set_public(this.pointer, +makepublic))
	}

	getPublic() {
		return !!c.shout_get_public(this.pointer)
	}

	setMeta(name, value) {
		return handleErrors(c.shout_set_meta(this.pointer, name, value))
	}

	getMeta(name) {
		return c.shout_get_meta(this.pointer, name)
	}

	// Audio constants
	setAudioInfo(name, value) {
		return handleErrors(c.shout_set_audio_info(this.pointer, name, value))
	}

	getAudioInfo(name) {
		return AUDIOINFO[c.shout_get_audio_info(this.pointer, name)]
	}

	/* ----- Metadata (MP3 Only) ----- */
	static createMetadata() {
		return new Metadata()
	}

	setMetadata(metadata) {
		return handleErrors(c.shout_set_metadata(this.pointer, metadata.pointer))
	}

}

function handleErrors(code) {
	if (code !== 0) {
		throw new Error(ERRORS[code])
	}
	return code
}

const shout = new Libshout()
shout.setHost('localhost')
shout.setPort(8000)
shout.setUser('source')
shout.setPassword('pass')
shout.setMount('deneme')
shout.setFormat(1) // 0=ogg, 1=mp3
shout.setAudioInfo('bitrate', '192')
shout.setAudioInfo('samplerate', '44100')
shout.setAudioInfo('channels', '2')
shout.open()
const meta = Libshout.createMetadata()
meta.add('name', 'song')
shout.setMetadata(meta)
// instance.host = 'hosttest'
// console.log(instance.host)

console.log(Libshout.version)
module.exports = Libshout