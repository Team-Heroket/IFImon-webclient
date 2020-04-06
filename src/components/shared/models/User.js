/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.avatarId = null;
    this.rank = null;
    this.gamesPlayed = null;
    this.gamesWon = null;
    this.gamesLost = null;
    this.winToLoseRatio = null;
    Object.assign(this, data);
  }
}
export default User;
