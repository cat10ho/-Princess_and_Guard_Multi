
class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.role = 'None';
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

  updateRole(isCarried) {
    this.isCarried = isCarried;
    this.lastUpdateTime = Date.now();
  }

}

export default User;