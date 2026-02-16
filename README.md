# GraphQL federation

Create an API gateway that federates at least 2 graphql services.
Docker compose to orchestrate.

## API gateway

Expose a federated gateway using apollo and hive, each of them propose a router and a gateway, try both.

## Services

- nestjs/apollo graphql app
- fastify/yoga graphql app

## Features

- [x] internal field resolver
- [x] federation field resolver
- [x] internal reference field resolver
- [ ] add some repositories using node-pg
- [ ] load test using k6 or gatling
- [ ] implement a dataloader an mesure performance
- [ ] cursor based pagination

## Benchmarks

Benchmarks a federated query with and without a dataloader

## Notes

- Harder to expose federated types with federation, might not be doable with nestjs code first approch
- Schema first approch gives more control, help defining a contract and overall is better for federation
