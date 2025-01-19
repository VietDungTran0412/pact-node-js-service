const { Verifier } = require('@pact-foundation/pact');
const app = require("../../index");
let server;
const PACT_BROKER_BASE_URL = "https://vietnam-national-university.pactflow.io";
const PACT_BROKER_TOKEN = "FhetDP4tQXfYaQPLl6QrBw";

describe('Provider Pact Verification', () => {
  beforeAll(async () => {
        server = app.listen(4000, () => {
            console.log("Provider running on port 4000");
        });
      });
      
  afterAll(() => {
    server.close();
  });

  it('validates the expectations of ReactFrontend (consumer)', async () => {
    const verifier = new Verifier({
      provider: 'NodeBackend', 
      providerBaseUrl: 'http://localhost:4000',
      pactBrokerUrl: PACT_BROKER_BASE_URL,
      pactBrokerToken: PACT_BROKER_TOKEN,
      consumerVersionSelectors: [{ branch: 'main' }],
      providerVersion: '1.0.0', 
      publishVerificationResult: true,
      failIfNoPactsFound: true,
      // logLevel: 'debug',
      stateHandlers: {
        'provider allows user creation': async () => {
          console.log('Setting up provider state: provider allows user creation');
          return Promise.resolve();
        },
      },
    });

    const result = await verifier.verifyProvider();
    console.log('✅ Pact Verification complete:', result);
  });
});
