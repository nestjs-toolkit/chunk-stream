import { Transform } from 'stream';

export class AllBufferTransform extends Transform {
  private _buffer: string[] = [];

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    this._buffer.push(chunk);
    callback();
  }

  _flush(callback) {
    this.push(this._buffer);
    callback();
  }
}
