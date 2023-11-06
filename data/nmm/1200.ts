import { hmmify } from "../hmm/data/v1000";
import * as R from "ramda";

// 3050
export const chars = [
  {
      "hanzi": "一",
      "count": 2812,
      "pinyin": "yī",
      "level": 1,
      "tone_level": 1,
      "en": "one"
  },
  {
      "hanzi": "二",
      "count": 95,
      "pinyin": "èr",
      "level": 2,
      "tone_level": 4,
      "en": "two"
  },
  {
      "hanzi": "三",
      "count": 181,
      "pinyin": "sān",
      "level": 3,
      "tone_level": 1,
      "en": "three"
  },
  {
      "hanzi": "十",
      "count": 291,
      "pinyin": "shí",
      "level": 4,
      "tone_level": 2,
      "en": "ten"
  },
  {
      "hanzi": "干",
      "count": 98,
      "pinyin": "gān",
      "variants": [
          "gàn",
          "gān"
      ],
      "level": 5,
      "tone_level": 1,
      "en": "dry"
  },
  {
      "hanzi": "半",
      "count": 72,
      "pinyin": "bàn",
      "level": 6,
      "tone_level": 4,
      "en": "half"
  },
  {
      "hanzi": "人",
      "count": 1671,
      "pinyin": "rén",
      "level": 7,
      "tone_level": 2,
      "en": "person"
  },
  {
      "hanzi": "从",
      "count": 229,
      "pinyin": "cóng",
      "level": 8,
      "tone_level": 2,
      "en": "from"
  },
  {
      "hanzi": "个",
      "count": 1820,
      "pinyin": "gè",
      "level": 9,
      "tone_level": 4,
      "en": "individual"
  },
  {
      "hanzi": "入",
      "count": 106,
      "pinyin": "rù",
      "level": 10,
      "tone_level": 4,
      "en": "enter"
  },
  {
      "hanzi": "什",
      "count": 390,
      "pinyin": "shén",
      "level": 11,
      "tone_level": 2,
      "en": "what"
  },
  {
      "hanzi": "午",
      "count": 96,
      "pinyin": "wǔ",
      "level": 12,
      "tone_level": 3,
      "en": "noon"
  },
  {
      "hanzi": "年",
      "count": 564,
      "pinyin": "nián",
      "level": 13,
      "tone_level": 2,
      "en": "year"
  },
  {
      "hanzi": "口",
      "count": 159,
      "pinyin": "kǒu",
      "level": 14,
      "tone_level": 3,
      "en": "mouth"
  },
  {
      "hanzi": "中",
      "count": 663,
      "pinyin": "zhōng",
      "level": 15,
      "tone_level": 1,
      "en": "middle"
  },
  {
      "hanzi": "叫",
      "count": 88,
      "pinyin": "jiào",
      "level": 16,
      "tone_level": 4,
      "en": "call"
  },
  {
      "hanzi": "八",
      "count": 40,
      "pinyin": "bā",
      "level": 17,
      "tone_level": 1,
      "en": "eight"
  },
  {
      "hanzi": "只",
      "count": 332,
      "pinyin": "zhī",
      "level": 18,
      "tone_level": 1,
      "en": "only"
  },
  {
      "hanzi": "介",
      "count": 31,
      "pinyin": "jiè",
      "level": 19,
      "tone_level": 4,
      "en": "introduce"
  },
  {
      "hanzi": "儿",
      "count": 476,
      "pinyin": "ér",
      "level": 20,
      "tone_level": 2,
      "en": "son"
  },
  {
      "hanzi": "四",
      "count": 85,
      "pinyin": "sì",
      "level": 21,
      "tone_level": 4,
      "en": "four"
  },
  {
      "hanzi": "兄",
      "count": 15,
      "pinyin": "xiōng",
      "level": 22,
      "tone_level": 1,
      "en": "elder brother"
  },
  {
      "hanzi": "兑",
      "count": 4,
      "pinyin": "duì",
      "en": "exchange",
      "level": 23,
      "tone_level": 4
  },
  {
      "hanzi": "说",
      "count": 616,
      "pinyin": "shuō",
      "en": "speak",
      "level": 24,
      "tone_level": 1
  },
  {
      "hanzi": "计",
      "count": 101,
      "pinyin": "jì",
      "en": "plan",
      "level": 25,
      "tone_level": 4
  },
  {
      "hanzi": "认",
      "count": 194,
      "pinyin": "rèn",
      "en": "recognize",
      "level": 26,
      "tone_level": 4
  },
  {
      "hanzi": "识",
      "count": 88,
      "pinyin": "shí",
      "en": "know",
      "level": 27,
      "tone_level": 2
  },
  {
      "hanzi": "马",
      "count": 137,
      "pinyin": "mǎ",
      "en": "horse",
      "level": 28,
      "tone_level": 3
  },
  {
      "hanzi": "吗",
      "count": 430,
      "pinyin": "ma",
      "en": "question marker",
      "level": 29,
      "tone_level": 5
  },
  {
      "hanzi": "骂",
      "count": 16,
      "pinyin": "mà",
      "en": "scold",
      "level": 30,
      "tone_level": 4
  },
  {
      "hanzi": "乙",
      "count": 2,
      "pinyin": "yǐ",
      "en": "second",
      "level": 31,
      "tone_level": 3
  },
  {
      "hanzi": "乞",
      "count": 2,
      "en": "beg",
      "pinyin": "qǐ",
      "level": 32,
      "tone_level": 3
  },
  {
      "hanzi": "吃",
      "count": 532,
      "pinyin": "chī",
      "en": "eat",
      "level": 33,
      "tone_level": 1
  },
  {
      "hanzi": "气",
      "count": 212,
      "pinyin": "qì",
      "en": "anger",
      "level": 34,
      "tone_level": 4
  },
  {
      "hanzi": "飞",
      "count": 105,
      "pinyin": "fēi",
      "en": "fly",
      "level": 35,
      "tone_level": 1
  },
  {
      "hanzi": "况",
      "count": 46,
      "pinyin": "kuàng",
      "en": "condition",
      "level": 36,
      "tone_level": 4
  },
  {
      "hanzi": "日",
      "count": 150,
      "pinyin": "rì",
      "en": "day",
      "level": 37,
      "tone_level": 4
  },
  {
      "hanzi": "旧",
      "count": 24,
      "pinyin": "jiù",
      "en": "old",
      "level": 38,
      "tone_level": 4
  },
  {
      "hanzi": "旦",
      "count": 8,
      "pinyin": "dàn",
      "en": "dawn",
      "level": 39,
      "tone_level": 4
  },
  {
      "hanzi": "但",
      "count": 245,
      "pinyin": "dàn",
      "en": "but",
      "level": 40,
      "tone_level": 4
  },
  {
      "hanzi": "早",
      "count": 183,
      "pinyin": "zǎo",
      "en": "early",
      "level": 41,
      "tone_level": 3
  },
  {
      "hanzi": "唱",
      "count": 60,
      "pinyin": "chàng",
      "en": "sing",
      "level": 42,
      "tone_level": 4
  },
  {
      "hanzi": "电",
      "count": 291,
      "pinyin": "diàn",
      "en": "electric",
      "level": 43,
      "tone_level": 4
  },
  {
      "hanzi": "七",
      "count": 38,
      "pinyin": "qī",
      "en": "seven",
      "level": 44,
      "tone_level": 1
  },
  {
      "hanzi": "化",
      "count": 85,
      "pinyin": "huà",
      "en": "transform",
      "level": 45,
      "tone_level": 4
  },
  {
      "hanzi": "白",
      "count": 109,
      "pinyin": "bái",
      "en": "white",
      "level": 46,
      "tone_level": 2
  },
  {
      "hanzi": "百",
      "count": 73,
      "pinyin": "bǎi",
      "en": "hundred",
      "level": 47,
      "tone_level": 3
  },
  {
      "hanzi": "今",
      "count": 450,
      "pinyin": "jīn",
      "en": "now",
      "level": 48,
      "tone_level": 1
  },
  {
      "hanzi": "千",
      "count": 61,
      "pinyin": "qiān",
      "en": "thousand",
      "level": 49,
      "tone_level": 1
  },
  {
      "hanzi": "舌",
      "count": 7,
      "pinyin": "shé",
      "en": "tongue",
      "level": 50,
      "tone_level": 2
  },
  {
      "hanzi": "话",
      "count": 332,
      "pinyin": "huà",
      "en": "speech",
      "level": 51,
      "tone_level": 4
  },
  {
      "hanzi": "活",
      "count": 162,
      "pinyin": "huó",
      "en": "alive",
      "level": 52,
      "tone_level": 2
  },
  {
      "hanzi": "乱",
      "count": 23,
      "pinyin": "luàn",
      "en": "chaos",
      "level": 53,
      "tone_level": 4
  },
  {
      "hanzi": "汽",
      "count": 33,
      "pinyin": "qì",
      "en": "steam",
      "level": 54,
      "tone_level": 4
  },
  {
      "hanzi": "月",
      "count": 154,
      "level": 55,
      "pinyin": "yuè",
      "tone_level": 4,
      "en": "moon"
  },
  {
      "hanzi": "用",
      "count": 266,
      "level": 56,
      "pinyin": "yòng",
      "tone_level": 4,
      "en": "use"
  },
  {
      "hanzi": "胖",
      "count": 21,
      "level": 57,
      "pinyin": "pàng",
      "tone_level": 4,
      "en": "fat"
  },
  {
      "hanzi": "朋",
      "count": 184,
      "level": 58,
      "pinyin": "péng",
      "tone_level": 2,
      "en": "friend"
  },
  {
      "hanzi": "明",
      "count": 246,
      "level": 59,
      "pinyin": "míng",
      "tone_level": 2,
      "en": "bright"
  },
  {
      "hanzi": "习",
      "count": 169,
      "level": 60,
      "pinyin": "xí",
      "tone_level": 2,
      "en": "practice"
  },
  {
      "hanzi": "句",
      "count": 39,
      "level": 61,
      "pinyin": "jù",
      "tone_level": 4,
      "en": "sentence"
  },
  {
      "hanzi": "勺",
      "count": 11,
      "level": 62,
      "pinyin": "sháo",
      "tone_level": 2,
      "en": "spoon"
  },
  {
      "hanzi": "的",
      "count": 4253,
      "level": 63,
      "pinyin": "de",
      "tone_level": 5,
      "en": "of"
  },
  {
      "hanzi": "了",
      "count": 2552,
      "level": 64,
      "pinyin": "le",
      "tone_level": 5,
      "en": "completed action marker"
  },
  {
      "hanzi": "子",
      "count": 725,
      "level": 65,
      "pinyin": "zǐ",
      "tone_level": 3,
      "en": "child"
  },
  {
      "hanzi": "寸",
      "count": 6,
      "level": 66,
      "pinyin": "cùn",
      "tone_level": 4,
      "en": "inch"
  },
  {
      "hanzi": "时",
      "count": 530,
      "level": 67,
      "pinyin": "shí",
      "tone_level": 2,
      "en": "time"
  },
  {
      "hanzi": "过",
      "count": 383,
      "level": 68,
      "pinyin": "guò",
      "tone_level": 4,
      "en": "pass"
  },
  {
      "hanzi": "付",
      "count": 21,
      "level": 69,
      "pinyin": "fù",
      "tone_level": 4,
      "en": "pay"
  },
  {
      "hanzi": "讨",
      "count": 25,
      "level": 70,
      "pinyin": "tǎo",
      "tone_level": 3,
      "en": "ask for"
  },
  {
      "hanzi": "才",
      "count": 174,
      "level": 71,
      "pinyin": "cái",
      "tone_level": 2,
      "en": "talent"
  },
  {
      "hanzi": "牙",
      "count": 10,
      "level": 72,
      "pinyin": "yá",
      "tone_level": 2,
      "en": "tooth"
  },
  {
      "hanzi": "卜",
      "count": 0,
      "level": 73,
      "pinyin": "bǔ",
      "tone_level": 3,
      "en": "divination"
  },
  {
      "hanzi": "上",
      "count": 872,
      "level": 74,
      "pinyin": "shàng",
      "tone_level": 4,
      "en": "above"
  },
  {
      "hanzi": "下",
      "count": 547,
      "level": 75,
      "pinyin": "xià",
      "tone_level": 4,
      "en": "below"
  },
  {
      "hanzi": "卡",
      "count": 13,
      "level": 76,
      "pinyin": "kǎ",
      "tone_level": 3,
      "en": "card"
  },
  {
      "hanzi": "吓",
      "count": 24,
      "level": 77,
      "pinyin": "xià",
      "tone_level": 4,
      "en": "scare"
  },
  {
      "hanzi": "占",
      "count": 6,
      "level": 78,
      "pinyin": "zhàn",
      "tone_level": 4,
      "en": "occupy"
  },
  {
      "hanzi": "点",
      "count": 366,
      "level": 79,
      "pinyin": "diǎn",
      "tone_level": 3,
      "en": "dot"
  },
  {
      "hanzi": "让",
      "count": 168,
      "level": 80,
      "pinyin": "ràng",
      "tone_level": 4,
      "en": "allow"
  },
  {
      "hanzi": "止",
      "count": 14,
      "level": 81,
      "pinyin": "zhǐ",
      "tone_level": 3,
      "en": "stop"
  },
  {
      "hanzi": "正",
      "count": 109,
      "level": 82,
      "pinyin": "zhèng",
      "tone_level": 4,
      "en": "correct"
  },
  {
      "hanzi": "是",
      "count": 1749,
      "level": 83,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "to be"
  },
  {
      "hanzi": "目",
      "count": 61,
      "level": 84,
      "pinyin": "mù",
      "tone_level": 4,
      "en": "eye"
  },
  {
      "hanzi": "自",
      "count": 326,
      "level": 85,
      "pinyin": "zì",
      "tone_level": 4,
      "en": "self"
  },
  {
      "hanzi": "面",
      "count": 328,
      "level": 86,
      "pinyin": "miàn",
      "tone_level": 4,
      "en": "face"
  },
  {
      "hanzi": "身",
      "count": 121,
      "level": 87,
      "pinyin": "shēn",
      "tone_level": 1,
      "en": "body"
  },
  {
      "hanzi": "谢",
      "count": 25,
      "level": 88,
      "pinyin": "xiè",
      "tone_level": 4,
      "en": "thank"
  },
  {
      "hanzi": "弋",
      "count": 0,
      "level": 89,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "shoot"
  },
  {
      "hanzi": "代",
      "count": 55,
      "level": 90,
      "pinyin": "dài",
      "tone_level": 4,
      "en": "generation"
  },
  {
      "hanzi": "戈",
      "count": 0,
      "level": 91,
      "pinyin": "gē",
      "tone_level": 1,
      "en": "spear"
  },
  {
      "hanzi": "手",
      "count": 217,
      "level": 92,
      "pinyin": "shǒu",
      "tone_level": 3,
      "en": "hand"
  },
  {
      "hanzi": "我",
      "count": 2596,
      "level": 93,
      "pinyin": "wǒ",
      "tone_level": 3,
      "en": "I"
  },
  {
      "hanzi": "或",
      "count": 20,
      "level": 94,
      "pinyin": "huò",
      "tone_level": 4,
      "en": "or"
  },
  {
      "hanzi": "看",
      "count": 461,
      "level": 95,
      "pinyin": "kàn",
      "tone_level": 4,
      "en": "look"
  },
  {
      "hanzi": "担",
      "count": 44,
      "level": 96,
      "pinyin": "dān",
      "tone_level": 1,
      "en": "carry"
  },
  {
      "hanzi": "拍",
      "count": 39,
      "level": 97,
      "pinyin": "pāi",
      "tone_level": 1,
      "en": "pat"
  },
  {
      "hanzi": "提",
      "count": 64,
      "level": 98,
      "pinyin": "tí",
      "tone_level": 2,
      "en": "lift"
  },
  {
      "hanzi": "找",
      "count": 103,
      "level": 99,
      "pinyin": "zhǎo",
      "tone_level": 3,
      "en": "find"
  },
  {
      "hanzi": "木",
      "count": 19,
      "level": 100,
      "pinyin": "mù",
      "tone_level": 4,
      "en": "wood"
  },
  {
      "hanzi": "本",
      "count": 144,
      "level": 101,
      "pinyin": "běn",
      "tone_level": 3,
      "en": "origin"
  },
  {
      "hanzi": "体",
      "count": 113,
      "level": 102,
      "pinyin": "tǐ",
      "tone_level": 3,
      "en": "body"
  },
  {
      "hanzi": "末",
      "count": 23,
      "level": 103,
      "pinyin": "mò",
      "tone_level": 4,
      "en": "end"
  },
  {
      "hanzi": "米",
      "count": 47,
      "level": 104,
      "pinyin": "mǐ",
      "tone_level": 3,
      "en": "rice"
  },
  {
      "hanzi": "来",
      "count": 899,
      "level": 105,
      "pinyin": "lái",
      "tone_level": 2,
      "en": "come"
  },
  {
      "hanzi": "呆",
      "count": 8,
      "level": 106,
      "pinyin": "dāi",
      "tone_level": 1,
      "en": "stupid",
      "examples": [
          {
              "en": "He looks stupid.",
              "hanzi": "他看起来很呆。",
              "pinyin": "tā kàn qǐ lái hěn dāi."
          },
          {
              "en": "She has a silly expression.",
              "hanzi": "她的表情很呆。",
              "pinyin": "tā de biǎo qíng hěn dāi."
          },
          {
              "en": "The child has a vacant stare.",
              "hanzi": "这个孩子呆呆地盯着。",
              "pinyin": "zhè ge hái zi dāi dāi de dīng zhe."
          },
          {
              "en": "He stood there blankly.",
              "hanzi": "他愣在那儿。",
              "pinyin": "tā lèng zài nà er."
          },
          {
              "en": "I forgot what I was going to say.",
              "hanzi": "我忘了要说什么了。",
              "pinyin": "wǒ wàng le yào shuō shén me le."
          }
      ]
  },
  {
      "hanzi": "休",
      "count": 53,
      "level": 107,
      "pinyin": "xiū",
      "tone_level": 1,
      "en": "rest",
      "examples": [
          {
              "en": "I need to rest.",
              "hanzi": "我需要休息。",
              "pinyin": "wǒ xū yào xiū xī."
          },
          {
              "en": "He took a break from work.",
              "hanzi": "他从工作中休息了一下。",
              "pinyin": "tā cóng gōng zuò zhōng xiū xī le yī xià."
          },
          {
              "en": "Let's take a rest before continuing.",
              "hanzi": "我们先休息一下再继续。",
              "pinyin": "wǒ men xiān xiū xī yī xià zài jì xù."
          },
          {
              "en": "After a long hike, we rested by the river.",
              "hanzi": "爬山后，我们在河边休息了一下。",
              "pinyin": "pá shān hòu, wǒ men zài hé biān xiū xī le yī xià."
          },
          {
              "en": "She is taking a break from her studies.",
              "hanzi": "她暂时停止了学习。",
              "pinyin": "tā zàn shí tíng zhǐ le xué xí."
          }
      ]
  },
  {
      "hanzi": "桌",
      "count": 68,
      "level": 108,
      "pinyin": "zhuō",
      "tone_level": 1,
      "en": "table",
      "examples": [
          {
              "en": "There is a vase on the table.",
              "hanzi": "桌子上有一个花瓶。",
              "pinyin": "zhuō zi shàng yǒu yī gè huā píng."
          },
          {
              "en": "The table is made of wood.",
              "hanzi": "这张桌子是木头做的。",
              "pinyin": "zhè zhāng zhuō zi shì mù tou zuò de."
          },
          {
              "en": "Please set the table for dinner.",
              "hanzi": "请为晚餐准备餐桌。",
              "pinyin": "qǐng wèi wǎn cān zhǔn bèi cān zhuō."
          },
          {
              "en": "He sat at the corner of the table.",
              "hanzi": "他坐在桌子的角落。",
              "pinyin": "tā zuò zài zhuō zi de jiǎo luò."
          },
          {
              "en": "The table is too small for all of us.",
              "hanzi": "这张桌子对我们所有人来说太小了。",
              "pinyin": "zhè zhāng zhuō zi duì wǒ men suǒ yǒu rén lái shuō tài xiǎo le."
          }
      ]
  },
  {
      "hanzi": "相",
      "count": 121,
      "level": 109,
      "pinyin": "xiāng",
      "tone_level": 1,
      "en": "mutual",
      "examples": [
          {
              "en": "We have mutual interests.",
              "hanzi": "我们有共同的兴趣。",
              "pinyin": "wǒ men yǒu gòng tóng de xìng qù."
          },
          {
              "en": "They have mutual respect for each other.",
              "hanzi": "他们彼此之间有相互尊重。",
              "pinyin": "tā men bǐ cǐ zhī jiān yǒu xiāng hù zūn zhòng."
          },
          {
              "en": "The two countries signed a mutual agreement.",
              "hanzi": "这两个国家签订了一份相互协议。",
              "pinyin": "zhè liǎng ge guó jiā qiān dìng le yī fèn xiāng hù xié yì."
          },
          {
              "en": "They have a mutual understanding of the situation.",
              "hanzi": "他们对这个情况有相互理解。",
              "pinyin": "tā men duì zhè ge qíng kuàng yǒu xiāng hù lǐ jiě."
          },
          {
              "en": "Mutual cooperation is essential for success.",
              "hanzi": "相互合作对于成功至关重要。",
              "pinyin": "xiāng hù hé zuò duì yú chéng gōng zhì guān zhòng yào."
          }
      ]
  },
  {
      "hanzi": "禾",
      "count": 0,
      "level": 110,
      "pinyin": "hé",
      "tone_level": 2,
      "en": "grain"
  },
  {
      "hanzi": "和",
      "count": 443,
      "level": 111,
      "pinyin": "hé",
      "tone_level": 2,
      "en": "and",
      "examples": [
          {
              "en": "He and I are good friends.",
              "hanzi": "他和我是好朋友。",
              "pinyin": "tā hé wǒ shì hǎo péng yǒu."
          },
          {
              "en": "She likes both tea and coffee.",
              "hanzi": "她喜欢茶和咖啡。",
              "pinyin": "tā xǐ huān chá hé kā fēi."
          },
          {
              "en": "He sings and dances very well.",
              "hanzi": "他唱歌跳舞都很好。",
              "pinyin": "tā chàng gē tiào wǔ dōu hěn hǎo."
          },
          {
              "en": "They are husband and wife.",
              "hanzi": "他们是夫妻。",
              "pinyin": "tā men shì fū qī."
          },
          {
              "en": "The cat and the dog are playing together.",
              "hanzi": "猫和狗在一起玩。",
              "pinyin": "māo hé gǒu zài yī qǐ wán."
          }
      ]
  },
  {
      "hanzi": "种",
      "count": 162,
      "level": 112,
      "pinyin": "zhǒng",
      "tone_level": 3,
      "en": "kind",
      "examples": [
          {
              "en": "He is a kind person.",
              "hanzi": "他是一个善良的人。",
              "pinyin": "tā shì yī gè shàn liáng de rén."
          },
          {
              "en": "There are many kinds of fruits.",
              "hanzi": "有许多种水果。",
              "pinyin": "yǒu xǔ duō zhǒng shuǐ guǒ."
          },
          {
              "en": "She is a kind-hearted girl.",
              "hanzi": "她是一个心地善良的女孩。",
              "pinyin": "tā shì yī gè xīn dì shàn liáng de nǚ hái."
          },
          {
              "en": "He has a kind soul.",
              "hanzi": "他有一颗善良的心。",
              "pinyin": "tā yǒu yī kē shàn liáng de xīn."
          },
          {
              "en": "This is a different kind of flower.",
              "hanzi": "这是一种不同的花。",
              "pinyin": "zhè shì yī zhǒng bù tóng de huā."
          }
      ]
  },
  {
      "hanzi": "香",
      "count": 22,
      "level": 113,
      "pinyin": "xiāng",
      "tone_level": 1,
      "en": "fragrant",
      "examples": [
          {
              "en": "The flowers are very fragrant.",
              "hanzi": "这些花很香。",
              "pinyin": "zhè xiē huā hěn xiāng."
          },
          {
              "en": "The food smells delicious and fragrant.",
              "hanzi": "这食物闻起来又香又美味。",
              "pinyin": "zhè shí wù wén qǐ lái yòu xiāng yòu měi wèi."
          },
          {
              "en": "I bought a fragrant candle for my room.",
              "hanzi": "我给房间买了一支香蜡烛。",
              "pinyin": "wǒ gěi fáng jiān mǎi le yī zhī xiāng là zhú."
          },
          {
              "en": "The air is filled with the fragrant scent of flowers.",
              "hanzi": "空气中弥漫着花的香气。",
              "pinyin": "kōng qì zhōng mí màn zhe huā de xiāng qì."
          },
          {
              "en": "The fragrance of the tea is delightful.",
              "hanzi": "茶的香气很惬意。",
              "pinyin": "chá de xiāng qì hěn qiè yì."
          }
      ]
  },
  {
      "hanzi": "几",
      "count": 224,
      "level": 114,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "several",
      "examples": [
          {
              "en": "I have several books.",
              "hanzi": "我有几本书。",
              "pinyin": "wǒ yǒu jǐ běn shū."
          },
          {
              "en": "There are several people in the room.",
              "hanzi": "房间里有几个人。",
              "pinyin": "fáng jiān lǐ yǒu jǐ gè rén."
          },
          {
              "en": "She asked me several questions.",
              "hanzi": "她问了我几个问题。",
              "pinyin": "tā wèn le wǒ jǐ gè wèn tí."
          },
          {
              "en": "I'll be back in several minutes.",
              "hanzi": "我几分钟就回来。",
              "pinyin": "wǒ jǐ fēn zhōng jiù huí lái."
          },
          {
              "en": "He took several photos of the scenery.",
              "hanzi": "他拍了几张风景照。",
              "pinyin": "tā pāi le jǐ zhāng fēng jǐng zhào."
          }
      ]
  },
  {
      "hanzi": "机",
      "count": 264,
      "level": 115,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "machine",
      "examples": [
          {
              "pinyin": "Zhè shì yī tái jī.",
              "hanzi": "这是一台机。",
              "en": "This is a machine."
          },
          {
              "pinyin": "Wǒ yào mǎi yī tái xīn de jī.",
              "hanzi": "我要买一台新的机。",
              "en": "I want to buy a new machine."
          },
          {
              "pinyin": "Jī hěn hǎo yòng.",
              "hanzi": "机很好用。",
              "en": "The machine is very easy to use."
          },
          {
              "en": "He operates the machine.",
              "hanzi": "他操作这台机器。",
              "pinyin": "tā cāo zuò zhè tái jī qì."
          },
          {
              "en": "The factory has many machines.",
              "hanzi": "这家工厂有许多机器。",
              "pinyin": "zhè jiā gōng chǎng yǒu xǔ duō jī qì."
          },
          {
              "en": "The machine is broken and needs repair.",
              "hanzi": "这台机器坏了，需要修理。",
              "pinyin": "zhè tái jī qì huài le, xū yào xiū lǐ."
          }
      ]
  },
  {
      "hanzi": "心",
      "count": 280,
      "level": 116,
      "pinyin": "xīn",
      "tone_level": 1,
      "en": "heart",
      "examples": [
          {
              "pinyin": "Wǒ de xīn hěn kuài le.",
              "hanzi": "我的心很快乐。",
              "en": "My heart is very happy."
          },
          {
              "pinyin": "Nǐ de xīn zhēn hǎo.",
              "hanzi": "你的心真好。",
              "en": "Your heart is really good."
          },
          {
              "pinyin": "Wǒ xǐ huān chī tián de xīn.",
              "hanzi": "我喜欢吃甜的心。",
              "en": "I like sweet hearts."
          }
      ]
  },
  {
      "hanzi": "想",
      "count": 479,
      "level": 117,
      "pinyin": "xiǎng",
      "tone_level": 3,
      "en": "to want, to think",
      "examples": [
          {
              "pinyin": "Wǒ xiǎng chī zhōngguó cài.",
              "hanzi": "我想吃中国菜。",
              "en": "I want to eat Chinese food."
          },
          {
              "pinyin": "Wǒ xiǎng nǐ.",
              "hanzi": "我想你。",
              "en": "I miss you."
          },
          {
              "pinyin": "Nǐ xiǎng zuò shénme?",
              "hanzi": "你想做什么？",
              "en": "What do you want to do?"
          }
      ]
  },
  {
      "hanzi": "息",
      "count": 87,
      "level": 118,
      "pinyin": "xī",
      "tone_level": 1,
      "en": "to rest, to stop",
      "examples": [
          {
              "pinyin": "Wǒ xiǎng xiū xi.",
              "hanzi": "我想休息。",
              "en": "I want to rest."
          },
          {
              "pinyin": "Kě yǐ tíng yī xià ma?",
              "hanzi": "可以停一下吗？",
              "en": "Can you stop for a moment?"
          },
          {
              "pinyin": "Wǒmen xiū xi yī xià ba.",
              "hanzi": "我们休息一下吧。",
              "en": "Let's take a break."
          }
      ]
  },
  {
      "hanzi": "总",
      "count": 126,
      "level": 119,
      "pinyin": "zǒng",
      "tone_level": 3,
      "en": "total, overall",
      "examples": [
          {
              "pinyin": "Zǒng de lái shuō, tā hěn péngyǒu.",
              "hanzi": "总的来说，他很朋友。",
              "en": "Overall, he is very friendly."
          },
          {
              "pinyin": "Zǒng de lái shuō, zhège diànnǎo bù cuò.",
              "hanzi": "总的来说，这个电脑不错。",
              "en": "Overall, this computer is good."
          },
          {
              "pinyin": "Nǐ zǒng gàosu wǒ zhèxiē shìqíng.",
              "hanzi": "你总告诉我这些事情。",
              "en": "You always tell me these things."
          }
      ]
  },
  {
      "hanzi": "怕",
      "count": 42,
      "level": 120,
      "pinyin": "pà",
      "tone_level": 4,
      "en": "to be afraid",
      "examples": [
          {
              "pinyin": "Wǒ hěn pà zhōngguó de dōngtiān.",
              "hanzi": "我很怕中国的冬天。",
              "en": "I'm very afraid of winter in China."
          },
          {
              "pinyin": "Wǒ pà hēi yè.",
              "hanzi": "我怕黑夜。",
              "en": "I'm afraid of the dark."
          },
          {
              "pinyin": "Nǐ pà shénme?",
              "hanzi": "你怕什么？",
              "en": "What are you afraid of?"
          }
      ]
  },
  {
      "hanzi": "己",
      "count": 234,
      "level": 121,
      "pinyin": "jǐ",
      "tone_level": 3,
      "en": "self",
      "examples": [
          {
              "pinyin": "Wǒ ài wǒ jǐ.",
              "hanzi": "我爱我己。",
              "en": "I love myself."
          },
          {
              "pinyin": "Tā bù guānxi wǒmen, zhǐ zài zhù yīge.",
              "hanzi": "她不关心我们，只在乎己个。",
              "en": "She doesn't care about us, only herself."
          },
          {
              "pinyin": "Nǐ yīnggāi zhòngshì zìjǐ de jīhuì.",
              "hanzi": "你应该重视自己的机会。",
              "en": "You should value your own opportunities."
          }
      ]
  },
  {
      "hanzi": "记",
      "count": 74,
      "level": 122,
      "pinyin": "jì",
      "tone_level": 4,
      "en": "to remember, to note",
      "examples": [
          {
              "pinyin": "Nǐ néng bāng wǒ jì yīxià zhège dìzhī ma?",
              "hanzi": "你能帮我记一下这个地址吗？",
              "en": "Can you help me remember this address?"
          },
          {
              "pinyin": "Wǒ zhēn méiyǒu jì zhù.",
              "hanzi": "我真没有记住。",
              "en": "I really didn't remember."
          },
          {
              "pinyin": "Tā hěn huài jì rìqī.",
              "hanzi": "他很坏记日期。",
              "en": "He's bad at remembering dates."
          }
      ]
  },
  {
      "hanzi": "已",
      "count": 171,
      "level": 123,
      "pinyin": "yǐ",
      "tone_level": 3,
      "en": "already",
      "examples": [
          {
              "pinyin": "Wǒ yǐ kàn guò zhè běn shū.",
              "hanzi": "我已看过这本书。",
              "en": "I have already read this book."
          },
          {
              "pinyin": "Tā yǐ chī guò wǔfàn.",
              "hanzi": "她已吃过午饭。",
              "en": "She has already eaten lunch."
          },
          {
              "pinyin": "Wǒmen yǐ huí jiā.",
              "hanzi": "我们已回家。",
              "en": "We have already returned home."
          }
      ]
  },
  {
      "hanzi": "包",
      "count": 159,
      "level": 124,
      "pinyin": "bāo",
      "tone_level": 1,
      "en": "to wrap, to include",
      "examples": [
          {
              "pinyin": "Wǒ bāo yī xià.",
              "hanzi": "我包一下。",
              "en": "Let me wrap it."
          },
          {
              "pinyin": "Zhège liàn bāo shénme?",
              "hanzi": "这个脸包什么？",
              "en": "What does this face include?"
          },
          {
              "pinyin": "Tā shēngqì bāo yī ge zhuāngyú.",
              "hanzi": "她生气包一个装鱼。",
              "en": "She angrily wrapped a fish."
          }
      ]
  },
  {
      "hanzi": "土",
      "count": 29,
      "level": 125,
      "pinyin": "tǔ",
      "tone_level": 3,
      "en": "earth, soil",
      "examples": [
          {
              "pinyin": "Zhè shì tǔ.",
              "hanzi": "这是土。",
              "en": "This is soil."
          },
          {
              "pinyin": "Nàge tiānqì tài tǔ le.",
              "hanzi": "那个天气太土了。",
              "en": "That weather is too harsh."
          },
          {
              "pinyin": "Wǒ xiǎng chī tǔnán de yǒuròu.",
              "hanzi": "我想吃土腥的油肉。",
              "en": "I want to eat salty pork."
          }
      ]
  },
  {
      "hanzi": "坐",
      "count": 96,
      "level": 126,
      "pinyin": "zuò",
      "tone_level": 4,
      "en": "to sit",
      "examples": [
          {
              "pinyin": "Nǐ xiǎng zuò ma?",
              "hanzi": "你想坐吗？",
              "en": "Do you want to sit?"
          },
          {
              "pinyin": "Wǒmen yīqǐ zuò ba.",
              "hanzi": "我们一起坐吧。",
              "en": "Let's sit together."
          },
          {
              "pinyin": "Nǐ yào zuò nǎ li?",
              "hanzi": "你要坐哪里？",
              "en": "Where do you want to sit?"
          }
      ]
  },
  {
      "hanzi": "吐",
      "count": 6,
      "level": 127,
      "pinyin": "tǔ",
      "tone_level": 3,
      "en": "to vomit, to spit out",
      "examples": [
          {
              "pinyin": "Wǒ juéde nàge dōngxi tài chòu, suǒyǐ wǒ tǔ le.",
              "hanzi": "我觉得那个东西太臭，所以我吐了。",
              "en": "I thought that thing was too smelly, so I vomited."
          },
          {
              "pinyin": "Nǐ shìfǒu yào tǔ?",
              "hanzi": "你是否要吐？",
              "en": "Do you want to vomit?"
          },
          {
              "pinyin": "Tā bùxiǎng kàn zhège, suǒyǐ tā tǔ le.",
              "hanzi": "他不想看这个，所以他吐了。",
              "en": "He didn't want to look at this, so he vomited."
          }
      ]
  },
  {
      "hanzi": "肚",
      "count": 10,
      "level": 128,
      "pinyin": "dù",
      "tone_level": 4,
      "en": "belly, stomach",
      "examples": [
          {
              "pinyin": "Wǒ è le, wǒ de dù hěn è.",
              "hanzi": "我饿了，我的肚很饿。",
              "en": "I'm hungry, my stomach is very hungry."
          },
          {
              "pinyin": "Wǒ de dù tòng.",
              "hanzi": "我的肚痛。",
              "en": "My stomach hurts."
          },
          {
              "pinyin": "Nǐ xiǎng chī shénme chī dù ma?",
              "hanzi": "你想吃什么吃肚吗？",
              "en": "What do you want to eat in your stomach?"
          }
      ]
  },
  {
      "hanzi": "在",
      "count": 1225,
      "level": 129,
      "pinyin": "zài",
      "tone_level": "4",
      "en": "at, in, on",
      "examples": [
          {
              "pinyin": "wǒ zài jiā.",
              "hanzi": "我在家。",
              "en": "I am at home."
          },
          {
              "pinyin": "tā zài xuéxiào.",
              "hanzi": "他在学校。",
              "en": "He is at school."
          },
          {
              "pinyin": "nǐ zài nǎr?",
              "hanzi": "你在哪儿？",
              "en": "Where are you?"
          }
      ]
  },
  {
      "hanzi": "走",
      "count": 181,
      "level": 130,
      "pinyin": "zǒu",
      "tone_level": "3",
      "en": "to walk",
      "examples": [
          {
              "pinyin": "wǒ zǒu le.",
              "hanzi": "我走了。",
              "en": "I am leaving."
          },
          {
              "pinyin": "tā zǒu le ma?",
              "hanzi": "他走了吗？",
              "en": "Did he leave?"
          },
          {
              "pinyin": "nǐ yào zǒu ma?",
              "hanzi": "你要走吗？",
              "en": "Are you leaving?"
          }
      ]
  },
  {
      "hanzi": "起",
      "count": 379,
      "level": 131,
      "pinyin": "qǐ",
      "tone_level": "3",
      "en": "to rise, to get up",
      "examples": [
          {
              "pinyin": "wǒ qǐ chuáng le.",
              "hanzi": "我起床了。",
              "en": "I got up."
          },
          {
              "pinyin": "tā jīntiān zǎoshang qǐ de hěn zǎo.",
              "hanzi": "他今天早上起得很早。",
              "en": "He got up very early this morning."
          },
          {
              "pinyin": "nǐ xiǎng qǐ ma?",
              "hanzi": "你想起吗？",
              "en": "Do you want to get up?"
          }
      ]
  },
  {
      "hanzi": "不",
      "count": 1602,
      "level": 132,
      "pinyin": "bù",
      "tone_level": "4",
      "en": "not, no",
      "examples": [
          {
              "pinyin": "wǒ bù zhīdào.",
              "hanzi": "我不知道。",
              "en": "I don't know."
          },
          {
              "pinyin": "tā bù xǐhuān chī zhōngguó cài.",
              "hanzi": "他不喜欢吃中国菜。",
              "en": "He doesn't like to eat Chinese food."
          },
          {
              "pinyin": "nǐ bù shì zhōngguó rén ma?",
              "hanzi": "你不是中国人吗？",
              "en": "Aren't you Chinese?"
          }
      ]
  },
  {
      "hanzi": "还",
      "count": 392,
      "level": 133,
      "pinyin": "huán",
      "tone_level": 2,
      "en": "still"
  },
  {
      "hanzi": "坏",
      "count": 67,
      "level": 134,
      "pinyin": "huài",
      "tone_level": "4",
      "en": "bad, broken",
      "examples": [
          {
              "pinyin": "zhè bēizi huài le.",
              "hanzi": "这杯子坏了。",
              "en": "This cup is broken."
          },
          {
              "pinyin": "tā huài rén.",
              "hanzi": "他坏人。",
              "en": "He is a bad person."
          },
          {
              "pinyin": "nàge diànhuà huài le.",
              "hanzi": "那个电话坏了。",
              "en": "That phone is broken."
          }
      ]
  },
  {
      "hanzi": "杯",
      "count": 43,
      "level": 135,
      "pinyin": "bēi",
      "tone_level": "1",
      "en": "cup",
      "examples": [
          {
              "pinyin": "wǒ yào yī bēi kāfēi.",
              "hanzi": "我要一杯咖啡。",
              "en": "I want a cup of coffee."
          },
          {
              "pinyin": "nǐ xiǎng yào shénme yǐnliào?",
              "hanzi": "你想要什么饮料？",
              "en": "What drink do you want?"
          },
          {
              "pinyin": "zhè shì wǒ de bēi.",
              "hanzi": "这是我的杯。",
              "en": "This is my cup."
          }
      ]
  },
  {
      "hanzi": "么",
      "count": 548,
      "level": 136,
      "pinyin": "me",
      "tone_level": "5",
      "en": "interrogative particle",
      "examples": [
          {
              "pinyin": "nǐ jiào shénme míngzi?",
              "hanzi": "你叫什么名字？",
              "en": "What is your name?"
          },
          {
              "pinyin": "wǒ méi yǒu qián.",
              "hanzi": "我没有钱。",
              "en": "I don't have money."
          },
          {
              "pinyin": "zhè shì shénme?",
              "hanzi": "这是什么？",
              "en": "What is this?"
          }
      ]
  },
  {
      "hanzi": "公",
      "count": 366,
      "level": 137,
      "pinyin": "gōng",
      "tone_level": "1",
      "en": "public",
      "examples": [
          {
              "pinyin": "gōnggòng qìchē.",
              "hanzi": "公共汽车。",
              "en": "Bus."
          },
          {
              "pinyin": "gōngyuán.",
              "hanzi": "公园。",
              "en": "Park."
          },
          {
              "pinyin": "gōngzhòng cān",
              "hanzi": "公众餐",
              "en": "Cafeteria"
          }
      ]
  },
  {
      "hanzi": "台",
      "count": 62,
      "level": 138,
      "pinyin": "tái",
      "tone_level": "2",
      "en": "platform, stage",
      "examples": [
          {
              "pinyin": "yī tái diànhuà.",
              "hanzi": "一台电话。",
              "en": "One phone."
          },
          {
              "pinyin": "juéshèng wǔtái.",
              "hanzi": "绝胜舞台。",
              "en": "Unbeatable stage."
          },
          {
              "pinyin": "wǒ xiǎng qù yīyuàn de tái shàng kàn yī xià.",
              "hanzi": "我想去医院的台上看一下。",
              "en": "I want to take a look on the stage at the hospital."
          }
      ]
  },
  {
      "hanzi": "去",
      "count": 696,
      "level": 139,
      "pinyin": "qù",
      "tone_level": "4",
      "en": "to go",
      "examples": [
          {
              "pinyin": "wǒ qù xuéxiào.",
              "hanzi": "我去学校。",
              "en": "I am going to school."
          },
          {
              "pinyin": "nǐ qù nǎr?",
              "hanzi": "你去哪儿？",
              "en": "Where are you going?"
          },
          {
              "pinyin": "tā jīntiān bù qù xuéxiào.",
              "hanzi": "他今天不去学校。",
              "en": "He is not going to school today."
          }
      ]
  },
  {
      "hanzi": "丢",
      "count": 29,
      "level": 140,
      "pinyin": "diū",
      "tone_level": "1",
      "en": "to lose",
      "examples": [
          {
              "pinyin": "wǒ diū le wǒ de yàoshi.",
              "hanzi": "我丢了我的钥匙。",
              "en": "I lost my keys."
          },
          {
              "pinyin": "nǐ diū le shénme?",
              "hanzi": "你丢了什么？",
              "en": "What did you lose?"
          },
          {
              "pinyin": "tā bù xiǎng diū tā de diànhuà.",
              "hanzi": "他不想丢他的电话。",
              "en": "He doesn't want to lose his phone."
          }
      ]
  },
  {
      "hanzi": "法",
      "count": 204,
      "level": 141,
      "pinyin": "fǎ",
      "tone_level": "3",
      "en": "law, method",
      "examples": [
          {
              "pinyin": "zhōngguó fǎ.",
              "hanzi": "中国法。",
              "en": "Chinese law."
          },
          {
              "pinyin": "zhè shì yī gè hǎo fǎ.",
              "hanzi": "这是一个好法。",
              "en": "This is a good method."
          },
          {
              "pinyin": "wǒ bù zhīdào zhè shì yī gè hǎo fǎ.",
              "hanzi": "我不知道这是一个好法。",
              "en": "I don't know if this is a good method."
          }
      ]
  },
  {
      "hanzi": "寺",
      "count": 0,
      "level": 142,
      "pinyin": "si",
      "tone_level": 4,
      "en": "temple",
      "examples": [
          {
              "en": "I visited the temple.",
              "hanzi": "我参观了寺庙。",
              "pinyin": "wǒ cānguān le sìmiào."
          },
          {
              "en": "The temple is beautiful.",
              "hanzi": "寺庙很漂亮。",
              "pinyin": "sìmiào hěn piàoliang."
          },
          {
              "en": "There is a famous temple in the city.",
              "hanzi": "城市里有一座有名的寺庙。",
              "pinyin": "chéngshì lǐ yǒu yī zuò yǒumíng de sìmiào."
          }
      ]
  },
  {
      "hanzi": "等",
      "count": 101,
      "level": 143,
      "pinyin": "děng",
      "tone_level": 3,
      "en": "wait",
      "examples": [
          {
              "en": "Please wait a moment.",
              "hanzi": "请等一下。",
              "pinyin": "qǐng děng yīxià."
          },
          {
              "en": "I will wait for you.",
              "hanzi": "我会等你。",
              "pinyin": "wǒ huì děng nǐ."
          },
          {
              "en": "We cannot wait any longer.",
              "hanzi": "我们不能再等了。",
              "pinyin": "wǒmen bùnéng zài děng le."
          }
      ]
  },
  {
      "hanzi": "门",
      "count": 158,
      "level": 144,
      "pinyin": "mén",
      "tone_level": 2,
      "en": "door",
      "examples": [
          {
              "en": "Close the door, please.",
              "hanzi": "请关门。",
              "pinyin": "qǐng guānmén."
          },
          {
              "en": "The door is open.",
              "hanzi": "门开着。",
              "pinyin": "mén kāi zhe."
          },
          {
              "en": "The key is in front of the door.",
              "hanzi": "钥匙在门前面。",
              "pinyin": "yàoshi zài mén qiánmiàn."
          }
      ]
  },
  {
      "hanzi": "们",
      "count": 1138,
      "level": 145,
      "pinyin": "mén",
      "tone_level": 2,
      "en": "plural marker (used after pronouns)",
      "examples": [
          {
              "en": "They are my friends.",
              "hanzi": "他们是我的朋友。",
              "pinyin": "tāmen shì wǒ de péngyou."
          },
          {
              "en": "We are going to the park.",
              "hanzi": "我们要去公园。",
              "pinyin": "wǒmen yào qù gōngyuán."
          },
          {
              "en": "Are you all here?",
              "hanzi": "你们都在这里吗？",
              "pinyin": "nǐmen dōu zài zhèlǐ ma?"
          }
      ]
  },
  {
      "hanzi": "问",
      "count": 174,
      "level": 146,
      "pinyin": "wèn",
      "tone_level": 4,
      "en": "ask",
      "examples": [
          {
              "en": "May I ask a question?",
              "hanzi": "我可以问一个问题吗？",
              "pinyin": "wǒ kěyǐ wèn yīgè wèntí ma?"
          },
          {
              "en": "He asked about your health.",
              "hanzi": "他问了你的健康情况。",
              "pinyin": "tā wèn le nǐ de jiànkāng qíngkuàng."
          },
          {
              "en": "She often asks for advice.",
              "hanzi": "她经常请教。",
              "pinyin": "tā jīngcháng qǐngjiào."
          }
      ]
  },
  {
      "hanzi": "间",
      "count": 201,
      "level": 147,
      "pinyin": "jiǎn",
      "tone_level": 1,
      "en": "between",
      "examples": [
          {
              "en": "The book is between the table and the chair.",
              "hanzi": "书在桌子和椅子之间。",
              "pinyin": "shū zài zhuōzi hé yǐzi zhījiān."
          },
          {
              "en": "There is a small garden between the buildings.",
              "hanzi": "楼房之间有一个小花园。",
              "pinyin": "lóufáng zhījiān yǒu yīgè xiǎo huāyuán."
          },
          {
              "en": "He walked through the narrow space between the cars.",
              "hanzi": "他在车辆之间穿行。",
              "pinyin": "tā zài chēliàng zhījiān chuānxíng."
          }
      ]
  },
  {
      "hanzi": "简",
      "count": 40,
      "level": 148,
      "pinyin": "jiǎn",
      "tone_level": 3,
      "en": "simple",
      "examples": [
          {
              "en": "This is a simple task.",
              "hanzi": "这是一个简单的任务。",
              "pinyin": "zhè shì yīgè jiǎndān de rènwu."
          },
          {
              "en": "He has a simple lifestyle.",
              "hanzi": "他过着简单的生活。",
              "pinyin": "tā guòzhe jiǎndān de shēnghuó."
          },
          {
              "en": "She wore a simple white dress.",
              "hanzi": "她穿了一件简单的白色连衣裙。",
              "pinyin": "tā chuān le yī jiàn jiǎndān de báisè liányīqún."
          }
      ]
  },
  {
      "hanzi": "司",
      "count": 233,
      "level": 149,
      "pinyin": "sī",
      "tone_level": 1,
      "en": "department",
      "examples": [
          {
              "en": "He works in the marketing department.",
              "hanzi": "他在市场营销部门工作。",
              "pinyin": "tā zài shìchǎng yíngxiāo bùmén gōngzuò."
          },
          {
              "en": "The company has a finance department.",
              "hanzi": "公司有一个财务部门。",
              "pinyin": "gōngsī yǒu yīgè cáiwù bùmén."
          },
          {
              "en": "She is the head of the HR department.",
              "hanzi": "她是人力资源部门的负责人。",
              "pinyin": "tā shì rénlì zīyuán bùmén de fùzérén."
          }
      ]
  },
  {
      "hanzi": "词",
      "count": 23,
      "level": 150,
      "pinyin": "cí",
      "tone_level": 2,
      "en": "word",
      "examples": [
          {
              "en": "Learn new words every day.",
              "hanzi": "每天学习新词。",
              "pinyin": "měitiān xuéxí xīn cí."
          },
          {
              "en": "She knows a lot of English words.",
              "hanzi": "她认识很多英文词。",
              "pinyin": "tā rènshí hěnduō yīngwén cí."
          },
          {
              "en": "This book has many difficult words.",
              "hanzi": "这本书里有很多难词。",
              "pinyin": "zhè běn shū lǐ yǒu hěnduō náncí."
          }
      ]
  },
  {
      "hanzi": "母",
      "count": 93,
      "level": 151,
      "pinyin": "mǔ",
      "tone_level": 3,
      "en": "mother",
      "examples": [
          {
              "en": "My mother is cooking in the kitchen.",
              "hanzi": "我妈妈在厨房里做饭。",
              "pinyin": "wǒ māma zài chúfáng lǐ zuò fàn."
          },
          {
              "en": "She loves her mother very much.",
              "hanzi": "她非常爱她妈妈。",
              "pinyin": "tā fēicháng ài tā māma."
          },
          {
              "en": "His mother is a teacher.",
              "hanzi": "他妈妈是老师。",
              "pinyin": "tā māma shì lǎoshī."
          }
      ]
  },
  {
      "hanzi": "每",
      "count": 307,
      "level": 152,
      "pinyin": "měi",
      "tone_level": 3,
      "en": "every",
      "examples": [
          {
              "en": "He goes to the gym every day.",
              "hanzi": "他每天去健身房。",
              "pinyin": "tā měitiān qù jiànshēnfáng."
          },
          {
              "en": "I read a book every night.",
              "hanzi": "我每晚都看书。",
              "pinyin": "wǒ měi wǎn dōu kànshū."
          },
          {
              "en": "She eats breakfast every morning.",
              "hanzi": "她每天早上吃早餐。",
              "pinyin": "tā měitiān zǎoshang chī zǎocān."
          }
      ]
  },
  {
      "hanzi": "也",
      "count": 265,
      "level": 153,
      "pinyin": "yě",
      "tone_level": 3,
      "en": "also",
      "examples": [
          {
              "en": "I also want to go.",
              "hanzi": "我也想去。",
              "pinyin": "wǒ yě xiǎng qù."
          },
          {
              "en": "She is also studying Chinese.",
              "hanzi": "她也在学习汉语。",
              "pinyin": "tā yě zài xuéxí hànyǔ."
          },
          {
              "en": "They also like to eat pizza.",
              "hanzi": "他们也喜欢吃比萨。",
              "pinyin": "tāmen yě xǐhuān chī bǐsà."
          }
      ]
  },
  {
      "hanzi": "他",
      "count": 1341,
      "level": 154,
      "pinyin": "tā",
      "tone_level": 1,
      "en": "he",
      "examples": [
          {
              "en": "He is my friend.",
              "hanzi": "他是我的朋友。",
              "pinyin": "tā shì wǒ de péngyou."
          },
          {
              "en": "She told him the truth.",
              "hanzi": "她告诉了他真相。",
              "pinyin": "tā gàosu le tā zhēnxiàng."
          },
          {
              "en": "I saw him at the park yesterday.",
              "hanzi": "昨天我在公园看到了他。",
              "pinyin": "zuótiān wǒ zài gōngyuán kàndào le tā."
          }
      ]
  },
  {
      "hanzi": "地",
      "count": 347,
      "level": 155,
      "pinyin": "dì",
      "tone_level": 4,
      "en": "ground",
      "examples": [
          {
              "en": "The cat is lying on the ground.",
              "hanzi": "猫躺在地上。",
              "pinyin": "māo tǎng zài dìshàng."
          },
          {
              "en": "He fell to the ground.",
              "hanzi": "他摔到了地上。",
              "pinyin": "tā shuāi dào le dìshàng."
          },
          {
              "en": "She found a coin on the ground.",
              "hanzi": "她在地上找到了一枚硬币。",
              "pinyin": "tā zài dìshàng zhǎodào le yī méi yìngbì."
          }
      ]
  },
  {
      "hanzi": "小",
      "count": 569,
      "level": 156,
      "pinyin": "xiǎo",
      "tone_level": 3,
      "en": "small",
      "examples": [
          {
              "en": "This is a small cat.",
              "hanzi": "这是一只小猫。",
              "pinyin": "Zhè shì yī zhī xiǎo māo."
          },
          {
              "en": "I have a small bag.",
              "hanzi": "我有一个小包。",
              "pinyin": "Wǒ yǒu yī gè xiǎo bāo."
          },
          {
              "en": "She has a small book.",
              "hanzi": "她有一本小书。",
              "pinyin": "Tā yǒu yī běn xiǎo shū."
          }
      ]
  },
  {
      "hanzi": "东",
      "count": 144,
      "level": 157,
      "pinyin": "dōng",
      "tone_level": 1,
      "en": "east",
      "examples": [
          {
              "en": "The sun rises in the east.",
              "hanzi": "太阳从东方升起。",
              "pinyin": "Tàiyáng cóng dōngfāng shēngqǐ."
          },
          {
              "en": "He lives in the eastern part of the city.",
              "hanzi": "他住在城市的东部。",
              "pinyin": "Tā zhù zài chéngshì de dōng bù."
          },
          {
              "en": "Please go east for two blocks.",
              "hanzi": "请向东走两个街区。",
              "pinyin": "Qǐng xiàng dōng zǒu liǎng gè jiēqū."
          }
      ]
  },
  {
      "hanzi": "尔",
      "count": 5,
      "level": 158,
      "pinyin": "ěr",
      "tone_level": 3,
      "en": "you",
      "examples": [
          {
              "en": "Are you going to the park?",
              "hanzi": "你要去公园吗？",
              "pinyin": "Nǐ yào qù gōngyuán ma?"
          },
          {
              "en": "Do you like this color?",
              "hanzi": "你喜欢这个颜色吗？",
              "pinyin": "Nǐ xǐhuān zhège yánsè ma?"
          },
          {
              "en": "Are you free tomorrow?",
              "hanzi": "你明天有空吗？",
              "pinyin": "Nǐ míngtiān yǒu kòng ma?"
          }
      ]
  },
  {
      "hanzi": "你",
      "count": 1421,
      "level": 159,
      "pinyin": "nǐ",
      "tone_level": 3,
      "en": "you"
  },
  {
      "hanzi": "您",
      "count": 33,
      "level": 160,
      "pinyin": "nín",
      "tone_level": 2,
      "en": "you (formal)",
      "examples": [
          {
              "en": "May I help you?",
              "hanzi": "我能帮您吗？",
              "pinyin": "Wǒ néng bāng nín ma?"
          },
          {
              "en": "Thank you for your help.",
              "hanzi": "谢谢您的帮助。",
              "pinyin": "Xièxiè nín de bāngzhù."
          },
          {
              "en": "Are you looking for something?",
              "hanzi": "您在找什么吗？",
              "pinyin": "Nín zài zhǎo shénme ma?"
          }
      ]
  },
  {
      "hanzi": "大",
      "count": 701,
      "level": 161,
      "pinyin": "dà",
      "tone_level": 4,
      "en": "big",
      "examples": [
          {
              "en": "He has a big house.",
              "hanzi": "他有一所大房子。",
              "pinyin": "Tā yǒu yī suǒ dà fángzi."
          },
          {
              "en": "The elephant is very big.",
              "hanzi": "大象很大。",
              "pinyin": "Dàxiàng hěn dà."
          },
          {
              "en": "It's a big city.",
              "hanzi": "这是一个大城市。",
              "pinyin": "Zhè shì yī gè dà chéngshì."
          }
      ]
  },
  {
      "hanzi": "太",
      "count": 279,
      "level": 162,
      "pinyin": "tài",
      "tone_level": 4,
      "en": "too",
      "examples": [
          {
              "en": "It's too hot today.",
              "hanzi": "今天太热了。",
              "pinyin": "Jīntiān tài rè le."
          },
          {
              "en": "This shirt is too small for me.",
              "hanzi": "这件衬衫对我来说太小了。",
              "pinyin": "Zhè jiàn chènshān duì wǒ lái shuō tài xiǎo le."
          },
          {
              "en": "She ate too much cake.",
              "hanzi": "她吃了太多蛋糕。",
              "pinyin": "Tā chī le tài duō dàngāo."
          }
      ]
  },
  {
      "hanzi": "犬",
      "count": 0,
      "level": 163,
      "pinyin": "quǎn",
      "tone_level": 3,
      "en": "dog",
      "examples": [
          {
              "en": "I have a dog.",
              "hanzi": "我有一只狗。",
              "pinyin": "Wǒ yǒu yī zhī gǒu."
          },
          {
              "en": "The dog is running in the park.",
              "hanzi": "狗在公园里跑。",
              "pinyin": "Gǒu zài gōngyuán lǐ pǎo."
          },
          {
              "en": "He loves his dog very much.",
              "hanzi": "他非常爱他的狗。",
              "pinyin": "Tā fēicháng ài tā de gǒu."
          }
      ]
  },
  {
      "hanzi": "哭",
      "count": 26,
      "level": 164,
      "pinyin": "kū",
      "tone_level": 1,
      "en": "to cry",
      "examples": [
          {
              "pinyin": "wǒ kū le",
              "hanzi": "我哭了",
              "en": "I cried"
          },
          {
              "pinyin": "tā ku le",
              "hanzi": "他哭了",
              "en": "He cried"
          },
          {
              "pinyin": "nǐ kū ma",
              "hanzi": "你哭吗",
              "en": "Do you cry?"
          }
      ]
  },
  {
      "hanzi": "臭",
      "count": 12,
      "level": 165,
      "pinyin": "chòu",
      "tone_level": 4,
      "en": "smelly",
      "examples": [
          {
              "pinyin": "zhè ge chòu",
              "hanzi": "这个臭",
              "en": "This is smelly"
          },
          {
              "pinyin": "wǒ bù chòu",
              "hanzi": "我不臭",
              "en": "I am not smelly"
          },
          {
              "pinyin": "tā de shǒu chòu",
              "hanzi": "她的手臭",
              "en": "Her hands are smelly"
          }
      ]
  },
  {
      "hanzi": "然",
      "count": 214,
      "level": 166,
      "pinyin": "rán",
      "tone_level": 2,
      "en": "yes, correct",
      "examples": [
          {
              "pinyin": "duì, duì de, shì de",
              "hanzi": "对，对的，是的",
              "en": "Yes, correct, that's right"
          },
          {
              "pinyin": "nǐ shuō de duì",
              "hanzi": "你说得对",
              "en": "What you said is correct"
          },
          {
              "pinyin": "wǒ xiǎng zhī dào shì de",
              "hanzi": "我想知道是的",
              "en": "I want to know if it's correct"
          }
      ]
  },
  {
      "hanzi": "狗",
      "count": 71,
      "level": 167,
      "pinyin": "gǒu",
      "tone_level": 3,
      "en": "dog",
      "examples": [
          {
              "pinyin": "wǒ yǒu yī zhī gǒu",
              "hanzi": "我有一只狗",
              "en": "I have a dog"
          },
          {
              "pinyin": "tā de gǒu hěn kě'ài",
              "hanzi": "他的狗很可爱",
              "en": "His dog is very cute"
          },
          {
              "pinyin": "zhè shì wǒ de gǒu",
              "hanzi": "这是我的狗",
              "en": "This is my dog"
          }
      ]
  },
  {
      "hanzi": "决",
      "count": 71,
      "level": 168,
      "pinyin": "jué",
      "tone_level": 2,
      "en": "to decide",
      "examples": [
          {
              "pinyin": "wǒ jué dìng le",
              "hanzi": "我决定了",
              "en": "I have decided"
          },
          {
              "pinyin": "nǐ jué de zěn me",
              "hanzi": "你觉得怎么",
              "en": "What do you think?"
          },
          {
              "pinyin": "tā men jué dìng qù chī fàn",
              "hanzi": "他们决定去吃饭",
              "en": "They decided to go eat"
          }
      ]
  },
  {
      "hanzi": "快",
      "count": 160,
      "level": 169,
      "pinyin": "kuài",
      "tone_level": 4,
      "en": "fast",
      "examples": [
          {
              "pinyin": "wǒ kàn le hěn kuài",
              "hanzi": "我看了很快",
              "en": "I read it quickly"
          },
          {
              "pinyin": "nǐ chī de hěn kuài",
              "hanzi": "你吃得很快",
              "en": "You eat quickly"
          },
          {
              "pinyin": "wǒmen kuài dì xià qù",
              "hanzi": "我们快地下去",
              "en": "Let's go down quickly"
          }
      ]
  },
  {
      "hanzi": "块",
      "count": 49,
      "level": 170,
      "pinyin": "kuài",
      "tone_level": 4,
      "en": "piece",
      "examples": [
          {
              "pinyin": "wǒ yào yī kuài mǐfàn",
              "hanzi": "我要一块米饭",
              "en": "I want a piece of rice"
          },
          {
              "pinyin": "zhè shì yī kuài tiáo",
              "hanzi": "这是一块条",
              "en": "This is a piece of paper"
          },
          {
              "pinyin": "nǐ yào duō shǎo kuài",
              "hanzi": "你要多少块",
              "en": "How many pieces do you want?"
          }
      ]
  },
  {
      "hanzi": "羊",
      "count": 20,
      "level": 171,
      "pinyin": "yáng",
      "tone_level": 2,
      "en": "sheep",
      "examples": [
          {
              "pinyin": "wǒ xiǎng kàn yáng",
              "hanzi": "我想看羊",
              "en": "I want to see sheep"
          },
          {
              "pinyin": "nà li yǒu hěn duō yáng",
              "hanzi": "那里有很多羊",
              "en": "There are many sheep there"
          },
          {
              "pinyin": "zhè zhī yáng hěn měi",
              "hanzi": "这只羊很美",
              "en": "This sheep is very beautiful"
          }
      ]
  },
  {
      "hanzi": "着",
      "count": 219,
      "level": 172,
      "pinyin": "zhe",
      "tone_level": 0,
      "en": "continuous action marker",
      "examples": [
          {
              "pinyin": "wǒ zhè yàng zuò",
              "hanzi": "我这样做",
              "en": "I do it like this"
          },
          {
              "pinyin": "tā zài kàn shū",
              "hanzi": "他在看书",
              "en": "He is reading"
          },
          {
              "pinyin": "nǐ zài gàn shén me",
              "hanzi": "你在干什么",
              "en": "What are you doing?"
          }
      ]
  },
  {
      "hanzi": "样",
      "count": 246,
      "level": 173,
      "pinyin": "yàng",
      "tone_level": 4,
      "en": "appearance, style",
      "examples": [
          {
              "pinyin": "zhè ge yàng zi hǎo",
              "hanzi": "这个样子好",
              "en": "This appearance is good"
          },
          {
              "pinyin": "nǐ xǐ huān zhè yàng de chéng shì ma",
              "hanzi": "你喜欢这样的城市吗",
              "en": "Do you like cities like this?"
          },
          {
              "pinyin": "wǒ xiǎng yào zhè yàng de yī fú",
              "hanzi": "我想要这样的衣服",
              "en": "I want clothes like this"
          }
      ]
  },
  {
      "hanzi": "美",
      "count": 143,
      "level": 174,
      "pinyin": "měi",
      "tone_level": 3,
      "en": "beautiful",
      "examples": [
          {
              "pinyin": "zhè ge chéng shì hěn měi",
              "hanzi": "这个城市很美",
              "en": "This city is beautiful"
          },
          {
              "pinyin": "tā hěn měi",
              "hanzi": "她很美",
              "en": "She is beautiful"
          },
          {
              "pinyin": "wǒ xiǎng mǎi zhè ge měi de huā",
              "hanzi": "我想买这个美的花",
              "en": "I want to buy this beautiful flower"
          }
      ]
  },
  {
      "hanzi": "力",
      "count": 135,
      "level": 175,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "strength, power",
      "examples": [
          {
              "pinyin": "wǒ yǒu hěn duō lì",
              "hanzi": "我有很多力",
              "en": "I have a lot of strength"
          },
          {
              "pinyin": "tā hěn qiáng",
              "hanzi": "他很强",
              "en": "He is strong"
          },
          {
              "pinyin": "zhè ge rén yǒu lì",
              "hanzi": "这个人有力",
              "en": "This person is strong"
          }
      ]
  },
  {
      "hanzi": "加",
      "count": 108,
      "level": 176,
      "pinyin": "jiā",
      "tone_level": 1,
      "en": "to add",
      "examples": [
          {
              "pinyin": "wǒ yào jiā tiáo",
              "hanzi": "我要加条",
              "en": "I want to add a strip"
          },
          {
              "pinyin": "nǐ yào jiā diǎn shén me",
              "hanzi": "你要加点什么",
              "en": "What do you want to add?"
          },
          {
              "pinyin": "wǒ men jiā dian xiǎo chī ba",
              "hanzi": "我们加点小吃吧",
              "en": "Let's add some snacks"
          }
      ]
  },
  {
      "hanzi": "边",
      "count": 129,
      "level": 177,
      "pinyin": "biān",
      "tone_level": 1,
      "en": "side",
      "examples": [
          {
              "pinyin": "wǒ xiǎng zài biān zuò",
              "hanzi": "我想在边坐",
              "en": "I want to sit on the side"
          },
          {
              "pinyin": "tā zài biān shàng",
              "hanzi": "她在边上",
              "en": "She is on the side"
          },
          {
              "pinyin": "nǐ zhù zài nǎ biān",
              "hanzi": "你住在哪边",
              "en": "Which side do you live on?"
          }
      ]
  },
  {
      "hanzi": "办",
      "count": 90,
      "level": 178,
      "pinyin": "bàn",
      "tone_level": 4,
      "en": "to do, to handle",
      "examples": [
          {
              "pinyin": "wǒ kuài bàn wán le",
              "hanzi": "我快办完了",
              "en": "I'm almost done"
          },
          {
              "pinyin": "tā men zhèng zài bàn shì",
              "hanzi": "他们正在办事",
              "en": "They are working"
          },
          {
              "pinyin": "nǐ néng bàn chū lái ma",
              "hanzi": "你能办出来吗",
              "en": "Can you do it?"
          }
      ]
  },
  {
      "hanzi": "为",
      "count": 446,
      "level": 179,
      "pinyin": "wèi",
      "tone_level": 4,
      "en": "for",
      "examples": [
          {
              "pinyin": "wǒ wèi nǐ zuò le zhè ge",
              "hanzi": "我为你做了这个",
              "en": "I did this for you"
          },
          {
              "pinyin": "nǐ yǒu méi yǒu wèi wǒ mǎi dōng xi",
              "hanzi": "你有没有为我买东西",
              "en": "Did you buy anything for me?"
          },
          {
              "pinyin": "tā wèi tā mā mā zuò fàn",
              "hanzi": "她为她妈妈做饭",
              "en": "She cooks for her mom"
          }
      ]
  },
  {
      "hanzi": "另",
      "count": 31,
      "level": 180,
      "pinyin": "lìng",
      "tone_level": 4,
      "en": "other",
      "examples": [
          {
              "en": "I want another cup of tea.",
              "hanzi": "我要另一杯茶。",
              "pinyin": "wǒ yào lìng yī bēi chá."
          },
          {
              "en": "Do you have any other suggestions?",
              "hanzi": "你还有别的建议吗？",
              "pinyin": "nǐ hái yǒu bié de jiàn yì ma?"
          },
          {
              "en": "He has another job besides teaching.",
              "hanzi": "除了教书，他还有另一份工作。",
              "pinyin": "chú le jiāo shū, tā hái yǒu lìng yī fèn gōng zuò."
          }
      ]
  },
  {
      "hanzi": "云",
      "count": 16,
      "level": 181,
      "pinyin": "yún",
      "tone_level": 2,
      "en": "cloud",
      "examples": [
          {
              "en": "The sky is full of clouds today.",
              "hanzi": "今天天空布满了云。",
              "pinyin": "jīn tiān tiān kōng bù mǎn le yún."
          },
          {
              "en": "The sun is hiding behind the clouds.",
              "hanzi": "太阳躲在云后面。",
              "pinyin": "tài yáng duǒ zài yún hòu miàn."
          },
          {
              "en": "The airplane flew through the clouds.",
              "hanzi": "飞机穿越了云层。",
              "pinyin": "fēi jī chuān yuè le yún céng."
          }
      ]
  },
  {
      "hanzi": "运",
      "count": 95,
      "level": 182,
      "pinyin": "yùn",
      "tone_level": 4,
      "en": "to move"
  },
  {
      "hanzi": "动",
      "count": 264,
      "level": 183,
      "pinyin": "dòng",
      "tone_level": 4,
      "en": "motion"
  },
  {
      "hanzi": "会",
      "count": 666,
      "level": 184,
      "pinyin": "huì",
      "tone_level": 4,
      "en": "meeting"
  },
  {
      "hanzi": "丁",
      "count": 0,
      "level": 185,
      "pinyin": "dīng",
      "tone_level": 1,
      "en": "nail",
      "examples": [
          {
              "en": "I need to buy some nails for this project.",
              "hanzi": "我需要为这个项目买一些钉子。",
              "pinyin": "wǒ xū yào wèi zhè gè xiàng mù mǎi yī xiē dīng zi."
          },
          {
              "en": "He accidentally stepped on a nail.",
              "hanzi": "他不小心踩到了一根钉子。",
              "pinyin": "tā bù xiǎo xīn cǎi dào le yī gēn dīng zi."
          },
          {
              "en": "Please hammer the nails into the wood.",
              "hanzi": "请把钉子敲进木头里。",
              "pinyin": "qǐng bǎ dīng zi qiāo jìn mù tou lǐ."
          }
      ]
  },
  {
      "hanzi": "打",
      "count": 219,
      "level": 186,
      "pinyin": "dǎ",
      "tone_level": 3,
      "en": "hit"
  },
  {
      "hanzi": "可",
      "count": 452,
      "level": 187,
      "pinyin": "kě",
      "tone_level": 3,
      "en": "can",
      "examples": [
          {
              "en": "Can you speak Chinese?",
              "hanzi": "你会说中文吗？",
              "pinyin": "nǐ huì shuō zhōng wén ma?"
          },
          {
              "en": "I can swim.",
              "hanzi": "我会游泳。",
              "pinyin": "wǒ huì yóu yǒng."
          },
          {
              "en": "She can play the piano very well.",
              "hanzi": "她弹钢琴弹得很好。",
              "pinyin": "tā tán gāng qín tán dé hěn hǎo."
          }
      ]
  },
  {
      "hanzi": "哥",
      "count": 70,
      "level": 188,
      "pinyin": "gē",
      "tone_level": 1,
      "en": "older brother",
      "examples": [
          {
              "en": "My older brother is a doctor.",
              "hanzi": "我的哥哥是医生。",
              "pinyin": "wǒ de gē gē shì yī shēng."
          },
          {
              "en": "His older brother is very tall.",
              "hanzi": "他的哥哥很高。",
              "pinyin": "tā de gē gē hěn gāo."
          },
          {
              "en": "I have two older brothers.",
              "hanzi": "我有两个哥哥。",
              "pinyin": "wǒ yǒu liǎng gè gē gē."
          }
      ]
  },
  {
      "hanzi": "河",
      "count": 27,
      "level": 189,
      "pinyin": "hé",
      "tone_level": 2,
      "en": "river",
      "examples": [
          {
              "en": "The Yellow River is the second-longest river in China.",
              "hanzi": "黄河是中国第二长河。",
              "pinyin": "huáng hé shì zhōng guó dì èr cháng hé."
          },
          {
              "en": "We took a boat ride on the river.",
              "hanzi": "我们在河上乘船游览。",
              "pinyin": "wǒ men zài hé shàng chéng chuán yóu lǎn."
          },
          {
              "en": "The river flows through the city.",
              "hanzi": "这条河流经了这座城市。",
              "pinyin": "zhè tiáo hé liú jīng le zhè zuò chéng shì."
          }
      ]
  },
  {
      "hanzi": "奇",
      "count": 18,
      "level": 190,
      "pinyin": "qí",
      "tone_level": 2,
      "en": "strange",
      "examples": [
          {
              "en": "This is a very strange place.",
              "hanzi": "这是一个非常奇怪的地方。",
              "pinyin": "zhè shì yī gè fēi cháng qí guài de dì fāng."
          },
          {
              "en": "He has a strange habit of collecting old coins.",
              "hanzi": "他有一个奇怪的习惯，就是收集古币。",
              "pinyin": "tā yǒu yī gè qí guài de xí guàn, jiù shì shōu jí gǔ bì."
          },
          {
              "en": "I heard a strange noise last night.",
              "hanzi": "昨晚我听到了一个奇怪的声音。",
              "pinyin": "zuó wǎn wǒ tīng dào le yī gè qí guài de shēng yīn."
          }
      ]
  },
  {
      "hanzi": "骑",
      "count": 20,
      "level": 191,
      "pinyin": "qí",
      "tone_level": 2,
      "en": "ride (a bicycle, horse, etc.)",
      "examples": [
          {
              "en": "She can ride a bike very well.",
              "hanzi": "她骑自行车骑得很好。",
              "pinyin": "tā qí zì xíng chē qí dé hěn hǎo."
          },
          {
              "en": "He enjoys riding horses in the countryside.",
              "hanzi": "他喜欢在乡间骑马。",
              "pinyin": "tā xǐ huān zài xiāng jiān qí mǎ."
          },
          {
              "en": "We're going to ride bicycles in the park.",
              "hanzi": "我们打算在公园里骑自行车。",
              "pinyin": "wǒ men dǎ suàn zài gōng yuán lǐ qí zì xíng chē."
          }
      ]
  },
  {
      "hanzi": "椅",
      "count": 8,
      "level": 192,
      "pinyin": "yǐ",
      "tone_level": 3,
      "en": "chair",
      "examples": [
          {
              "en": "Please have a seat on the chair.",
              "hanzi": "请在椅子上坐下。",
              "pinyin": "qǐng zài yǐ zi shàng zuò xià."
          },
          {
              "en": "He bought a new chair for his office.",
              "hanzi": "他给办公室买了一把新椅子。",
              "pinyin": "tā gěi bàn gōng shì mǎi le yī bǎ xīn yǐ zi."
          },
          {
              "en": "The dining room has six chairs.",
              "hanzi": "餐厅里有六把椅子。",
              "pinyin": "cān tīng lǐ yǒu liù bǎ yǐ zi."
          }
      ]
  },
  {
      "hanzi": "以",
      "count": 584,
      "level": 193,
      "pinyin": "yǐ",
      "tone_level": 3,
      "en": "with",
      "examples": [
          {
              "en": "You can pay with cash or credit card.",
              "hanzi": "你可以用现金或信用卡支付。",
              "pinyin": "nǐ kě yǐ yòng xiàn jīn huò xìn yòng kǎ zhī fù."
          },
          {
              "en": "He greeted me with a smile.",
              "hanzi": "他用微笑向我打招呼。",
              "pinyin": "tā yòng wēi xiào xiàng wǒ dǎ zhāo hū."
          },
          {
              "en": "She writes with a pen.",
              "hanzi": "她用钢笔写字。",
              "pinyin": "tā yòng gāng bǐ xiě zì."
          }
      ]
  },
  {
      "hanzi": "内",
      "count": 57,
      "level": 194,
      "pinyin": "nèi",
      "tone_level": 4,
      "en": "inside",
      "examples": [
          {
              "en": "The keys are inside the drawer.",
              "hanzi": "钥匙在抽屉里面。",
              "pinyin": "yào shi zài chōu ti lǐ miàn."
          },
          {
              "en": "It's warmer inside the house.",
              "hanzi": "屋里面比外面暖和。",
              "pinyin": "wū lǐ miàn bǐ wài miàn nuǎn huo."
          },
          {
              "en": "He left his phone inside the car.",
              "hanzi": "他把手机忘在车里面了。",
              "pinyin": "tā bǎ shǒu jī wàng zài chē lǐ miàn le."
          }
      ]
  },
  {
      "hanzi": "肉",
      "count": 54,
      "level": 195,
      "pinyin": "ròu",
      "tone_level": 4,
      "en": "meat",
      "examples": [
          {
              "en": "I don't eat pork, I only eat chicken.",
              "hanzi": "我不吃猪肉，我只吃鸡肉。",
              "pinyin": "wǒ bù chī zhū ròu, wǒ zhǐ chī jī ròu."
          },
          {
              "en": "I like to eat meat.",
              "hanzi": "我喜欢吃肉。",
              "pinyin": "Wǒ xǐhuān chī ròu."
          },
          {
              "en": "This dish has pork in it.",
              "hanzi": "这道菜有猪肉。",
              "pinyin": "Zhè dào cài yǒu zhū ròu."
          },
          {
              "en": "Do you prefer chicken or beef?",
              "hanzi": "你更喜欢鸡肉还是牛肉？",
              "pinyin": "Nǐ gèng xǐhuān jī ròu háishì niú ròu?"
          }
      ]
  },
  {
      "hanzi": "两",
      "count": 171,
      "level": 196,
      "pinyin": "liǎng",
      "tone_level": 3,
      "en": "two",
      "examples": [
          {
              "en": "I have two books.",
              "hanzi": "我有两本书。",
              "pinyin": "Wǒ yǒu liǎng běn shū."
          },
          {
              "en": "They are two brothers.",
              "hanzi": "他们是两个兄弟。",
              "pinyin": "Tāmen shì liǎng gè xiōngdì."
          },
          {
              "en": "Can I have two cups of tea?",
              "hanzi": "我可以要两杯茶吗？",
              "pinyin": "Wǒ kěyǐ yào liǎng bēi chá ma?"
          }
      ]
  },
  {
      "hanzi": "再",
      "count": 120,
      "level": 197,
      "pinyin": "zài",
      "tone_level": 4,
      "en": "again",
      "examples": [
          {
              "en": "Let's play it again.",
              "hanzi": "我们再玩一次。",
              "pinyin": "Wǒmen zài wán yīcì."
          },
          {
              "en": "I will call you again later.",
              "hanzi": "我会稍后再打电话给你。",
              "pinyin": "Wǒ huì shāohòu zài dǎ diànhuà gěi nǐ."
          },
          {
              "en": "Please repeat it again.",
              "hanzi": "请再重复一次。",
              "pinyin": "Qǐng zài chóngfù yīcì."
          }
      ]
  },
  {
      "hanzi": "同",
      "count": 182,
      "level": 198,
      "pinyin": "tóng",
      "tone_level": 2,
      "en": "same",
      "examples": [
          {
              "en": "We are in the same class.",
              "hanzi": "我们在同一个班。",
              "pinyin": "Wǒmen zài tóng yīgè bān."
          },
          {
              "en": "Our interests are the same.",
              "hanzi": "我们的兴趣相同。",
              "pinyin": "Wǒmen de xìngqù xiāngtóng."
          },
          {
              "en": "Do you have the same opinion?",
              "hanzi": "你有相同的看法吗？",
              "pinyin": "Nǐ yǒu xiāngtóng de kànfǎ ma?"
          }
      ]
  },
  {
      "hanzi": "周",
      "count": 65,
      "level": 199,
      "pinyin": "zhōu",
      "tone_level": 1,
      "en": "week",
      "examples": [
          {
              "en": "I go to the gym three times a week.",
              "hanzi": "我每周去健身房三次。",
              "pinyin": "Wǒ měi zhōu qù jiànshēnfáng sāncì."
          },
          {
              "en": "The meeting is scheduled for next week.",
              "hanzi": "会议安排在下周。",
              "pinyin": "Huìyì ānpái zài xiàzhōu."
          },
          {
              "en": "I have a busy week ahead.",
              "hanzi": "我这周很忙。",
              "pinyin": "Wǒ zhè zhōu hěn máng."
          }
      ]
  },
  {
      "hanzi": "王",
      "count": 34,
      "level": 200,
      "pinyin": "wáng",
      "tone_level": 2,
      "en": "king",
      "examples": [
          {
              "en": "The king ruled the kingdom with wisdom.",
              "hanzi": "国王以智慧统治王国。",
              "pinyin": "Guówáng yǐ zhìhuì tǒngzhì wángguó."
          },
          {
              "en": "She is the queen, and he is the king.",
              "hanzi": "她是皇后，他是国王。",
              "pinyin": "Tā shì huánghòu, tā shì guówáng."
          },
          {
              "en": "In the chess game, the king can move one step in any direction.",
              "hanzi": "在国际象棋中，国王可以向任何方向走一步。",
              "pinyin": "Zài guójì xiàngqí zhōng, guówáng kěyǐ xiàng rènhé fāngxiàng zǒu yībù."
          }
      ]
  },
  {
      "hanzi": "全",
      "count": 122,
      "level": 201,
      "pinyin": "quán",
      "tone_level": 2,
      "en": "whole",
      "examples": [
          {
              "en": "The whole family went on vacation.",
              "hanzi": "全家人去度假了。",
              "pinyin": "Quán jiā rén qù dùjià le."
          },
          {
              "en": "The project is now complete in its whole.",
              "hanzi": "这个项目现在整体完成了。",
              "pinyin": "Zhège xiàngmù xiànzài zhěngtǐ wánchéng le."
          },
          {
              "en": "She ate the whole cake by herself.",
              "hanzi": "她独自一人吃了整个蛋糕。",
              "pinyin": "Tā dúzì yīrén chī le zhěng gè dàngāo."
          }
      ]
  },
  {
      "hanzi": "主",
      "count": 93,
      "level": 202,
      "pinyin": "zhǔ",
      "tone_level": 3,
      "en": "main",
      "examples": [
          {
              "en": "He is the main character in the story.",
              "hanzi": "他是故事的主角。",
              "pinyin": "Tā shì gùshì de zhǔjiǎo."
          },
          {
              "en": "The main purpose of this meeting is to discuss the budget.",
              "hanzi": "此次会议的主要目的是讨论预算。",
              "pinyin": "Cǐ cì huìyì de zhǔyào mùdì shì tǎolùn yùsuàn."
          },
          {
              "en": "The main course for dinner is fish.",
              "hanzi": "晚餐的主菜是鱼。",
              "pinyin": "Wǎncān de zhǔ cài shì yú."
          }
      ]
  },
  {
      "hanzi": "住",
      "count": 97,
      "level": 203,
      "pinyin": "zhù",
      "tone_level": 4,
      "en": "live",
      "examples": [
          {
              "en": "I live in an apartment.",
              "hanzi": "我住在公寓里。",
              "pinyin": "Wǒ zhù zài gōngyù lǐ."
          },
          {
              "en": "They live in the countryside.",
              "hanzi": "他们住在乡下。",
              "pinyin": "Tāmen zhù zài xiāngxià."
          },
          {
              "en": "Do you live with roommates?",
              "hanzi": "你和室友一起住吗？",
              "pinyin": "Nǐ hé shìyǒu yīqǐ zhù ma?"
          }
      ]
  },
  {
      "hanzi": "注",
      "count": 48,
      "level": 204,
      "pinyin": "zhù",
      "tone_level": 4,
      "en": "pour",
      "examples": [
          {
              "en": "Please pour me a glass of water.",
              "hanzi": "请给我倒一杯水。",
              "pinyin": "Qǐng gěi wǒ dào yī bēi shuǐ."
          },
          {
              "en": "He poured the tea into the cup.",
              "hanzi": "他把茶倒进杯子里。",
              "pinyin": "Tā bǎ chá dào jìn bēizi lǐ."
          },
          {
              "en": "Careful, don't pour too much.",
              "hanzi": "小心，别倒太多。",
              "pinyin": "Xiǎoxīn, bié dào tài duō."
          }
      ]
  },
  {
      "hanzi": "玉",
      "count": 7,
      "level": 205,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "jade",
      "examples": [
          {
              "en": "She wore a jade necklace.",
              "hanzi": "她戴着一条玉项链。",
              "pinyin": "Tā dàizhe yī tiáo yù xiàngliàn."
          },
          {
              "en": "This is a beautiful piece of jade.",
              "hanzi": "这是一块漂亮的玉石。",
              "pinyin": "Zhè shì yī kuài piàoliang de yùshí."
          },
          {
              "en": "Jade is considered a symbol of beauty and purity.",
              "hanzi": "玉被认为是美丽和纯洁的象征。",
              "pinyin": "Yù bèi rènwéi shì měilì hé chúnjié de xiàngzhēng."
          }
      ]
  },
  {
      "hanzi": "国",
      "count": 598,
      "level": 206,
      "pinyin": "guó",
      "tone_level": 2,
      "en": "country",
      "examples": [
          {
              "en": "China is a big country.",
              "hanzi": "中国是一个大国。",
              "pinyin": "Zhōngguó shì yīgè dà guó."
          },
          {
              "en": "I want to travel to different countries.",
              "hanzi": "我想去不同的国家旅行。",
              "pinyin": "Wǒ xiǎng qù bùtóng de guójiā lǚxíng."
          },
          {
              "en": "Each country has its own culture.",
              "hanzi": "每个国家都有自己的文化。",
              "pinyin": "Měi gè guójiā dōu yǒu zìjǐ de wénhuà."
          }
      ]
  },
  {
      "hanzi": "回",
      "count": 211,
      "level": 207,
      "pinyin": "huí",
      "tone_level": 2,
      "en": "return",
      "examples": [
          {
              "en": "When will you return home?",
              "hanzi": "你什么时候回家？",
              "pinyin": "Nǐ shénme shíhòu huí jiā?"
          },
          {
              "en": "I'll return the book to you tomorrow.",
              "hanzi": "我明天会还书给你。",
              "pinyin": "Wǒ míngtiān huì huán shū gěi nǐ."
          },
          {
              "en": "He returned my phone after finding it.",
              "hanzi": "他找到我的手机后归还给我了。",
              "pinyin": "Tā zhǎodào wǒ de shǒujī hòu guīhuán gěi wǒ le."
          }
      ]
  },
  {
      "hanzi": "因",
      "count": 157,
      "level": 208,
      "pinyin": "yīn",
      "tone_level": 1,
      "en": "because"
  },
  {
      "hanzi": "嗯",
      "count": 10,
      "level": 209,
      "pinyin": "ēn",
      "tone_level": 1,
      "en": "uh"
  },
  {
      "hanzi": "行",
      "count": 250,
      "level": 210,
      "pinyin": "xíng",
      "tone_level": 2,
      "en": "to go"
  },
  {
      "hanzi": "得",
      "count": 535,
      "level": 211,
      "pinyin": "de",
      "tone_level": 2,
      "en": "to get"
  },
  {
      "hanzi": "往",
      "count": 74,
      "level": 212,
      "pinyin": "wǎng",
      "tone_level": 3,
      "en": "towards"
  },
  {
      "hanzi": "金",
      "count": 39,
      "level": 213,
      "pinyin": "jīn",
      "tone_level": 1,
      "en": "gold"
  },
  {
      "hanzi": "钟",
      "count": 54,
      "level": 214,
      "pinyin": "zhōng",
      "tone_level": 1,
      "en": "clock"
  },
  {
      "hanzi": "天",
      "count": 860,
      "level": 215,
      "pinyin": "tiān",
      "tone_level": 1,
      "en": "sky"
  },
  {
      "hanzi": "关",
      "count": 116,
      "level": 216,
      "pinyin": "guān",
      "tone_level": 1,
      "en": "pass"
  },
  {
      "hanzi": "送",
      "count": 51,
      "level": 217,
      "pinyin": "sòng",
      "tone_level": 4,
      "en": "to send"
  },
  {
      "hanzi": "开",
      "count": 353,
      "level": 218,
      "pinyin": "kāi",
      "tone_level": 1,
      "en": "to open"
  },
  {
      "hanzi": "算",
      "count": 78,
      "level": 219,
      "pinyin": "suàn",
      "tone_level": 4,
      "en": "to calculate"
  },
  {
      "hanzi": "并",
      "count": 27,
      "level": 220,
      "pinyin": "bìng",
      "tone_level": 4,
      "en": "and"
  },
  {
      "hanzi": "耳",
      "count": 5,
      "level": 221,
      "pinyin": "ěr",
      "tone_level": 3,
      "en": "ear"
  },
  {
      "hanzi": "闻",
      "count": 20,
      "level": 222,
      "pinyin": "wén",
      "tone_level": 2,
      "en": "to hear"
  },
  {
      "hanzi": "联",
      "count": 41,
      "level": 223,
      "pinyin": "lián",
      "tone_level": 2,
      "en": "connect"
  },
  {
      "hanzi": "系",
      "count": 55,
      "level": 224,
      "pinyin": "xì",
      "tone_level": 4,
      "en": "system"
  },
  {
      "hanzi": "女",
      "count": 229,
      "level": 225,
      "pinyin": "nǚ",
      "tone_level": 3,
      "en": "female"
  },
  {
      "hanzi": "妈",
      "count": 158,
      "level": 226,
      "pinyin": "mā",
      "tone_level": 1,
      "en": "mother"
  },
  {
      "hanzi": "好",
      "count": 777,
      "level": 227,
      "pinyin": "hǎo",
      "tone_level": 3,
      "en": "good"
  },
  {
      "hanzi": "始",
      "count": 85,
      "level": 228,
      "pinyin": "shǐ",
      "tone_level": 3,
      "en": "to start"
  },
  {
      "hanzi": "西",
      "count": 157,
      "level": 229,
      "pinyin": "xī",
      "tone_level": 1,
      "en": "west"
  },
  {
      "hanzi": "要",
      "count": 920,
      "level": 230,
      "pinyin": "yào",
      "tone_level": 4,
      "en": "to want"
  },
  {
      "hanzi": "如",
      "count": 168,
      "level": 231,
      "pinyin": "rú",
      "tone_level": 2,
      "en": "like"
  },
  {
      "hanzi": "她",
      "count": 375,
      "level": 232,
      "pinyin": "tā",
      "tone_level": 1,
      "en": "she"
  },
  {
      "hanzi": "楼",
      "count": 53,
      "level": 233,
      "pinyin": "lóu",
      "tone_level": 2,
      "en": "building"
  },
  {
      "hanzi": "又",
      "count": 121,
      "level": 234,
      "pinyin": "yòu",
      "tone_level": 4,
      "en": "again"
  },
  {
      "hanzi": "汉",
      "count": 66,
      "level": 235,
      "pinyin": "hàn",
      "tone_level": 4,
      "en": "Chinese"
  },
  {
      "hanzi": "对",
      "count": 309,
      "level": 236,
      "pinyin": "duì",
      "tone_level": 4,
      "en": "correct"
  },
  {
      "hanzi": "没",
      "count": 477,
      "level": 237,
      "pinyin": "méi",
      "tone_level": 2,
      "en": "not"
  },
  {
      "hanzi": "取",
      "count": 45,
      "level": 238,
      "pinyin": "qǔ",
      "tone_level": 3,
      "en": "to take"
  },
  {
      "hanzi": "最",
      "count": 270,
      "level": 239,
      "pinyin": "zuì",
      "tone_level": 4,
      "en": "most"
  },
  {
      "hanzi": "曼",
      "count": 0,
      "level": 240,
      "pinyin": "màn",
      "tone_level": 4,
      "en": "slow"
  },
  {
      "hanzi": "慢",
      "count": 28,
      "level": 241,
      "pinyin": "màn",
      "tone_level": 4,
      "en": "slow"
  },
  {
      "hanzi": "支",
      "count": 37,
      "level": 242,
      "pinyin": "zhī",
      "tone_level": 1,
      "en": "to support"
  },
  {
      "hanzi": "皮",
      "count": 14,
      "level": 243,
      "pinyin": "pí",
      "tone_level": 2,
      "en": "skin"
  },
  {
      "hanzi": "书",
      "count": 146,
      "level": 244,
      "pinyin": "shū",
      "tone_level": 1,
      "en": "book"
  },
  {
      "hanzi": "有",
      "count": 1366,
      "level": 245,
      "pinyin": "yǒu",
      "tone_level": 3,
      "en": "to have"
  },
  {
      "hanzi": "随",
      "count": 51,
      "level": 246,
      "pinyin": "suí",
      "tone_level": 2,
      "en": "to follow"
  },
  {
      "hanzi": "友",
      "count": 202,
      "level": 247,
      "pinyin": "yǒu",
      "tone_level": 3,
      "en": "friend"
  },
  {
      "hanzi": "发",
      "count": 279,
      "level": 248,
      "pinyin": "fā",
      "tone_level": 1,
      "en": "to send out"
  },
  {
      "hanzi": "六",
      "count": 27,
      "level": 249,
      "pinyin": "liù",
      "tone_level": 4,
      "en": "six"
  },
  {
      "hanzi": "言",
      "count": 40,
      "level": 250,
      "pinyin": "yán",
      "tone_level": 2,
      "en": "words"
  },
  {
      "hanzi": "信",
      "count": 121,
      "level": 251,
      "pinyin": "xìn",
      "tone_level": 4,
      "en": "letter"
  },
  {
      "hanzi": "文",
      "count": 131,
      "level": 252,
      "pinyin": "wén",
      "tone_level": 2,
      "en": "culture"
  },
  {
      "hanzi": "这",
      "count": 1632,
      "level": 253,
      "pinyin": "zhè",
      "tone_level": 4,
      "en": "this"
  },
  {
      "hanzi": "父",
      "count": 88,
      "level": 254,
      "pinyin": "fù",
      "tone_level": 4,
      "en": "father"
  },
  {
      "hanzi": "交",
      "count": 86,
      "level": 255,
      "pinyin": "jiāo",
      "tone_level": 1,
      "en": "to hand over"
  },
  {
      "hanzi": "校",
      "count": 102,
      "level": 256,
      "pinyin": "xiào",
      "tone_level": 4,
      "en": "school"
  },
  {
      "hanzi": "风",
      "count": 49,
      "level": 257,
      "pinyin": "fēng",
      "tone_level": 1,
      "en": "wind"
  },
  {
      "hanzi": "网",
      "count": 38,
      "level": 258,
      "pinyin": "wǎng",
      "tone_level": 3,
      "en": "internet"
  },
  {
      "hanzi": "那",
      "count": 355,
      "level": 259,
      "pinyin": "nà",
      "tone_level": 4,
      "en": "that"
  },
  {
      "hanzi": "哪",
      "count": 93,
      "level": 260,
      "pinyin": "nǎ",
      "tone_level": 3,
      "en": "which"
  },
  {
      "hanzi": "衣",
      "count": 106,
      "level": 261,
      "pinyin": "yī",
      "tone_level": 1,
      "en": "clothes"
  },
  {
      "hanzi": "袋",
      "count": 20,
      "level": 262,
      "pinyin": "dài",
      "tone_level": 4,
      "en": "bag"
  },
  {
      "hanzi": "被",
      "count": 139,
      "level": 263,
      "pinyin": "bèi",
      "tone_level": 4,
      "en": "by"
  },
  {
      "hanzi": "艮",
      "count": 0,
      "level": 264,
      "pinyin": "gěn",
      "tone_level": 3,
      "en": "to halt"
  },
  {
      "hanzi": "很",
      "count": 1016,
      "level": 265,
      "pinyin": "hěn",
      "tone_level": 3,
      "en": "very"
  },
  {
      "hanzi": "银",
      "count": 36,
      "level": 266,
      "pinyin": "yín",
      "tone_level": 2,
      "en": "silver"
  },
  {
      "hanzi": "长",
      "count": 204,
      "level": 267,
      "pinyin": "cháng",
      "tone_level": 2,
      "en": "long"
  },
  {
      "hanzi": "报",
      "count": 43,
      "level": 268,
      "pinyin": "bào",
      "tone_level": 4,
      "en": "to report"
  },
  {
      "hanzi": "服",
      "count": 139,
      "level": 269,
      "pinyin": "fú",
      "tone_level": 2,
      "en": "clothing"
  },
  {
      "hanzi": "元",
      "count": 49,
      "level": 270,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "yuan"
  },
  {
      "hanzi": "远",
      "count": 39,
      "level": 271,
      "pinyin": "yuǎn",
      "tone_level": 3,
      "en": "far"
  },
  {
      "hanzi": "玩",
      "count": 96,
      "level": 272,
      "pinyin": "wán",
      "tone_level": 2,
      "en": "to play"
  },
  {
      "hanzi": "园",
      "count": 82,
      "level": 273,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "garden"
  },
  {
      "hanzi": "完",
      "count": 159,
      "level": 274,
      "pinyin": "wán",
      "tone_level": 2,
      "en": "to finish"
  },
  {
      "hanzi": "院",
      "count": 64,
      "level": 275,
      "pinyin": "yuàn",
      "tone_level": 4,
      "en": "yard"
  },
  {
      "hanzi": "字",
      "count": 84,
      "level": 276,
      "pinyin": "zì",
      "tone_level": 4,
      "en": "character"
  },
  {
      "hanzi": "定",
      "count": 251,
      "level": 277,
      "pinyin": "dìng",
      "tone_level": 4,
      "en": "to decide"
  },
  {
      "hanzi": "安",
      "count": 65,
      "level": 278,
      "pinyin": "ān",
      "tone_level": 1,
      "en": "safe"
  },
  {
      "hanzi": "寄",
      "count": 10,
      "level": 279,
      "pinyin": "jì",
      "tone_level": 4,
      "en": "to send"
  },
  {
      "hanzi": "宝",
      "count": 46,
      "level": 280,
      "pinyin": "bǎo",
      "tone_level": 3,
      "en": "treasure"
  },
  {
      "hanzi": "匕",
      "count": 0,
      "level": 281,
      "pinyin": "bǐ",
      "tone_level": 3,
      "en": "dagger"
  },
  {
      "hanzi": "比",
      "count": 200,
      "level": 282,
      "pinyin": "bǐ",
      "tone_level": 3,
      "en": "to compare"
  },
  {
      "hanzi": "它",
      "count": 79,
      "level": 283,
      "pinyin": "tā",
      "tone_level": 1,
      "en": "it"
  },
  {
      "hanzi": "此",
      "count": 23,
      "level": 284,
      "pinyin": "cǐ",
      "tone_level": 3,
      "en": "this"
  },
  {
      "hanzi": "些",
      "count": 220,
      "level": 285,
      "pinyin": "xiē",
      "tone_level": 1,
      "en": "some"
  },
  {
      "hanzi": "能",
      "count": 475,
      "level": 286,
      "pinyin": "néng",
      "tone_level": 2,
      "en": "can"
  },
  {
      "hanzi": "夕",
      "count": 2,
      "level": 287,
      "pinyin": "xī",
      "tone_level": 1,
      "en": "sunset"
  },
  {
      "hanzi": "多",
      "count": 653,
      "level": 288,
      "pinyin": "duō",
      "tone_level": 1,
      "en": "many"
  },
  {
      "hanzi": "名",
      "count": 137,
      "level": 289,
      "pinyin": "míng",
      "tone_level": 2,
      "en": "name"
  },
  {
      "hanzi": "够",
      "count": 50,
      "level": 290,
      "pinyin": "gòu",
      "tone_level": 4,
      "en": "enough"
  },
  {
      "hanzi": "外",
      "count": 240,
      "level": 291,
      "pinyin": "wài",
      "tone_level": 4,
      "en": "outside"
  },
  {
      "hanzi": "歹",
      "count": 0,
      "level": 292,
      "pinyin": "dǎi",
      "tone_level": 3,
      "en": "evil"
  },
  {
      "hanzi": "死",
      "count": 46,
      "level": 293,
      "pinyin": "sǐ",
      "tone_level": 3,
      "en": "to die"
  },
  {
      "hanzi": "少",
      "count": 129,
      "level": 294,
      "pinyin": "shǎo",
      "tone_level": 3,
      "en": "few"
  },
  {
      "hanzi": "吵",
      "count": 14,
      "level": 295,
      "pinyin": "chǎo",
      "tone_level": 3,
      "en": "noisy"
  },
  {
      "hanzi": "步",
      "count": 53,
      "level": 296,
      "pinyin": "bù",
      "tone_level": 4,
      "en": "step"
  },
  {
      "hanzi": "贝",
      "count": 11,
      "level": 297,
      "pinyin": "bèi",
      "tone_level": 4,
      "en": "shell"
  },
  {
      "hanzi": "员",
      "count": 130,
      "level": 298,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "employee"
  },
  {
      "hanzi": "贵",
      "count": 36,
      "level": 299,
      "pinyin": "guì",
      "tone_level": 4,
      "en": "expensive"
  },
  {
      "hanzi": "页",
      "count": 6,
      "level": 300,
      "pinyin": "yè",
      "tone_level": 4,
      "en": "page"
  },
  {
      "hanzi": "题",
      "count": 128,
      "level": 301,
      "pinyin": "tí",
      "tone_level": 2,
      "en": "question"
  },
  {
      "hanzi": "见",
      "count": 148,
      "level": 302,
      "pinyin": "jiàn",
      "tone_level": 4,
      "en": "see"
  },
  {
      "hanzi": "现",
      "count": 288,
      "level": 303,
      "pinyin": "xiàn",
      "tone_level": 4,
      "en": "present"
  },
  {
      "hanzi": "首",
      "count": 28,
      "level": 304,
      "pinyin": "shǒu",
      "tone_level": 3,
      "en": "head"
  },
  {
      "hanzi": "道",
      "count": 230,
      "level": 305,
      "pinyin": "dào",
      "tone_level": 4,
      "en": "way"
  },
  {
      "hanzi": "直",
      "count": 118,
      "level": 306,
      "pinyin": "zhí",
      "tone_level": 2,
      "en": "straight"
  },
  {
      "hanzi": "真",
      "count": 201,
      "level": 307,
      "pinyin": "zhēn",
      "tone_level": 1,
      "en": "true"
  },
  {
      "hanzi": "廿",
      "count": 0,
      "level": 308,
      "pinyin": "niàn",
      "tone_level": 4,
      "en": "twenty"
  },
  {
      "hanzi": "甘",
      "count": 1,
      "level": 309,
      "pinyin": "gān",
      "tone_level": 1,
      "en": "sweet"
  },
  {
      "hanzi": "某",
      "count": 8,
      "level": 310,
      "pinyin": "mǒu",
      "tone_level": 3,
      "en": "certain"
  },
  {
      "hanzi": "其",
      "count": 47,
      "level": 311,
      "pinyin": "qí",
      "tone_level": 2,
      "en": "its"
  },
  {
      "hanzi": "期",
      "count": 86,
      "level": 312,
      "pinyin": "qī",
      "tone_level": 1,
      "en": "period"
  },
  {
      "hanzi": "厂",
      "count": 9,
      "level": 313,
      "pinyin": "chǎng",
      "tone_level": 3,
      "en": "factory"
  },
  {
      "hanzi": "厌",
      "count": 14,
      "level": 314,
      "pinyin": "yàn",
      "tone_level": 4,
      "en": "dislike"
  },
  {
      "hanzi": "斤",
      "count": 12,
      "level": 315,
      "pinyin": "jīn",
      "tone_level": 1,
      "en": "catty"
  },
  {
      "hanzi": "听",
      "count": 184,
      "level": 316,
      "pinyin": "tīng",
      "tone_level": 1,
      "en": "listen"
  },
  {
      "hanzi": "近",
      "count": 102,
      "level": 317,
      "pinyin": "jìn",
      "tone_level": 4,
      "en": "near"
  },
  {
      "hanzi": "诉",
      "count": 36,
      "level": 318,
      "pinyin": "sù",
      "tone_level": 4,
      "en": "complain"
  },
  {
      "hanzi": "后",
      "count": 334,
      "level": 319,
      "pinyin": "hòu",
      "tone_level": 4,
      "en": "after"
  },
  {
      "hanzi": "厚",
      "count": 9,
      "level": 320,
      "pinyin": "hòu",
      "tone_level": 4,
      "en": "thick"
  },
  {
      "hanzi": "反",
      "count": 33,
      "level": 321,
      "pinyin": "fǎn",
      "tone_level": 3,
      "en": "opposite"
  },
  {
      "hanzi": "饭",
      "count": 238,
      "level": 322,
      "pinyin": "fàn",
      "tone_level": 4,
      "en": "rice"
  },
  {
      "hanzi": "饱",
      "count": 10,
      "level": 323,
      "pinyin": "bǎo",
      "tone_level": 3,
      "en": "full"
  },
  {
      "hanzi": "饿",
      "count": 21,
      "level": 324,
      "pinyin": "è",
      "tone_level": 4,
      "en": "hungry"
  },
  {
      "hanzi": "工",
      "count": 386,
      "level": 325,
      "pinyin": "gōng",
      "tone_level": 1,
      "en": "work"
  },
  {
      "hanzi": "江",
      "count": 16,
      "level": 326,
      "pinyin": "jiāng",
      "tone_level": 1,
      "en": "river"
  },
  {
      "hanzi": "左",
      "count": 23,
      "level": 327,
      "pinyin": "zuǒ",
      "tone_level": 3,
      "en": "left"
  },
  {
      "hanzi": "右",
      "count": 29,
      "level": 328,
      "pinyin": "yòu",
      "tone_level": 4,
      "en": "right"
  },
  {
      "hanzi": "差",
      "count": 68,
      "level": 329,
      "pinyin": "chà",
      "tone_level": 4,
      "en": "different"
  },
  {
      "hanzi": "红",
      "count": 86,
      "level": 330,
      "pinyin": "hóng",
      "tone_level": 2,
      "en": "red"
  },
  {
      "hanzi": "约",
      "count": 51,
      "level": 331,
      "pinyin": "yuē",
      "tone_level": 1,
      "en": "约"
  },
  {
      "hanzi": "合",
      "count": 67,
      "level": 332,
      "pinyin": "hé",
      "tone_level": 2,
      "en": "together"
  },
  {
      "hanzi": "给",
      "count": 291,
      "level": 333,
      "pinyin": "gěi",
      "tone_level": 3,
      "en": "give"
  },
  {
      "hanzi": "拿",
      "count": 63,
      "level": 334,
      "pinyin": "ná",
      "tone_level": 2,
      "en": "take"
  },
  {
      "hanzi": "穴",
      "count": 1,
      "level": 335,
      "pinyin": "xué",
      "tone_level": 2,
      "en": "cave"
  },
  {
      "hanzi": "穿",
      "count": 61,
      "level": 336,
      "pinyin": "chuān",
      "tone_level": 1,
      "en": "wear"
  },
  {
      "hanzi": "空",
      "count": 75,
      "level": 337,
      "pinyin": "kōng",
      "tone_level": 1,
      "en": "empty"
  },
  {
      "hanzi": "深",
      "count": 30,
      "level": 338,
      "pinyin": "shēn",
      "tone_level": 1,
      "en": "deep"
  },
  {
      "hanzi": "式",
      "count": 26,
      "level": 339,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "style"
  },
  {
      "hanzi": "试",
      "count": 67,
      "level": 340,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "try"
  },
  {
      "hanzi": "刀",
      "count": 17,
      "level": 341,
      "pinyin": "dāo",
      "tone_level": 1,
      "en": "knife"
  },
  {
      "hanzi": "分",
      "count": 221,
      "level": 342,
      "pinyin": "fèn",
      "tone_level": 1,
      "en": "divide"
  },
  {
      "hanzi": "份",
      "count": 51,
      "level": 343,
      "pinyin": "fèn",
      "tone_level": 4,
      "en": "portion"
  },
  {
      "hanzi": "切",
      "count": 33,
      "level": 344,
      "pinyin": "qiè",
      "tone_level": 4,
      "en": "cut"
  },
  {
      "hanzi": "划",
      "count": 67,
      "level": 345,
      "pinyin": "huà",
      "tone_level": 2,
      "en": "draw"
  },
  {
      "hanzi": "别",
      "count": 298,
      "level": 346,
      "pinyin": "bié",
      "tone_level": 2,
      "en": "other"
  },
  {
      "hanzi": "刚",
      "count": 70,
      "level": 347,
      "pinyin": "gāng",
      "tone_level": 1,
      "en": "just"
  },
  {
      "hanzi": "班",
      "count": 98,
      "level": 348,
      "pinyin": "bān",
      "tone_level": 1,
      "en": "class"
  },
  {
      "hanzi": "前",
      "count": 234,
      "level": 349,
      "pinyin": "qián",
      "tone_level": 2,
      "en": "before"
  },
  {
      "hanzi": "召",
      "count": 6,
      "level": 350,
      "pinyin": "zhào",
      "tone_level": 4,
      "en": "summon"
  },
  {
      "hanzi": "绍",
      "count": 15,
      "level": 351,
      "pinyin": "shào",
      "tone_level": 4,
      "en": "introduce"
  },
  {
      "hanzi": "照",
      "count": 83,
      "level": 352,
      "pinyin": "zhào",
      "tone_level": 4,
      "en": "illuminate"
  },
  {
      "hanzi": "片",
      "count": 53,
      "level": 353,
      "pinyin": "piàn",
      "tone_level": 4,
      "en": "slice"
  },
  {
      "hanzi": "至",
      "count": 12,
      "level": 354,
      "pinyin": "zhì",
      "tone_level": 4,
      "en": "to"
  },
  {
      "hanzi": "到",
      "count": 632,
      "level": 355,
      "pinyin": "dào",
      "tone_level": 4,
      "en": "arrive"
  },
  {
      "hanzi": "井",
      "count": 1,
      "level": 356,
      "pinyin": "jǐng",
      "tone_level": 3,
      "en": "well"
  },
  {
      "hanzi": "进",
      "count": 157,
      "level": 357,
      "pinyin": "jìn",
      "tone_level": 4,
      "en": "enter"
  },
  {
      "hanzi": "山",
      "count": 59,
      "level": 358,
      "pinyin": "shān",
      "tone_level": 1,
      "en": "mountain"
  },
  {
      "hanzi": "出",
      "count": 460,
      "level": 359,
      "pinyin": "chū",
      "tone_level": 1,
      "en": "exit"
  },
  {
      "hanzi": "岁",
      "count": 70,
      "level": 360,
      "pinyin": "suì",
      "tone_level": 4,
      "en": "year"
  },
  {
      "hanzi": "亦",
      "count": 0,
      "level": 361,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "also"
  },
  {
      "hanzi": "变",
      "count": 121,
      "level": 362,
      "pinyin": "biàn",
      "tone_level": 4,
      "en": "change"
  },
  {
      "hanzi": "田",
      "count": 4,
      "level": 363,
      "pinyin": "tián",
      "tone_level": 2,
      "en": "field"
  },
  {
      "hanzi": "果",
      "count": 171,
      "level": 364,
      "pinyin": "guǒ",
      "tone_level": 3,
      "en": "fruit"
  },
  {
      "hanzi": "课",
      "count": 89,
      "level": 365,
      "pinyin": "kè",
      "tone_level": 4,
      "en": "lesson"
  },
  {
      "hanzi": "思",
      "count": 86,
      "level": 366,
      "pinyin": "sī",
      "tone_level": 1,
      "en": "think"
  },
  {
      "hanzi": "单",
      "count": 72,
      "level": 367,
      "pinyin": "dān",
      "tone_level": 1,
      "en": "single"
  },
  {
      "hanzi": "鱼",
      "count": 40,
      "level": 368,
      "pinyin": "yú",
      "tone_level": 2,
      "en": "fish"
  },
  {
      "hanzi": "男",
      "count": 93,
      "level": 369,
      "pinyin": "nán",
      "tone_level": 2,
      "en": "male"
  },
  {
      "hanzi": "累",
      "count": 26,
      "level": 370,
      "pinyin": "lèi",
      "tone_level": 4,
      "en": "tired"
  },
  {
      "hanzi": "花",
      "count": 128,
      "level": 371,
      "pinyin": "huā",
      "tone_level": 1,
      "en": "flower"
  },
  {
      "hanzi": "草",
      "count": 30,
      "level": 372,
      "pinyin": "cǎo",
      "tone_level": 3,
      "en": "grass"
  },
  {
      "hanzi": "猫",
      "count": 40,
      "level": 373,
      "pinyin": "māo",
      "tone_level": 1,
      "en": "cat"
  },
  {
      "hanzi": "药",
      "count": 42,
      "level": 374,
      "pinyin": "yào",
      "tone_level": 4,
      "en": "medicine"
  },
  {
      "hanzi": "宽",
      "count": 11,
      "level": 375,
      "pinyin": "kuān",
      "tone_level": 1,
      "en": "wide"
  },
  {
      "hanzi": "采",
      "count": 7,
      "level": 376,
      "pinyin": "cǎi",
      "tone_level": 3,
      "en": "pick"
  },
  {
      "hanzi": "菜",
      "count": 87,
      "level": 377,
      "pinyin": "cài",
      "tone_level": 4,
      "en": "vegetable"
  },
  {
      "hanzi": "受",
      "count": 68,
      "level": 378,
      "pinyin": "shòu",
      "tone_level": 4,
      "en": "receive"
  },
  {
      "hanzi": "爱",
      "count": 136,
      "level": 379,
      "pinyin": "ài",
      "tone_level": 4,
      "en": "love"
  },
  {
      "hanzi": "共",
      "count": 50,
      "level": 380,
      "pinyin": "gòng",
      "tone_level": 4,
      "en": "together"
  },
  {
      "hanzi": "借",
      "count": 26,
      "level": 381,
      "pinyin": "jiè",
      "tone_level": 4,
      "en": "borrow"
  },
  {
      "hanzi": "错",
      "count": 85,
      "level": 382,
      "pinyin": "cuò",
      "tone_level": 4,
      "en": "wrong"
  },
  {
      "hanzi": "收",
      "count": 80,
      "level": 383,
      "pinyin": "shōu",
      "tone_level": 1,
      "en": "collect"
  },
  {
      "hanzi": "改",
      "count": 53,
      "level": 384,
      "pinyin": "gǎi",
      "tone_level": 3,
      "en": "change"
  },
  {
      "hanzi": "数",
      "count": 59,
      "level": 385,
      "pinyin": "shù",
      "tone_level": 4,
      "en": "number"
  },
  {
      "hanzi": "古",
      "count": 29,
      "level": 386,
      "pinyin": "gǔ",
      "tone_level": 3,
      "en": "ancient"
  },
  {
      "hanzi": "苦",
      "count": 32,
      "level": 387,
      "pinyin": "kǔ",
      "tone_level": 3,
      "en": "bitter"
  },
  {
      "hanzi": "做",
      "count": 343,
      "level": 388,
      "pinyin": "zuò",
      "tone_level": 4,
      "en": "do"
  },
  {
      "hanzi": "者",
      "count": 34,
      "level": 389,
      "pinyin": "zhě",
      "tone_level": 3,
      "en": "person"
  },
  {
      "hanzi": "猪",
      "count": 25,
      "level": 390,
      "pinyin": "zhū",
      "tone_level": 1,
      "en": "pig"
  },
  {
      "hanzi": "都",
      "count": 790,
      "level": 391,
      "pinyin": "dōu",
      "tone_level": 1,
      "en": "both"
  },
  {
      "hanzi": "老",
      "count": 335,
      "level": 392,
      "pinyin": "lǎo",
      "tone_level": 3,
      "en": "old"
  },
  {
      "hanzi": "孝",
      "count": 1,
      "level": 393,
      "pinyin": "xiào",
      "tone_level": 4,
      "en": "filial piety"
  },
  {
      "hanzi": "教",
      "count": 69,
      "level": 394,
      "pinyin": "jiào",
      "tone_level": 1,
      "en": "teach"
  },
  {
      "hanzi": "五",
      "count": 75,
      "level": 395,
      "pinyin": "wǔ",
      "tone_level": 3,
      "en": "five"
  },
  {
      "hanzi": "语",
      "count": 126,
      "level": 396,
      "pinyin": "yǔ",
      "tone_level": 3,
      "en": "language"
  },
  {
      "hanzi": "广",
      "count": 48,
      "level": 397,
      "pinyin": "guǎng",
      "tone_level": 3,
      "en": "wide"
  },
  {
      "hanzi": "床",
      "count": 37,
      "level": 398,
      "pinyin": "chuáng",
      "tone_level": 1,
      "en": "bed"
  },
  {
      "hanzi": "店",
      "count": 86,
      "level": 399,
      "pinyin": "diàn",
      "tone_level": 4,
      "en": "store"
  },
  {
      "hanzi": "应",
      "count": 146,
      "level": 400,
      "pinyin": "yīng",
      "tone_level": 1,
      "en": "should"
  },
  {
      "hanzi": "兴",
      "count": 36,
      "level": 401,
      "pinyin": "xīng",
      "tone_level": 1,
      "en": "to prosper"
  },
  {
      "hanzi": "学",
      "count": 528,
      "level": 402,
      "pinyin": "xué",
      "tone_level": 2,
      "en": "to learn"
  },
  {
      "hanzi": "觉",
      "count": 164,
      "level": 403,
      "pinyin": "jué",
      "tone_level": 2,
      "en": "to feel"
  },
  {
      "hanzi": "亥",
      "count": 0,
      "level": 404,
      "pinyin": "hài",
      "tone_level": 4,
      "en": "12th Earthly Branch"
  },
  {
      "hanzi": "该",
      "count": 127,
      "level": 405,
      "pinyin": "gāi",
      "tone_level": 1,
      "en": "should"
  },
  {
      "hanzi": "孩",
      "count": 215,
      "level": 406,
      "pinyin": "hái",
      "tone_level": 2,
      "en": "child"
  },
  {
      "hanzi": "水",
      "count": 156,
      "level": 407,
      "pinyin": "shuǐ",
      "tone_level": 3,
      "en": "water"
  },
  {
      "hanzi": "冰",
      "count": 21,
      "level": 408,
      "pinyin": "bīng",
      "tone_level": 1,
      "en": "ice"
  },
  {
      "hanzi": "求",
      "count": 44,
      "level": 409,
      "pinyin": "qiú",
      "tone_level": 2,
      "en": "to seek"
  },
  {
      "hanzi": "球",
      "count": 96,
      "level": 410,
      "pinyin": "qiú",
      "tone_level": 2,
      "en": "ball"
  },
  {
      "hanzi": "救",
      "count": 25,
      "level": 411,
      "pinyin": "jiù",
      "tone_level": 4,
      "en": "to save"
  },
  {
      "hanzi": "火",
      "count": 78,
      "level": 412,
      "pinyin": "huǒ",
      "tone_level": 3,
      "en": "fire"
  },
  {
      "hanzi": "灯",
      "count": 12,
      "level": 413,
      "pinyin": "dēng",
      "tone_level": 1,
      "en": "lamp"
  },
  {
      "hanzi": "烦",
      "count": 33,
      "level": 414,
      "pinyin": "fán",
      "tone_level": 2,
      "en": "annoyed"
  },
  {
      "hanzi": "里",
      "count": 511,
      "level": 415,
      "pinyin": "lǐ",
      "tone_level": 3,
      "en": "inside"
  },
  {
      "hanzi": "重",
      "count": 174,
      "level": 416,
      "pinyin": "zhòng",
      "tone_level": 4,
      "en": "heavy"
  },
  {
      "hanzi": "懂",
      "count": 35,
      "level": 417,
      "pinyin": "dǒng",
      "tone_level": 3,
      "en": "to understand"
  },
  {
      "hanzi": "黑",
      "count": 30,
      "level": 418,
      "pinyin": "hēi",
      "tone_level": 1,
      "en": "black"
  },
  {
      "hanzi": "乍",
      "count": 0,
      "level": 419,
      "pinyin": "zhà",
      "tone_level": 4,
      "en": "suddenly"
  },
  {
      "hanzi": "作",
      "count": 380,
      "level": 420,
      "pinyin": "zuò",
      "tone_level": 4,
      "en": "to do"
  },
  {
      "hanzi": "昨",
      "count": 58,
      "level": 421,
      "pinyin": "zuó",
      "tone_level": 2,
      "en": "yesterday"
  },
  {
      "hanzi": "怎",
      "count": 102,
      "level": 422,
      "pinyin": "zěn",
      "tone_level": 3,
      "en": "how"
  },
  {
      "hanzi": "窄",
      "count": 2,
      "level": 423,
      "pinyin": "zhǎi",
      "tone_level": 3,
      "en": "narrow"
  },
  {
      "hanzi": "丰",
      "count": 16,
      "level": 424,
      "pinyin": "fēng",
      "tone_level": 1,
      "en": "abundant"
  },
  {
      "hanzi": "青",
      "count": 11,
      "level": 425,
      "pinyin": "qīng",
      "tone_level": 1,
      "en": "blue/green"
  },
  {
      "hanzi": "请",
      "count": 171,
      "level": 426,
      "pinyin": "qǐng",
      "tone_level": 3,
      "en": "please"
  },
  {
      "hanzi": "情",
      "count": 221,
      "level": 427,
      "pinyin": "qíng",
      "tone_level": 2,
      "en": "feeling"
  },
  {
      "hanzi": "表",
      "count": 67,
      "level": 428,
      "pinyin": "biǎo",
      "tone_level": 3,
      "en": "表 (表达 - express)"
  },
  {
      "hanzi": "生",
      "count": 478,
      "level": 429,
      "pinyin": "shēng",
      "tone_level": 1,
      "en": "life"
  },
  {
      "hanzi": "星",
      "count": 46,
      "level": 430,
      "pinyin": "xīng",
      "tone_level": 1,
      "en": "star"
  },
  {
      "hanzi": "姓",
      "count": 8,
      "level": 431,
      "pinyin": "xìng",
      "tone_level": 4,
      "en": "surname"
  },
  {
      "hanzi": "免",
      "count": 17,
      "level": 432,
      "pinyin": "miǎn",
      "tone_level": 3,
      "en": "to exempt"
  },
  {
      "hanzi": "晚",
      "count": 151,
      "level": 433,
      "pinyin": "wǎn",
      "tone_level": 3,
      "en": "evening"
  },
  {
      "hanzi": "家",
      "count": 650,
      "level": 434,
      "pinyin": "jiā",
      "tone_level": 1,
      "en": "home"
  },
  {
      "hanzi": "象",
      "count": 46,
      "level": 435,
      "pinyin": "xiàng",
      "tone_level": 4,
      "en": "elephant"
  },
  {
      "hanzi": "像",
      "count": 66,
      "level": 436,
      "pinyin": "xiàng",
      "tone_level": 4,
      "en": "to resemble"
  },
  {
      "hanzi": "头",
      "count": 105,
      "level": 437,
      "pinyin": "tóu",
      "tone_level": 2,
      "en": "head"
  },
  {
      "hanzi": "实",
      "count": 104,
      "level": 438,
      "pinyin": "shí",
      "tone_level": 2,
      "en": "real"
  },
  {
      "hanzi": "买",
      "count": 185,
      "level": 439,
      "pinyin": "mǎi",
      "tone_level": 3,
      "en": "to buy"
  },
  {
      "hanzi": "卖",
      "count": 33,
      "level": 440,
      "pinyin": "mài",
      "tone_level": 4,
      "en": "to sell"
  },
  {
      "hanzi": "读",
      "count": 54,
      "level": 441,
      "pinyin": "dú",
      "tone_level": 2,
      "en": "to read"
  },
  {
      "hanzi": "牛",
      "count": 39,
      "level": 442,
      "pinyin": "niú",
      "tone_level": 2,
      "en": "cow"
  },
  {
      "hanzi": "特",
      "count": 105,
      "level": 443,
      "pinyin": "tè",
      "tone_level": 4,
      "en": "special"
  },
  {
      "hanzi": "件",
      "count": 157,
      "level": 444,
      "pinyin": "jiàn",
      "tone_level": 4,
      "en": "item"
  },
  {
      "hanzi": "告",
      "count": 55,
      "level": 445,
      "pinyin": "gào",
      "tone_level": 4,
      "en": "to tell"
  },
  {
      "hanzi": "先",
      "count": 84,
      "level": 446,
      "pinyin": "xiān",
      "tone_level": 1,
      "en": "first"
  },
  {
      "hanzi": "洗",
      "count": 23,
      "level": 447,
      "pinyin": "xǐ",
      "tone_level": 3,
      "en": "to wash"
  },
  {
      "hanzi": "角",
      "count": 11,
      "level": 448,
      "pinyin": "jué",
      "tone_level": 3,
      "en": "corner"
  },
  {
      "hanzi": "解",
      "count": 74,
      "level": 449,
      "pinyin": "jiě",
      "tone_level": 3,
      "en": "to solve"
  },
  {
      "hanzi": "当",
      "count": 101,
      "level": 450,
      "pinyin": "dāng",
      "tone_level": 1,
      "en": "to be"
  },
  {
      "hanzi": "扫",
      "count": 10,
      "level": 451,
      "pinyin": "sǎo",
      "tone_level": 3,
      "en": "to sweep"
  },
  {
      "hanzi": "事",
      "count": 375,
      "level": 452,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "thing"
  },
  {
      "hanzi": "史",
      "count": 19,
      "level": 453,
      "pinyin": "shǐ",
      "tone_level": 3,
      "en": "history"
  },
  {
      "hanzi": "使",
      "count": 46,
      "level": 454,
      "pinyin": "shǐ",
      "tone_level": 3,
      "en": "to use"
  },
  {
      "hanzi": "更",
      "count": 99,
      "level": 455,
      "pinyin": "gèng",
      "tone_level": 1,
      "en": "more"
  },
  {
      "hanzi": "便",
      "count": 66,
      "level": 456,
      "pinyin": "biàn",
      "tone_level": 4,
      "en": "convenient"
  },
  {
      "hanzi": "石",
      "count": 29,
      "level": 457,
      "pinyin": "shí",
      "tone_level": 2,
      "en": "stone"
  },
  {
      "hanzi": "硬",
      "count": 5,
      "level": 458,
      "pinyin": "yìng",
      "tone_level": 4,
      "en": "hard"
  },
  {
      "hanzi": "车",
      "count": 215,
      "level": 459,
      "pinyin": "chē",
      "tone_level": 1,
      "en": "car"
  },
  {
      "hanzi": "连",
      "count": 32,
      "level": 460,
      "pinyin": "lián",
      "tone_level": 2,
      "en": "to connect"
  },
  {
      "hanzi": "辆",
      "count": 38,
      "level": 461,
      "pinyin": "liàng",
      "tone_level": 4,
      "en": "vehicle"
  },
  {
      "hanzi": "较",
      "count": 35,
      "level": 462,
      "pinyin": "jiào",
      "tone_level": 4,
      "en": "comparatively"
  },
  {
      "hanzi": "轻",
      "count": 81,
      "level": 463,
      "pinyin": "qīng",
      "tone_level": 1,
      "en": "light"
  },
  {
      "hanzi": "经",
      "count": 306,
      "level": 464,
      "pinyin": "jīng",
      "tone_level": 1,
      "en": "to pass through"
  },
  {
      "hanzi": "与",
      "count": 24,
      "level": 465,
      "pinyin": "yǔ",
      "tone_level": 3,
      "en": "and"
  },
  {
      "hanzi": "写",
      "count": 81,
      "level": 466,
      "pinyin": "xiě",
      "tone_level": 3,
      "en": "to write"
  },
  {
      "hanzi": "士",
      "count": 24,
      "level": 467,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "scholar"
  },
  {
      "hanzi": "任",
      "pinyin": "rèn",
      "en": "to be in charge of",
      "count": 63,
      "level": 468,
      "tone_level": 4
  },
  {
      "hanzi": "豆",
      "count": 11,
      "level": 469,
      "pinyin": "dòu",
      "tone_level": 4,
      "en": "bean"
  },
  {
      "hanzi": "喜",
      "count": 266,
      "level": 470,
      "pinyin": "xǐ",
      "tone_level": 3,
      "en": "to like"
  },
  {
      "hanzi": "高",
      "count": 171,
      "level": 471,
      "pinyin": "gāo",
      "tone_level": 1,
      "en": "high"
  },
  {
      "hanzi": "搞",
      "count": 7,
      "level": 472,
      "pinyin": "gǎo",
      "tone_level": 3,
      "en": "to do/make"
  },
  {
      "hanzi": "亭",
      "count": 1,
      "level": 473,
      "pinyin": "tíng",
      "tone_level": 2,
      "en": "pavilion"
  },
  {
      "hanzi": "停",
      "count": 35,
      "level": 474,
      "pinyin": "tíng",
      "tone_level": 2,
      "en": "to stop"
  },
  {
      "hanzi": "九",
      "count": 17,
      "level": 475,
      "pinyin": "jiǔ",
      "tone_level": 3,
      "en": "nine"
  },
  {
      "hanzi": "丸",
      "count": 0,
      "level": 476,
      "pinyin": "wǎn",
      "tone_level": 3,
      "en": "pill"
  },
  {
      "hanzi": "执",
      "count": 3,
      "level": 477,
      "pinyin": "zhí",
      "tone_level": 2,
      "en": "to hold"
  },
  {
      "hanzi": "热",
      "count": 71,
      "level": 478,
      "pinyin": "rè",
      "tone_level": 4,
      "en": "hot"
  },
  {
      "hanzi": "京",
      "count": 27,
      "level": 479,
      "pinyin": "jīng",
      "tone_level": 1,
      "en": "capital"
  },
  {
      "hanzi": "景",
      "count": 35,
      "level": 480,
      "pinyin": "jǐng",
      "tone_level": 3,
      "en": "scenery"
  },
  {
      "hanzi": "影",
      "count": 116,
      "level": 481,
      "pinyin": "yǐng",
      "tone_level": 3,
      "en": "shadow"
  },
  {
      "hanzi": "尤",
      "count": 2,
      "level": 482,
      "pinyin": "yóu",
      "tone_level": 2,
      "en": "especially"
  },
  {
      "hanzi": "就",
      "count": 638,
      "level": 483,
      "pinyin": "jiù",
      "tone_level": 4,
      "en": "just"
  },
  {
      "hanzi": "成",
      "count": 256,
      "level": 484,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "to become"
  },
  {
      "hanzi": "城",
      "count": 74,
      "level": 485,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "city"
  },
  {
      "hanzi": "越",
      "count": 55,
      "level": 486,
      "pinyin": "yuè",
      "tone_level": 4,
      "en": "to exceed"
  },
  {
      "hanzi": "咸",
      "count": 4,
      "level": 487,
      "pinyin": "xián",
      "tone_level": 2,
      "en": "salty"
  },
  {
      "hanzi": "感",
      "count": 94,
      "level": 488,
      "pinyin": "gǎn",
      "tone_level": 3,
      "en": "feeling"
  },
  {
      "hanzi": "钱",
      "count": 155,
      "level": 489,
      "pinyin": "qián",
      "tone_level": 2,
      "en": "money"
  },
  {
      "hanzi": "浅",
      "count": 4,
      "level": 490,
      "pinyin": "qiǎn",
      "tone_level": 3,
      "en": "shallow"
  },
  {
      "hanzi": "巾",
      "count": 3,
      "level": 491,
      "pinyin": "jīn",
      "tone_level": 1,
      "en": "towel"
  },
  {
      "hanzi": "帅",
      "count": 17,
      "level": 492,
      "pinyin": "shuài",
      "tone_level": 4,
      "en": "handsome"
  },
  {
      "hanzi": "师",
      "count": 154,
      "level": 493,
      "pinyin": "shī",
      "tone_level": 1,
      "en": "teacher"
  },
  {
      "hanzi": "市",
      "count": 129,
      "level": 494,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "city"
  },
  {
      "hanzi": "带",
      "count": 79,
      "level": 495,
      "pinyin": "dài",
      "tone_level": 4,
      "en": "to bring"
  },
  {
      "hanzi": "邦",
      "count": 1,
      "level": 496,
      "pinyin": "bāng",
      "tone_level": 1,
      "en": "nation"
  },
  {
      "hanzi": "帮",
      "count": 118,
      "level": 497,
      "pinyin": "bāng",
      "tone_level": 1,
      "en": "help"
  },
  {
      "hanzi": "常",
      "count": 221,
      "level": 498,
      "pinyin": "cháng",
      "tone_level": 2,
      "en": "often"
  },
  {
      "hanzi": "非",
      "count": 127,
      "level": 499,
      "pinyin": "fēi",
      "tone_level": 1,
      "en": "not"
  },
  {
      "hanzi": "雨",
      "count": 55,
      "level": 500,
      "pinyin": "yǔ",
      "tone_level": 3,
      "en": "rain"
  },
  {
      "hanzi": "雪",
      "count": 25,
      "level": 501,
      "pinyin": "xuě",
      "tone_level": 3,
      "en": "snow"
  },
  {
      "hanzi": "冬",
      "count": 28,
      "level": 502,
      "pinyin": "dōng",
      "tone_level": 1,
      "en": "winter"
  },
  {
      "hanzi": "图",
      "count": 29,
      "level": 503,
      "pinyin": "tú",
      "tone_level": 2,
      "en": "picture"
  },
  {
      "hanzi": "各",
      "count": 47,
      "level": 504,
      "pinyin": "gè",
      "tone_level": 4,
      "en": "each"
  },
  {
      "hanzi": "客",
      "count": 56,
      "level": 505,
      "pinyin": "kè",
      "tone_level": 4,
      "en": "guest"
  },
  {
      "hanzi": "务",
      "count": 51,
      "level": 506,
      "pinyin": "wù",
      "tone_level": 4,
      "en": "business"
  },
  {
      "hanzi": "备",
      "count": 57,
      "level": 507,
      "pinyin": "bèi",
      "tone_level": 4,
      "en": "prepare"
  },
  {
      "hanzi": "夏",
      "count": 26,
      "level": 508,
      "pinyin": "xià",
      "tone_level": 4,
      "en": "summer"
  },
  {
      "hanzi": "令",
      "count": 10,
      "level": 509,
      "pinyin": "lìng",
      "tone_level": 4,
      "en": "order"
  },
  {
      "hanzi": "冷",
      "count": 43,
      "level": 510,
      "pinyin": "lěng",
      "tone_level": 3,
      "en": "cold"
  },
  {
      "hanzi": "足",
      "count": 36,
      "level": 511,
      "pinyin": "zú",
      "tone_level": 2,
      "en": "foot"
  },
  {
      "hanzi": "跑",
      "count": 56,
      "level": 512,
      "pinyin": "pǎo",
      "tone_level": 3,
      "en": "run"
  },
  {
      "hanzi": "路",
      "count": 138,
      "level": 513,
      "pinyin": "lù",
      "tone_level": 4,
      "en": "road"
  },
  {
      "hanzi": "跟",
      "count": 69,
      "level": 514,
      "pinyin": "gēn",
      "tone_level": 1,
      "en": "with"
  },
  {
      "hanzi": "示",
      "count": 20,
      "level": 515,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "show"
  },
  {
      "hanzi": "票",
      "count": 37,
      "level": 516,
      "pinyin": "piào",
      "tone_level": 4,
      "en": "ticket"
  },
  {
      "hanzi": "视",
      "count": 59,
      "level": 517,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "see"
  },
  {
      "hanzi": "知",
      "count": 185,
      "level": 518,
      "pinyin": "zhī",
      "tone_level": 1,
      "en": "know"
  },
  {
      "hanzi": "短",
      "count": 23,
      "level": 519,
      "pinyin": "duǎn",
      "tone_level": 3,
      "en": "short"
  },
  {
      "hanzi": "医",
      "count": 76,
      "level": 520,
      "pinyin": "yī",
      "tone_level": 1,
      "en": "doctor"
  },
  {
      "hanzi": "矮",
      "count": 5,
      "level": 521,
      "pinyin": "ǎi",
      "tone_level": 3,
      "en": "short"
  },
  {
      "hanzi": "侯",
      "count": 1,
      "level": 522,
      "pinyin": "hóu",
      "tone_level": 2,
      "en": "marquis"
  },
  {
      "hanzi": "候",
      "count": 234,
      "level": 523,
      "pinyin": "hòu",
      "tone_level": 4,
      "en": "wait"
  },
  {
      "hanzi": "弓",
      "count": 1,
      "level": 524,
      "pinyin": "gōng",
      "tone_level": 1,
      "en": "bow"
  },
  {
      "hanzi": "张",
      "count": 74,
      "level": 525,
      "pinyin": "zhāng",
      "tone_level": 1,
      "en": "open"
  },
  {
      "hanzi": "虫",
      "count": 8,
      "level": 526,
      "pinyin": "huǐ",
      "tone_level": 3,
      "en": "insect"
  },
  {
      "hanzi": "虽",
      "count": 77,
      "level": 527,
      "pinyin": "suī",
      "tone_level": 1,
      "en": "although"
  },
  {
      "hanzi": "强",
      "count": 33,
      "level": 528,
      "pinyin": "qiáng",
      "tone_level": 2,
      "en": "strong"
  },
  {
      "hanzi": "弱",
      "count": 3,
      "level": 529,
      "pinyin": "ruò",
      "tone_level": 4,
      "en": "weak"
  },
  {
      "hanzi": "弟",
      "count": 33,
      "level": 530,
      "pinyin": "dì",
      "tone_level": 4,
      "en": "younger brother"
  },
  {
      "hanzi": "第",
      "count": 84,
      "level": 531,
      "pinyin": "dì",
      "tone_level": 4,
      "en": "ordinal number"
  },
  {
      "hanzi": "隹",
      "count": 1,
      "level": 532,
      "pinyin": "zhuī",
      "tone_level": 1,
      "en": "short-tailed bird"
  },
  {
      "hanzi": "谁",
      "count": 40,
      "level": 533,
      "pinyin": "shuí",
      "tone_level": 2,
      "en": "who"
  },
  {
      "hanzi": "推",
      "count": 34,
      "level": 534,
      "pinyin": "tuī",
      "tone_level": 1,
      "en": "push"
  },
  {
      "hanzi": "难",
      "count": 125,
      "level": 535,
      "pinyin": "nán",
      "tone_level": 2,
      "en": "difficult"
  },
  {
      "hanzi": "准",
      "count": 58,
      "level": 536,
      "pinyin": "zhǔn",
      "tone_level": 3,
      "en": "accurate"
  },
  {
      "hanzi": "夭",
      "count": 0,
      "level": 537,
      "pinyin": "yāo",
      "tone_level": 1,
      "en": "die young"
  },
  {
      "hanzi": "笑",
      "count": 31,
      "level": 538,
      "pinyin": "xiào",
      "tone_level": 4,
      "en": "laugh"
  },
  {
      "hanzi": "立",
      "count": 33,
      "level": 539,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "stand"
  },
  {
      "hanzi": "位",
      "count": 139,
      "level": 540,
      "pinyin": "wèi",
      "tone_level": 4,
      "en": "position"
  },
  {
      "hanzi": "音",
      "count": 58,
      "level": 541,
      "pinyin": "yīn",
      "tone_level": 1,
      "en": "sound"
  },
  {
      "hanzi": "意",
      "count": 217,
      "level": 542,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "meaning"
  },
  {
      "hanzi": "站",
      "count": 57,
      "level": 543,
      "pinyin": "zhàn",
      "tone_level": 4,
      "en": "stand"
  },
  {
      "hanzi": "拉",
      "count": 18,
      "level": 544,
      "pinyin": "lā",
      "tone_level": 1,
      "en": "pull"
  },
  {
      "hanzi": "接",
      "count": 57,
      "level": 545,
      "pinyin": "jiē",
      "tone_level": 1,
      "en": "receive"
  },
  {
      "hanzi": "亲",
      "count": 61,
      "level": 546,
      "pinyin": "qīn",
      "tone_level": 1,
      "en": "close"
  },
  {
      "hanzi": "新",
      "count": 198,
      "level": 547,
      "pinyin": "xīn",
      "tone_level": 1,
      "en": "new"
  },
  {
      "hanzi": "杀",
      "count": 11,
      "level": 548,
      "pinyin": "shā",
      "tone_level": 1,
      "en": "kill"
  },
  {
      "hanzi": "条",
      "count": 93,
      "level": 549,
      "pinyin": "tiáo",
      "tone_level": 2,
      "en": "measure word for long, thin objects"
  },
  {
      "hanzi": "乐",
      "count": 67,
      "level": 550,
      "pinyin": "lè",
      "tone_level": 4,
      "en": "music"
  },
  {
      "hanzi": "茶",
      "count": 16,
      "level": 551,
      "pinyin": "chá",
      "tone_level": 2,
      "en": "tea"
  },
  {
      "hanzi": "乃",
      "count": 0,
      "level": 552,
      "pinyin": "nǎi",
      "tone_level": 3,
      "en": "then"
  },
  {
      "hanzi": "扔",
      "count": 8,
      "level": 553,
      "pinyin": "rēng",
      "tone_level": 1,
      "en": "throw"
  },
  {
      "hanzi": "奶",
      "count": 84,
      "level": 554,
      "pinyin": "nǎi",
      "tone_level": 3,
      "en": "milk"
  },
  {
      "hanzi": "及",
      "count": 31,
      "level": 555,
      "pinyin": "jí",
      "tone_level": 2,
      "en": "and"
  },
  {
      "hanzi": "尸",
      "count": 1,
      "level": 556,
      "pinyin": "shī",
      "tone_level": 1,
      "en": "corpse"
  },
  {
      "hanzi": "呢",
      "count": 106,
      "level": 557,
      "pinyin": "ne",
      "tone_level": 5,
      "en": "particle indicating inquiry"
  },
  {
      "hanzi": "户",
      "count": 17,
      "level": 558,
      "pinyin": "hù",
      "tone_level": 4,
      "en": "door"
  },
  {
      "hanzi": "所",
      "count": 177,
      "level": 559,
      "pinyin": "suǒ",
      "tone_level": 3,
      "en": "place"
  },
  {
      "hanzi": "声",
      "count": 67,
      "level": 560,
      "pinyin": "shēng",
      "tone_level": 1,
      "en": "voice"
  },
  {
      "hanzi": "欠",
      "count": 2,
      "level": 561,
      "pinyin": "qiàn",
      "tone_level": 4,
      "en": "owe"
  },
  {
      "hanzi": "吹",
      "count": 7,
      "level": 562,
      "pinyin": "chuī",
      "tone_level": 1,
      "en": "blow"
  },
  {
      "hanzi": "歌",
      "count": 82,
      "level": 563,
      "pinyin": "gē",
      "tone_level": 1,
      "en": "song"
  },
  {
      "hanzi": "软",
      "count": 6,
      "level": 564,
      "pinyin": "ruǎn",
      "tone_level": 3,
      "en": "soft"
  },
  {
      "hanzi": "次",
      "count": 226,
      "level": 565,
      "pinyin": "cì",
      "tone_level": 4,
      "en": "next"
  },
  {
      "hanzi": "欢",
      "count": 275,
      "level": 566,
      "pinyin": "huān",
      "tone_level": 1,
      "en": "happy"
  },
  {
      "hanzi": "亡",
      "count": 6,
      "level": 567,
      "pinyin": "wáng",
      "tone_level": 2,
      "en": "deceased"
  },
  {
      "hanzi": "忘",
      "count": 24,
      "level": 568,
      "pinyin": "wàng",
      "tone_level": 4,
      "en": "forget"
  },
  {
      "hanzi": "忙",
      "count": 41,
      "level": 569,
      "pinyin": "máng",
      "tone_level": 2,
      "en": "busy"
  },
  {
      "hanzi": "万",
      "count": 56,
      "level": 570,
      "pinyin": "wàn",
      "tone_level": 4,
      "en": "ten thousand"
  },
  {
      "hanzi": "方",
      "count": 223,
      "level": 571,
      "pinyin": "fāng",
      "tone_level": 1,
      "en": "direction"
  },
  {
      "hanzi": "放",
      "count": 98,
      "level": 572,
      "pinyin": "fàng",
      "tone_level": 4,
      "en": "let go"
  },
  {
      "hanzi": "房",
      "count": 134,
      "level": 573,
      "pinyin": "fáng",
      "tone_level": 2,
      "en": "room"
  },
  {
      "hanzi": "巴",
      "count": 10,
      "level": 574,
      "pinyin": "bā",
      "tone_level": 1,
      "en": "cling"
  },
  {
      "hanzi": "吧",
      "count": 196,
      "level": 575,
      "pinyin": "bā",
      "tone_level": 1,
      "en": "bar"
  },
  {
      "hanzi": "把",
      "count": 286,
      "level": 576,
      "pinyin": "bǎ",
      "tone_level": 3,
      "en": "hold"
  },
  {
      "hanzi": "色",
      "count": 88,
      "level": 577,
      "pinyin": "sè",
      "tone_level": 4,
      "en": "color"
  },
  {
      "hanzi": "而",
      "count": 81,
      "level": 578,
      "pinyin": "ér",
      "tone_level": 2,
      "en": "and"
  },
  {
      "hanzi": "需",
      "count": 125,
      "level": 579,
      "pinyin": "xū",
      "tone_level": 1,
      "en": "need"
  },
  {
      "hanzi": "且",
      "count": 26,
      "level": 580,
      "pinyin": "qiě",
      "tone_level": 3,
      "en": "and"
  },
  {
      "hanzi": "姐",
      "count": 29,
      "level": 581,
      "pinyin": "jiě",
      "tone_level": 3,
      "en": "older sister"
  },
  {
      "hanzi": "宜",
      "count": 12,
      "level": 582,
      "pinyin": "yí",
      "tone_level": 2,
      "en": "suitable"
  },
  {
      "hanzi": "丙",
      "count": 0,
      "level": 583,
      "pinyin": "bǐng",
      "tone_level": 3,
      "en": "third"
  },
  {
      "hanzi": "病",
      "count": 94,
      "level": 584,
      "pinyin": "bǐng",
      "tone_level": 4,
      "en": "illness"
  },
  {
      "hanzi": "疼",
      "count": 11,
      "level": 585,
      "pinyin": "téng",
      "tone_level": 2,
      "en": "ache"
  },
  {
      "hanzi": "氏",
      "count": 0,
      "level": 586,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "clan"
  },
  {
      "hanzi": "纸",
      "count": 14,
      "level": 587,
      "pinyin": "zhǐ",
      "tone_level": 3,
      "en": "paper"
  },
  {
      "hanzi": "低",
      "count": 19,
      "level": 588,
      "pinyin": "dī",
      "tone_level": 1,
      "en": "low"
  },
  {
      "hanzi": "北",
      "count": 56,
      "level": 589,
      "pinyin": "běi",
      "tone_level": 3,
      "en": "north"
  },
  {
      "hanzi": "南",
      "count": 29,
      "level": 590,
      "pinyin": "nán",
      "tone_level": 2,
      "en": "south"
  },
  {
      "hanzi": "垂",
      "count": 0,
      "level": 591,
      "pinyin": "chuí",
      "tone_level": 2,
      "en": "hang down"
  },
  {
      "hanzi": "睡",
      "count": 53,
      "level": 592,
      "pinyin": "shuì",
      "tone_level": 4,
      "en": "sleep"
  },
  {
      "hanzi": "海",
      "count": 66,
      "level": 593,
      "pinyin": "hǎi",
      "tone_level": 3,
      "en": "sea"
  },
  {
      "hanzi": "毒",
      "count": 16,
      "level": 594,
      "pinyin": "dú",
      "tone_level": 2,
      "en": "poison"
  },
  {
      "hanzi": "洋",
      "count": 7,
      "level": 595,
      "pinyin": "yáng",
      "tone_level": 2,
      "en": "ocean"
  },
  {
      "hanzi": "鲜",
      "count": 12,
      "level": 596,
      "pinyin": "xiān",
      "tone_level": 1,
      "en": "fresh"
  },
  {
      "hanzi": "原",
      "count": 45,
      "level": 597,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "original"
  },
  {
      "hanzi": "源",
      "count": 16,
      "level": 598,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "source"
  },
  {
      "hanzi": "愿",
      "count": 26,
      "level": 599,
      "pinyin": "yuàn",
      "tone_level": 4,
      "en": "wish"
  },
  {
      "hanzi": "川",
      "count": 32,
      "level": 600,
      "pinyin": "chuān",
      "tone_level": 1,
      "en": "Sichuan"
  },
  {
      "hanzi": "州",
      "count": 20,
      "level": 601,
      "pinyin": "zhōu",
      "tone_level": 1,
      "en": "state"
  },
  {
      "hanzi": "洲",
      "count": 21,
      "level": 602,
      "pinyin": "zhōu",
      "tone_level": 1,
      "en": "island"
  },
  {
      "hanzi": "弃",
      "count": 12,
      "level": 603,
      "pinyin": "qì",
      "tone_level": 4,
      "en": "abandon"
  },
  {
      "hanzi": "育",
      "count": 30,
      "level": 604,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "nurture"
  },
  {
      "hanzi": "充",
      "count": 18,
      "level": 605,
      "pinyin": "chōng",
      "tone_level": 1,
      "en": "fill"
  },
  {
      "hanzi": "流",
      "count": 53,
      "level": 606,
      "pinyin": "liú",
      "tone_level": 2,
      "en": "flow"
  },
  {
      "hanzi": "统",
      "count": 35,
      "level": 607,
      "pinyin": "tǒng",
      "tone_level": 3,
      "en": "unify"
  },
  {
      "hanzi": "齐",
      "count": 9,
      "level": 608,
      "pinyin": "qí",
      "tone_level": 2,
      "en": "neat"
  },
  {
      "hanzi": "济",
      "count": 42,
      "level": 609,
      "pinyin": "jì",
      "tone_level": 4,
      "en": "aid"
  },
  {
      "hanzi": "剂",
      "count": 1,
      "level": 610,
      "pinyin": "qīng",
      "tone_level": 1,
      "en": "dose"
  },
  {
      "hanzi": "清",
      "count": 37,
      "level": 611,
      "pinyin": "qīng",
      "tone_level": 1,
      "en": "clear"
  },
  {
      "hanzi": "精",
      "count": 27,
      "level": 612,
      "pinyin": "jīng",
      "tone_level": 1,
      "en": "essence"
  },
  {
      "hanzi": "消",
      "count": 54,
      "level": 613,
      "pinyin": "xiāo",
      "tone_level": 1,
      "en": "eliminate"
  },
  {
      "hanzi": "治",
      "count": 12,
      "level": 614,
      "pinyin": "zhì",
      "tone_level": 4,
      "en": "treat"
  },
  {
      "hanzi": "落",
      "count": 14,
      "level": 615,
      "pinyin": "luò",
      "tone_level": 4,
      "en": "fall"
  },
  {
      "hanzi": "露",
      "count": 10,
      "level": 616,
      "pinyin": "lù",
      "tone_level": 4,
      "en": "dew"
  },
  {
      "hanzi": "满",
      "count": 34,
      "level": 617,
      "pinyin": "mǎn",
      "tone_level": 3,
      "en": "full"
  },
  {
      "hanzi": "酒",
      "count": 47,
      "level": 618,
      "pinyin": "jiǔ",
      "tone_level": 3,
      "en": "wine"
  },
  {
      "hanzi": "配",
      "count": 13,
      "level": 619,
      "pinyin": "pèi",
      "tone_level": 4,
      "en": "match"
  },
  {
      "hanzi": "醒",
      "count": 19,
      "level": 620,
      "pinyin": "xǐng",
      "tone_level": 3,
      "en": "wake up"
  },
  {
      "hanzi": "尊",
      "count": 16,
      "level": 621,
      "pinyin": "zūn",
      "tone_level": 1,
      "en": "respect"
  },
  {
      "hanzi": "酷",
      "count": 4,
      "level": 622,
      "pinyin": "kù",
      "tone_level": 4,
      "en": "cool"
  },
  {
      "hanzi": "酸",
      "count": 6,
      "level": 623,
      "pinyin": "suān",
      "tone_level": 1,
      "en": "sour"
  },
  {
      "hanzi": "波",
      "count": 1,
      "level": 624,
      "pinyin": "bō",
      "tone_level": 1,
      "en": "wave"
  },
  {
      "hanzi": "胡",
      "count": 9,
      "level": 625,
      "pinyin": "hú",
      "tone_level": 2,
      "en": "beard"
  },
  {
      "hanzi": "湖",
      "count": 8,
      "level": 626,
      "pinyin": "hú",
      "tone_level": 2,
      "en": "lake"
  },
  {
      "hanzi": "永",
      "count": 10,
      "level": 627,
      "pinyin": "yǒng",
      "tone_level": 3,
      "en": "forever"
  },
  {
      "hanzi": "泳",
      "count": 12,
      "level": 628,
      "pinyin": "yǒng",
      "tone_level": 3,
      "en": "swim"
  },
  {
      "hanzi": "脉",
      "count": 2,
      "level": 629,
      "pinyin": "mài",
      "tone_level": 4,
      "en": "pulse"
  },
  {
      "hanzi": "承",
      "count": 11,
      "level": 630,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "bear"
  },
  {
      "hanzi": "兰",
      "count": 1,
      "level": 631,
      "pinyin": "lán",
      "tone_level": 2,
      "en": "orchid"
  },
  {
      "hanzi": "之",
      "count": 90,
      "level": 632,
      "pinyin": "zhī",
      "tone_level": 1,
      "en": "of"
  },
  {
      "hanzi": "乏",
      "count": 4,
      "level": 633,
      "pinyin": "fá",
      "tone_level": 2,
      "en": "tired"
  },
  {
      "hanzi": "派",
      "count": 13,
      "level": 634,
      "pinyin": "pài",
      "tone_level": 4,
      "en": "faction"
  },
  {
      "hanzi": "游",
      "count": 82,
      "level": 635,
      "pinyin": "yóu",
      "tone_level": 2,
      "en": "travel"
  },
  {
      "hanzi": "施",
      "count": 6,
      "level": 636,
      "pinyin": "shī",
      "tone_level": 1,
      "en": "implement"
  },
  {
      "hanzi": "族",
      "count": 10,
      "level": 637,
      "pinyin": "zú",
      "tone_level": 2,
      "en": "ethnicity"
  },
  {
      "hanzi": "旅",
      "count": 55,
      "level": 638,
      "pinyin": "lǚ",
      "tone_level": 3,
      "en": "travel"
  },
  {
      "hanzi": "良",
      "count": 13,
      "level": 639,
      "pinyin": "liáng",
      "tone_level": 2,
      "en": "good"
  },
  {
      "hanzi": "浪",
      "count": 8,
      "level": 640,
      "pinyin": "làng",
      "tone_level": 4,
      "en": "wave"
  },
  {
      "hanzi": "郎",
      "count": 2,
      "level": 641,
      "pinyin": "láng",
      "tone_level": 2,
      "en": "youth"
  },
  {
      "hanzi": "娘",
      "count": 11,
      "level": 642,
      "pinyin": "niáng",
      "tone_level": 2,
      "en": "daughter"
  },
  {
      "hanzi": "姑",
      "count": 8,
      "level": 643,
      "pinyin": "gū",
      "tone_level": 1,
      "en": "aunt"
  },
  {
      "hanzi": "沙",
      "count": 19,
      "level": 644,
      "pinyin": "shā",
      "tone_level": 1,
      "en": "sand"
  },
  {
      "hanzi": "省",
      "count": 14,
      "level": 645,
      "pinyin": "shěng",
      "tone_level": 3,
      "en": "province"
  },
  {
      "hanzi": "眼",
      "count": 44,
      "level": 646,
      "pinyin": "yǎn",
      "tone_level": 3,
      "en": "eye"
  },
  {
      "hanzi": "睛",
      "count": 7,
      "level": 647,
      "pinyin": "jīng",
      "tone_level": 1,
      "en": "pupil"
  },
  {
      "hanzi": "沉",
      "count": 9,
      "level": 648,
      "pinyin": "chén",
      "tone_level": 2,
      "en": "sink"
  },
  {
      "hanzi": "染",
      "count": 17,
      "level": 649,
      "pinyin": "rǎn",
      "tone_level": 3,
      "en": "dye"
  },
  {
      "hanzi": "究",
      "count": 15,
      "level": 650,
      "pinyin": "jiū",
      "tone_level": 1,
      "en": "research"
  },
  {
      "hanzi": "杂",
      "count": 11,
      "level": 651,
      "pinyin": "zá",
      "tone_level": 2,
      "en": "miscellaneous"
  },
  {
      "hanzi": "余",
      "count": 4,
      "level": 652,
      "pinyin": "yú",
      "tone_level": 2,
      "en": "surplus"
  },
  {
      "hanzi": "除",
      "count": 31,
      "level": 653,
      "pinyin": "chú",
      "tone_level": 2,
      "en": "except"
  },
  {
      "hanzi": "途",
      "count": 9,
      "level": 654,
      "pinyin": "tú",
      "tone_level": 2,
      "en": "way"
  },
  {
      "hanzi": "汇",
      "count": 11,
      "level": 655,
      "pinyin": "huì",
      "tone_level": 4,
      "en": "converge"
  },
  {
      "hanzi": "巨",
      "count": 7,
      "level": 656,
      "pinyin": "jù",
      "tone_level": 4,
      "en": "huge"
  },
  {
      "hanzi": "距",
      "count": 6,
      "level": 657,
      "pinyin": "jù",
      "tone_level": 4,
      "en": "distance"
  },
  {
      "hanzi": "涨",
      "count": 15,
      "level": 658,
      "pinyin": "zhǎng",
      "tone_level": 3,
      "en": "rise"
  },
  {
      "hanzi": "湾",
      "count": 7,
      "level": 659,
      "pinyin": "wān",
      "tone_level": 1,
      "en": "bay"
  },
  {
      "hanzi": "引",
      "count": 22,
      "level": 660,
      "pinyin": "yǐn",
      "tone_level": 3,
      "en": "lead"
  },
  {
      "hanzi": "弹",
      "count": 11,
      "level": 661,
      "pinyin": "dàn",
      "tone_level": 4,
      "en": "bullet"
  },
  {
      "hanzi": "淡",
      "count": 7,
      "level": 662,
      "pinyin": "dàn",
      "tone_level": 4,
      "en": "light"
  },
  {
      "hanzi": "润",
      "count": 1,
      "level": 663,
      "pinyin": "rùn",
      "tone_level": 4,
      "en": "moisturize"
  },
  {
      "hanzi": "渐",
      "count": 8,
      "level": 664,
      "pinyin": "jiàn",
      "tone_level": 4,
      "en": "gradual"
  },
  {
      "hanzi": "汗",
      "count": 3,
      "level": 665,
      "pinyin": "hàn",
      "tone_level": 4,
      "en": "sweat"
  },
  {
      "hanzi": "平",
      "count": 74,
      "level": 666,
      "pinyin": "píng",
      "tone_level": 2,
      "en": "flat"
  },
  {
      "hanzi": "幸",
      "count": 23,
      "level": 667,
      "pinyin": "xìng",
      "tone_level": 4,
      "en": "fortunate"
  },
  {
      "hanzi": "赶",
      "count": 29,
      "level": 668,
      "pinyin": "gǎn",
      "tone_level": 3,
      "en": "hurry"
  },
  {
      "hanzi": "超",
      "count": 37,
      "level": 669,
      "pinyin": "chāo",
      "tone_level": 1,
      "en": "exceed"
  },
  {
      "hanzi": "趣",
      "count": 23,
      "level": 670,
      "pinyin": "qù",
      "tone_level": 4,
      "en": "interest"
  },
  {
      "hanzi": "聚",
      "count": 20,
      "level": 671,
      "pinyin": "jù",
      "tone_level": 4,
      "en": "gather"
  },
  {
      "hanzi": "汁",
      "count": 4,
      "level": 672,
      "pinyin": "zhī",
      "tone_level": 1,
      "en": "juice"
  },
  {
      "hanzi": "泼",
      "count": 3,
      "level": 673,
      "pinyin": "pō",
      "tone_level": 1,
      "en": "splash"
  },
  {
      "hanzi": "演",
      "count": 48,
      "level": 674,
      "pinyin": "yǎn",
      "tone_level": 3,
      "en": "perform"
  },
  {
      "hanzi": "勿",
      "count": 1,
      "level": 675,
      "pinyin": "wu",
      "tone_level": 4,
      "en": "do not"
  },
  {
      "hanzi": "物",
      "count": 104,
      "level": 676,
      "pinyin": "wu",
      "tone_level": 4,
      "en": "thing"
  },
  {
      "hanzi": "易",
      "count": 51,
      "level": 677,
      "pinyin": "yi",
      "tone_level": 4,
      "en": "easy"
  },
  {
      "hanzi": "踢",
      "count": 9,
      "level": 678,
      "pinyin": "ti",
      "tone_level": 1,
      "en": "kick"
  },
  {
      "hanzi": "汤",
      "count": 5,
      "level": 679,
      "pinyin": "tang",
      "tone_level": 1,
      "en": "soup"
  },
  {
      "hanzi": "场",
      "count": 131,
      "level": 680,
      "pinyin": "chang",
      "tone_level": 3,
      "en": "place"
  },
  {
      "hanzi": "杨",
      "count": 1,
      "level": 681,
      "pinyin": "yang",
      "tone_level": 2,
      "en": "poplar"
  },
  {
      "hanzi": "扬",
      "count": 4,
      "level": 682,
      "pinyin": "yang",
      "tone_level": 2,
      "en": "raise"
  },
  {
      "hanzi": "持",
      "count": 44,
      "level": 683,
      "pinyin": "chi",
      "tone_level": 2,
      "en": "hold"
  },
  {
      "hanzi": "待",
      "count": 30,
      "level": 684,
      "pinyin": "dai",
      "tone_level": 4,
      "en": "wait"
  },
  {
      "hanzi": "征",
      "count": 8,
      "level": 685,
      "pinyin": "zheng",
      "tone_level": 1,
      "en": "recruit"
  },
  {
      "hanzi": "微",
      "count": 12,
      "level": 686,
      "pinyin": "wei",
      "tone_level": 1,
      "en": "tiny"
  },
  {
      "hanzi": "据",
      "count": 26,
      "level": 687,
      "pinyin": "ju",
      "tone_level": 1,
      "en": "hold"
  },
  {
      "hanzi": "投",
      "count": 24,
      "level": 688,
      "pinyin": "tou",
      "tone_level": 2,
      "en": "投"
  },
  {
      "hanzi": "指",
      "count": 16,
      "level": 689,
      "pinyin": "zhi",
      "tone_level": 3,
      "en": "point"
  },
  {
      "hanzi": "龙",
      "count": 12,
      "level": 690,
      "pinyin": "long",
      "tone_level": 2,
      "en": "dragon"
  },
  {
      "hanzi": "技",
      "count": 25,
      "level": 691,
      "pinyin": "ji",
      "tone_level": 4,
      "en": "skill"
  },
  {
      "hanzi": "鼓",
      "count": 6,
      "level": 692,
      "pinyin": "gu",
      "tone_level": 3,
      "en": "drum"
  },
  {
      "hanzi": "护",
      "count": 29,
      "level": 693,
      "pinyin": "hu",
      "tone_level": 4,
      "en": "protect"
  },
  {
      "hanzi": "扁",
      "count": 3,
      "level": 694,
      "pinyin": "bian",
      "tone_level": 3,
      "en": "flat"
  },
  {
      "hanzi": "编",
      "count": 6,
      "level": 695,
      "pinyin": "bian",
      "tone_level": 1,
      "en": "compile"
  },
  {
      "hanzi": "偏",
      "count": 4,
      "level": 696,
      "pinyin": "pian",
      "tone_level": 1,
      "en": "slant"
  },
  {
      "hanzi": "遍",
      "count": 12,
      "level": 697,
      "pinyin": "bian",
      "tone_level": 4,
      "en": "all over"
  },
  {
      "hanzi": "篇",
      "count": 19,
      "level": 698,
      "pinyin": "pian",
      "tone_level": 1,
      "en": "chapter"
  },
  {
      "hanzi": "骗",
      "count": 19,
      "level": 699,
      "pinyin": "pian",
      "tone_level": 4,
      "en": "cheat"
  },
  {
      "hanzi": "控",
      "count": 10,
      "level": 700,
      "pinyin": "kong",
      "tone_level": 4,
      "en": "control"
  },
  {
      "hanzi": "按",
      "count": 27,
      "level": 701,
      "pinyin": "an",
      "tone_level": 4,
      "en": "press"
  },
  {
      "hanzi": "招",
      "count": 12,
      "level": 702,
      "pinyin": "zhao",
      "tone_level": 1,
      "en": "recruit"
  },
  {
      "hanzi": "括",
      "count": 5,
      "level": 703,
      "pinyin": "kuo",
      "tone_level": 1,
      "en": "include"
  },
  {
      "hanzi": "掉",
      "count": 27,
      "level": 704,
      "pinyin": "diao",
      "tone_level": 4,
      "en": "fall"
  },
  {
      "hanzi": "托",
      "count": 7,
      "level": 705,
      "pinyin": "tuo",
      "tone_level": 1,
      "en": "hold"
  },
  {
      "hanzi": "挥",
      "count": 4,
      "level": 706,
      "pinyin": "hui",
      "tone_level": 1,
      "en": "wave"
  },
  {
      "hanzi": "损",
      "count": 7,
      "level": 707,
      "pinyin": "sun",
      "tone_level": 3,
      "en": "damage"
  },
  {
      "hanzi": "折",
      "count": 10,
      "level": 708,
      "pinyin": "zhe",
      "tone_level": 1,
      "en": "break"
  },
  {
      "hanzi": "爪",
      "count": 1,
      "level": 709,
      "pinyin": "zhua",
      "tone_level": 3,
      "en": "claw"
  },
  {
      "hanzi": "抓",
      "count": 14,
      "level": 710,
      "pinyin": "zhua",
      "tone_level": 1,
      "en": "grab"
  },
  {
      "hanzi": "瓜",
      "count": 15,
      "level": 711,
      "pinyin": "gua",
      "tone_level": 1,
      "en": "melon"
  },
  {
      "hanzi": "孤",
      "count": 5,
      "level": 712,
      "pinyin": "gu",
      "tone_level": 1,
      "en": "lone"
  },
  {
      "hanzi": "爬",
      "count": 13,
      "level": 713,
      "pinyin": "pa",
      "tone_level": 2,
      "en": "crawl"
  },
  {
      "hanzi": "拥",
      "count": 10,
      "level": 714,
      "pinyin": "yong",
      "tone_level": 1,
      "en": "embrace"
  },
  {
      "hanzi": "抢",
      "count": 7,
      "level": 715,
      "pinyin": "qiang",
      "tone_level": 1,
      "en": "snatch"
  },
  {
      "hanzi": "探",
      "count": 5,
      "level": 716,
      "pinyin": "tan",
      "tone_level": 4,
      "en": "explore"
  },
  {
      "hanzi": "兆",
      "count": 1,
      "level": 717,
      "pinyin": "zhao",
      "tone_level": 4,
      "en": "omen"
  },
  {
      "hanzi": "挑",
      "count": 4,
      "level": 718,
      "pinyin": "tiao",
      "tone_level": 3,
      "en": "choose"
  },
  {
      "hanzi": "跳",
      "count": 21,
      "level": 719,
      "pinyin": "tiao",
      "tone_level": 4,
      "en": "jump"
  },
  {
      "hanzi": "逃",
      "count": 10,
      "level": 720,
      "pinyin": "tao",
      "tone_level": 2,
      "en": "escape"
  },
  {
      "hanzi": "扩",
      "count": 5,
      "level": 721,
      "pinyin": "kuo",
      "tone_level": 1,
      "en": "expand"
  },
  {
      "hanzi": "批",
      "count": 11,
      "level": 722,
      "pinyin": "pi",
      "tone_level": 1,
      "en": "batch"
  },
  {
      "hanzi": "混",
      "count": 3,
      "level": 723,
      "pinyin": "hun",
      "tone_level": 4,
      "en": "mix"
  },
  {
      "hanzi": "毕",
      "count": 14,
      "level": 724,
      "pinyin": "bi",
      "tone_level": 4,
      "en": "finish"
  },
  {
      "hanzi": "措",
      "count": 5,
      "level": 725,
      "pinyin": "cuo",
      "tone_level": 4,
      "en": "implement"
  },
  {
      "hanzi": "展",
      "count": 54,
      "level": 726,
      "pinyin": "zhan",
      "tone_level": 3,
      "en": "exhibit"
  },
  {
      "hanzi": "授",
      "count": 7,
      "level": 727,
      "pinyin": "shou",
      "tone_level": 4,
      "en": "grant"
  },
  {
      "hanzi": "延",
      "count": 7,
      "level": 728,
      "pinyin": "yan",
      "tone_level": 2,
      "en": "extend"
  },
  {
      "hanzi": "挺",
      "count": 10,
      "level": 729,
      "pinyin": "ting",
      "tone_level": 3,
      "en": "stand up straight"
  },
  {
      "hanzi": "庭",
      "count": 20,
      "level": 730,
      "pinyin": "ting",
      "tone_level": 2,
      "en": "courtyard"
  },
  {
      "hanzi": "抱",
      "count": 6,
      "level": 731,
      "pinyin": "bao",
      "tone_level": 4,
      "en": "hug"
  },
  {
      "hanzi": "扰",
      "count": 12,
      "level": 732,
      "pinyin": "rao",
      "tone_level": 3,
      "en": "disturb"
  },
  {
      "hanzi": "抬",
      "count": 4,
      "level": 733,
      "pinyin": "tai",
      "tone_level": 2,
      "en": "lift"
  },
  {
      "hanzi": "扮",
      "count": 10,
      "level": 734,
      "pinyin": "ban",
      "tone_level": 4,
      "en": "act"
  },
  {
      "hanzi": "粉",
      "count": 9,
      "level": 735,
      "pinyin": "fen",
      "tone_level": 3,
      "en": "powder"
  },
  {
      "hanzi": "拾",
      "count": 6,
      "level": 736,
      "pinyin": "shi",
      "tone_level": 2,
      "en": "pick up"
  },
  {
      "hanzi": "术",
      "count": 28,
      "level": 737,
      "pinyin": "shu",
      "tone_level": 4,
      "en": "technique"
  },
  {
      "hanzi": "格",
      "count": 35,
      "level": 738,
      "pinyin": "ge",
      "tone_level": 2,
      "en": "pattern"
  },
  {
      "hanzi": "标",
      "count": 23,
      "level": 739,
      "pinyin": "biao",
      "tone_level": 1,
      "en": "mark"
  },
  {
      "hanzi": "林",
      "count": 13,
      "level": 740,
      "pinyin": "lin",
      "tone_level": 2,
      "en": "forest"
  },
  {
      "hanzi": "禁",
      "count": 4,
      "level": 741,
      "pinyin": "jin",
      "tone_level": 4,
      "en": "prohibit"
  },
  {
      "hanzi": "际",
      "count": 11,
      "level": 742,
      "pinyin": "ji",
      "tone_level": 4,
      "en": "border"
  },
  {
      "hanzi": "梦",
      "count": 21,
      "level": 743,
      "pinyin": "meng",
      "tone_level": 4,
      "en": "dream"
  },
  {
      "hanzi": "麻",
      "count": 28,
      "level": 744,
      "pinyin": "ma",
      "tone_level": 2,
      "en": "hemp"
  },
  {
      "hanzi": "摩",
      "count": 6,
      "level": 745,
      "pinyin": "mo",
      "tone_level": 2,
      "en": "rub"
  },
  {
      "hanzi": "楚",
      "count": 16,
      "level": 746,
      "pinyin": "chu",
      "tone_level": 3,
      "en": "clear"
  },
  {
      "hanzi": "蛋",
      "count": 22,
      "level": 747,
      "pinyin": "dan",
      "tone_level": 4,
      "en": "egg"
  },
  {
      "hanzi": "森",
      "count": 9,
      "level": 748,
      "pinyin": "sen",
      "tone_level": 1,
      "en": "forest"
  },
  {
      "hanzi": "查",
      "count": 23,
      "level": 749,
      "pinyin": "cha",
      "tone_level": 2,
      "en": "check"
  },
  {
      "hanzi": "集",
      "count": 16,
      "level": 750,
      "pinyin": "ji",
      "tone_level": 2,
      "en": "collect"
  },
  {
      "hanzi": "案",
      "count": 18,
      "level": 751,
      "pinyin": "an",
      "tone_level": 4,
      "en": "case"
  },
  {
      "hanzi": "未",
      "count": 18,
      "level": 752,
      "pinyin": "wei",
      "tone_level": 4,
      "en": "not yet"
  },
  {
      "hanzi": "味",
      "count": 32,
      "level": 753,
      "pinyin": "wei",
      "tone_level": 4,
      "en": "flavor"
  },
  {
      "hanzi": "妹",
      "count": 15,
      "level": 754,
      "pinyin": "mei",
      "tone_level": 4,
      "en": "younger sister"
  },
  {
      "hanzi": "根",
      "count": 32,
      "level": 755,
      "pinyin": "gen",
      "tone_level": 1,
      "en": "root"
  },
  {
      "hanzi": "极",
      "count": 22,
      "level": 756,
      "pinyin": "ji",
      "tone_level": 2,
      "en": "extreme"
  },
  {
      "hanzi": "勾",
      "count": 0,
      "level": 757,
      "pinyin": "gou",
      "tone_level": 1,
      "en": "hook"
  },
  {
      "hanzi": "构",
      "count": 9,
      "level": 758,
      "pinyin": "gou",
      "tone_level": 4,
      "en": "construct"
  },
  {
      "hanzi": "购",
      "count": 8,
      "level": 759,
      "pinyin": "gou",
      "tone_level": 4,
      "en": "buy"
  },
  {
      "hanzi": "沟",
      "count": 7,
      "level": 760,
      "pinyin": "gou",
      "tone_level": 1,
      "en": "ditch"
  },
  {
      "hanzi": "村",
      "count": 22,
      "level": 761,
      "pinyin": "cun",
      "tone_level": 1,
      "en": "village"
  },
  {
      "hanzi": "树",
      "count": 24,
      "level": 762,
      "pinyin": "shu",
      "tone_level": 4,
      "en": "tree"
  },
  {
      "hanzi": "板",
      "count": 45,
      "level": 763,
      "pinyin": "ban",
      "tone_level": 3,
      "en": "board"
  },
  {
      "hanzi": "版",
      "count": 11,
      "level": 764,
      "pinyin": "ban",
      "tone_level": 3,
      "en": "edition"
  },
  {
      "hanzi": "材",
      "count": 9,
      "level": 765,
      "pinyin": "cai",
      "tone_level": 2,
      "en": "material"
  },
  {
      "hanzi": "析",
      "count": 1,
      "level": 766,
      "pinyin": "xi",
      "tone_level": 1,
      "en": "analyze"
  },
  {
      "hanzi": "束",
      "count": 12,
      "level": 767,
      "pinyin": "shu",
      "tone_level": 4,
      "en": "bundle"
  },
  {
      "hanzi": "整",
      "count": 46,
      "level": 768,
      "pinyin": "zheng",
      "tone_level": 3,
      "en": "whole"
  },
  {
      "hanzi": "辛",
      "count": 11,
      "level": 769,
      "pinyin": "xin",
      "tone_level": 1,
      "en": "spicy"
  },
  {
      "hanzi": "辣",
      "count": 13,
      "level": 770,
      "pinyin": "la",
      "tone_level": 4,
      "en": "spicy"
  },
  {
      "hanzi": "核",
      "count": 2,
      "level": 771,
      "pinyin": "he",
      "tone_level": 2,
      "en": "nucleus"
  },
  {
      "hanzi": "刻",
      "count": 21,
      "level": 772,
      "pinyin": "ke",
      "tone_level": 4,
      "en": "carve"
  },
  {
      "hanzi": "咳",
      "count": 2,
      "level": 773,
      "pinyin": "ke",
      "tone_level": 2,
      "en": "cough"
  },
  {
      "hanzi": "嗽",
      "count": 1,
      "level": 774,
      "pinyin": "sou",
      "tone_level": 4,
      "en": "cough"
  },
  {
      "hanzi": "松",
      "count": 19,
      "level": 775,
      "pinyin": "song",
      "tone_level": 1,
      "en": "loose"
  },
  {
      "hanzi": "架",
      "count": 20,
      "level": 776,
      "pinyin": "jia",
      "tone_level": 4,
      "en": "frame"
  },
  {
      "hanzi": "枪",
      "count": 6,
      "level": 777,
      "pinyin": "qiang",
      "tone_level": 1,
      "en": "gun"
  },
  {
      "hanzi": "档",
      "count": 8,
      "level": 778,
      "pinyin": "dàng",
      "tone_level": 4,
      "en": "file"
  },
  {
      "hanzi": "光",
      "count": 41,
      "level": 779,
      "pinyin": "guāng",
      "tone_level": 1,
      "en": "light"
  },
  {
      "hanzi": "梯",
      "count": 6,
      "level": 780,
      "pinyin": "tī",
      "tone_level": 1,
      "en": "stairs"
  },
  {
      "hanzi": "朵",
      "count": 14,
      "level": 781,
      "pinyin": "duǒ",
      "tone_level": 3,
      "en": "measure word for flowers"
  },
  {
      "hanzi": "棵",
      "count": 5,
      "level": 782,
      "pinyin": "kē",
      "tone_level": 1,
      "en": "measure word for trees"
  },
  {
      "hanzi": "柿",
      "count": 3,
      "level": 783,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "persimmon"
  },
  {
      "hanzi": "橡",
      "count": 1,
      "level": 784,
      "pinyin": "xiàng",
      "tone_level": 4,
      "en": "acorn"
  },
  {
      "hanzi": "植",
      "count": 5,
      "level": 785,
      "pinyin": "zhí",
      "tone_level": 2,
      "en": "plant"
  },
  {
      "hanzi": "置",
      "count": 12,
      "level": 786,
      "pinyin": "zhì",
      "tone_level": 4,
      "en": "place"
  },
  {
      "hanzi": "值",
      "count": 21,
      "level": 787,
      "pinyin": "zhí",
      "tone_level": 2,
      "en": "value"
  },
  {
      "hanzi": "罗",
      "count": 5,
      "level": 788,
      "pinyin": "luó",
      "tone_level": 2,
      "en": "gather"
  },
  {
      "hanzi": "保",
      "count": 54,
      "level": 789,
      "pinyin": "bǎo",
      "tone_level": 3,
      "en": "protect"
  },
  {
      "hanzi": "价",
      "count": 41,
      "level": 790,
      "pinyin": "jià",
      "tone_level": 4,
      "en": "price"
  },
  {
      "hanzi": "界",
      "count": 46,
      "level": 791,
      "pinyin": "jiè",
      "tone_level": 4,
      "en": "boundary"
  },
  {
      "hanzi": "养",
      "count": 37,
      "level": 792,
      "pinyin": "yǎng",
      "tone_level": 3,
      "en": "raise"
  },
  {
      "hanzi": "阶",
      "count": 1,
      "level": 793,
      "pinyin": "jiē",
      "tone_level": 1,
      "en": "step"
  },
  {
      "hanzi": "专",
      "count": 21,
      "level": 794,
      "pinyin": "zhuān",
      "tone_level": 1,
      "en": "specialize"
  },
  {
      "hanzi": "传",
      "count": 44,
      "level": 795,
      "pinyin": "chuán",
      "tone_level": 2,
      "en": "transmit"
  },
  {
      "hanzi": "转",
      "count": 22,
      "level": 796,
      "pinyin": "zhuǎn",
      "tone_level": 3,
      "en": "turn"
  },
  {
      "hanzi": "何",
      "count": 29,
      "level": 797,
      "pinyin": "hé",
      "tone_level": 2,
      "en": "what"
  },
  {
      "hanzi": "供",
      "count": 9,
      "level": 798,
      "pinyin": "gōng",
      "tone_level": 1,
      "en": "supply"
  },
  {
      "hanzi": "港",
      "count": 9,
      "level": 799,
      "pinyin": "gǎng",
      "tone_level": 3,
      "en": "harbor"
  },
  {
      "hanzi": "暴",
      "count": 15,
      "level": 800,
      "pinyin": "bào",
      "tone_level": 4,
      "en": "violent"
  },
  {
      "hanzi": "爆",
      "count": 7,
      "level": 801,
      "pinyin": "bào",
      "tone_level": 4,
      "en": "explode"
  },
  {
      "hanzi": "伤",
      "count": 35,
      "level": 802,
      "pinyin": "shāng",
      "tone_level": 1,
      "en": "injure"
  },
  {
      "hanzi": "优",
      "count": 25,
      "level": 803,
      "pinyin": "yōu",
      "tone_level": 1,
      "en": "excellent"
  },
  {
      "hanzi": "仅",
      "count": 15,
      "level": 804,
      "pinyin": "jǐn",
      "tone_level": 3,
      "en": "only"
  },
  {
      "hanzi": "夜",
      "count": 32,
      "level": 805,
      "pinyin": "yè",
      "tone_level": 4,
      "en": "night"
  },
  {
      "hanzi": "液",
      "count": 4,
      "level": 806,
      "pinyin": "yè",
      "tone_level": 4,
      "en": "liquid"
  },
  {
      "hanzi": "依",
      "count": 15,
      "level": 807,
      "pinyin": "yī",
      "tone_level": 1,
      "en": "depend"
  },
  {
      "hanzi": "假",
      "count": 42,
      "level": 808,
      "pinyin": "jiǎ",
      "tone_level": 3,
      "en": "fake"
  },
  {
      "hanzi": "倒",
      "count": 30,
      "level": 809,
      "pinyin": "dǎo",
      "tone_level": 3,
      "en": "upside down"
  },
  {
      "hanzi": "致",
      "count": 13,
      "level": 810,
      "pinyin": "zhì",
      "tone_level": 4,
      "en": "cause"
  },
  {
      "hanzi": "室",
      "count": 29,
      "level": 811,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "room"
  },
  {
      "hanzi": "屋",
      "count": 14,
      "level": 812,
      "pinyin": "wū",
      "tone_level": 1,
      "en": "house"
  },
  {
      "hanzi": "似",
      "count": 10,
      "level": 813,
      "pinyin": "sì",
      "tone_level": 4,
      "en": "resemble"
  },
  {
      "hanzi": "仍",
      "count": 15,
      "level": 814,
      "pinyin": "réng",
      "tone_level": 2,
      "en": "still"
  },
  {
      "hanzi": "促",
      "count": 3,
      "level": 815,
      "pinyin": "cù",
      "tone_level": 4,
      "en": "urge"
  },
  {
      "hanzi": "伙",
      "count": 15,
      "level": 816,
      "pinyin": "huǒ",
      "tone_level": 3,
      "en": "companion"
  },
  {
      "hanzi": "伴",
      "count": 6,
      "level": 817,
      "pinyin": "bàn",
      "tone_level": 4,
      "en": "partner"
  },
  {
      "hanzi": "估",
      "count": 7,
      "level": 818,
      "pinyin": "gū",
      "tone_level": 1,
      "en": "estimate"
  },
  {
      "hanzi": "倍",
      "count": 8,
      "level": 819,
      "pinyin": "bèi",
      "tone_level": 4,
      "en": "double"
  },
  {
      "hanzi": "俩",
      "count": 22,
      "level": 820,
      "pinyin": "liǎ",
      "tone_level": 3,
      "en": "two (colloquial)"
  },
  {
      "hanzi": "伪",
      "count": 3,
      "level": 821,
      "pinyin": "wěi",
      "tone_level": 3,
      "en": "fake"
  },
  {
      "hanzi": "尹",
      "count": 0,
      "level": 822,
      "pinyin": "yǐn",
      "tone_level": 3,
      "en": "surname"
  },
  {
      "hanzi": "伊",
      "count": 2,
      "level": 823,
      "pinyin": "Yī",
      "tone_level": 1,
      "en": "he, she, it"
  },
  {
      "hanzi": "康",
      "count": 31,
      "level": 824,
      "pinyin": "Kāng",
      "tone_level": 1,
      "en": "healthy"
  },
  {
      "hanzi": "争",
      "count": 26,
      "level": 825,
      "pinyin": "Zhēng",
      "tone_level": 1,
      "en": "to contend"
  },
  {
      "hanzi": "静",
      "count": 15,
      "level": 826,
      "pinyin": "Jìng",
      "tone_level": 4,
      "en": "quiet"
  },
  {
      "hanzi": "净",
      "count": 23,
      "level": 827,
      "pinyin": "Jiǎn",
      "tone_level": 3,
      "en": "clean"
  },
  {
      "hanzi": "减",
      "count": 21,
      "level": 828,
      "pinyin": "Luì",
      "tone_level": 3,
      "en": "to reduce"
  },
  {
      "hanzi": "律",
      "count": 20,
      "level": 829,
      "pinyin": "Lǜ",
      "tone_level": 3,
      "en": "law"
  },
  {
      "hanzi": "建",
      "count": 38,
      "level": 830,
      "pinyin": "Jiàn",
      "tone_level": 4,
      "en": "to build"
  },
  {
      "hanzi": "健",
      "count": 31,
      "level": 831,
      "pinyin": "Jiàn",
      "tone_level": 4,
      "en": "healthy"
  },
  {
      "hanzi": "君",
      "count": 1,
      "level": 832,
      "pinyin": "Jūn",
      "tone_level": 1,
      "en": "monarch"
  },
  {
      "hanzi": "群",
      "count": 21,
      "level": 833,
      "pinyin": "Qún",
      "tone_level": 2,
      "en": "group"
  },
  {
      "hanzi": "向",
      "count": 49,
      "level": 834,
      "pinyin": "Xiàng",
      "tone_level": 4,
      "en": "towards"
  },
  {
      "hanzi": "响",
      "count": 25,
      "level": 835,
      "pinyin": "Xiǎng",
      "tone_level": 3,
      "en": "sound"
  },
  {
      "hanzi": "尚",
      "count": 7,
      "level": 836,
      "pinyin": "Shàng",
      "tone_level": 4,
      "en": "still"
  },
  {
      "hanzi": "躺",
      "count": 2,
      "level": 837,
      "pinyin": "Tǎng",
      "tone_level": 3,
      "en": "to lie down"
  },
  {
      "hanzi": "趟",
      "count": 8,
      "level": 838,
      "pinyin": "Tàng",
      "tone_level": 4,
      "en": "a measure word for trips or visits"
  },
  {
      "hanzi": "品",
      "count": 70,
      "level": 839,
      "pinyin": "Pǐn",
      "tone_level": 3,
      "en": "product"
  },
  {
      "hanzi": "噪",
      "count": 0,
      "level": 840,
      "pinyin": "Zào",
      "tone_level": 4,
      "en": "noise"
  },
  {
      "hanzi": "操",
      "count": 10,
      "level": 841,
      "pinyin": "Cāo",
      "tone_level": 1,
      "en": "to operate, to manage"
  },
  {
      "hanzi": "澡",
      "count": 7,
      "level": 842,
      "pinyin": "Zǎo",
      "tone_level": 3,
      "en": "bath"
  },
  {
      "hanzi": "器",
      "count": 26,
      "level": 843,
      "pinyin": "Qì",
      "tone_level": 4,
      "en": "device"
  },
  {
      "hanzi": "突",
      "count": 20,
      "level": 844,
      "pinyin": "Tū",
      "tone_level": 1,
      "en": "sudden"
  },
  {
      "hanzi": "曾",
      "count": 7,
      "level": 845,
      "pinyin": "Céng",
      "tone_level": 2,
      "en": "once, previously"
  },
  {
      "hanzi": "增",
      "count": 21,
      "level": 846,
      "pinyin": "Zēng",
      "tone_level": 1,
      "en": "to increase"
  },
  {
      "hanzi": "号",
      "count": 24,
      "level": 847,
      "pinyin": "Hào",
      "tone_level": 4,
      "en": "number"
  },
  {
      "hanzi": "亏",
      "count": 11,
      "level": 848,
      "pinyin": "Kuī",
      "tone_level": 1,
      "en": "deficient"
  },
  {
      "hanzi": "污",
      "count": 11,
      "level": 849,
      "pinyin": "Wū",
      "tone_level": 1,
      "en": "dirty"
  },
  {
      "hanzi": "考",
      "count": 74,
      "level": 850,
      "pinyin": "Kǎo",
      "tone_level": 3,
      "en": "to test"
  },
  {
      "hanzi": "巧",
      "count": 20,
      "level": 851,
      "pinyin": "Qiǎo",
      "tone_level": 3,
      "en": "skillful"
  },
  {
      "hanzi": "由",
      "count": 40,
      "level": 852,
      "pinyin": "Yóu",
      "tone_level": 2,
      "en": "from"
  },
  {
      "hanzi": "油",
      "count": 17,
      "level": 853,
      "pinyin": "Yóu",
      "tone_level": 2,
      "en": "oil"
  },
  {
      "hanzi": "聘",
      "count": 6,
      "level": 854,
      "pinyin": "Pìn",
      "tone_level": 4,
      "en": "to hire"
  },
  {
      "hanzi": "抽",
      "count": 5,
      "level": 855,
      "pinyin": "Chōu",
      "tone_level": 1,
      "en": "to draw out"
  },
  {
      "hanzi": "黄",
      "count": 16,
      "level": 856,
      "pinyin": "Huáng",
      "tone_level": 2,
      "en": "yellow"
  },
  {
      "hanzi": "害",
      "count": 35,
      "level": 857,
      "pinyin": "Hài",
      "tone_level": 4,
      "en": "to harm"
  },
  {
      "hanzi": "拜",
      "count": 11,
      "level": 858,
      "pinyin": "Bài",
      "tone_level": 4,
      "en": "to worship"
  },
  {
      "hanzi": "峰",
      "count": 3,
      "level": 859,
      "pinyin": "Fēng",
      "tone_level": 1,
      "en": "peak"
  },
  {
      "hanzi": "否",
      "count": 13,
      "level": 860,
      "pinyin": "Fǒu",
      "tone_level": 3,
      "en": "no"
  },
  {
      "hanzi": "舍",
      "count": 4,
      "level": 861,
      "pinyin": "Shě",
      "tone_level": 3,
      "en": "to give up"
  },
  {
      "hanzi": "哈",
      "count": 4,
      "level": 862,
      "pinyin": "Hā",
      "tone_level": 1,
      "en": "haha"
  },
  {
      "hanzi": "命",
      "count": 18,
      "level": 863,
      "pinyin": "Mìng",
      "tone_level": 4,
      "en": "life"
  },
  {
      "hanzi": "善",
      "count": 18,
      "level": 864,
      "pinyin": "Shàn",
      "tone_level": 4,
      "en": "good"
  },
  {
      "hanzi": "吉",
      "count": 7,
      "level": 865,
      "pinyin": "Jí",
      "tone_level": 2,
      "en": "lucky"
  },
  {
      "hanzi": "叶",
      "count": 8,
      "level": 866,
      "pinyin": "Yè",
      "tone_level": 4,
      "en": "leaf"
  },
  {
      "hanzi": "吸",
      "count": 14,
      "level": 867,
      "pinyin": "Xī",
      "tone_level": 1,
      "en": "to breathe in"
  },
  {
      "hanzi": "于",
      "count": 165,
      "level": 868,
      "pinyin": "Yú",
      "tone_level": 2,
      "en": "at, in"
  },
  {
      "hanzi": "乎",
      "count": 11,
      "level": 869,
      "pinyin": "Hū",
      "tone_level": 1,
      "en": "question particle"
  },
  {
      "hanzi": "呼",
      "count": 12,
      "level": 870,
      "pinyin": "Hū",
      "tone_level": 1,
      "en": "to call"
  },
  {
      "hanzi": "呀",
      "count": 12,
      "level": 871,
      "pinyin": "Yā",
      "tone_level": 1,
      "en": "ah"
  },
  {
      "hanzi": "含",
      "count": 7,
      "level": 872,
      "pinyin": "Hán",
      "tone_level": 2,
      "en": "to contain"
  },
  {
      "hanzi": "嘴",
      "count": 5,
      "level": 873,
      "pinyin": "Zuǐ",
      "tone_level": 3,
      "en": "mouth"
  },
  {
      "hanzi": "确",
      "count": 22,
      "level": 874,
      "pinyin": "Què",
      "tone_level": 4,
      "en": "sure"
  },
  {
      "hanzi": "售",
      "count": 10,
      "level": 875,
      "pinyin": "Shòu",
      "tone_level": 4,
      "en": "to sell"
  },
  {
      "hanzi": "啦",
      "count": 1,
      "level": 876,
      "pinyin": "La",
      "tone_level": 5,
      "en": "used to indicate a suggestion or a command"
  },
  {
      "hanzi": "咱",
      "count": 8,
      "level": 877,
      "pinyin": "Zán",
      "tone_level": 2,
      "en": "we, us"
  },
  {
      "hanzi": "哦",
      "count": 4,
      "level": 878,
      "pinyin": "È",
      "tone_level": 2,
      "en": "oh"
  },
  {
      "hanzi": "咖",
      "count": 8,
      "level": 879,
      "pinyin": "Kā",
      "tone_level": 1,
      "en": "coffee"
  },
  {
      "hanzi": "啡",
      "count": 8,
      "level": 880,
      "pinyin": "fēi",
      "tone_level": 1,
      "en": "coffee"
  },
  {
      "hanzi": "排",
      "count": 21,
      "level": 881,
      "pinyin": "Fēi",
      "tone_level": 1,
      "en": "to arrange"
  },
  {
      "hanzi": "罪",
      "count": 5,
      "level": 882,
      "pinyin": "Zuì",
      "tone_level": 4,
      "en": "crime"
  },
  {
      "hanzi": "靠",
      "count": 19,
      "level": 883,
      "pinyin": "Kào",
      "tone_level": 4,
      "en": "to rely on"
  },
  {
      "hanzi": "喝",
      "count": 64,
      "level": 884,
      "pinyin": "Hē",
      "tone_level": 1,
      "en": "to drink"
  },
  {
      "hanzi": "渴",
      "count": 9,
      "level": 885,
      "pinyin": "Kě",
      "tone_level": 3,
      "en": "thirsty"
  },
  {
      "hanzi": "歇",
      "count": 1,
      "level": 886,
      "pinyin": "Xiē",
      "tone_level": 1,
      "en": "to rest"
  },
  {
      "hanzi": "结",
      "count": 73,
      "level": 887,
      "pinyin": "Jié",
      "tone_level": 2,
      "en": "to tie, to connect"
  },
  {
      "hanzi": "组",
      "count": 23,
      "level": 888,
      "pinyin": "Zǔ",
      "tone_level": 3,
      "en": "to organize"
  },
  {
      "hanzi": "具",
      "count": 30,
      "level": 889,
      "pinyin": "Jù",
      "tone_level": 4,
      "en": "tool"
  },
  {
      "hanzi": "惧",
      "count": 2,
      "level": 890,
      "pinyin": "Jù",
      "tone_level": 4,
      "en": "to fear"
  },
  {
      "hanzi": "线",
      "count": 14,
      "level": 891,
      "pinyin": "Xiàn",
      "tone_level": 4,
      "en": "line"
  },
  {
      "hanzi": "级",
      "count": 43,
      "level": 892,
      "pinyin": "Jí",
      "tone_level": 2,
      "en": "level"
  },
  {
      "hanzi": "续",
      "count": 24,
      "level": 893,
      "pinyin": "Xù",
      "tone_level": 4,
      "en": "to continue"
  },
  {
      "hanzi": "织",
      "count": 5,
      "level": 894,
      "pinyin": "Zhī",
      "tone_level": 1,
      "en": "to weave"
  },
  {
      "hanzi": "职",
      "count": 18,
      "level": 895,
      "pinyin": "Zhí",
      "tone_level": 2,
      "en": "job"
  },
  {
      "hanzi": "终",
      "count": 68,
      "level": 896,
      "pinyin": "Zhōng",
      "tone_level": 1,
      "en": "end"
  },
  {
      "hanzi": "细",
      "count": 21,
      "level": 897,
      "pinyin": "Xì",
      "tone_level": 4,
      "en": "thin"
  },
  {
      "hanzi": "维",
      "count": 15,
      "level": 898,
      "pinyin": "Wéi",
      "tone_level": 2,
      "en": "to maintain"
  },
  {
      "hanzi": "焦",
      "count": 6,
      "level": 899,
      "pinyin": "Jiāo",
      "tone_level": 1,
      "en": "anxious"
  },
  {
      "hanzi": "蕉",
      "count": 4,
      "level": 900,
      "pinyin": "Jiāo",
      "tone_level": 1,
      "en": "banana"
  },
  {
      "hanzi": "熊",
      "count": 10,
      "level": 901,
      "pinyin": "Xióng",
      "tone_level": 2,
      "en": "bear"
  },
  {
      "hanzi": "继",
      "count": 8,
      "level": 902,
      "pinyin": "Jì",
      "tone_level": 4,
      "en": "to continue"
  },
  {
      "hanzi": "世",
      "count": 51,
      "level": 903,
      "pinyin": "Shì",
      "tone_level": 4,
      "en": "world"
  },
  {
      "hanzi": "绝",
      "count": 18,
      "level": 904,
      "pinyin": "Jué",
      "tone_level": 2,
      "en": "extreme"
  },
  {
      "hanzi": "负",
      "count": 25,
      "level": 905,
      "pinyin": "Fù",
      "tone_level": 4,
      "en": "to bear"
  },
  {
      "hanzi": "赖",
      "count": 3,
      "level": 906,
      "pinyin": "Lài",
      "tone_level": 4,
      "en": "to rely on"
  },
  {
      "hanzi": "懒",
      "count": 3,
      "level": 907,
      "pinyin": "Lǎn",
      "tone_level": 3,
      "en": "lazy"
  },
  {
      "hanzi": "纪",
      "count": 12,
      "level": 908,
      "pinyin": "Jì",
      "tone_level": 4,
      "en": "record"
  },
  {
      "hanzi": "练",
      "count": 22,
      "level": 909,
      "pinyin": "Liàn",
      "tone_level": 4,
      "en": "to practice"
  },
  {
      "hanzi": "纳",
      "count": 5,
      "level": 910,
      "pinyin": "Nà",
      "tone_level": 4,
      "en": "to accept"
  },
  {
      "hanzi": "络",
      "count": 9,
      "level": 911,
      "pinyin": "Luò",
      "tone_level": 4,
      "en": "net"
  },
  {
      "hanzi": "丝",
      "count": 7,
      "level": 912,
      "pinyin": "Sī",
      "tone_level": 1,
      "en": "silk"
  },
  {
      "hanzi": "纯",
      "count": 4,
      "level": 913,
      "pinyin": "Chún",
      "tone_level": 2,
      "en": "pure"
  },
  {
      "hanzi": "顿",
      "count": 11,
      "level": 914,
      "pinyin": "Dùn",
      "tone_level": 4,
      "en": "a measure word for meals"
  },
  {
      "hanzi": "吨",
      "count": 2,
      "level": 915,
      "pinyin": "Dūn",
      "tone_level": 1,
      "en": "ton"
  },
  {
      "hanzi": "绩",
      "count": 15,
      "level": 916,
      "pinyin": "Jì",
      "tone_level": 4,
      "en": "achievement"
  },
  {
      "hanzi": "综",
      "count": 0,
      "level": 917,
      "pinyin": "Zōng",
      "tone_level": 1,
      "en": "comprehensive"
  },
  {
      "hanzi": "缓",
      "count": 3,
      "level": 918,
      "pinyin": "Huǎn",
      "tone_level": 3,
      "en": "slow"
  },
  {
      "hanzi": "暖",
      "count": 11,
      "level": 919,
      "pinyin": "Nuǎn",
      "tone_level": 3,
      "en": "warm"
  },
  {
      "hanzi": "纷",
      "count": 4,
      "level": 920,
      "pinyin": "Fēn",
      "tone_level": 1,
      "en": "numerous"
  },
  {
      "hanzi": "纠",
      "count": 5,
      "level": 921,
      "pinyin": "jiū",
      "tone_level": 1,
      "en": "to correct"
  },
  {
      "hanzi": "宿",
      "count": 1,
      "level": 922,
      "pinyin": "sù",
      "tone_level": 4,
      "en": "inn"
  },
  {
      "hanzi": "缩",
      "count": 4,
      "level": 923,
      "pinyin": "suō",
      "tone_level": 1,
      "en": "to contract"
  },
  {
      "hanzi": "互",
      "count": 18,
      "level": 924,
      "pinyin": "hù",
      "tone_level": 4,
      "en": "mutual"
  },
  {
      "hanzi": "缘",
      "count": 5,
      "level": 925,
      "pinyin": "yuán",
      "tone_level": 2,
      "en": "cause; fate"
  },
  {
      "hanzi": "制",
      "count": 40,
      "level": 926,
      "pinyin": "zhì",
      "tone_level": 4,
      "en": "to control"
  },
  {
      "hanzi": "刑",
      "count": 2,
      "level": 927,
      "pinyin": "xíng",
      "tone_level": 2,
      "en": "punishment"
  },
  {
      "hanzi": "型",
      "count": 10,
      "level": 928,
      "pinyin": "xíng",
      "tone_level": 2,
      "en": "model; type"
  },
  {
      "hanzi": "形",
      "count": 14,
      "level": 929,
      "pinyin": "xíng",
      "tone_level": 2,
      "en": "form"
  },
  {
      "hanzi": "研",
      "count": 13,
      "level": 930,
      "pinyin": "yán",
      "tone_level": 2,
      "en": "to study"
  },
  {
      "hanzi": "则",
      "count": 11,
      "level": 931,
      "pinyin": "zé",
      "tone_level": 2,
      "en": "rule"
  },
  {
      "hanzi": "厕",
      "count": 3,
      "level": 932,
      "pinyin": "cè",
      "tone_level": 4,
      "en": "toilet"
  },
  {
      "hanzi": "测",
      "count": 14,
      "level": 933,
      "pinyin": "cè",
      "tone_level": 4,
      "en": "to test"
  },
  {
      "hanzi": "创",
      "count": 18,
      "level": 934,
      "pinyin": "chuàng",
      "tone_level": 4,
      "en": "to create"
  },
  {
      "hanzi": "列",
      "count": 14,
      "level": 935,
      "pinyin": "liè",
      "tone_level": 4,
      "en": "to arrange"
  },
  {
      "hanzi": "例",
      "count": 8,
      "level": 936,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "example"
  },
  {
      "hanzi": "残",
      "count": 10,
      "level": 937,
      "pinyin": "cán",
      "tone_level": 2,
      "en": "to remain"
  },
  {
      "hanzi": "烈",
      "count": 9,
      "level": 938,
      "pinyin": "liè",
      "tone_level": 4,
      "en": "fierce"
  },
  {
      "hanzi": "副",
      "count": 4,
      "level": 939,
      "pinyin": "fù",
      "tone_level": 4,
      "en": "deputy"
  },
  {
      "hanzi": "福",
      "count": 16,
      "level": 940,
      "pinyin": "fú",
      "tone_level": 2,
      "en": "blessing"
  },
  {
      "hanzi": "富",
      "count": 17,
      "level": 941,
      "pinyin": "fù",
      "tone_level": 4,
      "en": "rich"
  },
  {
      "hanzi": "幅",
      "count": 6,
      "level": 942,
      "pinyin": "fú",
      "tone_level": 2,
      "en": "measure word for cloth"
  },
  {
      "hanzi": "剧",
      "count": 14,
      "level": 943,
      "pinyin": "jù",
      "tone_level": 4,
      "en": "drama"
  },
  {
      "hanzi": "刘",
      "count": 3,
      "level": 944,
      "pinyin": "liú",
      "tone_level": 2,
      "en": "surname Liu"
  },
  {
      "hanzi": "判",
      "count": 8,
      "level": 945,
      "pinyin": "pàn",
      "tone_level": 4,
      "en": "to judge"
  },
  {
      "hanzi": "归",
      "count": 7,
      "level": 946,
      "pinyin": "guī",
      "tone_level": 1,
      "en": "to return"
  },
  {
      "hanzi": "刺",
      "count": 4,
      "level": 947,
      "pinyin": "cì",
      "tone_level": 4,
      "en": "to stab"
  },
  {
      "hanzi": "刷",
      "count": 8,
      "level": 948,
      "pinyin": "shuā",
      "tone_level": 1,
      "en": "to brush"
  },
  {
      "hanzi": "刮",
      "count": 3,
      "level": 949,
      "pinyin": "guā",
      "tone_level": 1,
      "en": "to scrape"
  },
  {
      "hanzi": "俞",
      "count": 0,
      "level": 950,
      "pinyin": "yú",
      "tone_level": 2,
      "en": "to consent"
  },
  {
      "hanzi": "偷",
      "count": 22,
      "level": 951,
      "pinyin": "tōu",
      "tone_level": 1,
      "en": "to steal"
  },
  {
      "hanzi": "输",
      "count": 6,
      "level": 952,
      "pinyin": "shū",
      "tone_level": 1,
      "en": "to lose"
  },
  {
      "hanzi": "愉",
      "count": 3,
      "level": 953,
      "pinyin": "yú",
      "tone_level": 2,
      "en": "pleasant"
  },
  {
      "hanzi": "紧",
      "count": 32,
      "level": 954,
      "pinyin": "jǐn",
      "tone_level": 3,
      "en": "tight"
  },
  {
      "hanzi": "索",
      "count": 5,
      "level": 955,
      "pinyin": "suǒ",
      "tone_level": 3,
      "en": "to search"
  },
  {
      "hanzi": "素",
      "count": 6,
      "level": 956,
      "pinyin": "sù",
      "tone_level": 4,
      "en": "plain; white"
  },
  {
      "hanzi": "责",
      "count": 25,
      "level": 957,
      "pinyin": "zé",
      "tone_level": 2,
      "en": "to blame"
  },
  {
      "hanzi": "达",
      "count": 35,
      "level": 958,
      "pinyin": "dá",
      "tone_level": 2,
      "en": "to reach"
  },
  {
      "hanzi": "选",
      "count": 44,
      "level": 959,
      "pinyin": "xuǎn",
      "tone_level": 3,
      "en": "to choose"
  },
  {
      "hanzi": "造",
      "count": 21,
      "level": 960,
      "pinyin": "zào",
      "tone_level": 4,
      "en": "to make"
  },
  {
      "hanzi": "适",
      "count": 22,
      "level": 961,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "suitable"
  },
  {
      "hanzi": "退",
      "count": 14,
      "level": 962,
      "pinyin": "tuì",
      "tone_level": 4,
      "en": "to retreat"
  },
  {
      "hanzi": "遇",
      "count": 28,
      "level": 963,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "to meet"
  },
  {
      "hanzi": "偶",
      "count": 7,
      "level": 964,
      "pinyin": "ǒu",
      "tone_level": 3,
      "en": "occasional"
  },
  {
      "hanzi": "寓",
      "count": 2,
      "level": 965,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "reside"
  },
  {
      "hanzi": "追",
      "count": 9,
      "level": 966,
      "pinyin": "zhuī",
      "tone_level": 1,
      "en": "to chase"
  },
  {
      "hanzi": "官",
      "count": 16,
      "level": 967,
      "pinyin": "guān",
      "tone_level": 1,
      "en": "official"
  },
  {
      "hanzi": "管",
      "count": 48,
      "level": 968,
      "pinyin": "guǎn",
      "tone_level": 3,
      "en": "to manage"
  },
  {
      "hanzi": "馆",
      "count": 27,
      "level": 969,
      "pinyin": "guǎn",
      "tone_level": 3,
      "en": "hall"
  },
  {
      "hanzi": "饺",
      "count": 4,
      "level": 970,
      "pinyin": "jiǎo",
      "tone_level": 3,
      "en": "dumpling"
  },
  {
      "hanzi": "饮",
      "count": 5,
      "level": 971,
      "pinyin": "yǐn",
      "tone_level": 3,
      "en": "to drink"
  },
  {
      "hanzi": "迷",
      "count": 15,
      "level": 972,
      "pinyin": "mí",
      "tone_level": 2,
      "en": "to bewilder"
  },
  {
      "hanzi": "透",
      "count": 7,
      "level": 973,
      "pinyin": "tòu",
      "tone_level": 4,
      "en": "penetrate"
  },
  {
      "hanzi": "述",
      "count": 4,
      "level": 974,
      "pinyin": "shù",
      "tone_level": 4,
      "en": "to describe"
  },
  {
      "hanzi": "迎",
      "count": 16,
      "level": 975,
      "pinyin": "yíng",
      "tone_level": 2,
      "en": "to welcome"
  },
  {
      "hanzi": "印",
      "count": 15,
      "level": 976,
      "pinyin": "yìn",
      "tone_level": 4,
      "en": "to print"
  },
  {
      "hanzi": "即",
      "count": 18,
      "level": 977,
      "pinyin": "jí",
      "tone_level": 2,
      "en": "to be"
  },
  {
      "hanzi": "却",
      "count": 30,
      "level": 978,
      "pinyin": "què",
      "tone_level": 4,
      "en": "but"
  },
  {
      "hanzi": "脚",
      "count": 15,
      "level": 979,
      "pinyin": "jiǎo",
      "tone_level": 3,
      "en": "foot"
  },
  {
      "hanzi": "遗",
      "count": 5,
      "level": 980,
      "pinyin": "yí",
      "tone_level": 2,
      "en": "to leave behind"
  },
  {
      "hanzi": "逐",
      "count": 8,
      "level": 981,
      "pinyin": "zhú",
      "tone_level": 2,
      "en": "to pursue"
  },
  {
      "hanzi": "逛",
      "count": 4,
      "level": 982,
      "pinyin": "guàng",
      "tone_level": 4,
      "en": "to stroll"
  },
  {
      "hanzi": "违",
      "count": 8,
      "level": 983,
      "pinyin": "wéi",
      "tone_level": 2,
      "en": "to violate"
  },
  {
      "hanzi": "避",
      "count": 8,
      "level": 984,
      "pinyin": "bì",
      "tone_level": 4,
      "en": "to avoid"
  },
  {
      "hanzi": "邀",
      "count": 1,
      "level": 985,
      "pinyin": "yāo",
      "tone_level": 1,
      "en": "to invite"
  },
  {
      "hanzi": "激",
      "count": 5,
      "level": 986,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "to stimulate"
  },
  {
      "hanzi": "疑",
      "count": 7,
      "level": 987,
      "pinyin": "yí",
      "tone_level": 2,
      "en": "to doubt"
  },
  {
      "hanzi": "予",
      "count": 4,
      "level": 988,
      "pinyin": "yǔ",
      "tone_level": 3,
      "en": "to give"
  },
  {
      "hanzi": "预",
      "count": 29,
      "level": 989,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "to prepare"
  },
  {
      "hanzi": "序",
      "count": 2,
      "level": 990,
      "pinyin": "xù",
      "tone_level": 4,
      "en": "order"
  },
  {
      "hanzi": "野",
      "count": 7,
      "level": 991,
      "pinyin": "yě",
      "tone_level": 3,
      "en": "wild"
  },
  {
      "hanzi": "舒",
      "count": 18,
      "level": 992,
      "pinyin": "shū",
      "tone_level": 1,
      "en": "to relax"
  },
  {
      "hanzi": "无",
      "count": 53,
      "level": 993,
      "pinyin": "wú",
      "tone_level": 2,
      "en": "without"
  },
  {
      "hanzi": "既",
      "count": 7,
      "level": 994,
      "pinyin": "jì",
      "tone_level": 4,
      "en": "already"
  },
  {
      "hanzi": "概",
      "count": 4,
      "level": 995,
      "pinyin": "gài",
      "tone_level": 4,
      "en": "general"
  },
  {
      "hanzi": "击",
      "count": 11,
      "level": 996,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "to hit"
  },
  {
      "hanzi": "毛",
      "count": 19,
      "level": 997,
      "pinyin": "máo",
      "tone_level": 2,
      "en": "fur"
  },
  {
      "hanzi": "丈",
      "count": 3,
      "level": 998,
      "pinyin": "zhàng",
      "tone_level": 4,
      "en": "ten feet"
  },
  {
      "hanzi": "夫",
      "count": 15,
      "level": 999,
      "pinyin": "fū",
      "tone_level": 1,
      "en": "husband"
  },
  {
      "hanzi": "规",
      "count": 25,
      "level": 1000,
      "pinyin": "guī",
      "tone_level": 1,
      "en": "rule"
  },
  {
      "hanzi": "肤",
      "count": 7,
      "level": 1001,
      "pinyin": "fū",
      "tone_level": 1,
      "en": "skin"
  },
  {
      "hanzi": "失",
      "count": 36,
      "level": 1002,
      "pinyin": "shī",
      "tone_level": 1,
      "en": "to lose"
  },
  {
      "hanzi": "跌",
      "count": 2,
      "level": 1003,
      "pinyin": "diē",
      "tone_level": 1,
      "en": "to fall"
  },
  {
      "hanzi": "铁",
      "count": 26,
      "level": 1004,
      "pinyin": "tiě",
      "tone_level": 3,
      "en": "iron"
  },
  {
      "hanzi": "升",
      "count": 15,
      "level": 1005,
      "pinyin": "shēng",
      "tone_level": 1,
      "en": "to rise"
  },
  {
      "hanzi": "久",
      "count": 33,
      "level": 1006,
      "pinyin": "jiǔ",
      "tone_level": 3,
      "en": "long"
  },
  {
      "hanzi": "乡",
      "count": 30,
      "level": 1007,
      "pinyin": "xiāng",
      "tone_level": 1,
      "en": "village"
  },
  {
      "hanzi": "玄",
      "count": 0,
      "level": 1008,
      "pinyin": "xuán",
      "tone_level": 2,
      "en": "mysterious"
  },
  {
      "hanzi": "幽",
      "count": 1,
      "level": 1009,
      "pinyin": "yōu",
      "tone_level": 1,
      "en": "hidden"
  },
  {
      "hanzi": "率",
      "count": 11,
      "level": 1010,
      "pinyin": "lǜ",
      "tone_level": 4,
      "en": "to lead"
  },
  {
      "hanzi": "利",
      "count": 59,
      "level": 1011,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "advantage"
  },
  {
      "hanzi": "程",
      "count": 42,
      "level": 1012,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "journey"
  },
  {
      "hanzi": "斗",
      "count": 8,
      "level": 1013,
      "pinyin": "dòu",
      "tone_level": 4,
      "en": "to fight"
  },
  {
      "hanzi": "科",
      "count": 35,
      "level": 1014,
      "pinyin": "kē",
      "tone_level": 1,
      "en": "science"
  },
  {
      "hanzi": "料",
      "count": 27,
      "level": 1015,
      "pinyin": "liào",
      "tone_level": 4,
      "en": "material"
  },
  {
      "hanzi": "称",
      "count": 13,
      "level": 1016,
      "pinyin": "chēng",
      "tone_level": 1,
      "en": "to call"
  },
  {
      "hanzi": "积",
      "count": 12,
      "level": 1017,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "to accumulate"
  },
  {
      "hanzi": "税",
      "count": 5,
      "level": 1018,
      "pinyin": "shuì",
      "tone_level": 4,
      "en": "tax"
  },
  {
      "hanzi": "季",
      "count": 18,
      "level": 1019,
      "pinyin": "jì",
      "tone_level": 4,
      "en": "season"
  },
  {
      "hanzi": "移",
      "count": 13,
      "level": 1020,
      "pinyin": "yí",
      "tone_level": 2,
      "en": "to move"
  },
  {
      "hanzi": "私",
      "count": 9,
      "level": 1021,
      "pinyin": "sī",
      "tone_level": 1,
      "en": "private"
  },
  {
      "hanzi": "秀",
      "count": 9,
      "level": 1022,
      "pinyin": "xiù",
      "tone_level": 4,
      "en": "elegant"
  },
  {
      "hanzi": "必",
      "count": 30,
      "level": 1023,
      "pinyin": "bì",
      "tone_level": 4,
      "en": "must"
  },
  {
      "hanzi": "秘",
      "count": 10,
      "level": 1024,
      "pinyin": "mì",
      "tone_level": 4,
      "en": "secret"
  },
  {
      "hanzi": "密",
      "count": 12,
      "level": 1025,
      "pinyin": "mì",
      "tone_level": 4,
      "en": "secret"
  },
  {
      "hanzi": "租",
      "count": 13,
      "level": 1026,
      "pinyin": "zū",
      "tone_level": 1,
      "en": "to rent"
  },
  {
      "hanzi": "粗",
      "count": 4,
      "level": 1027,
      "pinyin": "cū",
      "tone_level": 1,
      "en": "rough"
  },
  {
      "hanzi": "秋",
      "count": 25,
      "level": 1028,
      "pinyin": "qiū",
      "tone_level": 1,
      "en": "autumn"
  },
  {
      "hanzi": "秒",
      "count": 2,
      "level": 1029,
      "pinyin": "miǎo",
      "tone_level": 3,
      "en": "second"
  },
  {
      "hanzi": "稍",
      "count": 2,
      "level": 1030,
      "pinyin": "shāo",
      "tone_level": 1,
      "en": "a little"
  },
  {
      "hanzi": "队",
      "count": 41,
      "level": 1031,
      "pinyin": "duì",
      "tone_level": 4,
      "en": "team"
  },
  {
      "hanzi": "防",
      "count": 15,
      "level": 1032,
      "pinyin": "fáng",
      "tone_level": 2,
      "en": "to defend"
  },
  {
      "hanzi": "阿",
      "count": 6,
      "level": 1033,
      "pinyin": "ā",
      "tone_level": 1,
      "en": "prefix for names"
  },
  {
      "hanzi": "啊",
      "count": 36,
      "level": 1034,
      "pinyin": "a",
      "tone_level": 1,
      "en": "exclamation"
  },
  {
      "hanzi": "限",
      "count": 8,
      "level": 1035,
      "pinyin": "xiàn",
      "tone_level": 4,
      "en": "limit"
  },
  {
      "hanzi": "降",
      "count": 8,
      "level": 1036,
      "pinyin": "jiàng",
      "tone_level": 4,
      "en": "to descend"
  },
  {
      "hanzi": "舞",
      "count": 9,
      "level": 1037,
      "pinyin": "wǔ",
      "tone_level": 3,
      "en": "dance"
  },
  {
      "hanzi": "处",
      "count": 57,
      "level": 1038,
      "pinyin": "chù",
      "tone_level": 4,
      "en": "place"
  },
  {
      "hanzi": "陈",
      "count": 1,
      "level": 1039,
      "pinyin": "chén",
      "tone_level": 2,
      "en": "old"
  },
  {
      "hanzi": "阵",
      "count": 8,
      "level": 1040,
      "pinyin": "zhèn",
      "tone_level": 4,
      "en": "formation"
  },
  {
      "hanzi": "陆",
      "count": 7,
      "level": 1041,
      "pinyin": "lù",
      "tone_level": 4,
      "en": "land"
  },
  {
      "hanzi": "附",
      "count": 22,
      "level": 1042,
      "pinyin": "fù",
      "tone_level": 4,
      "en": "to attach"
  },
  {
      "hanzi": "障",
      "count": 5,
      "level": 1043,
      "pinyin": "zhàng",
      "tone_level": 4,
      "en": "obstacle"
  },
  {
      "hanzi": "阻",
      "count": 7,
      "level": 1044,
      "pinyin": "zǔ",
      "tone_level": 3,
      "en": "to hinder"
  },
  {
      "hanzi": "陪",
      "count": 13,
      "level": 1045,
      "pinyin": "péi",
      "tone_level": 2,
      "en": "to accompany"
  },
  {
      "hanzi": "邮",
      "count": 11,
      "level": 1046,
      "pinyin": "yóu",
      "tone_level": 2,
      "en": "mail"
  },
  {
      "hanzi": "邻",
      "count": 7,
      "level": 1047,
      "pinyin": "lín",
      "tone_level": 2,
      "en": "neighbor"
  },
  {
      "hanzi": "郊",
      "count": 3,
      "level": 1048,
      "pinyin": "jiāo",
      "tone_level": 1,
      "en": "suburb"
  },
  {
      "hanzi": "理",
      "count": 87,
      "level": 1049,
      "pinyin": "lǐ",
      "tone_level": 3,
      "en": "reason"
  },
  {
      "hanzi": "量",
      "count": 49,
      "level": 1050,
      "pinyin": "liàng",
      "tone_level": 4,
      "en": "quantity"
  },
  {
      "hanzi": "望",
      "count": 51,
      "level": 1051,
      "pinyin": "wàng",
      "tone_level": 4,
      "en": "to hope"
  },
  {
      "hanzi": "环",
      "count": 19,
      "level": 1052,
      "pinyin": "huán",
      "tone_level": 2,
      "en": "ring"
  },
  {
      "hanzi": "弄",
      "count": 22,
      "level": 1053,
      "pinyin": "nòng",
      "tone_level": 4,
      "en": "to do"
  },
  {
      "hanzi": "皇",
      "count": 2,
      "level": 1054,
      "pinyin": "huáng",
      "tone_level": 2,
      "en": "emperor"
  },
  {
      "hanzi": "泉",
      "count": 4,
      "level": 1055,
      "pinyin": "quán",
      "tone_level": 2,
      "en": "spring"
  },
  {
      "hanzi": "貌",
      "count": 11,
      "level": 1056,
      "pinyin": "mào",
      "tone_level": 4,
      "en": "appearance"
  },
  {
      "hanzi": "卑",
      "count": 1,
      "level": 1057,
      "pinyin": "bēi",
      "tone_level": 1,
      "en": "low"
  },
  {
      "hanzi": "牌",
      "count": 20,
      "level": 1058,
      "pinyin": "pái",
      "tone_level": 2,
      "en": "card"
  },
  {
      "hanzi": "啤",
      "count": 3,
      "level": 1059,
      "pinyin": "pí",
      "tone_level": 2,
      "en": "beer"
  },
  {
      "hanzi": "脾",
      "count": 5,
      "level": 1060,
      "pinyin": "pí",
      "tone_level": 2,
      "en": "spleen"
  },
  {
      "hanzi": "基",
      "count": 22,
      "level": 1061,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "base"
  },
  {
      "hanzi": "社",
      "count": 28,
      "level": 1062,
      "pinyin": "shè",
      "tone_level": 4,
      "en": "society"
  },
  {
      "hanzi": "礼",
      "count": 43,
      "level": 1063,
      "pinyin": "lǐ",
      "tone_level": 3,
      "en": "ritual"
  },
  {
      "hanzi": "祝",
      "count": 24,
      "level": 1064,
      "pinyin": "zhù",
      "tone_level": 4,
      "en": "to bless"
  },
  {
      "hanzi": "竟",
      "count": 17,
      "level": 1065,
      "pinyin": "jìng",
      "tone_level": 4,
      "en": "unexpectedly"
  },
  {
      "hanzi": "境",
      "count": 17,
      "level": 1066,
      "pinyin": "jìng",
      "tone_level": 4,
      "en": "boundary"
  },
  {
      "hanzi": "镜",
      "count": 7,
      "level": 1067,
      "pinyin": "jìng",
      "tone_level": 4,
      "en": "mirror"
  },
  {
      "hanzi": "压",
      "count": 12,
      "level": 1068,
      "pinyin": "yā",
      "tone_level": 1,
      "en": "to press"
  },
  {
      "hanzi": "均",
      "count": 7,
      "level": 1069,
      "pinyin": "jūn",
      "tone_level": 1,
      "en": "equal"
  },
  {
      "hanzi": "坚",
      "count": 14,
      "level": 1070,
      "pinyin": "jiān",
      "tone_level": 1,
      "en": "firm"
  },
  {
      "hanzi": "域",
      "count": 3,
      "level": 1071,
      "pinyin": "yù",
      "tone_level": 4,
      "en": "region"
  },
  {
      "hanzi": "培",
      "count": 8,
      "level": 1072,
      "pinyin": "péi",
      "tone_level": 2,
      "en": "to cultivate"
  },
  {
      "hanzi": "圣",
      "count": 4,
      "level": 1073,
      "pinyin": "shèng",
      "tone_level": 4,
      "en": "saintly"
  },
  {
      "hanzi": "址",
      "count": 5,
      "level": 1074,
      "pinyin": "zhǐ",
      "tone_level": 3,
      "en": "address"
  },
  {
      "hanzi": "填",
      "count": 6,
      "level": 1075,
      "pinyin": "tián",
      "tone_level": 2,
      "en": "to fill in"
  },
  {
      "hanzi": "堵",
      "count": 6,
      "level": 1076,
      "pinyin": "dǔ",
      "tone_level": 3,
      "en": "to block"
  },
  {
      "hanzi": "垃",
      "count": 10,
      "level": 1077,
      "pinyin": "lā",
      "tone_level": 1,
      "en": "garbage"
  },
  {
      "hanzi": "圾",
      "count": 10,
      "level": 1078,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "rubbish"
  },
  {
      "hanzi": "丑",
      "count": 6,
      "level": 1079,
      "pinyin": "chǒu",
      "tone_level": 3,
      "en": "ugly"
  },
  {
      "hanzi": "羞",
      "count": 2,
      "level": 1080,
      "pinyin": "xiū",
      "tone_level": 1,
      "en": "shy"
  },
  {
      "hanzi": "塑",
      "count": 6,
      "level": 1081,
      "pinyin": "sù",
      "tone_level": 4,
      "en": "to shape, to mold"
  },
  {
      "hanzi": "逆",
      "count": 1,
      "level": 1082,
      "pinyin": "nì",
      "tone_level": 4,
      "en": "reverse"
  },
  {
      "hanzi": "股",
      "count": 11,
      "level": 1083,
      "pinyin": "gǔ",
      "tone_level": 3,
      "en": "stock"
  },
  {
      "hanzi": "胜",
      "count": 17,
      "level": 1084,
      "pinyin": "shèng",
      "tone_level": 1,
      "en": "victory"
  },
  {
      "hanzi": "胞",
      "count": 6,
      "level": 1085,
      "pinyin": "bāo",
      "tone_level": 1,
      "en": "sac"
  },
  {
      "hanzi": "腿",
      "count": 10,
      "level": 1086,
      "pinyin": "tuǐ",
      "tone_level": 3,
      "en": "leg"
  },
  {
      "hanzi": "脱",
      "count": 5,
      "level": 1087,
      "pinyin": "tuō",
      "tone_level": 1,
      "en": "take off"
  },
  {
      "hanzi": "阅",
      "count": 4,
      "level": 1088,
      "pinyin": "yuè",
      "tone_level": 4,
      "en": "read"
  },
  {
      "hanzi": "肥",
      "count": 14,
      "level": 1089,
      "pinyin": "féi",
      "tone_level": 2,
      "en": "fat"
  },
  {
      "hanzi": "爸",
      "count": 72,
      "level": 1090,
      "pinyin": "bà",
      "tone_level": 4,
      "en": "dad"
  },
  {
      "hanzi": "肯",
      "count": 17,
      "level": 1091,
      "pinyin": "kěn",
      "tone_level": 3,
      "en": "willing"
  },
  {
      "hanzi": "阴",
      "count": 8,
      "level": 1092,
      "pinyin": "yīn",
      "tone_level": 1,
      "en": "dark"
  },
  {
      "hanzi": "肿",
      "count": 3,
      "level": 1093,
      "pinyin": "zhǒng",
      "tone_level": 3,
      "en": "swollen"
  },
  {
      "hanzi": "冲",
      "count": 17,
      "level": 1094,
      "pinyin": "chōng",
      "tone_level": 1,
      "en": "rush"
  },
  {
      "hanzi": "膏",
      "count": 2,
      "level": 1095,
      "pinyin": "gāo",
      "tone_level": 1,
      "en": "ointment"
  },
  {
      "hanzi": "胳",
      "count": 0,
      "level": 1096,
      "pinyin": "gē",
      "tone_level": 1,
      "en": "armpit"
  },
  {
      "hanzi": "朝",
      "count": 6,
      "level": 1097,
      "pinyin": "zhāo",
      "tone_level": 1,
      "en": "morning"
  },
  {
      "hanzi": "潮",
      "count": 5,
      "level": 1098,
      "pinyin": "cháo",
      "tone_level": 2,
      "en": "tide"
  },
  {
      "hanzi": "韩",
      "count": 7,
      "level": 1099,
      "pinyin": "hán",
      "tone_level": 2,
      "en": "Korea"
  },
  {
      "hanzi": "赢",
      "count": 13,
      "level": 1100,
      "pinyin": "yíng",
      "tone_level": 2,
      "en": "win"
  },
  {
      "hanzi": "背",
      "count": 20,
      "level": 1101,
      "pinyin": "bèi",
      "tone_level": 4,
      "en": "back"
  },
  {
      "hanzi": "肌",
      "count": 2,
      "level": 1102,
      "pinyin": "jī",
      "tone_level": 1,
      "en": "muscle"
  },
  {
      "hanzi": "胶",
      "count": 2,
      "level": 1103,
      "pinyin": "jiāo",
      "tone_level": 1,
      "en": "glue"
  },
  {
      "hanzi": "乘",
      "count": 7,
      "level": 1104,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "ride"
  },
  {
      "hanzi": "剩",
      "count": 6,
      "level": 1105,
      "pinyin": "shèng",
      "tone_level": 4,
      "en": "leftover"
  },
  {
      "hanzi": "骨",
      "count": 3,
      "level": 1106,
      "pinyin": "gǔ",
      "tone_level": 3,
      "en": "bone"
  },
  {
      "hanzi": "滑",
      "count": 7,
      "level": 1107,
      "pinyin": "huá",
      "tone_level": 2,
      "en": "slippery"
  },
  {
      "hanzi": "区",
      "count": 52,
      "level": 1108,
      "pinyin": "qū",
      "tone_level": 1,
      "en": "area"
  },
  {
      "hanzi": "欧",
      "count": 4,
      "level": 1109,
      "pinyin": "ōu",
      "tone_level": 1,
      "en": "Europe"
  },
  {
      "hanzi": "义",
      "count": 23,
      "level": 1110,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "justice"
  },
  {
      "hanzi": "议",
      "count": 33,
      "level": 1111,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "discuss"
  },
  {
      "hanzi": "希",
      "count": 38,
      "level": 1112,
      "pinyin": "xī",
      "tone_level": 1,
      "en": "hope"
  },
  {
      "hanzi": "凶",
      "count": 9,
      "level": 1113,
      "pinyin": "xiōng",
      "tone_level": 1,
      "en": "ominous"
  },
  {
      "hanzi": "曲",
      "count": 12,
      "level": 1114,
      "pinyin": "qū",
      "tone_level": 1,
      "en": "song"
  },
  {
      "hanzi": "典",
      "count": 18,
      "level": 1115,
      "pinyin": "diǎn",
      "tone_level": 3,
      "en": "classic"
  },
  {
      "hanzi": "胸",
      "count": 5,
      "level": 1116,
      "pinyin": "xiōng",
      "tone_level": 1,
      "en": "chest"
  },
  {
      "hanzi": "齿",
      "count": 4,
      "level": 1117,
      "pinyin": "chǐ",
      "tone_level": 3,
      "en": "tooth"
  },
  {
      "hanzi": "龄",
      "count": 8,
      "level": 1118,
      "pinyin": "líng",
      "tone_level": 2,
      "en": "age"
  },
  {
      "hanzi": "离",
      "count": 49,
      "level": 1119,
      "pinyin": "lí",
      "tone_level": 2,
      "en": "away"
  },
  {
      "hanzi": "脑",
      "count": 43,
      "level": 1120,
      "pinyin": "nǎo",
      "tone_level": 3,
      "en": "brain"
  },
  {
      "hanzi": "恼",
      "count": 3,
      "level": 1121,
      "pinyin": "nǎo",
      "tone_level": 3,
      "en": "annoyed"
  },
  {
      "hanzi": "功",
      "count": 40,
      "level": 1122,
      "pinyin": "gōng",
      "tone_level": 1,
      "en": "achievement"
  },
  {
      "hanzi": "势",
      "count": 9,
      "level": 1123,
      "pinyin": "shì",
      "tone_level": 4,
      "en": "momentum"
  },
  {
      "hanzi": "助",
      "count": 42,
      "level": 1124,
      "pinyin": "zhù",
      "tone_level": 4,
      "en": "assist"
  },
  {
      "hanzi": "历",
      "count": 36,
      "level": 1125,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "history"
  },
  {
      "hanzi": "努",
      "count": 39,
      "level": 1126,
      "pinyin": "nǔ",
      "tone_level": 3,
      "en": "strive"
  },
  {
      "hanzi": "劲",
      "count": 7,
      "level": 1127,
      "pinyin": "jìn",
      "tone_level": 4,
      "en": "strength"
  },
  {
      "hanzi": "穷",
      "count": 7,
      "level": 1128,
      "pinyin": "qióng",
      "tone_level": 2,
      "en": "poor"
  },
  {
      "hanzi": "勇",
      "count": 7,
      "level": 1129,
      "pinyin": "yǒng",
      "tone_level": 3,
      "en": "brave"
  },
  {
      "hanzi": "通",
      "count": 70,
      "level": 1130,
      "pinyin": "tōng",
      "tone_level": 1,
      "en": "pass"
  },
  {
      "hanzi": "桶",
      "count": 6,
      "level": 1131,
      "pinyin": "tǒng",
      "tone_level": 3,
      "en": "bucket"
  },
  {
      "hanzi": "痛",
      "count": 19,
      "level": 1132,
      "pinyin": "tòng",
      "tone_level": 4,
      "en": "pain"
  },
  {
      "hanzi": "疗",
      "count": 7,
      "level": 1133,
      "pinyin": "liáo",
      "tone_level": 2,
      "en": "treatment"
  },
  {
      "hanzi": "症",
      "count": 7,
      "level": 1134,
      "pinyin": "zhèng",
      "tone_level": 4,
      "en": "symptom"
  },
  {
      "hanzi": "瘦",
      "count": 9,
      "level": 1135,
      "pinyin": "shòu",
      "tone_level": 4,
      "en": "thin"
  },
  {
      "hanzi": "搜",
      "count": 4,
      "level": 1136,
      "pinyin": "sōu",
      "tone_level": 1,
      "en": "search"
  },
  {
      "hanzi": "疯",
      "count": 5,
      "level": 1137,
      "pinyin": "fēng",
      "tone_level": 1,
      "en": "crazy"
  },
  {
      "hanzi": "疾",
      "count": 6,
      "level": 1138,
      "pinyin": "jí",
      "tone_level": 2,
      "en": "sickness"
  },
  {
      "hanzi": "业",
      "count": 99,
      "level": 1139,
      "pinyin": "yè",
      "tone_level": 4,
      "en": "business"
  },
  {
      "hanzi": "亚",
      "count": 8,
      "level": 1140,
      "pinyin": "yà",
      "tone_level": 4,
      "en": "Asia"
  },
  {
      "hanzi": "显",
      "count": 22,
      "level": 1141,
      "pinyin": "xiǎn",
      "tone_level": 3,
      "en": "visible"
  },
  {
      "hanzi": "普",
      "count": 13,
      "level": 1142,
      "pinyin": "pǔ",
      "tone_level": 3,
      "en": "universal"
  },
  {
      "hanzi": "严",
      "count": 15,
      "level": 1143,
      "pinyin": "yán",
      "tone_level": 2,
      "en": "strict"
  },
  {
      "hanzi": "恶",
      "count": 7,
      "level": 1144,
      "pinyin": "è",
      "tone_level": 4,
      "en": "evil"
  },
  {
      "hanzi": "卫",
      "count": 12,
      "level": 1145,
      "pinyin": "wèi",
      "tone_level": 4,
      "en": "guard"
  },
  {
      "hanzi": "武",
      "count": 6,
      "level": 1146,
      "pinyin": "wǔ",
      "tone_level": 3,
      "en": "military"
  },
  {
      "hanzi": "丽",
      "count": 11,
      "level": 1147,
      "pinyin": "lì",
      "tone_level": 4,
      "en": "beautiful"
  },
  {
      "hanzi": "导",
      "count": 53,
      "level": 1148,
      "pinyin": "dǎo",
      "tone_level": 3,
      "en": "lead"
  },
  {
      "hanzi": "民",
      "count": 72,
      "level": 1149,
      "pinyin": "mín",
      "tone_level": 2,
      "en": "people"
  },
  {
      "hanzi": "异",
      "count": 5,
      "level": 1150,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "different"
  },
  {
      "hanzi": "将",
      "count": 54,
      "level": 1151,
      "pinyin": "jiāng",
      "tone_level": 1,
      "en": "will"
  },
  {
      "hanzi": "装",
      "count": 33,
      "level": 1152,
      "pinyin": "zhuāng",
      "tone_level": 1,
      "en": "dress"
  },
  {
      "hanzi": "奖",
      "count": 20,
      "level": 1153,
      "pinyin": "jiǎng",
      "tone_level": 3,
      "en": "award"
  },
  {
      "hanzi": "状",
      "count": 11,
      "level": 1154,
      "pinyin": "zhuàng",
      "tone_level": 4,
      "en": "state"
  },
  {
      "hanzi": "射",
      "count": 7,
      "level": 1155,
      "pinyin": "shè",
      "tone_level": 4,
      "en": "shoot"
  },
  {
      "hanzi": "寻",
      "count": 5,
      "level": 1156,
      "pinyin": "xún",
      "tone_level": 2,
      "en": "seek"
  },
  {
      "hanzi": "耐",
      "count": 16,
      "level": 1157,
      "pinyin": "nài",
      "tone_level": 4,
      "en": "tolerate"
  },
  {
      "hanzi": "冠",
      "count": 10,
      "level": 1158,
      "pinyin": "guān",
      "tone_level": 1,
      "en": "crown"
  },
  {
      "hanzi": "节",
      "count": 75,
      "level": 1159,
      "pinyin": "jié",
      "tone_level": 2,
      "en": "festival"
  },
  {
      "hanzi": "爷",
      "count": 35,
      "level": 1160,
      "pinyin": "yé",
      "tone_level": 2,
      "en": "grandfather"
  },
  {
      "hanzi": "范",
      "count": 9,
      "level": 1161,
      "pinyin": "fàn",
      "tone_level": 4,
      "en": "model"
  },
  {
      "hanzi": "艺",
      "count": 10,
      "level": 1162,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "art"
  },
  {
      "hanzi": "瓦",
      "count": 1,
      "level": 1163,
      "pinyin": "wǎ",
      "tone_level": 3,
      "en": "tile"
  },
  {
      "hanzi": "瓶",
      "count": 14,
      "level": 1164,
      "pinyin": "píng",
      "tone_level": 2,
      "en": "bottle"
  },
  {
      "hanzi": "饼",
      "count": 7,
      "level": 1165,
      "pinyin": "bǐng",
      "tone_level": 3,
      "en": "cake"
  },
  {
      "hanzi": "著",
      "count": 6,
      "level": 1166,
      "pinyin": "zhù",
      "tone_level": 4,
      "en": "noted"
  },
  {
      "hanzi": "若",
      "count": 4,
      "level": 1167,
      "pinyin": "ruò",
      "tone_level": 4,
      "en": "if"
  },
  {
      "hanzi": "苹",
      "count": 16,
      "level": 1168,
      "pinyin": "píng",
      "tone_level": 2,
      "en": "apple"
  },
  {
      "hanzi": "苏",
      "count": 3,
      "level": 1169,
      "pinyin": "sū",
      "tone_level": 1,
      "en": "silk"
  },
  {
      "hanzi": "协",
      "count": 7,
      "level": 1170,
      "pinyin": "xié",
      "tone_level": 2,
      "en": "coordinate"
  },
  {
      "hanzi": "胁",
      "count": 1,
      "level": 1171,
      "pinyin": "xié",
      "tone_level": 2,
      "en": "threaten"
  },
  {
      "hanzi": "藏",
      "count": 24,
      "level": 1172,
      "pinyin": "cáng",
      "tone_level": 2,
      "en": "store"
  },
  {
      "hanzi": "吕",
      "count": 0,
      "level": 1173,
      "pinyin": "lǚ",
      "tone_level": 3,
      "en": "surname Lv"
  },
  {
      "hanzi": "宫",
      "count": 1,
      "level": 1174,
      "pinyin": "gōng",
      "tone_level": 1,
      "en": "palace"
  },
  {
      "hanzi": "营",
      "count": 13,
      "level": 1175,
      "pinyin": "yíng",
      "tone_level": 2,
      "en": "camp"
  },
  {
      "hanzi": "劳",
      "count": 13,
      "level": 1176,
      "pinyin": "láo",
      "tone_level": 2,
      "en": "labor"
  },
  {
      "hanzi": "荣",
      "count": 6,
      "level": 1177,
      "pinyin": "róng",
      "tone_level": 2,
      "en": "glory"
  },
  {
      "hanzi": "论",
      "count": 35,
      "level": 1178,
      "pinyin": "lùn",
      "tone_level": 4,
      "en": "discuss"
  },
  {
      "hanzi": "评",
      "count": 13,
      "level": 1179,
      "pinyin": "píng",
      "tone_level": 2,
      "en": "appraise"
  },
  {
      "hanzi": "讯",
      "count": 4,
      "level": 1180,
      "pinyin": "xùn",
      "tone_level": 4,
      "en": "information"
  },
  {
      "hanzi": "讲",
      "count": 39,
      "level": 1181,
      "pinyin": "jiǎng",
      "tone_level": 3,
      "en": "speak"
  },
  {
      "hanzi": "证",
      "count": 21,
      "level": 1182,
      "pinyin": "zhèng",
      "tone_level": 4,
      "en": "evidence"
  },
  {
      "hanzi": "谈",
      "count": 17,
      "level": 1183,
      "pinyin": "tán",
      "tone_level": 2,
      "en": "talk"
  },
  {
      "hanzi": "训",
      "count": 12,
      "level": 1184,
      "pinyin": "xùn",
      "tone_level": 4,
      "en": "teach"
  },
  {
      "hanzi": "访",
      "count": 6,
      "level": 1185,
      "pinyin": "fǎng",
      "tone_level": 3,
      "en": "visit"
  },
  {
      "hanzi": "误",
      "count": 18,
      "level": 1186,
      "pinyin": "wù",
      "tone_level": 4,
      "en": "mistake"
  },
  {
      "hanzi": "订",
      "count": 11,
      "level": 1187,
      "pinyin": "dìng",
      "tone_level": 4,
      "en": "order"
  },
  {
      "hanzi": "诊",
      "count": 3,
      "level": 1188,
      "pinyin": "zhěn",
      "tone_level": 3,
      "en": "diagnose"
  },
  {
      "hanzi": "诺",
      "count": 7,
      "level": 1189,
      "pinyin": "nuò",
      "tone_level": 4,
      "en": "promise"
  },
  {
      "hanzi": "诚",
      "count": 10,
      "level": 1190,
      "pinyin": "chéng",
      "tone_level": 2,
      "en": "sincere"
  },
  {
      "hanzi": "详",
      "count": 6,
      "level": 1191,
      "pinyin": "xiáng",
      "tone_level": 2,
      "en": "detailed"
  },
  {
      "hanzi": "谊",
      "count": 6,
      "level": 1192,
      "pinyin": "yì",
      "tone_level": 4,
      "en": "friendship"
  },
  {
      "hanzi": "县",
      "count": 4,
      "level": 1193,
      "pinyin": "xiàn",
      "tone_level": 4,
      "en": "county"
  },
  {
      "hanzi": "谅",
      "count": 4,
      "level": 1194,
      "pinyin": "liàng",
      "tone_level": 4,
      "en": "forgive"
  },
  {
      "hanzi": "凉",
      "count": 13,
      "level": 1195,
      "pinyin": "liáng",
      "tone_level": 2,
      "en": "cool"
  },
  {
      "hanzi": "度",
      "count": 58,
      "level": 1196,
      "pinyin": "dù",
      "tone_level": 4,
      "en": "degree"
  },
  {
      "hanzi": "席",
      "count": 12,
      "level": 1197,
      "pinyin": "xí",
      "tone_level": 2,
      "en": "seat"
  },
  {
      "hanzi": "府",
      "count": 24,
      "level": 1198,
      "pinyin": "fǔ",
      "tone_level": 3,
      "en": "mansion"
  },
  {
      "hanzi": "底",
      "count": 21,
      "level": 1199,
      "pinyin": "dǐ",
      "tone_level": 3,
      "en": "bottom"
  },
  {
      "hanzi": "座",
      "count": 35,
      "level": 1200,
      "pinyin": "zuò",
      "tone_level": 4,
      "en": "seat"
  }
]?.map(hmmify);

export const yellowBelt = chars?.map((curr, idx) => {
  const findLevel = chars?.find((x) => x?.level == idx + 1);

  if (findLevel) {
    return findLevel;
  }
  return curr;
});

console.log("YELLOW", yellowBelt);
