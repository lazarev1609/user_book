const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller');


router.post('/newUser', controller.newUser);            //Добавление нового пользователя 
router.post('/editUser', controller.editUser);          //Редактирование пользователя 
router.delete('/deleteUser', controller.deleteUser);    //Удаление пользователя
router.post('/abonement', controller.abonement);        //Установка покупки абонемента
router.get('/users', controller.users);                 //Получение списка всех пользователей
router.get('/user/:id', controller.getUserInfo);        //Получение конкретного пользователя
router.post('/newBook', controller.newBook);            //Добавление новой книги
router.post('/addBook', controller.addBook);            //Добавление книги пользователю 
router.post('/returnBook', controller.returnBook);      //Возвращение книги

module.exports = router;