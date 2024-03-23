import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
// @ts-ignore
import {Deta} from 'deta';
async function panca(offset: Number) {
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

async function getChain(DETA_KEY:string) {
  // @ts-ignore
  const deta=new Deta(DETA_KEY);
  const db = deta.Base("chains");
  const allChains=await db.fetch({});
  return allChains
}
export const useDomain = routeLoader$(async ({ url, params,env }) => {

  const alloGrants = await panca(Number(params.id));
  const allChain=await getChain(env.get("DETA_API_KEY") as string);
  const id=allChain.items.map((item:any) => ({id:parseInt(item.attributes.external_id), image:item.attributes.icon.url}))
  const chainImage=id.filter((a:any)=>a.id===alloGrants.chainId)
  return { url, alloGrants,chainImage };
});
export const head: DocumentHead = ({ resolveValue }) => {
  const domain = resolveValue(useDomain);
  const url = new URL(domain.url);
  return metadata({
    title: "farcaster",
    description: "panda",
    ogImage: `https://${url.host}/image/${Math.random()}?url=/allo`,
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameState: encodeURIComponent(JSON.stringify({ state: "pick" })),
    frameAspectRatio: "1:1",

    button: [

      {
        text: "Search username",
        buttonNumber: "1",
        action: "post",
        target: `https://${url.host}/zerion/search-username`,
      },
      {
        text: "Search token balance",
        buttonNumber: "2",
        action: "post",
        target: `https://${url.host}/zerion/search-token`,
      }


    ],
  });
};
// @ts-ignore
function checkTime(isoDateTime) {
  const now = new Date();
  const inputDate = new Date(isoDateTime);

  if (inputDate > now) {
    return true;
  } else {
    return false;
  }
}
// @ts-ignore
function convertToReadable(isoDateTime) {
  const date = new Date(isoDateTime);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
const MyComponent = component$(() => {
  const grant = useDomain()
  return <>
   <div class="rounded-3xl bg-white shadow-lg overflow-hidden a hover:opacity-90 transition hover:shadow-none w-[470px] mx-auto">
  <a
    target="_blank"
    href="/#/round/42161/0x1b96ad9da78cf768e9b5f0bb508cecc3d353d740"
    data-testid="round-card"
    data-track-event="round-card"
    rel="noreferrer"
  >
    <div class="w-full relative">
      <div class="overflow-hidden h-32">
        <div
          class="bg-black blur w-[120%] h-[120%] -mt-4 -ml-4 brightness-[40%] object-cover"
          style="background-image: url('/static/media/stock6.94b0583e7a4f85cd355f.jpg')"
        ></div>
      </div>
      {checkTime(grant.value.alloGrants.applicationsEndTime) ? (
        <div
          class="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-green-100 rounded-full absolute top-3 right-3"
        >
          Apply!
        </div>
      ) : (
        ""
      )}
      <div data-testid="round-name" class="w-full text-[24px] font-medium truncate pb-1 absolute bottom-1 px-2 text-white">
        {grant.value.alloGrants.roundMetadata.name}
      </div>
    </div>
    <div class="p-4 space-y-4">
      <div
        data-testid="round-description"
        class="md:text-base text-ellipsis line-clamp-4 text-grey-400 leading-relaxed min-h-[96px] text-2xl"
      >
        {grant.value.alloGrants.roundMetadata.eligibility.description}
      </div>
      <div class="flex gap-2 justfy-between items-center">
        <div class="flex-1">
          <div
            data-testid="apply-days-left"
            class="text-sm w-full font-mono whitespace-nowrap"
          >
            application ends at {convertToReadable(grant.value.alloGrants.applicationsEndTime)}
          </div>
          <div
            data-testid="days-left"
            class="text-sm w-full font-mono whitespace-nowrap"
          >
            donations ends at {convertToReadable(grant.value.alloGrants.donationsEndTime)}
          </div>
        </div>
        <div
          data-testid="round-badge"
          class={`font-mono text-sm text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-${grant.value.alloGrants.roundMetadata.quadraticFundingConfig ? "blue" : "green"}-100 rounded-lg`}
        >
          {grant.value.alloGrants.roundMetadata.quadraticFundingConfig ? "Quadratic Funding" : "Direct Grants"}
        </div>
      </div>
      <div class="border-t"></div>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <div
            data-testid="approved-applications-count"
            class="font-mono text-sm text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-grey-100 rounded-lg"
          >
            {grant.value.alloGrants.applications.length} projects
          </div>
          <div class="font-mono text-sm text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-grey-100 rounded-lg">
            <span data-testid="match-token">
              {grant.value.alloGrants.matchAmountInUsd !== 0
                ? `${grant.value.alloGrants.matchAmountInUsd.toLocaleString('en-US')} USD equivalent in match`
                : ""}
            </span>
          </div>
        </div>
        <div>
          <img class="w-8" src={grant.value.chainImage[0].image} alt="" />
        </div>
      </div>
    </div>
  </a>
</div>
    


  </>;
});

// Export the component for use in other parts of the application

export default MyComponent;
