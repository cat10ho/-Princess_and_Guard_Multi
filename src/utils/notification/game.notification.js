import { getProtoMessages } from '../../init/loadProtos.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { config } from '../../config/config.js';

const makeNotification = (message, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {//위치정보 
  const protoMessages = getProtoMessages();
  const Location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return makeNotification(pingPacket, PACKET_TYPE.PING);
};

export const joinLobbyPacket = (rooms) => {//위치정보 
  const protoMessages = getProtoMessages();
  const JoinLobby = protoMessages.gameNotification.JoinLobby;

  const payload = { rooms };
  const message = JoinLobby.create(payload);
  const lobbyPacket = JoinLobby.encode(message).finish();
  return makeNotification(lobbyPacket, PACKET_TYPE.JOINLOBBY);
};

export const JoinRoomPacket = (players) => {//위치정보 
  const protoMessages = getProtoMessages();
  const JoinRoom = protoMessages.gameNotification.JoinRoom;

  const payload = { players };
  const message = JoinRoom.create(payload);
  const roomPacket = JoinRoom.encode(message).finish();
  return makeNotification(roomPacket, PACKET_TYPE.JOINROOM);
};