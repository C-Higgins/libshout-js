libshout-js
===================
Native Node.js Libshout bindings for libshout 2.4.1 (latest).

>Libshout is a C library for streaming audio to icecast or shoutcast-compatible servers. It supports four audio formats and four protocols. It handles the networking and communication to the server, allowing users to focus on programmatic control.

More information: http://icecast.org

Usage
-------------
To use libshout-js, you must first install the libshout library. Consult your OS documentation on how to install libshout, for example:

    yum install libshout
    apt-get install libshout    
    brew install libshout

Install nodeshout with yarn or npm:

    yarn install libshout-js

Use as follows:
```js
    // Import
    const Libshout = require('libshout-js')

    // Create the instance. Specify path to the .so/.dll/.dylib file. 
    // If no path is set, it will attempt to load the standard dll locations.
    const ls = new Libshout('path/to/libshout.so')

    // Configure the connection
    const ls = new Libshout('/usr/local/lib/libls')
    ls.setHost('localhost')
    ls.setPort(8000)
    ls.setUser('user')
    ls.setPassword('pass')
    ls.setMount('mountpoint')

    // Set stream metadata
    ls.setMeta('description', 'A lovely stream')

    // Some constants are defined for you.
    ls.setFormat(Libshout.CONST.FORMATS.SHOUT_FORMAT_MP3)

    // ls.setAudioInfo('bitrate', '192')
    // ls.setAudioInfo('samplerate', '44100')
    // ls.setAudioInfo('channels', '2')
    ls.setAudioInfo({
        bitrate: '192',
        samplerate: '44100',
        channels: '2',
    })
```
Open the connection.
```js
    try {
        ls.open()
    } catch (err) {
        console.warn(err)
    }
```

If connection is successful, `.open()` will return string `SHOUT_ERR_SUCCESS`, otherwise it will throw an error. After successful connection, you can pipe audio data through the provided `writeStream` stream, or manually send data.
```js
    const fileStream = new fs.createReadStream('song.mp3')
    fileStream.pipe(ls.writeStream)
    ls.writeStream.on('finish', () => console.log('Song finished'))

    // or,
    ls.send(buffer, bufferLen)
```

If sending data manually, there are two ways to synchronize it.
`.sync()` will block the thread until ready.
`.getDelay()` will return the time in ms you should wait before sending the next chunk.

Metadata
-------------
Icecast only supports track metadata for MP3 streams. Vorbis streams are expected to embed metadata as vorbis comments in the audio stream.
```js
// Create a metadata instance
const metadata = Libshout.createMetadata()

// Set the metadata within the object. Supported values are defined in constants.
metadata.add('title', 'A Love Supreme Pt. I – Acknowledgement')

// Then, you must apply the metadata to the server connection object.
ls.setMetadata(metadata);
```

More information
-------------
The C code is heavily documented in the comments for `constants.js` and `bindings.js`. Look there for more Libshout specific information.
