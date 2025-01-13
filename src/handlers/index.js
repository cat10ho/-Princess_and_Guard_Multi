import { HANDLER_IDS } from '../constants/handlerIds.js';
import initialHandler from './user/initial.handler.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import updateLocationHandler from './game/updateLocation.handler.js';
import joinLobbyHandler from './game/joinLobby.handler.js';
import createRoomHandler from './game/createRoom.handler.js';
import joinRoomHandler from './game/JoinRoom.handler.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initial.InitialPacket',
  },
  [HANDLER_IDS.JOIN_LOBBY]: {
    handler: joinLobbyHandler,
    protoType: 'game.JoinLobbyPayload',
  },
  [HANDLER_IDS.CREAT_ROOM]: {
    handler: createRoomHandler,
    protoType: 'game.CreateRoomPayload',
  },
  [HANDLER_IDS.JOIN_ROOM]: {
    handler: joinRoomHandler,
    protoType: 'game.JoinRoomPayload',
  },
  [HANDLER_IDS.UPDATE_LOCATION]: {
    handler: updateLocationHandler,
    protoType: 'locationUpdatePayload.LocationUpdatePayload',
  },
  // 다른 핸들러들을 추가
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    // packetParser 체크하고 있지만 그냥 추가합니다.
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }
  return handlers[handlerId].protoType;
};