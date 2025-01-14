import { v4 as uuidv4 } from 'uuid';
import { addGameSession, getGameSession, getUserData } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { JoinRoomPacket } from '../../utils/notification/game.notification.js';

const joinRoomHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, roomName } = payload;
    const gameSession = getGameSession(roomName);
    if (gameSession.users.length >= 2) {
      throw new CustomError(ErrorCodes.ROOM_FULL, '방에 더 이상 유저를 추가할 수 없습니다.');
    }
    
    if(gameSession.state === 'inProgress') {
      throw new CustomError(ErrorCodes.ROOM_FULL, '이미 게임 시작중입니다.');
    }

    const user = getUserById(deviceId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    gameSession.addUser(user);
    
    //이러고 게임 세션에서 어. 유저 확인해야함. 유저의 
    const players = getUserData(roomName);

    const joinRoomResponse = JoinRoomPacket(players, roomName);
    socket.write(joinRoomResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default joinRoomHandler;