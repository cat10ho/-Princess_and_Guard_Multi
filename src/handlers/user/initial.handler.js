import { addUser, getUser, getUserById } from '../../session/user.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getLobbyData } from '../../session/game.session.js';
import { joinLobbyPacket } from '../../utils/notification/game.notification.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    let { deviceId } = payload;

    addUser(deviceId, socket); 
    
    let rooms= getLobbyData();

    console.log("현재 접속중인 유저",getUser());
    
    const initialResponse = joinLobbyPacket(rooms);
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;