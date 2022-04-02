const UserService = require('../service/user');
const ContactService = require('../service/contact');

class UserController {
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch(e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }

  async getContacts(req, res, next) {
    try {
      const contacts = await ContactService.getAllContacts()
      contacts.reverse();
      return res.json(contacts);
    } catch(e) {
      next(e);
    }
  }

  async updContact(req, res, next) {
    try {
      const { name, phone, contactId } = req.body;
      const contacts = await ContactService.updCurrentContact(name, phone, contactId);
      return res.json(contacts);
    } catch(e) {
      next(e);
    }
  }

  async setContact(req, res, next) {
    try {
      const { name, phone, userId } = req.body;
      const contacts = await ContactService.setCurrentContact(name, phone, userId);
      return res.json(contacts);
    } catch(e) {
      next(e);
    }
  }

  async delContact(req, res, next) {
    try {
      const { contactId } = req.body;
      const contacts = await ContactService.delCurrentContact(contactId);
      return res.json(contacts);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new UserController();