import { addUser, getUser, getUserById } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { v4 as uuidv4 } from 'uuid';
import { addGameSession, getAllGameSessions, getGameSession } from '../../session/game.session.js';

const gameId = 1000000;

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    let { deviceId } = payload;

    addUser(deviceId, socket); //캐릭터 아이디(종류) 도 추가해야 겠다야.
    const user = getUserById(deviceId);

    let gameSessionlist = getAllGameSessions();



    //찾아서 없으면 만들고 있으면 그냥 가져오기.
    // let gameSession = getGameSession(gameId);
    // if(!gameSession){
    //   gameSession = addGameSession(gameId);
    // }
    // gameSession.addUser(user);

    console.log("현재 접속중인 유저",getUser());

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { },
      deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;