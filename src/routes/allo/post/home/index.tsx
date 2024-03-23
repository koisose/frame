import { type RequestHandler } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
import { encodeToHex } from '~/utils/encode';
import {screenshotURI} from '~/utils/screenshot'

export const onPost: RequestHandler = async ({  html, url }) => {
     
    
  const meta = metadata({
    title: "farcaster",
    description: "frame",
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(`${url.origin}/allo`)}`,
    frameState: encodeURIComponent(JSON.stringify({ state: 0 })),
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
    
]
  }).meta;

  html(
    200,
    `<html>
  <head>${meta
    .map((obj) => {
      const [key1, value1] = Object.entries(obj)[0];
      const [key2, value2] = Object.entries(obj)[1];
      return `<meta ${key1}="${value1}" ${key2}="${value2}" />`;
    })
    .join("")}</head>
  <body>
  daw</body>
  </html>`,
  );
};
