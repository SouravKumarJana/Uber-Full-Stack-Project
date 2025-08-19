const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server){
    io = socketIo(server, {
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) =>{
        console.log(`Client is connected ${socket.id}`);

        socket.on('join', async (data) =>{
            const {userId, userType} = data;

            if(userType === 'user'){
                //console.log(`user ${userId} join as ${userType}`)
                await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }
            else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }

        });


        socket.on('update-location-captain', async(data) =>{
            const {userId, location} = data;

            if(!location || !location.lat || !location.lng){
                return socket.emit('error', {message : 'Invalid Location'});
            }

            await captainModel.findByIdAndUpdate(userId,{
                location:{
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () =>{
            console.log(`Client Disconnected: ${socket.id}`);
        })

    });
    
}

function sendMessageToSocketId(socketId, messageObject) {
    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data)
        //console.log(messageObject.rideInformation)
    }
    else{
        console.log('socket is not Initialized')
    }
}

module.exports = {initializeSocket, sendMessageToSocketId}