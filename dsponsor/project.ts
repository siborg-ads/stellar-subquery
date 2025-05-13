import {
  StellarDatasourceKind,
  StellarHandlerKind,
  StellarProject,
} from "@subql/types-stellar";

const contractId = "CCHLMFB5BOUWWA6YWSCM33P7IXLDJSBRK2AQYFSBHPXMT3EJ7YUH5IU5";

const project: StellarProject = {
  specVersion: "1.0.0",
  name: "dsponsor-admin",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-stellar",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "DSponsor Admin subquery on Stellar Testnet",
  repository: "",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    // Stellar and Soroban uses the network passphrase as the chainId
    // 'Public Global Stellar Network ; September 2015' for mainnet
    // 'Test SDF Future Network ; October 2022' for Future Network
    chainId: "Test SDF Network ; September 2015",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://horizon-testnet.stellar.org"],
    // This is a specific Soroban endpoint
    // It is only required when you are using a soroban/EventHandler
    sorobanEndpoint: "https://soroban-testnet.stellar.org",
  },
  dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      startBlock: 795501,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleInitialization",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "Init", // Topic signature(s) for the events, there can be up to 4
              ],
              contractId:
                contractId,
            },
          },
          {
            handler: "handleOffer",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "OFFER",
              ],
              contractId:
                contractId,
            },
          },
          {
            handler: "handleProposal",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "PROPOSAL",
              ],
              contractId:
                contractId,
            },
          },
          {
            handler: "handleReview",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "REVIEW",
              ],
              contractId:
                contractId,
            },
          },
          {
            handler: "handlePayment",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "PAYMENT",
              ],
              contractId:
                contractId,
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
