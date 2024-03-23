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
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(`${url.origin}/allo`)}`,
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameAspectRatio:"1:1",
    button: [
     
        
      {
        text: "Newest gitcoin grants",
        buttonNumber: "1",
        action: "post",
        target: `https://${url.host}/allo/post/next`,
      }

      
      
    ],
  });
};

const MyComponent = component$(() => {
  return <>
  <div class="text-5xl font-bold text-white fixed left-[-3px] top-[-1px] h-[503px] w-[506px] rounded border-4 border-solid border-black bg-green-500">
  See active gitcoin grants on explorer.gitcoin.co straight on frame <img class="inline-block mr-2" width="40" height="1" src={`/image/gitcoin.png`}  />
  this is sort by newest, only 100 grants is shown in frame
  </div>
  
   
</>;
});

// Export the component for use in other parts of the application

export default MyComponent;
