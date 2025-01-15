
class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0; //이제 이게 '위치'
    this.y = 0;
    this.xSpeed =0; 
    this.ySpeed =0;
    this.role = 'None';
    this.isReady = false;
    this.lastUpdateTime = Date.now();
    this.isCarried = false;
  }

  updatePosition(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
    this.lastUpdateTime = Date.now();
  }

  calculatePosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  calculateSpeed() {
    return {
      x: this.xSpeed,
      y: this.ySpeed,
    };
  }

  updateRole(role) {
    this.role = role;
    this.lastUpdateTime = Date.now();
  }

  updateCarried(isCarried) {
    this.isCarried = isCarried;
    this.lastUpdateTime = Date.now();
  }
  
  setReadyStatus(isReady) {
    this.isReady = isReady; // 레디 상태 업데이트
    this.lastUpdateTime = Date.now();
  }

}

export default User;