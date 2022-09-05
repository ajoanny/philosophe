const {
    setEnvironmentData,
    getEnvironmentData,
    threadId,
    workerData
} = require('node:worker_threads');


async function thread(resolve) {
    console.log(`Hello ${threadId}!`);
    cpt = cpt + 1
    console.log(`${cpt} ${threadId}!`);
    resolve();
}


module.exports = thread;