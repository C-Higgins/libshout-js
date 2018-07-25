const ffi = require('ffi-napi')
const ref = require('ref')

module.exports = new ffi.Library('/usr/lib64/libshout.so.3.2.0', {
	// functionSymbol: [ returnType, [ arg1Type, arg2Type, ... ], ... ]
	shout_init: ['void', []],
	shout_version: ['CString', [ptr('int32'), ptr('int32'), ptr('int32')]],
	shout_new: [ptr('void'), []],
})

function ptr(type) {
	return ref.refType(ref.types[type])
}