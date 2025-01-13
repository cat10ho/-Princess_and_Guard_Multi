export const packetNames = {
  common: {
    Packet: 'common.Packet',
    Ping: 'common.Ping',
  },
  initial: {
    InitialPacket: 'initial.InitialPacket',
  },
  game: {
    JoinLobbyPayload: 'game.JoinLobbyPayload',
    CreateRoomPayload: 'game.CreateRoomPayload',
    JoinRoomPayload: 'game.JoinRoomPayload',
    GameReadyPayload: 'game.GameReadyPayload',
    CarryUpdatePayload: 'game.CarryUpdatePayload',
    LocationUpdatePayload: 'game.LocationUpdatePayload',
  },
  response: {
    Response: 'response.Response',
  },
  gameNotification: {
    JoinLobby: 'gameNotification.JoinLobby',
    JoinRoom: 'gameNotification.JoinRoom',
    LocationUpdate: 'gameNotification.LocationUpdate',
    CarryUpdate: 'gameNotification.CarryUpdate',
  },
};