const Router = require('express').Router;
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = new Router();

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

router.get('/contacts/get', authMiddleware, UserController.getContacts);
router.post('/contacts/upd', authMiddleware, UserController.updContact);
router.post('/contacts/set', authMiddleware, UserController.setContact);
router.post('/contacts/del', authMiddleware, UserController.delContact);

module.exports = router;