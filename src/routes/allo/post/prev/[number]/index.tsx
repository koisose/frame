import { type RequestHandler } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
import { graphql } from "~/utils/allo-graphql";
import { encodeToHex } from '~/utils/encode';
import {screenshotURI} from '~/utils/screenshot'
export const onPost: RequestHandler = async ({ html, url, params }) => {
    const state = Number(params.number);  
  const pa = await graphql(state)
  const meta = metadata({
    title: "farcaster",
    description: "frame",
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(`${url.origin}/allo/get/newest/${state}`)}`,
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameAspectRatio: "1:1",
    button: [
      // @ts-ignore
      state > 0 ? { buttonNumber: "1", text: "previous", action: "post", target: `https://${url.host}/allo/post/prev/${state-1}` } : null,
      // @ts-ignore
      state != 100 ? { buttonNumber: state > 0 && state != 100 ? "2" : "1", text: "next", action: "post", target: `https://${url.host}/allo/post/next/${state+1}` } : null,
      { buttonNumber: state > 0 && state != 100 ? "3" : "2", text: "link", action: "link", target: `https://explorer.gitcoin.co/#/round/${pa.chainId}/${pa.id}` },
      { buttonNumber: state > 0 && state != 100 ? "4" : "3", text: "home", action: "post", target: `https://${url.host}/allo/post/home` },

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
