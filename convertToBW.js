const fs = require('fs');
const sharp = require('sharp');
const readline = require('readline');

// Create an interface to read from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for the input filename
rl.question('Enter the input filename (e.g., input.png): ', (inputFile) => {
  // Ask for the output filename
  rl.question('Enter the output filename (e.g., output.png): ', (outputFile) => {
    // Close the readline interface
    rl.close();

    // Read the input image stream
    const readStream = fs.createReadStream(inputFile);

    // Create a transform stream to convert the image to black and white
    const transformStream = sharp().greyscale();

    // Create a write stream to save the output image
    const writeStream = fs.createWriteStream(outputFile);

    // Pipe the streams together to process the image
    readStream.pipe(transformStream).pipe(writeStream);

    // Handle events
    readStream.on('error', handleError);
    transformStream.on('error', handleError);
    writeStream.on('error', handleError);
    writeStream.on('finish', () => console.log('Image processing complete'));
  });
});

function handleError(err) {
  console.error('Error:', err.message);
  process.exit(1);
}

