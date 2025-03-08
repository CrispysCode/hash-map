const HashMap = require('./HashMap');
function test(description, testFunction) {
  try {
      testFunction();
      console.log(`✅ ${description}`);
  } catch (error) {
      console.error(`❌ ${description}`);
      console.error(error);
  }
}