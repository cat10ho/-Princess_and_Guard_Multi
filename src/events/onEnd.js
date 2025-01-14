import { getAllGameSessions } from '../session/game.session.js';
import { gameSessions } from '../session/sessions.js';
import { getUser, removeUser } from '../session/user.session.js';

export const onEnd = (socket) => () => {
  console.log('클라이언트 연결이 종료되었습니다.');
 const gameSessions = getAllGameSessions();
  for (const game of gameSessions) {
    const removedUser = game.removeUser(socket); // 각 게임에서 소켓 기반 유저 제거
    if (removedUser) {
      break; // 유저를 찾으면 중단 (유저는 한 게임에만 존재한다고 가정)
    }
  }
  removeUser(socket);
  console.log("현재 접속중인 유저",getUser());
};