const fs = require('fs');
const path = require('path');

function generateIndexNowKeyFile() {
  const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
  
  if (!INDEXNOW_KEY) {
    console.warn('⚠️ INDEXNOW_KEY environment variable not found');
    return;
  }

  const keyFilePath = path.join(__dirname, '..', 'public', 'indexnow.txt');

  try {
    // Create the key file with the actual key value
    fs.writeFileSync(keyFilePath, INDEXNOW_KEY);
    console.log('✅ Successfully generated IndexNow key file');
  } catch (error) {
    console.error('❌ Error generating IndexNow key file:', error);
  }
}

generateIndexNowKeyFile();
