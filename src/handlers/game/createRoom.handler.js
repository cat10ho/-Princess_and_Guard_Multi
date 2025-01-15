import { v4 as uuidv4 } from 'uuid';
import { addGameSession, getUserData, isGameIdDuplicate } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { JoinRoomPacket } from '../../utils/notification/game.notification.js';

const createRoomHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, roomName } = payload;
    

    if (!roomName || roomName === ""|| roomName === "None" ) {
      throw new CustomError(ErrorCodes.NONE_ROOM_NAME, '방 이름이 없음.');
    }

    if(isGameIdDuplicate(roomName)){
      throw new CustomError(ErrorCodes.ROOM_NAME_DUPLICATE, '방 이름이 중복됨.');
    }

    const gameSession = addGameSession(roomName);
    const user = getUserById(deviceId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    gameSession.addUser(user);

    //이러고 게임 세션에서 어. 유저 확인해야함. 유저의 
    const players = getUserData(roomName);
    const createRoomResponse = JoinRoomPacket(players ,roomName);
    socket.write(createRoomResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default createRoomHandler;