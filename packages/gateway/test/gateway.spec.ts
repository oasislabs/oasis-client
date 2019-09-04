import Gateway from '../src/';

describe('Gateway', () => {
  it('Sends POST to /v0/api/event/unsubscribe when unsubscribing', async () => {
    let gw = new Gateway(
      'testing',
      'qWD4icUz+jAadSKJuGtn40eKgG5hbTetygimEdLRyFk=',
      {
        headers: new Map(),
      }
    );

    let _resolve;
    let testCompletion: Promise<RequestPayload> = new Promise(
      (resolve, _reject) => {
        _resolve = resolve;
      }
    );

    // Mock the subscription and request out.
    // @ts-ignore
    gw.inner.subscriptions.set('test', 1);
    // @ts-ignore
    gw.inner.session.request = async (
      method: string,
      api: string,
      body: Object
    ) => {
      _resolve!({
        api,
        method,
        body,
      });
    };

    gw.unsubscribe({ event: 'test' });

    let request = await testCompletion;

    expect(request.api).toEqual('v0/api/event/unsubscribe');
    expect(request.method).toEqual('POST');
  });
});

// Parameters given to the HTTP request method.
type RequestPayload = {
  api: string;
  method: string;
  body: Object;
};
