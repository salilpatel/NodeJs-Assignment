const http = require('http');
const url = require('url');

const data = [
	{
		name: 'john',
		year: 1998,
		month: 11,
		date: 23
	},
	{
		name: 'peter',
		year: 1997,
		month: 12,
		date: 2
	},
	{
		name: 'henry',
		year: 1999,
		month: 2,
		date: 28
	},
	{
		name: 'george',
		year: 1995,
		month: 1,
		date: 1
	},
	{
		name: 'kelly',
		year: 1996,
		month: 7,
		date: 9
	},
	{
		name: 'kelly',
		year: 1996,
		month: 9,
		date: 9
	},
	{
		name: 'kelly',
		year: 1996,
		month: 12,
		date: 9
	}
];

const server = http.createServer((req, res) => {
	const parsedURL = url.parse(req.url, true);
	/*console.log(parsedURL.query)*/
	const querydatauname = parsedURL.query.name;
	const querydatayear = parsedURL.query.year;
	const querydatamonth = parsedURL.query.month;
	const querydatadate = parsedURL.query.date;

	if (parsedURL.pathname === '/age' && req.method === 'GET') {
		const result = data.find(
			item =>
				item.name == querydatauname &&
				item.year == querydatayear &&
				item.month == querydatamonth &&
				item.date == querydatadate
		);
		/*console.log(result)*/
		if (result) {
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
				JSON.stringify({
					name: querydatauname,
					age: age
				})
			);
		} else {
			res.writeHead(300);
			res.end(JSON.stringify({ msg: 'data not found' }));
		}
	}
});
server.listen(8080, () => console.log('server started'));
