import { getGameSession, getLobbyData } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { joinLobbyPacket } from '../../utils/notification/game.notification.js';

const joinLobbyHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;
  
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    //생각해 보니까 게임 진행중이면 들어올수 없도록 추가.
    let rooms= getLobbyData();

    const joinLobbyResponse = joinLobbyPacket(rooms);

    socket.write(joinLobbyResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default joinLobbyHandler