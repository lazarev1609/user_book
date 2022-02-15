const {connection} = require('../databases/connection');


class Controller {

    async newUser(req, res) {

        try {
            
            const { name } = req.body;
            const request = await connection.promise().query("INSERT INTO user (name) VALUES(?)", [name]);
            res.status(201).json({message: "Успешное добавление нового пользователя"});
        
        } catch (error) {

            console.log(error);
            res.status(400).json({message: error});

        }
    }

    async editUser(req, res) {

        try {

            const { id, name } = req.body;
            const request = await connection.promise().query(`UPDATE user SET name = '${name}' WHERE id=${id}`);
            res.status(201).json({message: "Успешное обновление пользователя пользователя"});
            
        } catch (error) {

            console.log(error);
            res.status(400).json({message: error});

        }
    }

    async newBook(req, res) {
        
        try {
            
            const {title} = req.body;
            const request = await connection.promise().query("INSERT INTO book (title) VALUES(?)", [title]);
            res.status(201).json({message: "Успешное добавление новой книги"});
        
        } catch (error) {

            console.log(error);
            res.status(400).json({message: error});
        }
    }

    async abonement(req, res) {

        try {
            const {id} = req.body;
            await connection.promise().query(`UPDATE user SET abonement = ${1} WHERE id=${id}`);
            res.status(201).json({message:"Успешная покупка абонемента"});
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error});
        }
    }

    async deleteUser(req, res) {
        //Проверка есть ли вообще пользователь с таким id????
        try {
            console.log(req);
            const {id} = req.body;
            
            await connection.promise().query(`DELETE FROM user WHERE id=${id};`);
            res.status(201).json({message:"Успешное удаление пользователя"});

        } catch (error) {
            console.log(error);
            res.status(400).json({message: error});
        }
    }

    async users(req, res) {
        //console.log(req);
        try {
            
            let obj = [];

            const result = await connection.promise().query(`SELECT  name FROM user`);
            
            result[0].forEach(function(item){
                obj.push(item.name);
                //console.log(item.name);
            })
            
            res.status(201).json(obj);

        } catch (error) {

            console.log(error);
            res.status(400).json({message: error});
        }
    }

    async getUserInfo(req, res) {
        
        if(req.params) {
            console.log(123);
            const { id } = req.params;
            const result = await connection.promise().query(`SELECT user.name, book.title FROM user INNER JOIN book ON user.id = book.user_id WHERE user.id = ${id};`)
            
            if( !result ) {
                res.status(500).json({message: "Ошибка сервера"});
                return;
            }

            else {
                //console.log(123);
                res.status(201).json(result[0]);
            }
        }
    }

    async addBook(req, res) { 

        const {id, title} = req.body;

        //Проверка на количество книг у пользователя
        const cnt = await connection.promise().query(`SELECT user.name, book.title FROM user INNER JOIN book ON user.id = book.user_id WHERE user.id = ${id};`);

        if(cnt[0].length <= 5)
        {   
            const ab = await connection.promise().query(`SELECT abonement FROM user WHERE id=${id}`);
            console.log(ab[0]);
            if(ab[0][0]["abonement"] == 1)
            {   
                const busy = await connection.promise().query(`SELECT user_id FROM book WHERE title='${title}'`);
                console.log(busy[0]);
                if (busy[0][0]["user_id"] == null) {

                    const query = await connection.promise().query(`UPDATE book SET user_id = ${id} WHERE title='${title}';`);
                    if( !query ) {
                        res.status(500).json({message: "Ошибка сервера"});
                        return;
                    }
                    
                    else {
                        res.status(201).json({message:"Успешное добавление книги пользователю"});

                    }
                }
                else{
                    res.status(500).json({message:"Книга занята"});
                }
            }
            else{
                res.status(500).json("У пользователя нет абонемента");
            }
        }
        else{
            res.status(500).json({message:"Книг больше чем 5"});
        }
    }

    async returnBook(req, res) {

        const {title} = req.body;
        const query = await connection.promise().query(`UPDATE book SET user_id = 0 WHERE title='${title}';`);
        if( !query ) {
            res.status(500).json({message: "Ошибка сервера"});
            return;
        }
        
        else {
            res.status(201).json({message:"Успешное возвращение книги"});
        }
    }



}

module.exports = new Controller();