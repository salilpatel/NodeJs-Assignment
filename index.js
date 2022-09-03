const http = require('http');
const url = require('url');
const data2 = require('./Data/data2.json');
const data3 = require('./Data/data3.json');

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
	/* Problem 1 */
	if (parsedURL.pathname === '/age' && req.method === 'GET') {
    
	  const querydatauname = parsedURL.query.name;
	  const querydatayear = parsedURL.query.year;
	  const querydatamonth = parsedURL.query.month;
	  const querydatadate = parsedURL.query.date;
		
		if (querydatauname != null && querydatayear != null && querydatamonth != null & querydatadate != null) {
			res.writeHead(200);
			let d = new Date();
			let yearNow = d.getFullYear();
			let monthNow = d.getMonth() + 1;
			let dateNow = d.getDay();

			let age = yearNow - querydatayear;
			if (
				monthNow < querydatamonth ||
				(monthNow == querydatamonth && dateNow < querydatadate)
			) {
				age -= 1;
			}

			res.end(
				JSON.stringify(`hello ${querydatauname}, you are ${age} years old.`)
			);
		} else {
			res.writeHead(300);
			res.end(JSON.stringify({ msg: 'data not found' }));
		}
	}

	/* Problem 2 */
	if (parsedURL.pathname === '/vegetables' && req.method === 'GET') {
		res.writeHead(200);
		res.end(JSON.stringify(data2));
	} 

  /* Problem 3 */
  if(parsedURL.pathname === '/metrics' && req.method === 'GET'){
        const qdataObject = parsedURL.query.object
        const qdataMetric = parsedURL.query.metric
        const qdataRadius = parsedURL.query.radius

        const result = data3.find((item)=>qdataObject===item.object&&qdataMetric===item.metric)
        if(qdataObject != null && qdataMetric != null && qdataRadius != null){
            res.writeHead(200)
            let area;
            /* area of circle */
            if(result.object  === 'circle' && result.metric === 'area'){
                area = 3.14 * qdataRadius * qdataRadius
                area = Math.round(area*100)/100 
            }
            /* area of sphere */
            if(result.object  === 'sphere' && result.metric === 'area'){
                area = 12.56 * qdataRadius * qdataRadius
                area = Math.round(area*100)/100
            }
            /* volume of sphere */
            if(result.object  === 'sphere' && result.metric === 'volume'){
                area = 4.19 * qdataRadius * qdataRadius * qdataRadius
                area = Math.round(area*100)/100
            }
            res.end(`${qdataMetric} of ${qdataObject} is ${area}`)
        }
        else{
            res.writeHead(300)
            res.end("enter object, metric, & radius")
        }
    }
  
  /* 404 : page not found */
  else {
		res.writeHead(404);
		res.end('404 page not found');
	}
});
server.listen(8080, () => console.log('server started'));
