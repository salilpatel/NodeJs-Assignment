const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	const parsedURL = url.parse(req.url, true);
	/*console.log(parsedURL.query)*/
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
});
server.listen(8080, () => console.log('server started'));
