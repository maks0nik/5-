module.exports = new function(){ //То, что должна вернуть функция require
    const data = {}; //сами функции
    let increment=0;
    this.create = dt=>{
        dt.Id=increment++;
        data[dt.Id]=dt;
        return dt;
    }
    this.getAll = () =>{
        return Object.values(data);
    }
    this.get = id =>data[id];
    this.update = dt =>{
        data[dt.Id] = dt;
        return dt;
    }
    this.delete = id => delete data[id];
}