import { type RequestHandler } from "@builder.io/qwik-city";
import { metadata } from "~/utils/metadata";
import { graphql } from "~/utils/allo-graphql";
import { encodeToHex } from '~/utils/encode';
import { getFrameMessage } from "frames.js"
// @ts-ignore
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp"; 
import {screenshotURI} from '~/utils/screenshot'
export const onPost: RequestHandler = async ({  html, url,parseBody }) => {
     const co=await parseBody();
     let parsedMessage={} as any;
     if(isXmtpFrameActionPayload((co as any))){
      parsedMessage = await getXmtpFrameMessage((co as any));
     }else{
      parsedMessage = await getFrameMessage((co as any));
     }
     
    const state=Number(JSON.parse(decodeURIComponent(parsedMessage.state)).state);
    const pa=await graphql(state)

  const meta = metadata({
    title: "farcaster",
    description: "frame",
    ogImage: `${screenshotURI}/${Math.random()}/${encodeToHex(`${url.origin}/allo/get/newest/${state-1}`)}`,
    frameState:encodeURIComponent(JSON.stringify({state:state-1})),
    twitterSite: "@koisoselol",
    ogImageType: "image/png",
    frameAspectRatio:"1:1",
    button: [
      // @ts-ignore
      (state-1)>0?{ buttonNumber: "1", text: "previous",action:"post",target:`https://${url.host}/allo/post/prev` }:null,
      // @ts-ignore
      (state-1)!=100?{ buttonNumber: (state-1)>0?"2":"1", text: "next",action:"post",target:`https://${url.host}/allo/post/next` }:null,
    { buttonNumber: (state-1)>0?"3":"2", text: "link",action:"link",target:`https://explorer.gitcoin.co/#/round/${pa.chainId}/${pa.id}` },
    { buttonNumber: (state-1)>0?"4":"3", text: "home",action:"post",target:`https://${url.host}/allo/post/home` },
    
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
