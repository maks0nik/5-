//Пока запущено приложения, оно будет хранить информацию
const http = require("http"),  //Подключает сервер.библиотек
    crud = require("/.crud");

const echo = (res,content)=>{
    res.end(JSON.stringify(content)); //Заканчивает поток данных также дописывает поп данных
}

const student = (req,res)=>{   //req - то, что приходит от клиента, res - то, что должны отдать клиенту
    res.writeHead(200,{"Content-type":"aplication/json"}); //Отправляет код с номером 200(то что всё окей), дальше идёт запись из json

    const url = req.url.substring(1).split("/"); // создаёт в юрл массив, разделённый через слэш
//Джава скрипт - ассинхронный, однопоточный
    switch (req.method){
        case "GET":  //Запрос GET(метод для чтения данных с сайта) передает данные в URL в виде пар "имя-значение" (другими словами, через ссылку), а запрос POST(метод для отправки данных на сай) передает данные в теле запроса
                     //Получает данные со всех студентов
            if(url.length>1)
                echo(res,crud.get(url[1])); //если есть id, то получаем его
            else
                echo(res,crud.getAll());  //если нет id, то получаем всё
            break;
        case "POST":  //добавление
            getAsyncData(req,data =>{
                echo(res,crud.create(JSON.parse(data)))  //Передаём объект
            })
            break;
        case "PUT":  //Изменение записанного
            getAsyncData(req,data=>{
                echo(res,crud.update(JSON.parse(data)));
            })
            break;
        case "DELETE": //Удаление
            if(url.length>1)
                echo(res, crud.delete(url[1])); //если есть id у студента, то удаляем студента с этим id
            else
                echo(res,{error:"Не передан ID"}); //Если нет id
            break;

    }
}
const getAsyncData = (req,callback) =>{
    let data = "";
        //.on "связывает" data и chunk, на сервер в это время поступают данные
    req.on("data", chunk=>{data+=chunk}); //добавляет введённые данные из самого json'a
        //На сервер поступает data, пока на сервер подаются данные
    req.on("end", ()=>{callback(data);}); //вызывается, когда на сервер пришли все данные
       //end генерируется, когда на сервер прибыли все данные
}

const handler = function (req, res){
    const url = req.url.substring(1).split("/");
    switch (url[0]){
        case "student":  //вызывается, если в юрл есть student
            student(req,res); //запускаем функцию
            return;
        case "": //вызывается, если нет локалхоста, как написал выше(student)
            res.end("index") //вызывается функция end
            return;
    }
    console.log("after switch");
    console.log(req.url);
    console.log(req.method);
    res.end("echo"); //завершает поток с выводом ответа @echo"
}

http.createServer(handler).listen(8090, ()=>{ //создание сервера с портом "8090"  и с функцией handler
    console.log("run");
})


