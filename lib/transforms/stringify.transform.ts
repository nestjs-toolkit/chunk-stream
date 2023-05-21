import { Transform } from 'stream';

export class StringifyTransform extends Transform {
  private readonly breakLine: string = '\r';

  constructor(enableBreakLine = true) {
    super({ objectMode: true });

    if (!enableBreakLine) {
      this.breakLine = '';
    }
  }

  _transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + this.breakLine);

    callback();
  }
}
