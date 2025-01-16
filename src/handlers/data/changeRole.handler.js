import { getUserData } from '../../session/game.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { JoinRoomPacket } from '../../utils/notification/game.notification.js';

const changeRoleHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, role, roomName } = payload;
    const user = getUserById(deviceId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    user.updateRole(role);
    const players = getUserData(roomName);

    const joinRoomResponse = JoinRoomPacket(players, roomName);
    socket.write(joinRoomResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default changeRoleHandler;