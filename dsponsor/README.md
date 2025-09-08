# DSponsor Stellar SubQuery Indexer

This project is a SubQuery indexer for the DSponsor protocol, designed to index events from Soroban (Stellar) smart contracts. It's part of a larger project involving the migration of an Ethereum dApp to Stellar.

## Project Structure

The project is organized as follows:
- `schema.graphql`: Defines the indexed data schema
- `project.yaml`: Indexer configuration and event handlers setup
- `src/mappings/`: Contains TypeScript mapping functions that process events

## Indexed Events

The indexer primarily tracks events from the `dsponsor-admin` contract, including:
- Creation of ad spaces
- Ad submissions
- Ad validations/reviews

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Generate types:
```bash
npm run codegen
```

3. Build the project:
```bash
npm run build
```

4. Start the indexer:
```bash
npm run dev
```

## Configuration

The project is configured to index events from a specific block on the Stellar network. The main event filters are defined in `project.yaml`:

```yaml
handler: "handleInitialization"
kind: StellarHandlerKind.Event
filter:
  topics: ["PROPOSAL", "REVIEW"]
  contractId: "CAY2NBEY3M7DTFKRYBVNRN66XXZ6TSQ4IUJD3KAMUHVMQRQDG5IU7GCC"
```

## GraphQL Queries

Once the indexer is running, you can query the data through the GraphQL interface available at [http://localhost:3000](http://localhost:3000).

Example query for the initialization event:
```graphql
query {
  initializations {
    nodes {
      id
      nftFactory
      nativeXlm
      bps
      admin
    }
  }
}
```

## Development

To modify the indexer:
1. Update the schema in `schema.graphql`
2. Generate types with `npm run codegen`
3. Modify handlers in `src/mappings/`
4. Rebuild and restart the indexer

## Key Features

- Real-time indexing of DSponsor contract events
- Efficient data querying through GraphQL
- Support for ad space management and validation workflow
- Integration with Soroban's event system

## Technical Details

The indexer processes several types of events:
- Ad space creation and initialization
- Ad proposal submissions
- Review/validation events
- Protocol configuration updates

Each event is parsed and stored according to the schema defined in `schema.graphql`, making the data easily queryable through the GraphQL API.

## Useful Resources

- [SubQuery Documentation](https://academy.subquery.network)
- [Soroban Documentation](https://soroban.stellar.org)
- [SubQuery Discord](https://discord.com/invite/subquery)

## Support

If you encounter any issues:
1. Check the [SubQuery Documentation](https://academy.subquery.network)
2. Join [SubQuery Discord](https://discord.com/invite/subquery)
3. Open an issue in the repository

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request with a clear description of your changes

## License

This project is licensed under the MIT License - see the LICENSE file for details
