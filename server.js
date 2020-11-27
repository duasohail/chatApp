const express = require('express')

const app = express()

const http = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

const port=process.env.port || 1234 

http.listen(port, ()=>{

    console.log(`listening on port ${port}`)

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//socketio

const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('connected...')

    socket.on('srvr_msg',(msg)=>{
        socket.broadcast.emit('srvr_msg',msg)
    })
})