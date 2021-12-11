const repo = require("./repository");

module.exports = new function (){
    this.get = id=>repo.get(id);
    this.getAll = () => repo.getAll();
    this.create = data=>repo.create();
    this.update = data=>repo.create();
    this.delete = id=>repo.delete(id);
//Здесь хранятся данные, бизнес-логики нет
    //круд чистая функция, здесь будем получать данные, транслировать методы
}