import { getGameSession, getLobbyData } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const gameReadyHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, role, roomName } = payload;
  
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

    user.updateRole(role);
    user.setReadyStatus(true);

    const gameSession = getGameSession(roomName);
    if (!gameSession) {
      throw new CustomError(ErrorCodes.SESSION_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const knightCount = gameSession.users.filter((u) => u.role === 'Knight').length;
    const princessCount = gameSession.users.filter((u) => u.role === 'Princess').length;

    if (gameSession.users.length === 1) {
      // 1명일 때는 무조건 기사가 되어야 함
      if (role !== 'Knight') {
        throw new CustomError(ErrorCodes.INVALID_ROLE, '한 명일 때는 반드시 기사가 되어야 합니다.');
      }
    } else if (gameSession.users.length === 2) {
      // 2명일 때 기사와 공주가 각각 한 명씩 있어야 함
      if (knightCount > 1 || princessCount > 1) {
        throw new CustomError(ErrorCodes.INVALID_ROLE, '두 명일 때 기사와 공주는 각각 한 명씩 있어야 합니다.');
      }
    }

    user.setReadyStatus(true);
    const allReady = gameSession.users.every((u) => u.role !== 'None' && u.isReady);
    if (allReady && gameSession.users.length === 2 && knightCount === 1 && princessCount === 1) {
      gameSession.startGame();
    };
    
  } catch (error) {
    handleError(socket, error);
  }
};

export default gameReadyHandler