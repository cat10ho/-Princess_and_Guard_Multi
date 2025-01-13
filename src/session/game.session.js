import { gameSessions } from './sessions.js';
import Game from '../classes/models/game.class.js';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSessions.push(session);
  return session;
};

export const removeGameSession = (id) => {
  const index = gameSessions.findIndex((session) => session.id === id);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const getGameSession = (id) => {
  return gameSessions.find((session) => session.id === id);
};

export const getAllGameSessions = () => {
  return gameSessions;
};

export const getLobbyData = () => {
  return gameSessions.map((session) => ({
    roomName: session.id, // 게임 세션의 이름 (id 사용)
    maxPlayers: 2, // 최대 플레이어 수 나중에 바꾸던가 하셈. 방 생성때 추가하던가.
    currentPlayers: session.users.length, // 현재 플레이어 수
  }));
};

export const getUserData = (sessionId) => {
  const session = getGameSession(sessionId); // 세션 ID로 게임 세션 찾기
  if (!session) {
    throw new Error('Game session not found');
  }

  return session.users.map((user) => ({
    deviceId: user.id, // 유저 ID
    role: user.role,   // 유저 역할
  }));
};
