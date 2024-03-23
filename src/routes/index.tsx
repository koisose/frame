import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
import { routeLoader$ } from "@builder.io/qwik-city";
import { encodeToHex } from '~/utils/encode';
import {screenshotURI} from '~/utils/screenshot'
export const useDomain = routeLoader$(async({url}) => {
  // @ts-ignore
  
  return {url};
});
export default component$(() => {
  
  return (
    <>
welcome
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const domain = resolveValue(useDomain);
  const url = new URL(domain.url);
  return metadata({
    title: "farcaster",
    description: "panda",
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(url.origin)}`,
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameAspectRatio:"1:1"
  });
};
