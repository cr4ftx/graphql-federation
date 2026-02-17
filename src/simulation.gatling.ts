import {
	constantUsersPerSec,
	rampUsers,
	StringBody,
	scenario,
	simulation,
} from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export default simulation((setUp) => {
	const requestPayload = JSON.stringify({
		query: `query Users {
      users {
        id
        firstName
        lastName
        recipes {
          id
          ingredients
          title
        }
      }
    }`,
		operationName: "Users",
		variables: {},
	});

	const httpProtocol = http
		.baseUrl("http://127.0.0.1:4000")
		.acceptHeader("application/json")
		.contentTypeHeader("application/json");

	const scn = scenario("GraphqlQuery").exec(
		http("Recipes")
			.post("/graphql")
			.header("Content-Type", "application/json")
			.body(StringBody(requestPayload))
			.check(status().saveAs("status")),
	);

	setUp(
		scn.injectOpen(
			rampUsers(500).during(10),
			constantUsersPerSec(100).during(5),
			rampUsers(100).during(5),
		),
	).protocols(httpProtocol);
});
