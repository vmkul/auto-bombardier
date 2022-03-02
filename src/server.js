const fastify = require('fastify')({ logger: true });
const chokidar = require('chokidar');
const fs = require('fs');

const PATH_TO_TARGETS = '/usr/local/auto-bombardier/targets.txt';
const PORT = 2577;
let targets = [];

chokidar.watch(PATH_TO_TARGETS).on('all', async (event, path) => {
    console.log('Updating targets after change!');
    try {
	targets = await getTargets();	
    } catch (e) {
	console.log('Could not update targets!\nError: ' + e.message);
    }
});

const getTargets = async () => {
    const res = [];
    const data = await fs.promises.readFile(PATH_TO_TARGETS);

    data.toString().split('\n').forEach((target) => {
	if (target.length != 0) {
	    res.push(target.trim());
	}
    })

    return res;
}

fastify.get('/', async (request, reply) => {
    return { targets };
})

const start = async () => {
    try {
	await fastify.listen(PORT);
    } catch (err) {
	fastify.log.error(err);
	process.exit(1);
    }
}
start();
