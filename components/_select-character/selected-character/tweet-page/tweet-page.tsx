import { useGetContentQuery } from "@/domain/content/content.queries";

const sampleTweetContent = {
  contentType: "news",
  createdAt: 1761017621884,
  id: "03a02150-d8c5-5f0a-9479-4ff68592fb6a",
  input: "你好深圳",
  lang: "zh",
  processingStatus: "SAVED_INITIAL_DATA",
  progress: 1,
  status: "TRANSLATED",
  tweet: {
    inReplyToUserId: "",
    twitterUrl: "https://twitter.com/yuxiyou/status/1675507655618727936",
    likeCount: 297,
    source: "",
    type: "tweet",
    isLimitedReply: false,
    createdAt: "Sun Jul 02 14:12:09 +0000 2023",
    quoteCount: 0,
    id: "1675507655618727936",
    text: "你好深圳 https://t.co/wiJRSWdVip",
    viewCount: 64838,
    place: {},
    lang: "ja",
    quoted_tweet: null,
    inReplyToUsername: "",
    extendedEntities: {
      media: [
        {
          display_url: "pic.twitter.com/wiJRSWdVip",
          media_results: {
            result: {
              media_key: "3_1675507648953999362",
              __typename: "ApiMedia",
              id: "QXBpTWVkaWE6DAABCgABF0CZVFpaYAIKAAIXQJlV55oQAAAA",
            },
            id: "QXBpTWVkaWFSZXN1bHRzOgwAAQoAARdAmVRaWmACCgACF0CZVeeaEAAAAA==",
          },
          type: "photo",
          ext_media_availability: {
            status: "Available",
          },
          url: "https://t.co/wiJRSWdVip",
          original_info: {
            width: 1536,
            focus_rects: [
              {
                h: 860,
                x: 0,
                y: 1188,
                w: 1536,
              },
              {
                h: 1536,
                x: 0,
                y: 512,
                w: 1536,
              },
              {
                h: 1751,
                x: 0,
                y: 297,
                w: 1536,
              },
              {
                h: 2048,
                x: 256,
                y: 0,
                w: 1024,
              },
              {
                h: 2048,
                x: 0,
                y: 0,
                w: 1536,
              },
            ],
            height: 2048,
          },
          features: {
            large: {
              faces: [
                {
                  h: 258,
                  x: 90,
                  y: 824,
                  w: 258,
                },
              ],
            },
            orig: {
              faces: [
                {
                  h: 258,
                  x: 90,
                  y: 824,
                  w: 258,
                },
              ],
            },
          },
          indices: [5, 28],
          sizes: {
            large: {
              h: 2048,
              w: 1536,
            },
          },
          id_str: "1675507648953999362",
          expanded_url:
            "https://twitter.com/yuxiyou/status/1675507655618727936/photo/1",
          media_url_https: "https://pbs.twimg.com/media/F0CZVFpaYAIxCR2.jpg",
          media_key: "3_1675507648953999362",
        },
      ],
    },
    isPinned: false,
    isQuote: false,
    conversationId: "1675507655618727936",
    author: {
      coverPicture:
        "https://pbs.twimg.com/profile_banners/427612058/1652336566",
      isVerified: false,
      twitterUrl: "https://twitter.com/yuxiyou",
      description:
        "@youyuxi 的中文小号。@voidzerodev 创始人，开源软件开发者，Vue / Vite 作者。此号只聊技术无关的闲话（偶尔破戒警告",
      affiliatesHighlightedLabel: {},
      type: "user",
      fastFollowersCount: 0,
      canMediaTag: true,
      createdAt: "Sat Dec 03 19:03:55 +0000 2011",
      mediaCount: 166,
      canDm: false,
      isAutomated: false,
      id: "427612058",
      automatedBy: null,
      statusesCount: 1626,
      pinnedTweetIds: [],
      verifiedType: null,
      favouritesCount: 0,
      hasCustomTimelines: true,
      isBlueVerified: false,
      userName: "yuxiyou",
      isTranslator: false,
      url: "https://x.com/yuxiyou",
      profile_bio: {
        description:
          "@youyuxi 的中文小号。@voidzerodev 创始人，开源软件开发者，Vue / Vite 作者。此号只聊技术无关的闲话（偶尔破戒警告",
        entities: {
          description: {
            user_mentions: [
              {
                name: "",
                indices: [0, 8],
                screen_name: "youyuxi",
                id_str: "0",
              },
              {
                name: "",
                indices: [15, 27],
                screen_name: "voidzerodev",
                id_str: "0",
              },
            ],
          },
          url: {
            urls: [
              {
                expanded_url: "https://evanyou.me",
                display_url: "evanyou.me",
                indices: [0, 23],
                url: "https://t.co/WpxhppiuwL",
              },
            ],
          },
        },
        withheld_in_countries: [],
      },
      profilePicture:
        "https://pbs.twimg.com/profile_images/1904818433897984000/0K6AhwWU_normal.jpg",
      followers: 111237,
      possiblySensitive: false,
      entities: {
        description: {
          user_mentions: [
            {
              name: "",
              indices: [0, 8],
              screen_name: "youyuxi",
              id_str: "0",
            },
            {
              name: "",
              indices: [15, 27],
              screen_name: "voidzerodev",
              id_str: "0",
            },
          ],
        },
        url: {
          urls: [
            {
              expanded_url: "https://evanyou.me",
              display_url: "evanyou.me",
              indices: [0, 23],
              url: "https://t.co/WpxhppiuwL",
            },
          ],
        },
      },
      following: 250,
      name: "尤雨溪",
      location: "Singapore",
      withheldInCountries: [],
      status: "",
    },
    url: "https://x.com/yuxiyou/status/1675507655618727936",
    inReplyToId: "",
    replyCount: 29,
    retweeted_tweet: null,
    entities: {},
    bookmarkCount: 4,
    displayTextRange: [0, 4],
    isConversationControlled: false,
    retweetCount: 1,
    isReply: false,
    card: {},
    isRetweet: false,
  },
  type: "tweet",
  userId: "learnuidev@gmail.com",
  websiteUrl: "https://x.com/yuxiyou/status/1675507655618727936",
  generatedAudioId: "01K82D932Y5HXD96CF52BPSP0E",
  mediaTranscriptionsId: "01K82D8VAHK155JDG9HTPWTFKT",
  translationsAddedAt: 1761017630352,
  updatedAt: 1761017630352,
  audio:
    "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3-accelerate.amazonaws.com/01K82D92DWVRQB9DCGDFB8EHHR.mp3?AWSAccessKeyId=ASIA3EL4T6TB5GR7YPRX&Expires=1761104039&Signature=uXi9wLF5k3DJESRDRvVZPhj8PO0%3D&X-Amzn-Trace-Id=Root%3D1-68f6ff27-69c458ae6262756b75b6b93e%3BParent%3D418186888e2dd853%3BSampled%3D0&x-amz-security-token=IQoJb3JpZ2luX2VjEFQaCXVzLWVhc3QtMSJIMEYCIQCy%2BhXt1WfYVTEmwCCk3ohurxqt0xCTMHs08wc%2BCDen6gIhAKI0YQa09XnvMoN3fprQOewk8deeiMVEneJSKykCtpnLKpwDCP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNzY1MzAyNDA0MjkxIgwk20xrHFjLwTes4%2B0q8AKlbiJtnKWSptq%2BSFXOX%2BMB%2BbW3qaYKrxr7J%2FHxBPoRmiEqpc%2By9MnqitYj7%2BFPYg6DqwQCr3fbt1al6asXTY709YurMIwwLjvT1u7ElAqvyA1vvF6YResNUPUNe9LEdBDrTZp7Wuv89dLblzFK7sjCAXgRHGRPaLtKuS8IYbXGHm2MilPQC9l8bJvTlkhvpKeggGymtNZ%2F%2FogLxr%2Brp3ZYTPoy%2BKQBrOfbuz7btSEQehHyWPu6jGB%2Bu92kQi9sJ0rvGTaxXVRy063XoIcuzKKwZYPIlUhBghwN%2Bc%2FwpPtno6NX4pwQ6rOCoRZgIERFxrJEhq72z%2FdgD7EQzBlDE%2FdqBBXnPSyQSdBochJF3YBQOKiQZGmT2HhufIbH%2BMsMIP2fXVVY4DLe%2BEX4YGSXOZbk87JGZPViMaixGEfc7pnGchL8TosJ85s7QLLHlrgFHxsg%2B%2BFqcz37HiBDvyNFDtni1bFuC%2Frr2qUwfWOlM428JDCX%2FtvHBjqcASMNRsslZ4gkCsjzpZ9aNcCdgwTMS8bwY0q79Ko5eKMSp%2FNyZ7dppW%2B%2Fad3k7gnvZn6qas8KsoUQcTJdzuqFIQkq6LCxcr8rHkuptsAn%2FGOMz6M%2FH9ZpfBixQdvc1I9Yt7yDl0r0KOMKoo7oWvNdDQW324aZ%2FHHRZ7cy%2BP%2F68LKzNdSeBhDU7Bnx5dWI8yLEfcH4ywSHCyXUV6JsjQ%3D%3D",
  transcriptions: [
    {
      lang: "zh",
      input: "你好深圳",
      words: [
        {
          input: "你",
          lang: "zh",
          start: 0.25,
          end: 0.49,
          startIndex: 0,
          endIndex: 1,
          phoneme: "ni2",
        },
        {
          input: "好",
          lang: "zh",
          start: 0.49,
          end: 0.74,
          startIndex: 1,
          endIndex: 2,
          phoneme: "hao3",
        },
        {
          input: "深",
          lang: "zh",
          start: 0.74,
          end: 0.94,
          startIndex: 2,
          endIndex: 3,
          phoneme: "shen1",
        },
        {
          input: "圳",
          lang: "zh",
          start: 0.94,
          end: 1.14,
          startIndex: 3,
          endIndex: 4,
          phoneme: "zhen4",
        },
        {
          input: "",
          lang: "zh",
          start: 1.14,
          end: 1.36,
          startIndex: 4,
          endIndex: 5,
          phoneme: "SIL",
        },
      ],
      start: 0.25,
      end: 1.36,
      updatedAt: 1761017635846,
      hanzi: "你好深圳",
      en: "Hello Shenzhen",
      pinyin: "nǐ hǎo shēn zhèn",
      source: "deepseek",
      model: "deepseek-chat",
      chinglish: "Hello Shenzhen",
      id: "daa44d89-27c1-5287-8e60-72631b2549a4",
    },
  ],
};

export function TweetPage({ contentId }: { contentId: string }) {
  const { data } = useGetContentQuery({ contentId });

  const tweet = data?.tweet;

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-2xl mb-4">{data?.input} </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tweet?.extendedEntities?.media?.map((mediaItem: any) => {
          if (mediaItem.type === "photo") {
            return (
              <img
                key={JSON.stringify(mediaItem)}
                src={mediaItem?.media_url_https}
                alt="Tweet media"
                className="w-full h-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 object-cover"
              />
            );
          }
        })}
      </div>
    </div>
  );
}
