const { ConvexHttpClient } = require('convex/browser');
const { anyApi } = require('convex/server');

const client = new ConvexHttpClient('https://utmost-aardvark-816.convex.cloud');

async function test() {
  try {
    console.log("Trying string query...");
    try {
      const res = await client.query('users:getAdmin');
      console.log('Result:', res);
    } catch (e) {
      console.error('Error with string:', e.message);
    }

    console.log("\nTrying anyApi query...");
    try {
      const res = await client.query(anyApi.users.getAdmin);
      console.log('Result:', res);
    } catch (e) {
      console.error('Error with anyApi:', e.message);
    }
  } catch (e) {
    console.error('Global error:', e);
  }
}
test();
