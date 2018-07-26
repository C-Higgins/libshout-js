/* eslint-disable camelcase */
const ffi = require('ffi-napi')
const ref = require('ref')

const shout_t = ref.types.void
const shout_tP = ptr(shout_t)

module.exports = new ffi.Library('/usr/lib64/libshout.so.3.2.0', {
	// functionSymbol: [ returnType, [ arg1Type, arg2Type, ... ], ... ]

	/* ----- Global functions ------ */
	shout_init: ['void', []],
	shout_shutdown: ['void', []],
	shout_version: ['CString', [ptr('int32'), ptr('int32'), ptr('int32')]],


	/* ----- Managing Connections ----- */

	// Allocates a new shout_t structure. May return NULL if no memory is available.
	// The result should be disposed of with shout_free when you are finished with it.
	shout_new: [shout_tP, []],

	// Frees a shout_t allocated by shout_new.
	shout_free: ['void', [shout_tP]],

	// Opens a connection to a server. All connection parameters must have been set prior to this call.
	shout_open: ['int32', [shout_tP]],

	// Closes a connection to the server.
	shout_close: ['int32', [shout_tP]],

	// Returns the connection status of the given shout_t object.
	shout_get_connected: ['int32', [shout_tP]],

	// Returns a statically allocated string describing the last shout error that occured in this connection.
	// Only valid until the next call affecting this connection.
	shout_get_error: ['CString', [shout_tP]],

	// Returns the shout error code of the last error that occured in this connection.
	shout_get_errorno: ['int32', [shout_tP]],


	/* ----- Sending Data ----- */

	// Sends [3rd] bytes of audio data from the buffer pointed to by [2nd] to the server.
	// The connction must already have been established by a successful call to shout_open.
	shout_send: ['int32', [shout_tP, ptr('uchar'), 'int32']],

	// Sends [3rd] bytes of audio data from the buffer pointed to by [2nd] to the server.
	// The buffer is not parsed for timing or validity, but sent raw over the connection.
	// The connction must already have been established by a successful call to shout_open.
	shout_send_raw: ['int32', [shout_tP, ptr('uchar'), 'int32']],

	// Causes the caller to sleep for the amount of time necessary to play back audio sent since the last call to
	// shout_sync.  Should be called before every call to shout_send to ensure that audio data is sent to the server at the
	// correct speed. Alternatively, the caller may use shout_delay to determine the number of milliseconds to wait and
	// delay itself.
	shout_sync: ['void', [shout_tP]],

	// Returns the number of milliseconds the caller should wait before calling shout_send again.
	// This function is provided as an alternative to shout_sync for applications that may wish
	// to do other processing in the meantime.
	shout_delay: ['int32', [shout_tP]],

	// Returns the number of bytes currently on the write queue.
	// Thus is only useful in non-blocking mode.
	shout_queuelen: ['int32', [shout_tP]],


	/* ----- Connection Parameters ----- */
	/* The following functions are used to get or set attributes of the shout_t object before calling shout_open.
	 They all work the same way: they operate on one attribute of a shout_t*.
	 The shout_get_* functions return the value of their associated parameter, or 0 on error
	 (that's NULL for those functions that return strings).

	 The shout_set_* functions will return either SHOUTERR_SUCCESS (0) on success, or an error code.
	 */

	// Sets nonblocking mode. The default is 0.
	shout_set_nonblocking: ['int32', [shout_tP, 'uint']],

	// Returns non-blocking mode or 0 in case of error.
	shout_get_nonblocking: ['uint', [shout_tP]],

	// Sets the server hostname or IP address. The default is localhost.
	shout_set_host: ['int32', [shout_tP, 'CString']],
	shout_get_host: ['CString', [shout_tP]],

	// Sets the server port. The default is 8000.
	shout_set_port: ['int32', [shout_tP, 'ushort']],
	shout_get_port: ['ushort', [shout_tP]],

	// Sets the user to authenticate as, for protocols that can use this parameter. The default is 'source'.
	shout_set_user: ['int32', [shout_tP, 'CString']],
	shout_get_user: ['CString', [shout_tP]],

	// Sets the password to authenticate to the server with. This parameter MUST be set. There is no default.
	shout_set_password: ['int32', [shout_tP, 'CString']],
	shout_get_password: ['CString', [shout_tP]],

	// Set the protocol with which to connect to the server. Supported protocols are listed in Constants.
	// The default is SHOUT_PROTOCOL_HTTP (compatible with Icecast2).
	shout_set_protocol: ['int32', [shout_tP, 'int32']],
	shout_get_protocol: ['int32', [shout_tP]],

	// Sets the audio format of this stream. The currently supported formats are listed in Constants.
	// The default is SHOUT_FORMAT_OGG.
	shout_set_format: ['int32', [shout_tP, 'int32']],
	shout_get_format: ['int32', [shout_tP]],

	// Sets the mount point for this stream, for protocols that support this option (SHOUT_PROTOCOL_ICY doesn't).
	shout_set_mount: ['int32', [shout_tP, 'CString']],
	shout_get_mount: ['CString', [shout_tP]],

	// If the server supports it, you can request that your stream be archived
	// on the server under the name <varname>dumpfile</varname>. This can quickly
	// eat a lot of disk space, so think twice before setting it.
	shout_set_dumpfile: ['int32', [shout_tP, 'CString']],
	shout_get_dumpfile: ['CString', [shout_tP]],

	// Sets the user agent header. This is libshout/VERSION by default.
	// If you don't know what this function is for, don't use it.
	shout_set_agent: ['int32', [shout_tP, 'CString']],
	shout_get_agent: ['CString', [shout_tP]],

	// This function sets the TLS (Transport Layer Security) mode to use.
	// [2] is a TLS mode constant. This is SHOUT_TLS_AUTO by default.
	// To force TLS on you should use SHOUT_TLS_AUTO_NO_PLAIN and SHOUT_TLS_DISABLED to force TLS off.
	// *While SHOUT_TLS_AUTO may connect via TLS this is not a secure mode as everybody can do a man in the middle
	// kind of attack and downgrade the connection to plain.
	shout_set_tls: ['int32', [shout_tP, 'int32']],
	shout_get_tls: ['int32', [shout_tP]],
})

function ptr(type) {
	if (typeof type === 'string') {
		return ref.refType(ref.types[type])
	}
	return ref.refType(type)
}