
class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.role = 'None';
    this.isReady = false;
    this.lastUpdateTime = Date.now();

  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  calculatePosition() {
    return {
      x: this.x,
      y: this.y,
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