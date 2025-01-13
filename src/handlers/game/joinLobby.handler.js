import { getGameSession, getLobbyData } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const joinLobbyHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;
  
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

    let rooms= getLobbyData();

    const joinLobbyResponse = joinLobbyPacket(rooms);

    socket.write(joinLobbyResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default joinLobbyHandler