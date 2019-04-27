import { Bytes } from '../src/types';

// TODO: https://github.com/oasislabs/oasis-client/issues/12

export interface Provider {
  send(request: Request): Promise<any>;
}

export class WebsocketProvider {
  constructor(private url: string) {}

  async send(request: Request): Promise<any> {
    // TODO
  }
}

export type Request = {
  data: Bytes;
  method: string;
};

export function defaultProvider(): Provider {
  return new WebsocketProvider('wss://web3.oasiscloud.io/ws');
}
