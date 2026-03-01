import { ApolloFederationDriver, type ApolloFederationDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { PresentationModule } from "./presentation/module";

@Module({
  imports: [
    PresentationModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ["./**/*.graphql"],
      graphiql: true,
      playground: false,
    }),
  ],
})
export class AppModule {}
