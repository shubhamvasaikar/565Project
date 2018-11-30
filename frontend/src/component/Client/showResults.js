const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function submit(values) {
  await sleep(500); // simulate server latency
  console.log(values);
});
