import { Transform } from 'stream';

export class ChunkTransform extends Transform {
  private readonly _chunkSize: number;
  private _buffer: string[] = [];

  constructor(chunkSize: number) {
    super({ objectMode: true });
    this._chunkSize = chunkSize ?? 10;
  }

  _transform(chunk, encoding, callback) {
    if (this._buffer.length === this._chunkSize) {
      this.push(this._buffer);
      this._buffer = [];
    }

    this._buffer.push(chunk);
    callback();
  }

  _flush(callback) {
    this.push(this._buffer);
    callback();
  }
}
