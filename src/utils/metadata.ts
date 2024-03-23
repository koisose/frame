
type ContentString = string;
export type ImageMIMEType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp";
type GeneralProperties = {
  property:
    | "og:title"
    | "og:type"
    | "og:description"
    | "og:image"
    | "og:image:type"
    | "og:image:width"
    | "og:image:height";
  content: ContentString;
};

type TwitterSpecificProperties =
  | {
      name:
        | "twitter:card"
        | "twitter:site"
        | "twitter:creator"
        | "twitter:title"
        | "twitter:description";
      content: ContentString;
    }
  | {
      property: "twitter:image";
      content: ContentString;
    };

type SearchEngineBots = {
  name:
    | "googlebot"
    | "bingbot"
    | "slurp"
    | "duckduckbot"
    | "baiduspider"
    | "yandexbot"
    | "naver"
    | "facebookexternalhit"
    | "twitterbot";
  content: "index, follow";
};
type Undefined = {
  name: "undefined";
  content: ContentString;
};
type ButtonNumber = "1" | "2" | "3" | "4";
type OpenFrameAccept = "xmtp" | "lens" | "farcaster";
type OpenFrameField =
  | "of:version"
  | "of:state"
  | "of:image"
  | "of:post_url"
  | "of:input:text"
  | `of:button:${ButtonNumber}`;
type OpenFrameProperties =
  | {
      name: OpenFrameField;
      content: ContentString;
    }
  | {
      name: `of:accepts:${OpenFrameAccept}`;
      content: ContentString;
    }
  | {
      name: "of:image:aspect_ratio";
      content: "1.91:1" | "1:1";
    }
  | {
      name: `of:button:${ButtonNumber}:action`;
      content: "post" | "post_redirect" | "mint" | "link" | ContentString;
    }
  | {
      name: `of:button:${ButtonNumber}:target`;
      content: ContentString;
    };
type FrameField =
  | "fc:frame:state"
  | "fc:frame:image"
  | "fc:frame:post_url"
  | "fc:frame:input:text"
  | `fc:frame:button:${ButtonNumber}`;
type FarcasterProperties =
  | {
      name: FrameField;
      content: ContentString;
    }
  | {
      name: "fc:frame";
      content: "vNext";
    }
  | {
      name: "fc:frame:image:aspect_ratio";
      content: "1.91:1" | "1:1";
    }
  | {
      name: `fc:frame:button:${ButtonNumber}:action`;
      content: "post" | "post_redirect" | "mint" | "link" | ContentString;
    }
  | {
      name: `fc:frame:button:${ButtonNumber}:target`;
      content: ContentString;
    };
type AllTypes =
  | GeneralProperties
  | TwitterSpecificProperties
  | SearchEngineBots
  | FarcasterProperties
  | OpenFrameProperties
  | Undefined;

type JsonDataType = {
  title?:string;
  meta: ReadonlyArray<AllTypes>;
};
type TwitterSiteContentType = "@koisoselol" | "";
export type FrameButton = {
  action?: "post" | "post_redirect" | "mint" | "link" | ContentString;
  text?: string;
  target?: string;
  buttonNumber: ButtonNumber;
};

type inputMetadata = {
  title: string;
  description: string;
  ogImage: string;
  twitterSite: TwitterSiteContentType;
  ogImageType: ImageMIMEType;
  framePostUrl?: string;
  frameInputText?: string;
  frameAspectRatio?: string;
  frameState?: string;
  button?: FrameButton[];
};

function convertToFrameButton({
  action,
  text,
  target,
  buttonNumber,
}: FrameButton) {
  return [
    {
      name: text ? `fc:frame:button:${buttonNumber}` : "undefined",
      content: text,
    },
    {
      name: action ? `fc:frame:button:${buttonNumber}:action` : "undefined",
      content: action,
    },
    {
      name: target ? `fc:frame:button:${buttonNumber}:target` : "undefined",
      content: target,
    },
    {
      property: text ? `of:button:${buttonNumber}` : "undefined",
      content: text,
    },
    {
      property: action ? `of:button:${buttonNumber}:action` : "undefined",
      content: action,
    },
    {
      property: target ? `of:button:${buttonNumber}:target` : "undefined",
      content: target,
    },
  ];
}
export function metadata({
  title,
  description,
  ogImage,
  twitterSite,
  ogImageType,
  framePostUrl = "",
  frameInputText = "",
  button,
  frameAspectRatio = "1.91:1",
  frameState = ""
}: inputMetadata): JsonDataType {
  const [button1, button2, button3, button4] = button ?? [];
  const buttonFrame1 = button1
    ? convertToFrameButton(button1)
    : [
        {
          name: "undefined",
          content: "",
        },
      ];
  const buttonFrame2 = button2
    ? convertToFrameButton(button2)
    : [
        {
          name: "undefined",
          content: "",
        },
      ];
  const buttonFrame3 = button3
    ? convertToFrameButton(button3)
    : [
        {
          name: "undefined",
          content: "",
        },
      ];
  const buttonFrame4 = button4
    ? convertToFrameButton(button4)
    : [
        {
          name: "undefined",
          content: "",
        },
      ];
  return {
   
    title,
        //@ts-ignore
    meta: [
      ...(buttonFrame1 as FarcasterProperties[] | Undefined[]),
      ...(buttonFrame2 as FarcasterProperties[] | Undefined[]),
      ...(buttonFrame3 as FarcasterProperties[] | Undefined[]),
      ...(buttonFrame4 as FarcasterProperties[] | Undefined[]),
      {
        name: "fc:frame",
        content: "vNext",
      },
      {
        name: "fc:frame:state",
        content: frameState,
      },
      {
        name: "fc:frame:image",
        content: ogImage,
      },
      {
        name: "fc:frame:image:aspect_ratio",
        content: frameAspectRatio,
      },
      {
        name: framePostUrl != "" ? "fc:frame:post_url" : "undefined",
        content: framePostUrl,
      },
      {
        name: frameInputText != "" ? "fc:frame:input:text" : "undefined",
        content: frameInputText,
      },
      {
        property: "of:version",
        content: "vNext",
      },
      {
        property: "of:accepts:xmtp",
        content: "2024-02-01",
      },
      {
        property: "of:state",
        content: frameState,
      },
      {
        property: "of:image",
        content: ogImage,
      },
      {
        property: "of:image:aspect_ratio",
        content: frameAspectRatio,
      },
      {
        property: framePostUrl != "" ? "of:post_url" : "undefined",
        content: framePostUrl,
      },
      {
        property: frameInputText != "" ? "of:input:text" : "undefined",
        content: frameInputText,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: ogImage,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: twitterSite,
      },
      {
        name: "twitter:creator",
        content: twitterSite,
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        property: "twitter:image",
        content: ogImage,
      },
      {
        property: "og:image:type",
        content: ogImageType,
      },
      {
        property: "og:image:width",
        content: "512",
      },
      {
        property: "og:image:height",
        content: "512",
      },

      {
        name: "googlebot",
        content: "index, follow",
      },
      {
        name: "bingbot",
        content: "index, follow",
      },
      {
        name: "slurp",
        content: "index, follow",
      },
      {
        name: "duckduckbot",
        content: "index, follow",
      },
      {
        name: "baiduspider",
        content: "index, follow",
      },
      {
        name: "yandexbot",
        content: "index, follow",
      },
      {
        name: "naver",
        content: "index, follow",
      },
      {
        name: "facebookexternalhit",
        content: "index, follow",
      },
      {
        name: "twitterbot",
        content: "index, follow",
      },
    ],
  };
}
