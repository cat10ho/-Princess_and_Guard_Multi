import { getUserData } from '../../session/game.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { JoinRoomPacket } from '../../utils/notification/game.notification.js';

const roomDataHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, roomName } = payload;
    //이러고 게임 세션에서 어. 유저 확인해야함. 유저의 
    const players = getUserData(roomName);

    const joinRoomResponse = JoinRoomPacket(players, roomName);
    socket.write(joinRoomResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default roomDataHandler;