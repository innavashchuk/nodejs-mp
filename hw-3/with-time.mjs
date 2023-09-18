import EventEmitter from './event-emitter.mjs';

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    try {
      this.emit('begin'); 

      const startTime = process.hrtime();
      const result = await asyncFunc(...args);
      const endTime = process.hrtime(); 
      const executionTime = (endTime[0] * 1e9 + endTime[1] - startTime[0] * 1e9 - startTime[1]) / 1e6;

      this.emit('end');
      this.emit('data', { result, executionTime });
    } catch (error) {
      this.emit('error', error); 
    }
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.on('data', ({ result, executionTime }) => {
  console.log(`Received data: ${JSON.stringify(result)}`);
  console.log(`Execution time: ${executionTime}ms`);
});

withTime.on('error', (error) => {
  console.error(`An error occurred: ${error.message}`);
});

withTime.execute(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
});
