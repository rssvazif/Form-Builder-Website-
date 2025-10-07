const bcrypt = require("bcrypt");
class Users {
  #saltRounds = 10;
  authentication() {}
  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, this.#saltRounds);
    } catch (err) {
      console.log(err.message);
      throw new Error("error while hashing password");
    }
  }
}

module.exports = new Users();
