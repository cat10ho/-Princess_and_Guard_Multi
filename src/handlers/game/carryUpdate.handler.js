import { v4 as uuidv4 } from 'uuid';
import { addGameSession, getGameSession, getUserData } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { CarryUpdatePacket, JoinRoomPacket } from '../../utils/notification/game.notification.js';

const carryUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { knightId, princessId, isCarried } = payload;
    const  knightUser = getUserById(knightId);
    const  princessUser = getUserById(princessId);
    if (!knightUser||!princessUser) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    knightUser.updateCarried(isCarried);
    princessUser.updateCarried(isCarried);

    const CarryUpdateResponse = CarryUpdatePacket(princessId , isCarried, knightId);
    
    knightUser.socket.write(CarryUpdateResponse);
    princessUser.socket.write(CarryUpdateResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default carryUpdateHandler;