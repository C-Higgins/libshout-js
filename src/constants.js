/* eslint-disable no-inline-comments */
const _errors = {
	SHOUTERR_SUCCESS: 0,
	SHOUTERR_INSANE: -1, /* Nonsensical arguments e.g. self being NULL */
	SHOUTERR_NOCONNECT: -2, /* Couldn't connect */
	SHOUTERR_NOLOGIN: -3, /* Login failed */
	SHOUTERR_SOCKET: -4, /* Socket error */
	SHOUTERR_MALLOC: -5, /* Out of memory */
	SHOUTERR_METADATA: -6,
	SHOUTERR_CONNECTED: -7, /* Cannot set parameter while connected */
	SHOUTERR_UNCONNECTED: -8, /* Not connected */
	SHOUTERR_UNSUPPORTED: -9, /* This libshout doesn't support the requested option */
	SHOUTERR_BUSY: -10, /* Socket is busy */
	SHOUTERR_NOTLS: -11, /* TLS requested but not supported by peer */
	SHOUTERR_TLSBADCERT: -12, /* TLS connection can not be established because of bad certificate */
	SHOUTERR_RETRY: -13, /* Retry last operation. */
}

const _protocols = {
	SHOUT_PROTOCOL_HTTP: 0,
	SHOUT_PROTOCOL_XAUDIOCAST: 1,
	SHOUT_PROTOCOL_ICY: 2,
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

function enumerate(mappings) {
	const reverseMappings = Object.entries(mappings).reduce((obj, kv) => {
		obj[kv[1]] = kv[0]
		return obj
	}, {})
	return {...mappings, ...reverseMappings}
}