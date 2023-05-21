/* eslint-disable @typescript-eslint/no-empty-function */
import { ReadStream, createReadStream } from 'fs';
import { pipeline, Readable } from 'stream';
import readline from 'readline';
import { promisify } from 'util';

export const pipelineAsync = promisify(pipeline);

export function createLinesReadStream(
  fileStream: string | ReadStream,
): Readable {
  const readStream = new Readable({
    objectMode: false,
    read() {},
  });

  const inputStream =
    typeof fileStream === 'string' ? createReadStream(fileStream) : fileStream;

  const readLineStream = readline.createInterface({ input: inputStream });

  readLineStream
    .on('line', (row) => {
      readStream.push(row);
    })
    .on('close', () => {
      readStream.push(null);
      readStream.emit('finish');
    });

  inputStream.on('stop', () => {
    readLineStream.close();
    readStream.destroy();
  });

  inputStream.on('error', () => {
    readLineStream.close();
    readStream.destroy();
  });

  return readStream;
}
