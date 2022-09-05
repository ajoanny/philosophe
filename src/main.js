const { Mutex } = require('async-mutex');
let cpt = 0;
let id = 0;
const mutex = new Mutex();


async function sleep() {
  const time = getRandomSecond();
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function getRandomSecond() {
  return Math.floor(Math.random() * (3000 - 1000)) + 1000;
}

function thread(id) {
  return async (resolve) => {
    const release = await mutex.acquire();
    let current = cpt;
    console.log(`Hello ${id} - current : ${current}`);
    await sleep();
    current = current + 1
    console.log(`Bye ${id}   - current : ${current}`);
    cpt = current;
    release()
    resolve();
  };
}

async function main() {
  for(let i= 0; i < 10; i++) {
    new Promise(thread(i));
  }
}

main();