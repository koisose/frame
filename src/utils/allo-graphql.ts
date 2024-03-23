export async function graphql(offset: Number) {
    const date = new Date(); // current date and time
    const isoFormat = date.toISOString();
    const url = 'https://grants-stack-indexer-v2.gitcoin.co/graphql';
    const payload = {
      "query": "query GetRounds($first: Int $orderBy: [RoundsOrderBy!] $filter: RoundFilter $offset: Int) { rounds(offset:$offset,first: $first, orderBy: $orderBy, filter: $filter) { id chainId tags roundMetadata roundMetadataCid applicationsStartTime applicationsEndTime donationsStartTime donationsEndTime matchAmountInUsd matchAmount matchTokenAddress strategyId strategyName strategyAddress applications(first: 1000, filter: { status: { equalTo: APPROVED } }) { id } } } ",
      "variables": {
        "orderBy": "CREATED_AT_BLOCK_DESC",
        "chainIds": [1, 10, 424, 42161, 43114, 137, 324, 8453, 534352, 250],
        "first": 1,
        "offset": offset,
        "filter": {
          "and": [
            {
              "or": [
                {
                  "donationsStartTime": { "lessThan": isoFormat },
                  "donationsEndTime": { "greaterThan": isoFormat, "lessThan": "3023-07-06T01:03:43.562Z" }
                },
                {
                  "applicationsStartTime": { "lessThanOrEqualTo": isoFormat },
                  "applicationsEndTime": { "greaterThanOrEqualTo": isoFormat }
                }
              ]
            },
            { "or": { "chainId": { "in": [1, 10, 424, 42161, 43114, 137, 324, 8453, 534352, 250] } } },
            { "or": { "tags": { "contains": "allo-v1" } } }
          ]
        }
      },
      "operationName": "GetRounds"
    }
      ;
  
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data.data.rounds[0];
    } catch (error) {
      return {}
    }
  }