const http = require('http')
const url = require('url')
const data1 = require('./Data/data1.json')
const data2 = require('./Data/data2.json')

const server = http.createServer((req,res)=>{
    
    /* problem1 */
    const parsedURL = url.parse(req.url,true)
    const querydatauname = parsedURL.query.name
    const querydatayear = parsedURL.query.year
    const querydatamonth = parsedURL.query.month
    const querydatadate = parsedURL.query.date

    if(parsedURL.pathname==="/age" && req.method==="GET"){
        const result = data1.find((item)=>item.name==querydatauname&&item.year==querydatayear&&item.month==querydatamonth&&item.date==querydatadate)
        if(result){
            res.writeHead(200)
            let d = new Date();
            let yearNow = d.getFullYear();
            let monthNow = d.getMonth() + 1;
            let dateNow = d.getDay();

            let age = yearNow - querydatayear;
            if(monthNow < querydatamonth || (monthNow == querydatamonth && dateNow < querydatadate)){
                age -= 1;
            }
            
            res.end(JSON.stringify({
                "name":querydatauname,
                "age":age
            }))
            
        }
        else{
            res.writeHead(300)
            res.end(JSON.stringify({"msg":"data not found"}))
        }
    }

    /* Problem2 */
    if(parsedURL.pathname === '/vegetables' && req.method === 'GET'){
        res.writeHead(200)
        res.end(JSON.stringify(data2))
    }

    /* 404 : page not found */
    else{
        res.writeHead(404)
        res.end('page not found')
    }
})
server.listen(8080,()=>console.log('server started'))


