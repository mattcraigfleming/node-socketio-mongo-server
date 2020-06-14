var socketio = require('socket.io'),
  io,
  clients = {}

module.exports = {
  startSocketServer: function (app) {
    io = socketio.listen(app)

    // configure
    io.configure('development', function () {
      //io.set('transports', ['websocket', 'xhr-polling']);
      //io.enable('log');
    })

    io.configure('production', function () {
      io.enable('browser client minification')
      io.enable('browser client etag')
      io.set('log level', 1)
      io.set('transports', [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling',
      ])
    })

    io.sockets.on('connection', function (socket) {
      console.log('new connection: ' + socket.id)

      socket.on('disconnect', function () {
        console.log('device disconnected')
      })

      socket.on('connect_device', function (data, fn) {
        console.log('data from connected device: ' + data)
        for (var col in data) {
          console.log(col + ' => ' + data[col])
        }
      })
    })
  },
}
