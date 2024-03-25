import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
import { encodeToHex } from '~/utils/encode';
import {screenshotURI} from '~/utils/screenshot'
export const useDomain = routeLoader$((requestEvent) => {
  return requestEvent.request.url;
});
export const head: DocumentHead = ({ resolveValue }) => {
  const domain = resolveValue(useDomain);
  const url = new URL(domain);
  return metadata({
    title: "farcaster",
    description: "panda",
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(`${url.origin}/onthis`)}`,
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameAspectRatio:"1:1",
    frameInputText:"Pick number",
    button: [
     
        
      {
        text: "Pick",
        buttonNumber: "1",
        action: "post",
        target: `https://${url.host}/allo/post/next`,
      }

      
      
    ],
  });
};

const MyComponent = component$(() => {
  return <>
<div class="m-5 text-5xl">
  <span>Pick chain</span>
  <ol>
    <li class="flex items-center my-2">
      1. <img src={`https://chain-icons.s3.amazonaws.com/arbitrum.png`} alt="Item 1" class="h-10 w-10 mx-2" width="30" height="30" />
      Arbitrum one
    </li>
    <li class="flex items-center my-2">
      2. <img src={`https://chain-icons.s3.amazonaws.com/chainlist/8453`} alt="Item 2" class="h-10 w-10 mx-2" width="24" height="24" />
      Base
    </li>
    <li class="flex items-center my-2">
      3. <img src={`https://chain-icons.s3.amazonaws.com/polygon.png`} alt="Item 3" class="h-10 w-10 mx-2" width="24" height="24" />
      Polygon
    </li>
    <li class="flex items-center my-2">
      4. <img src={`https://chain-icons.s3.amazonaws.com/optimism.png`} alt="Item 4" class="h-10 w-10 mx-2" width="24" height="24" />
      Optimism
    </li>
  </ol>
</div>





  
   
</>;
});

// Export the component for use in other parts of the application

export default MyComponent;
