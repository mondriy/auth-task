const UserModel = require('../models/user');
const TokenService = require('./token');
const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/error');

class UserService {
  async login(login, password) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не существет'); 
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const tokens = TokenService.generateTokens({ id: user.id, login: user.login });
    await TokenService.saveToken(user.id, tokens.refreshToken);
    
    return {...tokens, id: user.id, login: user.login};
  }

  async logout(refreshToken) {
    const token = TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError(); 
    }
    
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenDB = await TokenService.findToken(refreshToken);
    if (!userData || !tokenDB) {
      throw ApiError.UnauthorizedError(); 
    }

    const user = await UserModel.findById(userData.id);

    const tokens = TokenService.generateTokens({ id: user.id, login: user.login });
    await TokenService.saveToken(user.id, tokens.refreshToken);
    
    return {...tokens, id: user.id, login: user.login};
  }
}

module.exports = new UserService();