const _errors = {
	SHOUTERR_SUCCESS: 0,

	// Indicates bad parameters, either nonsense or not applicable due to the current
	// state of the connection.
	SHOUTERR_INSANE: -1,

	// Indicates a connection with the server could not be established.
	SHOUTERR_NOCONNECT: -2,

	// Indicates the server refused to accept a login attempt. This could be caused
	// by a bad user name or password.
	SHOUTERR_NOLOGIN: -3,

	// Indicates an error sending or receiving data.
	SHOUTERR_SOCKET: -4,

	// Indicates the function could not allocate the memory it required.
	SHOUTERR_MALLOC: -5,

	// Indicates an error updating metadata on the server.
	SHOUTERR_METADATA: -6,

	// Indicates that, while connected, you attempted to call a function which only makes
	// sense before connection (eg you attempted to set the user name or stream name).
	SHOUTERR_CONNECTED: -7,

	// Indicates that you attempted to use a function that requires an open connection
	// (for example, shout_send) while you were not connected.
	SHOUTERR_UNCONNECTED: -8,

	// Indicates that you attempted to use a function which is unsupported in the
	// state of your connection. For example, attempting to set metadata while using the
	// Ogg Vorbis format is unsupported.
	SHOUTERR_UNSUPPORTED: -9,

	// Indicates that the socket is busy. The funtion returning this should be
	// called again later. This is likely to happen in non-blocking mode but may also happen
	// in blocking mode.
	SHOUTERR_BUSY: -10,

	// TLS (Transport Layer Security) was requested via shout_set_tls but is not supported by the server.
	SHOUTERR_NOTLS: -11,

	// A TLS (Transport Layer Security) connection has been established but the server
	// returned a certificate which failed the check. The certificate may be invalid or
	// is not signed by a trusted CA. See shout_set_tls.
	SHOUTERR_TLSBADCERT: -12,

	// The caller should retry this call later.
	SHOUTERR_RETRY: -13,
}

const _protocols = {
	// The HTTP protocol. This is the native protocol of the Icecast 2 server, and is the default.
	SHOUT_PROTOCOL_HTTP: 0,

	// The Audiocast format. This is the native protocol of Icecast 1.
	SHOUT_PROTOCOL_XAUDIOCAST: 1,

	// The ShoutCast format. This is the native protocol of ShoutCast.
	SHOUT_PROTOCOL_ICY: 2,

	// The RoarAudio protocol. This is the native protocol for RoarAudio.
	SHOUT_PROTOCOL_ROARAUDIO: 3,
}

const _formats = {
	// The Ogg Format. Vorbis or any codec may be used. This is the default format. application/ogg
	SHOUT_FORMAT_OGG: (0),

	// The MP3 format. audio/mpeg
	SHOUT_FORMAT_MP3: (1),

	// The WebM format. video/webm
	SHOUT_FORMAT_WEBM: (2),

	// The WebM format, audio only streams. audio/webm
	SHOUT_FORMAT_WEBMAUDIO: (3),
}

const _tls = {
	// TLS (Transport Layer Security) is disabled. Passwords and data will be sent unencrypted.
	SHOUT_TLS_DISABLED: (0),

	// TLS (Transport Layer Security) support by the server will be autodetected. This is the default.
	//   In this mode TLS is used if supported by the server.
	//   Please note that this is not a secure mode as it will
	//   not prevent any downgrade attacks. SHOUT_TLS_AUTO_NO_PLAIN is a more secure version of this mode.
	SHOUT_TLS_AUTO: (1),

	// TLS (Transport Layer Security) is used. Autodetection is used to find out about which modes
	// are supported by the server. This mode should be used for secure connections.
	SHOUT_TLS_AUTO_NO_PLAIN: (2),

	// TLS (Transport Layer Security) is used as defined by RFC2818. In this mode libshout expects a TLS socket
	// on the server side and will begin with a TLS handshake prior to any other communication.
	SHOUT_TLS_RFC2818: (11),

	// TLS (Transport Layer Security) is used as defined by RFC2817.
	// In this mode libshout will use HTTP/1.1's Upgrade:-process to switch to TLS.
	// This allows to use TLS on a non-TLS socket of the server.
	SHOUT_TLS_RFC2817: (12),
}

const _audioInfo = {
	// Used to specify the nominal bitrate of the stream.
	SHOUT_AI_BITRATE: 'bitrate',

	// Used to specify the samplerate of the stream.
	SHOUT_AI_SAMPLERATE: 'samplerate',

	// Used to specify the number of channels (usually one or two).
	SHOUT_AI_CHANNELS: 'channels',

	// Used to specify the Ogg Vorbis encoding quality of the stream.
	SHOUT_AI_QUALITY: 'quality',
}

const _meta = {
	SHOUT_META_NAME: 'name',
	SHOUT_META_URL: 'url',
	SHOUT_META_GENRE: 'genre',
	SHOUT_META_DESCRIPTION: 'description',
	SHOUT_META_IRC: 'irc',
	SHOUT_META_AIM: 'aim',
	SHOUT_META_ICQ: 'icq',
}

module.exports = {
	ERRORS: enumerate(_errors),
	PROTOCOLS: enumerate(_protocols),
	FORMATS: enumerate(_formats),
	TLS: enumerate(_tls),
	AUDIOINFO: enumerate(_audioInfo),
	META: enumerate(_meta),
}

function enumerate(mappings) {
	const reverseMappings = Object.entries(mappings).reduce((obj, kv) => {
		obj[kv[1]] = kv[0]
		return obj
	}, {})
	return {...mappings, ...reverseMappings}
}