"use client";

// 3050
export const allChars = [
  {
    hanzi: "一",
    count: 2812,
    pinyin: "yī",
    level: 1,
  },
  {
    hanzi: "二",
    count: 95,
    pinyin: "èr",
    level: 2,
  },
  {
    hanzi: "三",
    count: 181,
    pinyin: "sān",
    level: 3,
  },
  {
    hanzi: "十",
    count: 291,
    pinyin: "shí",
    level: 4,
  },
  {
    hanzi: "干",
    count: 98,
    pinyin: "gàn",
    variants: ["gàn", "gān"],
    level: 5,
  },
  {
    hanzi: "半",
    count: 72,
    pinyin: "bàn",
    level: 6,
  },
  {
    hanzi: "人",
    count: 1671,
    pinyin: "rén",
    level: 7,
  },
  {
    hanzi: "从",
    count: 229,
    pinyin: "cōng",
    level: 8,
  },
  {
    hanzi: "个",
    count: 1820,
    pinyin: "gè",
    level: 9,
  },
  {
    hanzi: "入",
    count: 106,
    pinyin: "rù",
    level: 10,
  },
  {
    hanzi: "什",
    count: 390,
    pinyin: "shén",
    level: 11,
  },
  {
    hanzi: "午",
    count: 96,
    pinyin: "wǔ",
    level: 12,
  },
  {
    hanzi: "年",
    count: 564,
    pinyin: "nián",
    level: 13,
  },
  {
    hanzi: "口",
    count: 159,
    pinyin: "kǒu",
    level: 14,
  },
  {
    hanzi: "中",
    count: 663,
    pinyin: "zhōng",
    level: 15,
  },
  {
    hanzi: "叫",
    count: 88,
    pinyin: "jiào",
    level: 16,
  },
  {
    hanzi: "八",
    count: 40,
    pinyin: "bā",
    level: 17,
  },
  {
    hanzi: "只",
    count: 332,
    pinyin: "zhǐ",
    level: 18,
  },
  {
    hanzi: "介",
    count: 31,
    pinyin: "jiè",
    level: 19,
  },
  {
    hanzi: "儿",
    count: 476,
    pinyin: "ér",
    level: 20,
  },
  {
    hanzi: "四",
    count: 85,
    pinyin: "sì",
    level: 21,
  },
  {
    hanzi: "兄",
    count: 15,
    pinyin: "xiōng",
    level: 22,
  },
  {
    hanzi: "兑",
    count: 4,
    pinyin: "duì",
    en: "To Exchange",
    level: 23,
  },
  {
    hanzi: "说",
    count: 616,
    pinyin: "shuō",
    en: "to speak, to talk, to say",
    level: 24,
  },
  {
    hanzi: "计",
    count: 101,
    pinyin: "jì",
    en: "plan",
    level: 25,
  },
  {
    hanzi: "认",
    count: 194,
    pinyin: "rèn",
    en: "to recognise, to know",
    level: 26,
  },
  {
    hanzi: "识",
    count: 88,
    pinyin: "shí",
    en: "knowledge",
    level: 27,
  },
  {
    hanzi: "马",
    count: 137,
    pinyin: "mǎ",
    en: "horse",
    level: 28,
  },
  {
    hanzi: "吗",
    count: 430,
    pinyin: "ma",
    en: "indicates yes or no question",
    level: 29,
  },
  {
    hanzi: "骂",
    count: 16,
    pinyin: "mà",
    en: "to scold",
    level: 30,
  },
  {
    hanzi: "乙",
    count: 2,
    pinyin: "yǐ",
    en: "Second (2nd)",
    level: 31,
  },
  {
    hanzi: "乞",
    count: 2,
    en: "to beg",
    pinyin: "qǐ",
    level: 32,
  },
  {
    hanzi: "吃",
    count: 532,
    pinyin: "chī",
    en: "to eat",
    level: 33,
  },
  {
    hanzi: "气",
    count: 212,
    pinyin: "qì",
    en: "air",
    level: 34,
  },
  {
    hanzi: "飞",
    count: 105,
    pinyin: "fēi",
    en: "to fly",
    level: 35,
  },
  {
    hanzi: "况",
    count: 46,
    pinyin: "fēi",
    en: "to fly",
    level: 36,
  },
  {
    hanzi: "日",
    count: 150,
    pinyin: "rì",
    en: "sun",
    level: 37,
  },
  {
    hanzi: "旧",
    count: 24,
    pinyin: "rì",
    en: "sun",
    level: 38,
  },
  {
    hanzi: "旦",
    count: 8,
    pinyin: "dàn",
    en: "dawn",
    level: 39,
  },
  {
    hanzi: "但",
    count: 245,
    pinyin: "dàn",
    en: "but",
    level: 40,
  },
  {
    hanzi: "早",
    count: 183,
    pinyin: "zǎo",
    en: "early",
    level: 41,
  },
  {
    hanzi: "唱",
    count: 60,
    pinyin: "chàng",
    en: "to sing",
    level: 42,
  },
  {
    hanzi: "电",
    count: 291,
    pinyin: "diàn",
    en: "electric",
    level: 43,
  },
  {
    hanzi: "七",
    count: 38,
    pinyin: "qī",
    en: "seven",
    level: 44,
  },
  {
    hanzi: "化",
    count: 85,
    pinyin: "huà",
    en: "to transform",
    level: 45,
  },
  {
    hanzi: "白",
    count: 109,
    pinyin: "bái",
    en: "white",
    level: 46,
  },
  {
    hanzi: "百",
    count: 73,
    pinyin: "bǎi",
    en: "hundred",
    level: 47,
  },
  {
    hanzi: "今",
    count: 450,
    pinyin: "jīn",
    en: "today",
    level: 48,
  },
  {
    hanzi: "千",
    count: 61,
    pinyin: "qiān",
    en: "thousand",
    level: 49,
  },
  {
    hanzi: "舌",
    count: 7,
    pinyin: "shé",
    en: "tongue",
    level: 50,
  },
  {
    hanzi: "话",
    count: 332,
    pinyin: "huà",
    en: "speech",
    level: 51,
  },
  {
    hanzi: "活",
    count: 162,
    pinyin: "huó",
    en: "to live",
    level: 52,
  },
  {
    hanzi: "乱",
    count: 23,
    pinyin: "luàn",
    en: "mess",
    level: 53,
  },
  {
    hanzi: "汽",
    count: 33,
    pinyin: "qì",
    en: "steam",
    level: 54,
  },
  {
    hanzi: "月",
    count: 154,
    level: 55,
  },
  {
    hanzi: "用",
    count: 266,
    level: 56,
  },
  {
    hanzi: "胖",
    count: 21,
    level: 57,
  },
  {
    hanzi: "朋",
    count: 184,
    level: 58,
  },
  {
    hanzi: "明",
    count: 246,
    level: 59,
  },
  {
    hanzi: "习",
    count: 169,
    level: 60,
  },
  {
    hanzi: "句",
    count: 39,
    level: 61,
  },
  {
    hanzi: "勺",
    count: 11,
    level: 62,
  },
  {
    hanzi: "的",
    count: 4253,
    level: 63,
  },
  {
    hanzi: "了",
    count: 2552,
    level: 64,
  },
  {
    hanzi: "子",
    count: 725,
    level: 65,
  },
  {
    hanzi: "寸",
    count: 6,
    level: 66,
  },
  {
    hanzi: "时",
    count: 530,
    level: 67,
  },
  {
    hanzi: "过",
    count: 383,
    level: 68,
  },
  {
    hanzi: "付",
    count: 21,
    level: 69,
  },
  {
    hanzi: "讨",
    count: 25,
    level: 70,
  },
  {
    hanzi: "才",
    count: 174,
    level: 71,
  },
  {
    hanzi: "牙",
    count: 10,
    level: 72,
  },
  {
    hanzi: "卜",
    count: 0,
    level: 73,
  },
  {
    hanzi: "上",
    count: 872,
    level: 74,
  },
  {
    hanzi: "下",
    count: 547,
    level: 75,
  },
  {
    hanzi: "卡",
    count: 13,
    level: 76,
  },
  {
    hanzi: "吓",
    count: 24,
    level: 77,
  },
  {
    hanzi: "占",
    count: 6,
    level: 78,
  },
  {
    hanzi: "点",
    count: 366,
    level: 79,
  },
  {
    hanzi: "让",
    count: 168,
    level: 80,
  },
  {
    hanzi: "止",
    count: 14,
    level: 81,
  },
  {
    hanzi: "正",
    count: 109,
    level: 82,
  },
  {
    hanzi: "是",
    count: 1749,
    level: 83,
  },
  {
    hanzi: "目",
    count: 61,
    level: 84,
  },
  {
    hanzi: "自",
    count: 326,
    level: 85,
  },
  {
    hanzi: "面",
    count: 328,
    level: 86,
  },
  {
    hanzi: "身",
    count: 121,
    level: 87,
  },
  {
    hanzi: "谢",
    count: 25,
    level: 88,
  },
  {
    hanzi: "弋",
    count: 0,
    level: 89,
  },
  {
    hanzi: "代",
    count: 55,
    level: 90,
  },
  {
    hanzi: "戈",
    count: 0,
    level: 91,
  },
  {
    hanzi: "手",
    count: 217,
    level: 92,
  },
  {
    hanzi: "我",
    count: 2596,
    level: 93,
  },
  {
    hanzi: "或",
    count: 20,
    level: 94,
  },
  {
    hanzi: "看",
    count: 461,
    level: 95,
  },
  {
    hanzi: "担",
    count: 44,
    level: 96,
  },
  {
    hanzi: "拍",
    count: 39,
    level: 97,
  },
  {
    hanzi: "提",
    count: 64,
    level: 98,
  },
  {
    hanzi: "找",
    count: 103,
    level: 99,
  },
  {
    hanzi: "木",
    count: 19,
    level: 100,
  },
  {
    hanzi: "本",
    count: 144,
    level: 101,
  },
  {
    hanzi: "体",
    count: 113,
    level: 102,
  },
  {
    hanzi: "末",
    count: 23,
    level: 103,
  },
  {
    hanzi: "米",
    count: 47,
    level: 104,
  },
  {
    hanzi: "来",
    count: 899,
    level: 105,
  },
  {
    hanzi: "呆",
    count: 8,
    level: 106,
  },
  {
    hanzi: "休",
    count: 53,
    level: 107,
  },
  {
    hanzi: "桌",
    count: 68,
    level: 108,
  },
  {
    hanzi: "相",
    count: 121,
    level: 109,
  },
  {
    hanzi: "禾",
    count: 0,
    level: 110,
  },
  {
    hanzi: "和",
    count: 443,
    level: 111,
  },
  {
    hanzi: "种",
    count: 162,
    level: 112,
  },
  {
    hanzi: "香",
    count: 22,
    level: 113,
  },
  {
    hanzi: "几",
    count: 224,
    level: 114,
  },
  {
    hanzi: "机",
    count: 264,
    level: 115,
  },
  {
    hanzi: "心",
    count: 280,
    level: 116,
  },
  {
    hanzi: "想",
    count: 479,
    level: 117,
  },
  {
    hanzi: "息",
    count: 87,
    level: 118,
  },
  {
    hanzi: "总",
    count: 126,
    level: 119,
  },
  {
    hanzi: "怕",
    count: 42,
    level: 120,
  },
  {
    hanzi: "己",
    count: 234,
    level: 121,
  },
  {
    hanzi: "记",
    count: 74,
    level: 122,
  },
  {
    hanzi: "已",
    count: 171,
    level: 123,
  },
  {
    hanzi: "包",
    count: 159,
    level: 124,
  },
  {
    hanzi: "土",
    count: 29,
    level: 125,
  },
  {
    hanzi: "坐",
    count: 96,
    level: 126,
  },
  {
    hanzi: "吐",
    count: 6,
    level: 127,
  },
  {
    hanzi: "肚",
    count: 10,
    level: 128,
  },
  {
    hanzi: "在",
    count: 1225,
    level: 129,
  },
  {
    hanzi: "走",
    count: 181,
    level: 130,
  },
  {
    hanzi: "起",
    count: 379,
    level: 131,
  },
  {
    hanzi: "不",
    count: 1602,
    level: 132,
  },
  {
    hanzi: "还",
    count: 392,
    level: 133,
  },
  {
    hanzi: "坏",
    count: 67,
    level: 134,
  },
  {
    hanzi: "杯",
    count: 43,
    level: 135,
  },
  {
    hanzi: "么",
    count: 548,
    level: 136,
  },
  {
    hanzi: "公",
    count: 366,
    level: 137,
  },
  {
    hanzi: "台",
    count: 62,
    level: 138,
  },
  {
    hanzi: "去",
    count: 696,
    level: 139,
  },
  {
    hanzi: "丢",
    count: 29,
    level: 140,
  },
  {
    hanzi: "法",
    count: 204,
    level: 141,
  },
  {
    hanzi: "寺",
    count: 0,
    level: 142,
  },
  {
    hanzi: "等",
    count: 101,
    level: 143,
  },
  {
    hanzi: "门",
    count: 158,
    level: 144,
  },
  {
    hanzi: "们",
    count: 1138,
    level: 145,
  },
  {
    hanzi: "问",
    count: 174,
    level: 146,
  },
  {
    hanzi: "间",
    count: 201,
    level: 147,
  },
  {
    hanzi: "简",
    count: 40,
    level: 148,
  },
  {
    hanzi: "司",
    count: 233,
    level: 149,
  },
  {
    hanzi: "词",
    count: 23,
    level: 150,
  },
  {
    hanzi: "母",
    count: 93,
    level: 151,
  },
  {
    hanzi: "每",
    count: 307,
    level: 152,
  },
  {
    hanzi: "也",
    count: 265,
    level: 153,
  },
  {
    hanzi: "他",
    count: 1341,
    level: 154,
  },
  {
    hanzi: "地",
    count: 347,
    level: 155,
  },
  {
    hanzi: "小",
    count: 569,
    level: 156,
  },
  {
    hanzi: "东",
    count: 144,
    level: 157,
  },
  {
    hanzi: "尔",
    count: 5,
    level: 158,
  },
  {
    hanzi: "你",
    count: 1421,
    level: 159,
  },
  {
    hanzi: "您",
    count: 33,
    level: 160,
  },
  {
    hanzi: "大",
    count: 701,
    level: 161,
  },
  {
    hanzi: "太",
    count: 279,
    level: 162,
  },
  {
    hanzi: "犬",
    count: 0,
    level: 163,
  },
  {
    hanzi: "哭",
    count: 26,
    level: 164,
  },
  {
    hanzi: "臭",
    count: 12,
    level: 165,
  },
  {
    hanzi: "然",
    count: 214,
    level: 166,
  },
  {
    hanzi: "狗",
    count: 71,
    level: 167,
  },
  {
    hanzi: "决",
    count: 71,
    level: 168,
  },
  {
    hanzi: "快",
    count: 160,
    level: 169,
  },
  {
    hanzi: "块",
    count: 49,
    level: 170,
  },
  {
    hanzi: "羊",
    count: 20,
    level: 171,
  },
  {
    hanzi: "着",
    count: 219,
    level: 172,
  },
  {
    hanzi: "样",
    count: 246,
    level: 173,
  },
  {
    hanzi: "美",
    count: 143,
    level: 174,
  },
  {
    hanzi: "力",
    count: 135,
    level: 175,
  },
  {
    hanzi: "加",
    count: 108,
    level: 176,
  },
  {
    hanzi: "边",
    count: 129,
    level: 177,
  },
  {
    hanzi: "办",
    count: 90,
    level: 178,
  },
  {
    hanzi: "为",
    count: 446,
    level: 179,
  },
  {
    hanzi: "另",
    count: 31,
    level: 180,
  },
  {
    hanzi: "云",
    count: 16,
    level: 181,
  },
  {
    hanzi: "运",
    count: 95,
    level: 182,
  },
  {
    hanzi: "动",
    count: 264,
    level: 183,
  },
  {
    hanzi: "会",
    count: 666,
    level: 184,
  },
  {
    hanzi: "丁",
    count: 0,
    level: 185,
  },
  {
    hanzi: "打",
    count: 219,
    level: 186,
  },
  {
    hanzi: "可",
    count: 452,
    level: 187,
  },
  {
    hanzi: "哥",
    count: 70,
    level: 188,
  },
  {
    hanzi: "河",
    count: 27,
    level: 189,
  },
  {
    hanzi: "奇",
    count: 18,
    level: 190,
  },
  {
    hanzi: "骑",
    count: 20,
    level: 191,
  },
  {
    hanzi: "椅",
    count: 8,
    level: 192,
  },
  {
    hanzi: "以",
    count: 584,
    level: 193,
  },
  {
    hanzi: "内",
    count: 57,
    level: 194,
  },
  {
    hanzi: "肉",
    count: 54,
    level: 195,
  },
  {
    hanzi: "两",
    count: 171,
    level: 196,
  },
  {
    hanzi: "再",
    count: 120,
    level: 197,
  },
  {
    hanzi: "同",
    count: 182,
    level: 198,
  },
  {
    hanzi: "周",
    count: 65,
    level: 199,
  },
  {
    hanzi: "王",
    count: 34,
    level: 200,
  },
  {
    hanzi: "全",
    count: 122,
    level: 201,
  },
  {
    hanzi: "主",
    count: 93,
    level: 202,
  },
  {
    hanzi: "住",
    count: 97,
    level: 203,
  },
  {
    hanzi: "注",
    count: 48,
    level: 204,
  },
  {
    hanzi: "玉",
    count: 7,
    level: 205,
  },
  {
    hanzi: "国",
    count: 598,
    level: 206,
  },
  {
    hanzi: "回",
    count: 211,
    level: 207,
  },
  {
    hanzi: "因",
    count: 157,
    level: 208,
  },
  {
    hanzi: "嗯",
    count: 10,
    level: 209,
  },
  {
    hanzi: "行",
    count: 250,
    level: 210,
  },
  {
    hanzi: "得",
    count: 535,
    level: 211,
  },
  {
    hanzi: "往",
    count: 74,
    level: 212,
  },
  {
    hanzi: "金",
    count: 39,
    level: 213,
  },
  {
    hanzi: "钟",
    count: 54,
    level: 214,
  },
  {
    hanzi: "天",
    count: 860,
    level: 215,
  },
  {
    hanzi: "关",
    count: 116,
    level: 216,
  },
  {
    hanzi: "送",
    count: 51,
    level: 217,
  },
  {
    hanzi: "开",
    count: 353,
    level: 218,
  },
  {
    hanzi: "算",
    count: 78,
    level: 219,
  },
  {
    hanzi: "并",
    count: 27,
    level: 220,
  },
  {
    hanzi: "耳",
    count: 5,
    level: 221,
  },
  {
    hanzi: "闻",
    count: 20,
    level: 222,
  },
  {
    hanzi: "联",
    count: 41,
    level: 223,
  },
  {
    hanzi: "系",
    count: 55,
    level: 224,
  },
  {
    hanzi: "女",
    count: 229,
    level: 225,
  },
  {
    hanzi: "妈",
    count: 158,
    level: 226,
  },
  {
    hanzi: "好",
    count: 777,
    level: 227,
  },
  {
    hanzi: "始",
    count: 85,
    level: 228,
  },
  {
    hanzi: "西",
    count: 157,
    level: 229,
  },
  {
    hanzi: "要",
    count: 920,
    level: 230,
  },
  {
    hanzi: "如",
    count: 168,
    level: 231,
  },
  {
    hanzi: "她",
    count: 375,
    level: 232,
  },
  {
    hanzi: "楼",
    count: 53,
    level: 233,
  },
  {
    hanzi: "又",
    count: 121,
    level: 234,
  },
  {
    hanzi: "汉",
    count: 66,
    level: 235,
  },
  {
    hanzi: "对",
    count: 309,
    level: 236,
  },
  {
    hanzi: "没",
    count: 477,
    level: 237,
  },
  {
    hanzi: "取",
    count: 45,
    level: 238,
  },
  {
    hanzi: "最",
    count: 270,
    level: 239,
  },
  {
    hanzi: "曼",
    count: 0,
    level: 240,
  },
  {
    hanzi: "慢",
    count: 28,
    level: 241,
  },
  {
    hanzi: "支",
    count: 37,
    level: 242,
  },
  {
    hanzi: "皮",
    count: 14,
    level: 243,
  },
  {
    hanzi: "书",
    count: 146,
    level: 244,
  },
  {
    hanzi: "有",
    count: 1366,
    level: 245,
  },
  {
    hanzi: "随",
    count: 51,
    level: 246,
  },
  {
    hanzi: "友",
    count: 202,
    level: 247,
  },
  {
    hanzi: "发",
    count: 279,
    level: 248,
  },
  {
    hanzi: "六",
    count: 27,
    level: 249,
  },
  {
    hanzi: "言",
    count: 40,
    level: 250,
  },
  {
    hanzi: "信",
    count: 121,
    level: 251,
  },
  {
    hanzi: "文",
    count: 131,
    level: 252,
  },
  {
    hanzi: "这",
    count: 1632,
    level: 253,
  },
  {
    hanzi: "父",
    count: 88,
    level: 254,
  },
  {
    hanzi: "交",
    count: 86,
    level: 255,
  },
  {
    hanzi: "校",
    count: 102,
    level: 256,
  },
  {
    hanzi: "风",
    count: 49,
    level: 257,
  },
  {
    hanzi: "网",
    count: 38,
    level: 258,
  },
  {
    hanzi: "那",
    count: 355,
    level: 259,
  },
  {
    hanzi: "哪",
    count: 93,
    level: 260,
  },
  {
    hanzi: "衣",
    count: 106,
    level: 261,
  },
  {
    hanzi: "袋",
    count: 20,
    level: 262,
  },
  {
    hanzi: "被",
    count: 139,
    level: 263,
  },
  {
    hanzi: "艮",
    count: 0,
    level: 264,
  },
  {
    hanzi: "很",
    count: 1016,
    level: 265,
  },
  {
    hanzi: "银",
    count: 36,
    level: 266,
  },
  {
    hanzi: "长",
    count: 204,
    level: 267,
  },
  {
    hanzi: "报",
    count: 43,
    level: 268,
  },
  {
    hanzi: "服",
    count: 139,
    level: 269,
  },
  {
    hanzi: "元",
    count: 49,
    level: 270,
  },
  {
    hanzi: "远",
    count: 39,
    level: 271,
  },
  {
    hanzi: "玩",
    count: 96,
    level: 272,
  },
  {
    hanzi: "园",
    count: 82,
    level: 273,
  },
  {
    hanzi: "完",
    count: 159,
    level: 274,
  },
  {
    hanzi: "院",
    count: 64,
    level: 275,
  },
  {
    hanzi: "字",
    count: 84,
    level: 276,
  },
  {
    hanzi: "定",
    count: 251,
    level: 277,
  },
  {
    hanzi: "安",
    count: 65,
    level: 278,
  },
  {
    hanzi: "寄",
    count: 10,
    level: 279,
  },
  {
    hanzi: "宝",
    count: 46,
    level: 280,
  },
  {
    hanzi: "匕",
    count: 0,
    level: 281,
  },
  {
    hanzi: "比",
    count: 200,
    level: 282,
  },
  {
    hanzi: "它",
    count: 79,
    level: 283,
  },
  {
    hanzi: "此",
    count: 23,
    level: 284,
  },
  {
    hanzi: "些",
    count: 220,
    level: 285,
  },
  {
    hanzi: "能",
    count: 475,
    level: 286,
  },
  {
    hanzi: "夕",
    count: 2,
    level: 287,
  },
  {
    hanzi: "多",
    count: 653,
    level: 288,
  },
  {
    hanzi: "名",
    count: 137,
    level: 289,
  },
  {
    hanzi: "够",
    count: 50,
    level: 290,
  },
  {
    hanzi: "外",
    count: 240,
    level: 291,
  },
  {
    hanzi: "歹",
    count: 0,
    level: 292,
  },
  {
    hanzi: "死",
    count: 46,
    level: 293,
  },
  {
    hanzi: "少",
    count: 129,
    level: 294,
  },
  {
    hanzi: "吵",
    count: 14,
    level: 295,
  },
  {
    hanzi: "步",
    count: 53,
    level: 296,
  },
  {
    hanzi: "贝",
    count: 11,
    level: 297,
  },
  {
    hanzi: "员",
    count: 130,
    level: 298,
  },
  {
    hanzi: "贵",
    count: 36,
    level: 299,
  },
  {
    hanzi: "页",
    count: 6,
    level: 300,
  },
  {
    hanzi: "题",
    count: 128,
    level: 301,
  },
  {
    hanzi: "见",
    count: 148,
    level: 302,
  },
  {
    hanzi: "现",
    count: 288,
    level: 303,
  },
  {
    hanzi: "首",
    count: 28,
    level: 304,
  },
  {
    hanzi: "道",
    count: 230,
    level: 305,
  },
  {
    hanzi: "直",
    count: 118,
    level: 306,
  },
  {
    hanzi: "真",
    count: 201,
    level: 307,
  },
  {
    hanzi: "廿",
    count: 0,
    level: 308,
  },
  {
    hanzi: "甘",
    count: 1,
    level: 309,
  },
  {
    hanzi: "某",
    count: 8,
    level: 310,
  },
  {
    hanzi: "其",
    count: 47,
    level: 311,
  },
  {
    hanzi: "期",
    count: 86,
    level: 312,
  },
  {
    hanzi: "厂",
    count: 9,
    level: 313,
  },
  {
    hanzi: "厌",
    count: 14,
    level: 314,
  },
  {
    hanzi: "斤",
    count: 12,
    level: 315,
  },
  {
    hanzi: "听",
    count: 184,
    level: 316,
  },
  {
    hanzi: "近",
    count: 102,
    level: 317,
  },
  {
    hanzi: "诉",
    count: 36,
    level: 318,
  },
  {
    hanzi: "后",
    count: 334,
    level: 319,
  },
  {
    hanzi: "厚",
    count: 9,
    level: 320,
  },
  {
    hanzi: "反",
    count: 33,
    level: 321,
  },
  {
    hanzi: "饭",
    count: 238,
    level: 322,
  },
  {
    hanzi: "饱",
    count: 10,
    level: 323,
  },
  {
    hanzi: "饿",
    count: 21,
    level: 324,
  },
  {
    hanzi: "工",
    count: 386,
    level: 325,
  },
  {
    hanzi: "江",
    count: 16,
    level: 326,
  },
  {
    hanzi: "左",
    count: 23,
    level: 327,
  },
  {
    hanzi: "右",
    count: 29,
    level: 328,
  },
  {
    hanzi: "差",
    count: 68,
    level: 329,
  },
  {
    hanzi: "红",
    count: 86,
    level: 330,
  },
  {
    hanzi: "约",
    count: 51,
    level: 331,
  },
  {
    hanzi: "合",
    count: 67,
    level: 332,
  },
  {
    hanzi: "给",
    count: 291,
    level: 333,
  },
  {
    hanzi: "拿",
    count: 63,
    level: 334,
  },
  {
    hanzi: "穴",
    count: 1,
    level: 335,
  },
  {
    hanzi: "穿",
    count: 61,
    level: 336,
  },
  {
    hanzi: "空",
    count: 75,
    level: 337,
  },
  {
    hanzi: "深",
    count: 30,
    level: 338,
  },
  {
    hanzi: "式",
    count: 26,
    level: 339,
  },
  {
    hanzi: "试",
    count: 67,
    level: 340,
  },
  {
    hanzi: "刀",
    count: 17,
    level: 341,
  },
  {
    hanzi: "分",
    count: 221,
    level: 342,
  },
  {
    hanzi: "份",
    count: 51,
    level: 343,
  },
  {
    hanzi: "切",
    count: 33,
    level: 344,
  },
  {
    hanzi: "划",
    count: 67,
    level: 345,
  },
  {
    hanzi: "别",
    count: 298,
    level: 346,
  },
  {
    hanzi: "刚",
    count: 70,
    level: 347,
  },
  {
    hanzi: "班",
    count: 98,
    level: 348,
  },
  {
    hanzi: "前",
    count: 234,
    level: 349,
  },
  {
    hanzi: "召",
    count: 6,
    level: 350,
  },
  {
    hanzi: "绍",
    count: 15,
    level: 351,
  },
  {
    hanzi: "照",
    count: 83,
    level: 352,
  },
  {
    hanzi: "片",
    count: 53,
    level: 353,
  },
  {
    hanzi: "至",
    count: 12,
    level: 354,
  },
  {
    hanzi: "到",
    count: 632,
    level: 355,
  },
  {
    hanzi: "井",
    count: 1,
    level: 356,
  },
  {
    hanzi: "进",
    count: 157,
    level: 357,
  },
  {
    hanzi: "山",
    count: 59,
    level: 358,
  },
  {
    hanzi: "出",
    count: 460,
    level: 359,
  },
  {
    hanzi: "岁",
    count: 70,
    level: 360,
  },
  {
    hanzi: "亦",
    count: 0,
    level: 361,
  },
  {
    hanzi: "变",
    count: 121,
    level: 362,
  },
  {
    hanzi: "田",
    count: 4,
    level: 363,
  },
  {
    hanzi: "果",
    count: 171,
    level: 364,
  },
  {
    hanzi: "课",
    count: 89,
    level: 365,
  },
  {
    hanzi: "思",
    count: 86,
    level: 366,
  },
  {
    hanzi: "单",
    count: 72,
    level: 367,
  },
  {
    hanzi: "鱼",
    count: 40,
    level: 368,
  },
  {
    hanzi: "男",
    count: 93,
    level: 369,
  },
  {
    hanzi: "累",
    count: 26,
    level: 370,
  },
  {
    hanzi: "花",
    count: 128,
    level: 371,
  },
  {
    hanzi: "草",
    count: 30,
    level: 372,
  },
  {
    hanzi: "猫",
    count: 40,
    level: 373,
  },
  {
    hanzi: "药",
    count: 42,
    level: 374,
  },
  {
    hanzi: "宽",
    count: 11,
    level: 375,
  },
  {
    hanzi: "采",
    count: 7,
    level: 376,
  },
  {
    hanzi: "菜",
    count: 87,
    level: 377,
  },
  {
    hanzi: "受",
    count: 68,
    level: 378,
  },
  {
    hanzi: "爱",
    count: 136,
    level: 379,
  },
  {
    hanzi: "共",
    count: 50,
    level: 380,
  },
  {
    hanzi: "借",
    count: 26,
    level: 381,
  },
  {
    hanzi: "错",
    count: 85,
    level: 382,
  },
  {
    hanzi: "收",
    count: 80,
    level: 383,
  },
  {
    hanzi: "改",
    count: 53,
    level: 384,
  },
  {
    hanzi: "数",
    count: 59,
    level: 385,
  },
  {
    hanzi: "古",
    count: 29,
    level: 386,
  },
  {
    hanzi: "苦",
    count: 32,
    level: 387,
  },
  {
    hanzi: "做",
    count: 343,
    level: 388,
  },
  {
    hanzi: "者",
    count: 34,
    level: 389,
  },
  {
    hanzi: "猪",
    count: 25,
    level: 390,
  },
  {
    hanzi: "都",
    count: 790,
    level: 391,
  },
  {
    hanzi: "老",
    count: 335,
    level: 392,
  },
  {
    hanzi: "孝",
    count: 1,
    level: 393,
  },
  {
    hanzi: "教",
    count: 69,
    level: 394,
  },
  {
    hanzi: "五",
    count: 75,
    level: 395,
  },
  {
    hanzi: "语",
    count: 126,
    level: 396,
  },
  {
    hanzi: "广",
    count: 48,
    level: 397,
  },
  {
    hanzi: "床",
    count: 37,
    level: 398,
  },
  {
    hanzi: "店",
    count: 86,
    level: 399,
  },
  {
    hanzi: "应",
    count: 146,
    level: 400,
  },
  {
    hanzi: "兴",
    count: 36,
    level: 401,
  },
  {
    hanzi: "学",
    count: 528,
    level: 402,
  },
  {
    hanzi: "觉",
    count: 164,
    level: 403,
  },
  {
    hanzi: "亥",
    count: 0,
    level: 404,
  },
  {
    hanzi: "该",
    count: 127,
    level: 405,
  },
  {
    hanzi: "孩",
    count: 215,
    level: 406,
  },
  {
    hanzi: "水",
    count: 156,
    level: 407,
  },
  {
    hanzi: "冰",
    count: 21,
    level: 408,
  },
  {
    hanzi: "求",
    count: 44,
    level: 409,
  },
  {
    hanzi: "球",
    count: 96,
    level: 410,
  },
  {
    hanzi: "救",
    count: 25,
    level: 411,
  },
  {
    hanzi: "火",
    count: 78,
    level: 412,
  },
  {
    hanzi: "灯",
    count: 12,
    level: 413,
  },
  {
    hanzi: "烦",
    count: 33,
    level: 414,
  },
  {
    hanzi: "里",
    count: 511,
    level: 415,
  },
  {
    hanzi: "重",
    count: 174,
    level: 416,
  },
  {
    hanzi: "懂",
    count: 35,
    level: 417,
  },
  {
    hanzi: "黑",
    count: 30,
    level: 418,
  },
  {
    hanzi: "乍",
    count: 0,
    level: 419,
  },
  {
    hanzi: "作",
    count: 380,
    level: 420,
  },
  {
    hanzi: "昨",
    count: 58,
    level: 421,
  },
  {
    hanzi: "怎",
    count: 102,
    level: 422,
  },
  {
    hanzi: "窄",
    count: 2,
    level: 423,
  },
  {
    hanzi: "丰",
    count: 16,
    level: 424,
  },
  {
    hanzi: "青",
    count: 11,
    level: 425,
  },
  {
    hanzi: "请",
    count: 171,
    level: 426,
  },
  {
    hanzi: "情",
    count: 221,
    level: 427,
  },
  {
    hanzi: "表",
    count: 67,
    level: 428,
  },
  {
    hanzi: "生",
    count: 478,
    level: 429,
  },
  {
    hanzi: "星",
    count: 46,
    level: 430,
  },
  {
    hanzi: "姓",
    count: 8,
    level: 431,
  },
  {
    hanzi: "免",
    count: 17,
    level: 432,
  },
  {
    hanzi: "晚",
    count: 151,
    level: 433,
  },
  {
    hanzi: "家",
    count: 650,
    level: 434,
  },
  {
    hanzi: "象",
    count: 46,
    level: 435,
  },
  {
    hanzi: "像",
    count: 66,
    level: 436,
  },
  {
    hanzi: "头",
    count: 105,
    level: 437,
  },
  {
    hanzi: "实",
    count: 104,
    level: 438,
  },
  {
    hanzi: "买",
    count: 185,
    level: 439,
  },
  {
    hanzi: "卖",
    count: 33,
    level: 440,
  },
  {
    hanzi: "读",
    count: 54,
    level: 441,
  },
  {
    hanzi: "牛",
    count: 39,
    level: 442,
  },
  {
    hanzi: "特",
    count: 105,
    level: 443,
  },
  {
    hanzi: "件",
    count: 157,
    level: 444,
  },
  {
    hanzi: "告",
    count: 55,
    level: 445,
  },
  {
    hanzi: "先",
    count: 84,
    level: 446,
  },
  {
    hanzi: "洗",
    count: 23,
    level: 447,
  },
  {
    hanzi: "角",
    count: 11,
    level: 448,
  },
  {
    hanzi: "解",
    count: 74,
    level: 449,
  },
  {
    hanzi: "当",
    count: 101,
    level: 450,
  },
  {
    hanzi: "扫",
    count: 10,
    level: 451,
  },
  {
    hanzi: "事",
    count: 375,
    level: 452,
  },
  {
    hanzi: "史",
    count: 19,
    level: 453,
  },
  {
    hanzi: "使",
    count: 46,
    level: 454,
  },
  {
    hanzi: "更",
    count: 99,
    level: 455,
  },
  {
    hanzi: "便",
    count: 66,
    level: 456,
  },
  {
    hanzi: "石",
    count: 29,
    level: 457,
  },
  {
    hanzi: "硬",
    count: 5,
    level: 458,
  },
  {
    hanzi: "车",
    count: 215,
    level: 459,
  },
  {
    hanzi: "连",
    count: 32,
    level: 460,
  },
  {
    hanzi: "辆",
    count: 38,
    level: 461,
  },
  {
    hanzi: "较",
    count: 35,
    level: 462,
  },
  {
    hanzi: "轻",
    count: 81,
    level: 463,
  },
  {
    hanzi: "经",
    count: 306,
    level: 464,
  },
  {
    hanzi: "与",
    count: 24,
    level: 465,
  },
  {
    hanzi: "写",
    count: 81,
    level: 466,
  },
  {
    hanzi: "士",
    count: 24,
    level: 467,
  },
  {
    hanzi: "任",
    pinyin: "rèn",
    en: "to assign; to appoint; to take up a post; office; responsibility; to let; to allow",
    count: 63,
    level: 468,
  },
  {
    hanzi: "豆",
    count: 11,
    level: 469,
  },
  {
    hanzi: "喜",
    count: 266,
    level: 470,
  },
  {
    hanzi: "高",
    count: 171,
    level: 471,
  },
  {
    hanzi: "搞",
    count: 7,
    level: 472,
  },
  {
    hanzi: "亭",
    count: 1,
    level: 473,
  },
  {
    hanzi: "停",
    count: 35,
    level: 474,
  },
  {
    hanzi: "九",
    count: 17,
    level: 475,
  },
  {
    hanzi: "丸",
    count: 0,
    level: 476,
  },
  {
    hanzi: "执",
    count: 3,
    level: 477,
  },
  {
    hanzi: "热",
    count: 71,
    level: 478,
  },
  {
    hanzi: "京",
    count: 27,
    level: 479,
  },
  {
    hanzi: "景",
    count: 35,
    level: 480,
  },
  {
    hanzi: "影",
    count: 116,
    level: 481,
  },
  {
    hanzi: "尤",
    count: 2,
    level: 482,
  },
  {
    hanzi: "就",
    count: 638,
    level: 483,
  },
  {
    hanzi: "成",
    count: 256,
    level: 484,
  },
  {
    hanzi: "城",
    count: 74,
    level: 485,
  },
  {
    hanzi: "越",
    count: 55,
    level: 486,
  },
  {
    hanzi: "咸",
    count: 4,
    level: 487,
  },
  {
    hanzi: "感",
    count: 94,
    level: 488,
  },
  {
    hanzi: "钱",
    count: 155,
    level: 489,
  },
  {
    hanzi: "浅",
    count: 4,
    level: 490,
  },
  {
    hanzi: "巾",
    count: 3,
    level: 491,
  },
  {
    hanzi: "帅",
    count: 17,
    level: 492,
  },
  {
    hanzi: "师",
    count: 154,
    level: 493,
  },
  {
    hanzi: "市",
    count: 129,
    level: 494,
  },
  {
    hanzi: "带",
    count: 79,
    level: 495,
  },
  {
    hanzi: "邦",
    count: 1,
    level: 496,
  },
  {
    hanzi: "帮",
    count: 118,
    level: 497,
  },
  {
    hanzi: "常",
    count: 221,
    level: 498,
  },
  {
    hanzi: "非",
    count: 127,
    level: 499,
  },
  {
    hanzi: "雨",
    count: 55,
    level: 500,
  },
  {
    hanzi: "雪",
    count: 25,
    level: 501,
  },
  {
    hanzi: "冬",
    count: 28,
    level: 502,
  },
  {
    hanzi: "图",
    count: 29,
    level: 503,
  },
  {
    hanzi: "各",
    count: 47,
    level: 504,
  },
  {
    hanzi: "客",
    count: 56,
    level: 505,
  },
  {
    hanzi: "务",
    count: 51,
    level: 506,
  },
  {
    hanzi: "备",
    count: 57,
    level: 507,
  },
  {
    hanzi: "夏",
    count: 26,
    level: 508,
  },
  {
    hanzi: "令",
    count: 10,
    level: 509,
  },
  {
    hanzi: "冷",
    count: 43,
    level: 510,
  },
  {
    hanzi: "足",
    count: 36,
    level: 511,
  },
  {
    hanzi: "跑",
    count: 56,
    level: 512,
  },
  {
    hanzi: "路",
    count: 138,
    level: 513,
  },
  {
    hanzi: "跟",
    count: 69,
    level: 514,
  },
  {
    hanzi: "示",
    count: 20,
    level: 515,
  },
  {
    hanzi: "票",
    count: 37,
    level: 516,
  },
  {
    hanzi: "视",
    count: 59,
    level: 517,
  },
  {
    hanzi: "知",
    count: 185,
    level: 518,
  },
  {
    hanzi: "短",
    count: 23,
    level: 519,
  },
  {
    hanzi: "医",
    count: 76,
    level: 520,
  },
  {
    hanzi: "矮",
    count: 5,
    level: 521,
  },
  {
    hanzi: "侯",
    count: 1,
    level: 522,
  },
  {
    hanzi: "候",
    count: 234,
    level: 523,
  },
  {
    hanzi: "弓",
    count: 1,
    level: 524,
  },
  {
    hanzi: "张",
    count: 74,
    level: 525,
  },
  {
    hanzi: "虫",
    count: 8,
    level: 526,
  },
  {
    hanzi: "虽",
    count: 77,
    level: 527,
  },
  {
    hanzi: "强",
    count: 33,
    level: 528,
  },
  {
    hanzi: "弱",
    count: 3,
    level: 529,
  },
  {
    hanzi: "弟",
    count: 33,
    level: 530,
  },
  {
    hanzi: "第",
    count: 84,
    level: 531,
  },
  {
    hanzi: "隹",
    count: 1,
    level: 532,
  },
  {
    hanzi: "谁",
    count: 40,
    level: 533,
  },
  {
    hanzi: "推",
    count: 34,
    level: 534,
  },
  {
    hanzi: "难",
    count: 125,
    level: 535,
  },
  {
    hanzi: "准",
    count: 58,
    level: 536,
  },
  {
    hanzi: "夭",
    count: 0,
    level: 537,
  },
  {
    hanzi: "笑",
    count: 31,
    level: 538,
  },
  {
    hanzi: "立",
    count: 33,
    level: 539,
  },
  {
    hanzi: "位",
    count: 139,
    level: 540,
  },
  {
    hanzi: "音",
    count: 58,
    level: 541,
  },
  {
    hanzi: "意",
    count: 217,
    level: 542,
  },
  {
    hanzi: "站",
    count: 57,
    level: 543,
  },
  {
    hanzi: "拉",
    count: 18,
    level: 544,
  },
  {
    hanzi: "接",
    count: 57,
    level: 545,
  },
  {
    hanzi: "亲",
    count: 61,
    level: 546,
  },
  {
    hanzi: "新",
    count: 198,
    level: 547,
  },
  {
    hanzi: "杀",
    count: 11,
    level: 548,
  },
  {
    hanzi: "条",
    count: 93,
    level: 549,
  },
  {
    hanzi: "乐",
    count: 67,
    level: 550,
  },
  {
    hanzi: "茶",
    count: 16,
    level: 551,
  },
  {
    hanzi: "乃",
    count: 0,
    level: 552,
  },
  {
    hanzi: "扔",
    count: 8,
    level: 553,
  },
  {
    hanzi: "奶",
    count: 84,
    level: 554,
  },
  {
    hanzi: "及",
    count: 31,
    level: 555,
  },
  {
    hanzi: "尸",
    count: 1,
    level: 556,
  },
  {
    hanzi: "呢",
    count: 106,
    level: 557,
  },
  {
    hanzi: "户",
    count: 17,
    level: 558,
  },
  {
    hanzi: "所",
    count: 177,
    level: 559,
  },
  {
    hanzi: "声",
    count: 67,
    level: 560,
  },
  {
    hanzi: "欠",
    count: 2,
    level: 561,
  },
  {
    hanzi: "吹",
    count: 7,
    level: 562,
  },
  {
    hanzi: "歌",
    count: 82,
    level: 563,
  },
  {
    hanzi: "软",
    count: 6,
    level: 564,
  },
  {
    hanzi: "次",
    count: 226,
    level: 565,
  },
  {
    hanzi: "欢",
    count: 275,
    level: 566,
  },
  {
    hanzi: "亡",
    count: 6,
    level: 567,
  },
  {
    hanzi: "忘",
    count: 24,
    level: 568,
  },
  {
    hanzi: "忙",
    count: 41,
    level: 569,
  },
  {
    hanzi: "万",
    count: 56,
    level: 570,
  },
  {
    hanzi: "方",
    count: 223,
    level: 571,
  },
  {
    hanzi: "放",
    count: 98,
    level: 572,
  },
  {
    hanzi: "房",
    count: 134,
    level: 573,
  },
  {
    hanzi: "巴",
    count: 10,
    level: 574,
  },
  {
    hanzi: "吧",
    count: 196,
    level: 575,
  },
  {
    hanzi: "把",
    count: 286,
    level: 576,
  },
  {
    hanzi: "色",
    count: 88,
    level: 577,
  },
  {
    hanzi: "而",
    count: 81,
    level: 578,
  },
  {
    hanzi: "需",
    count: 125,
    level: 579,
  },
  {
    hanzi: "且",
    count: 26,
    level: 580,
  },
  {
    hanzi: "姐",
    count: 29,
    level: 581,
  },
  {
    hanzi: "宜",
    count: 12,
    level: 582,
  },
  {
    hanzi: "丙",
    count: 0,
    level: 583,
  },
  {
    hanzi: "病",
    count: 94,
    level: 584,
  },
  {
    hanzi: "疼",
    count: 11,
    level: 585,
  },
  {
    hanzi: "氏",
    count: 0,
    level: 586,
  },
  {
    hanzi: "纸",
    count: 14,
    level: 587,
  },
  {
    hanzi: "低",
    count: 19,
    level: 588,
  },
  {
    hanzi: "北",
    count: 56,
    level: 589,
  },
  {
    hanzi: "南",
    count: 29,
    level: 590,
  },
  {
    hanzi: "垂",
    count: 0,
    level: 591,
  },
  {
    hanzi: "睡",
    count: 53,
    level: 592,
  },
  {
    hanzi: "海",
    count: 66,
    level: 593,
  },
  {
    hanzi: "毒",
    count: 16,
    level: 594,
  },
  {
    hanzi: "洋",
    count: 7,
    level: 595,
  },
  {
    hanzi: "鲜",
    count: 12,
    level: 596,
  },
  {
    hanzi: "原",
    count: 45,
    level: 597,
  },
  {
    hanzi: "源",
    count: 16,
    level: 598,
  },
  {
    hanzi: "愿",
    count: 26,
    level: 599,
  },
  {
    hanzi: "川",
    count: 32,
    level: 600,
  },
  {
    hanzi: "州",
    count: 20,
    level: 601,
  },
  {
    hanzi: "洲",
    count: 21,
    level: 602,
  },
  {
    hanzi: "弃",
    count: 12,
    level: 603,
  },
  {
    hanzi: "育",
    count: 30,
    level: 604,
  },
  {
    hanzi: "充",
    count: 18,
    level: 605,
  },
  {
    hanzi: "流",
    count: 53,
    level: 606,
  },
  {
    hanzi: "统",
    count: 35,
    level: 607,
  },
  {
    hanzi: "齐",
    count: 9,
    level: 608,
  },
  {
    hanzi: "济",
    count: 42,
    level: 609,
  },
  {
    hanzi: "剂",
    count: 1,
    level: 610,
  },
  {
    hanzi: "清",
    count: 37,
    level: 611,
  },
  {
    hanzi: "精",
    count: 27,
    level: 612,
  },
  {
    hanzi: "消",
    count: 54,
    level: 613,
  },
  {
    hanzi: "治",
    count: 12,
    level: 614,
  },
  {
    hanzi: "落",
    count: 14,
    level: 615,
  },
  {
    hanzi: "露",
    count: 10,
    level: 616,
  },
  {
    hanzi: "满",
    count: 34,
    level: 617,
  },
  {
    hanzi: "酒",
    count: 47,
    level: 618,
  },
  {
    hanzi: "配",
    count: 13,
    level: 619,
  },
  {
    hanzi: "醒",
    count: 19,
    level: 620,
  },
  {
    hanzi: "尊",
    count: 16,
    level: 621,
  },
  {
    hanzi: "酷",
    count: 4,
    level: 622,
  },
  {
    hanzi: "酸",
    count: 6,
    level: 623,
  },
  {
    hanzi: "波",
    count: 1,
    level: 624,
  },
  {
    hanzi: "胡",
    count: 9,
    level: 625,
  },
  {
    hanzi: "湖",
    count: 8,
    level: 626,
  },
  {
    hanzi: "永",
    count: 10,
    level: 627,
  },
  {
    hanzi: "泳",
    count: 12,
    level: 628,
  },
  {
    hanzi: "脉",
    count: 2,
    level: 629,
  },
  {
    hanzi: "承",
    count: 11,
    level: 630,
  },
  {
    hanzi: "兰",
    count: 1,
    level: 631,
  },
  {
    hanzi: "之",
    count: 90,
    level: 632,
  },
  {
    hanzi: "乏",
    count: 4,
    level: 633,
  },
  {
    hanzi: "派",
    count: 13,
    level: 634,
  },
  {
    hanzi: "游",
    count: 82,
    level: 635,
  },
  {
    hanzi: "施",
    count: 6,
    level: 636,
  },
  {
    hanzi: "族",
    count: 10,
    level: 637,
  },
  {
    hanzi: "旅",
    count: 55,
    level: 638,
  },
  {
    hanzi: "良",
    count: 13,
    level: 639,
  },
  {
    hanzi: "浪",
    count: 8,
    level: 640,
  },
  {
    hanzi: "郎",
    count: 2,
    level: 641,
  },
  {
    hanzi: "娘",
    count: 11,
    level: 642,
  },
  {
    hanzi: "姑",
    count: 8,
    level: 643,
  },
  {
    hanzi: "沙",
    count: 19,
    level: 644,
  },
  {
    hanzi: "省",
    count: 14,
    level: 645,
  },
  {
    hanzi: "眼",
    count: 44,
    level: 646,
  },
  {
    hanzi: "睛",
    count: 7,
    level: 647,
  },
  {
    hanzi: "沉",
    count: 9,
    level: 648,
  },
  {
    hanzi: "染",
    count: 17,
    level: 649,
  },
  {
    hanzi: "究",
    count: 15,
    level: 650,
  },
  {
    hanzi: "杂",
    count: 11,
    level: 651,
  },
  {
    hanzi: "余",
    count: 4,
    level: 652,
  },
  {
    hanzi: "除",
    count: 31,
    level: 653,
  },
  {
    hanzi: "途",
    count: 9,
    level: 654,
  },
  {
    hanzi: "汇",
    count: 11,
    level: 655,
  },
  {
    hanzi: "巨",
    count: 7,
    level: 656,
  },
  {
    hanzi: "距",
    count: 6,
    level: 657,
  },
  {
    hanzi: "涨",
    count: 15,
    level: 658,
  },
  {
    hanzi: "湾",
    count: 7,
    level: 659,
  },
  {
    hanzi: "引",
    count: 22,
    level: 660,
  },
  {
    hanzi: "弹",
    count: 11,
    level: 661,
  },
  {
    hanzi: "淡",
    count: 7,
    level: 662,
  },
  {
    hanzi: "润",
    count: 1,
    level: 663,
  },
  {
    hanzi: "渐",
    count: 8,
    level: 664,
  },
  {
    hanzi: "汗",
    count: 3,
    level: 665,
  },
  {
    hanzi: "平",
    count: 74,
    level: 666,
  },
  {
    hanzi: "幸",
    count: 23,
    level: 667,
  },
  {
    hanzi: "赶",
    count: 29,
    level: 668,
  },
  {
    hanzi: "超",
    count: 37,
    level: 669,
  },
  {
    hanzi: "趣",
    count: 23,
    level: 670,
  },
  {
    hanzi: "聚",
    count: 20,
    level: 671,
  },
  {
    hanzi: "汁",
    count: 4,
    level: 672,
  },
  {
    hanzi: "泼",
    count: 3,
    level: 673,
  },
  {
    hanzi: "演",
    count: 48,
    level: 674,
  },
  {
    hanzi: "勿",
    count: 1,
    level: 675,
  },
  {
    hanzi: "物",
    count: 104,
    level: 676,
  },
  {
    hanzi: "易",
    count: 51,
    level: 677,
  },
  {
    hanzi: "踢",
    count: 9,
    level: 678,
  },
  {
    hanzi: "汤",
    count: 5,
    level: 679,
  },
  {
    hanzi: "场",
    count: 131,
    level: 680,
  },
  {
    hanzi: "杨",
    count: 1,
    level: 681,
  },
  {
    hanzi: "扬",
    count: 4,
    level: 682,
  },
  {
    hanzi: "持",
    count: 44,
    level: 683,
  },
  {
    hanzi: "待",
    count: 30,
    level: 684,
  },
  {
    hanzi: "征",
    count: 8,
    level: 685,
  },
  {
    hanzi: "微",
    count: 12,
    level: 686,
  },
  {
    hanzi: "据",
    count: 26,
    level: 687,
  },
  {
    hanzi: "投",
    count: 24,
    level: 688,
  },
  {
    hanzi: "指",
    count: 16,
    level: 689,
  },
  {
    hanzi: "龙",
    count: 12,
    level: 690,
  },
  {
    hanzi: "技",
    count: 25,
    level: 691,
  },
  {
    hanzi: "鼓",
    count: 6,
    level: 692,
  },
  {
    hanzi: "护",
    count: 29,
    level: 693,
  },
  {
    hanzi: "扁",
    count: 3,
    level: 694,
  },
  {
    hanzi: "编",
    count: 6,
    level: 695,
  },
  {
    hanzi: "偏",
    count: 4,
    level: 696,
  },
  {
    hanzi: "遍",
    count: 12,
    level: 697,
  },
  {
    hanzi: "篇",
    count: 19,
    level: 698,
  },
  {
    hanzi: "骗",
    count: 19,
    level: 699,
  },
  {
    hanzi: "控",
    count: 10,
    level: 700,
  },
  {
    hanzi: "按",
    count: 27,
    level: 701,
  },
  {
    hanzi: "招",
    count: 12,
    level: 702,
  },
  {
    hanzi: "括",
    count: 5,
    level: 703,
  },
  {
    hanzi: "掉",
    count: 27,
    level: 704,
  },
  {
    hanzi: "托",
    count: 7,
    level: 705,
  },
  {
    hanzi: "挥",
    count: 4,
    level: 706,
  },
  {
    hanzi: "损",
    count: 7,
    level: 707,
  },
  {
    hanzi: "折",
    count: 10,
    level: 708,
  },
  {
    hanzi: "爪",
    count: 1,
    level: 709,
  },
  {
    hanzi: "抓",
    count: 14,
    level: 710,
  },
  {
    hanzi: "瓜",
    count: 15,
    level: 711,
  },
  {
    hanzi: "孤",
    count: 5,
    level: 712,
  },
  {
    hanzi: "爬",
    count: 13,
    level: 713,
  },
  {
    hanzi: "拥",
    count: 10,
    level: 714,
  },
  {
    hanzi: "抢",
    count: 7,
    level: 715,
  },
  {
    hanzi: "探",
    count: 5,
    level: 716,
  },
  {
    hanzi: "兆",
    count: 1,
    level: 717,
  },
  {
    hanzi: "挑",
    count: 4,
    level: 718,
  },
  {
    hanzi: "跳",
    count: 21,
    level: 719,
  },
  {
    hanzi: "逃",
    count: 10,
    level: 720,
  },
  {
    hanzi: "扩",
    count: 5,
    level: 721,
  },
  {
    hanzi: "批",
    count: 11,
    level: 722,
  },
  {
    hanzi: "混",
    count: 3,
    level: 723,
  },
  {
    hanzi: "毕",
    count: 14,
    level: 724,
  },
  {
    hanzi: "措",
    count: 5,
    level: 725,
  },
  {
    hanzi: "展",
    count: 54,
    level: 726,
  },
  {
    hanzi: "授",
    count: 7,
    level: 727,
  },
  {
    hanzi: "延",
    count: 7,
    level: 728,
  },
  {
    hanzi: "挺",
    count: 10,
    level: 729,
  },
  {
    hanzi: "庭",
    count: 20,
    level: 730,
  },
  {
    hanzi: "抱",
    count: 6,
    level: 731,
  },
  {
    hanzi: "扰",
    count: 12,
    level: 732,
  },
  {
    hanzi: "抬",
    count: 4,
    level: 733,
  },
  {
    hanzi: "扮",
    count: 10,
    level: 734,
  },
  {
    hanzi: "粉",
    count: 9,
    level: 735,
  },
  {
    hanzi: "拾",
    count: 6,
    level: 736,
  },
  {
    hanzi: "术",
    count: 28,
    level: 737,
  },
  {
    hanzi: "格",
    count: 35,
    level: 738,
  },
  {
    hanzi: "标",
    count: 23,
    level: 739,
  },
  {
    hanzi: "林",
    count: 13,
    level: 740,
  },
  {
    hanzi: "禁",
    count: 4,
    level: 741,
  },
  {
    hanzi: "际",
    count: 11,
    level: 742,
  },
  {
    hanzi: "梦",
    count: 21,
    level: 743,
  },
  {
    hanzi: "麻",
    count: 28,
    level: 744,
  },
  {
    hanzi: "摩",
    count: 6,
    level: 745,
  },
  {
    hanzi: "楚",
    count: 16,
    level: 746,
  },
  {
    hanzi: "蛋",
    count: 22,
    level: 747,
  },
  {
    hanzi: "森",
    count: 9,
    level: 748,
  },
  {
    hanzi: "查",
    count: 23,
    level: 749,
  },
  {
    hanzi: "集",
    count: 16,
    level: 750,
  },
  {
    hanzi: "案",
    count: 18,
    level: 751,
    pinyin: "àn"
  },
  {
    hanzi: "未",
    count: 18,
    level: 752,
  },
  {
    hanzi: "味",
    count: 32,
    level: 753,
  },
  {
    hanzi: "妹",
    count: 15,
    level: 754,
  },
  {
    hanzi: "根",
    count: 32,
    level: 755,
  },
  {
    hanzi: "极",
    count: 22,
    level: 756,
  },
  {
    hanzi: "勾",
    count: 0,
    level: 757,
  },
  {
    hanzi: "构",
    count: 9,
    level: 758,
  },
  {
    hanzi: "购",
    count: 8,
    level: 759,
  },
  {
    hanzi: "沟",
    count: 7,
    level: 760,
  },
  {
    hanzi: "村",
    count: 22,
    level: 761,
  },
  {
    hanzi: "树",
    count: 24,
    level: 762,
  },
  {
    hanzi: "板",
    count: 45,
    level: 763,
  },
  {
    hanzi: "版",
    count: 11,
    level: 764,
  },
  {
    hanzi: "材",
    count: 9,
    level: 765,
  },
  {
    hanzi: "析",
    count: 1,
    level: 766,
  },
  {
    hanzi: "束",
    count: 12,
    level: 767,
  },
  {
    hanzi: "整",
    count: 46,
    level: 768,
  },
  {
    hanzi: "辛",
    count: 11,
    level: 769,
  },
  {
    hanzi: "辣",
    count: 13,
    level: 770,
  },
  {
    hanzi: "核",
    count: 2,
    level: 771,
  },
  {
    hanzi: "刻",
    count: 21,
    level: 772,
  },
  {
    hanzi: "咳",
    count: 2,
    level: 773,
  },
  {
    hanzi: "嗽",
    count: 1,
    level: 774,
  },
  {
    hanzi: "松",
    count: 19,
    level: 775,
  },
  {
    hanzi: "架",
    count: 20,
    level: 776,
  },
  {
    hanzi: "枪",
    count: 6,
    level: 777,
  },
  {
    hanzi: "档",
    count: 8,
    level: 778,
  },
  {
    hanzi: "光",
    count: 41,
    level: 779,
  },
  {
    hanzi: "梯",
    count: 6,
    level: 780,
  },
  {
    hanzi: "朵",
    count: 14,
    level: 781,
  },
  {
    hanzi: "棵",
    count: 5,
    level: 782,
  },
  {
    hanzi: "柿",
    count: 3,
    level: 783,
  },
  {
    hanzi: "橡",
    count: 1,
    level: 784,
  },
  {
    hanzi: "植",
    count: 5,
    level: 785,
  },
  {
    hanzi: "置",
    count: 12,
    level: 786,
  },
  {
    hanzi: "值",
    count: 21,
    level: 787,
  },
  {
    hanzi: "罗",
    count: 5,
    level: 788,
  },
  {
    hanzi: "保",
    count: 54,
    level: 789,
  },
  {
    hanzi: "价",
    count: 41,
    level: 790,
  },
  {
    hanzi: "界",
    count: 46,
    level: 791,
  },
  {
    hanzi: "养",
    count: 37,
    level: 792,
  },
  {
    hanzi: "阶",
    count: 1,
    level: 793,
  },
  {
    hanzi: "专",
    count: 21,
    level: 794,
  },
  {
    hanzi: "传",
    count: 44,
    level: 795,
  },
  {
    hanzi: "转",
    count: 22,
    level: 796,
  },
  {
    hanzi: "何",
    count: 29,
    level: 797,
  },
  {
    hanzi: "供",
    count: 9,
    level: 798,
  },
  {
    hanzi: "港",
    count: 9,
    level: 799,
  },
  {
    hanzi: "暴",
    count: 15,
    level: 800,
  },
  {
    hanzi: "爆",
    count: 7,
    level: 801,
  },
  {
    hanzi: "伤",
    count: 35,
    level: 802,
  },
  {
    hanzi: "优",
    count: 25,
    level: 803,
  },
  {
    hanzi: "仅",
    count: 15,
    level: 804,
  },
  {
    hanzi: "夜",
    count: 32,
    level: 805,
  },
  {
    hanzi: "液",
    count: 4,
    level: 806,
  },
  {
    hanzi: "依",
    count: 15,
    level: 807,
  },
  {
    hanzi: "假",
    count: 42,
    level: 808,
  },
  {
    hanzi: "倒",
    count: 30,
    level: 809,
  },
  {
    hanzi: "致",
    count: 13,
    level: 810,
  },
  {
    hanzi: "室",
    count: 29,
    level: 811,
  },
  {
    hanzi: "屋",
    count: 14,
    level: 812,
  },
  {
    hanzi: "似",
    count: 10,
    level: 813,
  },
  {
    hanzi: "仍",
    count: 15,
    level: 814,
  },
  {
    hanzi: "促",
    count: 3,
    level: 815,
  },
  {
    hanzi: "伙",
    count: 15,
    level: 816,
  },
  {
    hanzi: "伴",
    count: 6,
    level: 817,
  },
  {
    hanzi: "估",
    count: 7,
    level: 818,
  },
  {
    hanzi: "倍",
    count: 8,
    level: 819,
  },
  {
    hanzi: "俩",
    count: 22,
    level: 820,
  },
  {
    hanzi: "伪",
    count: 3,
    level: 821,
  },
  {
    hanzi: "尹",
    count: 0,
    level: 822,
  },
  {
    hanzi: "伊",
    count: 2,
    level: 823,
  },
  {
    hanzi: "康",
    count: 31,
    level: 824,
  },
  {
    hanzi: "争",
    count: 26,
    level: 825,
  },
  {
    hanzi: "静",
    count: 15,
    level: 826,
  },
  {
    hanzi: "净",
    count: 23,
    level: 827,
  },
  {
    hanzi: "减",
    count: 21,
    level: 828,
  },
  {
    hanzi: "律",
    count: 20,
    level: 829,
  },
  {
    hanzi: "建",
    count: 38,
    level: 830,
  },
  {
    hanzi: "健",
    count: 31,
    level: 831,
  },
  {
    hanzi: "君",
    count: 1,
    level: 832,
  },
  {
    hanzi: "群",
    count: 21,
    level: 833,
  },
  {
    hanzi: "向",
    count: 49,
    level: 834,
  },
  {
    hanzi: "响",
    count: 25,
    level: 835,
  },
  {
    hanzi: "尚",
    count: 7,
    level: 836,
  },
  {
    hanzi: "躺",
    count: 2,
    level: 837,
  },
  {
    hanzi: "趟",
    count: 8,
    level: 838,
  },
  {
    hanzi: "品",
    count: 70,
    level: 839,
  },
  {
    hanzi: "噪",
    count: 0,
    level: 840,
  },
  {
    hanzi: "操",
    count: 10,
    level: 841,
  },
  {
    hanzi: "澡",
    count: 7,
    level: 842,
  },
  {
    hanzi: "器",
    count: 26,
    level: 843,
  },
  {
    hanzi: "突",
    count: 20,
    level: 844,
  },
  {
    hanzi: "曾",
    count: 7,
    level: 845,
  },
  {
    hanzi: "增",
    count: 21,
    level: 846,
  },
  {
    hanzi: "号",
    count: 24,
    level: 847,
  },
  {
    hanzi: "亏",
    count: 11,
    level: 848,
  },
  {
    hanzi: "污",
    count: 11,
    level: 849,
  },
  {
    hanzi: "考",
    count: 74,
    level: 850,
  },
  {
    hanzi: "巧",
    count: 20,
    level: 851,
  },
  {
    hanzi: "由",
    count: 40,
    level: 852,
  },
  {
    hanzi: "油",
    count: 17,
    level: 853,
  },
  {
    hanzi: "聘",
    count: 6,
    level: 854,
  },
  {
    hanzi: "抽",
    count: 5,
    level: 855,
  },
  {
    hanzi: "黄",
    count: 16,
    level: 856,
  },
  {
    hanzi: "害",
    count: 35,
    level: 857,
  },
  {
    hanzi: "拜",
    count: 11,
    level: 858,
  },
  {
    hanzi: "峰",
    count: 3,
    level: 859,
  },
  {
    hanzi: "否",
    count: 13,
    level: 860,
  },
  {
    hanzi: "舍",
    count: 4,
    level: 861,
  },
  {
    hanzi: "哈",
    count: 4,
    level: 862,
  },
  {
    hanzi: "命",
    count: 18,
    level: 863,
  },
  {
    hanzi: "善",
    count: 18,
    level: 864,
  },
  {
    hanzi: "吉",
    count: 7,
    level: 865,
  },
  {
    hanzi: "叶",
    count: 8,
    level: 866,
  },
  {
    hanzi: "吸",
    count: 14,
    level: 867,
  },
  {
    hanzi: "于",
    count: 165,
    level: 868,
  },
  {
    hanzi: "乎",
    count: 11,
    level: 869,
  },
  {
    hanzi: "呼",
    count: 12,
    level: 870,
  },
  {
    hanzi: "呀",
    count: 12,
    level: 871,
  },
  {
    hanzi: "含",
    count: 7,
    level: 872,
  },
  {
    hanzi: "嘴",
    count: 5,
    level: 873,
  },
  {
    hanzi: "确",
    count: 22,
    level: 874,
  },
  {
    hanzi: "售",
    count: 10,
    level: 875,
  },
  {
    hanzi: "啦",
    count: 1,
    level: 876,
  },
  {
    hanzi: "咱",
    count: 8,
    level: 877,
  },
  {
    hanzi: "哦",
    count: 4,
    level: 878,
  },
  {
    hanzi: "咖",
    count: 8,
    level: 879,
  },
  {
    hanzi: "啡",
    count: 8,
    level: 880,
  },
  {
    hanzi: "排",
    count: 21,
    level: 881,
  },
  {
    hanzi: "罪",
    count: 5,
    level: 882,
  },
  {
    hanzi: "靠",
    count: 19,
    level: 883,
  },
  {
    hanzi: "喝",
    count: 64,
    level: 884,
  },
  {
    hanzi: "渴",
    count: 9,
    level: 885,
  },
  {
    hanzi: "歇",
    count: 1,
    level: 886,
  },
  {
    hanzi: "结",
    count: 73,
    level: 887,
  },
  {
    hanzi: "组",
    count: 23,
    level: 888,
  },
  {
    hanzi: "具",
    count: 30,
    level: 889,
  },
  {
    hanzi: "惧",
    count: 2,
    level: 890,
  },
  {
    hanzi: "线",
    count: 14,
    level: 891,
  },
  {
    hanzi: "级",
    count: 43,
    level: 892,
  },
  {
    hanzi: "续",
    count: 24,
    level: 893,
  },
  {
    hanzi: "织",
    count: 5,
    level: 894,
  },
  {
    hanzi: "职",
    count: 18,
    level: 895,
  },
  {
    hanzi: "终",
    count: 68,
    level: 896,
  },
  {
    hanzi: "细",
    count: 21,
    level: 897,
  },
  {
    hanzi: "维",
    count: 15,
    level: 898,
  },
  {
    hanzi: "焦",
    count: 6,
    level: 899,
  },
  {
    hanzi: "蕉",
    count: 4,
    level: 900,
  },
  {
    hanzi: "熊",
    count: 10,
    level: 901,
  },
  {
    hanzi: "继",
    count: 8,
    level: 902,
  },
  {
    hanzi: "世",
    count: 51,
    level: 903,
  },
  {
    hanzi: "绝",
    count: 18,
    level: 904,
  },
  {
    hanzi: "负",
    count: 25,
    level: 905,
  },
  {
    hanzi: "赖",
    count: 3,
    level: 906,
  },
  {
    hanzi: "懒",
    count: 3,
    level: 907,
  },
  {
    hanzi: "纪",
    count: 12,
    level: 908,
  },
  {
    hanzi: "练",
    count: 22,
    level: 909,
  },
  {
    hanzi: "纳",
    count: 5,
    level: 910,
  },
  {
    hanzi: "络",
    count: 9,
    level: 911,
  },
  {
    hanzi: "丝",
    count: 7,
    level: 912,
  },
  {
    hanzi: "纯",
    count: 4,
    level: 913,
  },
  {
    hanzi: "顿",
    count: 11,
    level: 914,
  },
  {
    hanzi: "吨",
    count: 2,
    level: 915,
  },
  {
    hanzi: "绩",
    count: 15,
    level: 916,
  },
  {
    hanzi: "综",
    count: 0,
    level: 917,
  },
  {
    hanzi: "缓",
    count: 3,
    level: 918,
  },
  {
    hanzi: "暖",
    count: 11,
    level: 919,
  },
  {
    hanzi: "纷",
    count: 4,
    level: 920,
  },
  {
    hanzi: "纠",
    count: 5,
    level: 921,
  },
  {
    hanzi: "宿",
    count: 1,
    level: 922,
  },
  {
    hanzi: "缩",
    count: 4,
    level: 923,
  },
  {
    hanzi: "互",
    count: 18,
    level: 924,
  },
  {
    hanzi: "缘",
    count: 5,
    level: 925,
  },
  {
    hanzi: "制",
    count: 40,
    level: 926,
  },
  {
    hanzi: "刑",
    count: 2,
    level: 927,
  },
  {
    hanzi: "型",
    count: 10,
    level: 928,
  },
  {
    hanzi: "形",
    count: 14,
    level: 929,
  },
  {
    hanzi: "研",
    count: 13,
    level: 930,
  },
  {
    hanzi: "则",
    count: 11,
    level: 931,
  },
  {
    hanzi: "厕",
    count: 3,
    level: 932,
  },
  {
    hanzi: "测",
    count: 14,
    level: 933,
  },
  {
    hanzi: "创",
    count: 18,
    level: 934,
  },
  {
    hanzi: "列",
    count: 14,
    level: 935,
  },
  {
    hanzi: "例",
    count: 8,
    level: 936,
  },
  {
    hanzi: "残",
    count: 10,
    level: 937,
  },
  {
    hanzi: "烈",
    count: 9,
    level: 938,
  },
  {
    hanzi: "副",
    count: 4,
    level: 939,
  },
  {
    hanzi: "福",
    count: 16,
    level: 940,
  },
  {
    hanzi: "富",
    count: 17,
    level: 941,
  },
  {
    hanzi: "幅",
    count: 6,
    level: 942,
  },
  {
    hanzi: "剧",
    count: 14,
    level: 943,
  },
  {
    hanzi: "刘",
    count: 3,
    level: 944,
  },
  {
    hanzi: "判",
    count: 8,
    level: 945,
  },
  {
    hanzi: "归",
    count: 7,
    level: 946,
  },
  {
    hanzi: "刺",
    count: 4,
    level: 947,
  },
  {
    hanzi: "刷",
    count: 8,
    level: 948,
  },
  {
    hanzi: "刮",
    count: 3,
    level: 949,
  },
  {
    hanzi: "俞",
    count: 0,
    level: 950,
  },
  {
    hanzi: "偷",
    count: 22,
    level: 951,
  },
  {
    hanzi: "输",
    count: 6,
    level: 952,
  },
  {
    hanzi: "愉",
    count: 3,
    level: 953,
  },
  {
    hanzi: "紧",
    count: 32,
    level: 954,
  },
  {
    hanzi: "索",
    count: 5,
    level: 955,
    pinyin: "suǒ",
  },
  {
    hanzi: "素",
    count: 6,
    level: 956,
  },
  {
    hanzi: "责",
    count: 25,
    level: 957,
  },
  {
    hanzi: "达",
    count: 35,
    level: 958,
  },
  {
    hanzi: "选",
    count: 44,
    level: 959,
  },
  {
    hanzi: "造",
    count: 21,
    level: 960,
  },
  {
    hanzi: "适",
    count: 22,
    level: 961,
  },
  {
    hanzi: "退",
    count: 14,
    level: 962,
  },
  {
    hanzi: "遇",
    count: 28,
    level: 963,
  },
  {
    hanzi: "偶",
    count: 7,
    level: 964,
  },
  {
    hanzi: "寓",
    count: 2,
    level: 965,
  },
  {
    hanzi: "追",
    count: 9,
    level: 966,
  },
  {
    hanzi: "官",
    count: 16,
    level: 967,
  },
  {
    hanzi: "管",
    count: 48,
    level: 968,
  },
  {
    hanzi: "馆",
    count: 27,
    level: 969,
  },
  {
    hanzi: "饺",
    count: 4,
    level: 970,
  },
  {
    hanzi: "饮",
    count: 5,
    level: 971,
  },
  {
    hanzi: "迷",
    count: 15,
    level: 972,
  },
  {
    hanzi: "透",
    count: 7,
    level: 973,
  },
  {
    hanzi: "述",
    count: 4,
    level: 974,
  },
  {
    hanzi: "迎",
    count: 16,
    level: 975,
  },
  {
    hanzi: "印",
    count: 15,
    level: 976,
  },
  {
    hanzi: "即",
    count: 18,
    level: 977,
  },
  {
    hanzi: "却",
    count: 30,
    level: 978,
  },
  {
    hanzi: "脚",
    count: 15,
    level: 979,
  },
  {
    hanzi: "遗",
    count: 5,
    level: 980,
  },
  {
    hanzi: "逐",
    count: 8,
    level: 981,
  },
  {
    hanzi: "逛",
    count: 4,
    level: 982,
  },
  {
    hanzi: "违",
    count: 8,
    level: 983,
  },
  {
    hanzi: "避",
    count: 8,
    level: 984,
  },
  {
    hanzi: "邀",
    count: 1,
    level: 985,
  },
  {
    hanzi: "激",
    count: 5,
    level: 986,
  },
  {
    hanzi: "疑",
    count: 7,
    level: 987,
  },
  {
    hanzi: "予",
    count: 4,
    level: 988,
  },
  {
    hanzi: "预",
    count: 29,
    level: 989,
  },
  {
    hanzi: "序",
    count: 2,
    level: 990,
  },
  {
    hanzi: "野",
    count: 7,
    level: 991,
  },
  {
    hanzi: "舒",
    count: 18,
    level: 992,
  },
  {
    hanzi: "无",
    count: 53,
    level: 993,
  },
  {
    hanzi: "既",
    count: 7,
    level: 994,
  },
  {
    hanzi: "概",
    count: 4,
    level: 995,
  },
  {
    hanzi: "击",
    count: 11,
    level: 996,
  },
  {
    hanzi: "毛",
    count: 19,
    level: 997,
  },
  {
    hanzi: "丈",
    count: 3,
    level: 998,
  },
  {
    hanzi: "夫",
    count: 15,
    level: 999,
  },
  {
    hanzi: "规",
    count: 25,
    level: 1000,
  },
  {
    hanzi: "肤",
    count: 7,
    level: 1001,
  },
  {
    hanzi: "失",
    count: 36,
    level: 1002,
  },
  {
    hanzi: "跌",
    count: 2,
    level: 1003,
  },
  {
    hanzi: "铁",
    count: 26,
    level: 1004,
  },
  {
    hanzi: "升",
    count: 15,
    level: 1005,
  },
  {
    hanzi: "久",
    count: 33,
    level: 1006,
  },
  {
    hanzi: "乡",
    count: 30,
    level: 1007,
  },
  {
    hanzi: "玄",
    count: 0,
    level: 1008,
  },
  {
    hanzi: "幽",
    count: 1,
    level: 1009,
  },
  {
    hanzi: "率",
    count: 11,
    level: 1010,
  },
  {
    hanzi: "利",
    count: 59,
    level: 1011,
  },
  {
    hanzi: "程",
    count: 42,
    level: 1012,
  },
  {
    hanzi: "斗",
    count: 8,
    level: 1013,
  },
  {
    hanzi: "科",
    count: 35,
    level: 1014,
  },
  {
    hanzi: "料",
    count: 27,
    level: 1015,
  },
  {
    hanzi: "称",
    count: 13,
    level: 1016,
  },
  {
    hanzi: "积",
    count: 12,
    level: 1017,
  },
  {
    hanzi: "税",
    count: 5,
    level: 1018,
  },
  {
    hanzi: "季",
    count: 18,
    level: 1019,
  },
  {
    hanzi: "移",
    count: 13,
    level: 1020,
  },
  {
    hanzi: "私",
    count: 9,
    level: 1021,
  },
  {
    hanzi: "秀",
    count: 9,
    level: 1022,
  },
  {
    hanzi: "必",
    count: 30,
    level: 1023,
  },
  {
    hanzi: "秘",
    count: 10,
    level: 1024,
  },
  {
    hanzi: "密",
    count: 12,
    level: 1025,
  },
  {
    hanzi: "租",
    count: 13,
    level: 1026,
  },
  {
    hanzi: "粗",
    count: 4,
    level: 1027,
  },
  {
    hanzi: "秋",
    count: 25,
    level: 1028,
  },
  {
    hanzi: "秒",
    count: 2,
    level: 1029,
  },
  {
    hanzi: "稍",
    count: 2,
    level: 1030,
  },
  {
    hanzi: "队",
    count: 41,
    level: 1031,
  },
  {
    hanzi: "防",
    count: 15,
    level: 1032,
  },
  {
    hanzi: "阿",
    count: 6,
    level: 1033,
  },
  {
    hanzi: "啊",
    count: 36,
    level: 1034,
  },
  {
    hanzi: "限",
    count: 8,
    level: 1035,
  },
  {
    hanzi: "降",
    count: 8,
    level: 1036,
  },
  {
    hanzi: "舞",
    count: 9,
    level: 1037,
  },
  {
    hanzi: "处",
    count: 57,
    level: 1038,
  },
  {
    hanzi: "陈",
    count: 1,
    level: 1039,
  },
  {
    hanzi: "阵",
    count: 8,
    level: 1040,
  },
  {
    hanzi: "陆",
    count: 7,
    level: 1041,
  },
  {
    hanzi: "附",
    count: 22,
    level: 1042,
  },
  {
    hanzi: "障",
    count: 5,
    level: 1043,
  },
  {
    hanzi: "阻",
    count: 7,
    level: 1044,
  },
  {
    hanzi: "陪",
    count: 13,
    level: 1045,
  },
  {
    hanzi: "邮",
    count: 11,
    level: 1046,
  },
  {
    hanzi: "邻",
    count: 7,
    level: 1047,
  },
  {
    hanzi: "郊",
    count: 3,
    level: 1048,
  },
  {
    hanzi: "理",
    count: 87,
    level: 1049,
  },
  {
    hanzi: "量",
    count: 49,
    level: 1050,
  },
  {
    hanzi: "望",
    count: 51,
    level: 1051,
  },
  {
    hanzi: "环",
    count: 19,
    level: 1052,
  },
  {
    hanzi: "弄",
    count: 22,
    level: 1053,
  },
  {
    hanzi: "皇",
    count: 2,
    level: 1054,
  },
  {
    hanzi: "泉",
    count: 4,
    level: 1055,
  },
  {
    hanzi: "貌",
    count: 11,
    level: 1056,
  },
  {
    hanzi: "卑",
    count: 1,
    level: 1057,
  },
  {
    hanzi: "牌",
    count: 20,
    level: 1058,
  },
  {
    hanzi: "啤",
    count: 3,
    level: 1059,
  },
  {
    hanzi: "脾",
    count: 5,
    level: 1060,
  },
  {
    hanzi: "基",
    count: 22,
    level: 1061,
  },
  {
    hanzi: "社",
    count: 28,
    level: 1062,
  },
  {
    hanzi: "礼",
    count: 43,
    level: 1063,
  },
  {
    hanzi: "祝",
    count: 24,
    level: 1064,
  },
  {
    hanzi: "竟",
    count: 17,
    level: 1065,
  },
  {
    hanzi: "境",
    count: 17,
    level: 1066,
  },
  {
    hanzi: "镜",
    count: 7,
    level: 1067,
  },
  {
    hanzi: "压",
    count: 12,
    level: 1068,
  },
  {
    hanzi: "均",
    count: 7,
    level: 1069,
  },
  {
    hanzi: "坚",
    count: 14,
    level: 1070,
  },
  {
    hanzi: "域",
    count: 3,
    level: 1071,
  },
  {
    hanzi: "培",
    count: 8,
    level: 1072,
  },
  {
    hanzi: "圣",
    count: 4,
    level: 1073,
  },
  {
    hanzi: "址",
    count: 5,
    level: 1074,
  },
  {
    hanzi: "填",
    count: 6,
    level: 1075,
  },
  {
    hanzi: "堵",
    count: 6,
    level: 1076,
  },
  {
    hanzi: "垃",
    count: 10,
    level: 1077,
  },
  {
    hanzi: "圾",
    count: 10,
    level: 1078,
  },
  {
    hanzi: "丑",
    count: 6,
    level: 1079,
  },
  {
    hanzi: "羞",
    count: 2,
    level: 1080,
  },
  {
    hanzi: "塑",
    count: 6,
    level: 1081,
  },
  {
    hanzi: "逆",
    count: 1,
    level: 1082,
  },
  {
    hanzi: "股",
    count: 11,
    level: 1083,
  },
  {
    hanzi: "胜",
    count: 17,
    level: 1084,
  },
  {
    hanzi: "胞",
    count: 6,
    level: 1085,
  },
  {
    hanzi: "腿",
    count: 10,
    level: 1086,
  },
  {
    hanzi: "脱",
    count: 5,
    level: 1087,
  },
  {
    hanzi: "阅",
    count: 4,
    level: 1088,
  },
  {
    hanzi: "肥",
    count: 14,
    level: 1089,
  },
  {
    hanzi: "爸",
    count: 72,
    level: 1090,
  },
  {
    hanzi: "肯",
    count: 17,
    level: 1091,
  },
  {
    hanzi: "阴",
    count: 8,
    level: 1092,
  },
  {
    hanzi: "肿",
    count: 3,
    level: 1093,
  },
  {
    hanzi: "冲",
    count: 17,
    level: 1094,
  },
  {
    hanzi: "膏",
    count: 2,
    level: 1095,
  },
  {
    hanzi: "胳",
    count: 0,
    level: 1096,
  },
  {
    hanzi: "朝",
    count: 6,
    level: 1097,
  },
  {
    hanzi: "潮",
    count: 5,
    level: 1098,
  },
  {
    hanzi: "韩",
    count: 7,
    level: 1099,
  },
  {
    hanzi: "赢",
    count: 13,
    level: 1100,
  },
  {
    hanzi: "背",
    count: 20,
    level: 1101,
  },
  {
    hanzi: "肌",
    count: 2,
    level: 1102,
  },
  {
    hanzi: "胶",
    count: 2,
    level: 1103,
  },
  {
    hanzi: "乘",
    count: 7,
    level: 1104,
  },
  {
    hanzi: "剩",
    count: 6,
    level: 1105,
  },
  {
    hanzi: "骨",
    count: 3,
    level: 1106,
  },
  {
    hanzi: "滑",
    count: 7,
    level: 1107,
  },
  {
    hanzi: "区",
    count: 52,
    level: 1108,
  },
  {
    hanzi: "欧",
    count: 4,
    level: 1109,
  },
  {
    hanzi: "义",
    count: 23,
    level: 1110,
  },
  {
    hanzi: "议",
    count: 33,
    level: 1111,
  },
  {
    hanzi: "希",
    count: 38,
    level: 1112,
  },
  {
    hanzi: "凶",
    count: 9,
    level: 1113,
  },
  {
    hanzi: "曲",
    count: 12,
    level: 1114,
  },
  {
    hanzi: "典",
    count: 18,
    level: 1115,
  },
  {
    hanzi: "胸",
    count: 5,
    level: 1116,
  },
  {
    hanzi: "齿",
    count: 4,
    level: 1117,
  },
  {
    hanzi: "龄",
    count: 8,
    level: 1118,
  },
  {
    hanzi: "离",
    count: 49,
    level: 1119,
  },
  {
    hanzi: "脑",
    count: 43,
    level: 1120,
  },
  {
    hanzi: "恼",
    count: 3,
    level: 1121,
  },
  {
    hanzi: "功",
    count: 40,
    level: 1122,
  },
  {
    hanzi: "势",
    count: 9,
    level: 1123,
  },
  {
    hanzi: "助",
    count: 42,
    level: 1124,
  },
  {
    hanzi: "历",
    count: 36,
    level: 1125,
  },
  {
    hanzi: "努",
    count: 39,
    level: 1126,
  },
  {
    hanzi: "劲",
    count: 7,
    level: 1127,
  },
  {
    hanzi: "穷",
    count: 7,
    level: 1128,
  },
  {
    hanzi: "勇",
    count: 7,
    level: 1129,
  },
  {
    hanzi: "通",
    count: 70,
    level: 1130,
  },
  {
    hanzi: "桶",
    count: 6,
    level: 1131,
  },
  {
    hanzi: "痛",
    count: 19,
    level: 1132,
  },
  {
    hanzi: "疗",
    count: 7,
    level: 1133,
  },
  {
    hanzi: "症",
    count: 7,
    level: 1134,
  },
  {
    hanzi: "瘦",
    count: 9,
    level: 1135,
  },
  {
    hanzi: "搜",
    count: 4,
    level: 1136,
    pinyin: "sōu"
  },
  {
    hanzi: "疯",
    count: 5,
    level: 1137,
  },
  {
    hanzi: "疾",
    count: 6,
    level: 1138,
  },
  {
    hanzi: "业",
    count: 99,
    level: 1139,
  },
  {
    hanzi: "亚",
    count: 8,
    level: 1140,
  },
  {
    hanzi: "显",
    count: 22,
    level: 1141,
  },
  {
    hanzi: "普",
    count: 13,
    level: 1142,
  },
  {
    hanzi: "严",
    count: 15,
    level: 1143,
  },
  {
    hanzi: "恶",
    count: 7,
    level: 1144,
  },
  {
    hanzi: "卫",
    count: 12,
    level: 1145,
  },
  {
    hanzi: "武",
    count: 6,
    level: 1146,
  },
  {
    hanzi: "丽",
    count: 11,
    level: 1147,
  },
  {
    hanzi: "导",
    count: 53,
    level: 1148,
  },
  {
    hanzi: "民",
    count: 72,
    level: 1149,
  },
  {
    hanzi: "异",
    count: 5,
    level: 1150,
  },
  {
    hanzi: "将",
    count: 54,
    level: 1151,
  },
  {
    hanzi: "装",
    count: 33,
    level: 1152,
  },
  {
    hanzi: "奖",
    count: 20,
    level: 1153,
  },
  {
    hanzi: "状",
    count: 11,
    level: 1154,
  },
  {
    hanzi: "射",
    count: 7,
    level: 1155,
  },
  {
    hanzi: "寻",
    count: 5,
    level: 1156,
  },
  {
    hanzi: "耐",
    count: 16,
    level: 1157,
  },
  {
    hanzi: "冠",
    count: 10,
    level: 1158,
  },
  {
    hanzi: "节",
    count: 75,
    level: 1159,
  },
  {
    hanzi: "爷",
    count: 35,
    level: 1160,
  },
  {
    hanzi: "范",
    count: 9,
    level: 1161,
  },
  {
    hanzi: "艺",
    count: 10,
    level: 1162,
  },
  {
    hanzi: "瓦",
    count: 1,
    level: 1163,
  },
  {
    hanzi: "瓶",
    count: 14,
    level: 1164,
  },
  {
    hanzi: "饼",
    count: 7,
    level: 1165,
  },
  {
    hanzi: "著",
    count: 6,
    level: 1166,
  },
  {
    hanzi: "若",
    count: 4,
    level: 1167,
  },
  {
    hanzi: "苹",
    count: 16,
    level: 1168,
  },
  {
    hanzi: "苏",
    count: 3,
    level: 1169,
  },
  {
    hanzi: "协",
    count: 7,
    level: 1170,
  },
  {
    hanzi: "胁",
    count: 1,
    level: 1171,
  },
  {
    hanzi: "藏",
    count: 24,
    level: 1172,
  },
  {
    hanzi: "吕",
    count: 0,
    level: 1173,
  },
  {
    hanzi: "宫",
    count: 1,
    level: 1174,
  },
  {
    hanzi: "营",
    count: 13,
    level: 1175,
  },
  {
    hanzi: "劳",
    count: 13,
    level: 1176,
  },
  {
    hanzi: "荣",
    count: 6,
    level: 1177,
  },
  {
    hanzi: "论",
    count: 35,
    level: 1178,
  },
  {
    hanzi: "评",
    count: 13,
    level: 1179,
  },
  {
    hanzi: "讯",
    count: 4,
    level: 1180,
  },
  {
    hanzi: "讲",
    count: 39,
    level: 1181,
  },
  {
    hanzi: "证",
    count: 21,
    level: 1182,
  },
  {
    hanzi: "谈",
    count: 17,
    level: 1183,
  },
  {
    hanzi: "训",
    count: 12,
    level: 1184,
  },
  {
    hanzi: "访",
    count: 6,
    level: 1185,
  },
  {
    hanzi: "误",
    count: 18,
    level: 1186,
  },
  {
    hanzi: "订",
    count: 11,
    level: 1187,
  },
  {
    hanzi: "诊",
    count: 3,
    level: 1188,
  },
  {
    hanzi: "诺",
    count: 7,
    level: 1189,
  },
  {
    hanzi: "诚",
    count: 10,
    level: 1190,
  },
  {
    hanzi: "详",
    count: 6,
    level: 1191,
  },
  {
    hanzi: "谊",
    count: 6,
    level: 1192,
  },
  {
    hanzi: "县",
    count: 4,
    level: 1193,
  },
  {
    hanzi: "谅",
    count: 4,
    level: 1194,
  },
  {
    hanzi: "凉",
    count: 13,
    level: 1195,
  },
  {
    hanzi: "度",
    count: 58,
    level: 1196,
  },
  {
    hanzi: "席",
    count: 12,
    level: 1197,
  },
  {
    hanzi: "府",
    count: 24,
    level: 1198,
  },
  {
    hanzi: "底",
    count: 21,
    level: 1199,
  },
  {
    hanzi: "座",
    count: 35,
    level: 1200,
  },
  {
    hanzi: "庆",
    count: 9,
    level: 1201,
  },
  {
    hanzi: "矿",
    count: 3,
    level: 1202,
  },
  {
    hanzi: "破",
    count: 21,
    level: 1203,
  },
  {
    hanzi: "础",
    count: 4,
    level: 1204,
  },
  {
    hanzi: "碍",
    count: 5,
    level: 1205,
  },
  {
    hanzi: "码",
    count: 9,
    level: 1206,
  },
  {
    hanzi: "库",
    count: 1,
    level: 1207,
  },
  {
    hanzi: "庄",
    count: 8,
    level: 1208,
  },
  {
    hanzi: "脏",
    count: 12,
    level: 1209,
  },
  {
    hanzi: "唐",
    count: 0,
    level: 1210,
  },
  {
    hanzi: "糖",
    count: 10,
    level: 1211,
  },
  {
    hanzi: "领",
    count: 54,
    level: 1212,
  },
  {
    hanzi: "零",
    count: 8,
    level: 1213,
  },
  {
    hanzi: "项",
    count: 29,
    level: 1214,
  },
  {
    hanzi: "须",
    count: 21,
    level: 1215,
  },
  {
    hanzi: "修",
    count: 29,
    level: 1216,
  },
  {
    hanzi: "彩",
    count: 15,
    level: 1217,
  },
  {
    hanzi: "额",
    count: 9,
    level: 1218,
  },
  {
    hanzi: "彦",
    count: 0,
    level: 1219,
  },
  {
    hanzi: "颜",
    count: 11,
    level: 1220,
  },
  {
    hanzi: "顺",
    count: 12,
    level: 1221,
  },
  {
    hanzi: "顾",
    count: 36,
    level: 1222,
  },
  {
    hanzi: "频",
    count: 3,
    level: 1223,
  },
  {
    hanzi: "顶",
    count: 11,
    level: 1224,
  },
  {
    hanzi: "硕",
    count: 2,
    level: 1225,
  },
  {
    hanzi: "态",
    count: 14,
    level: 1226,
  },
  {
    hanzi: "志",
    count: 11,
    level: 1227,
  },
  {
    hanzi: "念",
    count: 13,
    level: 1228,
  },
  {
    hanzi: "恋",
    count: 3,
    level: 1229,
  },
  {
    hanzi: "蛮",
    count: 1,
    level: 1230,
  },
  {
    hanzi: "恩",
    count: 5,
    level: 1231,
  },
  {
    hanzi: "怨",
    count: 3,
    level: 1232,
  },
  {
    hanzi: "宛",
    count: 1,
    level: 1233,
  },
  {
    hanzi: "腕",
    count: 1,
    level: 1234,
  },
  {
    hanzi: "碗",
    count: 12,
    level: 1235,
  },
  {
    hanzi: "德",
    count: 14,
    level: 1236,
  },
  {
    hanzi: "急",
    count: 24,
    level: 1237,
  },
  {
    hanzi: "隐",
    count: 9,
    level: 1238,
  },
  {
    hanzi: "稳",
    count: 2,
    level: 1239,
  },
  {
    hanzi: "悲",
    count: 6,
    level: 1240,
  },
  {
    hanzi: "串",
    count: 2,
    level: 1241,
  },
  {
    hanzi: "患",
    count: 3,
    level: 1242,
  },
  {
    hanzi: "虑",
    count: 8,
    level: 1243,
  },
  {
    hanzi: "虚",
    count: 7,
    level: 1244,
  },
  {
    hanzi: "虎",
    count: 12,
    level: 1245,
  },
  {
    hanzi: "忍",
    count: 7,
    level: 1246,
  },
  {
    hanzi: "企",
    count: 13,
    level: 1247,
  },
  {
    hanzi: "众",
    count: 21,
    level: 1248,
  },
  {
    hanzi: "食",
    count: 22,
    level: 1249,
  },
  {
    hanzi: "餐",
    count: 31,
    level: 1250,
  },
  {
    hanzi: "伞",
    count: 11,
    level: 1251,
  },
  {
    hanzi: "谷",
    count: 3,
    level: 1252,
  },
  {
    hanzi: "容",
    count: 56,
    level: 1253,
  },
  {
    hanzi: "欲",
    count: 4,
    level: 1254,
  },
  {
    hanzi: "复",
    count: 27,
    level: 1255,
  },
  {
    hanzi: "阳",
    count: 22,
    level: 1256,
  },
  {
    hanzi: "申",
    count: 9,
    level: 1257,
  },
  {
    hanzi: "审",
    count: 4,
    level: 1258,
  },
  {
    hanzi: "神",
    count: 23,
    level: 1259,
  },
  {
    hanzi: "智",
    count: 8,
    level: 1260,
  },
  {
    hanzi: "暗",
    count: 6,
    level: 1261,
  },
  {
    hanzi: "辰",
    count: 1,
    level: 1262,
  },
  {
    hanzi: "晨",
    count: 6,
    level: 1263,
  },
  {
    hanzi: "震",
    count: 8,
    level: 1264,
  },
  {
    hanzi: "晴",
    count: 2,
    level: 1265,
  },
  {
    hanzi: "暑",
    count: 4,
    level: 1266,
  },
  {
    hanzi: "怪",
    count: 19,
    level: 1267,
  },
  {
    hanzi: "性",
    count: 37,
    level: 1268,
  },
  {
    hanzi: "怀",
    count: 8,
    level: 1269,
  },
  {
    hanzi: "惊",
    count: 5,
    level: 1270,
  },
  {
    hanzi: "惜",
    count: 8,
    level: 1271,
  },
  {
    hanzi: "忆",
    count: 9,
    level: 1272,
  },
  {
    hanzi: "悔",
    count: 3,
    level: 1273,
  },
  {
    hanzi: "憾",
    count: 2,
    level: 1274,
  },
  {
    hanzi: "怖",
    count: 3,
    level: 1275,
  },
  {
    hanzi: "怜",
    count: 1,
    level: 1276,
  },
  {
    hanzi: "贯",
    count: 2,
    level: 1277,
  },
  {
    hanzi: "惯",
    count: 18,
    level: 1278,
  },
  {
    hanzi: "华",
    count: 14,
    level: 1279,
  },
  {
    hanzi: "克",
    count: 13,
    level: 1280,
  },
  {
    hanzi: "党",
    count: 4,
    level: 1281,
  },
  {
    hanzi: "掌",
    count: 11,
    level: 1282,
  },
  {
    hanzi: "堂",
    count: 9,
    level: 1283,
  },
  {
    hanzi: "甫",
    count: 0,
    level: 1284,
  },
  {
    hanzi: "葡",
    count: 9,
    level: 1285,
  },
  {
    hanzi: "萄",
    count: 9,
    level: 1286,
  },
  {
    hanzi: "缺",
    count: 8,
    level: 1287,
  },
  {
    hanzi: "筷",
    count: 6,
    level: 1288,
  },
  {
    hanzi: "傅",
    count: 4,
    level: 1289,
  },
  {
    hanzi: "博",
    count: 8,
    level: 1290,
  },
  {
    hanzi: "膊",
    count: 0,
    level: 1291,
  },
  {
    hanzi: "薄",
    count: 4,
    level: 1292,
  },
  {
    hanzi: "产",
    count: 48,
    level: 1293,
  },
  {
    hanzi: "质",
    count: 27,
    level: 1294,
  },
  {
    hanzi: "厅",
    count: 11,
    level: 1295,
  },
  {
    hanzi: "厉",
    count: 9,
    level: 1296,
  },
  {
    hanzi: "励",
    count: 5,
    level: 1297,
  },
  {
    hanzi: "危",
    count: 9,
    level: 1298,
  },
  {
    hanzi: "厨",
    count: 5,
    level: 1299,
  },
  {
    hanzi: "登",
    count: 6,
    level: 1300,
  },
  {
    hanzi: "段",
    count: 22,
    level: 1301,
  },
  {
    hanzi: "锻",
    count: 3,
    level: 1302,
  },
  {
    hanzi: "政",
    count: 37,
    level: 1303,
  },
  {
    hanzi: "效",
    count: 13,
    level: 1304,
  },
  {
    hanzi: "故",
    count: 47,
    level: 1305,
  },
  {
    hanzi: "散",
    count: 16,
    level: 1306,
  },
  {
    hanzi: "攻",
    count: 5,
    level: 1307,
  },
  {
    hanzi: "败",
    count: 11,
    level: 1308,
  },
  {
    hanzi: "敢",
    count: 8,
    level: 1309,
  },
  {
    hanzi: "聪",
    count: 10,
    level: 1310,
  },
  {
    hanzi: "敌",
    count: 27,
    level: 1311,
  },
  {
    hanzi: "敬",
    count: 10,
    level: 1312,
  },
  {
    hanzi: "警",
    count: 29,
    level: 1313,
  },
  {
    hanzi: "傲",
    count: 2,
    level: 1314,
  },
  {
    hanzi: "熬",
    count: 1,
    level: 1315,
  },
  {
    hanzi: "局",
    count: 12,
    level: 1316,
  },
  {
    hanzi: "居",
    count: 19,
    level: 1317,
  },
  {
    hanzi: "层",
    count: 10,
    level: 1318,
  },
  {
    hanzi: "尝",
    count: 7,
    level: 1319,
  },
  {
    hanzi: "偿",
    count: 2,
    level: 1320,
  },
  {
    hanzi: "属",
    count: 16,
    level: 1321,
  },
  {
    hanzi: "尼",
    count: 1,
    level: 1322,
  },
  {
    hanzi: "届",
    count: 3,
    level: 1323,
  },
  {
    hanzi: "尺",
    count: 3,
    level: 1324,
  },
  {
    hanzi: "尽",
    count: 24,
    level: 1325,
  },
  {
    hanzi: "迟",
    count: 14,
    level: 1326,
  },
  {
    hanzi: "屏",
    count: 2,
    level: 1327,
  },
  {
    hanzi: "权",
    count: 16,
    level: 1328,
  },
  {
    hanzi: "观",
    count: 43,
    level: 1329,
  },
  {
    hanzi: "双",
    count: 18,
    level: 1330,
  },
  {
    hanzi: "摄",
    count: 5,
    level: 1331,
  },
  {
    hanzi: "戏",
    count: 17,
    level: 1332,
  },
  {
    hanzi: "敲",
    count: 5,
    level: 1333,
  },
  {
    hanzi: "叔",
    count: 2,
    level: 1334,
  },
  {
    hanzi: "督",
    count: 1,
    level: 1335,
  },
  {
    hanzi: "戚",
    count: 0,
    level: 1336,
  },
  {
    hanzi: "椒",
    count: 4,
    level: 1337,
  },
  {
    hanzi: "血",
    count: 8,
    level: 1338,
  },
  {
    hanzi: "益",
    count: 14,
    level: 1339,
  },
  {
    hanzi: "温",
    count: 24,
    level: 1340,
  },
  {
    hanzi: "监",
    count: 2,
    level: 1341,
  },
  {
    hanzi: "临",
    count: 10,
    level: 1342,
  },
  {
    hanzi: "篮",
    count: 9,
    level: 1343,
  },
  {
    hanzi: "蓝",
    count: 17,
    level: 1344,
  },
  {
    hanzi: "盛",
    count: 8,
    level: 1345,
  },
  {
    hanzi: "盖",
    count: 7,
    level: 1346,
  },
  {
    hanzi: "盟",
    count: 3,
    level: 1347,
  },
  {
    hanzi: "盐",
    count: 5,
    level: 1348,
  },
  {
    hanzi: "盒",
    count: 8,
    level: 1349,
  },
  {
    hanzi: "宣",
    count: 4,
    level: 1350,
  },
  {
    hanzi: "宁",
    count: 3,
    level: 1351,
  },
  {
    hanzi: "守",
    count: 8,
    level: 1352,
  },
  {
    hanzi: "灾",
    count: 15,
    level: 1353,
  },
  {
    hanzi: "宗",
    count: 5,
    level: 1354,
  },
  {
    hanzi: "奥",
    count: 9,
    level: 1355,
  },
  {
    hanzi: "祭",
    count: 2,
    level: 1356,
  },
  {
    hanzi: "察",
    count: 33,
    level: 1357,
  },
  {
    hanzi: "擦",
    count: 6,
    level: 1358,
  },
  {
    hanzi: "赛",
    count: 55,
    level: 1359,
  },
  {
    hanzi: "寒",
    count: 8,
    level: 1360,
  },
  {
    hanzi: "塞",
    count: 4,
    level: 1361,
  },
  {
    hanzi: "春",
    count: 36,
    level: 1362,
  },
  {
    hanzi: "奉",
    count: 1,
    level: 1363,
  },
  {
    hanzi: "棒",
    count: 7,
    level: 1364,
  },
  {
    hanzi: "举",
    count: 27,
    level: 1365,
  },
  {
    hanzi: "择",
    count: 12,
    level: 1366,
  },
  {
    hanzi: "播",
    count: 14,
    level: 1367,
  },
  {
    hanzi: "释",
    count: 10,
    level: 1368,
  },
  {
    hanzi: "译",
    count: 5,
    level: 1369,
  },
  {
    hanzi: "悉",
    count: 3,
    level: 1370,
  },
  {
    hanzi: "羽",
    count: 6,
    level: 1371,
  },
  {
    hanzi: "翻",
    count: 13,
    level: 1372,
  },
  {
    hanzi: "扇",
    count: 4,
    level: 1373,
  },
  {
    hanzi: "旁",
    count: 13,
    level: 1374,
  },
  {
    hanzi: "童",
    count: 18,
    level: 1375,
  },
  {
    hanzi: "竞",
    count: 2,
    level: 1376,
  },
  {
    hanzi: "章",
    count: 17,
    level: 1377,
  },
  {
    hanzi: "端",
    count: 4,
    level: 1378,
  },
  {
    hanzi: "帝",
    count: 4,
    level: 1379,
  },
  {
    hanzi: "商",
    count: 46,
    level: 1380,
  },
  {
    hanzi: "橘",
    count: 1,
    level: 1381,
  },
  {
    hanzi: "费",
    count: 32,
    level: 1382,
  },
  {
    hanzi: "佛",
    count: 4,
    level: 1383,
  },
  {
    hanzi: "聊",
    count: 19,
    level: 1384,
  },
  {
    hanzi: "贸",
    count: 0,
    level: 1385,
  },
  {
    hanzi: "留",
    count: 30,
    level: 1386,
  },
  {
    hanzi: "债",
    count: 2,
    level: 1387,
  },
  {
    hanzi: "贴",
    count: 6,
    level: 1388,
  },
  {
    hanzi: "战",
    count: 28,
    level: 1389,
  },
  {
    hanzi: "赔",
    count: 4,
    level: 1390,
  },
  {
    hanzi: "财",
    count: 7,
    level: 1391,
  },
  {
    hanzi: "贫",
    count: 3,
    level: 1392,
  },
  {
    hanzi: "贷",
    count: 5,
    level: 1393,
  },
  {
    hanzi: "贡",
    count: 2,
    level: 1394,
  },
  {
    hanzi: "参",
    count: 38,
    level: 1395,
  },
  {
    hanzi: "类",
    count: 21,
    level: 1396,
  },
  {
    hanzi: "央",
    count: 4,
    level: 1397,
  },
  {
    hanzi: "英",
    count: 24,
    level: 1398,
  },
  {
    hanzi: "映",
    count: 4,
    level: 1399,
  },
  {
    hanzi: "换",
    count: 25,
    level: 1400,
  },
  {
    hanzi: "奋",
    count: 9,
    level: 1401,
  },
  {
    hanzi: "夺",
    count: 6,
    level: 1402,
  },
  {
    hanzi: "莫",
    count: 6,
    level: 1403,
  },
  {
    hanzi: "模",
    count: 20,
    level: 1404,
  },
  {
    hanzi: "幕",
    count: 5,
    level: 1405,
  },
  {
    hanzi: "膜",
    count: 1,
    level: 1406,
  },
  {
    hanzi: "羡",
    count: 5,
    level: 1407,
  },
  {
    hanzi: "慕",
    count: 6,
    level: 1408,
  },
  {
    hanzi: "存",
    count: 9,
    level: 1409,
  },
  {
    hanzi: "李",
    count: 17,
    level: 1410,
  },
  {
    hanzi: "享",
    count: 5,
    level: 1411,
  },
  {
    hanzi: "亮",
    count: 32,
    level: 1412,
  },
  {
    hanzi: "漂",
    count: 19,
    level: 1413,
  },
  {
    hanzi: "熟",
    count: 7,
    level: 1414,
  },
  {
    hanzi: "孙",
    count: 2,
    level: 1415,
  },
  {
    hanzi: "获",
    count: 16,
    level: 1416,
  },
  {
    hanzi: "献",
    count: 4,
    level: 1417,
  },
  {
    hanzi: "默",
    count: 8,
    level: 1418,
  },
  {
    hanzi: "独",
    count: 12,
    level: 1419,
  },
  {
    hanzi: "融",
    count: 6,
    level: 1420,
  },
  {
    hanzi: "犯",
    count: 10,
    level: 1421,
  },
  {
    hanzi: "狂",
    count: 2,
    level: 1422,
  },
  {
    hanzi: "猜",
    count: 6,
    level: 1423,
  },
  {
    hanzi: "检",
    count: 6,
    level: 1424,
  },
  {
    hanzi: "验",
    count: 15,
    level: 1425,
  },
  {
    hanzi: "险",
    count: 6,
    level: 1426,
  },
  {
    hanzi: "脸",
    count: 18,
    level: 1427,
  },
  {
    hanzi: "签",
    count: 14,
    level: 1428,
  },
  {
    hanzi: "斯",
    count: 4,
    level: 1429,
  },
  {
    hanzi: "甚",
    count: 1,
    level: 1430,
  },
  {
    hanzi: "断",
    count: 19,
    level: 1431,
  },
  {
    hanzi: "斩",
    count: 1,
    level: 1432,
  },
  {
    hanzi: "暂",
    count: 8,
    level: 1433,
  },
  {
    hanzi: "丘",
    count: 1,
    level: 1434,
  },
  {
    hanzi: "乒",
    count: 3,
    level: 1435,
  },
  {
    hanzi: "乓",
    count: 3,
    level: 1436,
  },
  {
    hanzi: "兵",
    count: 4,
    level: 1437,
  },
  {
    hanzi: "宾",
    count: 5,
    level: 1438,
  },
  {
    hanzi: "军",
    count: 26,
    level: 1439,
  },
  {
    hanzi: "农",
    count: 14,
    level: 1440,
  },
  {
    hanzi: "辑",
    count: 2,
    level: 1441,
  },
  {
    hanzi: "载",
    count: 2,
    level: 1442,
  },
  {
    hanzi: "裁",
    count: 2,
    level: 1443,
  },
  {
    hanzi: "戴",
    count: 11,
    level: 1444,
  },
  {
    hanzi: "舟",
    count: 0,
    level: 1445,
  },
  {
    hanzi: "船",
    count: 13,
    level: 1446,
  },
  {
    hanzi: "般",
    count: 21,
    level: 1447,
  },
  {
    hanzi: "搬",
    count: 13,
    level: 1448,
  },
  {
    hanzi: "抗",
    count: 7,
    level: 1449,
  },
  {
    hanzi: "航",
    count: 4,
    level: 1450,
  },
  {
    hanzi: "盘",
    count: 11,
    level: 1451,
  },
  {
    hanzi: "封",
    count: 11,
    level: 1452,
  },
  {
    hanzi: "佳",
    count: 4,
    level: 1453,
  },
  {
    hanzi: "挂",
    count: 7,
    level: 1454,
  },
  {
    hanzi: "革",
    count: 9,
    level: 1455,
  },
  {
    hanzi: "鞋",
    count: 14,
    level: 1456,
  },
  {
    hanzi: "街",
    count: 17,
    level: 1457,
  },
  {
    hanzi: "策",
    count: 11,
    level: 1458,
  },
  {
    hanzi: "符",
    count: 6,
    level: 1459,
  },
  {
    hanzi: "箱",
    count: 11,
    level: 1460,
  },
  {
    hanzi: "笨",
    count: 3,
    level: 1461,
  },
  {
    hanzi: "笔",
    count: 26,
    level: 1462,
  },
  {
    hanzi: "答",
    count: 28,
    level: 1463,
    pinyin: "dá",
  },
  {
    hanzi: "巩",
    count: 2,
    level: 1464,
  },
  {
    hanzi: "筑",
    count: 4,
    level: 1465,
  },
  {
    hanzi: "恐",
    count: 8,
    level: 1466,
  },
  {
    hanzi: "委",
    count: 7,
    level: 1467,
  },
  {
    hanzi: "威",
    count: 2,
    level: 1468,
  },
  {
    hanzi: "婚",
    count: 30,
    level: 1469,
  },
  {
    hanzi: "媒",
    count: 5,
    level: 1470,
  },
  {
    hanzi: "妇",
    count: 4,
    level: 1471,
  },
  {
    hanzi: "妻",
    count: 6,
    level: 1472,
  },
  {
    hanzi: "妨",
    count: 4,
    level: 1473,
  },
  {
    hanzi: "围",
    count: 18,
    level: 1474,
  },
  {
    hanzi: "困",
    count: 23,
    level: 1475,
  },
  {
    hanzi: "固",
    count: 8,
    level: 1476,
  },
  {
    hanzi: "圆",
    count: 6,
    level: 1477,
  },
  {
    hanzi: "卷",
    count: 3,
    level: 1478,
  },
  {
    hanzi: "券",
    count: 1,
    level: 1479,
  },
  {
    hanzi: "圈",
    count: 6,
    level: 1480,
  },
  {
    hanzi: "窗",
    count: 12,
    level: 1481,
  },
  {
    hanzi: "帘",
    count: 2,
    level: 1482,
  },
  {
    hanzi: "布",
    count: 19,
    level: 1483,
  },
  {
    hanzi: "币",
    count: 7,
    level: 1484,
  },
  {
    hanzi: "闹",
    count: 15,
    level: 1485,
  },
  {
    hanzi: "冒",
    count: 15,
    level: 1486,
  },
  {
    hanzi: "帽",
    count: 26,
    level: 1487,
  },
  {
    hanzi: "套",
    count: 16,
    level: 1488,
  },
  {
    hanzi: "录",
    count: 7,
    level: 1489,
  },
  {
    hanzi: "绿",
    count: 10,
    level: 1490,
  },
  {
    hanzi: "兼",
    count: 6,
    level: 1491,
  },
  {
    hanzi: "赚",
    count: 9,
    level: 1492,
  },
  {
    hanzi: "歉",
    count: 0,
    level: 1493,
  },
  {
    hanzi: "谦",
    count: 0,
    level: 1494,
  },
  {
    hanzi: "初",
    count: 9,
    level: 1495,
  },
  {
    hanzi: "彻",
    count: 1,
    level: 1496,
  },
  {
    hanzi: "补",
    count: 11,
    level: 1497,
  },
  {
    hanzi: "裤",
    count: 7,
    level: 1498,
  },
  {
    hanzi: "裙",
    count: 4,
    level: 1499,
  },
  {
    hanzi: "衫",
    count: 3,
    level: 1500,
  },
  {
    hanzi: "衬",
    count: 4,
    level: 1501,
  },
  {
    hanzi: "袜",
    count: 1,
    level: 1502,
  },
  {
    hanzi: "略",
    count: 4,
    level: 1503,
  },
  {
    hanzi: "画",
    count: 26,
    level: 1504,
  },
  {
    hanzi: "雷",
    count: 6,
    level: 1505,
  },
  {
    hanzi: "甲",
    count: 3,
    level: 1506,
  },
  {
    hanzi: "鼻",
    count: 3,
    level: 1507,
  },
  {
    hanzi: "畏",
    count: 2,
    level: 1508,
  },
  {
    hanzi: "喂",
    count: 4,
    level: 1509,
  },
  {
    hanzi: "针",
    count: 8,
    level: 1510,
  },
  {
    hanzi: "镇",
    count: 2,
    level: 1511,
  },
  {
    hanzi: "钢",
    count: 5,
    level: 1512,
  },
  {
    hanzi: "键",
    count: 3,
    level: 1513,
  },
  {
    hanzi: "铅",
    count: 1,
    level: 1514,
  },
  {
    hanzi: "钥",
    count: 1,
    level: 1515,
  },
  {
    hanzi: "匙",
    count: 1,
    level: 1516,
  },
  {
    hanzi: "乔",
    count: 0,
    level: 1517,
  },
  {
    hanzi: "骄",
    count: 0,
    level: 1518,
  },
  {
    hanzi: "桥",
    count: 9,
    level: 1519,
  },
  {
    hanzi: "鸟",
    count: 17,
    level: 1520,
  },
  {
    hanzi: "鸡",
    count: 15,
    level: 1521,
  },
  {
    hanzi: "岛",
    count: 4,
    level: 1522,
  },
  {
    hanzi: "鸭",
    count: 6,
    level: 1523,
  },
  {
    hanzi: "灵",
    count: 8,
    level: 1524,
  },
  {
    hanzi: "烟",
    count: 10,
    level: 1525,
  },
  {
    hanzi: "炎",
    count: 6,
    level: 1526,
  },
  {
    hanzi: "炼",
    count: 5,
    level: 1527,
  },
  {
    hanzi: "烧",
    count: 11,
    level: 1528,
  },
  {
    hanzi: "绕",
    count: 3,
    level: 1529,
  },
  {
    hanzi: "浇",
    count: 5,
    level: 1530,
  },
  {
    hanzi: "部",
    count: 78,
    level: 1531,
  },
  {
    hanzi: "隔",
    count: 10,
    level: 1532,
  },
  {
    hanzi: "款",
    count: 27,
    level: 1533,
  },
  {
    hanzi: "资",
    count: 54,
    level: 1534,
  },
  {
    hanzi: "货",
    count: 13,
    level: 1535,
  },
  {
    hanzi: "赞",
    count: 11,
    level: 1536,
  },
  {
    hanzi: "雕",
    count: 2,
    level: 1537,
  },
  {
    hanzi: "调",
    count: 45,
    level: 1538,
  },
  {
    hanzi: "设",
    count: 33,
    level: 1539,
  },
  {
    hanzi: "罚",
    count: 9,
    level: 1540,
  },
  {
    hanzi: "剑",
    count: 1,
    level: 1541,
  },
  {
    hanzi: "允",
    count: 0,
    level: 1542,
  },
  {
    hanzi: "许",
    count: 25,
    level: 1543,
  },
  {
    hanzi: "谋",
    count: 10,
    level: 1544,
  },
  {
    hanzi: "煤",
    count: 6,
    level: 1545,
  },
  {
    hanzi: "灭",
    count: 13,
    level: 1546,
  },
  {
    hanzi: "炸",
    count: 9,
    level: 1547,
  },
  {
    hanzi: "储",
    count: 5,
    level: 1548,
  },
  {
    hanzi: "伟",
    count: 9,
    level: 1549,
  },
  {
    hanzi: "侧",
    count: 8,
    level: 1550,
  },
  {
    hanzi: "侵",
    count: 5,
    level: 1551,
  },
  {
    hanzi: "伦",
    count: 1,
    level: 1552,
  },
  {
    hanzi: "轮",
    count: 12,
    level: 1553,
  },
  {
    hanzi: "亿",
    count: 4,
    level: 1554,
  },
  {
    hanzi: "迅",
    count: 1,
    level: 1555,
  },
  {
    hanzi: "速",
    count: 20,
    level: 1556,
  },
  {
    hanzi: "迫",
    count: 6,
    level: 1557,
  },
  {
    hanzi: "荐",
    count: 1,
    level: 1558,
  },
  {
    hanzi: "菌",
    count: 3,
    level: 1559,
  },
  {
    hanzi: "团",
    count: 21,
    level: 1560,
  },
  {
    hanzi: "闭",
    count: 10,
    level: 1561,
  },
  {
    hanzi: "闪",
    count: 7,
    level: 1562,
  },
  {
    hanzi: "喊",
    count: 2,
    level: 1563,
  },
  {
    hanzi: "启",
    count: 12,
    level: 1564,
  },
  {
    hanzi: "罢",
    count: 6,
    level: 1565,
  },
  {
    hanzi: "摆",
    count: 11,
    level: 1566,
  },
  {
    hanzi: "握",
    count: 15,
    level: 1567,
  },
  {
    hanzi: "摇",
    count: 8,
    level: 1568,
  },
  {
    hanzi: "抵",
    count: 6,
    level: 1569,
  },
  {
    hanzi: "援",
    count: 5,
    level: 1570,
  },
  {
    hanzi: "搭",
    count: 15,
    level: 1571,
  },
  {
    hanzi: "忽",
    count: 4,
    level: 1572,
  },
  {
    hanzi: "惠",
    count: 9,
    level: 1573,
  },
  {
    hanzi: "甜",
    count: 9,
    level: 1574,
  },
  {
    hanzi: "墙",
    count: 9,
    level: 1575,
  },
  {
    hanzi: "碰",
    count: 9,
    level: 1576,
  },
  {
    hanzi: "坦",
    count: 5,
    level: 1577,
  },
  {
    hanzi: "胆",
    count: 8,
    level: 1578,
  },
  {
    hanzi: "朗",
    count: 7,
    level: 1579,
  },
  {
    hanzi: "肠",
    count: 4,
    level: 1580,
  },
  {
    hanzi: "销",
    count: 12,
    level: 1581,
  },
  {
    hanzi: "锋",
    count: 4,
    level: 1582,
  },
  {
    hanzi: "雄",
    count: 6,
    level: 1583,
  },
  {
    hanzi: "截",
    count: 9,
    level: 1584,
  },
  {
    hanzi: "替",
    count: 11,
    level: 1585,
  },
  {
    hanzi: "潜",
    count: 5,
    level: 1586,
  },
  {
    hanzi: "泪",
    count: 4,
    level: 1587,
  },
  {
    hanzi: "涉",
    count: 5,
    level: 1588,
  },
  {
    hanzi: "漫",
    count: 2,
    level: 1589,
  },
  {
    hanzi: "婆",
    count: 12,
    level: 1590,
  },
  {
    hanzi: "洁",
    count: 5,
    level: 1591,
  },
  {
    hanzi: "浓",
    count: 11,
    level: 1592,
  },
  {
    hanzi: "岸",
    count: 3,
    level: 1593,
  },
  {
    hanzi: "废",
    count: 13,
    level: 1594,
  },
  {
    hanzi: "触",
    count: 8,
    level: 1595,
  },
  {
    hanzi: "麦",
    count: 2,
    level: 1596,
  },
  {
    hanzi: "珍",
    count: 12,
    level: 1597,
  },
  {
    hanzi: "珠",
    count: 3,
    level: 1598,
  },
  {
    hanzi: "旗",
    count: 3,
    level: 1599,
  },
  {
    hanzi: "祖",
    count: 3,
    level: 1600,
  },
  {
    hanzi: "敏",
    count: 5,
    level: 1601,
  },
  {
    hanzi: "繁",
    count: 2,
    level: 1602,
  },
  {
    hanzi: "紫",
    count: 3,
    level: 1603,
  },
  {
    hanzi: "梅",
    count: 1,
    level: 1604,
  },
  {
    hanzi: "闲",
    count: 3,
    level: 1605,
  },
  {
    hanzi: "杰",
    count: 1,
    level: 1606,
  },
  {
    hanzi: "棉",
    count: 3,
    level: 1607,
  },
  {
    hanzi: "横",
    count: 3,
    level: 1608,
  },
  {
    hanzi: "纵",
    count: 3,
    level: 1609,
  },
  {
    hanzi: "杆",
    count: 4,
    level: 1610,
  },
  {
    hanzi: "刊",
    count: 2,
    level: 1611,
  },
  {
    hanzi: "肝",
    count: 3,
    level: 1612,
  },
  {
    hanzi: "腰",
    count: 2,
    level: 1613,
  },
  {
    hanzi: "肺",
    count: 2,
    level: 1614,
  },
  {
    hanzi: "胃",
    count: 4,
    level: 1615,
  },
  {
    hanzi: "谓",
    count: 4,
    level: 1616,
  },
  {
    hanzi: "诗",
    count: 5,
    level: 1617,
  },
  {
    hanzi: "询",
    count: 5,
    level: 1618,
  },
  {
    hanzi: "诞",
    count: 3,
    level: 1619,
  },
  {
    hanzi: "诸",
    count: 1,
    level: 1620,
  },
  {
    hanzi: "奔",
    count: 1,
    level: 1621,
  },
  {
    hanzi: "尖",
    count: 4,
    level: 1622,
  },
  {
    hanzi: "夸",
    count: 6,
    level: 1623,
  },
  {
    hanzi: "跨",
    count: 2,
    level: 1624,
  },
  {
    hanzi: "垮",
    count: 1,
    level: 1625,
  },
  {
    hanzi: "挎",
    count: 1,
    level: 1626,
  },
  {
    hanzi: "扣",
    count: 8,
    level: 1627,
  },
  {
    hanzi: "撞",
    count: 3,
    level: 1628,
  },
  {
    hanzi: "摸",
    count: 4,
    level: 1629,
  },
  {
    hanzi: "拔",
    count: 7,
    level: 1630,
  },
  {
    hanzi: "振",
    count: 2,
    level: 1631,
  },
  {
    hanzi: "拖",
    count: 5,
    level: 1632,
  },
  {
    hanzi: "拼",
    count: 5,
    level: 1633,
  },
  {
    hanzi: "拆",
    count: 2,
    level: 1634,
  },
  {
    hanzi: "扎",
    count: 11,
    level: 1635,
  },
  {
    hanzi: "乳",
    count: 2,
    level: 1636,
  },
  {
    hanzi: "浮",
    count: 6,
    level: 1637,
  },
  {
    hanzi: "泥",
    count: 2,
    level: 1638,
  },
  {
    hanzi: "湿",
    count: 1,
    level: 1639,
  },
  {
    hanzi: "沿",
    count: 6,
    level: 1640,
  },
  {
    hanzi: "泡",
    count: 10,
    level: 1641,
  },
  {
    hanzi: "炮",
    count: 2,
    level: 1642,
  },
  {
    hanzi: "灰",
    count: 20,
    level: 1643,
  },
  {
    hanzi: "晓",
    count: 1,
    level: 1644,
  },
  {
    hanzi: "曹",
    count: 5,
    level: 1645,
  },
  {
    hanzi: "遭",
    count: 7,
    level: 1646,
  },
  {
    hanzi: "糟",
    count: 1,
    level: 1647,
  },
  {
    hanzi: "糕",
    count: 8,
    level: 1648,
  },
  {
    hanzi: "粮",
    count: 1,
    level: 1649,
  },
  {
    hanzi: "凡",
    count: 3,
    level: 1650,
  },
  {
    hanzi: "洞",
    count: 6,
    level: 1651,
  },
  {
    hanzi: "铜",
    count: 2,
    level: 1652,
  },
  {
    hanzi: "铺",
    count: 5,
    level: 1653,
  },
  {
    hanzi: "锁",
    count: 0,
    level: 1654,
  },
  {
    hanzi: "赏",
    count: 6,
    level: 1655,
  },
  {
    hanzi: "账",
    count: 1,
    level: 1656,
  },
  {
    hanzi: "贺",
    count: 2,
    level: 1657,
  },
  {
    hanzi: "茄",
    count: 3,
    level: 1658,
  },
  {
    hanzi: "驾",
    count: 4,
    level: 1659,
  },
  {
    hanzi: "驶",
    count: 2,
    level: 1660,
  },
  {
    hanzi: "驻",
    count: 1,
    level: 1661,
  },
  {
    hanzi: "乌",
    count: 6,
    level: 1662,
  },
  {
    hanzi: "塔",
    count: 1,
    level: 1663,
  },
  {
    hanzi: "坡",
    count: 4,
    level: 1664,
  },
  {
    hanzi: "壁",
    count: 1,
    level: 1665,
  },
  {
    hanzi: "勤",
    count: 4,
    level: 1666,
  },
  {
    hanzi: "幼",
    count: 5,
    level: 1667,
  },
  {
    hanzi: "蒙",
    count: 8,
    level: 1668,
  },
  {
    hanzi: "豪",
    count: 0,
    level: 1669,
  },
  {
    hanzi: "毫",
    count: 3,
    level: 1670,
  },
  {
    hanzi: "尾",
    count: 5,
    level: 1671,
  },
  {
    hanzi: "耗",
    count: 1,
    level: 1672,
  },
  {
    hanzi: "径",
    count: 2,
    level: 1673,
  },
  {
    hanzi: "衡",
    count: 2,
    level: 1674,
  },
  {
    hanzi: "徒",
    count: 0,
    level: 1675,
  },
  {
    hanzi: "趋",
    count: 1,
    level: 1676,
  },
  {
    hanzi: "逼",
    count: 4,
    level: 1677,
  },
  {
    hanzi: "返",
    count: 0,
    level: 1678,
  },
  {
    hanzi: "迁",
    count: 2,
    level: 1679,
  },
  {
    hanzi: "猛",
    count: 5,
    level: 1680,
  },
  {
    hanzi: "仔",
    count: 7,
    level: 1681,
  },
  {
    hanzi: "仪",
    count: 2,
    level: 1682,
  },
  {
    hanzi: "俗",
    count: 4,
    level: 1683,
  },
  {
    hanzi: "俱",
    count: 1,
    level: 1684,
  },
  {
    hanzi: "傻",
    count: 1,
    level: 1685,
  },
  {
    hanzi: "妙",
    count: 5,
    level: 1686,
  },
  {
    hanzi: "奴",
    count: 0,
    level: 1687,
  },
  {
    hanzi: "怒",
    count: 2,
    level: 1688,
  },
  {
    hanzi: "愤",
    count: 2,
    level: 1689,
  },
  {
    hanzi: "磨",
    count: 5,
    level: 1690,
  },
  {
    hanzi: "鬼",
    count: 5,
    level: 1691,
  },
  {
    hanzi: "魔",
    count: 1,
    level: 1692,
  },
  {
    hanzi: "嘛",
    count: 1,
    level: 1693,
  },
  {
    hanzi: "唯",
    count: 5,
    level: 1694,
  },
  {
    hanzi: "滴",
    count: 1,
    level: 1695,
  },
  {
    hanzi: "摘",
    count: 2,
    level: 1696,
  },
  {
    hanzi: "燃",
    count: 5,
    level: 1697,
  },
  {
    hanzi: "腐",
    count: 2,
    level: 1698,
  },
  {
    hanzi: "宏",
    count: 0,
    level: 1699,
  },
  {
    hanzi: "辈",
    count: 6,
    level: 1700,
  },
  {
    hanzi: "插",
    count: 4,
    level: 1701,
  },
  {
    hanzi: "毁",
    count: 4,
    level: 1702,
  },
  {
    hanzi: "鼠",
    count: 5,
    level: 1703,
  },
  {
    hanzi: "舆",
    count: 1,
    level: 1704,
  },
  {
    hanzi: "舅",
    count: 3,
    level: 1705,
  },
  {
    hanzi: "番",
    count: 6,
    level: 1706,
  },
  {
    hanzi: "滔",
    count: 1,
    level: 1707,
  },
  {
    hanzi: "稻",
    count: 3,
    level: 1708,
  },
  {
    hanzi: "稿",
    count: 3,
    level: 1709,
  },
  {
    hanzi: "蹈",
    count: 2,
    level: 1710,
  },
  {
    hanzi: "跃",
    count: 5,
    level: 1711,
  },
  {
    hanzi: "陷",
    count: 2,
    level: 1712,
  },
  {
    hanzi: "焰",
    count: 1,
    level: 1713,
  },
  {
    hanzi: "阎",
    count: 1,
    level: 1714,
  },
  {
    hanzi: "掐",
    count: 1,
    level: 1715,
  },
  {
    hanzi: "馅",
    count: 2,
    level: 1716,
  },
  {
    hanzi: "饰",
    count: 6,
    level: 1717,
  },
  {
    hanzi: "册",
    count: 3,
    level: 1718,
  },
  {
    hanzi: "岗",
    count: 1,
    level: 1719,
  },
  {
    hanzi: "卒",
    count: 1,
    level: 1720,
  },
  {
    hanzi: "碎",
    count: 5,
    level: 1721,
  },
  {
    hanzi: "醉",
    count: 1,
    level: 1722,
  },
  {
    hanzi: "翠",
    count: 0,
    level: 1723,
  },
  {
    hanzi: "粹",
    count: 2,
    level: 1724,
  },
  {
    hanzi: "糊",
    count: 2,
    level: 1725,
  },
  {
    hanzi: "览",
    count: 2,
    level: 1726,
  },
  {
    hanzi: "鉴",
    count: 3,
    level: 1727,
  },
  {
    hanzi: "锅",
    count: 8,
    level: 1728,
  },
  {
    hanzi: "窝",
    count: 7,
    level: 1729,
  },
  {
    hanzi: "祸",
    count: 7,
    level: 1730,
  },
  {
    hanzi: "涡",
    count: 0,
    level: 1731,
  },
  {
    hanzi: "殊",
    count: 2,
    level: 1732,
  },
  {
    hanzi: "殖",
    count: 1,
    level: 1733,
  },
  {
    hanzi: "裂",
    count: 1,
    level: 1734,
  },
  {
    hanzi: "滚",
    count: 3,
    level: 1735,
  },
  {
    hanzi: "讼",
    count: 1,
    level: 1736,
  },
  {
    hanzi: "颂",
    count: 2,
    level: 1737,
  },
  {
    hanzi: "翁",
    count: 1,
    level: 1738,
  },
  {
    hanzi: "嗡",
    count: 1,
    level: 1739,
  },
  {
    hanzi: "叹",
    count: 1,
    level: 1740,
  },
  {
    hanzi: "喷",
    count: 3,
    level: 1741,
  },
  {
    hanzi: "哇",
    count: 1,
    level: 1742,
  },
  {
    hanzi: "娃",
    count: 3,
    level: 1743,
  },
  {
    hanzi: "嫌",
    count: 1,
    level: 1744,
  },
  {
    hanzi: "娱",
    count: 2,
    level: 1745,
  },
  {
    hanzi: "奏",
    count: 4,
    level: 1746,
  },
  {
    hanzi: "壮",
    count: 2,
    level: 1747,
  },
  {
    hanzi: "嘉",
    count: 1,
    level: 1748,
  },
  {
    hanzi: "牵",
    count: 1,
    level: 1749,
  },
  {
    hanzi: "倾",
    count: 2,
    level: 1750,
  },
  {
    hanzi: "宇",
    count: 3,
    level: 1751,
  },
  {
    hanzi: "宙",
    count: 2,
    level: 1752,
  },
  {
    hanzi: "宅",
    count: 4,
    level: 1753,
  },
  {
    hanzi: "诧",
    count: 1,
    level: 1754,
  },
  {
    hanzi: "畅",
    count: 2,
    level: 1755,
  },
  {
    hanzi: "伸",
    count: 1,
    level: 1756,
  },
  {
    hanzi: "凭",
    count: 2,
    level: 1757,
  },
  {
    hanzi: "伍",
    count: 6,
    level: 1758,
  },
  {
    hanzi: "仿",
    count: 4,
    level: 1759,
  },
  {
    hanzi: "旋",
    count: 1,
    level: 1760,
  },
  {
    hanzi: "狠",
    count: 2,
    level: 1761,
  },
  {
    hanzi: "艰",
    count: 6,
    level: 1762,
  },
  {
    hanzi: "恨",
    count: 2,
    level: 1763,
  },
  {
    hanzi: "忧",
    count: 3,
    level: 1764,
  },
  {
    hanzi: "恢",
    count: 1,
    level: 1765,
  },
  {
    hanzi: "惨",
    count: 5,
    level: 1766,
  },
  {
    hanzi: "渗",
    count: 3,
    level: 1767,
  },
  {
    hanzi: "泛",
    count: 0,
    level: 1768,
  },
  {
    hanzi: "洪",
    count: 2,
    level: 1769,
  },
  {
    hanzi: "池",
    count: 4,
    level: 1770,
  },
  {
    hanzi: "漏",
    count: 3,
    level: 1771,
  },
  {
    hanzi: "渡",
    count: 3,
    level: 1772,
  },
  {
    hanzi: "踱",
    count: 1,
    level: 1773,
  },
  {
    hanzi: "粱",
    count: 0,
    level: 1774,
  },
  {
    hanzi: "梁",
    count: 1,
    level: 1775,
  },
  {
    hanzi: "桃",
    count: 1,
    level: 1776,
  },
  {
    hanzi: "榜",
    count: 1,
    level: 1777,
  },
  {
    hanzi: "镑",
    count: 0,
    level: 1778,
  },
  {
    hanzi: "傍",
    count: 0,
    level: 1779,
  },
  {
    hanzi: "磅",
    count: 1,
    level: 1780,
  },
  {
    hanzi: "膀",
    count: 2,
    level: 1781,
  },
  {
    hanzi: "肩",
    count: 4,
    level: 1782,
  },
  {
    hanzi: "捐",
    count: 7,
    level: 1783,
  },
  {
    hanzi: "柜",
    count: 6,
    level: 1784,
  },
  {
    hanzi: "矩",
    count: 2,
    level: 1785,
  },
  {
    hanzi: "炬",
    count: 0,
    level: 1786,
  },
  {
    hanzi: "拒",
    count: 7,
    level: 1787,
  },
  {
    hanzi: "捕",
    count: 3,
    level: 1788,
  },
  {
    hanzi: "揭",
    count: 3,
    level: 1789,
  },
  {
    hanzi: "撤",
    count: 2,
    level: 1790,
  },
  {
    hanzi: "扶",
    count: 4,
    level: 1791,
  },
  {
    hanzi: "夹",
    count: 3,
    level: 1792,
  },
  {
    hanzi: "侠",
    count: 2,
    level: 1793,
  },
  {
    hanzi: "峡",
    count: 3,
    level: 1794,
  },
  {
    hanzi: "\b狭",
    count: 0,
    level: 1795,
  },
  {
    hanzi: "挟",
    count: 1,
    level: 1796,
  },
  {
    hanzi: "栋",
    count: 8,
    level: 1797,
  },
  {
    hanzi: "冻",
    count: 3,
    level: 1798,
  },
  {
    hanzi: "盗",
    count: 5,
    level: 1799,
  },
  {
    hanzi: "欣",
    count: 2,
    level: 1800,
  },
  {
    hanzi: "祥",
    count: 2,
    level: 1801,
  },
  {
    hanzi: "氧",
    count: 5,
    level: 1802,
  },
  {
    hanzi: "氛",
    count: 5,
    level: 1803,
  },
  {
    hanzi: "盆",
    count: 7,
    level: 1804,
  },
  {
    hanzi: "忠",
    count: 3,
    level: 1805,
  },
  {
    hanzi: "尉",
    count: 0,
    level: 1806,
  },
  {
    hanzi: "慰",
    count: 3,
    level: 1807,
  },
  {
    hanzi: "悬",
    count: 1,
    level: 1808,
  },
  {
    hanzi: "轨",
    count: 4,
    level: 1809,
  },
  {
    hanzi: "辅",
    count: 1,
    level: 1810,
  },
  {
    hanzi: "耀",
    count: 1,
    level: 1811,
  },
  {
    hanzi: "恍",
    count: 0,
    level: 1812,
  },
  {
    hanzi: "晃",
    count: 3,
    level: 1813,
  },
  {
    hanzi: "辉",
    count: 0,
    level: 1814,
  },
  {
    hanzi: "晕",
    count: 8,
    level: 1815,
  },
  {
    hanzi: "昌",
    count: 1,
    level: 1816,
  },
  {
    hanzi: "昏",
    count: 2,
    level: 1817,
  },
  {
    hanzi: "晒",
    count: 7,
    level: 1818,
  },
  {
    hanzi: "旺",
    count: 2,
    level: 1819,
  },
  {
    hanzi: "宴",
    count: 4,
    level: 1820,
  },
  {
    hanzi: "牢",
    count: 3,
    level: 1821,
  },
  {
    hanzi: "踏",
    count: 4,
    level: 1822,
  },
  {
    hanzi: "践",
    count: 5,
    level: 1823,
  },
  {
    hanzi: "堆",
    count: 6,
    level: 1824,
  },
  {
    hanzi: "墨",
    count: 4,
    level: 1825,
  },
  {
    hanzi: "埋",
    count: 2,
    level: 1826,
  },
  {
    hanzi: "墓",
    count: 1,
    level: 1827,
  },
  {
    hanzi: "戒",
    count: 5,
    level: 1828,
  },
  {
    hanzi: "械",
    count: 1,
    level: 1829,
  },
  {
    hanzi: "渠",
    count: 2,
    level: 1830,
  },
  {
    hanzi: "柱",
    count: 3,
    level: 1831,
  },
  {
    hanzi: "栏",
    count: 2,
    level: 1832,
  },
  {
    hanzi: "烂",
    count: 7,
    level: 1833,
  },
  {
    hanzi: "炒",
    count: 5,
    level: 1834,
  },
  {
    hanzi: "炉",
    count: 5,
    level: 1835,
  },
  {
    hanzi: "烤",
    count: 6,
    level: 1836,
  },
  {
    hanzi: "阔",
    count: 8,
    level: 1837,
  },
  {
    hanzi: "辞",
    count: 4,
    level: 1838,
  },
  {
    hanzi: "宰",
    count: 2,
    level: 1839,
  },
  {
    hanzi: "辜",
    count: 2,
    level: 1840,
  },
  {
    hanzi: "辨",
    count: 5,
    level: 1841,
  },
  {
    hanzi: "辩",
    count: 2,
    level: 1842,
  },
  {
    hanzi: "辫",
    count: 0,
    level: 1843,
  },
  {
    hanzi: "纲",
    count: 2,
    level: 1844,
  },
  {
    hanzi: "绪",
    count: 5,
    level: 1845,
  },
  {
    hanzi: "赌",
    count: 3,
    level: 1846,
  },
  {
    hanzi: "赠",
    count: 3,
    level: 1847,
  },
  {
    hanzi: "皆",
    count: 1,
    level: 1848,
  },
  {
    hanzi: "谐",
    count: 2,
    level: 1849,
  },
  {
    hanzi: "楷",
    count: 0,
    level: 1850,
  },
  {
    hanzi: "矛",
    count: 4,
    level: 1851,
  },
  {
    hanzi: "盾",
    count: 4,
    level: 1852,
  },
  {
    hanzi: "循",
    count: 1,
    level: 1853,
  },
  {
    hanzi: "眠",
    count: 2,
    level: 1854,
  },
  {
    hanzi: "氓",
    count: 3,
    level: 1855,
  },
  {
    hanzi: "盲",
    count: 1,
    level: 1856,
  },
  {
    hanzi: "丧",
    count: 1,
    level: 1857,
  },
  {
    hanzi: "酋",
    count: 1,
    level: 1858,
  },
  {
    hanzi: "奠",
    count: 2,
    level: 1859,
  },
  {
    hanzi: "蹲",
    count: 1,
    level: 1860,
  },
  {
    hanzi: "遵",
    count: 2,
    level: 1861,
  },
  {
    hanzi: "递",
    count: 5,
    level: 1862,
  },
  {
    hanzi: "仓",
    count: 0,
    level: 1863,
  },
  {
    hanzi: "苍",
    count: 1,
    level: 1864,
  },
  {
    hanzi: "沧",
    count: 1,
    level: 1865,
  },
  {
    hanzi: "舱",
    count: 1,
    level: 1866,
  },
  {
    hanzi: "舰",
    count: 4,
    level: 1867,
  },
  {
    hanzi: "欺",
    count: 2,
    level: 1868,
  },
  {
    hanzi: "咨",
    count: 3,
    level: 1869,
  },
  {
    hanzi: "呛",
    count: 2,
    level: 1870,
  },
  {
    hanzi: "咬",
    count: 1,
    level: 1871,
  },
  {
    hanzi: "哲",
    count: 1,
    level: 1872,
  },
  {
    hanzi: "吊",
    count: 1,
    level: 1873,
  },
  {
    hanzi: "吞",
    count: 1,
    level: 1874,
  },
  {
    hanzi: "忝",
    count: 0,
    level: 1875,
  },
  {
    hanzi: "舔",
    count: 1,
    level: 1876,
  },
  {
    hanzi: "添",
    count: 2,
    level: 1877,
  },
  {
    hanzi: "爽",
    count: 5,
    level: 1878,
  },
  {
    hanzi: "奈",
    count: 1,
    level: 1879,
  },
  {
    hanzi: "崇",
    count: 1,
    level: 1880,
  },
  {
    hanzi: "卧",
    count: 4,
    level: 1881,
  },
  {
    hanzi: "扑",
    count: 7,
    level: 1882,
  },
  {
    hanzi: "撑",
    count: 6,
    level: 1883,
  },
  {
    hanzi: "拨",
    count: 5,
    level: 1884,
  },
  {
    hanzi: "挤",
    count: 4,
    level: 1885,
  },
  {
    hanzi: "挡",
    count: 4,
    level: 1886,
  },
  {
    hanzi: "扭",
    count: 3,
    level: 1887,
  },
  {
    hanzi: "描",
    count: 3,
    level: 1888,
  },
  {
    hanzi: "挖",
    count: 2,
    level: 1889,
  },
  {
    hanzi: "押",
    count: 1,
    level: 1890,
  },
  {
    hanzi: "披",
    count: 4,
    level: 1891,
  },
  {
    hanzi: "彼",
    count: 1,
    level: 1892,
  },
  {
    hanzi: "玻",
    count: 1,
    level: 1893,
  },
  {
    hanzi: "璃",
    count: 1,
    level: 1894,
  },
  {
    hanzi: "禽",
    count: 1,
    level: 1895,
  },
  {
    hanzi: "恰",
    count: 2,
    level: 1896,
  },
  {
    hanzi: "悄",
    count: 3,
    level: 1897,
  },
  {
    hanzi: "悟",
    count: 1,
    level: 1898,
  },
  {
    hanzi: "籍",
    count: 2,
    level: 1899,
  },
  {
    hanzi: "藉",
    count: 2,
    level: 1900,
  },
  {
    hanzi: "荒",
    count: 6,
    level: 1901,
  },
  {
    hanzi: "慌",
    count: 2,
    level: 1902,
  },
  {
    hanzi: "谎",
    count: 4,
    level: 1903,
  },
  {
    hanzi: "薪",
    count: 2,
    level: 1904,
  },
  {
    hanzi: "疏",
    count: 5,
    level: 1905,
  },
  {
    hanzi: "蔬",
    count: 3,
    level: 1906,
  },
  {
    hanzi: "薯",
    count: 4,
    level: 1907,
  },
  {
    hanzi: "逻",
    count: 0,
    level: 1908,
  },
  {
    hanzi: "酱",
    count: 3,
    level: 1909,
  },
  {
    hanzi: "昔",
    count: 1,
    level: 1910,
  },
  {
    hanzi: "醋",
    count: 2,
    level: 1911,
  },
  {
    hanzi: "腊",
    count: 2,
    level: 1912,
  },
  {
    hanzi: "猎",
    count: 6,
    level: 1913,
  },
  {
    hanzi: "蜡",
    count: 6,
    level: 1914,
  },
  {
    hanzi: "烛",
    count: 6,
    level: 1915,
  },
  {
    hanzi: "蛇",
    count: 2,
    level: 1916,
  },
  {
    hanzi: "猴",
    count: 3,
    level: 1917,
  },
  {
    hanzi: "犹",
    count: 5,
    level: 1918,
  },
  {
    hanzi: "剪",
    count: 3,
    level: 1919,
  },
  {
    hanzi: "箭",
    count: 4,
    level: 1920,
  },
  {
    hanzi: "竹",
    count: 6,
    level: 1921,
  },
  {
    hanzi: "煎",
    count: 3,
    level: 1922,
  },
  {
    hanzi: "煮",
    count: 4,
    level: 1923,
  },
  {
    hanzi: "瞧",
    count: 1,
    level: 1924,
  },
  {
    hanzi: "盼",
    count: 1,
    level: 1925,
  },
  {
    hanzi: "瞅",
    count: 1,
    level: 1926,
  },
  {
    hanzi: "揪",
    count: 1,
    level: 1927,
  },
  {
    hanzi: "愁",
    count: 2,
    level: 1928,
  },
  {
    hanzi: "慧",
    count: 2,
    level: 1929,
  },
  {
    hanzi: "肃",
    count: 0,
    level: 1930,
  },
  {
    hanzi: "寿",
    count: 2,
    level: 1931,
  },
  {
    hanzi: "艳",
    count: 0,
    level: 1932,
  },
  {
    hanzi: "钻",
    count: 6,
    level: 1933,
  },
  {
    hanzi: "铃",
    count: 1,
    level: 1934,
  },
  {
    hanzi: "琴",
    count: 6,
    level: 1935,
  },
  {
    hanzi: "顽",
    count: 2,
    level: 1936,
  },
  {
    hanzi: "颗",
    count: 11,
    level: 1937,
  },
  {
    hanzi: "裹",
    count: 6,
    level: 1938,
  },
  {
    hanzi: "倡",
    count: 1,
    level: 1939,
  },
  {
    hanzi: "仰",
    count: 4,
    level: 1940,
  },
  {
    hanzi: "匹",
    count: 7,
    level: 1941,
  },
  {
    hanzi: "劝",
    count: 2,
    level: 1942,
  },
  {
    hanzi: "叉",
    count: 6,
    level: 1943,
  },
  {
    hanzi: "兔",
    count: 3,
    level: 1944,
  },
  {
    hanzi: "斜",
    count: 1,
    level: 1945,
  },
  {
    hanzi: "枝",
    count: 1,
    level: 1946,
  },
  {
    hanzi: "柴",
    count: 2,
    level: 1947,
  },
  {
    hanzi: "梨",
    count: 1,
    level: 1948,
  },
  {
    hanzi: "躲",
    count: 1,
    level: 1949,
  },
  {
    hanzi: "豫",
    count: 3,
    level: 1950,
  },
  {
    hanzi: "漠",
    count: 5,
    level: 1951,
  },
  {
    hanzi: "洒",
    count: 1,
    level: 1952,
  },
  {
    hanzi: "牺",
    count: 1,
    level: 1953,
  },
  {
    hanzi: "牲",
    count: 1,
    level: 1954,
  },
  {
    hanzi: "厘",
    count: 0,
    level: 1955,
  },
  {
    hanzi: "厄",
    count: 1,
    level: 1956,
  },
  {
    hanzi: "脆",
    count: 6,
    level: 1957,
  },
  {
    hanzi: "跪",
    count: 0,
    level: 1958,
  },
  {
    hanzi: "踩",
    count: 1,
    level: 1959,
  },
  {
    hanzi: "扼",
    count: 0,
    level: 1960,
  },
  {
    hanzi: "挣",
    count: 5,
    level: 1961,
  },
  {
    hanzi: "抄",
    count: 5,
    level: 1962,
  },
  {
    hanzi: "捉",
    count: 3,
    level: 1963,
  },
  {
    hanzi: "摔",
    count: 10,
    level: 1964,
  },
  {
    hanzi: "拐",
    count: 6,
    level: 1965,
  },
  {
    hanzi: "掏",
    count: 1,
    level: 1966,
  },
  {
    hanzi: "捡",
    count: 3,
    level: 1967,
  },
  {
    hanzi: "矣",
    count: 0,
    level: 1968,
  },
  {
    hanzi: "挨",
    count: 2,
    level: 1969,
  },
  {
    hanzi: "唉",
    count: 0,
    level: 1970,
  },
  {
    hanzi: "诶",
    count: 3,
    level: 1971,
  },
  {
    hanzi: "埃",
    count: 0,
    level: 1972,
  },
  {
    hanzi: "垄",
    count: 0,
    level: 1973,
  },
  {
    hanzi: "宠",
    count: 2,
    level: 1974,
  },
  {
    hanzi: "袭",
    count: 2,
    level: 1975,
  },
  {
    hanzi: "拢",
    count: 1,
    level: 1976,
  },
  {
    hanzi: "聋",
    count: 2,
    level: 1977,
  },
  {
    hanzi: "庞",
    count: 1,
    level: 1978,
  },
  {
    hanzi: "笼",
    count: 2,
    level: 1979,
  },
  {
    hanzi: "绒",
    count: 1,
    level: 1980,
  },
  {
    hanzi: "绘",
    count: 0,
    level: 1981,
  },
  {
    hanzi: "姨",
    count: 10,
    level: 1982,
  },
  {
    hanzi: "粥",
    count: 2,
    level: 1983,
  },
  {
    hanzi: "弯",
    count: 6,
    level: 1984,
  },
  {
    hanzi: "闷",
    count: 6,
    level: 1985,
  },
  {
    hanzi: "阁",
    count: 1,
    level: 1986,
  },
  {
    hanzi: "闯",
    count: 5,
    level: 1987,
  },
  {
    hanzi: "腾",
    count: 3,
    level: 1988,
  },
  {
    hanzi: "壶",
    count: 3,
    level: 1989,
  },
  {
    hanzi: "壳",
    count: 5,
    level: 1990,
  },
  {
    hanzi: "馒",
    count: 1,
    level: 1991,
  },
  {
    hanzi: "饲",
    count: 2,
    level: 1992,
  },
  {
    hanzi: "幻",
    count: 0,
    level: 1993,
  },
  {
    hanzi: "畜",
    count: 2,
    level: 1994,
  },
  {
    hanzi: "搐",
    count: 1,
    level: 1995,
  },
  {
    hanzi: "蓄",
    count: 2,
    level: 1996,
  },
  {
    hanzi: "誉",
    count: 2,
    level: 1997,
  },
  {
    hanzi: "譬",
    count: 1,
    level: 1998,
  },
  {
    hanzi: "袖",
    count: 4,
    level: 1999,
  },
  {
    hanzi: "裸",
    count: 2,
    level: 2000,
  },
  {
    hanzi: "萨",
    count: 4,
    level: 2001,
  },
  {
    hanzi: "铲",
    count: 1,
    level: 2002,
  },
  {
    hanzi: "锦",
    count: 0,
    level: 2003,
  },
  {
    hanzi: "链",
    count: 4,
    level: 2004,
  },
  {
    hanzi: "轰",
    count: 6,
    level: 2005,
  },
  {
    hanzi: "桑",
    count: 2,
    level: 2006,
  },
  {
    hanzi: "嗓",
    count: 1,
    level: 2007,
  },
  {
    hanzi: "叠",
    count: 7,
    level: 2008,
  },
  {
    hanzi: "缀",
    count: 1,
    level: 2009,
  },
  {
    hanzi: "纤",
    count: 2,
    level: 2010,
  },
  {
    hanzi: "纽",
    count: 3,
    level: 2011,
  },
  {
    hanzi: "纹",
    count: 2,
    level: 2012,
  },
  {
    hanzi: "缴",
    count: 4,
    level: 2013,
  },
  {
    hanzi: "迹",
    count: 10,
    level: 2014,
  },
  {
    hanzi: "迪",
    count: 2,
    level: 2015,
  },
  {
    hanzi: "巡",
    count: 2,
    level: 2016,
  },
  {
    hanzi: "辽",
    count: 2,
    level: 2017,
  },
  {
    hanzi: "遥",
    count: 1,
    level: 2018,
  },
  {
    hanzi: "淘",
    count: 5,
    level: 2019,
  },
  {
    hanzi: "汰",
    count: 1,
    level: 2020,
  },
  {
    hanzi: "津",
    count: 2,
    level: 2021,
  },
  {
    hanzi: "荡",
    count: 6,
    level: 2022,
  },
  {
    hanzi: "漾",
    count: 0,
    level: 2023,
  },
  {
    hanzi: "泽",
    count: 3,
    level: 2024,
  },
  {
    hanzi: "沼",
    count: 1,
    level: 2025,
  },
  {
    hanzi: "涂",
    count: 3,
    level: 2026,
  },
  {
    hanzi: "淋",
    count: 2,
    level: 2027,
  },
  {
    hanzi: "涌",
    count: 2,
    level: 2028,
  },
  {
    hanzi: "汹",
    count: 0,
    level: 2029,
  },
  {
    hanzi: "兹",
    count: 1,
    level: 2030,
  },
  {
    hanzi: "滋",
    count: 1,
    level: 2031,
  },
  {
    hanzi: "磁",
    count: 1,
    level: 2032,
  },
  {
    hanzi: "慈",
    count: 1,
    level: 2033,
  },
  {
    hanzi: "岩",
    count: 1,
    level: 2034,
  },
  {
    hanzi: "癌",
    count: 6,
    level: 2035,
  },
  {
    hanzi: "董",
    count: 3,
    level: 2036,
  },
  {
    hanzi: "荷",
    count: 1,
    level: 2037,
  },
  {
    hanzi: "艾",
    count: 1,
    level: 2038,
  },
  {
    hanzi: "哎",
    count: 1,
    level: 2039,
  },
  {
    hanzi: "萌",
    count: 4,
    level: 2040,
  },
  {
    hanzi: "芽",
    count: 2,
    level: 2041,
  },
  {
    hanzi: "萧",
    count: 3,
    level: 2042,
  },
  {
    hanzi: "潇",
    count: 0,
    level: 2043,
  },
  {
    hanzi: "鲁",
    count: 2,
    level: 2044,
  },
  {
    hanzi: "莽",
    count: 1,
    level: 2045,
  },
  {
    hanzi: "晶",
    count: 6,
    level: 2046,
  },
  {
    hanzi: "莹",
    count: 0,
    level: 2047,
  },
  {
    hanzi: "隆",
    count: 5,
    level: 2048,
  },
  {
    hanzi: "郑",
    count: 1,
    level: 2049,
  },
  {
    hanzi: "郁",
    count: 5,
    level: 2050,
  },
  {
    hanzi: "疫",
    count: 8,
    level: 2051,
  },
  {
    hanzi: "瘟",
    count: 1,
    level: 2052,
  },
  {
    hanzi: "苗",
    count: 3,
    level: 2053,
  },
  {
    hanzi: "瘤",
    count: 1,
    level: 2054,
  },
  {
    hanzi: "溜",
    count: 4,
    level: 2055,
  },
  {
    hanzi: "遛",
    count: 1,
    level: 2056,
  },
  {
    hanzi: "涛",
    count: 1,
    level: 2057,
  },
  {
    hanzi: "铸",
    count: 1,
    level: 2058,
  },
  {
    hanzi: "畴",
    count: 1,
    level: 2059,
  },
  {
    hanzi: "祷",
    count: 0,
    level: 2060,
  },
  {
    hanzi: "祈",
    count: 0,
    level: 2061,
  },
  {
    hanzi: "筹",
    count: 12,
    level: 2062,
  },
  {
    hanzi: "筛",
    count: 1,
    level: 2063,
  },
  {
    hanzi: "狮",
    count: 2,
    level: 2064,
  },
  {
    hanzi: "屈",
    count: 1,
    level: 2065,
  },
  {
    hanzi: "眉",
    count: 3,
    level: 2066,
  },
  {
    hanzi: "尿",
    count: 2,
    level: 2067,
  },
  {
    hanzi: "履",
    count: 4,
    level: 2068,
  },
  {
    hanzi: "覆",
    count: 4,
    level: 2069,
  },
  {
    hanzi: "腹",
    count: 2,
    level: 2070,
  },
  {
    hanzi: "腺",
    count: 2,
    level: 2071,
  },
  {
    hanzi: "胎",
    count: 8,
    level: 2072,
  },
  {
    hanzi: "胚",
    count: 1,
    level: 2073,
  },
  {
    hanzi: "腔",
    count: 3,
    level: 2074,
  },
  {
    hanzi: "肾",
    count: 2,
    level: 2075,
  },
  {
    hanzi: "旨",
    count: 1,
    level: 2076,
  },
  {
    hanzi: "脂",
    count: 0,
    level: 2077,
  },
  {
    hanzi: "肪",
    count: 0,
    level: 2078,
  },
  {
    hanzi: "稽",
    count: 1,
    level: 2079,
  },
  {
    hanzi: "黎",
    count: 1,
    level: 2080,
  },
  {
    hanzi: "稀",
    count: 4,
    level: 2081,
  },
  {
    hanzi: "诱",
    count: 7,
    level: 2082,
  },
  {
    hanzi: "饵",
    count: 1,
    level: 2083,
  },
  {
    hanzi: "盈",
    count: 1,
    level: 2084,
  },
  {
    hanzi: "孕",
    count: 3,
    level: 2085,
  },
  {
    hanzi: "魂",
    count: 2,
    level: 2086,
  },
  {
    hanzi: "坛",
    count: 0,
    level: 2087,
  },
  {
    hanzi: "尘",
    count: 2,
    level: 2088,
  },
  {
    hanzi: "堡",
    count: 5,
    level: 2089,
  },
  {
    hanzi: "垒",
    count: 2,
    level: 2090,
  },
  {
    hanzi: "杜",
    count: 1,
    level: 2091,
  },
  {
    hanzi: "驱",
    count: 6,
    level: 2092,
  },
  {
    hanzi: "呕",
    count: 0,
    level: 2093,
  },
  {
    hanzi: "殴",
    count: 2,
    level: 2094,
  },
  {
    hanzi: "躯",
    count: 1,
    level: 2095,
  },
  {
    hanzi: "枢",
    count: 1,
    level: 2096,
  },
  {
    hanzi: "抠",
    count: 5,
    level: 2097,
  },
  {
    hanzi: "抑",
    count: 6,
    level: 2098,
  },
  {
    hanzi: "拟",
    count: 6,
    level: 2099,
  },
  {
    hanzi: "捷",
    count: 2,
    level: 2100,
  },
  {
    hanzi: "仙",
    count: 20,
    level: 2101,
  },
  {
    hanzi: "仁",
    count: 0,
    level: 2102,
  },
  {
    hanzi: "俄",
    count: 2,
    level: 2103,
  },
  {
    hanzi: "伯",
    count: 0,
    level: 2104,
  },
  {
    hanzi: "伏",
    count: 1,
    level: 2105,
  },
  {
    hanzi: "佩",
    count: 0,
    level: 2106,
  },
  {
    hanzi: "伐",
    count: 0,
    level: 2107,
  },
  {
    hanzi: "侦",
    count: 0,
    level: 2108,
  },
  {
    hanzi: "赴",
    count: 0,
    level: 2109,
  },
  {
    hanzi: "贪",
    count: 2,
    level: 2110,
  },
  {
    hanzi: "俊",
    count: 0,
    level: 2111,
  },
  {
    hanzi: "峻",
    count: 0,
    level: 2112,
  },
  {
    hanzi: "骏",
    count: 0,
    level: 2113,
  },
  {
    hanzi: "竣",
    count: 0,
    level: 2114,
  },
  {
    hanzi: "毅",
    count: 0,
    level: 2115,
  },
  {
    hanzi: "粒",
    count: 0,
    level: 2116,
  },
  {
    hanzi: "粘",
    count: 0,
    level: 2117,
  },
  {
    hanzi: "役",
    count: 0,
    level: 2118,
  },
  {
    hanzi: "徐",
    count: 0,
    level: 2119,
  },
  {
    hanzi: "瑞",
    count: 0,
    level: 2120,
  },
  {
    hanzi: "斑",
    count: 0,
    level: 2121,
  },
  {
    hanzi: "呈",
    count: 0,
    level: 2122,
  },
  {
    hanzi: "呵",
    count: 0,
    level: 2123,
  },
  {
    hanzi: "嘿",
    count: 0,
    level: 2124,
  },
  {
    hanzi: "衰",
    count: 0,
    level: 2125,
  },
  {
    hanzi: "囊",
    count: 0,
    level: 2126,
  },
  {
    hanzi: "堪",
    count: 0,
    level: 2127,
  },
  {
    hanzi: "夌",
    count: 0,
    level: 2128,
  },
  {
    hanzi: "凌",
    count: 0,
    level: 2129,
  },
  {
    hanzi: "陵",
    count: 0,
    level: 2130,
  },
  {
    hanzi: "棱",
    count: 0,
    level: 2131,
  },
  {
    hanzi: "柔",
    count: 1,
    level: 2132,
  },
  {
    hanzi: "棋",
    count: 2,
    level: 2133,
  },
  {
    hanzi: "棍",
    count: 1,
    level: 2134,
  },
  {
    hanzi: "浆",
    count: 1,
    level: 2135,
  },
  {
    hanzi: "舛",
    count: 0,
    level: 2136,
  },
  {
    hanzi: "鳞",
    count: 0,
    level: 2137,
  },
  {
    hanzi: "磷",
    count: 0,
    level: 2138,
  },
  {
    hanzi: "舜",
    count: 0,
    level: 2139,
  },
  {
    hanzi: "瞬",
    count: 0,
    level: 2140,
  },
  {
    hanzi: "赤",
    count: 0,
    level: 2141,
  },
  {
    hanzi: "赫",
    count: 0,
    level: 2142,
  },
  {
    hanzi: "岂",
    count: 0,
    level: 2143,
  },
  {
    hanzi: "凯",
    count: 0,
    level: 2144,
  },
  {
    hanzi: "凤",
    count: 0,
    level: 2145,
  },
  {
    hanzi: "凰",
    count: 0,
    level: 2146,
  },
  {
    hanzi: "讽",
    count: 0,
    level: 2147,
  },
  {
    hanzi: "飙",
    count: 0,
    level: 2148,
  },
  {
    hanzi: "飓",
    count: 0,
    level: 2149,
  },
  {
    hanzi: "飘",
    count: 2,
    level: 2150,
  },
  {
    hanzi: "凝",
    count: 0,
    level: 2151,
  },
  {
    hanzi: "姿",
    count: 1,
    level: 2152,
  },
  {
    hanzi: "钦",
    count: 0,
    level: 2153,
  },
  {
    hanzi: "锐",
    count: 0,
    level: 2154,
  },
  {
    hanzi: "姆",
    count: 0,
    level: 2155,
  },
  {
    hanzi: "妆",
    count: 2,
    level: 2156,
  },
  {
    hanzi: "嫩",
    count: 0,
    level: 2157,
  },
  {
    hanzi: "牧",
    count: 1,
    level: 2158,
  },
  {
    hanzi: "迈",
    count: 0,
    level: 2159,
  },
  {
    hanzi: "逢",
    count: 0,
    level: 2160,
  },
  {
    hanzi: "缝",
    count: 0,
    level: 2161,
  },
  {
    hanzi: "蓬",
    count: 0,
    level: 2162,
  },
  {
    hanzi: "缤",
    count: 0,
    level: 2163,
  },
  {
    hanzi: "滨",
    count: 0,
    level: 2164,
  },
  {
    hanzi: "泄",
    count: 0,
    level: 2165,
  },
  {
    hanzi: "屉",
    count: 0,
    level: 2166,
  },
  {
    hanzi: "浴",
    count: 0,
    level: 2167,
  },
  {
    hanzi: "溶",
    count: 0,
    level: 2168,
  },
  {
    hanzi: "浩",
    count: 0,
    level: 2169,
  },
  {
    hanzi: "糙",
    count: 0,
    level: 2170,
  },
  {
    hanzi: "雅",
    count: 2,
    level: 2171,
  },
  {
    hanzi: "雚",
    count: 0,
    level: 2172,
  },
  {
    hanzi: "灌",
    count: 0,
    level: 2173,
  },
  {
    hanzi: "罐",
    count: 0,
    level: 2174,
  },
  {
    hanzi: "拓",
    count: 0,
    level: 2175,
  },
  {
    hanzi: "抚",
    count: 0,
    level: 2176,
  },
  {
    hanzi: "撒",
    count: 0,
    level: 2177,
  },
  {
    hanzi: "携",
    count: 0,
    level: 2178,
  },
  {
    hanzi: "摊",
    count: 1,
    level: 2179,
  },
  {
    hanzi: "抛",
    count: 1,
    level: 2180,
  },
  {
    hanzi: "劫",
    count: 0,
    level: 2181,
  },
  {
    hanzi: "劣",
    count: 1,
    level: 2182,
  },
  {
    hanzi: "勒",
    count: 0,
    level: 2183,
  },
  {
    hanzi: "霸",
    count: 0,
    level: 2184,
  },
  {
    hanzi: "孛",
    count: 0,
    level: 2185,
  },
  {
    hanzi: "勃",
    count: 0,
    level: 2186,
  },
  {
    hanzi: "脖",
    count: 0,
    level: 2187,
  },
  {
    hanzi: "鹏",
    count: 0,
    level: 2188,
  },
  {
    hanzi: "鸣",
    count: 0,
    level: 2189,
  },
  {
    hanzi: "割",
    count: 1,
    level: 2190,
  },
  {
    hanzi: "辖",
    count: 0,
    level: 2191,
  },
  {
    hanzi: "豁",
    count: 0,
    level: 2192,
  },
  {
    hanzi: "瞎",
    count: 0,
    level: 2193,
  },
  {
    hanzi: "愈",
    count: 1,
    level: 2194,
  },
  {
    hanzi: "悠",
    count: 2,
    level: 2195,
  },
  {
    hanzi: "惑",
    count: 0,
    level: 2196,
  },
  {
    hanzi: "翔",
    count: 0,
    level: 2197,
  },
  {
    hanzi: "翼",
    count: 0,
    level: 2198,
  },
  {
    hanzi: "恭",
    count: 2,
    level: 2199,
  },
  {
    hanzi: "谱",
    count: 0,
    level: 2200,
  },
  {
    hanzi: "疆",
    count: 0,
    level: 2201,
  },
  {
    hanzi: "僵",
    count: 0,
    level: 2202,
  },
  {
    hanzi: "仇",
    count: 0,
    level: 2203,
  },
  {
    hanzi: "催",
    count: 0,
    level: 2204,
  },
  {
    hanzi: "霍",
    count: 0,
    level: 2205,
  },
  {
    hanzi: "霉",
    count: 0,
    level: 2206,
  },
  {
    hanzi: "雾",
    count: 1,
    level: 2207,
  },
  {
    hanzi: "勋",
    count: 0,
    level: 2208,
  },
  {
    hanzi: "筋",
    count: 0,
    level: 2209,
  },
  {
    hanzi: "胀",
    count: 0,
    level: 2210,
  },
  {
    hanzi: "臂",
    count: 0,
    level: 2211,
  },
  {
    hanzi: "慎",
    count: 0,
    level: 2212,
  },
  {
    hanzi: "悦",
    count: 0,
    level: 2213,
  },
  {
    hanzi: "恒",
    count: 0,
    level: 2214,
  },
  {
    hanzi: "昆",
    count: 0,
    level: 2215,
  },
  {
    hanzi: "晋",
    count: 0,
    level: 2216,
  },
  {
    hanzi: "昂",
    count: 0,
    level: 2217,
  },
  {
    hanzi: "旬",
    count: 0,
    level: 2218,
  },
  {
    hanzi: "陶",
    count: 0,
    level: 2219,
  },
  {
    hanzi: "邪",
    count: 0,
    level: 2220,
  },
  {
    hanzi: "贩",
    count: 0,
    level: 2221,
  },
  {
    hanzi: "贤",
    count: 0,
    level: 2222,
  },
  {
    hanzi: "贼",
    count: 0,
    level: 2223,
  },
  {
    hanzi: "婴",
    count: 0,
    level: 2224,
  },
  {
    hanzi: "嫁",
    count: 0,
    level: 2225,
  },
  {
    hanzi: "妥",
    count: 0,
    level: 2226,
  },
  {
    hanzi: "娇",
    count: 0,
    level: 2227,
  },
  {
    hanzi: "妖",
    count: 0,
    level: 2228,
  },
  {
    hanzi: "沃",
    count: 1,
    level: 2229,
  },
  {
    hanzi: "渔",
    count: 0,
    level: 2230,
  },
  {
    hanzi: "滞",
    count: 0,
    level: 2231,
  },
  {
    hanzi: "浸",
    count: 2,
    level: 2232,
  },
  {
    hanzi: "浑",
    count: 0,
    level: 2233,
  },
  {
    hanzi: "丞",
    count: 0,
    level: 2234,
  },
  {
    hanzi: "蒸",
    count: 1,
    level: 2235,
  },
  {
    hanzi: "函",
    count: 0,
    level: 2236,
  },
  {
    hanzi: "涵",
    count: 1,
    level: 2237,
  },
  {
    hanzi: "茫",
    count: 0,
    level: 2238,
  },
  {
    hanzi: "莲",
    count: 0,
    level: 2239,
  },
  {
    hanzi: "蒂",
    count: 0,
    level: 2240,
  },
  {
    hanzi: "缔",
    count: 0,
    level: 2241,
  },
  {
    hanzi: "芬",
    count: 0,
    level: 2242,
  },
  {
    hanzi: "芳",
    count: 0,
    level: 2243,
  },
  {
    hanzi: "纺",
    count: 0,
    level: 2244,
  },
  {
    hanzi: "绵",
    count: 0,
    level: 2245,
  },
  {
    hanzi: "攀",
    count: 0,
    level: 2246,
  },
  {
    hanzi: "拳",
    count: 2,
    level: 2247,
  },
  {
    hanzi: "泰",
    count: 0,
    level: 2248,
  },
  {
    hanzi: "寨",
    count: 1,
    level: 2249,
  },
  {
    hanzi: "鼎",
    count: 0,
    level: 2250,
  },
  {
    hanzi: "痕",
    count: 1,
    level: 2251,
  },
  {
    hanzi: "痴",
    count: 0,
    level: 2252,
  },
  {
    hanzi: "疲",
    count: 1,
    level: 2253,
  },
  {
    hanzi: "颇",
    count: 0,
    level: 2254,
  },
  {
    hanzi: "颁",
    count: 0,
    level: 2255,
  },
  {
    hanzi: "颈",
    count: 0,
    level: 2256,
  },
  {
    hanzi: "兽",
    count: 1,
    level: 2257,
  },
  {
    hanzi: "唤",
    count: 1,
    level: 2258,
  },
  {
    hanzi: "呜",
    count: 0,
    level: 2259,
  },
  {
    hanzi: "哀",
    count: 0,
    level: 2260,
  },
  {
    hanzi: "衷",
    count: 0,
    level: 2261,
  },
  {
    hanzi: "吻",
    count: 1,
    level: 2262,
  },
  {
    hanzi: "匆",
    count: 0,
    level: 2263,
  },
  {
    hanzi: "逸",
    count: 1,
    level: 2264,
  },
  {
    hanzi: "斥",
    count: 0,
    level: 2265,
  },
  {
    hanzi: "卵",
    count: 0,
    level: 2266,
  },
  {
    hanzi: "卸",
    count: 0,
    level: 2267,
  },
  {
    hanzi: "御",
    count: 0,
    level: 2268,
  },
  {
    hanzi: "徽",
    count: 0,
    level: 2269,
  },
  {
    hanzi: "螺",
    count: 0,
    level: 2270,
  },
  {
    hanzi: "亩",
    count: 0,
    level: 2271,
  },
  {
    hanzi: "虹",
    count: 2,
    level: 2272,
  },
  {
    hanzi: "蜜",
    count: 2,
    level: 2273,
  },
  {
    hanzi: "蜂",
    count: 1,
    level: 2274,
  },
  {
    hanzi: "寂",
    count: 1,
    level: 2275,
  },
  {
    hanzi: "寞",
    count: 1,
    level: 2276,
  },
  {
    hanzi: "骚",
    count: 0,
    level: 2277,
  },
  {
    hanzi: "驰",
    count: 0,
    level: 2278,
  },
  {
    hanzi: "狼",
    count: 21,
    level: 2279,
  },
  {
    hanzi: "狈",
    count: 0,
    level: 2280,
  },
  {
    hanzi: "狱",
    count: 0,
    level: 2281,
  },
  {
    hanzi: "谨",
    count: 0,
    level: 2282,
  },
  {
    hanzi: "坑",
    count: 0,
    level: 2283,
  },
  {
    hanzi: "绳",
    count: 0,
    level: 2284,
  },
  {
    hanzi: "蝇",
    count: 0,
    level: 2285,
  },
  {
    hanzi: "龟",
    count: 2,
    level: 2286,
  },
  {
    hanzi: "奄",
    count: 0,
    level: 2287,
  },
  {
    hanzi: "淹",
    count: 0,
    level: 2288,
  },
  {
    hanzi: "俺",
    count: 0,
    level: 2289,
  },
  {
    hanzi: "掩",
    count: 0,
    level: 2290,
  },
  {
    hanzi: "拘",
    count: 0,
    level: 2291,
  },
  {
    hanzi: "拦",
    count: 2,
    level: 2292,
  },
  {
    hanzi: "抹",
    count: 0,
    level: 2293,
  },
  {
    hanzi: "朱",
    count: 0,
    level: 2294,
  },
  {
    hanzi: "株",
    count: 0,
    level: 2295,
  },
  {
    hanzi: "框",
    count: 0,
    level: 2296,
  },
  {
    hanzi: "朴",
    count: 0,
    level: 2297,
  },
  {
    hanzi: "卓",
    count: 0,
    level: 2298,
  },
  {
    hanzi: "炭",
    count: 0,
    level: 2299,
  },
  {
    hanzi: "碳",
    count: 0,
    level: 2300,
  },
  {
    hanzi: "桂",
    count: 0,
    level: 2301,
  },
  {
    hanzi: "槽",
    count: 0,
    level: 2302,
  },
  {
    hanzi: "枚",
    count: 0,
    level: 2303,
  },
  {
    hanzi: "柳",
    count: 0,
    level: 2304,
  },
  {
    hanzi: "晰",
    count: 0,
    level: 2305,
  },
  {
    hanzi: "柏",
    count: 0,
    level: 2306,
  },
  {
    hanzi: "泊",
    count: 0,
    level: 2307,
  },
  {
    hanzi: "崩",
    count: 0,
    level: 2308,
  },
  {
    hanzi: "溃",
    count: 0,
    level: 2309,
  },
  {
    hanzi: "溪",
    count: 0,
    level: 2310,
  },
  {
    hanzi: "滩",
    count: 1,
    level: 2311,
  },
  {
    hanzi: "雇",
    count: 0,
    level: 2312,
  },
  {
    hanzi: "溢",
    count: 0,
    level: 2313,
  },
  {
    hanzi: "隘",
    count: 0,
    level: 2314,
  },
  {
    hanzi: "淀",
    count: 1,
    level: 2315,
  },
  {
    hanzi: "宪",
    count: 1,
    level: 2316,
  },
  {
    hanzi: "踪",
    count: 0,
    level: 2317,
  },
  {
    hanzi: "辟",
    count: 0,
    level: 2318,
  },
  {
    hanzi: "殿",
    count: 0,
    level: 2319,
  },
  {
    hanzi: "屡",
    count: 0,
    level: 2320,
  },
  {
    hanzi: "掘",
    count: 0,
    level: 2321,
  },
  {
    hanzi: "搏",
    count: 0,
    level: 2322,
  },
  {
    hanzi: "抖",
    count: 1,
    level: 2323,
  },
  {
    hanzi: "扯",
    count: 0,
    level: 2324,
  },
  {
    hanzi: "耻",
    count: 0,
    level: 2325,
  },
  {
    hanzi: "歧",
    count: 0,
    level: 2326,
  },
  {
    hanzi: "肢",
    count: 1,
    level: 2327,
  },
  {
    hanzi: "肖",
    count: 0,
    level: 2328,
  },
  {
    hanzi: "削",
    count: 0,
    level: 2329,
  },
  {
    hanzi: "俏",
    count: 0,
    level: 2330,
  },
  {
    hanzi: "屑",
    count: 0,
    level: 2331,
  },
  {
    hanzi: "梢",
    count: 0,
    level: 2332,
  },
  {
    hanzi: "捎",
    count: 0,
    level: 2333,
  },
  {
    hanzi: "宵",
    count: 0,
    level: 2334,
  },
  {
    hanzi: "哨",
    count: 0,
    level: 2335,
  },
  {
    hanzi: "哼",
    count: 0,
    level: 2336,
  },
  {
    hanzi: "燕",
    count: 1,
    level: 2337,
  },
  {
    hanzi: "咽",
    count: 0,
    level: 2338,
  },
  {
    hanzi: "姻",
    count: 2,
    level: 2339,
  },
  {
    hanzi: "姜",
    count: 0,
    level: 2340,
  },
  {
    hanzi: "奸",
    count: 0,
    level: 2341,
  },
  {
    hanzi: "旱",
    count: 3,
    level: 2342,
  },
  {
    hanzi: "塌",
    count: 1,
    level: 2343,
  },
  {
    hanzi: "垫",
    count: 0,
    level: 2344,
  },
  {
    hanzi: "颖",
    count: 0,
    level: 2345,
  },
  {
    hanzi: "穆",
    count: 0,
    level: 2346,
  },
  {
    hanzi: "逊",
    count: 0,
    level: 2347,
  },
  {
    hanzi: "逝",
    count: 0,
    level: 2348,
  },
  {
    hanzi: "誓",
    count: 0,
    level: 2349,
  },
  {
    hanzi: "掀",
    count: 1,
    level: 2350,
  },
  {
    hanzi: "毙",
    count: 0,
    level: 2351,
  },
  {
    hanzi: "葬",
    count: 0,
    level: 2352,
  },
  {
    hanzi: "芝",
    count: 0,
    level: 2353,
  },
  {
    hanzi: "萝",
    count: 0,
    level: 2354,
  },
  {
    hanzi: "罩",
    count: 3,
    level: 2355,
  },
  {
    hanzi: "署",
    count: 0,
    level: 2356,
  },
  {
    hanzi: "芯",
    count: 0,
    level: 2357,
  },
  {
    hanzi: "葱",
    count: 0,
    level: 2358,
  },
  {
    hanzi: "惩",
    count: 2,
    level: 2359,
  },
  {
    hanzi: "忌",
    count: 0,
    level: 2360,
  },
  {
    hanzi: "惹",
    count: 2,
    level: 2361,
  },
  {
    hanzi: "匿",
    count: 0,
    level: 2362,
  },
  {
    hanzi: "匪",
    count: 1,
    level: 2363,
  },
  {
    hanzi: "砸",
    count: 0,
    level: 2364,
  },
  {
    hanzi: "砖",
    count: 0,
    level: 2365,
  },
  {
    hanzi: "碑",
    count: 0,
    level: 2366,
  },
  {
    hanzi: "砍",
    count: 0,
    level: 2367,
  },
  {
    hanzi: "砂",
    count: 0,
    level: 2368,
  },
  {
    hanzi: "纱",
    count: 0,
    level: 2369,
  },
  {
    hanzi: "绑",
    count: 0,
    level: 2370,
  },
  {
    hanzi: "缠",
    count: 0,
    level: 2371,
  },
  {
    hanzi: "廉",
    count: 0,
    level: 2372,
  },
  {
    hanzi: "帆",
    count: 1,
    level: 2373,
  },
  {
    hanzi: "帐",
    count: 0,
    level: 2374,
  },
  {
    hanzi: "贱",
    count: 0,
    level: 2375,
  },
  {
    hanzi: "贾",
    count: 0,
    level: 2376,
  },
  {
    hanzi: "贿",
    count: 1,
    level: 2377,
  },
  {
    hanzi: "赂",
    count: 1,
    level: 2378,
  },
  {
    hanzi: "匀",
    count: 0,
    level: 2379,
  },
  {
    hanzi: "凑",
    count: 0,
    level: 2380,
  },
  {
    hanzi: "奢",
    count: 0,
    level: 2381,
  },
  {
    hanzi: "契",
    count: 0,
    level: 2382,
  },
  {
    hanzi: "窃",
    count: 0,
    level: 2383,
  },
  {
    hanzi: "侈",
    count: 0,
    level: 2384,
  },
  {
    hanzi: "仲",
    count: 0,
    level: 2385,
  },
  {
    hanzi: "辱",
    count: 0,
    level: 2386,
  },
  {
    hanzi: "侮",
    count: 0,
    level: 2387,
  },
  {
    hanzi: "侨",
    count: 0,
    level: 2388,
  },
  {
    hanzi: "轿",
    count: 1,
    level: 2389,
  },
  {
    hanzi: "轴",
    count: 0,
    level: 2390,
  },
  {
    hanzi: "敦",
    count: 0,
    level: 2391,
  },
  {
    hanzi: "醇",
    count: 0,
    level: 2392,
  },
  {
    hanzi: "酬",
    count: 0,
    level: 2393,
  },
  {
    hanzi: "廷",
    count: 0,
    level: 2394,
  },
  {
    hanzi: "艇",
    count: 0,
    level: 2395,
  },
  {
    hanzi: "剥",
    count: 0,
    level: 2396,
  },
  {
    hanzi: "刹",
    count: 0,
    level: 2397,
  },
  {
    hanzi: "乖",
    count: 0,
    level: 2398,
  },
  {
    hanzi: "竭",
    count: 0,
    level: 2399,
  },
  {
    hanzi: "爹",
    count: 0,
    level: 2400,
  },
  {
    hanzi: "栽",
    count: 0,
    level: 2401,
  },
  {
    hanzi: "枯",
    count: 0,
    level: 2402,
  },
  {
    hanzi: "棚",
    count: 0,
    level: 2403,
  },
  {
    hanzi: "棘",
    count: 0,
    level: 2404,
  },
  {
    hanzi: "杖",
    count: 0,
    level: 2405,
  },
  {
    hanzi: "吏",
    count: 0,
    level: 2406,
  },
  {
    hanzi: "仗",
    count: 1,
    level: 2407,
  },
  {
    hanzi: "侣",
    count: 1,
    level: 2408,
  },
  {
    hanzi: "侍",
    count: 0,
    level: 2409,
  },
  {
    hanzi: "鞭",
    count: 0,
    level: 2410,
  },
  {
    hanzi: "佐",
    count: 0,
    level: 2411,
  },
  {
    hanzi: "髓",
    count: 0,
    level: 2412,
  },
  {
    hanzi: "惰",
    count: 0,
    level: 2413,
  },
  {
    hanzi: "愧",
    count: 0,
    level: 2414,
  },
  {
    hanzi: "慨",
    count: 0,
    level: 2415,
  },
  {
    hanzi: "溉",
    count: 0,
    level: 2416,
  },
  {
    hanzi: "滥",
    count: 0,
    level: 2417,
  },
  {
    hanzi: "沸",
    count: 0,
    level: 2418,
  },
  {
    hanzi: "涯",
    count: 0,
    level: 2419,
  },
  {
    hanzi: "泌",
    count: 0,
    level: 2420,
  },
  {
    hanzi: "渣",
    count: 1,
    level: 2421,
  },
  {
    hanzi: "滤",
    count: 0,
    level: 2422,
  },
  {
    hanzi: "沫",
    count: 0,
    level: 2423,
  },
  {
    hanzi: "汪",
    count: 0,
    level: 2424,
  },
  {
    hanzi: "漆",
    count: 0,
    level: 2425,
  },
  {
    hanzi: "膝",
    count: 0,
    level: 2426,
  },
  {
    hanzi: "脊",
    count: 0,
    level: 2427,
  },
  {
    hanzi: "腻",
    count: 0,
    level: 2428,
  },
  {
    hanzi: "赋",
    count: 1,
    level: 2429,
  },
  {
    hanzi: "芒",
    count: 0,
    level: 2430,
  },
  {
    hanzi: "茅",
    count: 1,
    level: 2431,
  },
  {
    hanzi: "荆",
    count: 0,
    level: 2432,
  },
  {
    hanzi: "蔽",
    count: 1,
    level: 2433,
  },
  {
    hanzi: "弊",
    count: 1,
    level: 2434,
  },
  {
    hanzi: "憋",
    count: 0,
    level: 2435,
  },
  {
    hanzi: "撇",
    count: 0,
    level: 2436,
  },
  {
    hanzi: "撕",
    count: 1,
    level: 2437,
  },
  {
    hanzi: "挫",
    count: 0,
    level: 2438,
  },
  {
    hanzi: "挽",
    count: 0,
    level: 2439,
  },
  {
    hanzi: "捧",
    count: 0,
    level: 2440,
  },
  {
    hanzi: "挪",
    count: 0,
    level: 2441,
  },
  {
    hanzi: "搅",
    count: 0,
    level: 2442,
  },
  {
    hanzi: "抨",
    count: 0,
    level: 2443,
  },
  {
    hanzi: "秤",
    count: 0,
    level: 2444,
  },
  {
    hanzi: "萍",
    count: 0,
    level: 2445,
  },
  {
    hanzi: "坪",
    count: 0,
    level: 2446,
  },
  {
    hanzi: "塘",
    count: 0,
    level: 2447,
  },
  {
    hanzi: "坠",
    count: 0,
    level: 2448,
  },
  {
    hanzi: "陌",
    count: 4,
    level: 2449,
  },
  {
    hanzi: "廊",
    count: 0,
    level: 2450,
  },
  {
    hanzi: "雀",
    count: 0,
    level: 2451,
  },
  {
    hanzi: "鸦",
    count: 1,
    level: 2452,
  },
  {
    hanzi: "鹰",
    count: 0,
    level: 2453,
  },
  {
    hanzi: "庙",
    count: 0,
    level: 2454,
  },
  {
    hanzi: "鹿",
    count: 0,
    level: 2455,
  },
  {
    hanzi: "庸",
    count: 0,
    level: 2456,
  },
  {
    hanzi: "庶",
    count: 0,
    level: 2457,
  },
  {
    hanzi: "蔗",
    count: 0,
    level: 2458,
  },
  {
    hanzi: "遮",
    count: 0,
    level: 2459,
  },
  {
    hanzi: "遣",
    count: 0,
    level: 2460,
  },
  {
    hanzi: "谴",
    count: 0,
    level: 2461,
  },
  {
    hanzi: "擅",
    count: 0,
    level: 2462,
  },
  {
    hanzi: "颤",
    count: 0,
    level: 2463,
  },
  {
    hanzi: "颠",
    count: 0,
    level: 2464,
  },
  {
    hanzi: "巅",
    count: 0,
    level: 2465,
  },
  {
    hanzi: "喘",
    count: 0,
    level: 2466,
  },
  {
    hanzi: "唇",
    count: 0,
    level: 2467,
  },
  {
    hanzi: "喉",
    count: 1,
    level: 2468,
  },
  {
    hanzi: "咙",
    count: 1,
    level: 2469,
  },
  {
    hanzi: "吼",
    count: 1,
    level: 2470,
  },
  {
    hanzi: "剖",
    count: 0,
    level: 2471,
  },
  {
    hanzi: "吁",
    count: 0,
    level: 2472,
  },
  {
    hanzi: "臊",
    count: 0,
    level: 2473,
  },
  {
    hanzi: "躁",
    count: 0,
    level: 2474,
  },
  {
    hanzi: "藻",
    count: 0,
    level: 2475,
  },
  {
    hanzi: "燥",
    count: 0,
    level: 2476,
  },
  {
    hanzi: "灿",
    count: 0,
    level: 2477,
  },
  {
    hanzi: "岭",
    count: 0,
    level: 2478,
  },
  {
    hanzi: "煌",
    count: 0,
    level: 2479,
  },
  {
    hanzi: "碧",
    count: 0,
    level: 2480,
  },
  {
    hanzi: "魄",
    count: 0,
    level: 2481,
  },
  {
    hanzi: "魅",
    count: 1,
    level: 2482,
  },
  {
    hanzi: "铝",
    count: 0,
    level: 2483,
  },
  {
    hanzi: "铭",
    count: 0,
    level: 2484,
  },
  {
    hanzi: "钉",
    count: 0,
    level: 2485,
  },
  {
    hanzi: "锡",
    count: 0,
    level: 2486,
  },
  {
    hanzi: "曝",
    count: 0,
    level: 2487,
  },
  {
    hanzi: "瓣",
    count: 0,
    level: 2488,
  },
  {
    hanzi: "弧",
    count: 0,
    level: 2489,
  },
  {
    hanzi: "弥",
    count: 0,
    level: 2490,
  },
  {
    hanzi: "霞",
    count: 0,
    level: 2491,
  },
  {
    hanzi: "霜",
    count: 1,
    level: 2492,
  },
  {
    hanzi: "厢",
    count: 0,
    level: 2493,
  },
  {
    hanzi: "媳",
    count: 0,
    level: 2494,
  },
  {
    hanzi: "媚",
    count: 0,
    level: 2495,
  },
  {
    hanzi: "屠",
    count: 0,
    level: 2496,
  },
  {
    hanzi: "诈",
    count: 0,
    level: 2497,
  },
  {
    hanzi: "谣",
    count: 0,
    level: 2498,
  },
  {
    hanzi: "肆",
    count: 0,
    level: 2499,
  },
  {
    hanzi: "髦",
    count: 0,
    level: 2500,
  },
  {
    hanzi: "碟",
    count: 0,
    level: 2501,
  },
  {
    hanzi: "碌",
    count: 0,
    level: 2502,
  },
  {
    hanzi: "磊",
    count: 0,
    level: 2503,
  },
  {
    hanzi: "蘑",
    count: 0,
    level: 2504,
  },
  {
    hanzi: "菇",
    count: 0,
    level: 2505,
  },
  {
    hanzi: "芦",
    count: 0,
    level: 2506,
  },
  {
    hanzi: "菊",
    count: 0,
    level: 2507,
  },
  {
    hanzi: "芭",
    count: 0,
    level: 2508,
  },
  {
    hanzi: "蕾",
    count: 0,
    level: 2509,
  },
  {
    hanzi: "蕴",
    count: 0,
    level: 2510,
  },
  {
    hanzi: "缆",
    count: 0,
    level: 2511,
  },
  {
    hanzi: "揽",
    count: 0,
    level: 2512,
  },
  {
    hanzi: "拌",
    count: 0,
    level: 2513,
  },
  {
    hanzi: "叛",
    count: 0,
    level: 2514,
  },
  {
    hanzi: "捏",
    count: 0,
    level: 2515,
  },
  {
    hanzi: "撰",
    count: 0,
    level: 2516,
  },
  {
    hanzi: "熙",
    count: 0,
    level: 2517,
  },
  {
    hanzi: "攘",
    count: 0,
    level: 2518,
  },
  {
    hanzi: "壤",
    count: 0,
    level: 2519,
  },
  {
    hanzi: "镶",
    count: 0,
    level: 2520,
  },
  {
    hanzi: "嚷",
    count: 0,
    level: 2521,
  },
  {
    hanzi: "曰",
    count: 0,
    level: 2522,
  },
  {
    hanzi: "啸",
    count: 0,
    level: 2523,
  },
  {
    hanzi: "呐",
    count: 0,
    level: 2524,
  },
  {
    hanzi: "嘲",
    count: 1,
    level: 2525,
  },
  {
    hanzi: "喻",
    count: 0,
    level: 2526,
  },
  {
    hanzi: "哗",
    count: 0,
    level: 2527,
  },
  {
    hanzi: "哑",
    count: 0,
    level: 2528,
  },
  {
    hanzi: "哄",
    count: 1,
    level: 2529,
  },
  {
    hanzi: "瞩",
    count: 0,
    level: 2530,
  },
  {
    hanzi: "嘱",
    count: 0,
    level: 2531,
  },
  {
    hanzi: "叮",
    count: 0,
    level: 2532,
  },
  {
    hanzi: "柬",
    count: 0,
    level: 2533,
  },
  {
    hanzi: "澜",
    count: 0,
    level: 2534,
  },
  {
    hanzi: "烫",
    count: 1,
    level: 2535,
  },
  {
    hanzi: "洽",
    count: 0,
    level: 2536,
  },
  {
    hanzi: "衍",
    count: 0,
    level: 2537,
  },
  {
    hanzi: "澄",
    count: 0,
    level: 2538,
  },
  {
    hanzi: "橙",
    count: 1,
    level: 2539,
  },
  {
    hanzi: "凳",
    count: 1,
    level: 2540,
  },
  {
    hanzi: "蹬",
    count: 0,
    level: 2541,
  },
  {
    hanzi: "瞪",
    count: 0,
    level: 2542,
  },
  {
    hanzi: "睁",
    count: 0,
    level: 2543,
  },
  {
    hanzi: "盯",
    count: 1,
    level: 2544,
  },
  {
    hanzi: "趁",
    count: 0,
    level: 2545,
  },
  {
    hanzi: "膨",
    count: 0,
    level: 2546,
  },
  {
    hanzi: "彰",
    count: 0,
    level: 2547,
  },
  {
    hanzi: "皱",
    count: 1,
    level: 2548,
  },
  {
    hanzi: "虐",
    count: 1,
    level: 2549,
  },
  {
    hanzi: "秩",
    count: 0,
    level: 2550,
  },
  {
    hanzi: "募",
    count: 0,
    level: 2551,
  },
  {
    hanzi: "勉",
    count: 2,
    level: 2552,
  },
  {
    hanzi: "勘",
    count: 1,
    level: 2553,
  },
  {
    hanzi: "涝",
    count: 0,
    level: 2554,
  },
  {
    hanzi: "捞",
    count: 0,
    level: 2555,
  },
  {
    hanzi: "唠",
    count: 0,
    level: 2556,
  },
  {
    hanzi: "叨",
    count: 0,
    level: 2557,
  },
  {
    hanzi: "韵",
    count: 0,
    level: 2558,
  },
  {
    hanzi: "瓷",
    count: 0,
    level: 2559,
  },
  {
    hanzi: "嵌",
    count: 0,
    level: 2560,
  },
  {
    hanzi: "岳",
    count: 0,
    level: 2561,
  },
  {
    hanzi: "虾",
    count: 1,
    level: 2562,
  },
  {
    hanzi: "蚊",
    count: 1,
    level: 2563,
  },
  {
    hanzi: "愚",
    count: 0,
    level: 2564,
  },
  {
    hanzi: "蠢",
    count: 0,
    level: 2565,
  },
  {
    hanzi: "旭",
    count: 0,
    level: 2566,
  },
  {
    hanzi: "隙",
    count: 0,
    level: 2567,
  },
  {
    hanzi: "赐",
    count: 0,
    level: 2568,
  },
  {
    hanzi: "坝",
    count: 0,
    level: 2569,
  },
  {
    hanzi: "堤",
    count: 0,
    level: 2570,
  },
  {
    hanzi: "灶",
    count: 0,
    level: 2571,
  },
  {
    hanzi: "删",
    count: 1,
    level: 2572,
  },
  {
    hanzi: "丛",
    count: 0,
    level: 2573,
  },
  {
    hanzi: "巫",
    count: 0,
    level: 2574,
  },
  {
    hanzi: "耸",
    count: 0,
    level: 2575,
  },
  {
    hanzi: "叙",
    count: 0,
    level: 2576,
  },
  {
    hanzi: "驭",
    count: 0,
    level: 2577,
  },
  {
    hanzi: "骤",
    count: 0,
    level: 2578,
  },
  {
    hanzi: "驳",
    count: 0,
    level: 2579,
  },
  {
    hanzi: "骇",
    count: 0,
    level: 2580,
  },
  {
    hanzi: "驮",
    count: 0,
    level: 2581,
  },
  {
    hanzi: "驯",
    count: 0,
    level: 2582,
  },
  {
    hanzi: "巢",
    count: 0,
    level: 2583,
  },
  {
    hanzi: "辐",
    count: 0,
    level: 2584,
  },
  {
    hanzi: "辙",
    count: 0,
    level: 2585,
  },
  {
    hanzi: "敷",
    count: 1,
    level: 2586,
  },
  {
    hanzi: "敞",
    count: 0,
    level: 2587,
  },
  {
    hanzi: "敛",
    count: 0,
    level: 2588,
  },
  {
    hanzi: "肇",
    count: 0,
    level: 2589,
  },
  {
    hanzi: "玫",
    count: 2,
    level: 2590,
  },
  {
    hanzi: "瑰",
    count: 2,
    level: 2591,
  },
  {
    hanzi: "槐",
    count: 0,
    level: 2592,
  },
  {
    hanzi: "栓",
    count: 0,
    level: 2593,
  },
  {
    hanzi: "耍",
    count: 1,
    level: 2594,
  },
  {
    hanzi: "儒",
    count: 0,
    level: 2595,
  },
  {
    hanzi: "仆",
    count: 0,
    level: 2596,
  },
  {
    hanzi: "僧",
    count: 0,
    level: 2597,
  },
  {
    hanzi: "蹭",
    count: 0,
    level: 2598,
  },
  {
    hanzi: "愣",
    count: 0,
    level: 2599,
  },
  {
    hanzi: "懈",
    count: 0,
    level: 2600,
  },
  {
    hanzi: "闸",
    count: 0,
    level: 2601,
  },
  {
    hanzi: "阐",
    count: 0,
    level: 2602,
  },
  {
    hanzi: "禅",
    count: 0,
    level: 2603,
  },
  {
    hanzi: "隶",
    count: 0,
    level: 2604,
  },
  {
    hanzi: "逮",
    count: 0,
    level: 2605,
  },
  {
    hanzi: "逗",
    count: 2,
    level: 2606,
  },
  {
    hanzi: "逾",
    count: 0,
    level: 2607,
  },
  {
    hanzi: "遂",
    count: 0,
    level: 2608,
  },
  {
    hanzi: "谜",
    count: 0,
    level: 2609,
  },
  {
    hanzi: "讶",
    count: 1,
    level: 2610,
  },
  {
    hanzi: "渊",
    count: 0,
    level: 2611,
  },
  {
    hanzi: "泣",
    count: 0,
    level: 2612,
  },
  {
    hanzi: "潭",
    count: 0,
    level: 2613,
  },
  {
    hanzi: "沾",
    count: 0,
    level: 2614,
  },
  {
    hanzi: "泻",
    count: 0,
    level: 2615,
  },
  {
    hanzi: "冤",
    count: 0,
    level: 2616,
  },
  {
    hanzi: "枉",
    count: 0,
    level: 2617,
  },
  {
    hanzi: "枣",
    count: 0,
    level: 2618,
  },
  {
    hanzi: "梳",
    count: 0,
    level: 2619,
  },
  {
    hanzi: "枕",
    count: 0,
    level: 2620,
  },
  {
    hanzi: "耽",
    count: 0,
    level: 2621,
  },
  {
    hanzi: "缉",
    count: 0,
    level: 2622,
  },
  {
    hanzi: "咧",
    count: 0,
    level: 2623,
  },
  {
    hanzi: "鄙",
    count: 0,
    level: 2624,
  },
  {
    hanzi: "恕",
    count: 0,
    level: 2625,
  },
  {
    hanzi: "饶",
    count: 0,
    level: 2626,
  },
  {
    hanzi: "爵",
    count: 0,
    level: 2627,
  },
  {
    hanzi: "嚼",
    count: 0,
    level: 2628,
  },
  {
    hanzi: "喇",
    count: 0,
    level: 2629,
  },
  {
    hanzi: "叭",
    count: 0,
    level: 2630,
  },
  {
    hanzi: "扒",
    count: 0,
    level: 2631,
  },
  {
    hanzi: "撼",
    count: 0,
    level: 2632,
  },
  {
    hanzi: "挠",
    count: 0,
    level: 2633,
  },
  {
    hanzi: "掠",
    count: 0,
    level: 2634,
  },
  {
    hanzi: "摧",
    count: 0,
    level: 2635,
  },
  {
    hanzi: "瘫",
    count: 0,
    level: 2636,
  },
  {
    hanzi: "痪",
    count: 0,
    level: 2637,
  },
  {
    hanzi: "稚",
    count: 0,
    level: 2638,
  },
  {
    hanzi: "秧",
    count: 0,
    level: 2639,
  },
  {
    hanzi: "绣",
    count: 0,
    level: 2640,
  },
  {
    hanzi: "萎",
    count: 0,
    level: 2641,
  },
  {
    hanzi: "妄",
    count: 0,
    level: 2642,
  },
  {
    hanzi: "娶",
    count: 1,
    level: 2643,
  },
  {
    hanzi: "嫂",
    count: 0,
    level: 2644,
  },
  {
    hanzi: "艘",
    count: 0,
    level: 2645,
  },
  {
    hanzi: "妒",
    count: 1,
    level: 2646,
  },
  {
    hanzi: "嫉",
    count: 1,
    level: 2647,
  },
  {
    hanzi: "矫",
    count: 0,
    level: 2648,
  },
  {
    hanzi: "厦",
    count: 0,
    level: 2649,
  },
  {
    hanzi: "丹",
    count: 0,
    level: 2650,
  },
  {
    hanzi: "婉",
    count: 0,
    level: 2651,
  },
  {
    hanzi: "惋",
    count: 0,
    level: 2652,
  },
  {
    hanzi: "怡",
    count: 0,
    level: 2653,
  },
  {
    hanzi: "冶",
    count: 0,
    level: 2654,
  },
  {
    hanzi: "怠",
    count: 0,
    level: 2655,
  },
  {
    hanzi: "恳",
    count: 0,
    level: 2656,
  },
  {
    hanzi: "甩",
    count: 0,
    level: 2657,
  },
  {
    hanzi: "佣",
    count: 0,
    level: 2658,
  },
  {
    hanzi: "倦",
    count: 0,
    level: 2659,
  },
  {
    hanzi: "巷",
    count: 2,
    level: 2660,
  },
  {
    hanzi: "佑",
    count: 0,
    level: 2661,
  },
  {
    hanzi: "赁",
    count: 0,
    level: 2662,
  },
  {
    hanzi: "俯",
    count: 1,
    level: 2663,
  },
  {
    hanzi: "俘",
    count: 0,
    level: 2664,
  },
  {
    hanzi: "虏",
    count: 0,
    level: 2665,
  },
  {
    hanzi: "丐",
    count: 0,
    level: 2666,
  },
  {
    hanzi: "钙",
    count: 0,
    level: 2667,
  },
  {
    hanzi: "衔",
    count: 0,
    level: 2668,
  },
  {
    hanzi: "钩",
    count: 0,
    level: 2669,
  },
  {
    hanzi: "弘",
    count: 0,
    level: 2670,
  },
  {
    hanzi: "夷",
    count: 0,
    level: 2671,
  },
  {
    hanzi: "帖",
    count: 0,
    level: 2672,
  },
  {
    hanzi: "帕",
    count: 0,
    level: 2673,
  },
  {
    hanzi: "兜",
    count: 0,
    level: 2674,
  },
  {
    hanzi: "丫",
    count: 0,
    level: 2675,
  },
  {
    hanzi: "凸",
    count: 0,
    level: 2676,
  },
  {
    hanzi: "凹",
    count: 0,
    level: 2677,
  },
  {
    hanzi: "裕",
    count: 0,
    level: 2678,
  },
  {
    hanzi: "袍",
    count: 0,
    level: 2679,
  },
  {
    hanzi: "痒",
    count: 0,
    level: 2680,
  },
  {
    hanzi: "瘾",
    count: 0,
    level: 2681,
  },
  {
    hanzi: "馈",
    count: 0,
    level: 2682,
  },
  {
    hanzi: "蚀",
    count: 0,
    level: 2683,
  },
  {
    hanzi: "韧",
    count: 0,
    level: 2684,
  },
  {
    hanzi: "寡",
    count: 0,
    level: 2685,
  },
  {
    hanzi: "酿",
    count: 0,
    level: 2686,
  },
  {
    hanzi: "酝",
    count: 0,
    level: 2687,
  },
  {
    hanzi: "墅",
    count: 0,
    level: 2688,
  },
  {
    hanzi: "牡",
    count: 0,
    level: 2689,
  },
  {
    hanzi: "馨",
    count: 0,
    level: 2690,
  },
  {
    hanzi: "殷",
    count: 0,
    level: 2691,
  },
  {
    hanzi: "尴",
    count: 0,
    level: 2692,
  },
  {
    hanzi: "尬",
    count: 0,
    level: 2693,
  },
  {
    hanzi: "炫",
    count: 1,
    level: 2694,
  },
  {
    hanzi: "毯",
    count: 0,
    level: 2695,
  },
  {
    hanzi: "昧",
    count: 0,
    level: 2696,
  },
  {
    hanzi: "猩",
    count: 0,
    level: 2697,
  },
  {
    hanzi: "臣",
    count: 0,
    level: 2698,
  },
  {
    hanzi: "耕",
    count: 0,
    level: 2699,
  },
  {
    hanzi: "歪",
    count: 0,
    level: 2700,
  },
  {
    hanzi: "缸",
    count: 1,
    level: 2701,
  },
  {
    hanzi: "窑",
    count: 0,
    level: 2702,
  },
  {
    hanzi: "窍",
    count: 0,
    level: 2703,
  },
  {
    hanzi: "窜",
    count: 0,
    level: 2704,
  },
  {
    hanzi: "窥",
    count: 0,
    level: 2705,
  },
  {
    hanzi: "窟",
    count: 0,
    level: 2706,
  },
  {
    hanzi: "窿",
    count: 0,
    level: 2707,
  },
  {
    hanzi: "窒",
    count: 0,
    level: 2708,
  },
  {
    hanzi: "窘",
    count: 0,
    level: 2709,
  },
  {
    hanzi: "榨",
    count: 0,
    level: 2710,
  },
  {
    hanzi: "柄",
    count: 1,
    level: 2711,
  },
  {
    hanzi: "杠",
    count: 0,
    level: 2712,
  },
  {
    hanzi: "桩",
    count: 0,
    level: 2713,
  },
  {
    hanzi: "栖",
    count: 0,
    level: 2714,
  },
  {
    hanzi: "朽",
    count: 1,
    level: 2715,
  },
  {
    hanzi: "橱",
    count: 0,
    level: 2716,
  },
  {
    hanzi: "槛",
    count: 0,
    level: 2717,
  },
  {
    hanzi: "棺",
    count: 0,
    level: 2718,
  },
  {
    hanzi: "椰",
    count: 0,
    level: 2719,
  },
  {
    hanzi: "桨",
    count: 0,
    level: 2720,
  },
  {
    hanzi: "揉",
    count: 0,
    level: 2721,
  },
  {
    hanzi: "抒",
    count: 1,
    level: 2722,
  },
  {
    hanzi: "捣",
    count: 0,
    level: 2723,
  },
  {
    hanzi: "拱",
    count: 0,
    level: 2724,
  },
  {
    hanzi: "扳",
    count: 0,
    level: 2725,
  },
  {
    hanzi: "搁",
    count: 0,
    level: 2726,
  },
  {
    hanzi: "捂",
    count: 0,
    level: 2727,
  },
  {
    hanzi: "攒",
    count: 0,
    level: 2728,
  },
  {
    hanzi: "搓",
    count: 0,
    level: 2729,
  },
  {
    hanzi: "揣",
    count: 0,
    level: 2730,
  },
  {
    hanzi: "捆",
    count: 0,
    level: 2731,
  },
  {
    hanzi: "沐",
    count: 0,
    level: 2732,
  },
  {
    hanzi: "浏",
    count: 0,
    level: 2733,
  },
  {
    hanzi: "涤",
    count: 0,
    level: 2734,
  },
  {
    hanzi: "沽",
    count: 0,
    level: 2735,
  },
  {
    hanzi: "浊",
    count: 0,
    level: 2736,
  },
  {
    hanzi: "渺",
    count: 1,
    level: 2737,
  },
  {
    hanzi: "汛",
    count: 0,
    level: 2738,
  },
  {
    hanzi: "涕",
    count: 0,
    level: 2739,
  },
  {
    hanzi: "沛",
    count: 0,
    level: 2740,
  },
  {
    hanzi: "瀑",
    count: 0,
    level: 2741,
  },
  {
    hanzi: "溅",
    count: 0,
    level: 2742,
  },
  {
    hanzi: "淌",
    count: 0,
    level: 2743,
  },
  {
    hanzi: "沮",
    count: 0,
    level: 2744,
  },
  {
    hanzi: "溯",
    count: 0,
    level: 2745,
  },
  {
    hanzi: "鲨",
    count: 0,
    level: 2746,
  },
  {
    hanzi: "涮",
    count: 0,
    level: 2747,
  },
  {
    hanzi: "淆",
    count: 0,
    level: 2748,
  },
  {
    hanzi: "沏",
    count: 0,
    level: 2749,
  },
  {
    hanzi: "潦",
    count: 0,
    level: 2750,
  },
  {
    hanzi: "僚",
    count: 0,
    level: 2751,
  },
  {
    hanzi: "俭",
    count: 0,
    level: 2752,
  },
  {
    hanzi: "阀",
    count: 0,
    level: 2753,
  },
  {
    hanzi: "侃",
    count: 0,
    level: 2754,
  },
  {
    hanzi: "伺",
    count: 0,
    level: 2755,
  },
  {
    hanzi: "倚",
    count: 0,
    level: 2756,
  },
  {
    hanzi: "僻",
    count: 0,
    level: 2757,
  },
  {
    hanzi: "劈",
    count: 0,
    level: 2758,
  },
  {
    hanzi: "倘",
    count: 0,
    level: 2759,
  },
  {
    hanzi: "倔",
    count: 0,
    level: 2760,
  },
  {
    hanzi: "咐",
    count: 0,
    level: 2761,
  },
  {
    hanzi: "吩",
    count: 0,
    level: 2762,
  },
  {
    hanzi: "哺",
    count: 0,
    level: 2763,
  },
  {
    hanzi: "喧",
    count: 0,
    level: 2764,
  },
  {
    hanzi: "咏",
    count: 0,
    level: 2765,
  },
  {
    hanzi: "嗜",
    count: 0,
    level: 2766,
  },
  {
    hanzi: "哆",
    count: 0,
    level: 2767,
  },
  {
    hanzi: "嗦",
    count: 0,
    level: 2768,
  },
  {
    hanzi: "嗅",
    count: 0,
    level: 2769,
  },
  {
    hanzi: "鳄",
    count: 0,
    level: 2770,
  },
  {
    hanzi: "刁",
    count: 0,
    level: 2771,
  },
  {
    hanzi: "叼",
    count: 0,
    level: 2772,
  },
  {
    hanzi: "啃",
    count: 0,
    level: 2773,
  },
  {
    hanzi: "吭",
    count: 0,
    level: 2774,
  },
  {
    hanzi: "唾",
    count: 0,
    level: 2775,
  },
  {
    hanzi: "唬",
    count: 0,
    level: 2776,
  },
  {
    hanzi: "菩",
    count: 0,
    level: 2777,
  },
  {
    hanzi: "茂",
    count: 0,
    level: 2778,
  },
  {
    hanzi: "蒜",
    count: 0,
    level: 2779,
  },
  {
    hanzi: "荧",
    count: 0,
    level: 2780,
  },
  {
    hanzi: "藤",
    count: 0,
    level: 2781,
  },
  {
    hanzi: "蔓",
    count: 0,
    level: 2782,
  },
  {
    hanzi: "蔑",
    count: 0,
    level: 2783,
  },
  {
    hanzi: "苛",
    count: 0,
    level: 2784,
  },
  {
    hanzi: "暮",
    count: 0,
    level: 2785,
  },
  {
    hanzi: "矢",
    count: 0,
    level: 2786,
  },
  {
    hanzi: "荫",
    count: 0,
    level: 2787,
  },
  {
    hanzi: "茎",
    count: 0,
    level: 2788,
  },
  {
    hanzi: "蔼",
    count: 0,
    level: 2789,
  },
  {
    hanzi: "蘸",
    count: 0,
    level: 2790,
  },
  {
    hanzi: "礁",
    count: 0,
    level: 2791,
  },
  {
    hanzi: "磋",
    count: 0,
    level: 2792,
  },
  {
    hanzi: "砌",
    count: 0,
    level: 2793,
  },
  {
    hanzi: "磕",
    count: 0,
    level: 2794,
  },
  {
    hanzi: "怯",
    count: 0,
    level: 2795,
  },
  {
    hanzi: "恤",
    count: 0,
    level: 2796,
  },
  {
    hanzi: "惕",
    count: 1,
    level: 2797,
  },
  {
    hanzi: "慑",
    count: 0,
    level: 2798,
  },
  {
    hanzi: "慷",
    count: 0,
    level: 2799,
  },
  {
    hanzi: "惭",
    count: 0,
    level: 2800,
  },
  {
    hanzi: "惦",
    count: 0,
    level: 2801,
  },
  {
    hanzi: "悼",
    count: 0,
    level: 2802,
  },
  {
    hanzi: "绰",
    count: 0,
    level: 2803,
  },
  {
    hanzi: "绎",
    count: 0,
    level: 2804,
  },
  {
    hanzi: "绸",
    count: 0,
    level: 2805,
  },
  {
    hanzi: "绞",
    count: 0,
    level: 2806,
  },
  {
    hanzi: "缅",
    count: 0,
    level: 2807,
  },
  {
    hanzi: "绽",
    count: 0,
    level: 2808,
  },
  {
    hanzi: "纬",
    count: 0,
    level: 2809,
  },
  {
    hanzi: "缚",
    count: 1,
    level: 2810,
  },
  {
    hanzi: "绷",
    count: 1,
    level: 2811,
  },
  {
    hanzi: "绯",
    count: 1,
    level: 2812,
  },
  {
    hanzi: "绅",
    count: 0,
    level: 2813,
  },
  {
    hanzi: "缕",
    count: 0,
    level: 2814,
  },
  {
    hanzi: "搂",
    count: 0,
    level: 2815,
  },
  {
    hanzi: "掺",
    count: 0,
    level: 2816,
  },
  {
    hanzi: "拧",
    count: 1,
    level: 2817,
  },
  {
    hanzi: "拯",
    count: 0,
    level: 2818,
  },
  {
    hanzi: "扛",
    count: 0,
    level: 2819,
  },
  {
    hanzi: "拎",
    count: 0,
    level: 2820,
  },
  {
    hanzi: "拙",
    count: 0,
    level: 2821,
  },
  {
    hanzi: "拽",
    count: 0,
    level: 2822,
  },
  {
    hanzi: "撬",
    count: 0,
    level: 2823,
  },
  {
    hanzi: "捅",
    count: 0,
    level: 2824,
  },
  {
    hanzi: "拣",
    count: 0,
    level: 2825,
  },
  {
    hanzi: "揍",
    count: 0,
    level: 2826,
  },
  {
    hanzi: "搀",
    count: 0,
    level: 2827,
  },
  {
    hanzi: "捶",
    count: 0,
    level: 2828,
  },
  {
    hanzi: "拴",
    count: 0,
    level: 2829,
  },
  {
    hanzi: "拄",
    count: 0,
    level: 2830,
  },
  {
    hanzi: "抡",
    count: 0,
    level: 2831,
  },
  {
    hanzi: "捍",
    count: 0,
    level: 2832,
  },
  {
    hanzi: "晤",
    count: 0,
    level: 2833,
  },
  {
    hanzi: "旷",
    count: 0,
    level: 2834,
  },
  {
    hanzi: "曙",
    count: 0,
    level: 2835,
  },
  {
    hanzi: "腥",
    count: 0,
    level: 2836,
  },
  {
    hanzi: "膳",
    count: 0,
    level: 2837,
  },
  {
    hanzi: "膛",
    count: 0,
    level: 2838,
  },
  {
    hanzi: "朦",
    count: 0,
    level: 2839,
  },
  {
    hanzi: "胧",
    count: 0,
    level: 2840,
  },
  {
    hanzi: "婿",
    count: 0,
    level: 2841,
  },
  {
    hanzi: "姥",
    count: 1,
    level: 2842,
  },
  {
    hanzi: "絮",
    count: 0,
    level: 2843,
  },
  {
    hanzi: "嬉",
    count: 0,
    level: 2844,
  },
  {
    hanzi: "嫦",
    count: 0,
    level: 2845,
  },
  {
    hanzi: "娥",
    count: 0,
    level: 2846,
  },
  {
    hanzi: "媲",
    count: 0,
    level: 2847,
  },
  {
    hanzi: "凄",
    count: 0,
    level: 2848,
  },
  {
    hanzi: "婪",
    count: 0,
    level: 2849,
  },
  {
    hanzi: "彬",
    count: 0,
    level: 2850,
  },
  {
    hanzi: "焚",
    count: 0,
    level: 2851,
  },
  {
    hanzi: "灼",
    count: 0,
    level: 2852,
  },
  {
    hanzi: "焕",
    count: 2,
    level: 2853,
  },
  {
    hanzi: "烘",
    count: 0,
    level: 2854,
  },
  {
    hanzi: "焊",
    count: 0,
    level: 2855,
  },
  {
    hanzi: "熄",
    count: 0,
    level: 2856,
  },
  {
    hanzi: "烁",
    count: 0,
    level: 2857,
  },
  {
    hanzi: "炖",
    count: 2,
    level: 2858,
  },
  {
    hanzi: "炊",
    count: 0,
    level: 2859,
  },
  {
    hanzi: "灸",
    count: 0,
    level: 2860,
  },
  {
    hanzi: "煲",
    count: 2,
    level: 2861,
  },
  {
    hanzi: "耿",
    count: 0,
    level: 2862,
  },
  {
    hanzi: "痰",
    count: 0,
    level: 2863,
  },
  {
    hanzi: "痹",
    count: 0,
    level: 2864,
  },
  {
    hanzi: "煽",
    count: 0,
    level: 2865,
  },
  {
    hanzi: "翅",
    count: 1,
    level: 2866,
  },
  {
    hanzi: "翘",
    count: 0,
    level: 2867,
  },
  {
    hanzi: "戳",
    count: 0,
    level: 2868,
  },
  {
    hanzi: "雁",
    count: 0,
    level: 2869,
  },
  {
    hanzi: "鹤",
    count: 0,
    level: 2870,
  },
  {
    hanzi: "寝",
    count: 0,
    level: 2871,
  },
  {
    hanzi: "寥",
    count: 0,
    level: 2872,
  },
  {
    hanzi: "谬",
    count: 2,
    level: 2873,
  },
  {
    hanzi: "诀",
    count: 0,
    level: 2874,
  },
  {
    hanzi: "诵",
    count: 0,
    level: 2875,
  },
  {
    hanzi: "讳",
    count: 0,
    level: 2876,
  },
  {
    hanzi: "诫",
    count: 0,
    level: 2877,
  },
  {
    hanzi: "诽",
    count: 0,
    level: 2878,
  },
  {
    hanzi: "谤",
    count: 0,
    level: 2879,
  },
  {
    hanzi: "讹",
    count: 0,
    level: 2880,
  },
  {
    hanzi: "谍",
    count: 0,
    level: 2881,
  },
  {
    hanzi: "讥",
    count: 0,
    level: 2882,
  },
  {
    hanzi: "秃",
    count: 0,
    level: 2883,
  },
  {
    hanzi: "颓",
    count: 0,
    level: 2884,
  },
  {
    hanzi: "秉",
    count: 0,
    level: 2885,
  },
  {
    hanzi: "黏",
    count: 0,
    level: 2886,
  },
  {
    hanzi: "秽",
    count: 0,
    level: 2887,
  },
  {
    hanzi: "稠",
    count: 0,
    level: 2888,
  },
  {
    hanzi: "稼",
    count: 0,
    level: 2889,
  },
  {
    hanzi: "锈",
    count: 1,
    level: 2890,
  },
  {
    hanzi: "锤",
    count: 0,
    level: 2891,
  },
  {
    hanzi: "钞",
    count: 0,
    level: 2892,
  },
  {
    hanzi: "锯",
    count: 0,
    level: 2893,
  },
  {
    hanzi: "钳",
    count: 0,
    level: 2894,
  },
  {
    hanzi: "钧",
    count: 0,
    level: 2895,
  },
  {
    hanzi: "钓",
    count: 2,
    level: 2896,
  },
  {
    hanzi: "豹",
    count: 0,
    level: 2897,
  },
  {
    hanzi: "酌",
    count: 0,
    level: 2898,
  },
  {
    hanzi: "酣",
    count: 0,
    level: 2899,
  },
  {
    hanzi: "酥",
    count: 0,
    level: 2900,
  },
  {
    hanzi: "酗",
    count: 0,
    level: 2901,
  },
  {
    hanzi: "酵",
    count: 0,
    level: 2902,
  },
  {
    hanzi: "烹",
    count: 0,
    level: 2903,
  },
  {
    hanzi: "孪",
    count: 0,
    level: 2904,
  },
  {
    hanzi: "弈",
    count: 0,
    level: 2905,
  },
  {
    hanzi: "卉",
    count: 0,
    level: 2906,
  },
  {
    hanzi: "甸",
    count: 0,
    level: 2907,
  },
  {
    hanzi: "畔",
    count: 0,
    level: 2908,
  },
  {
    hanzi: "畸",
    count: 0,
    level: 2909,
  },
  {
    hanzi: "瞄",
    count: 0,
    level: 2910,
  },
  {
    hanzi: "睹",
    count: 1,
    level: 2911,
  },
  {
    hanzi: "瞒",
    count: 1,
    level: 2912,
  },
  {
    hanzi: "眨",
    count: 0,
    level: 2913,
  },
  {
    hanzi: "睦",
    count: 0,
    level: 2914,
  },
  {
    hanzi: "睬",
    count: 0,
    level: 2915,
  },
  {
    hanzi: "盹",
    count: 0,
    level: 2916,
  },
  {
    hanzi: "瞻",
    count: 0,
    level: 2917,
  },
  {
    hanzi: "赡",
    count: 0,
    level: 2918,
  },
  {
    hanzi: "赎",
    count: 0,
    level: 2919,
  },
  {
    hanzi: "贞",
    count: 0,
    level: 2920,
  },
  {
    hanzi: "贬",
    count: 0,
    level: 2921,
  },
  {
    hanzi: "贮",
    count: 0,
    level: 2922,
  },
  {
    hanzi: "屯",
    count: 0,
    level: 2923,
  },
  {
    hanzi: "赃",
    count: 0,
    level: 2924,
  },
  {
    hanzi: "陨",
    count: 0,
    level: 2925,
  },
  {
    hanzi: "阱",
    count: 1,
    level: 2926,
  },
  {
    hanzi: "陡",
    count: 0,
    level: 2927,
  },
  {
    hanzi: "陋",
    count: 0,
    level: 2928,
  },
  {
    hanzi: "堕",
    count: 0,
    level: 2929,
  },
  {
    hanzi: "廓",
    count: 0,
    level: 2930,
  },
  {
    hanzi: "隧",
    count: 0,
    level: 2931,
  },
  {
    hanzi: "遏",
    count: 0,
    level: 2932,
  },
  {
    hanzi: "迭",
    count: 0,
    level: 2933,
  },
  {
    hanzi: "迄",
    count: 0,
    level: 2934,
  },
  {
    hanzi: "逞",
    count: 0,
    level: 2935,
  },
  {
    hanzi: "琢",
    count: 0,
    level: 2936,
  },
  {
    hanzi: "筐",
    count: 0,
    level: 2937,
  },
  {
    hanzi: "筒",
    count: 2,
    level: 2938,
  },
  {
    hanzi: "篷",
    count: 0,
    level: 2939,
  },
  {
    hanzi: "笛",
    count: 0,
    level: 2940,
  },
  {
    hanzi: "筝",
    count: 0,
    level: 2941,
  },
  {
    hanzi: "簇",
    count: 0,
    level: 2942,
  },
  {
    hanzi: "竿",
    count: 0,
    level: 2943,
  },
  {
    hanzi: "罕",
    count: 1,
    level: 2944,
  },
  {
    hanzi: "凿",
    count: 0,
    level: 2945,
  },
  {
    hanzi: "墟",
    count: 0,
    level: 2946,
  },
  {
    hanzi: "垦",
    count: 0,
    level: 2947,
  },
  {
    hanzi: "坟",
    count: 0,
    level: 2948,
  },
  {
    hanzi: "紊",
    count: 0,
    level: 2949,
  },
  {
    hanzi: "虔",
    count: 0,
    level: 2950,
  },
  {
    hanzi: "剃",
    count: 0,
    level: 2951,
  },
  {
    hanzi: "刨",
    count: 0,
    level: 2952,
  },
  {
    hanzi: "剔",
    count: 0,
    level: 2953,
  },
  {
    hanzi: "竖",
    count: 0,
    level: 2954,
  },
  {
    hanzi: "幢",
    count: 0,
    level: 2955,
  },
  {
    hanzi: "帜",
    count: 0,
    level: 2956,
  },
  {
    hanzi: "觅",
    count: 0,
    level: 2957,
  },
  {
    hanzi: "孵",
    count: 0,
    level: 2958,
  },
  {
    hanzi: "馁",
    count: 0,
    level: 2959,
  },
  {
    hanzi: "馋",
    count: 0,
    level: 2960,
  },
  {
    hanzi: "饥",
    count: 0,
    level: 2961,
  },
  {
    hanzi: "冗",
    count: 0,
    level: 2962,
  },
  {
    hanzi: "弦",
    count: 0,
    level: 2963,
  },
  {
    hanzi: "弛",
    count: 0,
    level: 2964,
  },
  {
    hanzi: "躬",
    count: 0,
    level: 2965,
  },
  {
    hanzi: "靶",
    count: 0,
    level: 2966,
  },
  {
    hanzi: "靴",
    count: 0,
    level: 2967,
  },
  {
    hanzi: "鞠",
    count: 0,
    level: 2968,
  },
  {
    hanzi: "粪",
    count: 0,
    level: 2969,
  },
  {
    hanzi: "粽",
    count: 3,
    level: 2970,
  },
  {
    hanzi: "舵",
    count: 0,
    level: 2971,
  },
  {
    hanzi: "舶",
    count: 1,
    level: 2972,
  },
  {
    hanzi: "皂",
    count: 0,
    level: 2973,
  },
  {
    hanzi: "挚",
    count: 0,
    level: 2974,
  },
  {
    hanzi: "擎",
    count: 0,
    level: 2975,
  },
  {
    hanzi: "掰",
    count: 0,
    level: 2976,
  },
  {
    hanzi: "岔",
    count: 0,
    level: 2977,
  },
  {
    hanzi: "崛",
    count: 0,
    level: 2978,
  },
  {
    hanzi: "崭",
    count: 0,
    level: 2979,
  },
  {
    hanzi: "峙",
    count: 0,
    level: 2980,
  },
  {
    hanzi: "屿",
    count: 0,
    level: 2981,
  },
  {
    hanzi: "屹",
    count: 0,
    level: 2982,
  },
  {
    hanzi: "崖",
    count: 0,
    level: 2983,
  },
  {
    hanzi: "蛙",
    count: 0,
    level: 2984,
  },
  {
    hanzi: "卦",
    count: 0,
    level: 2985,
  },
  {
    hanzi: "卤",
    count: 0,
    level: 2986,
  },
  {
    hanzi: "闺",
    count: 0,
    level: 2987,
  },
  {
    hanzi: "阂",
    count: 0,
    level: 2988,
  },
  {
    hanzi: "蹦",
    count: 0,
    level: 2989,
  },
  {
    hanzi: "踹",
    count: 0,
    level: 2990,
  },
  {
    hanzi: "趴",
    count: 2,
    level: 2991,
  },
  {
    hanzi: "踊",
    count: 0,
    level: 2992,
  },
  {
    hanzi: "跤",
    count: 0,
    level: 2993,
  },
  {
    hanzi: "狡",
    count: 0,
    level: 2994,
  },
  {
    hanzi: "猾",
    count: 0,
    level: 2995,
  },
  {
    hanzi: "猖",
    count: 0,
    level: 2996,
  },
  {
    hanzi: "惫",
    count: 1,
    level: 2997,
  },
  {
    hanzi: "囱",
    count: 0,
    level: 2998,
  },
  {
    hanzi: "囚",
    count: 0,
    level: 2999,
  },
  {
    hanzi: "熏",
    count: 0,
    level: 3000,
  },
  {
    hanzi: "歼",
    count: 0,
    level: 3001,
  },
  {
    hanzi: "殃",
    count: 0,
    level: 3002,
  },
  {
    hanzi: "顷",
    count: 0,
    level: 3003,
  },
  {
    hanzi: "颊",
    count: 0,
    level: 3004,
  },
  {
    hanzi: "匠",
    count: 0,
    level: 3005,
  },
  {
    hanzi: "斧",
    count: 0,
    level: 3006,
  },
  {
    hanzi: "鹅",
    count: 1,
    level: 3007,
  },
  {
    hanzi: "鸽",
    count: 1,
    level: 3008,
  },
  {
    hanzi: "徘",
    count: 0,
    level: 3009,
  },
  {
    hanzi: "徊",
    count: 0,
    level: 3010,
  },
  {
    hanzi: "衅",
    count: 0,
    level: 3011,
  },
  {
    hanzi: "盏",
    count: 0,
    level: 3012,
  },
  {
    hanzi: "祀",
    count: 0,
    level: 3013,
  },
  {
    hanzi: "袱",
    count: 0,
    level: 3014,
  },
  {
    hanzi: "兢",
    count: 0,
    level: 3015,
  },
  {
    hanzi: "魁",
    count: 0,
    level: 3016,
  },
  {
    hanzi: "冈",
    count: 0,
    level: 3017,
  },
  {
    hanzi: "裔",
    count: 0,
    level: 3018,
  },
  {
    hanzi: "昼",
    count: 0,
    level: 3019,
  },
  {
    hanzi: "孔",
    count: 2,
    level: 3020,
  },
  {
    hanzi: "啥",
    count: 1,
    level: 3021,
  },
  {
    hanzi: "咋",
    count: 0,
    level: 3022,
  },
  {
    hanzi: "呻",
    count: 0,
    level: 3023,
  },
  {
    hanzi: "吟",
    count: 0,
    level: 3024,
  },
  {
    hanzi: "吴",
    count: 0,
    level: 3025,
  },
  {
    hanzi: "嗨",
    count: 0,
    level: 3026,
  },
  {
    hanzi: "噢",
    count: 0,
    level: 3027,
  },
  {
    hanzi: "澳",
    count: 0,
    level: 3028,
  },
  {
    hanzi: "涩",
    count: 0,
    level: 3029,
  },
  {
    hanzi: "洛",
    count: 0,
    level: 3030,
  },
  {
    hanzi: "浙",
    count: 0,
    level: 3031,
  },
  {
    hanzi: "沈",
    count: 0,
    level: 3032,
  },
  {
    hanzi: "浦",
    count: 0,
    level: 3033,
  },
  {
    hanzi: "屁",
    count: 0,
    level: 3034,
  },
  {
    hanzi: "棕",
    count: 0,
    level: 3035,
  },
  {
    hanzi: "杭",
    count: 1,
    level: 3036,
  },
  {
    hanzi: "宋",
    count: 0,
    level: 3037,
  },
  {
    hanzi: "椎",
    count: 0,
    level: 3038,
  },
  {
    hanzi: "雌",
    count: 0,
    level: 3039,
  },
  {
    hanzi: "蝴",
    count: 0,
    level: 3040,
  },
  {
    hanzi: "蝶",
    count: 0,
    level: 3041,
  },
  {
    hanzi: "眯",
    count: 0,
    level: 3042,
  },
  {
    hanzi: "眶",
    count: 0,
    level: 3043,
  },
  {
    hanzi: "玛",
    count: 0,
    level: 3044,
  },
  {
    hanzi: "菲",
    count: 0,
    level: 3045,
  },
  {
    hanzi: "莱",
    count: 0,
    level: 3046,
  },
  {
    hanzi: "疤",
    count: 0,
    level: 3047,
  },
  {
    hanzi: "圳",
    count: 2,
    level: 3048,
  },
  {
    hanzi: "侄",
    count: 0,
    level: 3049,
  },
  {
    hanzi: "掷",
    count: 0,
    level: 3050,
  },
  {
    hanzi: "嗎",
    count: 0,
    level: 3051,
  },
  {
    hanzi: "請問",
    count: 0,
    level: 3052,
  },
  {
    hanzi: "哪裡",
    count: 0,
    level: 3053,
  },
  {
    hanzi: "美國人",
    count: 0,
    level: 3054,
  },
  {
    hanzi: "中國人",
    count: 0,
    level: 3055,
  },
  {
    hanzi: "你呢",
    count: 3,
    level: 3056,
  },
  {
    hanzi: "喜歡",
    count: 0,
    level: 3057,
  },
  {
    hanzi: "漢堡",
    count: 0,
    level: 3058,
  },
  {
    hanzi: "我要提问",
    pinyin: "wǒ yào tíwèn",
    en: "I want to ask a question",
    count: 0,
    level: 3059,
  },
];
// 11826
export const allWords = [
  {
    hanzi: "一",
    hskLevels: 1,
  },
  {
    hanzi: "二",
    hskLevels: 1,
  },
  {
    hanzi: "三",
    hskLevels: 1,
  },
  {
    hanzi: "十",
    hskLevels: 1,
  },
  {
    hanzi: "干",
  },
  {
    hanzi: "半",
  },
  {
    hanzi: "一半",
  },
  {
    hanzi: "人",
    hskLevels: 1,
  },
  {
    hanzi: "从",
  },
  {
    hanzi: "年",
    hskLevels: 1,
  },
  {
    hanzi: "半年",
  },
  {
    hanzi: "人口",
  },
  {
    hanzi: "入口",
  },
  {
    hanzi: "中",
  },
  {
    hanzi: "叫",
    hskLevels: 1,
  },
  {
    hanzi: "只",
  },
  {
    hanzi: "说",
    hskLevels: 1,
  },
  {
    hanzi: "认识",
    hskLevels: 1,
  },
  {
    hanzi: "马",
  },
  {
    hanzi: "吗",
    hskLevels: 1,
  },
  {
    hanzi: "骂",
  },
  {
    hanzi: "吃",
    hskLevels: 1,
  },
  {
    hanzi: "气",
  },
  {
    hanzi: "飞",
  },
  {
    hanzi: "日",
  },
  {
    hanzi: "旧",
  },
  {
    hanzi: "但",
  },
  {
    hanzi: "早",
  },
  {
    hanzi: "唱",
  },
  {
    hanzi: "电",
  },
  {
    hanzi: "白",
  },
  {
    hanzi: "今年",
  },
  {
    hanzi: "话",
  },
  {
    hanzi: "说话",
  },
  {
    hanzi: "电话",
  },
  {
    hanzi: "活",
  },
  {
    hanzi: "乱",
  },
  {
    hanzi: "月",
    hskLevels: 1,
  },
  {
    hanzi: "用",
  },
  {
    hanzi: "胖",
  },
  {
    hanzi: "明白",
  },
  {
    hanzi: "说明",
  },
  {
    hanzi: "明年",
  },
  {
    hanzi: "的话",
  },
  {
    hanzi: "了",
    hskLevels: 1,
  },
  {
    hanzi: "儿子",
    hskLevels: 1,
  },
  {
    hanzi: "日子",
  },
  {
    hanzi: "勺子",
  },
  {
    hanzi: "过",
  },
  {
    hanzi: "过日子",
  },
  {
    hanzi: "才",
  },
  {
    hanzi: "上",
    hskLevels: 1,
  },
  {
    hanzi: "早上",
  },
  {
    hanzi: "马上",
  },
  {
    hanzi: "上午",
    hskLevels: 1,
  },
  {
    hanzi: "下",
    hskLevels: 1,
  },
  {
    hanzi: "一下",
  },
  {
    hanzi: "下午",
    hskLevels: 1,
  },
  {
    hanzi: "卡",
  },
  {
    hanzi: "吓",
  },
  {
    hanzi: "点",
    hskLevels: 1,
  },
  {
    hanzi: "一点儿",
    hskLevels: 1,
  },
  {
    hanzi: "一点点",
  },
  {
    hanzi: "早点",
  },
  {
    hanzi: "让",
  },
  {
    hanzi: "是",
    hskLevels: 1,
  },
  {
    hanzi: "但是",
  },
  {
    hanzi: "只是",
  },
  {
    hanzi: "目的",
  },
  {
    hanzi: "面",
  },
  {
    hanzi: "上面",
  },
  {
    hanzi: "下面",
  },
  {
    hanzi: "身上",
  },
  {
    hanzi: "代",
  },
  {
    hanzi: "手",
  },
  {
    hanzi: "我",
    hskLevels: 1,
  },
  {
    hanzi: "或",
  },
  {
    hanzi: "看",
    hskLevels: 1,
  },
  {
    hanzi: "拍",
  },
  {
    hanzi: "提",
  },
  {
    hanzi: "找",
  },
  {
    hanzi: "本",
    hskLevels: 1,
  },
  {
    hanzi: "本子",
  },
  {
    hanzi: "身体",
  },
  {
    hanzi: "米",
  },
  {
    hanzi: "来",
    hskLevels: 1,
  },
  {
    hanzi: "来自",
  },
  {
    hanzi: "上来",
  },
  {
    hanzi: "下来",
  },
  {
    hanzi: "过来",
  },
  {
    hanzi: "呆",
  },
  {
    hanzi: "桌子",
    hskLevels: 1,
  },
  {
    hanzi: "和",
    hskLevels: 1,
  },
  {
    hanzi: "种",
  },
  {
    hanzi: "香",
  },
  {
    hanzi: "几(个)",
  },
  {
    hanzi: "十几",
  },
  {
    hanzi: "几百",
  },
  {
    hanzi: "几千",
  },
  {
    hanzi: "手机",
  },
  {
    hanzi: "飞机",
    hskLevels: 1,
  },
  {
    hanzi: "心",
  },
  {
    hanzi: "担心",
  },
  {
    hanzi: "想",
    hskLevels: 1,
  },
  {
    hanzi: "休息",
  },
  {
    hanzi: "休息日",
  },
  {
    hanzi: "总是",
  },
  {
    hanzi: "怕",
  },
  {
    hanzi: "自己",
  },
  {
    hanzi: "记",
  },
  {
    hanzi: "包",
  },
  {
    hanzi: "面包",
  },
  {
    hanzi: "坐",
    hskLevels: 1,
  },
  {
    hanzi: "坐下",
  },
  {
    hanzi: "吐",
  },
  {
    hanzi: "肚子",
  },
  {
    hanzi: "在",
    hskLevels: 1,
  },
  {
    hanzi: "正在",
  },
  {
    hanzi: "走",
  },
  {
    hanzi: "一起",
  },
  {
    hanzi: "起来",
  },
  {
    hanzi: "起飞",
  },
  {
    hanzi: "不用",
  },
  {
    hanzi: "不过",
  },
  {
    hanzi: "还",
  },
  {
    hanzi: "还是",
  },
  {
    hanzi: "坏",
  },
  {
    hanzi: "杯子",
    hskLevels: 1,
  },
  {
    hanzi: "干杯",
  },
  {
    hanzi: "什么",
    hskLevels: 1,
  },
  {
    hanzi: "什么的",
  },
  {
    hanzi: "干什么",
  },
  {
    hanzi: "台",
  },
  {
    hanzi: "去",
    hskLevels: 1,
  },
  {
    hanzi: "去年",
  },
  {
    hanzi: "上去",
  },
  {
    hanzi: "下去",
  },
  {
    hanzi: "过去",
  },
  {
    hanzi: "丢",
  },
  {
    hanzi: "丢人",
  },
  {
    hanzi: "想法",
  },
  {
    hanzi: "看法",
  },
  {
    hanzi: "等",
  },
  {
    hanzi: "等等",
  },
  {
    hanzi: "门",
  },
  {
    hanzi: "门口",
  },
  {
    hanzi: "我们",
    hskLevels: 1,
  },
  {
    hanzi: "人们",
  },
  {
    hanzi: "问",
  },
  {
    hanzi: "时间",
  },
  {
    hanzi: "中间",
  },
  {
    hanzi: "公司",
  },
  {
    hanzi: "司机",
  },
  {
    hanzi: "词",
  },
  {
    hanzi: "母",
  },
  {
    hanzi: "每(个)",
  },
  {
    hanzi: "也",
  },
  {
    hanzi: "他",
    hskLevels: 1,
  },
  {
    hanzi: "地上",
  },
  {
    hanzi: "小",
    hskLevels: 1,
  },
  {
    hanzi: "小时",
  },
  {
    hanzi: "小心",
  },
  {
    hanzi: "您",
  },
  {
    hanzi: "大",
    hskLevels: 1,
  },
  {
    hanzi: "大小",
  },
  {
    hanzi: "大人",
  },
  {
    hanzi: "太",
    hskLevels: 1,
  },
  {
    hanzi: "太太",
  },
  {
    hanzi: "哭",
  },
  {
    hanzi: "臭",
  },
  {
    hanzi: "狗",
    hskLevels: 1,
  },
  {
    hanzi: "快",
  },
  {
    hanzi: "块",
    hskLevels: 1,
  },
  {
    hanzi: "羊",
  },
  {
    hanzi: "着",
  },
  {
    hanzi: "一样",
  },
  {
    hanzi: "什么样",
  },
  {
    hanzi: "样子",
  },
  {
    hanzi: "美",
  },
  {
    hanzi: "加",
  },
  {
    hanzi: "一边",
  },
  {
    hanzi: "东边",
  },
  {
    hanzi: "上边",
  },
  {
    hanzi: "下边",
  },
  {
    hanzi: "办",
  },
  {
    hanzi: "办法",
  },
  {
    hanzi: "为",
  },
  {
    hanzi: "为了",
  },
  {
    hanzi: "认为",
  },
  {
    hanzi: "为什么",
  },
  {
    hanzi: "另",
  },
  {
    hanzi: "云",
  },
  {
    hanzi: "动",
  },
  {
    hanzi: "运气",
  },
  {
    hanzi: "活动",
  },
  {
    hanzi: "自动",
  },
  {
    hanzi: "运动",
  },
  {
    hanzi: "会",
    hskLevels: 1,
  },
  {
    hanzi: "一会儿",
  },
  {
    hanzi: "机会",
  },
  {
    hanzi: "打",
  },
  {
    hanzi: "打电话",
    hskLevels: 1,
  },
  {
    hanzi: "打包",
  },
  {
    hanzi: "可是",
  },
  {
    hanzi: "哥哥",
  },
  {
    hanzi: "哥们儿",
  },
  {
    hanzi: "河",
  },
  {
    hanzi: "骑",
  },
  {
    hanzi: "椅子",
    hskLevels: 1,
  },
  {
    hanzi: "可以",
  },
  {
    hanzi: "以为",
  },
  {
    hanzi: "以上",
  },
  {
    hanzi: "以下",
  },
  {
    hanzi: "内心",
  },
  {
    hanzi: "以内",
  },
  {
    hanzi: "肉",
  },
  {
    hanzi: "两(个)",
  },
  {
    hanzi: "再",
  },
  {
    hanzi: "周",
  },
  {
    hanzi: "周末",
  },
  {
    hanzi: "住",
    hskLevels: 1,
  },
  {
    hanzi: "记住",
  },
  {
    hanzi: "玉米",
  },
  {
    hanzi: "中国",
    hskLevels: 1,
  },
  {
    hanzi: "中国人",
  },
  {
    hanzi: "国内",
  },
  {
    hanzi: "回",
    hskLevels: 1,
  },
  {
    hanzi: "回来",
  },
  {
    hanzi: "回去",
  },
  {
    hanzi: "因为",
  },
  {
    hanzi: "嗯",
  },
  {
    hanzi: "行",
  },
  {
    hanzi: "不行",
  },
  {
    hanzi: "行不行",
  },
  {
    hanzi: "行了",
  },
  {
    hanzi: "行为",
  },
  {
    hanzi: "得",
  },
  {
    hanzi: "记得",
  },
  {
    hanzi: "往",
  },
  {
    hanzi: "钟",
  },
  {
    hanzi: "点钟",
  },
  {
    hanzi: "天",
  },
  {
    hanzi: "今天",
    hskLevels: 1,
  },
  {
    hanzi: "明天",
    hskLevels: 1,
  },
  {
    hanzi: "每天",
  },
  {
    hanzi: "白天",
  },
  {
    hanzi: "天气",
    hskLevels: 1,
  },
  {
    hanzi: "半天",
  },
  {
    hanzi: "关",
  },
  {
    hanzi: "关心",
  },
  {
    hanzi: "关门",
  },
  {
    hanzi: "关注",
  },
  {
    hanzi: "关上",
  },
  {
    hanzi: "送",
  },
  {
    hanzi: "开",
    hskLevels: 1,
  },
  {
    hanzi: "开心",
  },
  {
    hanzi: "开门",
  },
  {
    hanzi: "开会",
  },
  {
    hanzi: "打开",
  },
  {
    hanzi: "总算",
  },
  {
    hanzi: "打算",
  },
  {
    hanzi: "闻",
  },
  {
    hanzi: "关系",
  },
  {
    hanzi: "联系",
  },
  {
    hanzi: "女人",
  },
  {
    hanzi: "美女",
  },
  {
    hanzi: "女儿",
    hskLevels: 1,
  },
  {
    hanzi: "妈",
  },
  {
    hanzi: "妈妈",
    hskLevels: 1,
  },
  {
    hanzi: "好",
    hskLevels: 1,
  },
  {
    hanzi: "好吃",
  },
  {
    hanzi: "好几",
  },
  {
    hanzi: "早上好",
  },
  {
    hanzi: "下午好",
  },
  {
    hanzi: "只好",
  },
  {
    hanzi: "还好",
  },
  {
    hanzi: "好好",
  },
  {
    hanzi: "好看",
  },
  {
    hanzi: "开始",
  },
  {
    hanzi: "东西",
    hskLevels: 1,
  },
  {
    hanzi: "西边",
  },
  {
    hanzi: "要",
  },
  {
    hanzi: "快要",
  },
  {
    hanzi: "主要",
  },
  {
    hanzi: "想要",
  },
  {
    hanzi: "要是",
  },
  {
    hanzi: "她",
    hskLevels: 1,
  },
  {
    hanzi: "楼",
  },
  {
    hanzi: "楼上",
  },
  {
    hanzi: "楼下",
  },
  {
    hanzi: "又",
  },
  {
    hanzi: "对",
  },
  {
    hanzi: "对…来说",
  },
  {
    hanzi: "对不起",
    hskLevels: 1,
  },
  {
    hanzi: "对面",
  },
  {
    hanzi: "没什么",
  },
  {
    hanzi: "没关系",
    hskLevels: 1,
  },
  {
    hanzi: "从来没",
  },
  {
    hanzi: "取",
  },
  {
    hanzi: "最",
  },
  {
    hanzi: "最好",
  },
  {
    hanzi: "慢",
  },
  {
    hanzi: "慢走",
  },
  {
    hanzi: "慢慢",
  },
  {
    hanzi: "书",
    hskLevels: 1,
  },
  {
    hanzi: "看书",
  },
  {
    hanzi: "书包",
  },
  {
    hanzi: "有",
    hskLevels: 1,
  },
  {
    hanzi: "有人",
  },
  {
    hanzi: "只有",
  },
  {
    hanzi: "没有",
    hskLevels: 1,
  },
  {
    hanzi: "有点儿",
  },
  {
    hanzi: "还有",
  },
  {
    hanzi: "有的",
  },
  {
    hanzi: "有用",
  },
  {
    hanzi: "随时",
  },
  {
    hanzi: "朋友",
    hskLevels: 1,
  },
  {
    hanzi: "女朋友",
  },
  {
    hanzi: "小朋友",
  },
  {
    hanzi: "友好",
  },
  {
    hanzi: "发",
  },
  {
    hanzi: "信",
  },
  {
    hanzi: "相信",
  },
  {
    hanzi: "信息",
  },
  {
    hanzi: "中文",
  },
  {
    hanzi: "文化",
  },
  {
    hanzi: "这个",
  },
  {
    hanzi: "这儿",
  },
  {
    hanzi: "这样",
  },
  {
    hanzi: "这边",
  },
  {
    hanzi: "这么",
  },
  {
    hanzi: "父母",
  },
  {
    hanzi: "交朋友",
  },
  {
    hanzi: "风",
  },
  {
    hanzi: "网",
  },
  {
    hanzi: "上网",
  },
  {
    hanzi: "网上",
  },
  {
    hanzi: "网友",
  },
  {
    hanzi: "那么",
  },
  {
    hanzi: "那天",
  },
  {
    hanzi: "那边",
  },
  {
    hanzi: "那儿",
  },
  {
    hanzi: "那个",
  },
  {
    hanzi: "哪个",
  },
  {
    hanzi: "哪儿",
    hskLevels: 1,
  },
  {
    hanzi: "袋子",
  },
  {
    hanzi: "大衣",
  },
  {
    hanzi: "口袋",
  },
  {
    hanzi: "被",
  },
  {
    hanzi: "被子",
  },
  {
    hanzi: "很",
    hskLevels: 1,
  },
  {
    hanzi: "银行",
  },
  {
    hanzi: "长",
  },
  {
    hanzi: "长大",
  },
  {
    hanzi: "长相",
  },
  {
    hanzi: "长得",
  },
  {
    hanzi: "衣服",
    hskLevels: 1,
  },
  {
    hanzi: "说服",
  },
  {
    hanzi: "元",
  },
  {
    hanzi: "远",
  },
  {
    hanzi: "玩儿",
  },
  {
    hanzi: "好玩",
  },
  {
    hanzi: "公园",
  },
  {
    hanzi: "完",
  },
  {
    hanzi: "完美",
  },
  {
    hanzi: "完全",
  },
  {
    hanzi: "字",
    hskLevels: 1,
  },
  {
    hanzi: "汉字",
  },
  {
    hanzi: "一定",
  },
  {
    hanzi: "决定",
  },
  {
    hanzi: "不一定",
  },
  {
    hanzi: "安全",
  },
  {
    hanzi: "寄",
  },
  {
    hanzi: "宝宝",
  },
  {
    hanzi: "比",
  },
  {
    hanzi: "比如",
  },
  {
    hanzi: "它",
  },
  {
    hanzi: "它们",
  },
  {
    hanzi: "一些",
  },
  {
    hanzi: "有些",
  },
  {
    hanzi: "这些",
  },
  {
    hanzi: "那些",
  },
  {
    hanzi: "能",
    hskLevels: 1,
  },
  {
    hanzi: "能力",
  },
  {
    hanzi: "可能",
  },
  {
    hanzi: "多",
    hskLevels: 1,
  },
  {
    hanzi: "很多",
  },
  {
    hanzi: "多么",
  },
  {
    hanzi: "好多",
  },
  {
    hanzi: "够",
  },
  {
    hanzi: "外面",
  },
  {
    hanzi: "另外",
  },
  {
    hanzi: "外国",
  },
  {
    hanzi: "外国人",
  },
  {
    hanzi: "以外",
  },
  {
    hanzi: "外边",
  },
  {
    hanzi: "国外",
  },
  {
    hanzi: "名字",
    hskLevels: 1,
  },
  {
    hanzi: "有名",
  },
  {
    hanzi: "死",
  },
  {
    hanzi: "吓死",
  },
  {
    hanzi: "少",
    hskLevels: 1,
  },
  {
    hanzi: "不少",
  },
  {
    hanzi: "多少",
    hskLevels: 1,
  },
  {
    hanzi: "吵",
  },
  {
    hanzi: "宝贝儿",
  },
  {
    hanzi: "贵",
  },
  {
    hanzi: "页",
  },
  {
    hanzi: "问题",
  },
  {
    hanzi: "见",
  },
  {
    hanzi: "看见",
    hskLevels: 1,
  },
  {
    hanzi: "见面",
  },
  {
    hanzi: "再见",
    hskLevels: 1,
  },
  {
    hanzi: "明天见",
  },
  {
    hanzi: "现在",
    hskLevels: 1,
  },
  {
    hanzi: "发现",
  },
  {
    hanzi: "现金",
  },
  {
    hanzi: "一直",
  },
  {
    hanzi: "真",
  },
  {
    hanzi: "认真",
  },
  {
    hanzi: "某个",
  },
  {
    hanzi: "某些",
  },
  {
    hanzi: "其他",
  },
  {
    hanzi: "讨厌",
  },
  {
    hanzi: "斤",
  },
  {
    hanzi: "公斤",
  },
  {
    hanzi: "听",
    hskLevels: 1,
  },
  {
    hanzi: "好听",
  },
  {
    hanzi: "听力",
  },
  {
    hanzi: "听见",
  },
  {
    hanzi: "听话",
  },
  {
    hanzi: "听说",
  },
  {
    hanzi: "近",
  },
  {
    hanzi: "最近",
  },
  {
    hanzi: "以后",
  },
  {
    hanzi: "然后",
  },
  {
    hanzi: "后",
  },
  {
    hanzi: "后来",
  },
  {
    hanzi: "最后",
  },
  {
    hanzi: "后天",
  },
  {
    hanzi: "后面",
    hskLevels: 1,
  },
  {
    hanzi: "后边",
  },
  {
    hanzi: "厚",
  },
  {
    hanzi: "反正",
  },
  {
    hanzi: "相反",
  },
  {
    hanzi: "米饭",
    hskLevels: 1,
  },
  {
    hanzi: "早饭",
  },
  {
    hanzi: "午饭",
  },
  {
    hanzi: "吃饭",
  },
  {
    hanzi: "吃饱",
  },
  {
    hanzi: "饿",
  },
  {
    hanzi: "员工",
  },
  {
    hanzi: "工人",
  },
  {
    hanzi: "江",
  },
  {
    hanzi: "左边",
  },
  {
    hanzi: "左右",
  },
  {
    hanzi: "右边",
  },
  {
    hanzi: "差",
  },
  {
    hanzi: "差不多",
  },
  {
    hanzi: "差点儿",
  },
  {
    hanzi: "红",
  },
  {
    hanzi: "红包",
  },
  {
    hanzi: "约",
  },
  {
    hanzi: "约会",
  },
  {
    hanzi: "合法",
  },
  {
    hanzi: "给",
  },
  {
    hanzi: "拿",
  },
  {
    hanzi: "穿",
  },
  {
    hanzi: "穿衣服",
  },
  {
    hanzi: "天空",
  },
  {
    hanzi: "有空",
  },
  {
    hanzi: "空",
  },
  {
    hanzi: "空间",
  },
  {
    hanzi: "空气",
  },
  {
    hanzi: "深",
  },
  {
    hanzi: "正式",
  },
  {
    hanzi: "试试",
  },
  {
    hanzi: "刀子",
  },
  {
    hanzi: "分",
  },
  {
    hanzi: "分钟",
    hskLevels: 1,
  },
  {
    hanzi: "分手",
  },
  {
    hanzi: "分开",
  },
  {
    hanzi: "过分",
  },
  {
    hanzi: "份儿",
  },
  {
    hanzi: "月份",
  },
  {
    hanzi: "一切",
  },
  {
    hanzi: "切",
  },
  {
    hanzi: "计划",
  },
  {
    hanzi: "别",
  },
  {
    hanzi: "别人",
  },
  {
    hanzi: "别的",
  },
  {
    hanzi: "刚",
  },
  {
    hanzi: "刚刚",
  },
  {
    hanzi: "刚才",
  },
  {
    hanzi: "班",
  },
  {
    hanzi: "上班",
  },
  {
    hanzi: "下班",
  },
  {
    hanzi: "加班",
  },
  {
    hanzi: "以前",
  },
  {
    hanzi: "前",
  },
  {
    hanzi: "前天",
  },
  {
    hanzi: "前面",
    hskLevels: 1,
  },
  {
    hanzi: "往前",
  },
  {
    hanzi: "前边",
  },
  {
    hanzi: "介绍",
  },
  {
    hanzi: "拍照",
  },
  {
    hanzi: "照相机",
  },
  {
    hanzi: "照片",
  },
  {
    hanzi: "至少",
  },
  {
    hanzi: "到",
  },
  {
    hanzi: "没想到",
  },
  {
    hanzi: "回到",
  },
  {
    hanzi: "得到",
  },
  {
    hanzi: "找到",
  },
  {
    hanzi: "来到",
  },
  {
    hanzi: "看到",
  },
  {
    hanzi: "听到",
  },
  {
    hanzi: "进",
  },
  {
    hanzi: "进来",
  },
  {
    hanzi: "进步",
  },
  {
    hanzi: "进一步",
  },
  {
    hanzi: "进去",
  },
  {
    hanzi: "山",
  },
  {
    hanzi: "出",
  },
  {
    hanzi: "出来",
  },
  {
    hanzi: "出去",
  },
  {
    hanzi: "出国",
  },
  {
    hanzi: "出发",
  },
  {
    hanzi: "出现",
  },
  {
    hanzi: "想出来",
  },
  {
    hanzi: "岁",
    hskLevels: 1,
  },
  {
    hanzi: "几岁",
  },
  {
    hanzi: "变",
  },
  {
    hanzi: "变化",
  },
  {
    hanzi: "变得",
  },
  {
    hanzi: "如果",
  },
  {
    hanzi: "课",
  },
  {
    hanzi: "上课",
  },
  {
    hanzi: "下课",
  },
  {
    hanzi: "课本",
  },
  {
    hanzi: "单身",
  },
  {
    hanzi: "简单",
  },
  {
    hanzi: "鱼",
  },
  {
    hanzi: "男人",
  },
  {
    hanzi: "男朋友",
  },
  {
    hanzi: "累",
  },
  {
    hanzi: "花",
  },
  {
    hanzi: "花园",
  },
  {
    hanzi: "草",
  },
  {
    hanzi: "草地",
  },
  {
    hanzi: "猫",
    hskLevels: 1,
  },
  {
    hanzi: "药",
  },
  {
    hanzi: "宽",
  },
  {
    hanzi: "菜",
    hskLevels: 1,
  },
  {
    hanzi: "菜单",
  },
  {
    hanzi: "点菜",
  },
  {
    hanzi: "受",
  },
  {
    hanzi: "受到",
  },
  {
    hanzi: "受不了",
  },
  {
    hanzi: "爱",
    hskLevels: 1,
  },
  {
    hanzi: "可爱",
  },
  {
    hanzi: "爱好",
  },
  {
    hanzi: "一共",
  },
  {
    hanzi: "借",
  },
  {
    hanzi: "借口",
  },
  {
    hanzi: "错",
  },
  {
    hanzi: "不错",
  },
  {
    hanzi: "没错",
  },
  {
    hanzi: "还不错",
  },
  {
    hanzi: "收",
  },
  {
    hanzi: "收到",
  },
  {
    hanzi: "收入",
  },
  {
    hanzi: "改",
  },
  {
    hanzi: "改变",
  },
  {
    hanzi: "改天",
  },
  {
    hanzi: "数",
  },
  {
    hanzi: "苦",
  },
  {
    hanzi: "做",
    hskLevels: 1,
  },
  {
    hanzi: "做饭",
  },
  {
    hanzi: "做爱",
  },
  {
    hanzi: "叫做",
  },
  {
    hanzi: "或者",
  },
  {
    hanzi: "记者",
  },
  {
    hanzi: "猪",
  },
  {
    hanzi: "猪肉",
  },
  {
    hanzi: "老",
  },
  {
    hanzi: "老公",
  },
  {
    hanzi: "老外",
  },
  {
    hanzi: "老人",
  },
  {
    hanzi: "教",
  },
  {
    hanzi: "五",
    hskLevels: 1,
  },
  {
    hanzi: "口语",
  },
  {
    hanzi: "语言",
  },
  {
    hanzi: "汉语",
    hskLevels: 1,
  },
  {
    hanzi: "语法",
  },
  {
    hanzi: "外语",
  },
  {
    hanzi: "床",
  },
  {
    hanzi: "起床",
  },
  {
    hanzi: "饭店",
    hskLevels: 1,
  },
  {
    hanzi: "书店",
  },
  {
    hanzi: "反应",
  },
  {
    hanzi: "小学",
  },
  {
    hanzi: "中学",
  },
  {
    hanzi: "大学",
  },
  {
    hanzi: "学习",
    hskLevels: 1,
  },
  {
    hanzi: "同学",
    hskLevels: 1,
  },
  {
    hanzi: "学",
  },
  {
    hanzi: "学校",
    hskLevels: 1,
  },
  {
    hanzi: "教学楼",
  },
  {
    hanzi: "学院",
  },
  {
    hanzi: "自学",
  },
  {
    hanzi: "上学",
  },
  {
    hanzi: "觉得",
  },
  {
    hanzi: "该",
  },
  {
    hanzi: "应该",
  },
  {
    hanzi: "孩子",
  },
  {
    hanzi: "女孩",
  },
  {
    hanzi: "男孩",
  },
  {
    hanzi: "小孩",
  },
  {
    hanzi: "水",
    hskLevels: 1,
  },
  {
    hanzi: "水果",
    hskLevels: 1,
  },
  {
    hanzi: "冰",
  },
  {
    hanzi: "冰水",
  },
  {
    hanzi: "求",
  },
  {
    hanzi: "要求",
  },
  {
    hanzi: "地球",
  },
  {
    hanzi: "球",
  },
  {
    hanzi: "打球",
  },
  {
    hanzi: "救",
  },
  {
    hanzi: "火",
  },
  {
    hanzi: "灯",
  },
  {
    hanzi: "烦",
  },
  {
    hanzi: "哪里",
  },
  {
    hanzi: "这里",
  },
  {
    hanzi: "那里",
  },
  {
    hanzi: "公里",
  },
  {
    hanzi: "里面",
  },
  {
    hanzi: "里边",
  },
  {
    hanzi: "重",
  },
  {
    hanzi: "重要",
  },
  {
    hanzi: "听得懂",
  },
  {
    hanzi: "懂",
  },
  {
    hanzi: "听不懂",
  },
  {
    hanzi: "黑",
  },
  {
    hanzi: "作",
  },
  {
    hanzi: "作为",
  },
  {
    hanzi: "工作",
    hskLevels: 1,
  },
  {
    hanzi: "动作",
  },
  {
    hanzi: "工作日",
  },
  {
    hanzi: "昨天",
    hskLevels: 1,
  },
  {
    hanzi: "怎么",
    hskLevels: 1,
  },
  {
    hanzi: "怎么样",
    hskLevels: 1,
  },
  {
    hanzi: "窄",
  },
  {
    hanzi: "请",
    hskLevels: 1,
  },
  {
    hanzi: "请进",
  },
  {
    hanzi: "请问",
  },
  {
    hanzi: "情",
  },
  {
    hanzi: "情况",
  },
  {
    hanzi: "表情",
  },
  {
    hanzi: "手表",
  },
  {
    hanzi: "女生",
  },
  {
    hanzi: "男生",
  },
  {
    hanzi: "学生",
    hskLevels: 1,
  },
  {
    hanzi: "生",
  },
  {
    hanzi: "生日",
  },
  {
    hanzi: "生活",
  },
  {
    hanzi: "发生",
  },
  {
    hanzi: "生气",
  },
  {
    hanzi: "小学生",
  },
  {
    hanzi: "中学生",
  },
  {
    hanzi: "大学生",
  },
  {
    hanzi: "星",
  },
  {
    hanzi: "星期",
    hskLevels: 1,
  },
  {
    hanzi: "姓",
  },
  {
    hanzi: "您贵姓",
  },
  {
    hanzi: "晚",
  },
  {
    hanzi: "晚饭",
  },
  {
    hanzi: "晚上",
  },
  {
    hanzi: "家",
    hskLevels: 1,
  },
  {
    hanzi: "家里",
  },
  {
    hanzi: "大家",
  },
  {
    hanzi: "回家",
  },
  {
    hanzi: "国家",
  },
  {
    hanzi: "家人",
  },
  {
    hanzi: "想家",
  },
  {
    hanzi: "老家",
  },
  {
    hanzi: "大象",
  },
  {
    hanzi: "像",
  },
  {
    hanzi: "不像话",
  },
  {
    hanzi: "好像",
  },
  {
    hanzi: "回头",
  },
  {
    hanzi: "头",
  },
  {
    hanzi: "头发",
  },
  {
    hanzi: "木头",
  },
  {
    hanzi: "舌头",
  },
  {
    hanzi: "其实",
  },
  {
    hanzi: "实话",
  },
  {
    hanzi: "老实",
  },
  {
    hanzi: "买",
    hskLevels: 1,
  },
  {
    hanzi: "买单",
  },
  {
    hanzi: "卖",
  },
  {
    hanzi: "买卖",
  },
  {
    hanzi: "外卖",
  },
  {
    hanzi: "读",
    hskLevels: 1,
  },
  {
    hanzi: "读书",
  },
  {
    hanzi: "牛",
  },
  {
    hanzi: "牛肉",
  },
  {
    hanzi: "特别",
  },
  {
    hanzi: "特点",
  },
  {
    hanzi: "件",
  },
  {
    hanzi: "告诉",
  },
  {
    hanzi: "广告",
  },
  {
    hanzi: "先",
  },
  {
    hanzi: "先生",
    hskLevels: 1,
  },
  {
    hanzi: "洗",
  },
  {
    hanzi: "洗手间",
  },
  {
    hanzi: "了解",
  },
  {
    hanzi: "解决",
  },
  {
    hanzi: "当然",
  },
  {
    hanzi: "当时",
  },
  {
    hanzi: "打扫",
  },
  {
    hanzi: "事",
  },
  {
    hanzi: "事情",
  },
  {
    hanzi: "同事",
  },
  {
    hanzi: "事儿",
  },
  {
    hanzi: "出事",
  },
  {
    hanzi: "怎么回事",
  },
  {
    hanzi: "没事儿",
  },
  {
    hanzi: "使",
  },
  {
    hanzi: "更",
  },
  {
    hanzi: "随便",
  },
  {
    hanzi: "大便",
  },
  {
    hanzi: "小便",
  },
  {
    hanzi: "石头",
  },
  {
    hanzi: "硬",
  },
  {
    hanzi: "上车",
  },
  {
    hanzi: "下车",
  },
  {
    hanzi: "公交车",
  },
  {
    hanzi: "火车",
  },
  {
    hanzi: "汽车",
  },
  {
    hanzi: "开车",
  },
  {
    hanzi: "打车",
  },
  {
    hanzi: "自行车",
  },
  {
    hanzi: "电动车",
  },
  {
    hanzi: "连",
  },
  {
    hanzi: "辆",
  },
  {
    hanzi: "比较",
  },
  {
    hanzi: "轻",
  },
  {
    hanzi: "年轻",
  },
  {
    hanzi: "年轻人",
  },
  {
    hanzi: "已经",
  },
  {
    hanzi: "经过",
  },
  {
    hanzi: "写",
    hskLevels: 1,
  },
  {
    hanzi: "听写",
  },
  {
    hanzi: "女士",
  },
  {
    hanzi: "信任",
  },
  {
    hanzi: "土豆",
  },
  {
    hanzi: "高",
  },
  {
    hanzi: "提高",
  },
  {
    hanzi: "高兴",
    hskLevels: 1,
  },
  {
    hanzi: "停",
  },
  {
    hanzi: "九",
    hskLevels: 1,
  },
  {
    hanzi: "热",
    hskLevels: 1,
  },
  {
    hanzi: "热情",
  },
  {
    hanzi: "热水",
  },
  {
    hanzi: "加热",
  },
  {
    hanzi: "风景",
  },
  {
    hanzi: "电影",
    hskLevels: 1,
  },
  {
    hanzi: "影子",
  },
  {
    hanzi: "电影院",
  },
  {
    hanzi: "尤其是",
  },
  {
    hanzi: "就",
  },
  {
    hanzi: "就是",
  },
  {
    hanzi: "那就",
  },
  {
    hanzi: "就算",
  },
  {
    hanzi: "完成",
  },
  {
    hanzi: "成长",
  },
  {
    hanzi: "变成",
  },
  {
    hanzi: "成为",
  },
  {
    hanzi: "成人",
  },
  {
    hanzi: "越",
  },
  {
    hanzi: "越来越",
  },
  {
    hanzi: "咸",
  },
  {
    hanzi: "感动",
  },
  {
    hanzi: "感到",
  },
  {
    hanzi: "感情",
  },
  {
    hanzi: "感觉",
  },
  {
    hanzi: "钱",
    hskLevels: 1,
  },
  {
    hanzi: "有钱",
  },
  {
    hanzi: "钱包",
  },
  {
    hanzi: "浅",
  },
  {
    hanzi: "帅",
  },
  {
    hanzi: "帅哥",
  },
  {
    hanzi: "老师",
    hskLevels: 1,
  },
  {
    hanzi: "城市",
  },
  {
    hanzi: "带",
  },
  {
    hanzi: "带来",
  },
  {
    hanzi: "带走",
  },
  {
    hanzi: "帮",
  },
  {
    hanzi: "常常",
  },
  {
    hanzi: "经常",
  },
  {
    hanzi: "正常",
  },
  {
    hanzi: "非常",
  },
  {
    hanzi: "非法",
  },
  {
    hanzi: "下雨",
    hskLevels: 1,
  },
  {
    hanzi: "雨",
  },
  {
    hanzi: "雪",
  },
  {
    hanzi: "下雪",
  },
  {
    hanzi: "冬天",
  },
  {
    hanzi: "地图",
  },
  {
    hanzi: "各种",
  },
  {
    hanzi: "各种各样",
  },
  {
    hanzi: "客人",
  },
  {
    hanzi: "不客气",
    hskLevels: 1,
  },
  {
    hanzi: "服务",
  },
  {
    hanzi: "服务员",
  },
  {
    hanzi: "夏天",
  },
  {
    hanzi: "冷",
    hskLevels: 1,
  },
  {
    hanzi: "跑",
  },
  {
    hanzi: "跑步",
  },
  {
    hanzi: "路",
  },
  {
    hanzi: "走路",
  },
  {
    hanzi: "路上",
  },
  {
    hanzi: "路口",
  },
  {
    hanzi: "马路",
  },
  {
    hanzi: "跟",
  },
  {
    hanzi: "表示",
  },
  {
    hanzi: "票",
  },
  {
    hanzi: "车票",
  },
  {
    hanzi: "机票",
  },
  {
    hanzi: "火车票",
  },
  {
    hanzi: "门票",
  },
  {
    hanzi: "电影票",
  },
  {
    hanzi: "电视",
    hskLevels: 1,
  },
  {
    hanzi: "电视机",
  },
  {
    hanzi: "知道",
  },
  {
    hanzi: "短",
  },
  {
    hanzi: "短信",
  },
  {
    hanzi: "医生",
    hskLevels: 1,
  },
  {
    hanzi: "医院",
    hskLevels: 1,
  },
  {
    hanzi: "矮",
  },
  {
    hanzi: "时候",
    hskLevels: 1,
  },
  {
    hanzi: "那个时候",
  },
  {
    hanzi: "小时候",
  },
  {
    hanzi: "有时候",
  },
  {
    hanzi: "虫子",
  },
  {
    hanzi: "虽然",
  },
  {
    hanzi: "强",
  },
  {
    hanzi: "弱",
  },
  {
    hanzi: "兄弟",
  },
  {
    hanzi: "弟弟",
  },
  {
    hanzi: "第一",
  },
  {
    hanzi: "谁",
    hskLevels: 1,
  },
  {
    hanzi: "推",
  },
  {
    hanzi: "难",
  },
  {
    hanzi: "难受",
  },
  {
    hanzi: "难过",
  },
  {
    hanzi: "难吃",
  },
  {
    hanzi: "难看",
  },
  {
    hanzi: "难听",
  },
  {
    hanzi: "准备",
  },
  {
    hanzi: "笑",
  },
  {
    hanzi: "搞笑",
  },
  {
    hanzi: "开玩笑",
  },
  {
    hanzi: "发音",
  },
  {
    hanzi: "意思",
  },
  {
    hanzi: "介意",
  },
  {
    hanzi: "同意",
  },
  {
    hanzi: "有意思",
  },
  {
    hanzi: "没意思",
  },
  {
    hanzi: "不好意思",
  },
  {
    hanzi: "注意",
  },
  {
    hanzi: "注意到",
  },
  {
    hanzi: "做生意",
  },
  {
    hanzi: "意外",
  },
  {
    hanzi: "站",
  },
  {
    hanzi: "网站",
  },
  {
    hanzi: "火车站",
  },
  {
    hanzi: "车站",
  },
  {
    hanzi: "拉",
  },
  {
    hanzi: "拉肚子",
  },
  {
    hanzi: "接",
  },
  {
    hanzi: "接受",
  },
  {
    hanzi: "接电话",
  },
  {
    hanzi: "母亲",
  },
  {
    hanzi: "父亲",
  },
  {
    hanzi: "亲",
  },
  {
    hanzi: "新",
  },
  {
    hanzi: "新闻",
  },
  {
    hanzi: "最新",
  },
  {
    hanzi: "新年",
  },
  {
    hanzi: "杀",
  },
  {
    hanzi: "面条",
  },
  {
    hanzi: "快乐",
  },
  {
    hanzi: "音乐",
  },
  {
    hanzi: "茶",
    hskLevels: 1,
  },
  {
    hanzi: "扔",
  },
  {
    hanzi: "奶奶",
  },
  {
    hanzi: "牛奶",
  },
  {
    hanzi: "来不及",
  },
  {
    hanzi: "来得及",
  },
  {
    hanzi: "呢",
    hskLevels: 1,
  },
  {
    hanzi: "所以",
  },
  {
    hanzi: "所有",
  },
  {
    hanzi: "声音",
  },
  {
    hanzi: "欠",
  },
  {
    hanzi: "吹",
  },
  {
    hanzi: "歌",
  },
  {
    hanzi: "唱歌",
  },
  {
    hanzi: "歌手",
  },
  {
    hanzi: "软",
  },
  {
    hanzi: "这次",
  },
  {
    hanzi: "那次",
  },
  {
    hanzi: "一次",
  },
  {
    hanzi: "上次",
  },
  {
    hanzi: "下次",
  },
  {
    hanzi: "下次见",
  },
  {
    hanzi: "几次",
  },
  {
    hanzi: "每次",
  },
  {
    hanzi: "喜欢",
    hskLevels: 1,
  },
  {
    hanzi: "忘",
  },
  {
    hanzi: "忘记",
  },
  {
    hanzi: "忙",
  },
  {
    hanzi: "帮忙",
  },
  {
    hanzi: "万",
  },
  {
    hanzi: "地方",
  },
  {
    hanzi: "方便",
  },
  {
    hanzi: "方法",
  },
  {
    hanzi: "放",
  },
  {
    hanzi: "放下",
  },
  {
    hanzi: "放心",
  },
  {
    hanzi: "放开",
  },
  {
    hanzi: "放学",
  },
  {
    hanzi: "房子",
  },
  {
    hanzi: "房间",
  },
  {
    hanzi: "房东",
  },
  {
    hanzi: "吧",
  },
  {
    hanzi: "把",
  },
  {
    hanzi: "白色",
  },
  {
    hanzi: "红色",
  },
  {
    hanzi: "黑色",
  },
  {
    hanzi: "而是",
  },
  {
    hanzi: "需要",
  },
  {
    hanzi: "而且",
  },
  {
    hanzi: "并且",
  },
  {
    hanzi: "姐姐",
  },
  {
    hanzi: "小姐",
    hskLevels: 1,
  },
  {
    hanzi: "便宜",
  },
  {
    hanzi: "病",
  },
  {
    hanzi: "病人",
  },
  {
    hanzi: "生病",
  },
  {
    hanzi: "看病",
  },
  {
    hanzi: "疼",
  },
  {
    hanzi: "报纸",
  },
  {
    hanzi: "纸",
  },
  {
    hanzi: "低",
  },
  {
    hanzi: "北边",
  },
  {
    hanzi: "南边",
  },
  {
    hanzi: "睡",
  },
  {
    hanzi: "睡觉",
    hskLevels: 1,
  },
  {
    hanzi: "海",
  },
  {
    hanzi: "上海",
  },
  {
    hanzi: "上海市",
  },
  {
    hanzi: "大海",
  },
  {
    hanzi: "海边",
  },
  {
    hanzi: "海关",
  },
  {
    hanzi: "毒",
  },
  {
    hanzi: "病毒",
  },
  {
    hanzi: "中毒",
  },
  {
    hanzi: "羊肉",
  },
  {
    hanzi: "包子",
  },
  {
    hanzi: "皮包",
  },
  {
    hanzi: "长江",
  },
  {
    hanzi: "长城",
  },
  {
    hanzi: "海洋",
  },
  {
    hanzi: "大西洋",
  },
  {
    hanzi: "正好",
  },
  {
    hanzi: "鲜",
  },
  {
    hanzi: "知识",
  },
  {
    hanzi: "正好",
  },
  {
    hanzi: "不但",
  },
  {
    hanzi: "不得不",
  },
  {
    hanzi: "不一会儿",
  },
  {
    hanzi: "那会儿",
  },
  {
    hanzi: "那时候",
  },
  {
    hanzi: "这时候",
  },
  {
    hanzi: "那样",
  },
  {
    hanzi: "怎样",
  },
  {
    hanzi: "怎么办",
  },
  {
    hanzi: "同样",
  },
  {
    hanzi: "原因",
  },
  {
    hanzi: "原来",
  },
  {
    hanzi: "原",
  },
  {
    hanzi: "原本",
  },
  {
    hanzi: "原文",
  },
  {
    hanzi: "原有",
  },
  {
    hanzi: "来源",
  },
  {
    hanzi: "源",
  },
  {
    hanzi: "能源",
  },
  {
    hanzi: "不同",
  },
  {
    hanzi: "同时",
  },
  {
    hanzi: "同情",
  },
  {
    hanzi: "爱情",
  },
  {
    hanzi: "不太",
  },
  {
    hanzi: "老太太",
  },
  {
    hanzi: "老头儿",
  },
  {
    hanzi: "愿意",
  },
  {
    hanzi: "愿",
  },
  {
    hanzi: "不愿",
  },
  {
    hanzi: "四川",
  },
  {
    hanzi: "点头",
  },
  {
    hanzi: "地点",
  },
  {
    hanzi: "重点",
  },
  {
    hanzi: "重新",
  },
  {
    hanzi: "里头",
  },
  {
    hanzi: "心里",
  },
  {
    hanzi: "心情",
  },
  {
    hanzi: "广州",
  },
  {
    hanzi: "州",
  },
  {
    hanzi: "贵州",
  },
  {
    hanzi: "洲",
  },
  {
    hanzi: "非洲",
  },
  {
    hanzi: "美洲",
  },
  {
    hanzi: "拉丁美洲",
  },
  {
    hanzi: "北美洲",
  },
  {
    hanzi: "南美洲",
  },
  {
    hanzi: "信心",
  },
  {
    hanzi: "自信",
  },
  {
    hanzi: "自然",
  },
  {
    hanzi: "大自然",
  },
  {
    hanzi: "然而",
  },
  {
    hanzi: "心中",
  },
  {
    hanzi: "其中",
  },
  {
    hanzi: "当中",
  },
  {
    hanzi: "中医",
  },
  {
    hanzi: "西医",
  },
  {
    hanzi: "放弃",
  },
  {
    hanzi: "教育",
  },
  {
    hanzi: "体育",
  },
  {
    hanzi: "发育",
  },
  {
    hanzi: "网球",
  },
  {
    hanzi: "足球",
  },
  {
    hanzi: "足够",
  },
  {
    hanzi: "不够",
  },
  {
    hanzi: "能够",
  },
  {
    hanzi: "能干",
  },
  {
    hanzi: "干活儿",
  },
  {
    hanzi: "干吗",
  },
  {
    hanzi: "只能",
  },
  {
    hanzi: "只要",
  },
  {
    hanzi: "充分",
  },
  {
    hanzi: "充电",
  },
  {
    hanzi: "流",
  },
  {
    hanzi: "交流",
  },
  {
    hanzi: "流行",
  },
  {
    hanzi: "主流",
  },
  {
    hanzi: "流感",
  },
  {
    hanzi: "流动",
  },
  {
    hanzi: "校园",
  },
  {
    hanzi: "校长",
  },
  {
    hanzi: "班长",
  },
  {
    hanzi: "家长",
  },
  {
    hanzi: "市长",
  },
  {
    hanzi: "院长",
  },
  {
    hanzi: "所长",
  },
  {
    hanzi: "系统",
  },
  {
    hanzi: "统一",
  },
  {
    hanzi: "统计",
  },
  {
    hanzi: "总统",
  },
  {
    hanzi: "齐",
  },
  {
    hanzi: "齐全",
  },
  {
    hanzi: "信用卡",
  },
  {
    hanzi: "银行卡",
  },
  {
    hanzi: "进行",
  },
  {
    hanzi: "卡车",
  },
  {
    hanzi: "骑车",
  },
  {
    hanzi: "车辆",
  },
  {
    hanzi: "停车",
  },
  {
    hanzi: "停止",
  },
  {
    hanzi: "公共",
  },
  {
    hanzi: "公共汽车",
  },
  {
    hanzi: "共同",
  },
  {
    hanzi: "经济",
  },
  {
    hanzi: "清",
  },
  {
    hanzi: "相同",
  },
  {
    hanzi: "相当",
  },
  {
    hanzi: "相关",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "精力",
  },
  {
    hanzi: "消息",
  },
  {
    hanzi: "取消",
  },
  {
    hanzi: "消化",
  },
  {
    hanzi: "对比",
  },
  {
    hanzi: "相比",
  },
  {
    hanzi: "比如说",
  },
  {
    hanzi: "小说",
  },
  {
    hanzi: "对方",
  },
  {
    hanzi: "方式",
  },
  {
    hanzi: "样式",
  },
  {
    hanzi: "方面",
  },
  {
    hanzi: "一方面",
  },
  {
    hanzi: "另一方面",
  },
  {
    hanzi: "方便面",
  },
  {
    hanzi: "治",
  },
  {
    hanzi: "治安",
  },
  {
    hanzi: "落",
  },
  {
    hanzi: "落实",
  },
  {
    hanzi: "落后",
  },
  {
    hanzi: "回落",
  },
  {
    hanzi: "北方",
  },
  {
    hanzi: "东方",
  },
  {
    hanzi: "西方",
  },
  {
    hanzi: "南方",
  },
  {
    hanzi: "东南",
  },
  {
    hanzi: "东北",
  },
  {
    hanzi: "西南",
  },
  {
    hanzi: "西北",
  },
  {
    hanzi: "露",
  },
  {
    hanzi: "露出",
  },
  {
    hanzi: "满",
  },
  {
    hanzi: "满足",
  },
  {
    hanzi: "满意",
  },
  {
    hanzi: "充满",
  },
  {
    hanzi: "不满",
  },
  {
    hanzi: "对手",
  },
  {
    hanzi: "对象",
  },
  {
    hanzi: "十分",
  },
  {
    hanzi: "千万",
  },
  {
    hanzi: "随着",
  },
  {
    hanzi: "酒",
  },
  {
    hanzi: "酒店",
  },
  {
    hanzi: "白酒",
  },
  {
    hanzi: "红酒",
  },
  {
    hanzi: "配",
  },
  {
    hanzi: "配合",
  },
  {
    hanzi: "分配",
  },
  {
    hanzi: "配备",
  },
  {
    hanzi: "醒",
  },
  {
    hanzi: "提醒",
  },
  {
    hanzi: "醒来",
  },
  {
    hanzi: "清醒",
  },
  {
    hanzi: "睡醒",
  },
  {
    hanzi: "感谢",
  },
  {
    hanzi: "首先",
  },
  {
    hanzi: "首都",
  },
  {
    hanzi: "尊重",
  },
  {
    hanzi: "自尊",
  },
  {
    hanzi: "自尊心",
  },
  {
    hanzi: "酷",
  },
  {
    hanzi: "酸",
  },
  {
    hanzi: "酸奶",
  },
  {
    hanzi: "心酸",
  },
  {
    hanzi: "反对",
  },
  {
    hanzi: "对话",
  },
  {
    hanzi: "笑话",
  },
  {
    hanzi: "面对",
  },
  {
    hanzi: "片面",
  },
  {
    hanzi: "波",
  },
  {
    hanzi: "波动",
  },
  {
    hanzi: "胡子",
  },
  {
    hanzi: "胡思乱想",
  },
  {
    hanzi: "胡乱",
  },
  {
    hanzi: "湖",
  },
  {
    hanzi: "湖南",
  },
  {
    hanzi: "江湖",
  },
  {
    hanzi: "面前",
  },
  {
    hanzi: "前往",
  },
  {
    hanzi: "前后",
  },
  {
    hanzi: "提前",
  },
  {
    hanzi: "永不",
  },
  {
    hanzi: "永远",
  },
  {
    hanzi: "动脉",
  },
  {
    hanzi: "承担",
  },
  {
    hanzi: "承认",
  },
  {
    hanzi: "承受",
  },
  {
    hanzi: "报名",
  },
  {
    hanzi: "名单",
  },
  {
    hanzi: "姓名",
  },
  {
    hanzi: "名片",
  },
  {
    hanzi: "图片",
  },
  {
    hanzi: "药片",
  },
  {
    hanzi: "药店",
  },
  {
    hanzi: "药水",
  },
  {
    hanzi: "影片",
  },
  {
    hanzi: "影视",
  },
  {
    hanzi: "电视台",
  },
  {
    hanzi: "重视",
  },
  {
    hanzi: "米兰",
  },
  {
    hanzi: "之",
  },
  {
    hanzi: "之后",
  },
  {
    hanzi: "之间",
  },
  {
    hanzi: "之前",
  },
  {
    hanzi: "之一",
  },
  {
    hanzi: "之中",
  },
  {
    hanzi: "之外",
  },
  {
    hanzi: "之下",
  },
  {
    hanzi: "之所以",
  },
  {
    hanzi: "之内",
  },
  {
    hanzi: "之上",
  },
  {
    hanzi: "百分之",
  },
  {
    hanzi: "不乏",
  },
  {
    hanzi: "乏力",
  },
  {
    hanzi: "主意",
  },
  {
    hanzi: "意见",
  },
  {
    hanzi: "得意",
  },
  {
    hanzi: "派",
  },
  {
    hanzi: "派出所",
  },
  {
    hanzi: "派出",
  },
  {
    hanzi: "游",
  },
  {
    hanzi: "游客",
  },
  {
    hanzi: "游泳",
  },
  {
    hanzi: "实施",
  },
  {
    hanzi: "施工",
  },
  {
    hanzi: "全面",
  },
  {
    hanzi: "表面",
  },
  {
    hanzi: "发表",
  },
  {
    hanzi: "表明",
  },
  {
    hanzi: "代表",
  },
  {
    hanzi: "家族",
  },
  {
    hanzi: "旅游",
  },
  {
    hanzi: "旅客",
  },
  {
    hanzi: "旅行",
  },
  {
    hanzi: "良好",
  },
  {
    hanzi: "不良",
  },
  {
    hanzi: "良",
  },
  {
    hanzi: "新浪",
  },
  {
    hanzi: "海浪",
  },
  {
    hanzi: "表现",
  },
  {
    hanzi: "体现",
  },
  {
    hanzi: "体会",
  },
  {
    hanzi: "会计",
  },
  {
    hanzi: "计算",
  },
  {
    hanzi: "新郎",
  },
  {
    hanzi: "新娘",
  },
  {
    hanzi: "娘",
  },
  {
    hanzi: "姑娘",
  },
  {
    hanzi: "大约",
  },
  {
    hanzi: "及时",
  },
  {
    hanzi: "准时",
  },
  {
    hanzi: "力气",
  },
  {
    hanzi: "气候",
  },
  {
    hanzi: "其次",
  },
  {
    hanzi: "沙",
  },
  {
    hanzi: "沙子",
  },
  {
    hanzi: "长沙",
  },
  {
    hanzi: "沙发",
  },
  {
    hanzi: "省",
  },
  {
    hanzi: "全省",
  },
  {
    hanzi: "广东省",
  },
  {
    hanzi: "眼",
  },
  {
    hanzi: "一眼",
  },
  {
    hanzi: "眼前",
  },
  {
    hanzi: "眼睛",
  },
  {
    hanzi: "沉",
  },
  {
    hanzi: "沉重",
  },
  {
    hanzi: "染",
  },
  {
    hanzi: "感染",
  },
  {
    hanzi: "现实",
  },
  {
    hanzi: "实现",
  },
  {
    hanzi: "实在",
  },
  {
    hanzi: "其余",
  },
  {
    hanzi: "除",
  },
  {
    hanzi: "除了",
  },
  {
    hanzi: "消除",
  },
  {
    hanzi: "切除",
  },
  {
    hanzi: "前途",
  },
  {
    hanzi: "旅途",
  },
  {
    hanzi: "用途",
  },
  {
    hanzi: "实用",
  },
  {
    hanzi: "使用",
  },
  {
    hanzi: "运用",
  },
  {
    hanzi: "作用",
  },
  {
    hanzi: "应用",
  },
  {
    hanzi: "应当",
  },
  {
    hanzi: "应付",
  },
  {
    hanzi: "支付",
  },
  {
    hanzi: "外汇",
  },
  {
    hanzi: "汇报",
  },
  {
    hanzi: "词汇",
  },
  {
    hanzi: "巨大",
  },
  {
    hanzi: "距",
  },
  {
    hanzi: "差距",
  },
  {
    hanzi: "涨",
  },
  {
    hanzi: "上涨",
  },
  {
    hanzi: "高涨",
  },
  {
    hanzi: "湾",
  },
  {
    hanzi: "台湾",
  },
  {
    hanzi: "海湾",
  },
  {
    hanzi: "引",
  },
  {
    hanzi: "引起",
  },
  {
    hanzi: "引进",
  },
  {
    hanzi: "引发",
  },
  {
    hanzi: "实习",
  },
  {
    hanzi: "果实",
  },
  {
    hanzi: "真实",
  },
  {
    hanzi: "真正",
  },
  {
    hanzi: "天真",
  },
  {
    hanzi: "天上",
  },
  {
    hanzi: "弹",
  },
  {
    hanzi: "反弹",
  },
  {
    hanzi: "子弹",
  },
  {
    hanzi: "淡",
  },
  {
    hanzi: "淡淡",
  },
  {
    hanzi: "淡化",
  },
  {
    hanzi: "清淡",
  },
  {
    hanzi: "润",
  },
  {
    hanzi: "渐渐",
  },
  {
    hanzi: "污染",
  },
  {
    hanzi: "污水",
  },
  {
    hanzi: "汗",
  },
  {
    hanzi: "汗水",
  },
  {
    hanzi: "出汗",
  },
  {
    hanzi: "平",
  },
  {
    hanzi: "水平",
  },
  {
    hanzi: "平方米",
  },
  {
    hanzi: "和平",
  },
  {
    hanzi: "平台",
  },
  {
    hanzi: "平时",
  },
  {
    hanzi: "平安",
  },
  {
    hanzi: "公平",
  },
  {
    hanzi: "平等",
  },
  {
    hanzi: "太平洋",
  },
  {
    hanzi: "平淡",
  },
  {
    hanzi: "平常",
  },
  {
    hanzi: "一路平安",
  },
  {
    hanzi: "幸运",
  },
  {
    hanzi: "不幸",
  },
  {
    hanzi: "幸好",
  },
  {
    hanzi: "赶",
  },
  {
    hanzi: "赶",
  },
  {
    hanzi: "赶来",
  },
  {
    hanzi: "赶快",
  },
  {
    hanzi: "赶到",
  },
  {
    hanzi: "超",
  },
  {
    hanzi: "超过",
  },
  {
    hanzi: "超越",
  },
  {
    hanzi: "超市",
  },
  {
    hanzi: "兴趣",
  },
  {
    hanzi: "有趣",
  },
  {
    hanzi: "感兴趣",
  },
  {
    hanzi: "乐趣",
  },
  {
    hanzi: "有兴趣",
  },
  {
    hanzi: "事实",
  },
  {
    hanzi: "事实上",
  },
  {
    hanzi: "好事",
  },
  {
    hanzi: "本事",
  },
  {
    hanzi: "本来",
  },
  {
    hanzi: "聚",
  },
  {
    hanzi: "聚会",
  },
  {
    hanzi: "聚在一起",
  },
  {
    hanzi: "果汁",
  },
  {
    hanzi: "泼",
  },
  {
    hanzi: "活泼",
  },
  {
    hanzi: "演",
  },
  {
    hanzi: "表演",
  },
  {
    hanzi: "演出",
  },
  {
    hanzi: "演员",
  },
  {
    hanzi: "演唱",
  },
  {
    hanzi: "演唱会",
  },
  {
    hanzi: "事件",
  },
  {
    hanzi: "条件",
  },
  {
    hanzi: "因此",
  },
  {
    hanzi: "日记",
  },
  {
    hanzi: "出差",
  },
  {
    hanzi: "勿",
  },
  {
    hanzi: "人物",
  },
  {
    hanzi: "动物",
  },
  {
    hanzi: "动物园",
  },
  {
    hanzi: "药物",
  },
  {
    hanzi: "生物",
  },
  {
    hanzi: "购物",
  },
  {
    hanzi: "植物",
  },
  {
    hanzi: "物品",
  },
  {
    hanzi: "文物",
  },
  {
    hanzi: "事物",
  },
  {
    hanzi: "交易",
  },
  {
    hanzi: "轻易",
  },
  {
    hanzi: "踢",
  },
  {
    hanzi: "踢球",
  },
  {
    hanzi: "汤",
  },
  {
    hanzi: "场",
  },
  {
    hanzi: "市场",
  },
  {
    hanzi: "现场",
  },
  {
    hanzi: "市场经济",
  },
  {
    hanzi: "广场",
  },
  {
    hanzi: "主场",
  },
  {
    hanzi: "半场",
  },
  {
    hanzi: "机场",
  },
  {
    hanzi: "场所",
  },
  {
    hanzi: "全场",
  },
  {
    hanzi: "客场",
  },
  {
    hanzi: "当场",
  },
  {
    hanzi: "场面",
  },
  {
    hanzi: "球场",
  },
  {
    hanzi: "体育场",
  },
  {
    hanzi: "停车场",
  },
  {
    hanzi: "场合",
  },
  {
    hanzi: "现象",
  },
  {
    hanzi: "想象",
  },
  {
    hanzi: "现代",
  },
  {
    hanzi: "近代",
  },
  {
    hanzi: "古代",
  },
  {
    hanzi: "发扬",
  },
  {
    hanzi: "表扬",
  },
  {
    hanzi: "支持",
  },
  {
    hanzi: "持有",
  },
  {
    hanzi: "主持",
  },
  {
    hanzi: "主持人",
  },
  {
    hanzi: "待",
  },
  {
    hanzi: "期待",
  },
  {
    hanzi: "等待",
  },
  {
    hanzi: "对待",
  },
  {
    hanzi: "接待",
  },
  {
    hanzi: "年代",
  },
  {
    hanzi: "少年",
  },
  {
    hanzi: "青年",
  },
  {
    hanzi: "青少年",
  },
  {
    hanzi: "中年",
  },
  {
    hanzi: "老年",
  },
  {
    hanzi: "前年",
  },
  {
    hanzi: "后年",
  },
  {
    hanzi: "过年",
  },
  {
    hanzi: "周年",
  },
  {
    hanzi: "上周",
  },
  {
    hanzi: "下周",
  },
  {
    hanzi: "全年",
  },
  {
    hanzi: "特征",
  },
  {
    hanzi: "微笑",
  },
  {
    hanzi: "微软",
  },
  {
    hanzi: "微微",
  },
  {
    hanzi: "微信",
  },
  {
    hanzi: "据",
  },
  {
    hanzi: "根据",
  },
  {
    hanzi: "数据",
  },
  {
    hanzi: "据说",
  },
  {
    hanzi: "占据",
  },
  {
    hanzi: "投",
  },
  {
    hanzi: "投入",
  },
  {
    hanzi: "投票",
  },
  {
    hanzi: "投诉",
  },
  {
    hanzi: "指",
  },
  {
    hanzi: "指出",
  },
  {
    hanzi: "指数",
  },
  {
    hanzi: "指示",
  },
  {
    hanzi: "手指",
  },
  {
    hanzi: "指定",
  },
  {
    hanzi: "龙",
  },
  {
    hanzi: "全国",
  },
  {
    hanzi: "回国",
  },
  {
    hanzi: "全家",
  },
  {
    hanzi: "全身",
  },
  {
    hanzi: "全体",
  },
  {
    hanzi: "全球",
  },
  {
    hanzi: "技能",
  },
  {
    hanzi: "鼓",
  },
  {
    hanzi: "护照",
  },
  {
    hanzi: "护士",
  },
  {
    hanzi: "扁",
  },
  {
    hanzi: "扁平",
  },
  {
    hanzi: "编",
  },
  {
    hanzi: "偏",
  },
  {
    hanzi: "偏偏",
  },
  {
    hanzi: "遍",
  },
  {
    hanzi: "遍地",
  },
  {
    hanzi: "篇",
  },
  {
    hanzi: "骗",
  },
  {
    hanzi: "骗子",
  },
  {
    hanzi: "骗人",
  },
  {
    hanzi: "时代",
  },
  {
    hanzi: "时差",
  },
  {
    hanzi: "时期",
  },
  {
    hanzi: "学期",
  },
  {
    hanzi: "长期",
  },
  {
    hanzi: "短期",
  },
  {
    hanzi: "定期",
  },
  {
    hanzi: "近期",
  },
  {
    hanzi: "期间",
  },
  {
    hanzi: "过期",
  },
  {
    hanzi: "日期",
  },
  {
    hanzi: "按",
  },
  {
    hanzi: "按照",
  },
  {
    hanzi: "按时",
  },
  {
    hanzi: "招",
  },
  {
    hanzi: "招生",
  },
  {
    hanzi: "包括",
  },
  {
    hanzi: "日常",
  },
  {
    hanzi: "常识",
  },
  {
    hanzi: "常见",
  },
  {
    hanzi: "常用",
  },
  {
    hanzi: "往往",
  },
  {
    hanzi: "照常",
  },
  {
    hanzi: "执照",
  },
  {
    hanzi: "难道",
  },
  {
    hanzi: "掉",
  },
  {
    hanzi: "吃掉",
  },
  {
    hanzi: "丢掉",
  },
  {
    hanzi: "去掉",
  },
  {
    hanzi: "忘掉",
  },
  {
    hanzi: "掉下来",
  },
  {
    hanzi: "托",
  },
  {
    hanzi: "托运",
  },
  {
    hanzi: "发挥",
  },
  {
    hanzi: "指挥",
  },
  {
    hanzi: "挥",
  },
  {
    hanzi: "损",
  },
  {
    hanzi: "损坏",
  },
  {
    hanzi: "折",
  },
  {
    hanzi: "打折",
  },
  {
    hanzi: "爪子",
  },
  {
    hanzi: "抓",
  },
  {
    hanzi: "抓住",
  },
  {
    hanzi: "抓好",
  },
  {
    hanzi: "老百姓",
  },
  {
    hanzi: "老朋友",
  },
  {
    hanzi: "老是",
  },
  {
    hanzi: "西瓜",
  },
  {
    hanzi: "木瓜",
  },
  {
    hanzi: "南瓜",
  },
  {
    hanzi: "瓜子",
  },
  {
    hanzi: "冬瓜",
  },
  {
    hanzi: "苦瓜",
  },
  {
    hanzi: "爬",
  },
  {
    hanzi: "爬山",
  },
  {
    hanzi: "爬行",
  },
  {
    hanzi: "拥有",
  },
  {
    hanzi: "花生",
  },
  {
    hanzi: "出生",
  },
  {
    hanzi: "生意",
  },
  {
    hanzi: "生长",
  },
  {
    hanzi: "生动",
  },
  {
    hanzi: "生词",
  },
  {
    hanzi: "词语",
  },
  {
    hanzi: "抢",
  },
  {
    hanzi: "抢救",
  },
  {
    hanzi: "抢手",
  },
  {
    hanzi: "探",
  },
  {
    hanzi: "试探",
  },
  {
    hanzi: "探讨",
  },
  {
    hanzi: "挑",
  },
  {
    hanzi: "跳",
  },
  {
    hanzi: "心跳",
  },
  {
    hanzi: "跳高",
  },
  {
    hanzi: "跳远",
  },
  {
    hanzi: "逃",
  },
  {
    hanzi: "逃跑",
  },
  {
    hanzi: "一生",
  },
  {
    hanzi: "人生",
  },
  {
    hanzi: "行人",
  },
  {
    hanzi: "飞行",
  },
  {
    hanzi: "实行",
  },
  {
    hanzi: "扩大",
  },
  {
    hanzi: "扩张",
  },
  {
    hanzi: "批",
  },
  {
    hanzi: "一批",
  },
  {
    hanzi: "批准",
  },
  {
    hanzi: "混",
  },
  {
    hanzi: "混乱",
  },
  {
    hanzi: "混合",
  },
  {
    hanzi: "完毕",
  },
  {
    hanzi: "措施",
  },
  {
    hanzi: "不知所措",
  },
  {
    hanzi: "发展",
  },
  {
    hanzi: "开展",
  },
  {
    hanzi: "展开",
  },
  {
    hanzi: "展示",
  },
  {
    hanzi: "进展",
  },
  {
    hanzi: "展现",
  },
  {
    hanzi: "行动",
  },
  {
    hanzi: "带动",
  },
  {
    hanzi: "推动",
  },
  {
    hanzi: "动力",
  },
  {
    hanzi: "实力",
  },
  {
    hanzi: "动人",
  },
  {
    hanzi: "发动",
  },
  {
    hanzi: "教授",
  },
  {
    hanzi: "延长",
  },
  {
    hanzi: "延期",
  },
  {
    hanzi: "挺",
  },
  {
    hanzi: "挺好",
  },
  {
    hanzi: "挺身而出",
  },
  {
    hanzi: "家庭",
  },
  {
    hanzi: "法庭",
  },
  {
    hanzi: "主动",
  },
  {
    hanzi: "主张",
  },
  {
    hanzi: "抱",
  },
  {
    hanzi: "拥抱",
  },
  {
    hanzi: "干扰",
  },
  {
    hanzi: "打扰",
  },
  {
    hanzi: "扰乱",
  },
  {
    hanzi: "抬",
  },
  {
    hanzi: "抬头",
  },
  {
    hanzi: "抬起",
  },
  {
    hanzi: "抬高",
  },
  {
    hanzi: "抬不起头",
  },
  {
    hanzi: "扮",
  },
  {
    hanzi: "扮演",
  },
  {
    hanzi: "打扮",
  },
  {
    hanzi: "粉",
  },
  {
    hanzi: "奶粉",
  },
  {
    hanzi: "收拾",
  },
  {
    hanzi: "主人",
  },
  {
    hanzi: "主题",
  },
  {
    hanzi: "主任",
  },
  {
    hanzi: "担任",
  },
  {
    hanzi: "任务",
  },
  {
    hanzi: "技术",
  },
  {
    hanzi: "手术",
  },
  {
    hanzi: "学术",
  },
  {
    hanzi: "美术",
  },
  {
    hanzi: "风格",
  },
  {
    hanzi: "合格",
  },
  {
    hanzi: "表格",
  },
  {
    hanzi: "标准",
  },
  {
    hanzi: "目标",
  },
  {
    hanzi: "指标",
  },
  {
    hanzi: "标题",
  },
  {
    hanzi: "直接",
  },
  {
    hanzi: "简直",
  },
  {
    hanzi: "禁止",
  },
  {
    hanzi: "不禁",
  },
  {
    hanzi: "国际",
  },
  {
    hanzi: "实际",
  },
  {
    hanzi: "实际上",
  },
  {
    hanzi: "之际",
  },
  {
    hanzi: "梦",
  },
  {
    hanzi: "梦想",
  },
  {
    hanzi: "做梦",
  },
  {
    hanzi: "麻烦",
  },
  {
    hanzi: "摩托车",
  },
  {
    hanzi: "清楚",
  },
  {
    hanzi: "蛋",
  },
  {
    hanzi: "蛋白",
  },
  {
    hanzi: "森林",
  },
  {
    hanzi: "查",
  },
  {
    hanzi: "查看",
  },
  {
    hanzi: "集",
  },
  {
    hanzi: "集中",
  },
  {
    hanzi: "集体",
  },
  {
    hanzi: "收集",
  },
  {
    hanzi: "直到",
  },
  {
    hanzi: "等到",
  },
  {
    hanzi: "送到",
  },
  {
    hanzi: "送给",
  },
  {
    hanzi: "发送",
  },
  {
    hanzi: "提到",
  },
  {
    hanzi: "想到",
  },
  {
    hanzi: "做到",
  },
  {
    hanzi: "放到",
  },
  {
    hanzi: "见到",
  },
  {
    hanzi: "见过",
  },
  {
    hanzi: "拿到",
  },
  {
    hanzi: "接到",
  },
  {
    hanzi: "案",
  },
  {
    hanzi: "方案",
  },
  {
    hanzi: "案件",
  },
  {
    hanzi: "草案",
  },
  {
    hanzi: "未",
  },
  {
    hanzi: "未来",
  },
  {
    hanzi: "未能",
  },
  {
    hanzi: "从未",
  },
  {
    hanzi: "意味着",
  },
  {
    hanzi: "味道",
  },
  {
    hanzi: "口味",
  },
  {
    hanzi: "美味",
  },
  {
    hanzi: "妹妹",
  },
  {
    hanzi: "姐妹",
  },
  {
    hanzi: "兄妹",
  },
  {
    hanzi: "兄弟姐妹",
  },
  {
    hanzi: "根",
  },
  {
    hanzi: "根本",
  },
  {
    hanzi: "极",
  },
  {
    hanzi: "极大",
  },
  {
    hanzi: "极为",
  },
  {
    hanzi: "极了",
  },
  {
    hanzi: "勾",
  },
  {
    hanzi: "机构",
  },
  {
    hanzi: "构成",
  },
  {
    hanzi: "购买",
  },
  {
    hanzi: "收购",
  },
  {
    hanzi: "采购",
  },
  {
    hanzi: "沟",
  },
  {
    hanzi: "接着",
  },
  {
    hanzi: "接下来",
  },
  {
    hanzi: "村",
  },
  {
    hanzi: "树",
  },
  {
    hanzi: "树立",
  },
  {
    hanzi: "树木",
  },
  {
    hanzi: "老板",
  },
  {
    hanzi: "板块",
  },
  {
    hanzi: "黑板",
  },
  {
    hanzi: "白板",
  },
  {
    hanzi: "版",
  },
  {
    hanzi: "出版",
  },
  {
    hanzi: "版本",
  },
  {
    hanzi: "教材",
  },
  {
    hanzi: "身材",
  },
  {
    hanzi: "分析",
  },
  {
    hanzi: "约束",
  },
  {
    hanzi: "整",
  },
  {
    hanzi: "整个",
  },
  {
    hanzi: "整体",
  },
  {
    hanzi: "完整",
  },
  {
    hanzi: "整合",
  },
  {
    hanzi: "整治",
  },
  {
    hanzi: "整齐",
  },
  {
    hanzi: "整天",
  },
  {
    hanzi: "整整",
  },
  {
    hanzi: "辛苦",
  },
  {
    hanzi: "辛酸",
  },
  {
    hanzi: "千辛万苦",
  },
  {
    hanzi: "辣",
  },
  {
    hanzi: "麻辣",
  },
  {
    hanzi: "毒辣",
  },
  {
    hanzi: "辛辣",
  },
  {
    hanzi: "道路",
  },
  {
    hanzi: "路边",
  },
  {
    hanzi: "问路",
  },
  {
    hanzi: "公路",
  },
  {
    hanzi: "核心",
  },
  {
    hanzi: "刻",
  },
  {
    hanzi: "时刻",
  },
  {
    hanzi: "立刻",
  },
  {
    hanzi: "深刻",
  },
  {
    hanzi: "一刻",
  },
  {
    hanzi: "咳嗽",
  },
  {
    hanzi: "松",
  },
  {
    hanzi: "轻松",
  },
  {
    hanzi: "放松",
  },
  {
    hanzi: "吵架",
  },
  {
    hanzi: "打架",
  },
  {
    hanzi: "书架",
  },
  {
    hanzi: "衣架",
  },
  {
    hanzi: "枪",
  },
  {
    hanzi: "手枪",
  },
  {
    hanzi: "开枪",
  },
  {
    hanzi: "档案",
  },
  {
    hanzi: "高档",
  },
  {
    hanzi: "档次",
  },
  {
    hanzi: "光",
  },
  {
    hanzi: "目光",
  },
  {
    hanzi: "时光",
  },
  {
    hanzi: "不光",
  },
  {
    hanzi: "光明",
  },
  {
    hanzi: "电梯",
  },
  {
    hanzi: "楼梯",
  },
  {
    hanzi: "公主",
  },
  {
    hanzi: "外公",
  },
  {
    hanzi: "公元",
  },
  {
    hanzi: "朵",
  },
  {
    hanzi: "耳朵",
  },
  {
    hanzi: "花朵",
  },
  {
    hanzi: "棵",
  },
  {
    hanzi: "西红柿",
  },
  {
    hanzi: "柿子",
  },
  {
    hanzi: "橡皮",
  },
  {
    hanzi: "种植",
  },
  {
    hanzi: "单元",
  },
  {
    hanzi: "美元",
  },
  {
    hanzi: "美好",
  },
  {
    hanzi: "单位",
  },
  {
    hanzi: "地位",
  },
  {
    hanzi: "元旦",
  },
  {
    hanzi: "一旦",
  },
  {
    hanzi: "置",
  },
  {
    hanzi: "位置",
  },
  {
    hanzi: "配置",
  },
  {
    hanzi: "值",
  },
  {
    hanzi: "值得",
  },
  {
    hanzi: "罗",
  },
  {
    hanzi: "罗马",
  },
  {
    hanzi: "保",
  },
  {
    hanzi: "保护",
  },
  {
    hanzi: "保持",
  },
  {
    hanzi: "担保",
  },
  {
    hanzi: "保安",
  },
  {
    hanzi: "价",
  },
  {
    hanzi: "价格",
  },
  {
    hanzi: "价值",
  },
  {
    hanzi: "房价",
  },
  {
    hanzi: "代价",
  },
  {
    hanzi: "抬价",
  },
  {
    hanzi: "涨价",
  },
  {
    hanzi: "价钱",
  },
  {
    hanzi: "票价",
  },
  {
    hanzi: "请教",
  },
  {
    hanzi: "教师",
  },
  {
    hanzi: "教学",
  },
  {
    hanzi: "开学",
  },
  {
    hanzi: "公开",
  },
  {
    hanzi: "界",
  },
  {
    hanzi: "外界",
  },
  {
    hanzi: "养",
  },
  {
    hanzi: "养成",
  },
  {
    hanzi: "阶",
  },
  {
    hanzi: "台阶",
  },
  {
    hanzi: "专",
  },
  {
    hanzi: "专门",
  },
  {
    hanzi: "专家",
  },
  {
    hanzi: "专用",
  },
  {
    hanzi: "专题",
  },
  {
    hanzi: "传",
  },
  {
    hanzi: "传说",
  },
  {
    hanzi: "传来",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传统",
  },
  {
    hanzi: "传染病",
  },
  {
    hanzi: "传染",
  },
  {
    hanzi: "传授",
  },
  {
    hanzi: "转",
  },
  {
    hanzi: "转发",
  },
  {
    hanzi: "转变",
  },
  {
    hanzi: "转让",
  },
  {
    hanzi: "转化",
  },
  {
    hanzi: "转身",
  },
  {
    hanzi: "右转",
  },
  {
    hanzi: "左转",
  },
  {
    hanzi: "何",
  },
  {
    hanzi: "如何",
  },
  {
    hanzi: "任何",
  },
  {
    hanzi: "为何",
  },
  {
    hanzi: "供",
  },
  {
    hanzi: "提供",
  },
  {
    hanzi: "供应",
  },
  {
    hanzi: "港",
  },
  {
    hanzi: "香港",
  },
  {
    hanzi: "暴",
  },
  {
    hanzi: "暴力",
  },
  {
    hanzi: "暴露",
  },
  {
    hanzi: "风暴",
  },
  {
    hanzi: "暴雨",
  },
  {
    hanzi: "开放",
  },
  {
    hanzi: "开水",
  },
  {
    hanzi: "召开",
  },
  {
    hanzi: "解开",
  },
  {
    hanzi: "推开",
  },
  {
    hanzi: "走开",
  },
  {
    hanzi: "走进",
  },
  {
    hanzi: "走过",
  },
  {
    hanzi: "爆",
  },
  {
    hanzi: "爆发",
  },
  {
    hanzi: "伤",
  },
  {
    hanzi: "受伤",
  },
  {
    hanzi: "损伤",
  },
  {
    hanzi: "伤心",
  },
  {
    hanzi: "优",
  },
  {
    hanzi: "优化",
  },
  {
    hanzi: "优先",
  },
  {
    hanzi: "优点",
  },
  {
    hanzi: "仅",
  },
  {
    hanzi: "不仅",
  },
  {
    hanzi: "仅仅",
  },
  {
    hanzi: "不仅仅",
  },
  {
    hanzi: "夜",
  },
  {
    hanzi: "夜间",
  },
  {
    hanzi: "半夜",
  },
  {
    hanzi: "夜晚",
  },
  {
    hanzi: "深夜",
  },
  {
    hanzi: "夜里",
  },
  {
    hanzi: "液",
  },
  {
    hanzi: "洗手液",
  },
  {
    hanzi: "液体",
  },
  {
    hanzi: "依",
  },
  {
    hanzi: "依然",
  },
  {
    hanzi: "依法",
  },
  {
    hanzi: "依旧",
  },
  {
    hanzi: "依据",
  },
  {
    hanzi: "假",
  },
  {
    hanzi: "放假",
  },
  {
    hanzi: "假如",
  },
  {
    hanzi: "假期",
  },
  {
    hanzi: "请假",
  },
  {
    hanzi: "休假",
  },
  {
    hanzi: "倒",
  },
  {
    hanzi: "倒是",
  },
  {
    hanzi: "致",
  },
  {
    hanzi: "一致",
  },
  {
    hanzi: "开发",
  },
  {
    hanzi: "发言",
  },
  {
    hanzi: "发票",
  },
  {
    hanzi: "支票",
  },
  {
    hanzi: "室",
  },
  {
    hanzi: "办公室",
  },
  {
    hanzi: "室内",
  },
  {
    hanzi: "教室",
  },
  {
    hanzi: "屋",
  },
  {
    hanzi: "房屋",
  },
  {
    hanzi: "屋子",
  },
  {
    hanzi: "似",
  },
  {
    hanzi: "似的",
  },
  {
    hanzi: "相似",
  },
  {
    hanzi: "仍",
  },
  {
    hanzi: "仍然",
  },
  {
    hanzi: "仍在",
  },
  {
    hanzi: "促进",
  },
  {
    hanzi: "促使",
  },
  {
    hanzi: "家伙",
  },
  {
    hanzi: "合伙",
  },
  {
    hanzi: "小伙子",
  },
  {
    hanzi: "伴",
  },
  {
    hanzi: "伙伴",
  },
  {
    hanzi: "估计",
  },
  {
    hanzi: "低估",
  },
  {
    hanzi: "估算",
  },
  {
    hanzi: "估价",
  },
  {
    hanzi: "高估",
  },
  {
    hanzi: "倍",
  },
  {
    hanzi: "加倍",
  },
  {
    hanzi: "俩",
  },
  {
    hanzi: "我俩",
  },
  {
    hanzi: "我们俩",
  },
  {
    hanzi: "你们俩",
  },
  {
    hanzi: "他们俩",
  },
  {
    hanzi: "伪",
  },
  {
    hanzi: "伊",
  },
  {
    hanzi: "伊",
  },
  {
    hanzi: "争",
  },
  {
    hanzi: "争取",
  },
  {
    hanzi: "静",
  },
  {
    hanzi: "平静",
  },
  {
    hanzi: "安静",
  },
  {
    hanzi: "冷静",
  },
  {
    hanzi: "静脉",
  },
  {
    hanzi: "净",
  },
  {
    hanzi: "干净",
  },
  {
    hanzi: "减",
  },
  {
    hanzi: "减少",
  },
  {
    hanzi: "减轻",
  },
  {
    hanzi: "一律",
  },
  {
    hanzi: "法律",
  },
  {
    hanzi: "律师",
  },
  {
    hanzi: "千篇一律",
  },
  {
    hanzi: "建",
  },
  {
    hanzi: "建立",
  },
  {
    hanzi: "建成",
  },
  {
    hanzi: "构建",
  },
  {
    hanzi: "健",
  },
  {
    hanzi: "健康",
  },
  {
    hanzi: "健全",
  },
  {
    hanzi: "保健",
  },
  {
    hanzi: "健身",
  },
  {
    hanzi: "君",
  },
  {
    hanzi: "君子",
  },
  {
    hanzi: "群",
  },
  {
    hanzi: "人群",
  },
  {
    hanzi: "群体",
  },
  {
    hanzi: "一群",
  },
  {
    hanzi: "向",
  },
  {
    hanzi: "方向",
  },
  {
    hanzi: "走向",
  },
  {
    hanzi: "面向",
  },
  {
    hanzi: "向上",
  },
  {
    hanzi: "向前",
  },
  {
    hanzi: "响",
  },
  {
    hanzi: "影响",
  },
  {
    hanzi: "影响力",
  },
  {
    hanzi: "尚",
  },
  {
    hanzi: "时尚",
  },
  {
    hanzi: "尚未",
  },
  {
    hanzi: "躺",
  },
  {
    hanzi: "躺下",
  },
  {
    hanzi: "躺椅",
  },
  {
    hanzi: "趟",
  },
  {
    hanzi: "品",
  },
  {
    hanzi: "作品",
  },
  {
    hanzi: "品种",
  },
  {
    hanzi: "药品",
  },
  {
    hanzi: "精品",
  },
  {
    hanzi: "正品",
  },
  {
    hanzi: "噪音",
  },
  {
    hanzi: "发明",
  },
  {
    hanzi: "明星",
  },
  {
    hanzi: "星星",
  },
  {
    hanzi: "文明",
  },
  {
    hanzi: "操",
  },
  {
    hanzi: "操场",
  },
  {
    hanzi: "操作",
  },
  {
    hanzi: "洗澡",
  },
  {
    hanzi: "器",
  },
  {
    hanzi: "机器",
  },
  {
    hanzi: "突然",
  },
  {
    hanzi: "突出",
  },
  {
    hanzi: "曾",
  },
  {
    hanzi: "曾经",
  },
  {
    hanzi: "增",
  },
  {
    hanzi: "增加",
  },
  {
    hanzi: "增长",
  },
  {
    hanzi: "增强",
  },
  {
    hanzi: "新增",
  },
  {
    hanzi: "增多",
  },
  {
    hanzi: "号",
    hskLevels: 1,
  },
  {
    hanzi: "信号",
  },
  {
    hanzi: "亏",
  },
  {
    hanzi: "亏损",
  },
  {
    hanzi: "吃亏",
  },
  {
    hanzi: "幸亏",
  },
  {
    hanzi: "多亏",
  },
  {
    hanzi: "考",
  },
  {
    hanzi: "考试",
  },
  {
    hanzi: "考生",
  },
  {
    hanzi: "思考",
  },
  {
    hanzi: "高考",
  },
  {
    hanzi: "考核",
  },
  {
    hanzi: "声明",
  },
  {
    hanzi: "歌声",
  },
  {
    hanzi: "小吃",
  },
  {
    hanzi: "小声",
  },
  {
    hanzi: "大声",
  },
  {
    hanzi: "巧",
  },
  {
    hanzi: "技巧",
  },
  {
    hanzi: "巧合",
  },
  {
    hanzi: "轻巧",
  },
  {
    hanzi: "花言巧语",
  },
  {
    hanzi: "投机取巧",
  },
  {
    hanzi: "由",
  },
  {
    hanzi: "自由",
  },
  {
    hanzi: "由此",
  },
  {
    hanzi: "不由",
  },
  {
    hanzi: "不由得",
  },
  {
    hanzi: "由此可见",
  },
  {
    hanzi: "不由自主",
  },
  {
    hanzi: "自由化",
  },
  {
    hanzi: "路由器",
  },
  {
    hanzi: "经由",
  },
  {
    hanzi: "油",
  },
  {
    hanzi: "加油",
  },
  {
    hanzi: "加油站",
  },
  {
    hanzi: "石油",
  },
  {
    hanzi: "原油",
  },
  {
    hanzi: "聘",
  },
  {
    hanzi: "招聘",
  },
  {
    hanzi: "聘请",
  },
  {
    hanzi: "应聘",
  },
  {
    hanzi: "抽",
  },
  {
    hanzi: "黄",
  },
  {
    hanzi: "黄金",
  },
  {
    hanzi: "黄色",
  },
  {
    hanzi: "黄河",
  },
  {
    hanzi: "黄瓜",
  },
  {
    hanzi: "害",
  },
  {
    hanzi: "伤害",
  },
  {
    hanzi: "害怕",
  },
  {
    hanzi: "损害",
  },
  {
    hanzi: "拜",
  },
  {
    hanzi: "拜拜",
  },
  {
    hanzi: "拜年",
  },
  {
    hanzi: "拜托",
  },
  {
    hanzi: "峰",
  },
  {
    hanzi: "高峰",
  },
  {
    hanzi: "是否",
  },
  {
    hanzi: "能否",
  },
  {
    hanzi: "否认",
  },
  {
    hanzi: "否定",
  },
  {
    hanzi: "文件",
  },
  {
    hanzi: "硬件",
  },
  {
    hanzi: "软件",
  },
  {
    hanzi: "舍不得",
  },
  {
    hanzi: "舍得",
  },
  {
    hanzi: "哈哈",
  },
  {
    hanzi: "哈",
  },
  {
    hanzi: "哈哈哈",
  },
  {
    hanzi: "命",
  },
  {
    hanzi: "生命",
  },
  {
    hanzi: "命运",
  },
  {
    hanzi: "命令",
  },
  {
    hanzi: "善",
  },
  {
    hanzi: "完善",
  },
  {
    hanzi: "改善",
  },
  {
    hanzi: "善良",
  },
  {
    hanzi: "吉",
  },
  {
    hanzi: "叶",
  },
  {
    hanzi: "茶叶",
  },
  {
    hanzi: "叶子",
  },
  {
    hanzi: "树叶",
  },
  {
    hanzi: "吸",
  },
  {
    hanzi: "吸引",
  },
  {
    hanzi: "吸收",
  },
  {
    hanzi: "于",
  },
  {
    hanzi: "由于",
  },
  {
    hanzi: "对于",
  },
  {
    hanzi: "关于",
  },
  {
    hanzi: "于是",
  },
  {
    hanzi: "位于",
  },
  {
    hanzi: "在于",
  },
  {
    hanzi: "用于",
  },
  {
    hanzi: "至于",
  },
  {
    hanzi: "低于",
  },
  {
    hanzi: "高于",
  },
  {
    hanzi: "等于",
  },
  {
    hanzi: "相当于",
  },
  {
    hanzi: "过于",
  },
  {
    hanzi: "善于",
  },
  {
    hanzi: "几乎",
  },
  {
    hanzi: "似乎",
  },
  {
    hanzi: "在乎",
  },
  {
    hanzi: "呼吸",
  },
  {
    hanzi: "招呼",
  },
  {
    hanzi: "打招呼",
  },
  {
    hanzi: "文字",
  },
  {
    hanzi: "字母",
  },
  {
    hanzi: "文学",
  },
  {
    hanzi: "呀",
  },
  {
    hanzi: "含",
  },
  {
    hanzi: "含有",
  },
  {
    hanzi: "包含",
  },
  {
    hanzi: "嘴",
  },
  {
    hanzi: "嘴巴",
  },
  {
    hanzi: "确定",
  },
  {
    hanzi: "明确",
  },
  {
    hanzi: "确实",
  },
  {
    hanzi: "正确",
  },
  {
    hanzi: "确保",
  },
  {
    hanzi: "的确",
  },
  {
    hanzi: "准确",
  },
  {
    hanzi: "确认",
  },
  {
    hanzi: "售",
  },
  {
    hanzi: "出售",
  },
  {
    hanzi: "售价",
  },
  {
    hanzi: "啦",
  },
  {
    hanzi: "咱",
  },
  {
    hanzi: "咱们",
  },
  {
    hanzi: "咱俩",
  },
  {
    hanzi: "哦",
  },
  {
    hanzi: "咖啡",
  },
  {
    hanzi: "学问",
  },
  {
    hanzi: "问候",
  },
  {
    hanzi: "提问",
  },
  {
    hanzi: "排",
  },
  {
    hanzi: "排名",
  },
  {
    hanzi: "排除",
  },
  {
    hanzi: "安排",
  },
  {
    hanzi: "排球",
  },
  {
    hanzi: "罪",
  },
  {
    hanzi: "靠",
  },
  {
    hanzi: "依靠",
  },
  {
    hanzi: "可靠",
  },
  {
    hanzi: "喝",
    hskLevels: 1,
  },
  {
    hanzi: "喝酒",
  },
  {
    hanzi: "渴",
  },
  {
    hanzi: "渴求",
  },
  {
    hanzi: "口渴",
  },
  {
    hanzi: "歇",
  },
  {
    hanzi: "结",
  },
  {
    hanzi: "结果",
  },
  {
    hanzi: "结束",
  },
  {
    hanzi: "结构",
  },
  {
    hanzi: "结合",
  },
  {
    hanzi: "总结",
  },
  {
    hanzi: "纠结",
  },
  {
    hanzi: "结实",
  },
  {
    hanzi: "组",
  },
  {
    hanzi: "组成",
  },
  {
    hanzi: "小组",
  },
  {
    hanzi: "组合",
  },
  {
    hanzi: "重组",
  },
  {
    hanzi: "组建",
  },
  {
    hanzi: "组长",
  },
  {
    hanzi: "分组",
  },
  {
    hanzi: "具",
  },
  {
    hanzi: "具有",
  },
  {
    hanzi: "具体",
  },
  {
    hanzi: "具备",
  },
  {
    hanzi: "工具",
  },
  {
    hanzi: "家具",
  },
  {
    hanzi: "玩具",
  },
  {
    hanzi: "惧",
  },
  {
    hanzi: "化学",
  },
  {
    hanzi: "作家",
  },
  {
    hanzi: "作者",
  },
  {
    hanzi: "读者",
  },
  {
    hanzi: "读音",
  },
  {
    hanzi: "音乐会",
  },
  {
    hanzi: "收音机",
  },
  {
    hanzi: "线",
  },
  {
    hanzi: "路线",
  },
  {
    hanzi: "在线",
  },
  {
    hanzi: "线路",
  },
  {
    hanzi: "热线",
  },
  {
    hanzi: "占线",
  },
  {
    hanzi: "级",
  },
  {
    hanzi: "各级",
  },
  {
    hanzi: "高级",
  },
  {
    hanzi: "超级",
  },
  {
    hanzi: "等级",
  },
  {
    hanzi: "年级",
  },
  {
    hanzi: "中级",
  },
  {
    hanzi: "班级",
  },
  {
    hanzi: "持续",
  },
  {
    hanzi: "连续",
  },
  {
    hanzi: "手续",
  },
  {
    hanzi: "延续",
  },
  {
    hanzi: "组织",
  },
  {
    hanzi: "职",
  },
  {
    hanzi: "职工",
  },
  {
    hanzi: "职能",
  },
  {
    hanzi: "职务",
  },
  {
    hanzi: "终",
  },
  {
    hanzi: "终于",
  },
  {
    hanzi: "最终",
  },
  {
    hanzi: "始终",
  },
  {
    hanzi: "细",
  },
  {
    hanzi: "维",
  },
  {
    hanzi: "维护",
  },
  {
    hanzi: "维持",
  },
  {
    hanzi: "思维",
  },
  {
    hanzi: "维生素",
  },
  {
    hanzi: "焦点",
  },
  {
    hanzi: "香蕉",
  },
  {
    hanzi: "开机",
  },
  {
    hanzi: "关机",
  },
  {
    hanzi: "相机",
  },
  {
    hanzi: "照相",
  },
  {
    hanzi: "计算机",
  },
  {
    hanzi: "洗衣机",
  },
  {
    hanzi: "上衣",
  },
  {
    hanzi: "熊",
  },
  {
    hanzi: "熊猫",
  },
  {
    hanzi: "小熊",
  },
  {
    hanzi: "继",
  },
  {
    hanzi: "继续",
  },
  {
    hanzi: "世",
  },
  {
    hanzi: "世界",
  },
  {
    hanzi: "世界杯",
  },
  {
    hanzi: "全世界",
  },
  {
    hanzi: "去世",
  },
  {
    hanzi: "绝",
  },
  {
    hanzi: "绝对",
  },
  {
    hanzi: "绝不",
  },
  {
    hanzi: "负",
  },
  {
    hanzi: "负担",
  },
  {
    hanzi: "赖",
  },
  {
    hanzi: "依赖",
  },
  {
    hanzi: "信赖",
  },
  {
    hanzi: "懒",
  },
  {
    hanzi: "懒得",
  },
  {
    hanzi: "懒洋洋",
  },
  {
    hanzi: "世纪",
  },
  {
    hanzi: "年纪",
  },
  {
    hanzi: "练",
  },
  {
    hanzi: "教练",
  },
  {
    hanzi: "主教练",
  },
  {
    hanzi: "练习",
  },
  {
    hanzi: "纳",
  },
  {
    hanzi: "纳入",
  },
  {
    hanzi: "收看",
  },
  {
    hanzi: "收听",
  },
  {
    hanzi: "作文",
  },
  {
    hanzi: "外文",
  },
  {
    hanzi: "网络",
  },
  {
    hanzi: "丝",
  },
  {
    hanzi: "粉丝",
  },
  {
    hanzi: "纯",
  },
  {
    hanzi: "单纯",
  },
  {
    hanzi: "顿",
  },
  {
    hanzi: "顿时",
  },
  {
    hanzi: "吨",
  },
  {
    hanzi: "成绩",
  },
  {
    hanzi: "综合",
  },
  {
    hanzi: "缓",
  },
  {
    hanzi: "缓解",
  },
  {
    hanzi: "缓慢",
  },
  {
    hanzi: "暖",
  },
  {
    hanzi: "暖和",
  },
  {
    hanzi: "纷纷",
  },
  {
    hanzi: "写作",
  },
  {
    hanzi: "叫作",
  },
  {
    hanzi: "合作",
  },
  {
    hanzi: "合同",
  },
  {
    hanzi: "联合",
  },
  {
    hanzi: "联合国",
  },
  {
    hanzi: "合影",
  },
  {
    hanzi: "纠纷",
  },
  {
    hanzi: "纠正",
  },
  {
    hanzi: "纠结",
  },
  {
    hanzi: "宿舍",
  },
  {
    hanzi: "缩",
  },
  {
    hanzi: "缩小",
  },
  {
    hanzi: "缩短",
  },
  {
    hanzi: "互",
  },
  {
    hanzi: "相互",
  },
  {
    hanzi: "互联网",
  },
  {
    hanzi: "互相",
  },
  {
    hanzi: "互动",
  },
  {
    hanzi: "缘",
  },
  {
    hanzi: "边缘",
  },
  {
    hanzi: "缘分",
  },
  {
    hanzi: "着火",
  },
  {
    hanzi: "打工",
  },
  {
    hanzi: "打听",
  },
  {
    hanzi: "打交道",
  },
  {
    hanzi: "交往",
  },
  {
    hanzi: "外交",
  },
  {
    hanzi: "交给",
  },
  {
    hanzi: "制",
  },
  {
    hanzi: "控制",
  },
  {
    hanzi: "机制",
  },
  {
    hanzi: "制定",
  },
  {
    hanzi: "体制",
  },
  {
    hanzi: "制作",
  },
  {
    hanzi: "编制",
  },
  {
    hanzi: "法制",
  },
  {
    hanzi: "制约",
  },
  {
    hanzi: "刑事",
  },
  {
    hanzi: "死刑",
  },
  {
    hanzi: "型",
  },
  {
    hanzi: "大型",
  },
  {
    hanzi: "新型",
  },
  {
    hanzi: "车型",
  },
  {
    hanzi: "形",
  },
  {
    hanzi: "形成",
  },
  {
    hanzi: "形式",
  },
  {
    hanzi: "形象",
  },
  {
    hanzi: "情形",
  },
  {
    hanzi: "研发",
  },
  {
    hanzi: "研制",
  },
  {
    hanzi: "家务",
  },
  {
    hanzi: "日报",
  },
  {
    hanzi: "晚报",
  },
  {
    hanzi: "晚安",
  },
  {
    hanzi: "晚会",
  },
  {
    hanzi: "则",
  },
  {
    hanzi: "原则",
  },
  {
    hanzi: "否则",
  },
  {
    hanzi: "厕所",
  },
  {
    hanzi: "上厕所",
  },
  {
    hanzi: "公厕",
  },
  {
    hanzi: "测",
  },
  {
    hanzi: "测试",
  },
  {
    hanzi: "测定",
  },
  {
    hanzi: "创",
  },
  {
    hanzi: "创新",
  },
  {
    hanzi: "创作",
  },
  {
    hanzi: "创意",
  },
  {
    hanzi: "创建",
  },
  {
    hanzi: "列",
  },
  {
    hanzi: "系列",
  },
  {
    hanzi: "一系列",
  },
  {
    hanzi: "以色列",
  },
  {
    hanzi: "列车",
  },
  {
    hanzi: "排列",
  },
  {
    hanzi: "例",
  },
  {
    hanzi: "比例",
  },
  {
    hanzi: "例如",
  },
  {
    hanzi: "条例",
  },
  {
    hanzi: "病例",
  },
  {
    hanzi: "案例",
  },
  {
    hanzi: "例子",
  },
  {
    hanzi: "例外",
  },
  {
    hanzi: "残",
  },
  {
    hanzi: "残酷",
  },
  {
    hanzi: "强烈",
  },
  {
    hanzi: "热烈",
  },
  {
    hanzi: "副",
  },
  {
    hanzi: "副主任",
  },
  {
    hanzi: "副总统",
  },
  {
    hanzi: "福",
  },
  {
    hanzi: "幸福",
  },
  {
    hanzi: "福建",
  },
  {
    hanzi: "报道",
  },
  {
    hanzi: "地道",
  },
  {
    hanzi: "报到",
  },
  {
    hanzi: "周到",
  },
  {
    hanzi: "报告",
  },
  {
    hanzi: "告别",
  },
  {
    hanzi: "富",
  },
  {
    hanzi: "丰富",
  },
  {
    hanzi: "富有",
  },
  {
    hanzi: "幅",
  },
  {
    hanzi: "涨幅",
  },
  {
    hanzi: "剧",
  },
  {
    hanzi: "电视剧",
  },
  {
    hanzi: "京剧",
  },
  {
    hanzi: "话剧",
  },
  {
    hanzi: "剧场",
  },
  {
    hanzi: "连续剧",
  },
  {
    hanzi: "刘",
  },
  {
    hanzi: "判决",
  },
  {
    hanzi: "归",
  },
  {
    hanzi: "回归",
  },
  {
    hanzi: "归还",
  },
  {
    hanzi: "刺",
  },
  {
    hanzi: "刷",
  },
  {
    hanzi: "刷新",
  },
  {
    hanzi: "刷牙",
  },
  {
    hanzi: "牙刷",
  },
  {
    hanzi: "刮",
  },
  {
    hanzi: "刮目相看",
  },
  {
    hanzi: "刮风",
  },
  {
    hanzi: "俞",
  },
  {
    hanzi: "个子",
  },
  {
    hanzi: "个别",
  },
  {
    hanzi: "个人",
  },
  {
    hanzi: "偷",
  },
  {
    hanzi: "偷偷",
  },
  {
    hanzi: "小偷",
  },
  {
    hanzi: "偷拍",
  },
  {
    hanzi: "输",
  },
  {
    hanzi: "运输",
  },
  {
    hanzi: "输入",
  },
  {
    hanzi: "输出",
  },
  {
    hanzi: "愉快",
  },
  {
    hanzi: "紧",
  },
  {
    hanzi: "紧张",
  },
  {
    hanzi: "赶紧",
  },
  {
    hanzi: "紧紧",
  },
  {
    hanzi: "抓紧",
  },
  {
    hanzi: "索",
  },
  {
    hanzi: "探索",
  },
  {
    hanzi: "线索",
  },
  {
    hanzi: "素",
  },
  {
    hanzi: "因素",
  },
  {
    hanzi: "元素",
  },
  {
    hanzi: "像素",
  },
  {
    hanzi: "责任",
  },
  {
    hanzi: "负责",
  },
  {
    hanzi: "负责人",
  },
  {
    hanzi: "职责",
  },
  {
    hanzi: "数字",
  },
  {
    hanzi: "人数",
  },
  {
    hanzi: "少数",
  },
  {
    hanzi: "多数",
  },
  {
    hanzi: "多云",
  },
  {
    hanzi: "大多数",
  },
  {
    hanzi: "分数",
  },
  {
    hanzi: "分别",
  },
  {
    hanzi: "得分",
  },
  {
    hanzi: "达",
  },
  {
    hanzi: "达到",
  },
  {
    hanzi: "表达",
  },
  {
    hanzi: "高达",
  },
  {
    hanzi: "发达",
  },
  {
    hanzi: "达成",
  },
  {
    hanzi: "到达",
  },
  {
    hanzi: "选",
  },
  {
    hanzi: "选手",
  },
  {
    hanzi: "挑选",
  },
  {
    hanzi: "造",
  },
  {
    hanzi: "造成",
  },
  {
    hanzi: "创造",
  },
  {
    hanzi: "改造",
  },
  {
    hanzi: "制造",
  },
  {
    hanzi: "打造",
  },
  {
    hanzi: "造型",
  },
  {
    hanzi: "建造",
  },
  {
    hanzi: "伪造",
  },
  {
    hanzi: "成分",
  },
  {
    hanzi: "成就",
  },
  {
    hanzi: "早已",
  },
  {
    hanzi: "早就",
  },
  {
    hanzi: "适合",
  },
  {
    hanzi: "适应",
  },
  {
    hanzi: "适当",
  },
  {
    hanzi: "合适",
  },
  {
    hanzi: "适用",
  },
  {
    hanzi: "退",
  },
  {
    hanzi: "退出",
  },
  {
    hanzi: "退休",
  },
  {
    hanzi: "遇",
  },
  {
    hanzi: "遇到",
  },
  {
    hanzi: "机遇",
  },
  {
    hanzi: "偶",
  },
  {
    hanzi: "偶尔",
  },
  {
    hanzi: "偶像",
  },
  {
    hanzi: "偶然",
  },
  {
    hanzi: "偶遇",
  },
  {
    hanzi: "公寓",
  },
  {
    hanzi: "追",
  },
  {
    hanzi: "追求",
  },
  {
    hanzi: "官",
  },
  {
    hanzi: "官员",
  },
  {
    hanzi: "官方",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "主管",
  },
  {
    hanzi: "不管",
  },
  {
    hanzi: "馆",
  },
  {
    hanzi: "图书馆",
  },
  {
    hanzi: "旅馆",
  },
  {
    hanzi: "大使馆",
  },
  {
    hanzi: "饭馆",
  },
  {
    hanzi: "体育馆",
  },
  {
    hanzi: "饺子",
  },
  {
    hanzi: "成立",
  },
  {
    hanzi: "成果",
  },
  {
    hanzi: "后果",
  },
  {
    hanzi: "饮",
  },
  {
    hanzi: "迷",
  },
  {
    hanzi: "迷路",
  },
  {
    hanzi: "球迷",
  },
  {
    hanzi: "歌迷",
  },
  {
    hanzi: "透",
  },
  {
    hanzi: "透露",
  },
  {
    hanzi: "透明",
  },
  {
    hanzi: "上述",
  },
  {
    hanzi: "迎",
  },
  {
    hanzi: "欢迎",
  },
  {
    hanzi: "迎接",
  },
  {
    hanzi: "迎来",
  },
  {
    hanzi: "印",
  },
  {
    hanzi: "印象",
  },
  {
    hanzi: "打印",
  },
  {
    hanzi: "印刷",
  },
  {
    hanzi: "即",
  },
  {
    hanzi: "立即",
  },
  {
    hanzi: "即使",
  },
  {
    hanzi: "即可",
  },
  {
    hanzi: "即便",
  },
  {
    hanzi: "随即",
  },
  {
    hanzi: "却",
  },
  {
    hanzi: "脚",
  },
  {
    hanzi: "遗传",
  },
  {
    hanzi: "成语",
  },
  {
    hanzi: "语气",
  },
  {
    hanzi: "小气",
  },
  {
    hanzi: "逐步",
  },
  {
    hanzi: "逐渐",
  },
  {
    hanzi: "逛",
  },
  {
    hanzi: "违法",
  },
  {
    hanzi: "违反",
  },
  {
    hanzi: "违规",
  },
  {
    hanzi: "避免",
  },
  {
    hanzi: "不可避免",
  },
  {
    hanzi: "逃避",
  },
  {
    hanzi: "回避",
  },
  {
    hanzi: "邀请",
  },
  {
    hanzi: "刺激",
  },
  {
    hanzi: "激烈",
  },
  {
    hanzi: "激动",
  },
  {
    hanzi: "激情",
  },
  {
    hanzi: "疑问",
  },
  {
    hanzi: "给予",
  },
  {
    hanzi: "予以",
  },
  {
    hanzi: "授予",
  },
  {
    hanzi: "预",
  },
  {
    hanzi: "预计",
  },
  {
    hanzi: "预期",
  },
  {
    hanzi: "预测",
  },
  {
    hanzi: "预算",
  },
  {
    hanzi: "预习",
  },
  {
    hanzi: "预估",
  },
  {
    hanzi: "预报",
  },
  {
    hanzi: "序",
  },
  {
    hanzi: "需求",
  },
  {
    hanzi: "请求",
  },
  {
    hanzi: "景色",
  },
  {
    hanzi: "野",
  },
  {
    hanzi: "视野",
  },
  {
    hanzi: "野生",
  },
  {
    hanzi: "野心",
  },
  {
    hanzi: "舒服",
  },
  {
    hanzi: "舒适",
  },
  {
    hanzi: "不舒服",
  },
  {
    hanzi: "无",
  },
  {
    hanzi: "无法",
  },
  {
    hanzi: "无疑",
  },
  {
    hanzi: "无数",
  },
  {
    hanzi: "无人",
  },
  {
    hanzi: "无比",
  },
  {
    hanzi: "无线",
  },
  {
    hanzi: "无赖",
  },
  {
    hanzi: "既",
  },
  {
    hanzi: "既然",
  },
  {
    hanzi: "大概",
  },
  {
    hanzi: "概括",
  },
  {
    hanzi: "击",
  },
  {
    hanzi: "打击",
  },
  {
    hanzi: "毛",
  },
  {
    hanzi: "毛巾",
  },
  {
    hanzi: "毛发",
  },
  {
    hanzi: "毛病",
  },
  {
    hanzi: "丈",
  },
  {
    hanzi: "夫",
  },
  {
    hanzi: "夫人",
  },
  {
    hanzi: "大夫",
  },
  {
    hanzi: "丈夫",
  },
  {
    hanzi: "工夫",
  },
  {
    hanzi: "规定",
  },
  {
    hanzi: "规划",
  },
  {
    hanzi: "法规",
  },
  {
    hanzi: "规则",
  },
  {
    hanzi: "规律",
  },
  {
    hanzi: "常规",
  },
  {
    hanzi: "肤",
  },
  {
    hanzi: "皮肤",
  },
  {
    hanzi: "肤色",
  },
  {
    hanzi: "肤浅",
  },
  {
    hanzi: "失",
  },
  {
    hanzi: "失去",
  },
  {
    hanzi: "损失",
  },
  {
    hanzi: "消失",
  },
  {
    hanzi: "跌",
  },
  {
    hanzi: "下跌",
  },
  {
    hanzi: "铁",
  },
  {
    hanzi: "铁路",
  },
  {
    hanzi: "地铁",
  },
  {
    hanzi: "地铁站",
  },
  {
    hanzi: "升",
  },
  {
    hanzi: "上升",
  },
  {
    hanzi: "提升",
  },
  {
    hanzi: "升级",
  },
  {
    hanzi: "升值",
  },
  {
    hanzi: "久",
  },
  {
    hanzi: "不久",
  },
  {
    hanzi: "很久",
  },
  {
    hanzi: "好久",
  },
  {
    hanzi: "多久",
  },
  {
    hanzi: "乡",
  },
  {
    hanzi: "城乡",
  },
  {
    hanzi: "家乡",
  },
  {
    hanzi: "率",
  },
  {
    hanzi: "汇率",
  },
  {
    hanzi: "率先",
  },
  {
    hanzi: "概率",
  },
  {
    hanzi: "利",
  },
  {
    hanzi: "利用",
  },
  {
    hanzi: "利润",
  },
  {
    hanzi: "有利于",
  },
  {
    hanzi: "意大利",
  },
  {
    hanzi: "专利",
  },
  {
    hanzi: "有利",
  },
  {
    hanzi: "福利",
  },
  {
    hanzi: "流利",
  },
  {
    hanzi: "暴利",
  },
  {
    hanzi: "吉利",
  },
  {
    hanzi: "利率",
  },
  {
    hanzi: "过程",
  },
  {
    hanzi: "工程",
  },
  {
    hanzi: "程序",
  },
  {
    hanzi: "课程",
  },
  {
    hanzi: "进程",
  },
  {
    hanzi: "工程师",
  },
  {
    hanzi: "斗",
  },
  {
    hanzi: "斗争",
  },
  {
    hanzi: "科",
  },
  {
    hanzi: "科技",
  },
  {
    hanzi: "科学",
  },
  {
    hanzi: "科研",
  },
  {
    hanzi: "学科",
  },
  {
    hanzi: "科学家",
  },
  {
    hanzi: "料",
  },
  {
    hanzi: "材料",
  },
  {
    hanzi: "原料",
  },
  {
    hanzi: "饮料",
  },
  {
    hanzi: "称",
  },
  {
    hanzi: "称为",
  },
  {
    hanzi: "简称",
  },
  {
    hanzi: "名称",
  },
  {
    hanzi: "称呼",
  },
  {
    hanzi: "积",
  },
  {
    hanzi: "积极",
  },
  {
    hanzi: "面积",
  },
  {
    hanzi: "积累",
  },
  {
    hanzi: "积分",
  },
  {
    hanzi: "税",
  },
  {
    hanzi: "税收",
  },
  {
    hanzi: "季",
  },
  {
    hanzi: "冬季",
  },
  {
    hanzi: "夏季",
  },
  {
    hanzi: "移",
  },
  {
    hanzi: "转移",
  },
  {
    hanzi: "移动",
  },
  {
    hanzi: "移植",
  },
  {
    hanzi: "移交",
  },
  {
    hanzi: "以及",
  },
  {
    hanzi: "以来",
  },
  {
    hanzi: "私",
  },
  {
    hanzi: "私人",
  },
  {
    hanzi: "自私",
  },
  {
    hanzi: "私下",
  },
  {
    hanzi: "私自",
  },
  {
    hanzi: "走私",
  },
  {
    hanzi: "秀",
  },
  {
    hanzi: "优秀",
  },
  {
    hanzi: "必",
  },
  {
    hanzi: "必要",
  },
  {
    hanzi: "必然",
  },
  {
    hanzi: "不必",
  },
  {
    hanzi: "秘书",
  },
  {
    hanzi: "便秘",
  },
  {
    hanzi: "秘密",
  },
  {
    hanzi: "密切",
  },
  {
    hanzi: "紧密",
  },
  {
    hanzi: "亲密",
  },
  {
    hanzi: "租",
  },
  {
    hanzi: "出租",
  },
  {
    hanzi: "出租车",
    hskLevels: 1,
  },
  {
    hanzi: "房租",
  },
  {
    hanzi: "粗",
  },
  {
    hanzi: "粗心",
  },
  {
    hanzi: "秋",
  },
  {
    hanzi: "秋季",
  },
  {
    hanzi: "秋天",
  },
  {
    hanzi: "中秋",
  },
  {
    hanzi: "秒",
  },
  {
    hanzi: "秒钟",
  },
  {
    hanzi: "稍",
  },
  {
    hanzi: "稍微",
  },
  {
    hanzi: "自从",
  },
  {
    hanzi: "自觉",
  },
  {
    hanzi: "各自",
  },
  {
    hanzi: "亲自",
  },
  {
    hanzi: "队",
  },
  {
    hanzi: "球队",
  },
  {
    hanzi: "队员",
  },
  {
    hanzi: "中国队",
  },
  {
    hanzi: "大队",
  },
  {
    hanzi: "国家队",
  },
  {
    hanzi: "排队",
  },
  {
    hanzi: "队长",
  },
  {
    hanzi: "乐队",
  },
  {
    hanzi: "防",
  },
  {
    hanzi: "防止",
  },
  {
    hanzi: "预防",
  },
  {
    hanzi: "防治",
  },
  {
    hanzi: "消防",
  },
  {
    hanzi: "阿",
  },
  {
    hanzi: "啊",
  },
  {
    hanzi: "啊啊",
  },
  {
    hanzi: "好啊",
  },
  {
    hanzi: "天啊",
  },
  {
    hanzi: "啊哈",
  },
  {
    hanzi: "限",
  },
  {
    hanzi: "有限公司",
  },
  {
    hanzi: "限制",
  },
  {
    hanzi: "有限",
  },
  {
    hanzi: "无限",
  },
  {
    hanzi: "期限",
  },
  {
    hanzi: "降",
  },
  {
    hanzi: "下降",
  },
  {
    hanzi: "降低",
  },
  {
    hanzi: "降价",
  },
  {
    hanzi: "降落",
  },
  {
    hanzi: "舞",
  },
  {
    hanzi: "舞台",
  },
  {
    hanzi: "跳舞",
  },
  {
    hanzi: "鼓舞",
  },
  {
    hanzi: "处",
  },
  {
    hanzi: "处于",
  },
  {
    hanzi: "处女",
  },
  {
    hanzi: "到处",
  },
  {
    hanzi: "之处",
  },
  {
    hanzi: "好处",
  },
  {
    hanzi: "查处",
  },
  {
    hanzi: "坏处",
  },
  {
    hanzi: "长处",
  },
  {
    hanzi: "短处",
  },
  {
    hanzi: "陈",
  },
  {
    hanzi: "陈述",
  },
  {
    hanzi: "阵",
  },
  {
    hanzi: "一阵",
  },
  {
    hanzi: "阵雨",
  },
  {
    hanzi: "亲切",
  },
  {
    hanzi: "亲爱",
  },
  {
    hanzi: "亲人",
  },
  {
    hanzi: "爱人",
  },
  {
    hanzi: "疼爱",
  },
  {
    hanzi: "爱心",
  },
  {
    hanzi: "大陆",
  },
  {
    hanzi: "陆续",
  },
  {
    hanzi: "附",
  },
  {
    hanzi: "附近",
  },
  {
    hanzi: "附加",
  },
  {
    hanzi: "保障",
  },
  {
    hanzi: "阻止",
  },
  {
    hanzi: "陪",
  },
  {
    hanzi: "陪伴",
  },
  {
    hanzi: "陪同",
  },
  {
    hanzi: "邮",
  },
  {
    hanzi: "邮件",
  },
  {
    hanzi: "邮票",
  },
  {
    hanzi: "电子邮件",
  },
  {
    hanzi: "郊外",
  },
  {
    hanzi: "理",
  },
  {
    hanzi: "概念",
  },
  {
    hanzi: "处理",
  },
  {
    hanzi: "心理",
  },
  {
    hanzi: "理解",
  },
  {
    hanzi: "合理",
  },
  {
    hanzi: "理由",
  },
  {
    hanzi: "办理",
  },
  {
    hanzi: "理想",
  },
  {
    hanzi: "经理",
  },
  {
    hanzi: "总理",
  },
  {
    hanzi: "治理",
  },
  {
    hanzi: "总经理",
  },
  {
    hanzi: "整理",
  },
  {
    hanzi: "管理",
  },
  {
    hanzi: "道理",
  },
  {
    hanzi: "代理",
  },
  {
    hanzi: "清理",
  },
  {
    hanzi: "地理",
  },
  {
    hanzi: "理发",
  },
  {
    hanzi: "量",
  },
  {
    hanzi: "力量",
  },
  {
    hanzi: "大量",
  },
  {
    hanzi: "数量",
  },
  {
    hanzi: "含量",
  },
  {
    hanzi: "总量",
  },
  {
    hanzi: "能量",
  },
  {
    hanzi: "成交量",
  },
  {
    hanzi: "测量",
  },
  {
    hanzi: "剂量",
  },
  {
    hanzi: "望",
  },
  {
    hanzi: "愿望",
  },
  {
    hanzi: "失望",
  },
  {
    hanzi: "有望",
  },
  {
    hanzi: "渴望",
  },
  {
    hanzi: "环",
  },
  {
    hanzi: "环保",
  },
  {
    hanzi: "弄",
  },
  {
    hanzi: "弄清",
  },
  {
    hanzi: "玩弄",
  },
  {
    hanzi: "弄好",
  },
  {
    hanzi: "弄死",
  },
  {
    hanzi: "弄死",
  },
  {
    hanzi: "皇",
  },
  {
    hanzi: "皇上",
  },
  {
    hanzi: "皇家",
  },
  {
    hanzi: "皇后",
  },
  {
    hanzi: "泉",
  },
  {
    hanzi: "相貌",
  },
  {
    hanzi: "美貌",
  },
  {
    hanzi: "外貌",
  },
  {
    hanzi: "貌似",
  },
  {
    hanzi: "自卑",
  },
  {
    hanzi: "牌",
  },
  {
    hanzi: "品牌",
  },
  {
    hanzi: "金牌",
  },
  {
    hanzi: "名牌",
  },
  {
    hanzi: "牌子",
  },
  {
    hanzi: "银牌",
  },
  {
    hanzi: "啤酒",
  },
  {
    hanzi: "脾",
  },
  {
    hanzi: "脾气",
  },
  {
    hanzi: "基",
  },
  {
    hanzi: "基金",
  },
  {
    hanzi: "基本",
  },
  {
    hanzi: "基地",
  },
  {
    hanzi: "基因",
  },
  {
    hanzi: "基本上",
  },
  {
    hanzi: "基于",
  },
  {
    hanzi: "社",
  },
  {
    hanzi: "社会",
  },
  {
    hanzi: "社员",
  },
  {
    hanzi: "出版社",
  },
  {
    hanzi: "旅行社",
  },
  {
    hanzi: "礼",
  },
  {
    hanzi: "礼物",
  },
  {
    hanzi: "礼貌",
  },
  {
    hanzi: "礼拜天",
  },
  {
    hanzi: "祝",
  },
  {
    hanzi: "祝福",
  },
  {
    hanzi: "祝愿",
  },
  {
    hanzi: "预祝",
  },
  {
    hanzi: "竟",
  },
  {
    hanzi: "竟然",
  },
  {
    hanzi: "毕竟",
  },
  {
    hanzi: "境",
  },
  {
    hanzi: "境内",
  },
  {
    hanzi: "环境",
  },
  {
    hanzi: "镜",
  },
  {
    hanzi: "镜头",
  },
  {
    hanzi: "眼镜",
  },
  {
    hanzi: "镜子",
  },
  {
    hanzi: "压",
  },
  {
    hanzi: "压力",
  },
  {
    hanzi: "均",
  },
  {
    hanzi: "平均",
  },
  {
    hanzi: "人均",
  },
  {
    hanzi: "坚持",
  },
  {
    hanzi: "坚决",
  },
  {
    hanzi: "坚强",
  },
  {
    hanzi: "坚定",
  },
  {
    hanzi: "坚挺",
  },
  {
    hanzi: "热爱",
  },
  {
    hanzi: "热心",
  },
  {
    hanzi: "中心",
  },
  {
    hanzi: "培养",
  },
  {
    hanzi: "培育",
  },
  {
    hanzi: "圣",
  },
  {
    hanzi: "圣经",
  },
  {
    hanzi: "地址",
  },
  {
    hanzi: "住址",
  },
  {
    hanzi: "填",
  },
  {
    hanzi: "填写",
  },
  {
    hanzi: "填空",
  },
  {
    hanzi: "堵",
  },
  {
    hanzi: "堵塞",
  },
  {
    hanzi: "堵车",
  },
  {
    hanzi: "垃圾",
  },
  {
    hanzi: "丑",
  },
  {
    hanzi: "丑闻",
  },
  {
    hanzi: "害羞",
  },
  {
    hanzi: "中介",
  },
  {
    hanzi: "塑料",
  },
  {
    hanzi: "塑造",
  },
  {
    hanzi: "塑料袋",
  },
  {
    hanzi: "逆",
  },
  {
    hanzi: "逆行",
  },
  {
    hanzi: "股",
  },
  {
    hanzi: "股东",
  },
  {
    hanzi: "股票",
  },
  {
    hanzi: "股份",
  },
  {
    hanzi: "股市",
  },
  {
    hanzi: "控股",
  },
  {
    hanzi: "股价",
  },
  {
    hanzi: "个股",
  },
  {
    hanzi: "股份有限公司",
  },
  {
    hanzi: "胜",
  },
  {
    hanzi: "胜利",
  },
  {
    hanzi: "细胞",
  },
  {
    hanzi: "同胞",
  },
  {
    hanzi: "腿",
  },
  {
    hanzi: "大腿",
  },
  {
    hanzi: "小腿",
  },
  {
    hanzi: "脱",
  },
  {
    hanzi: "阅读",
  },
  {
    hanzi: "肥",
  },
  {
    hanzi: "减肥",
  },
  {
    hanzi: "肥胖",
  },
  {
    hanzi: "爸",
  },
  {
    hanzi: "爸爸",
    hskLevels: 1,
  },
  {
    hanzi: "高中",
  },
  {
    hanzi: "上当",
  },
  {
    hanzi: "当心",
  },
  {
    hanzi: "当地",
  },
  {
    hanzi: "土地",
  },
  {
    hanzi: "外地",
  },
  {
    hanzi: "各地",
  },
  {
    hanzi: "各位",
  },
  {
    hanzi: "肯",
  },
  {
    hanzi: "肯定",
  },
  {
    hanzi: "不肯",
  },
  {
    hanzi: "阴",
  },
  {
    hanzi: "阴天",
  },
  {
    hanzi: "肿",
  },
  {
    hanzi: "红肿",
  },
  {
    hanzi: "冲",
  },
  {
    hanzi: "冲突",
  },
  {
    hanzi: "冲击",
  },
  {
    hanzi: "膏",
  },
  {
    hanzi: "牙膏",
  },
  {
    hanzi: "石膏",
  },
  {
    hanzi: "药膏",
  },
  {
    hanzi: "朝",
  },
  {
    hanzi: "朝鲜",
  },
  {
    hanzi: "潮",
  },
  {
    hanzi: "潮流",
  },
  {
    hanzi: "高潮",
  },
  {
    hanzi: "热潮",
  },
  {
    hanzi: "韩",
  },
  {
    hanzi: "韩国",
  },
  {
    hanzi: "韩元",
  },
  {
    hanzi: "赢",
  },
  {
    hanzi: "赢得",
  },
  {
    hanzi: "赢家",
  },
  {
    hanzi: "输赢",
  },
  {
    hanzi: "决心",
  },
  {
    hanzi: "点心",
  },
  {
    hanzi: "背",
  },
  {
    hanzi: "背景",
  },
  {
    hanzi: "背后",
  },
  {
    hanzi: "肌",
  },
  {
    hanzi: "肌肉",
  },
  {
    hanzi: "肌肤",
  },
  {
    hanzi: "胶",
  },
  {
    hanzi: "橡胶",
  },
  {
    hanzi: "胶带",
  },
  {
    hanzi: "乘",
  },
  {
    hanzi: "乘客",
  },
  {
    hanzi: "乘坐",
  },
  {
    hanzi: "剩下",
  },
  {
    hanzi: "剩",
  },
  {
    hanzi: "剩余",
  },
  {
    hanzi: "剩女",
  },
  {
    hanzi: "所剩无几",
  },
  {
    hanzi: "骨",
  },
  {
    hanzi: "骨折",
  },
  {
    hanzi: "滑",
  },
  {
    hanzi: "下滑",
  },
  {
    hanzi: "滑雪",
  },
  {
    hanzi: "滑冰",
  },
  {
    hanzi: "区",
  },
  {
    hanzi: "地区",
  },
  {
    hanzi: "区域",
  },
  {
    hanzi: "社区",
  },
  {
    hanzi: "小区",
  },
  {
    hanzi: "区别",
  },
  {
    hanzi: "郊区",
  },
  {
    hanzi: "欧",
  },
  {
    hanzi: "欧洲",
  },
  {
    hanzi: "欧元",
  },
  {
    hanzi: "欧美",
  },
  {
    hanzi: "义",
  },
  {
    hanzi: "意义",
  },
  {
    hanzi: "社会主义",
  },
  {
    hanzi: "主义",
  },
  {
    hanzi: "义务",
  },
  {
    hanzi: "含义",
  },
  {
    hanzi: "哪怕",
  },
  {
    hanzi: "可怕",
  },
  {
    hanzi: "可见",
  },
  {
    hanzi: "议",
  },
  {
    hanzi: "会议",
  },
  {
    hanzi: "建议",
  },
  {
    hanzi: "决议",
  },
  {
    hanzi: "希",
  },
  {
    hanzi: "希望",
  },
  {
    hanzi: "凶",
  },
  {
    hanzi: "凶手",
  },
  {
    hanzi: "曲",
  },
  {
    hanzi: "歌曲",
  },
  {
    hanzi: "经典",
  },
  {
    hanzi: "典型",
  },
  {
    hanzi: "典礼",
  },
  {
    hanzi: "古典",
  },
  {
    hanzi: "词典",
  },
  {
    hanzi: "字典",
  },
  {
    hanzi: "胸",
  },
  {
    hanzi: "齿",
  },
  {
    hanzi: "牙齿",
  },
  {
    hanzi: "年龄",
  },
  {
    hanzi: "离",
  },
  {
    hanzi: "离开",
  },
  {
    hanzi: "距离",
  },
  {
    hanzi: "分离",
  },
  {
    hanzi: "脑",
  },
  {
    hanzi: "电脑",
    hskLevels: 1,
  },
  {
    hanzi: "脑袋",
  },
  {
    hanzi: "脑子",
  },
  {
    hanzi: "大脑",
  },
  {
    hanzi: "头脑",
  },
  {
    hanzi: "不见得",
  },
  {
    hanzi: "不得了",
  },
  {
    hanzi: "不然",
  },
  {
    hanzi: "要不",
  },
  {
    hanzi: "要不然",
  },
  {
    hanzi: "烦恼",
  },
  {
    hanzi: "苦恼",
  },
  {
    hanzi: "恼火",
  },
  {
    hanzi: "功",
  },
  {
    hanzi: "成功",
  },
  {
    hanzi: "功能",
  },
  {
    hanzi: "功夫",
  },
  {
    hanzi: "事半功倍",
  },
  {
    hanzi: "功课",
  },
  {
    hanzi: "势",
  },
  {
    hanzi: "优势",
  },
  {
    hanzi: "形势",
  },
  {
    hanzi: "走势",
  },
  {
    hanzi: "势力",
  },
  {
    hanzi: "助",
  },
  {
    hanzi: "帮助",
  },
  {
    hanzi: "救助",
  },
  {
    hanzi: "历史",
  },
  {
    hanzi: "经历",
  },
  {
    hanzi: "历史上",
  },
  {
    hanzi: "学历",
  },
  {
    hanzi: "阅历",
  },
  {
    hanzi: "努",
  },
  {
    hanzi: "努力",
  },
  {
    hanzi: "劲",
  },
  {
    hanzi: "强劲",
  },
  {
    hanzi: "穷",
  },
  {
    hanzi: "穷人",
  },
  {
    hanzi: "无穷",
  },
  {
    hanzi: "勇气",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "通过",
  },
  {
    hanzi: "交通",
  },
  {
    hanzi: "通知",
  },
  {
    hanzi: "流通",
  },
  {
    hanzi: "沟通",
  },
  {
    hanzi: "通常",
  },
  {
    hanzi: "通道",
  },
  {
    hanzi: "通信",
  },
  {
    hanzi: "联通",
  },
  {
    hanzi: "开通",
  },
  {
    hanzi: "通用",
  },
  {
    hanzi: "次要",
  },
  {
    hanzi: "果然",
  },
  {
    hanzi: "午睡",
  },
  {
    hanzi: "白菜",
  },
  {
    hanzi: "变为",
  },
  {
    hanzi: "红茶",
  },
  {
    hanzi: "奶茶",
  },
  {
    hanzi: "欢乐",
  },
  {
    hanzi: "桶",
  },
  {
    hanzi: "马桶",
  },
  {
    hanzi: "垃圾桶",
  },
  {
    hanzi: "水桶",
  },
  {
    hanzi: "木桶",
  },
  {
    hanzi: "痛",
  },
  {
    hanzi: "痛苦",
  },
  {
    hanzi: "疼痛",
  },
  {
    hanzi: "头痛",
  },
  {
    hanzi: "治疗",
  },
  {
    hanzi: "医疗",
  },
  {
    hanzi: "症",
  },
  {
    hanzi: "瘦",
  },
  {
    hanzi: "搜",
  },
  {
    hanzi: "搜索",
  },
  {
    hanzi: "搜集",
  },
  {
    hanzi: "疾",
  },
  {
    hanzi: "疾病",
  },
  {
    hanzi: "残疾",
  },
  {
    hanzi: "残疾人",
  },
  {
    hanzi: "疯",
  },
  {
    hanzi: "疯子",
  },
  {
    hanzi: "发疯",
  },
  {
    hanzi: "业",
  },
  {
    hanzi: "行业",
  },
  {
    hanzi: "业务",
  },
  {
    hanzi: "专业",
  },
  {
    hanzi: "工业",
  },
  {
    hanzi: "事业",
  },
  {
    hanzi: "职业",
  },
  {
    hanzi: "就业",
  },
  {
    hanzi: "毕业",
  },
  {
    hanzi: "业绩",
  },
  {
    hanzi: "创业",
  },
  {
    hanzi: "作业",
  },
  {
    hanzi: "业内",
  },
  {
    hanzi: "业主",
  },
  {
    hanzi: "毕业生",
  },
  {
    hanzi: "中小企业",
  },
  {
    hanzi: "业余",
  },
  {
    hanzi: "开业",
  },
  {
    hanzi: "亚",
  },
  {
    hanzi: "亚洲",
  },
  {
    hanzi: "显",
  },
  {
    hanzi: "明显",
  },
  {
    hanzi: "显示",
  },
  {
    hanzi: "显得",
  },
  {
    hanzi: "显然",
  },
  {
    hanzi: "显著",
  },
  {
    hanzi: "普",
  },
  {
    hanzi: "普通",
  },
  {
    hanzi: "普遍",
  },
  {
    hanzi: "普及",
  },
  {
    hanzi: "普通话",
  },
  {
    hanzi: "严",
  },
  {
    hanzi: "严重",
  },
  {
    hanzi: "严格",
  },
  {
    hanzi: "尊严",
  },
  {
    hanzi: "恶",
  },
  {
    hanzi: "恶心",
  },
  {
    hanzi: "卫",
  },
  {
    hanzi: "卫生",
  },
  {
    hanzi: "卫星",
  },
  {
    hanzi: "卫生间",
  },
  {
    hanzi: "武",
  },
  {
    hanzi: "武器",
  },
  {
    hanzi: "武汉",
  },
  {
    hanzi: "武术",
  },
  {
    hanzi: "丽",
  },
  {
    hanzi: "美丽",
  },
  {
    hanzi: "导",
  },
  {
    hanzi: "导致",
  },
  {
    hanzi: "指导",
  },
  {
    hanzi: "导演",
  },
  {
    hanzi: "引导",
  },
  {
    hanzi: "导弹",
  },
  {
    hanzi: "主导",
  },
  {
    hanzi: "导游",
  },
  {
    hanzi: "民",
  },
  {
    hanzi: "人民",
  },
  {
    hanzi: "市民",
  },
  {
    hanzi: "民族",
  },
  {
    hanzi: "民主",
  },
  {
    hanzi: "村民",
  },
  {
    hanzi: "公民",
  },
  {
    hanzi: "民间",
  },
  {
    hanzi: "中国人民",
  },
  {
    hanzi: "移民",
  },
  {
    hanzi: "国民经济",
  },
  {
    hanzi: "异",
  },
  {
    hanzi: "差异",
  },
  {
    hanzi: "异常",
  },
  {
    hanzi: "异地",
  },
  {
    hanzi: "将",
  },
  {
    hanzi: "即将",
  },
  {
    hanzi: "将来",
  },
  {
    hanzi: "麻将",
  },
  {
    hanzi: "将近",
  },
  {
    hanzi: "装",
  },
  {
    hanzi: "安装",
  },
  {
    hanzi: "装备",
  },
  {
    hanzi: "服装",
  },
  {
    hanzi: "武装",
  },
  {
    hanzi: "包装",
  },
  {
    hanzi: "装置",
  },
  {
    hanzi: "装扮",
  },
  {
    hanzi: "伪装",
  },
  {
    hanzi: "奖",
  },
  {
    hanzi: "有奖",
  },
  {
    hanzi: "大奖",
  },
  {
    hanzi: "奖金",
  },
  {
    hanzi: "奖品",
  },
  {
    hanzi: "状",
  },
  {
    hanzi: "状况",
  },
  {
    hanzi: "症状",
  },
  {
    hanzi: "现状",
  },
  {
    hanzi: "形状",
  },
  {
    hanzi: "射",
  },
  {
    hanzi: "射手",
  },
  {
    hanzi: "发射",
  },
  {
    hanzi: "注射",
  },
  {
    hanzi: "寻",
  },
  {
    hanzi: "寻找",
  },
  {
    hanzi: "寻求",
  },
  {
    hanzi: "耐",
  },
  {
    hanzi: "耐心",
  },
  {
    hanzi: "不耐烦",
  },
  {
    hanzi: "能耐",
  },
  {
    hanzi: "耐人寻味",
  },
  {
    hanzi: "冠",
  },
  {
    hanzi: "节",
  },
  {
    hanzi: "节目",
  },
  {
    hanzi: "环节",
  },
  {
    hanzi: "细节",
  },
  {
    hanzi: "节日",
  },
  {
    hanzi: "节约",
  },
  {
    hanzi: "节能",
  },
  {
    hanzi: "季节",
  },
  {
    hanzi: "音节",
  },
  {
    hanzi: "爷",
  },
  {
    hanzi: "爷爷",
  },
  {
    hanzi: "范",
  },
  {
    hanzi: "规范",
  },
  {
    hanzi: "示范",
  },
  {
    hanzi: "防范",
  },
  {
    hanzi: "艺术",
  },
  {
    hanzi: "工艺",
  },
  {
    hanzi: "文艺",
  },
  {
    hanzi: "瓦",
  },
  {
    hanzi: "瓶",
  },
  {
    hanzi: "瓶子",
  },
  {
    hanzi: "饼",
  },
  {
    hanzi: "月饼",
  },
  {
    hanzi: "饼干",
  },
  {
    hanzi: "著",
  },
  {
    hanzi: "著名",
  },
  {
    hanzi: "显著",
  },
  {
    hanzi: "著作",
  },
  {
    hanzi: "名著",
  },
  {
    hanzi: "若",
  },
  {
    hanzi: "若干",
  },
  {
    hanzi: "若是",
  },
  {
    hanzi: "苹果",
    hskLevels: 1,
  },
  {
    hanzi: "苏",
  },
  {
    hanzi: "苏联",
  },
  {
    hanzi: "江苏",
  },
  {
    hanzi: "协议",
  },
  {
    hanzi: "协会",
  },
  {
    hanzi: "协助",
  },
  {
    hanzi: "了不起",
  },
  {
    hanzi: "说不定",
  },
  {
    hanzi: "看起来",
  },
  {
    hanzi: "看上去",
  },
  {
    hanzi: "藏",
  },
  {
    hanzi: "收藏",
  },
  {
    hanzi: "西藏",
  },
  {
    hanzi: "吕",
  },
  {
    hanzi: "宫",
  },
  {
    hanzi: "子宫",
  },
  {
    hanzi: "营",
  },
  {
    hanzi: "经营",
  },
  {
    hanzi: "运营",
  },
  {
    hanzi: "营养",
  },
  {
    hanzi: "民营",
  },
  {
    hanzi: "营业",
  },
  {
    hanzi: "劳动",
  },
  {
    hanzi: "劳动力",
  },
  {
    hanzi: "辛劳",
  },
  {
    hanzi: "吃苦耐劳",
  },
  {
    hanzi: "荣幸",
  },
  {
    hanzi: "论",
  },
  {
    hanzi: "理论",
  },
  {
    hanzi: "无论",
  },
  {
    hanzi: "讨论",
  },
  {
    hanzi: "结论",
  },
  {
    hanzi: "不论",
  },
  {
    hanzi: "论文",
  },
  {
    hanzi: "评",
  },
  {
    hanzi: "评论",
  },
  {
    hanzi: "评价",
  },
  {
    hanzi: "评估",
  },
  {
    hanzi: "批评",
  },
  {
    hanzi: "评选",
  },
  {
    hanzi: "讯",
  },
  {
    hanzi: "本报讯",
  },
  {
    hanzi: "通讯员",
  },
  {
    hanzi: "通讯",
  },
  {
    hanzi: "看不起",
  },
  {
    hanzi: "轻视",
  },
  {
    hanzi: "讲",
  },
  {
    hanzi: "讲话",
  },
  {
    hanzi: "来讲",
  },
  {
    hanzi: "演讲",
  },
  {
    hanzi: "讲述",
  },
  {
    hanzi: "听讲",
  },
  {
    hanzi: "证",
  },
  {
    hanzi: "证明",
  },
  {
    hanzi: "保证",
  },
  {
    hanzi: "证实",
  },
  {
    hanzi: "证据",
  },
  {
    hanzi: "认证",
  },
  {
    hanzi: "身份证",
  },
  {
    hanzi: "证书",
  },
  {
    hanzi: "证件",
  },
  {
    hanzi: "谈",
  },
  {
    hanzi: "谈判",
  },
  {
    hanzi: "会谈",
  },
  {
    hanzi: "谈到",
  },
  {
    hanzi: "谈话",
  },
  {
    hanzi: "训",
  },
  {
    hanzi: "训练",
  },
  {
    hanzi: "培训",
  },
  {
    hanzi: "采访",
  },
  {
    hanzi: "访问",
  },
  {
    hanzi: "拜访",
  },
  {
    hanzi: "错误",
  },
  {
    hanzi: "失误",
  },
  {
    hanzi: "误会",
  },
  {
    hanzi: "延误",
  },
  {
    hanzi: "订",
  },
  {
    hanzi: "预订",
  },
  {
    hanzi: "诊所",
  },
  {
    hanzi: "诺",
  },
  {
    hanzi: "承诺",
  },
  {
    hanzi: "诺言",
  },
  {
    hanzi: "诚",
  },
  {
    hanzi: "真诚",
  },
  {
    hanzi: "诚实",
  },
  {
    hanzi: "诚意",
  },
  {
    hanzi: "不安",
  },
  {
    hanzi: "不如",
  },
  {
    hanzi: "详细",
  },
  {
    hanzi: "详情",
  },
  {
    hanzi: "友谊",
  },
  {
    hanzi: "县",
  },
  {
    hanzi: "县城",
  },
  {
    hanzi: "区县",
  },
  {
    hanzi: "县长",
  },
  {
    hanzi: "原谅",
  },
  {
    hanzi: "谅解",
  },
  {
    hanzi: "体谅",
  },
  {
    hanzi: "见谅",
  },
  {
    hanzi: "凉",
  },
  {
    hanzi: "清凉",
  },
  {
    hanzi: "冰凉",
  },
  {
    hanzi: "凉快",
  },
  {
    hanzi: "凉水",
  },
  {
    hanzi: "度",
  },
  {
    hanzi: "制度",
  },
  {
    hanzi: "程度",
  },
  {
    hanzi: "高度",
  },
  {
    hanzi: "角度",
  },
  {
    hanzi: "印度",
  },
  {
    hanzi: "力度",
  },
  {
    hanzi: "一度",
  },
  {
    hanzi: "年度",
  },
  {
    hanzi: "季度",
  },
  {
    hanzi: "幅度",
  },
  {
    hanzi: "难度",
  },
  {
    hanzi: "再度",
  },
  {
    hanzi: "度过",
  },
  {
    hanzi: "强度",
  },
  {
    hanzi: "过度",
  },
  {
    hanzi: "印度洋",
  },
  {
    hanzi: "主席",
  },
  {
    hanzi: "毛主席",
  },
  {
    hanzi: "出席",
  },
  {
    hanzi: "首席",
  },
  {
    hanzi: "府",
  },
  {
    hanzi: "底",
  },
  {
    hanzi: "到底",
  },
  {
    hanzi: "年底",
  },
  {
    hanzi: "底下",
  },
  {
    hanzi: "座",
  },
  {
    hanzi: "星座",
  },
  {
    hanzi: "座位",
  },
  {
    hanzi: "如今",
  },
  {
    hanzi: "至今",
  },
  {
    hanzi: "今后",
  },
  {
    hanzi: "与其",
  },
  {
    hanzi: "庆",
  },
  {
    hanzi: "庆祝",
  },
  {
    hanzi: "国庆",
  },
  {
    hanzi: "扩",
  },
  {
    hanzi: "扩大",
  },
  {
    hanzi: "扩张",
  },
  {
    hanzi: "矿",
  },
  {
    hanzi: "矿泉水",
  },
  {
    hanzi: "破",
  },
  {
    hanzi: "突破",
  },
  {
    hanzi: "破坏",
  },
  {
    hanzi: "打破",
  },
  {
    hanzi: "基础",
  },
  {
    hanzi: "障碍",
  },
  {
    hanzi: "阻碍",
  },
  {
    hanzi: "不足",
  },
  {
    hanzi: "总共",
  },
  {
    hanzi: "共有",
  },
  {
    hanzi: "有的是",
  },
  {
    hanzi: "码",
  },
  {
    hanzi: "数码",
  },
  {
    hanzi: "号码",
  },
  {
    hanzi: "密码",
  },
  {
    hanzi: "码头",
  },
  {
    hanzi: "库",
  },
  {
    hanzi: "水库",
  },
  {
    hanzi: "庄",
  },
  {
    hanzi: "村庄",
  },
  {
    hanzi: "石家庄",
  },
  {
    hanzi: "山庄",
  },
  {
    hanzi: "庄严",
  },
  {
    hanzi: "庄重",
  },
  {
    hanzi: "脏",
  },
  {
    hanzi: "心脏",
  },
  {
    hanzi: "内脏",
  },
  {
    hanzi: "脏乱",
  },
  {
    hanzi: "唐",
  },
  {
    hanzi: "糖",
  },
  {
    hanzi: "身边",
  },
  {
    hanzi: "自身",
  },
  {
    hanzi: "自主",
  },
  {
    hanzi: "领",
  },
  {
    hanzi: "领导",
  },
  {
    hanzi: "领域",
  },
  {
    hanzi: "领先",
  },
  {
    hanzi: "领导人",
  },
  {
    hanzi: "带领",
  },
  {
    hanzi: "领取",
  },
  {
    hanzi: "本领",
  },
  {
    hanzi: "零",
  },
  {
    hanzi: "零售",
  },
  {
    hanzi: "零钱",
  },
  {
    hanzi: "零下",
  },
  {
    hanzi: "项",
  },
  {
    hanzi: "项目",
  },
  {
    hanzi: "各项",
  },
  {
    hanzi: "专项",
  },
  {
    hanzi: "事项",
  },
  {
    hanzi: "须",
  },
  {
    hanzi: "必须",
  },
  {
    hanzi: "无须",
  },
  {
    hanzi: "须知",
  },
  {
    hanzi: "修",
  },
  {
    hanzi: "修改",
  },
  {
    hanzi: "装修",
  },
  {
    hanzi: "维修",
  },
  {
    hanzi: "修理",
  },
  {
    hanzi: "彩",
  },
  {
    hanzi: "精彩",
  },
  {
    hanzi: "色彩",
  },
  {
    hanzi: "彩色",
  },
  {
    hanzi: "颜色",
  },
  {
    hanzi: "颜面",
  },
  {
    hanzi: "五颜六色",
  },
  {
    hanzi: "身份",
  },
  {
    hanzi: "随身",
  },
  {
    hanzi: "顺",
  },
  {
    hanzi: "顺利",
  },
  {
    hanzi: "顺便",
  },
  {
    hanzi: "顺序",
  },
  {
    hanzi: "一路顺风",
  },
  {
    hanzi: "照顾",
  },
  {
    hanzi: "顾客",
  },
  {
    hanzi: "回顾",
  },
  {
    hanzi: "视频",
  },
  {
    hanzi: "频道",
  },
  {
    hanzi: "频率",
  },
  {
    hanzi: "顶",
  },
  {
    hanzi: "头顶",
  },
  {
    hanzi: "屋顶",
  },
  {
    hanzi: "山顶",
  },
  {
    hanzi: "硕士",
  },
  {
    hanzi: "丰硕",
  },
  {
    hanzi: "随手",
  },
  {
    hanzi: "手工",
  },
  {
    hanzi: "工厂",
  },
  {
    hanzi: "人工",
  },
  {
    hanzi: "加工",
  },
  {
    hanzi: "状态",
  },
  {
    hanzi: "态度",
  },
  {
    hanzi: "生态",
  },
  {
    hanzi: "心态",
  },
  {
    hanzi: "动态",
  },
  {
    hanzi: "形态",
  },
  {
    hanzi: "志",
  },
  {
    hanzi: "同志",
  },
  {
    hanzi: "标志",
  },
  {
    hanzi: "杂志",
  },
  {
    hanzi: "志愿",
  },
  {
    hanzi: "志愿者",
  },
  {
    hanzi: "念",
  },
  {
    hanzi: "概念",
  },
  {
    hanzi: "理念",
  },
  {
    hanzi: "纪念",
  },
  {
    hanzi: "恋",
  },
  {
    hanzi: "恋爱",
  },
  {
    hanzi: "失恋",
  },
  {
    hanzi: "蛮",
  },
  {
    hanzi: "野蛮",
  },
  {
    hanzi: "加快",
  },
  {
    hanzi: "更加",
  },
  {
    hanzi: "加强",
  },
  {
    hanzi: "强大",
  },
  {
    hanzi: "恩",
  },
  {
    hanzi: "感恩",
  },
  {
    hanzi: "抱怨",
  },
  {
    hanzi: "宛如",
  },
  {
    hanzi: "碗",
  },
  {
    hanzi: "德",
  },
  {
    hanzi: "德国",
  },
  {
    hanzi: "道德",
  },
  {
    hanzi: "道德经",
  },
  {
    hanzi: "电台",
  },
  {
    hanzi: "特色",
  },
  {
    hanzi: "角色",
  },
  {
    hanzi: "急",
  },
  {
    hanzi: "紧急",
  },
  {
    hanzi: "着急",
  },
  {
    hanzi: "急忙",
  },
  {
    hanzi: "焦急",
  },
  {
    hanzi: "隐私",
  },
  {
    hanzi: "稳",
  },
  {
    hanzi: "稳定",
  },
  {
    hanzi: "悲",
  },
  {
    hanzi: "悲剧",
  },
  {
    hanzi: "悲伤",
  },
  {
    hanzi: "得出",
  },
  {
    hanzi: "拿出",
  },
  {
    hanzi: "提出",
  },
  {
    hanzi: "找出",
  },
  {
    hanzi: "发出",
  },
  {
    hanzi: "认出",
  },
  {
    hanzi: "串",
  },
  {
    hanzi: "串串",
  },
  {
    hanzi: "患",
  },
  {
    hanzi: "患者",
  },
  {
    hanzi: "患病",
  },
  {
    hanzi: "考虑",
  },
  {
    hanzi: "焦虑",
  },
  {
    hanzi: "虚",
  },
  {
    hanzi: "虚假",
  },
  {
    hanzi: "弄虚作假",
  },
  {
    hanzi: "虚荣",
  },
  {
    hanzi: "虚伪",
  },
  {
    hanzi: "虎",
  },
  {
    hanzi: "老虎",
  },
  {
    hanzi: "马马虎虎",
  },
  {
    hanzi: "生龙活虎",
  },
  {
    hanzi: "忍",
  },
  {
    hanzi: "忍不住",
  },
  {
    hanzi: "忍受",
  },
  {
    hanzi: "残忍",
  },
  {
    hanzi: "忍耐",
  },
  {
    hanzi: "认可",
  },
  {
    hanzi: "认得",
  },
  {
    hanzi: "懂得",
  },
  {
    hanzi: "取得",
  },
  {
    hanzi: "企",
  },
  {
    hanzi: "企业",
  },
  {
    hanzi: "国有企业",
  },
  {
    hanzi: "中小企业",
  },
  {
    hanzi: "企业家",
  },
  {
    hanzi: "众",
  },
  {
    hanzi: "群众",
  },
  {
    hanzi: "众多",
  },
  {
    hanzi: "公众",
  },
  {
    hanzi: "大众",
  },
  {
    hanzi: "众人",
  },
  {
    hanzi: "民众",
  },
  {
    hanzi: "听众",
  },
  {
    hanzi: "食",
  },
  {
    hanzi: "食品",
  },
  {
    hanzi: "食物",
  },
  {
    hanzi: "零食",
  },
  {
    hanzi: "美食",
  },
  {
    hanzi: "餐",
  },
  {
    hanzi: "早餐",
  },
  {
    hanzi: "晚餐",
  },
  {
    hanzi: "午餐",
  },
  {
    hanzi: "快餐",
  },
  {
    hanzi: "餐桌",
  },
  {
    hanzi: "餐馆",
  },
  {
    hanzi: "餐饮",
  },
  {
    hanzi: "西餐",
  },
  {
    hanzi: "中餐",
  },
  {
    hanzi: "大门",
  },
  {
    hanzi: "出门",
  },
  {
    hanzi: "出院",
  },
  {
    hanzi: "住院",
  },
  {
    hanzi: "院子",
  },
  {
    hanzi: "站住",
  },
  {
    hanzi: "住房",
  },
  {
    hanzi: "谷",
  },
  {
    hanzi: "曼谷",
  },
  {
    hanzi: "低谷",
  },
  {
    hanzi: "山谷",
  },
  {
    hanzi: "容",
  },
  {
    hanzi: "内容",
  },
  {
    hanzi: "容易",
  },
  {
    hanzi: "笑容",
  },
  {
    hanzi: "美容",
  },
  {
    hanzi: "容貌",
  },
  {
    hanzi: "容纳",
  },
  {
    hanzi: "容忍",
  },
  {
    hanzi: "欲",
  },
  {
    hanzi: "欲望",
  },
  {
    hanzi: "食欲",
  },
  {
    hanzi: "随心所欲",
  },
  {
    hanzi: "复",
  },
  {
    hanzi: "回复",
  },
  {
    hanzi: "复杂",
  },
  {
    hanzi: "反复",
  },
  {
    hanzi: "重复",
  },
  {
    hanzi: "复习",
  },
  {
    hanzi: "复印",
  },
  {
    hanzi: "阳",
  },
  {
    hanzi: "阳光",
  },
  {
    hanzi: "太阳",
  },
  {
    hanzi: "阴阳",
  },
  {
    hanzi: "申",
  },
  {
    hanzi: "申请",
  },
  {
    hanzi: "申报",
  },
  {
    hanzi: "重申",
  },
  {
    hanzi: "审计",
  },
  {
    hanzi: "审议",
  },
  {
    hanzi: "审批",
  },
  {
    hanzi: "审查",
  },
  {
    hanzi: "神",
  },
  {
    hanzi: "精神",
  },
  {
    hanzi: "神马",
  },
  {
    hanzi: "神经",
  },
  {
    hanzi: "神秘",
  },
  {
    hanzi: "眼神",
  },
  {
    hanzi: "神奇",
  },
  {
    hanzi: "智能",
  },
  {
    hanzi: "智力",
  },
  {
    hanzi: "理智",
  },
  {
    hanzi: "出色",
  },
  {
    hanzi: "出示",
  },
  {
    hanzi: "出口",
  },
  {
    hanzi: "进口",
  },
  {
    hanzi: "暗",
  },
  {
    hanzi: "黑暗",
  },
  {
    hanzi: "暗示",
  },
  {
    hanzi: "早晨",
  },
  {
    hanzi: "晨报",
  },
  {
    hanzi: "震",
  },
  {
    hanzi: "地震",
  },
  {
    hanzi: "晴",
  },
  {
    hanzi: "晴天",
  },
  {
    hanzi: "暑假",
  },
  {
    hanzi: "暑期",
  },
  {
    hanzi: "进入",
  },
  {
    hanzi: "深入",
  },
  {
    hanzi: "前进",
  },
  {
    hanzi: "推进",
  },
  {
    hanzi: "先进",
  },
  {
    hanzi: "改进",
  },
  {
    hanzi: "改正",
  },
  {
    hanzi: "正是",
  },
  {
    hanzi: "怪",
  },
  {
    hanzi: "奇怪",
  },
  {
    hanzi: "难怪",
  },
  {
    hanzi: "性",
  },
  {
    hanzi: "女性",
  },
  {
    hanzi: "性能",
  },
  {
    hanzi: "个性",
  },
  {
    hanzi: "性格",
  },
  {
    hanzi: "男性",
  },
  {
    hanzi: "可能性",
  },
  {
    hanzi: "理性",
  },
  {
    hanzi: "性感",
  },
  {
    hanzi: "积极性",
  },
  {
    hanzi: "活性",
  },
  {
    hanzi: "异性",
  },
  {
    hanzi: "急性",
  },
  {
    hanzi: "性欲",
  },
  {
    hanzi: "性别",
  },
  {
    hanzi: "怀",
  },
  {
    hanzi: "怀疑",
  },
  {
    hanzi: "怀念",
  },
  {
    hanzi: "惊",
  },
  {
    hanzi: "惊喜",
  },
  {
    hanzi: "吃惊",
  },
  {
    hanzi: "震惊",
  },
  {
    hanzi: "接近",
  },
  {
    hanzi: "话题",
  },
  {
    hanzi: "试题",
  },
  {
    hanzi: "题目",
  },
  {
    hanzi: "可惜",
  },
  {
    hanzi: "不惜",
  },
  {
    hanzi: "爱惜",
  },
  {
    hanzi: "在所不惜",
  },
  {
    hanzi: "回忆",
  },
  {
    hanzi: "记忆",
  },
  {
    hanzi: "记忆力",
  },
  {
    hanzi: "悔",
  },
  {
    hanzi: "后悔",
  },
  {
    hanzi: "悔过",
  },
  {
    hanzi: "悔改",
  },
  {
    hanzi: "遗憾",
  },
  {
    hanzi: "怜",
  },
  {
    hanzi: "可怜",
  },
  {
    hanzi: "贯",
  },
  {
    hanzi: "一贯",
  },
  {
    hanzi: "惯",
  },
  {
    hanzi: "习惯",
  },
  {
    hanzi: "惯例",
  },
  {
    hanzi: "惯性",
  },
  {
    hanzi: "华",
  },
  {
    hanzi: "新华社",
  },
  {
    hanzi: "中华",
  },
  {
    hanzi: "新华网",
  },
  {
    hanzi: "中华人民共和国",
  },
  {
    hanzi: "华人",
  },
  {
    hanzi: "中华民族",
  },
  {
    hanzi: "克",
  },
  {
    hanzi: "伊拉克",
  },
  {
    hanzi: "克服",
  },
  {
    hanzi: "巧克力",
  },
  {
    hanzi: "千克",
  },
  {
    hanzi: "目前",
  },
  {
    hanzi: "从前",
  },
  {
    hanzi: "从小",
  },
  {
    hanzi: "从而",
  },
  {
    hanzi: "反而",
  },
  {
    hanzi: "因而",
  },
  {
    hanzi: "从此",
  },
  {
    hanzi: "此外",
  },
  {
    hanzi: "党",
  },
  {
    hanzi: "党员",
  },
  {
    hanzi: "国民党",
  },
  {
    hanzi: "掌",
  },
  {
    hanzi: "掌声",
  },
  {
    hanzi: "鼓掌",
  },
  {
    hanzi: "击掌",
  },
  {
    hanzi: "堂",
  },
  {
    hanzi: "天堂",
  },
  {
    hanzi: "课堂",
  },
  {
    hanzi: "食堂",
  },
  {
    hanzi: "教堂",
  },
  {
    hanzi: "葡萄",
  },
  {
    hanzi: "葡萄酒",
  },
  {
    hanzi: "葡萄牙",
  },
  {
    hanzi: "缺",
  },
  {
    hanzi: "缺少",
  },
  {
    hanzi: "缺点",
  },
  {
    hanzi: "缺乏",
  },
  {
    hanzi: "筷子",
  },
  {
    hanzi: "师傅",
  },
  {
    hanzi: "博",
  },
  {
    hanzi: "博文",
  },
  {
    hanzi: "博士",
  },
  {
    hanzi: "博物馆",
  },
  {
    hanzi: "从事 1",
  },
  {
    hanzi: "事先",
  },
  {
    hanzi: "人事 1",
  },
  {
    hanzi: "胳膊",
  },
  {
    hanzi: "薄",
  },
  {
    hanzi: "产品",
  },
  {
    hanzi: "生产",
  },
  {
    hanzi: "产业",
  },
  {
    hanzi: "产生",
  },
  {
    hanzi: "房地产",
  },
  {
    hanzi: "产",
  },
  {
    hanzi: "产量",
  },
  {
    hanzi: "地产",
  },
  {
    hanzi: "无产阶级",
  },
  {
    hanzi: "房产",
  },
  {
    hanzi: "国产",
  },
  {
    hanzi: "遗产",
  },
  {
    hanzi: "质",
  },
  {
    hanzi: "质量",
  },
  {
    hanzi: "素质",
  },
  {
    hanzi: "物质",
  },
  {
    hanzi: "性质",
  },
  {
    hanzi: "品质",
  },
  {
    hanzi: "优质",
  },
  {
    hanzi: "气质",
  },
  {
    hanzi: "质疑",
  },
  {
    hanzi: "蛋白质",
  },
  {
    hanzi: "厅",
  },
  {
    hanzi: "餐厅",
  },
  {
    hanzi: "大厅",
  },
  {
    hanzi: "客厅",
  },
  {
    hanzi: "厉害",
  },
  {
    hanzi: "严厉",
  },
  {
    hanzi: "鼓励",
  },
  {
    hanzi: "奖励",
  },
  {
    hanzi: "激励",
  },
  {
    hanzi: "危机",
  },
  {
    hanzi: "危害",
  },
  {
    hanzi: "厨",
  },
  {
    hanzi: "厨房",
  },
  {
    hanzi: "厨师",
  },
  {
    hanzi: "登",
  },
  {
    hanzi: "登陆",
  },
  {
    hanzi: "登山",
  },
  {
    hanzi: "登机",
  },
  {
    hanzi: "登机牌",
  },
  {
    hanzi: "人员",
  },
  {
    hanzi: "成员",
  },
  {
    hanzi: "会员",
  },
  {
    hanzi: "公务员",
  },
  {
    hanzi: "人才",
  },
  {
    hanzi: "才能",
  },
  {
    hanzi: "段",
  },
  {
    hanzi: "阶段",
  },
  {
    hanzi: "一段",
  },
  {
    hanzi: "手段",
  },
  {
    hanzi: "政",
  },
  {
    hanzi: "政府",
  },
  {
    hanzi: "政治",
  },
  {
    hanzi: "行政",
  },
  {
    hanzi: "市政府",
  },
  {
    hanzi: "政协",
  },
  {
    hanzi: "邮政",
  },
  {
    hanzi: "效",
  },
  {
    hanzi: "有效",
  },
  {
    hanzi: "效果",
  },
  {
    hanzi: "效率",
  },
  {
    hanzi: "效应",
  },
  {
    hanzi: "疗效",
  },
  {
    hanzi: "故",
  },
  {
    hanzi: "故事",
  },
  {
    hanzi: "事故",
  },
  {
    hanzi: "故意",
  },
  {
    hanzi: "故障",
  },
  {
    hanzi: "故乡",
  },
  {
    hanzi: "散",
  },
  {
    hanzi: "扩散",
  },
  {
    hanzi: "散步",
  },
  {
    hanzi: "攻",
  },
  {
    hanzi: "攻击",
  },
  {
    hanzi: "进攻",
  },
  {
    hanzi: "败",
  },
  {
    hanzi: "失败",
  },
  {
    hanzi: "击败",
  },
  {
    hanzi: "打败",
  },
  {
    hanzi: "敢",
  },
  {
    hanzi: "不敢",
  },
  {
    hanzi: "勇敢",
  },
  {
    hanzi: "聪明",
  },
  {
    hanzi: "敌",
  },
  {
    hanzi: "敌人",
  },
  {
    hanzi: "尊敬",
  },
  {
    hanzi: "敬业",
  },
  {
    hanzi: "敬礼",
  },
  {
    hanzi: "警",
  },
  {
    hanzi: "警方",
  },
  {
    hanzi: "民警",
  },
  {
    hanzi: "交警",
  },
  {
    hanzi: "报警",
  },
  {
    hanzi: "警告",
  },
  {
    hanzi: "傲",
  },
  {
    hanzi: "高傲",
  },
  {
    hanzi: "傲慢",
  },
  {
    hanzi: "熬",
  },
  {
    hanzi: "熬夜",
  },
  {
    hanzi: "局",
  },
  {
    hanzi: "局面",
  },
  {
    hanzi: "局长",
  },
  {
    hanzi: "总局",
  },
  {
    hanzi: "格局",
  },
  {
    hanzi: "格局",
  },
  {
    hanzi: "结局",
  },
  {
    hanzi: "当局",
  },
  {
    hanzi: "邮局",
  },
  {
    hanzi: "居",
  },
  {
    hanzi: "居民",
  },
  {
    hanzi: "居然",
  },
  {
    hanzi: "居住",
  },
  {
    hanzi: "邻居",
  },
  {
    hanzi: "层",
  },
  {
    hanzi: "基层",
  },
  {
    hanzi: "高层",
  },
  {
    hanzi: "层次",
  },
  {
    hanzi: "尝",
  },
  {
    hanzi: "尝试",
  },
  {
    hanzi: "品尝",
  },
  {
    hanzi: "宝贵",
  },
  {
    hanzi: "感受",
  },
  {
    hanzi: "感想",
  },
  {
    hanzi: "思想",
  },
  {
    hanzi: "属",
  },
  {
    hanzi: "属于",
  },
  {
    hanzi: "金属",
  },
  {
    hanzi: "家属",
  },
  {
    hanzi: "附属",
  },
  {
    hanzi: "尼",
  },
  {
    hanzi: "届",
  },
  {
    hanzi: "本届",
  },
  {
    hanzi: "届时",
  },
  {
    hanzi: "尺子",
  },
  {
    hanzi: "尺寸",
  },
  {
    hanzi: "尽",
  },
  {
    hanzi: "尽管",
  },
  {
    hanzi: "尽快",
  },
  {
    hanzi: "尽量",
  },
  {
    hanzi: "迟到",
  },
  {
    hanzi: "推迟",
  },
  {
    hanzi: "迟早",
  },
  {
    hanzi: "延迟",
  },
  {
    hanzi: "屏",
  },
  {
    hanzi: "权",
  },
  {
    hanzi: "股权",
  },
  {
    hanzi: "权利",
  },
  {
    hanzi: "权力",
  },
  {
    hanzi: "产权",
  },
  {
    hanzi: "知识产权",
  },
  {
    hanzi: "授权",
  },
  {
    hanzi: "观",
  },
  {
    hanzi: "观众",
  },
  {
    hanzi: "观念",
  },
  {
    hanzi: "观点",
  },
  {
    hanzi: "客观",
  },
  {
    hanzi: "观看",
  },
  {
    hanzi: "乐观",
  },
  {
    hanzi: "悲观",
  },
  {
    hanzi: "外观",
  },
  {
    hanzi: "双",
  },
  {
    hanzi: "双方",
  },
  {
    hanzi: "双手",
  },
  {
    hanzi: "难免",
  },
  {
    hanzi: "难题",
  },
  {
    hanzi: "摄",
  },
  {
    hanzi: "拍摄",
  },
  {
    hanzi: "摄影",
  },
  {
    hanzi: "摄影师",
  },
  {
    hanzi: "摄影机",
  },
  {
    hanzi: "戏",
  },
  {
    hanzi: "游戏",
  },
  {
    hanzi: "戏剧",
  },
  {
    hanzi: "敲",
  },
  {
    hanzi: "敲门",
  },
  {
    hanzi: "敲定",
  },
  {
    hanzi: "叔",
  },
  {
    hanzi: "叔叔",
  },
  {
    hanzi: "亲戚",
  },
  {
    hanzi: "椒",
  },
  {
    hanzi: "辣椒",
  },
  {
    hanzi: "花椒",
  },
  {
    hanzi: "胡椒",
  },
  {
    hanzi: "血",
  },
  {
    hanzi: "血管",
  },
  {
    hanzi: "血液",
  },
  {
    hanzi: "出血",
  },
  {
    hanzi: "高血压",
  },
  {
    hanzi: "血压",
  },
  {
    hanzi: "利益",
  },
  {
    hanzi: "收益",
  },
  {
    hanzi: "效益",
  },
  {
    hanzi: "权益",
  },
  {
    hanzi: "日益",
  },
  {
    hanzi: "温",
  },
  {
    hanzi: "温暖",
  },
  {
    hanzi: "温度",
  },
  {
    hanzi: "气温",
  },
  {
    hanzi: "温泉",
  },
  {
    hanzi: "国王",
  },
  {
    hanzi: "王子",
  },
  {
    hanzi: "竹子",
  },
  {
    hanzi: "男子",
  },
  {
    hanzi: "女子",
  },
  {
    hanzi: "种子",
  },
  {
    hanzi: "子女",
  },
  {
    hanzi: "法院",
  },
  {
    hanzi: "监",
  },
  {
    hanzi: "监管",
  },
  {
    hanzi: "监测",
  },
  {
    hanzi: "监控",
  },
  {
    hanzi: "监督",
  },
  {
    hanzi: "临",
  },
  {
    hanzi: "临床",
  },
  {
    hanzi: "面临",
  },
  {
    hanzi: "临时",
  },
  {
    hanzi: "篮球",
  },
  {
    hanzi: "蓝",
  },
  {
    hanzi: "蓝色",
  },
  {
    hanzi: "蓝图",
  },
  {
    hanzi: "汉语蓝图",
  },
  {
    hanzi: "盛",
  },
  {
    hanzi: "盖",
  },
  {
    hanzi: "联盟",
  },
  {
    hanzi: "欧盟",
  },
  {
    hanzi: "加盟",
  },
  {
    hanzi: "盐",
  },
  {
    hanzi: "盒",
  },
  {
    hanzi: "盒子",
  },
  {
    hanzi: "盒饭",
  },
  {
    hanzi: "饭盒",
  },
  {
    hanzi: "包装盒",
  },
  {
    hanzi: "宣传",
  },
  {
    hanzi: "守",
  },
  {
    hanzi: "防守",
  },
  {
    hanzi: "灾",
  },
  {
    hanzi: "火灾",
  },
  {
    hanzi: "灾害",
  },
  {
    hanzi: "灾难",
  },
  {
    hanzi: "救灾",
  },
  {
    hanzi: "宗",
  },
  {
    hanzi: "宗教",
  },
  {
    hanzi: "正宗",
  },
  {
    hanzi: "奥",
  },
  {
    hanzi: "奥运",
  },
  {
    hanzi: "奥运会",
  },
  {
    hanzi: "观察",
  },
  {
    hanzi: "警察",
  },
  {
    hanzi: "考察",
  },
  {
    hanzi: "监察",
  },
  {
    hanzi: "擦",
  },
  {
    hanzi: "摩擦",
  },
  {
    hanzi: "擦干",
  },
  {
    hanzi: "擦伤",
  },
  {
    hanzi: "赛",
  },
  {
    hanzi: "比赛",
  },
  {
    hanzi: "联赛",
  },
  {
    hanzi: "决赛",
  },
  {
    hanzi: "赛季",
  },
  {
    hanzi: "大赛",
  },
  {
    hanzi: "赛事",
  },
  {
    hanzi: "寒",
  },
  {
    hanzi: "寒冷",
  },
  {
    hanzi: "寒假",
  },
  {
    hanzi: "塞",
  },
  {
    hanzi: "塞车",
  },
  {
    hanzi: "堵塞",
  },
  {
    hanzi: "春",
  },
  {
    hanzi: "春节",
  },
  {
    hanzi: "青春",
  },
  {
    hanzi: "春天",
  },
  {
    hanzi: "春运",
  },
  {
    hanzi: "春季",
  },
  {
    hanzi: "春秋",
  },
  {
    hanzi: "信奉",
  },
  {
    hanzi: "棒",
  },
  {
    hanzi: "棒子",
  },
  {
    hanzi: "棒球",
  },
  {
    hanzi: "举",
  },
  {
    hanzi: "举行",
  },
  {
    hanzi: "举办",
  },
  {
    hanzi: "选举",
  },
  {
    hanzi: "举报",
  },
  {
    hanzi: "抬举",
  },
  {
    hanzi: "举重",
  },
  {
    hanzi: "举手",
  },
  {
    hanzi: "选择",
  },
  {
    hanzi: "播",
  },
  {
    hanzi: "传播",
  },
  {
    hanzi: "直播员",
  },
  {
    hanzi: "广播",
  },
  {
    hanzi: "播放",
  },
  {
    hanzi: "播出",
  },
  {
    hanzi: "直播",
  },
  {
    hanzi: "释放",
  },
  {
    hanzi: "解释",
  },
  {
    hanzi: "据悉",
  },
  {
    hanzi: "悉心",
  },
  {
    hanzi: "羽毛球",
  },
  {
    hanzi: "羽毛",
  },
  {
    hanzi: "翻",
  },
  {
    hanzi: "翻译",
  },
  {
    hanzi: "扇子",
  },
  {
    hanzi: "旁",
  },
  {
    hanzi: "旁边",
  },
  {
    hanzi: "一旁",
  },
  {
    hanzi: "身旁",
  },
  {
    hanzi: "童",
  },
  {
    hanzi: "儿童",
  },
  {
    hanzi: "童年",
  },
  {
    hanzi: "童话",
  },
  {
    hanzi: "童心",
  },
  {
    hanzi: "竞争",
  },
  {
    hanzi: "竞争力",
  },
  {
    hanzi: "竞赛",
  },
  {
    hanzi: "章",
  },
  {
    hanzi: "文章",
  },
  {
    hanzi: "篇章",
  },
  {
    hanzi: "端",
  },
  {
    hanzi: "端庄",
  },
  {
    hanzi: "帝",
  },
  {
    hanzi: "皇帝",
  },
  {
    hanzi: "上帝",
  },
  {
    hanzi: "商",
  },
  {
    hanzi: "商业",
  },
  {
    hanzi: "商品",
  },
  {
    hanzi: "商务",
  },
  {
    hanzi: "工商",
  },
  {
    hanzi: "厂商",
  },
  {
    hanzi: "商场",
  },
  {
    hanzi: "商标",
  },
  {
    hanzi: "协商",
  },
  {
    hanzi: "商业银行",
  },
  {
    hanzi: "商家",
  },
  {
    hanzi: "商店",
    hskLevels: 1,
  },
  {
    hanzi: "商量",
  },
  {
    hanzi: "智商",
  },
  {
    hanzi: "商人",
  },
  {
    hanzi: "连忙",
  },
  {
    hanzi: "万一",
  },
  {
    hanzi: "一再",
  },
  {
    hanzi: "再三",
  },
  {
    hanzi: "橘子",
  },
  {
    hanzi: "费",
  },
  {
    hanzi: "消费者",
  },
  {
    hanzi: "消费",
  },
  {
    hanzi: "费用",
  },
  {
    hanzi: "免费",
  },
  {
    hanzi: "收费",
  },
  {
    hanzi: "浪费",
  },
  {
    hanzi: "经费",
  },
  {
    hanzi: "交费",
  },
  {
    hanzi: "学费",
  },
  {
    hanzi: "佛",
  },
  {
    hanzi: "佛教",
  },
  {
    hanzi: "聊",
  },
  {
    hanzi: "无聊",
  },
  {
    hanzi: "聊天",
  },
  {
    hanzi: "贸易",
  },
  {
    hanzi: "经贸",
  },
  {
    hanzi: "外贸",
  },
  {
    hanzi: "留",
  },
  {
    hanzi: "留下",
  },
  {
    hanzi: "保留",
  },
  {
    hanzi: "停留",
  },
  {
    hanzi: "留学",
  },
  {
    hanzi: "留学生",
  },
  {
    hanzi: "债",
  },
  {
    hanzi: "债务",
  },
  {
    hanzi: "贴",
  },
  {
    hanzi: "体贴",
  },
  {
    hanzi: "战",
  },
  {
    hanzi: "战争",
  },
  {
    hanzi: "挑战",
  },
  {
    hanzi: "战斗",
  },
  {
    hanzi: "战胜",
  },
  {
    hanzi: "作战",
  },
  {
    hanzi: "战士",
  },
  {
    hanzi: "战术",
  },
  {
    hanzi: "赔",
  },
  {
    hanzi: "赔钱",
  },
  {
    hanzi: "赔偿",
  },
  {
    hanzi: "采取",
  },
  {
    hanzi: "采用",
  },
  {
    hanzi: "财",
  },
  {
    hanzi: "财政",
  },
  {
    hanzi: "财务",
  },
  {
    hanzi: "财产",
  },
  {
    hanzi: "财富",
  },
  {
    hanzi: "理财",
  },
  {
    hanzi: "贫穷",
  },
  {
    hanzi: "扶贫",
  },
  {
    hanzi: "贷",
  },
  {
    hanzi: "参",
  },
  {
    hanzi: "参加",
  },
  {
    hanzi: "参与",
  },
  {
    hanzi: "参考",
  },
  {
    hanzi: "参赛",
  },
  {
    hanzi: "参观",
  },
  {
    hanzi: "类",
  },
  {
    hanzi: "人类",
  },
  {
    hanzi: "类似",
  },
  {
    hanzi: "各类",
  },
  {
    hanzi: "类型",
  },
  {
    hanzi: "分类",
  },
  {
    hanzi: "中央",
  },
  {
    hanzi: "央行",
  },
  {
    hanzi: "央视",
  },
  {
    hanzi: "英",
  },
  {
    hanzi: "英国",
  },
  {
    hanzi: "英语",
  },
  {
    hanzi: "英寸",
  },
  {
    hanzi: "英文",
  },
  {
    hanzi: "映",
  },
  {
    hanzi: "反映",
  },
  {
    hanzi: "换",
  },
  {
    hanzi: "转换",
  },
  {
    hanzi: "交换",
  },
  {
    hanzi: "更换",
  },
  {
    hanzi: "好奇",
  },
  {
    hanzi: "好客",
  },
  {
    hanzi: "请客",
  },
  {
    hanzi: "做客",
  },
  {
    hanzi: "做法",
  },
  {
    hanzi: "大大",
  },
  {
    hanzi: "兴奋",
  },
  {
    hanzi: "奋斗",
  },
  {
    hanzi: "争夺",
  },
  {
    hanzi: "夺得",
  },
  {
    hanzi: "夺取",
  },
  {
    hanzi: "争分夺秒",
  },
  {
    hanzi: "莫",
  },
  {
    hanzi: "后悔莫及",
  },
  {
    hanzi: "模",
  },
  {
    hanzi: "模式",
  },
  {
    hanzi: "规模",
  },
  {
    hanzi: "模型",
  },
  {
    hanzi: "大规模",
  },
  {
    hanzi: "模版",
  },
  {
    hanzi: "幕",
  },
  {
    hanzi: "开幕",
  },
  {
    hanzi: "幕后",
  },
  {
    hanzi: "屏幕",
  },
  {
    hanzi: "膜",
  },
  {
    hanzi: "角膜",
  },
  {
    hanzi: "羡慕",
  },
  {
    hanzi: "爱慕",
  },
  {
    hanzi: "慕名而来",
  },
  {
    hanzi: "存",
  },
  {
    hanzi: "存在",
  },
  {
    hanzi: "生存",
  },
  {
    hanzi: "库存",
  },
  {
    hanzi: "保存",
  },
  {
    hanzi: "李",
  },
  {
    hanzi: "行李",
  },
  {
    hanzi: "享",
  },
  {
    hanzi: "分享",
  },
  {
    hanzi: "享受",
  },
  {
    hanzi: "共享",
  },
  {
    hanzi: "亮",
  },
  {
    hanzi: "月亮",
  },
  {
    hanzi: "漂亮",
    hskLevels: 1,
  },
  {
    hanzi: "熟",
  },
  {
    hanzi: "成熟",
  },
  {
    hanzi: "熟悉",
  },
  {
    hanzi: "熟人",
  },
  {
    hanzi: "熟知",
  },
  {
    hanzi: "熟睡",
  },
  {
    hanzi: "熟练",
  },
  {
    hanzi: "孙女",
  },
  {
    hanzi: "孙子",
  },
  {
    hanzi: "子孙",
  },
  {
    hanzi: "获",
  },
  {
    hanzi: "获得",
  },
  {
    hanzi: "获悉",
  },
  {
    hanzi: "收获",
  },
  {
    hanzi: "获取",
  },
  {
    hanzi: "文献",
  },
  {
    hanzi: "奉献",
  },
  {
    hanzi: "贡献",
  },
  {
    hanzi: "默默",
  },
  {
    hanzi: "沉默",
  },
  {
    hanzi: "默认",
  },
  {
    hanzi: "幽默",
  },
  {
    hanzi: "独",
  },
  {
    hanzi: "独立",
  },
  {
    hanzi: "独特",
  },
  {
    hanzi: "单独",
  },
  {
    hanzi: "独自",
  },
  {
    hanzi: "孤独",
  },
  {
    hanzi: "融",
  },
  {
    hanzi: "金融",
  },
  {
    hanzi: "融合",
  },
  {
    hanzi: "融化",
  },
  {
    hanzi: "犯",
  },
  {
    hanzi: "犯罪",
  },
  {
    hanzi: "狂",
  },
  {
    hanzi: "疯狂",
  },
  {
    hanzi: "猜",
  },
  {
    hanzi: "猜测",
  },
  {
    hanzi: "猜猜",
  },
  {
    hanzi: "猜想",
  },
  {
    hanzi: "猜中",
  },
  {
    hanzi: "检",
  },
  {
    hanzi: "检查",
  },
  {
    hanzi: "检测",
  },
  {
    hanzi: "经验",
  },
  {
    hanzi: "实验",
  },
  {
    hanzi: "实验室",
  },
  {
    hanzi: "试验",
  },
  {
    hanzi: "体验",
  },
  {
    hanzi: "检验",
  },
  {
    hanzi: "考验",
  },
  {
    hanzi: "险",
  },
  {
    hanzi: "风险",
  },
  {
    hanzi: "保险",
  },
  {
    hanzi: "危险",
  },
  {
    hanzi: "保险公司",
  },
  {
    hanzi: "脸",
  },
  {
    hanzi: "脸色",
  },
  {
    hanzi: "签",
  },
  {
    hanzi: "签订",
  },
  {
    hanzi: "签名",
  },
  {
    hanzi: "签到",
  },
  {
    hanzi: "签约",
  },
  {
    hanzi: "签字",
  },
  {
    hanzi: "标签",
  },
  {
    hanzi: "签证",
  },
  {
    hanzi: "斯",
  },
  {
    hanzi: "歇斯底里",
  },
  {
    hanzi: "莫斯科",
  },
  {
    hanzi: "甚",
  },
  {
    hanzi: "甚至",
  },
  {
    hanzi: "重大",
  },
  {
    hanzi: "大方",
  },
  {
    hanzi: "广大",
  },
  {
    hanzi: "断",
  },
  {
    hanzi: "不断",
  },
  {
    hanzi: "诊断",
  },
  {
    hanzi: "判断",
  },
  {
    hanzi: "果断",
  },
  {
    hanzi: "斩",
  },
  {
    hanzi: "斩断",
  },
  {
    hanzi: "暂",
  },
  {
    hanzi: "暂时",
  },
  {
    hanzi: "暂停",
  },
  {
    hanzi: "短暂",
  },
  {
    hanzi: "暂定",
  },
  {
    hanzi: "暂缓",
  },
  {
    hanzi: "丘",
  },
  {
    hanzi: "山丘",
  },
  {
    hanzi: "乒乓球",
  },
  {
    hanzi: "兵",
  },
  {
    hanzi: "士兵",
  },
  {
    hanzi: "宾馆",
  },
  {
    hanzi: "军",
  },
  {
    hanzi: "冠军",
  },
  {
    hanzi: "军事",
  },
  {
    hanzi: "军队",
  },
  {
    hanzi: "将军",
  },
  {
    hanzi: "海军",
  },
  {
    hanzi: "季军",
  },
  {
    hanzi: "农",
  },
  {
    hanzi: "农村",
  },
  {
    hanzi: "农民",
  },
  {
    hanzi: "农业",
  },
  {
    hanzi: "农民工",
  },
  {
    hanzi: "推广",
  },
  {
    hanzi: "情景",
  },
  {
    hanzi: "情感",
  },
  {
    hanzi: "编辑",
  },
  {
    hanzi: "专辑",
  },
  {
    hanzi: "转载",
  },
  {
    hanzi: "记载",
  },
  {
    hanzi: "下载",
  },
  {
    hanzi: "总裁",
  },
  {
    hanzi: "裁判",
  },
  {
    hanzi: "戴",
  },
  {
    hanzi: "戴尔",
  },
  {
    hanzi: "戴上",
  },
  {
    hanzi: "爱戴",
  },
  {
    hanzi: "穿戴",
  },
  {
    hanzi: "船",
  },
  {
    hanzi: "飞船",
  },
  {
    hanzi: "船票",
  },
  {
    hanzi: "划船",
  },
  {
    hanzi: "般",
  },
  {
    hanzi: "一般",
  },
  {
    hanzi: "一般来说",
  },
  {
    hanzi: "搬",
  },
  {
    hanzi: "搬家",
  },
  {
    hanzi: "抗",
  },
  {
    hanzi: "反抗",
  },
  {
    hanzi: "航",
  },
  {
    hanzi: "航空",
  },
  {
    hanzi: "航班",
  },
  {
    hanzi: "导航",
  },
  {
    hanzi: "盘",
  },
  {
    hanzi: "收盘",
  },
  {
    hanzi: "硬盘",
  },
  {
    hanzi: "盘子",
  },
  {
    hanzi: "封",
  },
  {
    hanzi: "信封",
  },
  {
    hanzi: "佳",
  },
  {
    hanzi: "最佳",
  },
  {
    hanzi: "挂",
  },
  {
    hanzi: "改革",
  },
  {
    hanzi: "革命",
  },
  {
    hanzi: "改革开放",
  },
  {
    hanzi: "鞋",
  },
  {
    hanzi: "鞋子",
  },
  {
    hanzi: "皮鞋",
  },
  {
    hanzi: "高跟鞋",
  },
  {
    hanzi: "运动鞋",
  },
  {
    hanzi: "鞋带",
  },
  {
    hanzi: "球鞋",
  },
  {
    hanzi: "街",
  },
  {
    hanzi: "街道",
  },
  {
    hanzi: "街头",
  },
  {
    hanzi: "大街",
  },
  {
    hanzi: "逛街",
  },
  {
    hanzi: "上街",
  },
  {
    hanzi: "街上",
  },
  {
    hanzi: "步行街",
  },
  {
    hanzi: "政策",
  },
  {
    hanzi: "决策",
  },
  {
    hanzi: "策划",
  },
  {
    hanzi: "符合",
  },
  {
    hanzi: "符号",
  },
  {
    hanzi: "名符其实",
  },
  {
    hanzi: "箱",
  },
  {
    hanzi: "冰箱",
  },
  {
    hanzi: "邮箱",
  },
  {
    hanzi: "行李箱",
  },
  {
    hanzi: "笨",
  },
  {
    hanzi: "笨蛋",
  },
  {
    hanzi: "笨重",
  },
  {
    hanzi: "笔",
  },
  {
    hanzi: "笔者",
  },
  {
    hanzi: "笔记",
  },
  {
    hanzi: "笔记本",
  },
  {
    hanzi: "答",
  },
  {
    hanzi: "回答",
  },
  {
    hanzi: "答案",
  },
  {
    hanzi: "答应",
  },
  {
    hanzi: "建筑",
  },
  {
    hanzi: "恐怕",
  },
  {
    hanzi: "恐惧",
  },
  {
    hanzi: "恐怖",
  },
  {
    hanzi: "恐怖主义",
  },
  {
    hanzi: "恐怖组织",
  },
  {
    hanzi: "委",
  },
  {
    hanzi: "委员",
  },
  {
    hanzi: "委员会",
  },
  {
    hanzi: "党委",
  },
  {
    hanzi: "委托",
  },
  {
    hanzi: "省委",
  },
  {
    hanzi: "市委",
  },
  {
    hanzi: "威",
  },
  {
    hanzi: "权威",
  },
  {
    hanzi: "威胁",
  },
  {
    hanzi: "婚",
  },
  {
    hanzi: "结婚",
  },
  {
    hanzi: "离婚",
  },
  {
    hanzi: "婚礼",
  },
  {
    hanzi: "媒体",
  },
  {
    hanzi: "妇女",
  },
  {
    hanzi: "夫妇",
  },
  {
    hanzi: "妻子",
  },
  {
    hanzi: "夫妻",
  },
  {
    hanzi: "不妨",
  },
  {
    hanzi: "妨碍",
  },
  {
    hanzi: "周围",
  },
  {
    hanzi: "范围",
  },
  {
    hanzi: "困",
  },
  {
    hanzi: "困难",
  },
  {
    hanzi: "困扰",
  },
  {
    hanzi: "固定",
  },
  {
    hanzi: "巩固",
  },
  {
    hanzi: "圆",
  },
  {
    hanzi: "卷",
  },
  {
    hanzi: "券",
  },
  {
    hanzi: "证券",
  },
  {
    hanzi: "圈",
  },
  {
    hanzi: "圈子",
  },
  {
    hanzi: "眼圈",
  },
  {
    hanzi: "窗",
  },
  {
    hanzi: "窗口",
  },
  {
    hanzi: "窗户",
  },
  {
    hanzi: "窗外",
  },
  {
    hanzi: "车窗",
  },
  {
    hanzi: "窗帘",
  },
  {
    hanzi: "布",
  },
  {
    hanzi: "公布",
  },
  {
    hanzi: "发布",
  },
  {
    hanzi: "宣布",
  },
  {
    hanzi: "分布",
  },
  {
    hanzi: "布什",
  },
  {
    hanzi: "新闻发布会",
  },
  {
    hanzi: "布局",
  },
  {
    hanzi: "遍布",
  },
  {
    hanzi: "币",
  },
  {
    hanzi: "人民币",
  },
  {
    hanzi: "金币",
  },
  {
    hanzi: "港币",
  },
  {
    hanzi: "硬币",
  },
  {
    hanzi: "纸币",
  },
  {
    hanzi: "闹",
  },
  {
    hanzi: "热闹",
  },
  {
    hanzi: "闹钟",
  },
  {
    hanzi: "闹事",
  },
  {
    hanzi: "闹市",
  },
  {
    hanzi: "无理取闹",
  },
  {
    hanzi: "胡闹",
  },
  {
    hanzi: "冒",
  },
  {
    hanzi: "感冒",
  },
  {
    hanzi: "冒险",
  },
  {
    hanzi: "假冒",
  },
  {
    hanzi: "帽",
  },
  {
    hanzi: "帽子",
  },
  {
    hanzi: "套",
  },
  {
    hanzi: "配套",
  },
  {
    hanzi: "外套",
  },
  {
    hanzi: "套子",
  },
  {
    hanzi: "录",
  },
  {
    hanzi: "记录",
  },
  {
    hanzi: "录取",
  },
  {
    hanzi: "纪录",
  },
  {
    hanzi: "登录",
  },
  {
    hanzi: "录音",
  },
  {
    hanzi: "绿",
  },
  {
    hanzi: "绿色",
  },
  {
    hanzi: "绿化",
  },
  {
    hanzi: "绿地",
  },
  {
    hanzi: "绿茶",
  },
  {
    hanzi: "兼",
  },
  {
    hanzi: "兼职",
  },
  {
    hanzi: "兼并",
  },
  {
    hanzi: "兼顾",
  },
  {
    hanzi: "兼容",
  },
  {
    hanzi: "赚",
  },
  {
    hanzi: "赚钱",
  },
  {
    hanzi: "道歉",
  },
  {
    hanzi: "抱歉",
  },
  {
    hanzi: "谦虚",
  },
  {
    hanzi: "初",
  },
  {
    hanzi: "初步",
  },
  {
    hanzi: "当初",
  },
  {
    hanzi: "初中",
  },
  {
    hanzi: "最初",
  },
  {
    hanzi: "初级",
  },
  {
    hanzi: "年初",
  },
  {
    hanzi: "彻底",
  },
  {
    hanzi: "贯彻",
  },
  {
    hanzi: "补",
  },
  {
    hanzi: "补充",
  },
  {
    hanzi: "补贴",
  },
  {
    hanzi: "补偿",
  },
  {
    hanzi: "补救",
  },
  {
    hanzi: "裤",
  },
  {
    hanzi: "裤子",
  },
  {
    hanzi: "内裤",
  },
  {
    hanzi: "短裤",
  },
  {
    hanzi: "长裤",
  },
  {
    hanzi: "裙",
  },
  {
    hanzi: "裙子",
  },
  {
    hanzi: "衬衫",
  },
  {
    hanzi: "衬衣",
  },
  {
    hanzi: "妹",
  },
  {
    hanzi: "妹妹",
  },
  {
    hanzi: "姐妹",
  },
  {
    hanzi: "兄妹",
  },
  {
    hanzi: "略",
  },
  {
    hanzi: "战略",
  },
  {
    hanzi: "策略",
  },
  {
    hanzi: "画",
  },
  {
    hanzi: "画面",
  },
  {
    hanzi: "动画",
  },
  {
    hanzi: "画画",
  },
  {
    hanzi: "画家",
  },
  {
    hanzi: "图画",
  },
  {
    hanzi: "雷",
  },
  {
    hanzi: "雷雨",
  },
  {
    hanzi: "雷电",
  },
  {
    hanzi: "雷声",
  },
  {
    hanzi: "地雷",
  },
  {
    hanzi: "手雷",
  },
  {
    hanzi: "甲",
  },
  {
    hanzi: "指甲",
  },
  {
    hanzi: "鼻",
  },
  {
    hanzi: "鼻子",
  },
  {
    hanzi: "敬畏",
  },
  {
    hanzi: "无畏",
  },
  {
    hanzi: "畏惧",
  },
  {
    hanzi: "喂",
    hskLevels: 1,
  },
  {
    hanzi: "喂养",
  },
  {
    hanzi: "针",
  },
  {
    hanzi: "针对",
  },
  {
    hanzi: "方针",
  },
  {
    hanzi: "打针",
  },
  {
    hanzi: "镇",
  },
  {
    hanzi: "城镇",
  },
  {
    hanzi: "乡镇",
  },
  {
    hanzi: "镇定",
  },
  {
    hanzi: "钢",
  },
  {
    hanzi: "钢铁",
  },
  {
    hanzi: "键",
  },
  {
    hanzi: "关键",
  },
  {
    hanzi: "键盘",
  },
  {
    hanzi: "铅笔",
  },
  {
    hanzi: "钥匙",
  },
  {
    hanzi: "骄",
  },
  {
    hanzi: "骄傲",
  },
  {
    hanzi: "桥",
  },
  {
    hanzi: "鸟",
  },
  {
    hanzi: "鸡",
  },
  {
    hanzi: "鸡蛋",
  },
  {
    hanzi: "鸡肉",
  },
  {
    hanzi: "岛",
  },
  {
    hanzi: "青岛",
  },
  {
    hanzi: "鸭",
  },
  {
    hanzi: "鸭子",
  },
  {
    hanzi: "鸭蛋",
  },
  {
    hanzi: "鸭肉",
  },
  {
    hanzi: "灵",
  },
  {
    hanzi: "心灵",
  },
  {
    hanzi: "烟",
  },
  {
    hanzi: "吸烟",
  },
  {
    hanzi: "抽烟",
  },
  {
    hanzi: "炎",
  },
  {
    hanzi: "炎症",
  },
  {
    hanzi: "炎热",
  },
  {
    hanzi: "消炎",
  },
  {
    hanzi: "发炎",
  },
  {
    hanzi: "灾",
  },
  {
    hanzi: "火灾",
  },
  {
    hanzi: "灾害",
  },
  {
    hanzi: "灾难",
  },
  {
    hanzi: "救灾",
  },
  {
    hanzi: "锻炼",
  },
  {
    hanzi: "烧",
  },
  {
    hanzi: "发烧",
  },
  {
    hanzi: "绕",
  },
  {
    hanzi: "围绕",
  },
  {
    hanzi: "浇",
  },
  {
    hanzi: "浇水",
  },
  {
    hanzi: "部",
  },
  {
    hanzi: "部分",
  },
  {
    hanzi: "大部分",
  },
  {
    hanzi: "一部分",
  },
  {
    hanzi: "全部",
  },
  {
    hanzi: "部位",
  },
  {
    hanzi: "部件",
  },
  {
    hanzi: "中部",
  },
  {
    hanzi: "面部",
  },
  {
    hanzi: "头部",
  },
  {
    hanzi: "胸部",
  },
  {
    hanzi: "部门",
  },
  {
    hanzi: "部长",
  },
  {
    hanzi: "内部",
  },
  {
    hanzi: "外部",
  },
  {
    hanzi: "局部",
  },
  {
    hanzi: "总部",
  },
  {
    hanzi: "教育部",
  },
  {
    hanzi: "外交部",
  },
  {
    hanzi: "部队",
  },
  {
    hanzi: "干部",
  },
  {
    hanzi: "北部",
  },
  {
    hanzi: "南部",
  },
  {
    hanzi: "西部",
  },
  {
    hanzi: "东部",
  },
  {
    hanzi: "生活费",
  },
  {
    hanzi: "手续费",
  },
  {
    hanzi: "花费",
  },
  {
    hanzi: "小费",
  },
  {
    hanzi: "隔",
  },
  {
    hanzi: "隔开",
  },
  {
    hanzi: "小型",
  },
  {
    hanzi: "型号",
  },
  {
    hanzi: "矮小",
  },
  {
    hanzi: "存款",
  },
  {
    hanzi: "贷款",
  },
  {
    hanzi: "还款",
  },
  {
    hanzi: "付款",
  },
  {
    hanzi: "汇款",
  },
  {
    hanzi: "取款",
  },
  {
    hanzi: "取款机",
  },
  {
    hanzi: "小于",
  },
  {
    hanzi: "大于",
  },
  {
    hanzi: "便于",
  },
  {
    hanzi: "不至于",
  },
  {
    hanzi: "工资",
  },
  {
    hanzi: "资格",
  },
  {
    hanzi: "资金",
  },
  {
    hanzi: "投资",
  },
  {
    hanzi: "投资者",
  },
  {
    hanzi: "资料",
  },
  {
    hanzi: "资源",
  },
  {
    hanzi: "资本",
  },
  {
    hanzi: "资本主义",
  },
  {
    hanzi: "资本市场",
  },
  {
    hanzi: "资产",
  },
  {
    hanzi: "资助",
  },
  {
    hanzi: "敢于",
  },
  {
    hanzi: "不敢当",
  },
  {
    hanzi: "当成",
  },
  {
    hanzi: "当天",
  },
  {
    hanzi: "当作",
  },
  {
    hanzi: "货",
  },
  {
    hanzi: "百货",
  },
  {
    hanzi: "售货员",
  },
  {
    hanzi: "作出",
  },
  {
    hanzi: "出于",
  },
  {
    hanzi: "付出",
  },
  {
    hanzi: "赞",
  },
  {
    hanzi: "称赞",
  },
  {
    hanzi: "赞成",
  },
  {
    hanzi: "赞助",
  },
  {
    hanzi: "对付",
  },
  {
    hanzi: "看出",
  },
  {
    hanzi: "支出",
  },
  {
    hanzi: "支配",
  },
  {
    hanzi: "雕",
  },
  {
    hanzi: "雕刻",
  },
  {
    hanzi: "查出",
  },
  {
    hanzi: "超出",
  },
  {
    hanzi: "出访",
  },
  {
    hanzi: "传出",
  },
  {
    hanzi: "外出",
  },
  {
    hanzi: "显出",
  },
  {
    hanzi: "调 tiáo",
  },
  {
    hanzi: "调 diào",
  },
  {
    hanzi: "调查",
  },
  {
    hanzi: "空调",
  },
  {
    hanzi: "强调",
  },
  {
    hanzi: "调整",
  },
  {
    hanzi: "单调",
  },
  {
    hanzi: "调皮",
  },
  {
    hanzi: "调动",
  },
  {
    hanzi: "调节",
  },
  {
    hanzi: "调解",
  },
  {
    hanzi: "调研",
  },
  {
    hanzi: "协调",
  },
  {
    hanzi: "出场",
  },
  {
    hanzi: "出动",
  },
  {
    hanzi: "出路",
  },
  {
    hanzi: "一路",
  },
  {
    hanzi: "一路上",
  },
  {
    hanzi: "路过",
  },
  {
    hanzi: "建设",
  },
  {
    hanzi: "设备",
  },
  {
    hanzi: "设计",
  },
  {
    hanzi: "设计师",
  },
  {
    hanzi: "设立",
  },
  {
    hanzi: "设施",
  },
  {
    hanzi: "设置",
  },
  {
    hanzi: "设想",
  },
  {
    hanzi: "开设",
  },
  {
    hanzi: "出面",
  },
  {
    hanzi: "出名",
  },
  {
    hanzi: "出入",
  },
  {
    hanzi: "出台",
  },
  {
    hanzi: "出行",
  },
  {
    hanzi: "罚",
  },
  {
    hanzi: "处罚",
  },
  {
    hanzi: "罚款",
  },
  {
    hanzi: "推出",
  },
  {
    hanzi: "推行",
  },
  {
    hanzi: "步行",
  },
  {
    hanzi: "脚步",
  },
  {
    hanzi: "脚印",
  },
  {
    hanzi: "剑",
  },
  {
    hanzi: "发行",
  },
  {
    hanzi: "运行",
  },
  {
    hanzi: "执行",
  },
  {
    hanzi: "盛行",
  },
  {
    hanzi: "通行",
  },
  {
    hanzi: "许多",
  },
  {
    hanzi: "也许",
  },
  {
    hanzi: "或许",
  },
  {
    hanzi: "不许",
  },
  {
    hanzi: "许可",
  },
  {
    hanzi: "许可证",
  },
  {
    hanzi: "允许",
  },
  {
    hanzi: "行程",
  },
  {
    hanzi: "游行 1",
  },
  {
    hanzi: "同行 háng",
  },
  {
    hanzi: "同行 xíng",
  },
  {
    hanzi: "阴谋",
  },
  {
    hanzi: "阴谋论",
  },
  {
    hanzi: "一同",
  },
  {
    hanzi: "同一",
  },
  {
    hanzi: "一行",
  },
  {
    hanzi: "煤",
  },
  {
    hanzi: "煤气",
  },
  {
    hanzi: "一流",
  },
  {
    hanzi: "流传",
  },
  {
    hanzi: "一带",
  },
  {
    hanzi: "灭",
  },
  {
    hanzi: "消灭",
  },
  {
    hanzi: "灭火",
  },
  {
    hanzi: "一下子",
  },
  {
    hanzi: "一向",
  },
  {
    hanzi: "一口气",
  },
  {
    hanzi: "炸 zhà",
  },
  {
    hanzi: "炸 zhá",
  },
  {
    hanzi: "爆炸",
  },
  {
    hanzi: "炸弹",
  },
  {
    hanzi: "炸药",
  },
  {
    hanzi: "一身",
  },
  {
    hanzi: "一次性",
  },
  {
    hanzi: "一代",
  },
  {
    hanzi: "储存",
  },
  {
    hanzi: "储备",
  },
  {
    hanzi: "一道",
  },
  {
    hanzi: "一模一样",
  },
  {
    hanzi: "一齐",
  },
  {
    hanzi: "一时",
  },
  {
    hanzi: "伟大",
  },
  {
    hanzi: "单一",
  },
  {
    hanzi: "单打",
  },
  {
    hanzi: "双打",
  },
  {
    hanzi: "侧",
  },
  {
    hanzi: "两侧",
  },
  {
    hanzi: "右侧",
  },
  {
    hanzi: "左侧",
  },
  {
    hanzi: "打雷",
  },
  {
    hanzi: "打动",
  },
  {
    hanzi: "打断",
  },
  {
    hanzi: "中断",
  },
  {
    hanzi: "侵犯",
  },
  {
    hanzi: "打发",
  },
  {
    hanzi: "官司",
  },
  {
    hanzi: "打官司",
  },
  {
    hanzi: "法官",
  },
  {
    hanzi: "外交官",
  },
  {
    hanzi: "伦理",
  },
  {
    hanzi: "打牌",
  },
  {
    hanzi: "打印机",
  },
  {
    hanzi: "耳机",
  },
  {
    hanzi: "轮",
  },
  {
    hanzi: "轮船",
  },
  {
    hanzi: "轮椅",
  },
  {
    hanzi: "轮子",
  },
  {
    hanzi: "摄像",
  },
  {
    hanzi: "摄像机",
  },
  {
    hanzi: "录音机",
  },
  {
    hanzi: "亿",
  },
  {
    hanzi: "游戏机",
  },
  {
    hanzi: "戏曲",
  },
  {
    hanzi: "乐曲",
  },
  {
    hanzi: "高速",
  },
  {
    hanzi: "高速公路",
  },
  {
    hanzi: "快速",
  },
  {
    hanzi: "速度",
  },
  {
    hanzi: "迅速",
  },
  {
    hanzi: "加速",
  },
  {
    hanzi: "减速",
  },
  {
    hanzi: "直升机",
  },
  {
    hanzi: "动机",
  },
  {
    hanzi: "机器人",
  },
  {
    hanzi: "被迫",
  },
  {
    hanzi: "迫切",
  },
  {
    hanzi: "强迫",
  },
  {
    hanzi: "压迫",
  },
  {
    hanzi: "电器",
  },
  {
    hanzi: "充电器",
  },
  {
    hanzi: "器官",
  },
  {
    hanzi: "热水器",
  },
  {
    hanzi: "推荐",
  },
  {
    hanzi: "纯净水",
  },
  {
    hanzi: "海水",
  },
  {
    hanzi: "汽水",
  },
  {
    hanzi: "汽油",
  },
  {
    hanzi: "细菌",
  },
  {
    hanzi: "抗菌",
  },
  {
    hanzi: "抗菌药",
  },
  {
    hanzi: "胶水",
  },
  {
    hanzi: "水产",
  },
  {
    hanzi: "团",
  },
  {
    hanzi: "团结",
  },
  {
    hanzi: "代表团",
  },
  {
    hanzi: "团体",
  },
  {
    hanzi: "集团",
  },
  {
    hanzi: "团长",
  },
  {
    hanzi: "团队",
  },
  {
    hanzi: "水灾",
  },
  {
    hanzi: "受灾",
  },
  {
    hanzi: "灾区",
  },
  {
    hanzi: "雨水",
  },
  {
    hanzi: "闭",
  },
  {
    hanzi: "闭上",
  },
  {
    hanzi: "倒闭",
  },
  {
    hanzi: "封闭",
  },
  {
    hanzi: "关闭",
  },
  {
    hanzi: "闭幕",
  },
  {
    hanzi: "闭幕式",
  },
  {
    hanzi: "闭嘴",
  },
  {
    hanzi: "闪",
  },
  {
    hanzi: "闪电",
  },
  {
    hanzi: "喊 ",
  },
  {
    hanzi: "启动 ",
  },
  {
    hanzi: "启发 ",
  },
  {
    hanzi: "启事 ",
  },
  {
    hanzi: "罢工",
  },
  {
    hanzi: "罢了",
  },
  {
    hanzi: "暴风雨",
  },
  {
    hanzi: "雨衣",
  },
  {
    hanzi: "摆",
  },
  {
    hanzi: "摆动",
  },
  {
    hanzi: "摆脱",
  },
  {
    hanzi: "摆放",
  },
  {
    hanzi: "摆平",
  },
  {
    hanzi: "酒水",
  },
  {
    hanzi: "酒吧",
  },
  {
    hanzi: "冷水",
  },
  {
    hanzi: "跳水",
  },
  {
    hanzi: "自来水",
  },
  {
    hanzi: "握",
  },
  {
    hanzi: "把握",
  },
  {
    hanzi: "握手",
  },
  {
    hanzi: "掌握",
  },
  {
    hanzi: "水分",
  },
  {
    hanzi: "比分",
  },
  {
    hanzi: "比方",
  },
  {
    hanzi: "比重",
  },
  {
    hanzi: "摇",
  },
  {
    hanzi: "动摇",
  },
  {
    hanzi: "摇头",
  },
  {
    hanzi: "处分",
  },
  {
    hanzi: "划分",
  },
  {
    hanzi: "区分",
  },
  {
    hanzi: "抵达",
  },
  {
    hanzi: "抵抗",
  },
  {
    hanzi: "百分点",
  },
  {
    hanzi: "分散",
  },
  {
    hanzi: "散文",
  },
  {
    hanzi: "分为",
  },
  {
    hanzi: "救援",
  },
  {
    hanzi: "援助",
  },
  {
    hanzi: "支援",
  },
  {
    hanzi: "分之",
  },
  {
    hanzi: "总之",
  },
  {
    hanzi: "之类",
  },
  {
    hanzi: "搭",
  },
  {
    hanzi: "搭档",
  },
  {
    hanzi: "搭配",
  },
  {
    hanzi: "分成",
  },
  {
    hanzi: "分解",
  },
  {
    hanzi: "分工",
  },
  {
    hanzi: "民工",
  },
  {
    hanzi: "忽然",
  },
  {
    hanzi: "忽视",
  },
  {
    hanzi: "忽略",
  },
  {
    hanzi: "学分",
  },
  {
    hanzi: "奖学金",
  },
  {
    hanzi: "大奖赛",
  },
  {
    hanzi: "实惠",
  },
  {
    hanzi: "优惠",
  },
  {
    hanzi: "抽奖",
  },
  {
    hanzi: "获奖",
  },
  {
    hanzi: "中奖",
  },
  {
    hanzi: "甜",
  },
  {
    hanzi: "酸甜苦辣",
  },
  {
    hanzi: "学年",
  },
  {
    hanzi: "学位",
  },
  {
    hanzi: "学者",
  },
  {
    hanzi: "墙",
  },
  {
    hanzi: "城墙",
  },
  {
    hanzi: "防火墙",
  },
  {
    hanzi: "围墙",
  },
  {
    hanzi: "医学",
  },
  {
    hanzi: "医药",
  },
  {
    hanzi: "中药",
  },
  {
    hanzi: "碰",
  },
  {
    hanzi: "碰到",
  },
  {
    hanzi: "碰见",
  },
  {
    hanzi: "碰巧",
  },
  {
    hanzi: "碰上",
  },
  {
    hanzi: "办学",
  },
  {
    hanzi: "好学",
  },
  {
    hanzi: "入学",
  },
  {
    hanzi: "升学",
  },
  {
    hanzi: "升高",
  },
  {
    hanzi: "平坦",
  },
  {
    hanzi: "坦克",
  },
  {
    hanzi: "学会",
  },
  {
    hanzi: "学员",
  },
  {
    hanzi: "学时",
  },
  {
    hanzi: "胆",
  },
  {
    hanzi: "大胆",
  },
  {
    hanzi: "胆小",
  },
  {
    hanzi: "不时",
  },
  {
    hanzi: "时常",
  },
  {
    hanzi: "常年",
  },
  {
    hanzi: "朗读",
  },
  {
    hanzi: "晴朗",
  },
  {
    hanzi: "伊朗",
  },
  {
    hanzi: "时机",
  },
  {
    hanzi: "时事",
  },
  {
    hanzi: "时装",
  },
  {
    hanzi: "西装",
  },
  {
    hanzi: "改装",
  },
  {
    hanzi: "肠",
  },
  {
    hanzi: "香肠",
  },
  {
    hanzi: "大肠",
  },
  {
    hanzi: "小肠",
  },
  {
    hanzi: "定时",
  },
  {
    hanzi: "过时",
  },
  {
    hanzi: "促销",
  },
  {
    hanzi: "推销",
  },
  {
    hanzi: "销售",
  },
  {
    hanzi: "销量",
  },
  {
    hanzi: "营销",
  },
  {
    hanzi: "时而",
  },
  {
    hanzi: "时节",
  },
  {
    hanzi: "时时",
  },
  {
    hanzi: "先锋",
  },
  {
    hanzi: "前锋",
  },
  {
    hanzi: "此时",
  },
  {
    hanzi: "此后",
  },
  {
    hanzi: "此刻",
  },
  {
    hanzi: "雄伟",
  },
  {
    hanzi: "英雄",
  },
  {
    hanzi: "雄厚",
  },
  {
    hanzi: "如此",
  },
  {
    hanzi: "此次",
  },
  {
    hanzi: "此前",
  },
  {
    hanzi: "此事",
  },
  {
    hanzi: "截止",
  },
  {
    hanzi: "截至",
  },
  {
    hanzi: "截然不同",
  },
  {
    hanzi: "此致",
  },
  {
    hanzi: "细致",
  },
  {
    hanzi: "大致",
  },
  {
    hanzi: "替",
  },
  {
    hanzi: "代替",
  },
  {
    hanzi: "替代",
  },
  {
    hanzi: "此处",
  },
  {
    hanzi: "深处",
  },
  {
    hanzi: "远处",
  },
  {
    hanzi: "潜力",
  },
  {
    hanzi: "潜在",
  },
  {
    hanzi: "潜水",
  },
  {
    hanzi: "办事",
  },
  {
    hanzi: "办事处",
  },
  {
    hanzi: "处处",
  },
  {
    hanzi: "泪",
  },
  {
    hanzi: "泪水",
  },
  {
    hanzi: "眼泪",
  },
  {
    hanzi: "流泪",
  },
  {
    hanzi: "四处",
  },
  {
    hanzi: "四周",
  },
  {
    hanzi: "相处",
  },
  {
    hanzi: "处在",
  },
  {
    hanzi: "干涉",
  },
  {
    hanzi: "涉及",
  },
  {
    hanzi: "用处",
  },
  {
    hanzi: "处长",
  },
  {
    hanzi: "船长",
  },
  {
    hanzi: "船只",
  },
  {
    hanzi: "浪漫",
  },
  {
    hanzi: "漫长",
  },
  {
    hanzi: "漫画",
  },
  {
    hanzi: "会长",
  },
  {
    hanzi: "司长",
  },
  {
    hanzi: "厂长",
  },
  {
    hanzi: "老婆",
  },
  {
    hanzi: "外婆",
  },
  {
    hanzi: "老太婆",
  },
  {
    hanzi: "长途",
  },
  {
    hanzi: "途中",
  },
  {
    hanzi: "长度",
  },
  {
    hanzi: "清洁",
  },
  {
    hanzi: "清洁工",
  },
  {
    hanzi: "宽度",
  },
  {
    hanzi: "深度",
  },
  {
    hanzi: "长短",
  },
  {
    hanzi: "短片",
  },
  {
    hanzi: "浓",
  },
  {
    hanzi: "浓度",
  },
  {
    hanzi: "长假",
  },
  {
    hanzi: "假日",
  },
  {
    hanzi: "节假日",
  },
  {
    hanzi: "岸",
  },
  {
    hanzi: "岸上",
  },
  {
    hanzi: "两岸",
  },
  {
    hanzi: "长久",
  },
  {
    hanzi: "长跑",
  },
  {
    hanzi: "长远",
  },
  {
    hanzi: "废",
  },
  {
    hanzi: "作废",
  },
  {
    hanzi: "废话",
  },
  {
    hanzi: "废物",
  },
  {
    hanzi: "远远",
  },
  {
    hanzi: "远离",
  },
  {
    hanzi: "离不开",
  },
  {
    hanzi: "脱离",
  },
  {
    hanzi: "接触",
  },
  {
    hanzi: "远方",
  },
  {
    hanzi: "平方",
  },
  {
    hanzi: "前方",
  },
  {
    hanzi: "小麦",
  },
  {
    hanzi: "麦当劳",
  },
  {
    hanzi: "麦克风",
  },
  {
    hanzi: "多方面",
  },
  {
    hanzi: "多次",
  },
  {
    hanzi: "多样",
  },
  {
    hanzi: "珍贵",
  },
  {
    hanzi: "珍惜",
  },
  {
    hanzi: "珍珠",
  },
  {
    hanzi: "多种",
  },
  {
    hanzi: "多半",
  },
  {
    hanzi: "圆珠笔",
  },
  {
    hanzi: "珠宝",
  },
  {
    hanzi: "半决赛",
  },
  {
    hanzi: "多媒体",
  },
  {
    hanzi: "传媒",
  },
  {
    hanzi: "国旗",
  },
  {
    hanzi: "红旗",
  },
  {
    hanzi: "祖母",
  },
  {
    hanzi: "祖父",
  },
  {
    hanzi: "祖国",
  },
  {
    hanzi: "过敏",
  },
  {
    hanzi: "敏感",
  },
  {
    hanzi: "大多",
  },
  {
    hanzi: "绝大多数",
  },
  {
    hanzi: "繁荣",
  },
  {
    hanzi: "频繁",
  },
  {
    hanzi: "大巴",
  },
  {
    hanzi: "巴士",
  },
  {
    hanzi: "紫",
  },
  {
    hanzi: "紫色",
  },
  {
    hanzi: "大哥",
  },
  {
    hanzi: "大姐",
  },
  {
    hanzi: "大妈",
  },
  {
    hanzi: "梅花",
  },
  {
    hanzi: "大楼",
  },
  {
    hanzi: "大爷",
  },
  {
    hanzi: "大伙儿",
  },
  {
    hanzi: "闲",
  },
  {
    hanzi: "休闲",
  },
  {
    hanzi: "大熊猫",
  },
  {
    hanzi: "大米",
  },
  {
    hanzi: "大批",
  },
  {
    hanzi: "杰出",
  },
  {
    hanzi: "大都",
  },
  {
    hanzi: "都市",
  },
  {
    hanzi: "棉",
  },
  {
    hanzi: "棉花",
  },
  {
    hanzi: "大事",
  },
  {
    hanzi: "事后",
  },
  {
    hanzi: "有事",
  },
  {
    hanzi: "横",
  },
  {
    hanzi: "横",
  },
  {
    hanzi: "放大",
  },
  {
    hanzi: "解放",
  },
  {
    hanzi: "发放",
  },
  {
    hanzi: "操纵",
  },
  {
    hanzi: "纵横",
  },
  {
    hanzi: "高大",
  },
  {
    hanzi: "增大",
  },
  {
    hanzi: "杆",
  },
  {
    hanzi: "杆",
  },
  {
    hanzi: "大使",
  },
  {
    hanzi: "使劲",
  },
  {
    hanzi: "使得",
  },
  {
    hanzi: "报刊",
  },
  {
    hanzi: "周刊",
  },
  {
    hanzi: "大道",
  },
  {
    hanzi: "大力",
  },
  {
    hanzi: "大师",
  },
  {
    hanzi: "肝",
  },
  {
    hanzi: "肝脏",
  },
  {
    hanzi: "大会",
  },
  {
    hanzi: "亚运会",
  },
  {
    hanzi: "亚军",
  },
  {
    hanzi: "腰",
  },
  {
    hanzi: "峰会",
  },
  {
    hanzi: "国会",
  },
  {
    hanzi: "座谈会",
  },
  {
    hanzi: "肺",
  },
  {
    hanzi: "肺炎",
  },
  {
    hanzi: "新冠肺炎",
  },
  {
    hanzi: "会见",
  },
  {
    hanzi: "运动会",
  },
  {
    hanzi: "运动员",
  },
  {
    hanzi: "胃",
  },
  {
    hanzi: "胃口",
  },
  {
    hanzi: "好运",
  },
  {
    hanzi: "运作",
  },
  {
    hanzi: "肠",
  },
  {
    hanzi: "船员",
  },
  {
    hanzi: "飞行员",
  },
  {
    hanzi: "球员",
  },
  {
    hanzi: "无所谓",
  },
  {
    hanzi: "所谓",
  },
  {
    hanzi: "伤员",
  },
  {
    hanzi: "伤口",
  },
  {
    hanzi: "诗",
  },
  {
    hanzi: "诗人",
  },
  {
    hanzi: "诗歌",
  },
  {
    hanzi: "伤亡",
  },
  {
    hanzi: "死亡",
  },
  {
    hanzi: "查询",
  },
  {
    hanzi: "询问",
  },
  {
    hanzi: "动员",
  },
  {
    hanzi: "动画片",
  },
  {
    hanzi: "诞生",
  },
  {
    hanzi: "圣诞节",
  },
  {
    hanzi: "圣诞老人",
  },
  {
    hanzi: "转动",
  },
  {
    hanzi: "转动",
  },
  {
    hanzi: "被动",
  },
  {
    hanzi: "变动",
  },
  {
    hanzi: "诸位",
  },
  {
    hanzi: "冲动",
  },
  {
    hanzi: "动手",
  },
  {
    hanzi: "电动",
  },
  {
    hanzi: "举动",
  },
  {
    hanzi: "奔跑",
  },
  {
    hanzi: "机动车",
  },
  {
    hanzi: "倒车",
  },
  {
    hanzi: "倒车",
  },
  {
    hanzi: "车主",
  },
  {
    hanzi: "尖",
  },
  {
    hanzi: "尖叫",
  },
  {
    hanzi: "乘车",
  },
  {
    hanzi: "车牌",
  },
  {
    hanzi: "车号",
  },
  {
    hanzi: "夸",
  },
  {
    hanzi: "夸大",
  },
  {
    hanzi: "夸奖",
  },
  {
    hanzi: "夸张",
  },
  {
    hanzi: "车展",
  },
  {
    hanzi: "扩展",
  },
  {
    hanzi: "参展",
  },
  {
    hanzi: "跨",
  },
  {
    hanzi: "开夜车",
  },
  {
    hanzi: "黑夜",
  },
  {
    hanzi: "日夜",
  },
  {
    hanzi: "垮",
  },
  {
    hanzi: "客车",
  },
  {
    hanzi: "快车",
  },
  {
    hanzi: "马车",
  },
  {
    hanzi: "挎",
  },
  {
    hanzi: "慢车",
  },
  {
    hanzi: "修车",
  },
  {
    hanzi: "扣",
  },
  {
    hanzi: "扣子",
  },
  {
    hanzi: "电车",
  },
  {
    hanzi: "电源",
  },
  {
    hanzi: "撞",
  },
  {
    hanzi: "电灯",
  },
  {
    hanzi: "灯光",
  },
  {
    hanzi: "台灯",
  },
  {
    hanzi: "摸",
  },
  {
    hanzi: "发电",
  },
  {
    hanzi: "家电",
  },
  {
    hanzi: "电子版",
  },
  {
    hanzi: "正版",
  },
  {
    hanzi: "拔",
  },
  {
    hanzi: "选拔",
  },
  {
    hanzi: "电力",
  },
  {
    hanzi: "吃力",
  },
  {
    hanzi: "尽力",
  },
  {
    hanzi: "尽可能",
  },
  {
    hanzi: "振动",
  },
  {
    hanzi: "活力",
  },
  {
    hanzi: "快活",
  },
  {
    hanzi: "灵活",
  },
  {
    hanzi: "拖",
  },
  {
    hanzi: "拖鞋",
  },
  {
    hanzi: "体力",
  },
  {
    hanzi: "有力",
  },
  {
    hanzi: "拼",
  },
  {
    hanzi: "拼音",
  },
  {
    hanzi: "全力",
  },
  {
    hanzi: "全都",
  },
  {
    hanzi: "全新",
  },
  {
    hanzi: "拆",
  },
  {
    hanzi: "拆除",
  },
  {
    hanzi: "人力",
  },
  {
    hanzi: "名人",
  },
  {
    hanzi: "扎",
  },
  {
    hanzi: "扎",
  },
  {
    hanzi: "扎",
  },
  {
    hanzi: "扎实",
  },
  {
    hanzi: "扎实",
  },
  {
    hanzi: "包扎",
  },
  {
    hanzi: "扎根",
  },
  {
    hanzi: "人家",
  },
  {
    hanzi: "家园",
  },
  {
    hanzi: "乳制品",
  },
  {
    hanzi: "乳房",
  },
  {
    hanzi: "乳头",
  },
  {
    hanzi: "军人",
  },
  {
    hanzi: "迷人",
  },
  {
    hanzi: "迷信",
  },
  {
    hanzi: "影迷",
  },
  {
    hanzi: "浮",
  },
  {
    hanzi: "浮云",
  },
  {
    hanzi: "浮动",
  },
  {
    hanzi: "人间",
  },
  {
    hanzi: "人士",
  },
  {
    hanzi: "泥",
  },
  {
    hanzi: "水泥",
  },
  {
    hanzi: "男士",
  },
  {
    hanzi: "男女",
  },
  {
    hanzi: "湿",
  },
  {
    hanzi: "潮湿",
  },
  {
    hanzi: "湿地",
  },
  {
    hanzi: "恩人",
  },
  {
    hanzi: "发言人",
  },
  {
    hanzi: "沿",
  },
  {
    hanzi: "沿海",
  },
  {
    hanzi: "沿着",
  },
  {
    hanzi: "富人",
  },
  {
    hanzi: "感人",
  },
  {
    hanzi: "惊人",
  },
  {
    hanzi: "泡",
  },
  {
    hanzi: "灯泡",
  },
  {
    hanzi: "人权",
  },
  {
    hanzi: "政权",
  },
  {
    hanzi: "政党",
  },
  {
    hanzi: "炮",
  },
  {
    hanzi: "炮",
  },
  {
    hanzi: "炮",
  },
  {
    hanzi: "新人",
  },
  {
    hanzi: "艺人",
  },
  {
    hanzi: "灰",
  },
  {
    hanzi: "灰色",
  },
  {
    hanzi: "游人",
  },
  {
    hanzi: "游玩",
  },
  {
    hanzi: "本人",
  },
  {
    hanzi: "晓得",
  },
  {
    hanzi: "遭到",
  },
  {
    hanzi: "遭受",
  },
  {
    hanzi: "遭遇",
  },
  {
    hanzi: "糟",
  },
  {
    hanzi: "糟糕",
  },
  {
    hanzi: "蛋糕",
  },
  {
    hanzi: "粮食",
  },
  {
    hanzi: "凡",
  },
  {
    hanzi: "凡是",
  },
  {
    hanzi: "平凡",
  },
  {
    hanzi: "洞",
  },
  {
    hanzi: "本科",
  },
  {
    hanzi: "成本",
  },
  {
    hanzi: "铜",
  },
  {
    hanzi: "铜牌",
  },
  {
    hanzi: "剧本",
  },
  {
    hanzi: "喜剧",
  },
  {
    hanzi: "铺",
  },
  {
    hanzi: "铺",
  },
  {
    hanzi: "本期",
  },
  {
    hanzi: "本身",
  },
  {
    hanzi: "锁",
  },
  {
    hanzi: "身高",
  },
  {
    hanzi: "终身",
  },
  {
    hanzi: "赏",
  },
  {
    hanzi: "赞赏",
  },
  {
    hanzi: "本土",
  },
  {
    hanzi: "本质",
  },
  {
    hanzi: "本地",
  },
  {
    hanzi: "账",
  },
  {
    hanzi: "账户",
  },
  {
    hanzi: "地面",
  },
  {
    hanzi: "地下",
  },
  {
    hanzi: "地下室",
  },
  {
    hanzi: "贺卡",
  },
  {
    hanzi: "祝贺",
  },
  {
    hanzi: "陆地",
  },
  {
    hanzi: "陆军",
  },
  {
    hanzi: "茄子",
  },
  {
    hanzi: "地带",
  },
  {
    hanzi: "带有",
  },
  {
    hanzi: "领带",
  },
  {
    hanzi: "驾",
  },
  {
    hanzi: "驾照",
  },
  {
    hanzi: "地形",
  },
  {
    hanzi: "形容",
  },
  {
    hanzi: "变形",
  },
  {
    hanzi: "驾驶",
  },
  {
    hanzi: "行驶",
  },
  {
    hanzi: "地板",
  },
  {
    hanzi: "地名",
  },
  {
    hanzi: "驻",
  },
  {
    hanzi: "园地",
  },
  {
    hanzi: "园林",
  },
  {
    hanzi: "乌",
  },
  {
    hanzi: "乌云",
  },
  {
    hanzi: "内地",
  },
  {
    hanzi: "特地",
  },
  {
    hanzi: "塔",
  },
  {
    hanzi: "金字塔",
  },
  {
    hanzi: "场地",
  },
  {
    hanzi: "立场",
  },
  {
    hanzi: "坡",
  },
  {
    hanzi: "山坡",
  },
  {
    hanzi: "新加坡",
  },
  {
    hanzi: "创立",
  },
  {
    hanzi: "对立",
  },
  {
    hanzi: "确立",
  },
  {
    hanzi: "隔壁",
  },
  {
    hanzi: "墙壁",
  },
  {
    hanzi: "场馆",
  },
  {
    hanzi: "场景",
  },
  {
    hanzi: "勤奋",
  },
  {
    hanzi: "考场",
  },
  {
    hanzi: "赛场",
  },
  {
    hanzi: "幼儿园",
  },
  {
    hanzi: "战场",
  },
  {
    hanzi: "战友",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "蒙",
  },
  {
    hanzi: "在场",
  },
  {
    hanzi: "不在乎",
  },
  {
    hanzi: "自豪",
  },
  {
    hanzi: "内在",
  },
  {
    hanzi: "在内",
  },
  {
    hanzi: "所在",
  },
  {
    hanzi: "毫米",
  },
  {
    hanzi: "毫升",
  },
  {
    hanzi: "研究所",
  },
  {
    hanzi: "研究",
  },
  {
    hanzi: "研究生",
  },
  {
    hanzi: "尾巴",
  },
  {
    hanzi: "自在",
  },
  {
    hanzi: "自杀",
  },
  {
    hanzi: "杀毒",
  },
  {
    hanzi: "耗",
  },
  {
    hanzi: "消耗",
  },
  {
    hanzi: "自愿",
  },
  {
    hanzi: "心愿",
  },
  {
    hanzi: "意愿",
  },
  {
    hanzi: "田径",
  },
  {
    hanzi: "途径",
  },
  {
    hanzi: "自我",
  },
  {
    hanzi: "自言自语",
  },
  {
    hanzi: "衡量",
  },
  {
    hanzi: "平衡",
  },
  {
    hanzi: "传言",
  },
  {
    hanzi: "留言",
  },
  {
    hanzi: "言语",
  },
  {
    hanzi: "徒弟",
  },
  {
    hanzi: "语音",
  },
  {
    hanzi: "音量",
  },
  {
    hanzi: "趋势",
  },
  {
    hanzi: "音像",
  },
  {
    hanzi: "录像",
  },
  {
    hanzi: "逼",
  },
  {
    hanzi: "华语",
  },
  {
    hanzi: "法语",
  },
  {
    hanzi: "西班牙语",
  },
  {
    hanzi: "日语",
  },
  {
    hanzi: "返回",
  },
  {
    hanzi: "日历",
  },
  {
    hanzi: "简历",
  },
  {
    hanzi: "简介",
  },
  {
    hanzi: "拆迁",
  },
  {
    hanzi: "搬迁",
  },
  {
    hanzi: "变迁",
  },
  {
    hanzi: "迁就",
  },
  {
    hanzi: "迁移",
  },
  {
    hanzi: "近日",
  },
  {
    hanzi: "今日",
  },
  {
    hanzi: "明日",
  },
  {
    hanzi: "猛",
  },
  {
    hanzi: "明明",
  },
  {
    hanzi: "明亮",
  },
  {
    hanzi: "牛仔",
  },
  {
    hanzi: "牛仔裤",
  },
  {
    hanzi: "仔细",
  },
  {
    hanzi: "新鲜",
  },
  {
    hanzi: "鲜明",
  },
  {
    hanzi: "海鲜",
  },
  {
    hanzi: "鲜花",
  },
  {
    hanzi: "仪器",
  },
  {
    hanzi: "仪式",
  },
  {
    hanzi: "清明节",
  },
  {
    hanzi: "清晨",
  },
  {
    hanzi: "清洗",
  },
  {
    hanzi: "风俗",
  },
  {
    hanzi: "三明治",
  },
  {
    hanzi: "治病",
  },
  {
    hanzi: "俱乐部",
  },
  {
    hanzi: "说明书",
  },
  {
    hanzi: "通知书",
  },
  {
    hanzi: "知名",
  },
  {
    hanzi: "傻",
  },
  {
    hanzi: "书桌",
  },
  {
    hanzi: "协议书",
  },
  {
    hanzi: "妙",
  },
  {
    hanzi: "奇妙",
  },
  {
    hanzi: "巧妙",
  },
  {
    hanzi: "莫名其妙",
  },
  {
    hanzi: "书房",
  },
  {
    hanzi: "病房",
  },
  {
    hanzi: "楼房",
  },
  {
    hanzi: "发怒",
  },
  {
    hanzi: "愤怒",
  },
  {
    hanzi: "图书",
  },
  {
    hanzi: "书法",
  },
  {
    hanzi: "说法",
  },
  {
    hanzi: "磨",
  },
  {
    hanzi: "磨",
  },
  {
    hanzi: "解说",
  },
  {
    hanzi: "就是说",
  },
  {
    hanzi: "这就是说",
  },
  {
    hanzi: "鬼",
  },
  {
    hanzi: "酒鬼",
  },
  {
    hanzi: "胆小鬼",
  },
  {
    hanzi: "说实话",
  },
  {
    hanzi: "切实",
  },
  {
    hanzi: "魔鬼",
  },
  {
    hanzi: "魔术",
  },
  {
    hanzi: "再说",
  },
  {
    hanzi: "再也",
  },
  {
    hanzi: "也好",
  },
  {
    hanzi: "嘛",
  },
  {
    hanzi: "干嘛",
  },
  {
    hanzi: "不再",
  },
  {
    hanzi: "再生",
  },
  {
    hanzi: "唯一",
  },
  {
    hanzi: "生成",
  },
  {
    hanzi: "师生",
  },
  {
    hanzi: "师父",
  },
  {
    hanzi: "再次",
  },
  {
    hanzi: "滴",
  },
  {
    hanzi: "摘",
  },
  {
    hanzi: "燃料",
  },
  {
    hanzi: "燃烧",
  },
  {
    hanzi: "点燃",
  },
  {
    hanzi: "豆腐",
  },
  {
    hanzi: "宏大",
  },
  {
    hanzi: "辈",
  },
  {
    hanzi: "一辈子",
  },
  {
    hanzi: "插",
  },
  {
    hanzi: "插入",
  },
  {
    hanzi: "首次",
  },
  {
    hanzi: "首脑",
  },
  {
    hanzi: "首相",
  },
  {
    hanzi: "毁",
  },
  {
    hanzi: "毁灭",
  },
  {
    hanzi: "依次",
  },
  {
    hanzi: "依照",
  },
  {
    hanzi: "老鼠",
  },
  {
    hanzi: "鼠标",
  },
  {
    hanzi: "次数",
  },
  {
    hanzi: "数目",
  },
  {
    hanzi: "舆论",
  },
  {
    hanzi: "岁数",
  },
  {
    hanzi: "岁月",
  },
  {
    hanzi: "舅舅",
  },
  {
    hanzi: "舅妈",
  },
  {
    hanzi: "舅父",
  },
  {
    hanzi: "总数",
  },
  {
    hanzi: "总监",
  },
  {
    hanzi: "总体",
  },
  {
    hanzi: "番",
  },
  {
    hanzi: "番茄",
  },
  {
    hanzi: "个体",
  },
  {
    hanzi: "体操",
  },
  {
    hanzi: "滔滔不绝",
  },
  {
    hanzi: "体检",
  },
  {
    hanzi: "安检",
  },
  {
    hanzi: "稻草",
  },
  {
    hanzi: "水稻",
  },
  {
    hanzi: "体重",
  },
  {
    hanzi: "体积",
  },
  {
    hanzi: "稿子",
  },
  {
    hanzi: "主体",
  },
  {
    hanzi: "气体",
  },
  {
    hanzi: "舞蹈",
  },
  {
    hanzi: "暖气",
  },
  {
    hanzi: "气球",
  },
  {
    hanzi: "活跃",
  },
  {
    hanzi: "大跃进",
  },
  {
    hanzi: "客气",
  },
  {
    hanzi: "气象",
  },
  {
    hanzi: "缺陷",
  },
  {
    hanzi: "陷入",
  },
  {
    hanzi: "冷气",
  },
  {
    hanzi: "天然气",
  },
  {
    hanzi: "天然",
  },
  {
    hanzi: "火焰",
  },
  {
    hanzi: "焰火",
  },
  {
    hanzi: "天才",
  },
  {
    hanzi: "天文",
  },
  {
    hanzi: "阎王",
  },
  {
    hanzi: "蓝天",
  },
  {
    hanzi: "蓝领",
  },
  {
    hanzi: "白领",
  },
  {
    hanzi: "掐",
  },
  {
    hanzi: "天下",
  },
  {
    hanzi: "停下",
  },
  {
    hanzi: "不停",
  },
  {
    hanzi: "馅儿",
  },
  {
    hanzi: "馅饼",
  },
  {
    hanzi: "肉馅",
  },
  {
    hanzi: "如下",
  },
  {
    hanzi: "如同",
  },
  {
    hanzi: "正如",
  },
  {
    hanzi: "如一",
  },
  {
    hanzi: "装饰",
  },
  {
    hanzi: "服饰",
  },
  {
    hanzi: "首饰",
  },
  {
    hanzi: "上下",
  },
  {
    hanzi: "下个月",
  },
  {
    hanzi: "上个月",
  },
  {
    hanzi: "注册",
  },
  {
    hanzi: "月底",
  },
  {
    hanzi: "月球",
  },
  {
    hanzi: "岗位",
  },
  {
    hanzi: "下楼",
  },
  {
    hanzi: "上楼",
  },
  {
    hanzi: "小卒",
  },
  {
    hanzi: "楼道",
  },
  {
    hanzi: "写字楼",
  },
  {
    hanzi: "粉碎",
  },
  {
    hanzi: "破碎",
  },
  {
    hanzi: "碎片",
  },
  {
    hanzi: "心碎",
  },
  {
    hanzi: "穿上",
  },
  {
    hanzi: "上门",
  },
  {
    hanzi: "醉",
  },
  {
    hanzi: "喝醉",
  },
  {
    hanzi: "加上",
  },
  {
    hanzi: "加入",
  },
  {
    hanzi: "加以",
  },
  {
    hanzi: "翠绿",
  },
  {
    hanzi: "上级",
  },
  {
    hanzi: "赶上",
  },
  {
    hanzi: "纯粹",
  },
  {
    hanzi: "赶不上",
  },
  {
    hanzi: "赶忙",
  },
  {
    hanzi: "模糊",
  },
  {
    hanzi: "上市",
  },
  {
    hanzi: "市区",
  },
  {
    hanzi: "上演",
  },
  {
    hanzi: "博览会",
  },
  {
    hanzi: "阅览室",
  },
  {
    hanzi: "展览",
  },
  {
    hanzi: "展览会",
  },
  {
    hanzi: "台上",
  },
  {
    hanzi: "上台",
  },
  {
    hanzi: "鉴定",
  },
  {
    hanzi: "借鉴",
  },
  {
    hanzi: "窗台",
  },
  {
    hanzi: "窗子",
  },
  {
    hanzi: "锅",
  },
  {
    hanzi: "电饭锅",
  },
  {
    hanzi: "火锅",
  },
  {
    hanzi: "阳台",
  },
  {
    hanzi: "太阳能",
  },
  {
    hanzi: "窝",
  },
  {
    hanzi: "被窝",
  },
  {
    hanzi: "写字台",
  },
  {
    hanzi: "识字",
  },
  {
    hanzi: "车祸",
  },
  {
    hanzi: "站台",
  },
  {
    hanzi: "台风",
  },
  {
    hanzi: "特殊",
  },
  {
    hanzi: "风度",
  },
  {
    hanzi: "风光",
  },
  {
    hanzi: "繁殖",
  },
  {
    hanzi: "光临",
  },
  {
    hanzi: "光盘",
  },
  {
    hanzi: "分裂",
  },
  {
    hanzi: "光荣",
  },
  {
    hanzi: "光线",
  },
  {
    hanzi: "直线",
  },
  {
    hanzi: "滚",
  },
  {
    hanzi: "滚滚",
  },
  {
    hanzi: "滚滚",
  },
  {
    hanzi: "观光",
  },
  {
    hanzi: "主观",
  },
  {
    hanzi: "诉讼",
  },
  {
    hanzi: "眼光",
  },
  {
    hanzi: "眼里",
  },
  {
    hanzi: "亲眼",
  },
  {
    hanzi: "亲属",
  },
  {
    hanzi: "歌颂",
  },
  {
    hanzi: "眼看",
  },
  {
    hanzi: "看望",
  },
  {
    hanzi: "富翁",
  },
  {
    hanzi: "看成",
  },
  {
    hanzi: "看待",
  },
  {
    hanzi: "嗡",
  },
  {
    hanzi: "待遇",
  },
  {
    hanzi: "待会儿",
  },
  {
    hanzi: "叹气",
  },
  {
    hanzi: "看管",
  },
  {
    hanzi: "看得见",
  },
  {
    hanzi: "看得起",
  },
  {
    hanzi: "喷",
  },
  {
    hanzi: "喷",
  },
  {
    hanzi: "喷泉",
  },
  {
    hanzi: "看好",
  },
  {
    hanzi: "看作",
  },
  {
    hanzi: "哇",
  },
  {
    hanzi: "哇",
  },
  {
    hanzi: "看来",
  },
  {
    hanzi: "到来",
  },
  {
    hanzi: "近来",
  },
  {
    hanzi: "娃娃",
  },
  {
    hanzi: "靠近",
  },
  {
    hanzi: "近视",
  },
  {
    hanzi: "嫌",
  },
  {
    hanzi: "来信",
  },
  {
    hanzi: "用来",
  },
  {
    hanzi: "文娱",
  },
  {
    hanzi: "娱乐",
  },
  {
    hanzi: "来往",
  },
  {
    hanzi: "往来",
  },
  {
    hanzi: "奏",
  },
  {
    hanzi: "节奏",
  },
  {
    hanzi: "演奏",
  },
  {
    hanzi: "前来",
  },
  {
    hanzi: "外来",
  },
  {
    hanzi: "对外",
  },
  {
    hanzi: "壮",
  },
  {
    hanzi: "强壮",
  },
  {
    hanzi: "壮观",
  },
  {
    hanzi: "嘉宾",
  },
  {
    hanzi: "牵",
  },
  {
    hanzi: "倾向",
  },
  {
    hanzi: "宇航员",
  },
  {
    hanzi: "宇宙",
  },
  {
    hanzi: "海外",
  },
  {
    hanzi: "海报",
  },
  {
    hanzi: "海底",
  },
  {
    hanzi: "宅",
  },
  {
    hanzi: "住宅",
  },
  {
    hanzi: "格外",
  },
  {
    hanzi: "及格",
  },
  {
    hanzi: "诧异",
  },
  {
    hanzi: "户外",
  },
  {
    hanzi: "客户",
  },
  {
    hanzi: "用户",
  },
  {
    hanzi: "畅通",
  },
  {
    hanzi: "外币",
  },
  {
    hanzi: "外头",
  },
  {
    hanzi: "内外",
  },
  {
    hanzi: "伸",
  },
  {
    hanzi: "延伸",
  },
  {
    hanzi: "外科",
  },
  {
    hanzi: "内科",
  },
  {
    hanzi: "儿科",
  },
  {
    hanzi: "凭",
  },
  {
    hanzi: "高科技",
  },
  {
    hanzi: "队伍",
  },
  {
    hanzi: "外衣",
  },
  {
    hanzi: "内衣",
  },
  {
    hanzi: "毛衣",
  },
  {
    hanzi: "洗衣粉",
  },
  {
    hanzi: "仿",
  },
  {
    hanzi: "模仿",
  },
  {
    hanzi: "仿佛",
  },
  {
    hanzi: "外资",
  },
  {
    hanzi: "中外",
  },
  {
    hanzi: "旋转",
  },
  {
    hanzi: "期中",
  },
  {
    hanzi: "从中",
  },
  {
    hanzi: "狠",
  },
  {
    hanzi: "狠狠",
  },
  {
    hanzi: "空中",
  },
  {
    hanzi: "太空",
  },
  {
    hanzi: "空军",
  },
  {
    hanzi: "艰苦",
  },
  {
    hanzi: "艰难",
  },
  {
    hanzi: "中秋节",
  },
  {
    hanzi: "中等",
  },
  {
    hanzi: "中期",
  },
  {
    hanzi: "恨",
  },
  {
    hanzi: "期末",
  },
  {
    hanzi: "初期",
  },
  {
    hanzi: "初等",
  },
  {
    hanzi: "担忧",
  },
  {
    hanzi: "期望",
  },
  {
    hanzi: "绝望",
  },
  {
    hanzi: "望见",
  },
  {
    hanzi: "恢复",
  },
  {
    hanzi: "早期",
  },
  {
    hanzi: "早晚",
  },
  {
    hanzi: "惨",
  },
  {
    hanzi: "悲惨",
  },
  {
    hanzi: "惨叫",
  },
  {
    hanzi: "到期",
  },
  {
    hanzi: "同期",
  },
  {
    hanzi: "渗",
  },
  {
    hanzi: "渗透",
  },
  {
    hanzi: "胡同",
  },
  {
    hanzi: "认同",
  },
  {
    hanzi: "广泛",
  },
  {
    hanzi: "周期",
  },
  {
    hanzi: "为期",
  },
  {
    hanzi: "洪水",
  },
  {
    hanzi: "防洪",
  },
  {
    hanzi: "列为",
  },
  {
    hanzi: "列入",
  },
  {
    hanzi: "池子",
  },
  {
    hanzi: "电池",
  },
  {
    hanzi: "游泳池",
  },
  {
    hanzi: "视为",
  },
  {
    hanzi: "注视",
  },
  {
    hanzi: "漏",
  },
  {
    hanzi: "漏洞",
  },
  {
    hanzi: "漏水",
  },
  {
    hanzi: "为止",
  },
  {
    hanzi: "不止",
  },
  {
    hanzi: "终止",
  },
  {
    hanzi: "渡",
  },
  {
    hanzi: "过渡期",
  },
  {
    hanzi: "过渡期",
  },
  {
    hanzi: "为主",
  },
  {
    hanzi: "主办",
  },
  {
    hanzi: "主角",
  },
  {
    hanzi: "踱步",
  },
  {
    hanzi: "踱来踱去",
  },
  {
    hanzi: "为此",
  },
  {
    hanzi: "为难",
  },
  {
    hanzi: "高粱",
  },
  {
    hanzi: "难忘",
  },
  {
    hanzi: "难以",
  },
  {
    hanzi: "难得",
  },
  {
    hanzi: "桥梁",
  },
  {
    hanzi: "得以",
  },
  {
    hanzi: "得了",
  },
  {
    hanzi: "得了",
  },
  {
    hanzi: "桃",
  },
  {
    hanzi: "桃花",
  },
  {
    hanzi: "桃树",
  },
  {
    hanzi: "免得",
  },
  {
    hanzi: "不免",
  },
  {
    hanzi: "排行榜",
  },
  {
    hanzi: "只得",
  },
  {
    hanzi: "用得着",
  },
  {
    hanzi: "用不着",
  },
  {
    hanzi: "英镑",
  },
  {
    hanzi: "信用",
  },
  {
    hanzi: "用法",
  },
  {
    hanzi: "傍晚",
  },
  {
    hanzi: "用品",
  },
  {
    hanzi: "用心",
  },
  {
    hanzi: "磅",
  },
  {
    hanzi: "背心",
  },
  {
    hanzi: "背包",
  },
  {
    hanzi: "肩",
  },
  {
    hanzi: "心脏病",
  },
  {
    hanzi: "病情",
  },
  {
    hanzi: "发病",
  },
  {
    hanzi: "肩膀",
  },
  {
    hanzi: "专心",
  },
  {
    hanzi: "虚心",
  },
  {
    hanzi: "捐",
  },
  {
    hanzi: "捐款",
  },
  {
    hanzi: "捐助",
  },
  {
    hanzi: "心疼",
  },
  {
    hanzi: "头疼",
  },
  {
    hanzi: "骨头",
  },
  {
    hanzi: "柜子",
  },
  {
    hanzi: "书柜",
  },
  {
    hanzi: "衣柜",
  },
  {
    hanzi: "低头",
  },
  {
    hanzi: "低温",
  },
  {
    hanzi: "规矩",
  },
  {
    hanzi: "开头",
  },
  {
    hanzi: "指头",
  },
  {
    hanzi: "指责",
  },
  {
    hanzi: "火炬",
  },
  {
    hanzi: "钟头",
  },
  {
    hanzi: "后头",
  },
  {
    hanzi: "前头",
  },
  {
    hanzi: "拒绝",
  },
  {
    hanzi: "当前",
  },
  {
    hanzi: "跟前",
  },
  {
    hanzi: "跟前",
  },
  {
    hanzi: "跟随",
  },
  {
    hanzi: "捕",
  },
  {
    hanzi: "年前",
  },
  {
    hanzi: "前景",
  },
  {
    hanzi: "揭",
  },
  {
    hanzi: "揭开",
  },
  {
    hanzi: "景象",
  },
  {
    hanzi: "景点",
  },
  {
    hanzi: "撤",
  },
  {
    hanzi: "撤离",
  },
  {
    hanzi: "撤销",
  },
  {
    hanzi: "撤回",
  },
  {
    hanzi: "前提",
  },
  {
    hanzi: "先前",
  },
  {
    hanzi: "扶",
  },
  {
    hanzi: "原先",
  },
  {
    hanzi: "先后",
  },
  {
    hanzi: "夹",
  },
  {
    hanzi: "文件夹",
  },
  {
    hanzi: "随后",
  },
  {
    hanzi: "随意",
  },
  {
    hanzi: "侠义",
  },
  {
    hanzi: "过后",
  },
  {
    hanzi: "错过",
  },
  {
    hanzi: "只不过",
  },
  {
    hanzi: "峡",
  },
  {
    hanzi: "海峡",
  },
  {
    hanzi: "峡谷",
  },
  {
    hanzi: "只顾",
  },
  {
    hanzi: "只管",
  },
  {
    hanzi: "狭窄",
  },
  {
    hanzi: "王后",
  },
  {
    hanzi: "往后",
  },
  {
    hanzi: "挟持",
  },
  {
    hanzi: "以往",
  },
  {
    hanzi: "往年",
  },
  {
    hanzi: "栋",
  },
  {
    hanzi: "冻",
  },
  {
    hanzi: "冻结",
  },
  {
    hanzi: "盗",
  },
  {
    hanzi: "盗版",
  },
  {
    hanzi: "强盗",
  },
  {
    hanzi: "欣赏",
  },
  {
    hanzi: "吉祥",
  },
  {
    hanzi: "吉祥物",
  },
  {
    hanzi: "当年",
  },
  {
    hanzi: "当年",
  },
  {
    hanzi: "当代",
  },
  {
    hanzi: "氧气",
  },
  {
    hanzi: "氧化",
  },
  {
    hanzi: "缺氧",
  },
  {
    hanzi: "交代",
  },
  {
    hanzi: "成交",
  },
  {
    hanzi: "当选",
  },
  {
    hanzi: "选修",
  },
  {
    hanzi: "气氛",
  },
  {
    hanzi: "氛围",
  },
  {
    hanzi: "正当",
  },
  {
    hanzi: "正当",
  },
  {
    hanzi: "正规",
  },
  {
    hanzi: "犯规",
  },
  {
    hanzi: "盆",
  },
  {
    hanzi: "脸盆",
  },
  {
    hanzi: "盆地",
  },
  {
    hanzi: "正义",
  },
  {
    hanzi: "名义",
  },
  {
    hanzi: "忠心",
  },
  {
    hanzi: "忠诚",
  },
  {
    hanzi: "公正",
  },
  {
    hanzi: "公告",
  },
  {
    hanzi: "安慰",
  },
  {
    hanzi: "慰问",
  },
  {
    hanzi: "转告",
  },
  {
    hanzi: "原告",
  },
  {
    hanzi: "被告",
  },
  {
    hanzi: "悬",
  },
  {
    hanzi: "公认",
  },
  {
    hanzi: "认定",
  },
  {
    hanzi: "轨道",
  },
  {
    hanzi: "办公",
  },
  {
    hanzi: "承办",
  },
  {
    hanzi: "继承",
  },
  {
    hanzi: "辅助",
  },
  {
    hanzi: "创办",
  },
  {
    hanzi: "公安",
  },
  {
    hanzi: "安置",
  },
  {
    hanzi: "照耀",
  },
  {
    hanzi: "公式",
  },
  {
    hanzi: "开幕式",
  },
  {
    hanzi: "晃",
  },
  {
    hanzi: "晃",
  },
  {
    hanzi: "摇晃",
  },
  {
    hanzi: "公鸡",
  },
  {
    hanzi: "母鸡",
  },
  {
    hanzi: "光辉",
  },
  {
    hanzi: "母子",
  },
  {
    hanzi: "父子",
  },
  {
    hanzi: "母女",
  },
  {
    hanzi: "父女",
  },
  {
    hanzi: "儿女",
  },
  {
    hanzi: "晕",
  },
  {
    hanzi: "晕",
  },
  {
    hanzi: "晕车",
  },
  {
    hanzi: "头晕",
  },
  {
    hanzi: "模特儿",
  },
  {
    hanzi: "模范",
  },
  {
    hanzi: "模样",
  },
  {
    hanzi: "昌盛",
  },
  {
    hanzi: "味儿",
  },
  {
    hanzi: "个儿",
  },
  {
    hanzi: "昏",
  },
  {
    hanzi: "黄昏",
  },
  {
    hanzi: "各个",
  },
  {
    hanzi: "孤儿",
  },
  {
    hanzi: "少儿",
  },
  {
    hanzi: "晒",
  },
  {
    hanzi: "晒太阳",
  },
  {
    hanzi: "有劲儿",
  },
  {
    hanzi: "现有",
  },
  {
    hanzi: "兴旺",
  },
  {
    hanzi: "有毒",
  },
  {
    hanzi: "有害",
  },
  {
    hanzi: "有着",
  },
  {
    hanzi: "宴会",
  },
  {
    hanzi: "晚宴",
  },
  {
    hanzi: "盛宴",
  },
  {
    hanzi: "睡着",
  },
  {
    hanzi: "占有",
  },
  {
    hanzi: "占领",
  },
  {
    hanzi: "牢",
  },
  {
    hanzi: "牢牢",
  },
  {
    hanzi: "率领",
  },
  {
    hanzi: "有关",
  },
  {
    hanzi: "踏",
  },
  {
    hanzi: "踏",
  },
  {
    hanzi: "踏实",
  },
  {
    hanzi: "特有",
  },
  {
    hanzi: "特价",
  },
  {
    hanzi: "实践",
  },
  {
    hanzi: "践踏",
  },
  {
    hanzi: "定价",
  },
  {
    hanzi: "特定",
  },
  {
    hanzi: "堆",
  },
  {
    hanzi: "堆积",
  },
  {
    hanzi: "定位",
  },
  {
    hanzi: "约定",
  },
  {
    hanzi: "墨",
  },
  {
    hanzi: "墨水",
  },
  {
    hanzi: "墨西哥",
  },
  {
    hanzi: "墨镜",
  },
  {
    hanzi: "特性",
  },
  {
    hanzi: "特快",
  },
  {
    hanzi: "埋",
  },
  {
    hanzi: "埋",
  },
  {
    hanzi: "痛快",
  },
  {
    hanzi: "特意",
  },
  {
    hanzi: "墓",
  },
  {
    hanzi: "意识",
  },
  {
    hanzi: "意志",
  },
  {
    hanzi: "意想不到",
  },
  {
    hanzi: "戒",
  },
  {
    hanzi: "戒酒",
  },
  {
    hanzi: "戒烟",
  },
  {
    hanzi: "民意",
  },
  {
    hanzi: "民歌",
  },
  {
    hanzi: "机械",
  },
  {
    hanzi: "器械",
  },
  {
    hanzi: "国歌",
  },
  {
    hanzi: "歌唱",
  },
  {
    hanzi: "渠道",
  },
  {
    hanzi: "歌词",
  },
  {
    hanzi: "歌星",
  },
  {
    hanzi: "柱子",
  },
  {
    hanzi: "支柱",
  },
  {
    hanzi: "国民",
  },
  {
    hanzi: "爱国",
  },
  {
    hanzi: "栏",
  },
  {
    hanzi: "栏目",
  },
  {
    hanzi: "爱护",
  },
  {
    hanzi: "喜爱",
  },
  {
    hanzi: "烂",
  },
  {
    hanzi: "关爱",
  },
  {
    hanzi: "关怀",
  },
  {
    hanzi: "机关",
  },
  {
    hanzi: "炒",
  },
  {
    hanzi: "炒股",
  },
  {
    hanzi: "炒作",
  },
  {
    hanzi: "炒饭",
  },
  {
    hanzi: "炒菜",
  },
  {
    hanzi: "开关",
  },
  {
    hanzi: "无关",
  },
  {
    hanzi: "炉",
  },
  {
    hanzi: "出炉",
  },
  {
    hanzi: "锅炉",
  },
  {
    hanzi: "微波炉",
  },
  {
    hanzi: "炉子",
  },
  {
    hanzi: "无边",
  },
  {
    hanzi: "无效",
  },
  {
    hanzi: "烤",
  },
  {
    hanzi: "烤肉",
  },
  {
    hanzi: "烤鸭",
  },
  {
    hanzi: "烧烤",
  },
  {
    hanzi: "关联",
  },
  {
    hanzi: "联络",
  },
  {
    hanzi: "联想",
  },
  {
    hanzi: "阔",
  },
  {
    hanzi: "广阔",
  },
  {
    hanzi: "宽阔",
  },
  {
    hanzi: "开阔",
  },
  {
    hanzi: "联手",
  },
  {
    hanzi: "二手",
  },
  {
    hanzi: "二维码",
  },
  {
    hanzi: "辞",
  },
  {
    hanzi: "辞典",
  },
  {
    hanzi: "辞职",
  },
  {
    hanzi: "不辞而别",
  },
  {
    hanzi: "手里",
  },
  {
    hanzi: "手套",
  },
  {
    hanzi: "套餐",
  },
  {
    hanzi: "手法",
  },
  {
    hanzi: "宰",
  },
  {
    hanzi: "主宰",
  },
  {
    hanzi: "招手",
  },
  {
    hanzi: "助手",
  },
  {
    hanzi: "助理",
  },
  {
    hanzi: "辜负",
  },
  {
    hanzi: "无辜",
  },
  {
    hanzi: "补助",
  },
  {
    hanzi: "高手",
  },
  {
    hanzi: "高价",
  },
  {
    hanzi: "辨别",
  },
  {
    hanzi: "辨认",
  },
  {
    hanzi: "分辨",
  },
  {
    hanzi: "高尚",
  },
  {
    hanzi: "高铁",
  },
  {
    hanzi: "高温",
  },
  {
    hanzi: "降温",
  },
  {
    hanzi: "辩",
  },
  {
    hanzi: "辩论",
  },
  {
    hanzi: "温和 1",
  },
  {
    hanzi: "温和 2",
  },
  {
    hanzi: "高等",
  },
  {
    hanzi: "辫子",
  },
  {
    hanzi: "等候",
  },
  {
    hanzi: "相等",
  },
  {
    hanzi: "纲领",
  },
  {
    hanzi: "大纲",
  },
  {
    hanzi: "高原",
  },
  {
    hanzi: "草原",
  },
  {
    hanzi: "平原",
  },
  {
    hanzi: "情绪",
  },
  {
    hanzi: "情绪化",
  },
  {
    hanzi: "平稳",
  },
  {
    hanzi: "原始",
  },
  {
    hanzi: "原理",
  },
  {
    hanzi: "赌",
  },
  {
    hanzi: "赌博",
  },
  {
    hanzi: "赠",
  },
  {
    hanzi: "赠送",
  },
  {
    hanzi: "捐赠",
  },
  {
    hanzi: "皆",
  },
  {
    hanzi: "和谐",
  },
  {
    hanzi: "楷模",
  },
  {
    hanzi: "矛盾",
  },
  {
    hanzi: "真理",
  },
  {
    hanzi: "真相",
  },
  {
    hanzi: "循环",
  },
  {
    hanzi: "相片",
  },
  {
    hanzi: "唱片",
  },
  {
    hanzi: "睡眠",
  },
  {
    hanzi: "相声",
  },
  {
    hanzi: "响声",
  },
  {
    hanzi: "流氓",
  },
  {
    hanzi: "笑声",
  },
  {
    hanzi: "笑脸",
  },
  {
    hanzi: "盲人",
  },
  {
    hanzi: "相应",
  },
  {
    hanzi: "应急",
  },
  {
    hanzi: "丧失",
  },
  {
    hanzi: "急救",
  },
  {
    hanzi: "救命",
  },
  {
    hanzi: "尊长",
  },
  {
    hanzi: "对应",
  },
  {
    hanzi: "应对",
  },
  {
    hanzi: "回应",
  },
  {
    hanzi: "奠定",
  },
  {
    hanzi: "祭奠",
  },
  {
    hanzi: "回报",
  },
  {
    hanzi: "报答",
  },
  {
    hanzi: "蹲",
  },
  {
    hanzi: "报考",
  },
  {
    hanzi: "通报",
  },
  {
    hanzi: "遵守",
  },
  {
    hanzi: "回信",
  },
  {
    hanzi: "回收",
  },
  {
    hanzi: "收回",
  },
  {
    hanzi: "递",
  },
  {
    hanzi: "快递",
  },
  {
    hanzi: "传递",
  },
  {
    hanzi: "递给",
  },
  {
    hanzi: "丰收",
  },
  {
    hanzi: "接收",
  },
  {
    hanzi: "没收",
  },
  {
    hanzi: "仓库",
  },
  {
    hanzi: "从没",
  },
  {
    hanzi: "收取",
  },
  {
    hanzi: "听取",
  },
  {
    hanzi: "苍白",
  },
  {
    hanzi: "收养",
  },
  {
    hanzi: "疗养",
  },
  {
    hanzi: "舱",
  },
  {
    hanzi: "机舱",
  },
  {
    hanzi: "保养",
  },
  {
    hanzi: "养老",
  },
  {
    hanzi: "军舰",
  },
  {
    hanzi: "舰队",
  },
  {
    hanzi: "旗舰",
  },
  {
    hanzi: "古老",
  },
  {
    hanzi: "老乡",
  },
  {
    hanzi: "乡村",
  },
  {
    hanzi: "欺负",
  },
  {
    hanzi: "修养",
  },
  {
    hanzi: "修建",
  },
  {
    hanzi: "咨询",
  },
  {
    hanzi: "必修",
  },
  {
    hanzi: "修复",
  },
  {
    hanzi: "呛",
  },
  {
    hanzi: "呛",
  },
  {
    hanzi: "够呛",
  },
  {
    hanzi: "答复",
  },
  {
    hanzi: "复苏",
  },
  {
    hanzi: "咬",
  },
  {
    hanzi: "康复",
  },
  {
    hanzi: "复制",
  },
  {
    hanzi: "哲学",
  },
  {
    hanzi: "哲学家",
  },
  {
    hanzi: "制订",
  },
  {
    hanzi: "豆制品",
  },
  {
    hanzi: "制成",
  },
  {
    hanzi: "吊",
  },
  {
    hanzi: "成效",
  },
  {
    hanzi: "合成",
  },
  {
    hanzi: "成品",
  },
  {
    hanzi: "吞",
  },
  {
    hanzi: "农产品",
  },
  {
    hanzi: "水产品",
  },
  {
    hanzi: "毒品",
  },
  {
    hanzi: "舔",
  },
  {
    hanzi: "不成",
  },
  {
    hanzi: "不要紧",
  },
  {
    hanzi: "将要",
  },
  {
    hanzi: "添",
  },
  {
    hanzi: "添加",
  },
  {
    hanzi: "不怎么",
  },
  {
    hanzi: "要么",
  },
  {
    hanzi: "爽",
  },
  {
    hanzi: "要好",
  },
  {
    hanzi: "要素",
  },
  {
    hanzi: "无奈",
  },
  {
    hanzi: "不怎么样",
  },
  {
    hanzi: "照样",
  },
  {
    hanzi: "崇拜",
  },
  {
    hanzi: "不顾",
  },
  {
    hanzi: "顾问",
  },
  {
    hanzi: "卧",
  },
  {
    hanzi: "卧室",
  },
  {
    hanzi: "不利",
  },
  {
    hanzi: "不利于",
  },
  {
    hanzi: "利息",
  },
  {
    hanzi: "便利",
  },
  {
    hanzi: "扑",
  },
  {
    hanzi: "不便",
  },
  {
    hanzi: "不易",
  },
  {
    hanzi: "撑",
  },
  {
    hanzi: "支撑",
  },
  {
    hanzi: "不曾",
  },
  {
    hanzi: "不能不",
  },
  {
    hanzi: "拨",
  },
  {
    hanzi: "拨打",
  },
  {
    hanzi: "决不",
  },
  {
    hanzi: "不见",
  },
  {
    hanzi: "挤",
  },
  {
    hanzi: "梦见",
  },
  {
    hanzi: "遇见",
  },
  {
    hanzi: "挡",
  },
  {
    hanzi: "挡",
  },
  {
    hanzi: "不料",
  },
  {
    hanzi: "不通",
  },
  {
    hanzi: "扭",
  },
  {
    hanzi: "别扭",
  },
  {
    hanzi: "通红",
  },
  {
    hanzi: "通话",
  },
  {
    hanzi: "描述",
  },
  {
    hanzi: "描写",
  },
  {
    hanzi: "不值",
  },
  {
    hanzi: "值班",
  },
  {
    hanzi: "增值",
  },
  {
    hanzi: "挖",
  },
  {
    hanzi: "从不",
  },
  {
    hanzi: "服从",
  },
  {
    hanzi: "想不到",
  },
  {
    hanzi: "想念",
  },
  {
    hanzi: "押金",
  },
  {
    hanzi: "好不容易",
  },
  {
    hanzi: "好友",
  },
  {
    hanzi: "搞好",
  },
  {
    hanzi: "披",
  },
  {
    hanzi: "披露",
  },
  {
    hanzi: "刚好",
  },
  {
    hanzi: "好似",
  },
  {
    hanzi: "好转",
  },
  {
    hanzi: "彼此",
  },
  {
    hanzi: "转向",
  },
  {
    hanzi: "转向",
  },
  {
    hanzi: "向导",
  },
  {
    hanzi: "玻璃",
  },
  {
    hanzi: "面貌",
  },
  {
    hanzi: "面子",
  },
  {
    hanzi: "层面",
  },
  {
    hanzi: "家禽",
  },
  {
    hanzi: "面对面",
  },
  {
    hanzi: "面试",
  },
  {
    hanzi: "试卷",
  },
  {
    hanzi: "试图",
  },
  {
    hanzi: "恰当",
  },
  {
    hanzi: "恰好",
  },
  {
    hanzi: "恰恰",
  },
  {
    hanzi: "图案",
  },
  {
    hanzi: "企图",
  },
  {
    hanzi: "笔试",
  },
  {
    hanzi: "钢笔",
  },
  {
    hanzi: "悄悄",
  },
  {
    hanzi: "毛笔",
  },
  {
    hanzi: "口试",
  },
  {
    hanzi: "口号",
  },
  {
    hanzi: "觉悟",
  },
  {
    hanzi: "恍然大悟",
  },
  {
    hanzi: "港口",
  },
  {
    hanzi: "试点",
  },
  {
    hanzi: "点名",
  },
  {
    hanzi: "国籍",
  },
  {
    hanzi: "藉",
  },
  {
    hanzi: "藉",
  },
  {
    hanzi: "慰藉",
  },
  {
    hanzi: "荒",
  },
  {
    hanzi: "名额",
  },
  {
    hanzi: "名胜",
  },
  {
    hanzi: "慌",
  },
  {
    hanzi: "慌忙",
  },
  {
    hanzi: "胜负",
  },
  {
    hanzi: "晚点",
  },
  {
    hanzi: "谎话",
  },
  {
    hanzi: "谎言",
  },
  {
    hanzi: "终点",
  },
  {
    hanzi: "起点",
  },
  {
    hanzi: "薪水",
  },
  {
    hanzi: "起码",
  },
  {
    hanzi: "起诉",
  },
  {
    hanzi: "发起",
  },
  {
    hanzi: "疏散",
  },
  {
    hanzi: "发觉",
  },
  {
    hanzi: "提起",
  },
  {
    hanzi: "蔬菜",
  },
  {
    hanzi: "提示",
  },
  {
    hanzi: "提交",
  },
  {
    hanzi: "交际",
  },
  {
    hanzi: "薯片",
  },
  {
    hanzi: "薯条",
  },
  {
    hanzi: "热点",
  },
  {
    hanzi: "热门",
  },
  {
    hanzi: "逻辑",
  },
  {
    hanzi: "热量",
  },
  {
    hanzi: "重量",
  },
  {
    hanzi: "酱",
  },
  {
    hanzi: "果酱",
  },
  {
    hanzi: "酱油",
  },
  {
    hanzi: "酱紫",
  },
  {
    hanzi: "注重",
  },
  {
    hanzi: "重建",
  },
  {
    hanzi: "昔日",
  },
  {
    hanzi: "诚信",
  },
  {
    hanzi: "信念",
  },
  {
    hanzi: "信箱",
  },
  {
    hanzi: "醋",
  },
  {
    hanzi: "吃醋",
  },
  {
    hanzi: "箱子",
  },
  {
    hanzi: "胖子",
  },
  {
    hanzi: "希腊",
  },
  {
    hanzi: "古希腊",
  },
  {
    hanzi: "腊肉",
  },
  {
    hanzi: "刷子",
  },
  {
    hanzi: "袜子",
  },
  {
    hanzi: "打猎",
  },
  {
    hanzi: "极其",
  },
  {
    hanzi: "北极",
  },
  {
    hanzi: "南极",
  },
  {
    hanzi: "南北",
  },
  {
    hanzi: "蜡",
  },
  {
    hanzi: "消极",
  },
  {
    hanzi: "消毒",
  },
  {
    hanzi: "蜡烛",
  },
  {
    hanzi: "烛光",
  },
  {
    hanzi: "集合",
  },
  {
    hanzi: "合并",
  },
  {
    hanzi: "蛇",
  },
  {
    hanzi: "合约",
  },
  {
    hanzi: "预约",
  },
  {
    hanzi: "猴",
  },
  {
    hanzi: "猴子",
  },
  {
    hanzi: "干预",
  },
  {
    hanzi: "预备",
  },
  {
    hanzi: "犹太人",
  },
  {
    hanzi: "犹如",
  },
  {
    hanzi: "讲究",
  },
  {
    hanzi: "究竟",
  },
  {
    hanzi: "追究",
  },
  {
    hanzi: "剪",
  },
  {
    hanzi: "剪刀",
  },
  {
    hanzi: "剪子",
  },
  {
    hanzi: "讲座",
  },
  {
    hanzi: "让座",
  },
  {
    hanzi: "箭",
  },
  {
    hanzi: "火箭",
  },
  {
    hanzi: "箭头",
  },
  {
    hanzi: "弓箭",
  },
  {
    hanzi: "讲课",
  },
  {
    hanzi: "课题",
  },
  {
    hanzi: "竹子",
  },
  {
    hanzi: "爆竹",
  },
  {
    hanzi: "胸有成竹",
  },
  {
    hanzi: "补课",
  },
  {
    hanzi: "补习",
  },
  {
    hanzi: "补考",
  },
  {
    hanzi: "煎",
  },
  {
    hanzi: "煎蛋",
  },
  {
    hanzi: "煎饼",
  },
  {
    hanzi: "考题",
  },
  {
    hanzi: "题材",
  },
  {
    hanzi: "议题",
  },
  {
    hanzi: "煮",
  },
  {
    hanzi: "议论",
  },
  {
    hanzi: "争议",
  },
  {
    hanzi: "争论",
  },
  {
    hanzi: "瞧",
  },
  {
    hanzi: "抗议",
  },
  {
    hanzi: "对抗",
  },
  {
    hanzi: "盼",
  },
  {
    hanzi: "盼望",
  },
  {
    hanzi: "宝石",
  },
  {
    hanzi: "化石",
  },
  {
    hanzi: "瞅",
  },
  {
    hanzi: "进化",
  },
  {
    hanzi: "增进",
  },
  {
    hanzi: "揪",
  },
  {
    hanzi: "强化",
  },
  {
    hanzi: "强势",
  },
  {
    hanzi: "愁",
  },
  {
    hanzi: "化解",
  },
  {
    hanzi: "误解",
  },
  {
    hanzi: "智慧",
  },
  {
    hanzi: "解除",
  },
  {
    hanzi: "除非",
  },
  {
    hanzi: "除夕",
  },
  {
    hanzi: "严肃",
  },
  {
    hanzi: "保密",
  },
  {
    hanzi: "保守",
  },
  {
    hanzi: "保卫",
  },
  {
    hanzi: "长寿",
  },
  {
    hanzi: "寿司",
  },
  {
    hanzi: "布置",
  },
  {
    hanzi: "布满",
  },
  {
    hanzi: "圆满",
  },
  {
    hanzi: "鲜艳",
  },
  {
    hanzi: "便条",
  },
  {
    hanzi: "以便",
  },
  {
    hanzi: "钻",
  },
  {
    hanzi: "钻",
  },
  {
    hanzi: "钻进",
  },
  {
    hanzi: "足以",
  },
  {
    hanzi: "充足",
  },
  {
    hanzi: "十足",
  },
  {
    hanzi: "铃",
  },
  {
    hanzi: "铃声",
  },
  {
    hanzi: "便是",
  },
  {
    hanzi: "或是",
  },
  {
    hanzi: "琴",
  },
  {
    hanzi: "钢琴",
  },
  {
    hanzi: "古琴",
  },
  {
    hanzi: "小提琴",
  },
  {
    hanzi: "中提琴",
  },
  {
    hanzi: "大提琴",
  },
  {
    hanzi: "低音大提琴",
  },
  {
    hanzi: "却是",
  },
  {
    hanzi: "算是",
  },
  {
    hanzi: "顽皮",
  },
  {
    hanzi: "顽强",
  },
  {
    hanzi: "算了",
  },
  {
    hanzi: "完了",
  },
  {
    hanzi: "颗",
  },
  {
    hanzi: "极端",
  },
  {
    hanzi: "端午节",
  },
  {
    hanzi: "裹",
  },
  {
    hanzi: "包裹",
  },
  {
    hanzi: "节省",
  },
  {
    hanzi: "省钱",
  },
  {
    hanzi: "倡导",
  },
  {
    hanzi: "提倡",
  },
  {
    hanzi: "情节",
  },
  {
    hanzi: "神情",
  },
  {
    hanzi: "神话",
  },
  {
    hanzi: "仰",
  },
  {
    hanzi: "信仰",
  },
  {
    hanzi: "教训",
  },
  {
    hanzi: "培训班",
  },
  {
    hanzi: "匹",
  },
  {
    hanzi: "匹",
  },
  {
    hanzi: "奥林匹克",
  },
  {
    hanzi: "基督教",
  },
  {
    hanzi: "道教",
  },
  {
    hanzi: "劝",
  },
  {
    hanzi: "管道",
  },
  {
    hanzi: "吸管",
  },
  {
    hanzi: "吸毒",
  },
  {
    hanzi: "叉",
  },
  {
    hanzi: "叉",
  },
  {
    hanzi: "叉",
  },
  {
    hanzi: "叉子",
  },
  {
    hanzi: "金额",
  },
  {
    hanzi: "金钱",
  },
  {
    hanzi: "兔",
  },
  {
    hanzi: "兔子",
  },
  {
    hanzi: "租金",
  },
  {
    hanzi: "美金",
  },
  {
    hanzi: "斜",
  },
  {
    hanzi: "优美",
  },
  {
    hanzi: "优良",
  },
  {
    hanzi: "精美",
  },
  {
    hanzi: "枝",
  },
  {
    hanzi: "火柴",
  },
  {
    hanzi: "柴油",
  },
  {
    hanzi: "梨",
  },
  {
    hanzi: "躲",
  },
  {
    hanzi: "犹豫",
  },
  {
    hanzi: "沙漠",
  },
  {
    hanzi: "拉开",
  },
  {
    hanzi: "开创",
  },
  {
    hanzi: "洒",
  },
  {
    hanzi: "开花",
  },
  {
    hanzi: "花瓶",
  },
  {
    hanzi: "烟花",
  },
  {
    hanzi: "牺牲",
  },
  {
    hanzi: "变换",
  },
  {
    hanzi: "变更",
  },
  {
    hanzi: "厘米",
  },
  {
    hanzi: "更新",
  },
  {
    hanzi: "革新",
  },
  {
    hanzi: "新兴",
  },
  {
    hanzi: "厄运",
  },
  {
    hanzi: "征服",
  },
  {
    hanzi: "象征",
  },
  {
    hanzi: "脆",
  },
  {
    hanzi: "干脆",
  },
  {
    hanzi: "征求",
  },
  {
    hanzi: "求职",
  },
  {
    hanzi: "职位",
  },
  {
    hanzi: "跪",
  },
  {
    hanzi: "皮球",
  },
  {
    hanzi: "球拍",
  },
  {
    hanzi: "踩",
  },
  {
    hanzi: "球星",
  },
  {
    hanzi: "影星",
  },
  {
    hanzi: "阴影",
  },
  {
    hanzi: "扼杀",
  },
  {
    hanzi: "礼拜",
  },
  {
    hanzi: "礼堂",
  },
  {
    hanzi: "挣",
  },
  {
    hanzi: "挣",
  },
  {
    hanzi: "挣钱",
  },
  {
    hanzi: "送礼",
  },
  {
    hanzi: "送行",
  },
  {
    hanzi: "抄",
  },
  {
    hanzi: "抄写",
  },
  {
    hanzi: "山峰",
  },
  {
    hanzi: "山区",
  },
  {
    hanzi: "捉",
  },
  {
    hanzi: "城区",
  },
  {
    hanzi: "商城",
  },
  {
    hanzi: "摔",
  },
  {
    hanzi: "摔倒",
  },
  {
    hanzi: "括号",
  },
  {
    hanzi: "称号",
  },
  {
    hanzi: "号召",
  },
  {
    hanzi: "拐",
  },
  {
    hanzi: "左拐",
  },
  {
    hanzi: "右拐",
  },
  {
    hanzi: "深深",
  },
  {
    hanzi: "深厚",
  },
  {
    hanzi: "深化",
  },
  {
    hanzi: "掏",
  },
  {
    hanzi: "失业",
  },
  {
    hanzi: "物业",
  },
  {
    hanzi: "物价",
  },
  {
    hanzi: "捡",
  },
  {
    hanzi: "树林",
  },
  {
    hanzi: "松树",
  },
  {
    hanzi: "果树",
  },
  {
    hanzi: "挨",
  },
  {
    hanzi: "挨",
  },
  {
    hanzi: "挨着",
  },
  {
    hanzi: "挨打",
  },
  {
    hanzi: "网址",
  },
  {
    hanzi: "网吧",
  },
  {
    hanzi: "网页",
  },
  {
    hanzi: "唉",
  },
  {
    hanzi: "唉",
  },
  {
    hanzi: "未必",
  },
  {
    hanzi: "必需",
  },
  {
    hanzi: "必将",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "诶",
  },
  {
    hanzi: "间接",
  },
  {
    hanzi: "接连",
  },
  {
    hanzi: "连接",
  },
  {
    hanzi: "埃及",
  },
  {
    hanzi: "门诊",
  },
  {
    hanzi: "入门",
  },
  {
    hanzi: "融入",
  },
  {
    hanzi: "垄断",
  },
  {
    hanzi: "反问",
  },
  {
    hanzi: "反响",
  },
  {
    hanzi: "宠",
  },
  {
    hanzi: "宠物",
  },
  {
    hanzi: "逃走",
  },
  {
    hanzi: "拿走",
  },
  {
    hanzi: "袭击",
  },
  {
    hanzi: "传达",
  },
  {
    hanzi: "传输",
  },
  {
    hanzi: "靠拢",
  },
  {
    hanzi: "彩票",
  },
  {
    hanzi: "退票",
  },
  {
    hanzi: "聋",
  },
  {
    hanzi: "聋人",
  },
  {
    hanzi: "博客",
  },
  {
    hanzi: "微博",
  },
  {
    hanzi: "庞大",
  },
  {
    hanzi: "脸庞",
  },
  {
    hanzi: "按摩",
  },
  {
    hanzi: "摩托",
  },
  {
    hanzi: "笼子",
  },
  {
    hanzi: "种种",
  },
  {
    hanzi: "种类",
  },
  {
    hanzi: "羽绒服",
  },
  {
    hanzi: "围巾",
  },
  {
    hanzi: "包围",
  },
  {
    hanzi: "绘画",
  },
  {
    hanzi: "破产",
  },
  {
    hanzi: "增产",
  },
  {
    hanzi: "阿姨",
  },
  {
    hanzi: "姨妈",
  },
  {
    hanzi: "大姨妈",
  },
  {
    hanzi: "两手",
  },
  {
    hanzi: "两边",
  },
  {
    hanzi: "边境",
  },
  {
    hanzi: "粥",
  },
  {
    hanzi: "冰雪",
  },
  {
    hanzi: "登记",
  },
  {
    hanzi: "弯",
  },
  {
    hanzi: "转弯",
  },
  {
    hanzi: "弯曲",
  },
  {
    hanzi: "构造",
  },
  {
    hanzi: "纪律",
  },
  {
    hanzi: "闷",
  },
  {
    hanzi: "闷",
  },
  {
    hanzi: "坚固",
  },
  {
    hanzi: "宽广",
  },
  {
    hanzi: "内阁",
  },
  {
    hanzi: "阁下",
  },
  {
    hanzi: "宁静",
  },
  {
    hanzi: "英勇",
  },
  {
    hanzi: "闯",
  },
  {
    hanzi: "闯入",
  },
  {
    hanzi: "薄弱",
  },
  {
    hanzi: "差别",
  },
  {
    hanzi: "腾",
  },
  {
    hanzi: "附件",
  },
  {
    hanzi: "共计",
  },
  {
    hanzi: "壶",
  },
  {
    hanzi: "水壶",
  },
  {
    hanzi: "火腿",
  },
  {
    hanzi: "仍旧",
  },
  {
    hanzi: "壳",
  },
  {
    hanzi: "贝壳",
  },
  {
    hanzi: "外壳",
  },
  {
    hanzi: "射击",
  },
  {
    hanzi: "饮食",
  },
  {
    hanzi: "馒头",
  },
  {
    hanzi: "波浪",
  },
  {
    hanzi: "采纳",
  },
  {
    hanzi: "饲料",
  },
  {
    hanzi: "饲养",
  },
  {
    hanzi: "供给",
  },
  {
    hanzi: "姑姑",
  },
  {
    hanzi: "幻想",
  },
  {
    hanzi: "凉鞋",
  },
  {
    hanzi: "旅店",
  },
  {
    hanzi: "畜牧",
  },
  {
    hanzi: "畜牧业",
  },
  {
    hanzi: "奶牛",
  },
  {
    hanzi: "贫困",
  },
  {
    hanzi: "搐动",
  },
  {
    hanzi: "隐藏",
  },
  {
    hanzi: "缘故",
  },
  {
    hanzi: "储蓄",
  },
  {
    hanzi: "整顿",
  },
  {
    hanzi: "罪恶",
  },
  {
    hanzi: "名誉",
  },
  {
    hanzi: "譬如",
  },
  {
    hanzi: "譬如说",
  },
  {
    hanzi: "领袖",
  },
  {
    hanzi: "袖珍",
  },
  {
    hanzi: "长袖",
  },
  {
    hanzi: "短袖",
  },
  {
    hanzi: "裸",
  },
  {
    hanzi: "裸体",
  },
  {
    hanzi: "比萨",
  },
  {
    hanzi: "披萨",
  },
  {
    hanzi: "隔离",
  },
  {
    hanzi: "间隔",
  },
  {
    hanzi: "时隔",
  },
  {
    hanzi: "产",
  },
  {
    hanzi: "铲子",
  },
  {
    hanzi: "外资",
  },
  {
    hanzi: "出资",
  },
  {
    hanzi: "合资",
  },
  {
    hanzi: "集资",
  },
  {
    hanzi: "师资",
  },
  {
    hanzi: "物资",
  },
  {
    hanzi: "资历",
  },
  {
    hanzi: "资深",
  },
  {
    hanzi: "资讯",
  },
  {
    hanzi: "锦旗",
  },
  {
    hanzi: "货币",
  },
  {
    hanzi: "货车",
  },
  {
    hanzi: "货物",
  },
  {
    hanzi: "货运",
  },
  {
    hanzi: "水货",
  },
  {
    hanzi: "链接",
  },
  {
    hanzi: "项链",
  },
  {
    hanzi: "拉链",
  },
  {
    hanzi: "链子",
  },
  {
    hanzi: "赞不绝口",
  },
  {
    hanzi: "赞美",
  },
  {
    hanzi: "赞同",
  },
  {
    hanzi: "赞扬",
  },
  {
    hanzi: "轰",
  },
  {
    hanzi: "轰动",
  },
  {
    hanzi: "轰炸",
  },
  {
    hanzi: "轰轰烈烈",
  },
  {
    hanzi: "设",
  },
  {
    hanzi: "假设",
  },
  {
    hanzi: "设定",
  },
  {
    hanzi: "设法",
  },
  {
    hanzi: "想方设法",
  },
  {
    hanzi: "沧桑",
  },
  {
    hanzi: "桑拿",
  },
  {
    hanzi: "低调",
  },
  {
    hanzi: "调度",
  },
  {
    hanzi: "高调",
  },
  {
    hanzi: "情调",
  },
  {
    hanzi: "上调",
  },
  {
    hanzi: "调控",
  },
  {
    hanzi: "调料",
  },
  {
    hanzi: "调试",
  },
  {
    hanzi: "下调",
  },
  {
    hanzi: "嗓子",
  },
  {
    hanzi: "公款",
  },
  {
    hanzi: "大款",
  },
  {
    hanzi: "款式",
  },
  {
    hanzi: "款项",
  },
  {
    hanzi: "条款",
  },
  {
    hanzi: "新款",
  },
  {
    hanzi: "叠",
  },
  {
    hanzi: "重叠",
  },
  {
    hanzi: "折叠",
  },
  {
    hanzi: "刻舟求剑",
  },
  {
    hanzi: "点缀",
  },
  {
    hanzi: "容许",
  },
  {
    hanzi: "赞许",
  },
  {
    hanzi: "准许",
  },
  {
    hanzi: "化纤",
  },
  {
    hanzi: "纤维",
  },
  {
    hanzi: "光纤",
  },
  {
    hanzi: "参谋",
  },
  {
    hanzi: "谋害",
  },
  {
    hanzi: "谋求",
  },
  {
    hanzi: "谋生",
  },
  {
    hanzi: "足智多谋",
  },
  {
    hanzi: "谋杀",
  },
  {
    hanzi: "谋划",
  },
  {
    hanzi: "纽带",
  },
  {
    hanzi: "纽扣",
  },
  {
    hanzi: "纽约",
  },
  {
    hanzi: "纽约时报",
  },
  {
    hanzi: "煤矿",
  },
  {
    hanzi: "花纹",
  },
  {
    hanzi: "条纹",
  },
  {
    hanzi: "指纹",
  },
  {
    hanzi: "纹身",
  },
  {
    hanzi: "灭绝",
  },
  {
    hanzi: "灭亡",
  },
  {
    hanzi: "破灭",
  },
  {
    hanzi: "缴",
  },
  {
    hanzi: "缴纳",
  },
  {
    hanzi: "缴费",
  },
  {
    hanzi: "侧面",
  },
  {
    hanzi: "侧重",
  },
  {
    hanzi: "古迹",
  },
  {
    hanzi: "轨迹",
  },
  {
    hanzi: "迹象",
  },
  {
    hanzi: "奇迹",
  },
  {
    hanzi: "事迹",
  },
  {
    hanzi: "字迹",
  },
  {
    hanzi: "足迹",
  },
  {
    hanzi: "侵害",
  },
  {
    hanzi: "侵略",
  },
  {
    hanzi: "侵权",
  },
  {
    hanzi: "侵占",
  },
  {
    hanzi: "入侵",
  },
  {
    hanzi: "启迪",
  },
  {
    hanzi: "迪斯尼/迪士尼",
  },
  {
    hanzi: "车轮",
  },
  {
    hanzi: "轮换",
  },
  {
    hanzi: "轮流",
  },
  {
    hanzi: "巡逻",
  },
  {
    hanzi: "巡回",
  },
  {
    hanzi: "巡警",
  },
  {
    hanzi: "超速",
  },
  {
    hanzi: "车速",
  },
  {
    hanzi: "飞速",
  },
  {
    hanzi: "火速",
  },
  {
    hanzi: "时速",
  },
  {
    hanzi: "提速",
  },
  {
    hanzi: "辽阔",
  },
  {
    hanzi: "辽宁",
  },
  {
    hanzi: "从容不迫",
  },
  {
    hanzi: "急迫",
  },
  {
    hanzi: "紧迫",
  },
  {
    hanzi: "迫不及待",
  },
  {
    hanzi: "迫害",
  },
  {
    hanzi: "迫使",
  },
  {
    hanzi: "遥控",
  },
  {
    hanzi: "遥远",
  },
  {
    hanzi: "剧团",
  },
  {
    hanzi: "社团",
  },
  {
    hanzi: "团伙",
  },
  {
    hanzi: "团聚",
  },
  {
    hanzi: "团员",
  },
  {
    hanzi: "团圆",
  },
  {
    hanzi: "淘",
  },
  {
    hanzi: "淘气",
  },
  {
    hanzi: "淘宝",
  },
  {
    hanzi: "开启",
  },
  {
    hanzi: "启示",
  },
  {
    hanzi: "淘汰",
  },
  {
    hanzi: "下一代",
  },
  {
    hanzi: "第一手",
  },
  {
    hanzi: "第一线",
  },
  {
    hanzi: "一一",
  },
  {
    hanzi: "天津",
  },
  {
    hanzi: "津津有味",
  },
  {
    hanzi: "津贴",
  },
  {
    hanzi: "万万",
  },
  {
    hanzi: "跟上",
  },
  {
    hanzi: "遇上",
  },
  {
    hanzi: "地下水",
  },
  {
    hanzi: "动荡",
  },
  {
    hanzi: "晃荡",
  },
  {
    hanzi: "空荡荡",
  },
  {
    hanzi: "倾家荡产",
  },
  {
    hanzi: "震荡",
  },
  {
    hanzi: "振荡",
  },
  {
    hanzi: "乡下",
  },
  {
    hanzi: "低下",
  },
  {
    hanzi: "倒下",
  },
  {
    hanzi: "当下",
  },
  {
    hanzi: "荡漾",
  },
  {
    hanzi: "眼下",
  },
  {
    hanzi: "落下",
  },
  {
    hanzi: "吃不上",
  },
  {
    hanzi: "比不上",
  },
  {
    hanzi: "光泽",
  },
  {
    hanzi: "毛泽东",
  },
  {
    hanzi: "江泽民",
  },
  {
    hanzi: "说不上",
  },
  {
    hanzi: "谈不上",
  },
  {
    hanzi: "跟不上",
  },
  {
    hanzi: "顾不上",
  },
  {
    hanzi: "沼泽",
  },
  {
    hanzi: "前不久",
  },
  {
    hanzi: "免不了",
  },
  {
    hanzi: "少不了",
  },
  {
    hanzi: "忘不了",
  },
  {
    hanzi: "涂",
  },
  {
    hanzi: "糊涂",
  },
  {
    hanzi: "涂料",
  },
  {
    hanzi: "禁不住",
  },
  {
    hanzi: "办不到",
  },
  {
    hanzi: "动不动",
  },
  {
    hanzi: "过不去",
  },
  {
    hanzi: "淋",
  },
  {
    hanzi: "冰淇淋/冰激凌",
  },
  {
    hanzi: "淋巴结",
  },
  {
    hanzi: "一不小心",
  },
  {
    hanzi: "供不应求",
  },
  {
    hanzi: "巴不得",
  },
  {
    hanzi: "怪不得",
  },
  {
    hanzi: "涌",
  },
  {
    hanzi: "涌入",
  },
  {
    hanzi: "涌现",
  },
  {
    hanzi: "涌动",
  },
  {
    hanzi: "顾不得",
  },
  {
    hanzi: "时不时",
  },
  {
    hanzi: "可不是",
  },
  {
    hanzi: "要不是",
  },
  {
    hanzi: "汹涌",
  },
  {
    hanzi: "买不起",
  },
  {
    hanzi: "无不",
  },
  {
    hanzi: "出丑",
  },
  {
    hanzi: "小丑",
  },
  {
    hanzi: "兹",
  },
  {
    hanzi: "况且",
  },
  {
    hanzi: "问世",
  },
  {
    hanzi: "失业率",
  },
  {
    hanzi: "职业病",
  },
  {
    hanzi: "滋润",
  },
  {
    hanzi: "滋味",
  },
  {
    hanzi: "美滋滋",
  },
  {
    hanzi: "从业",
  },
  {
    hanzi: "停业",
  },
  {
    hanzi: "学业",
  },
  {
    hanzi: "有两下子",
  },
  {
    hanzi: "磁带",
  },
  {
    hanzi: "磁卡",
  },
  {
    hanzi: "磁盘",
  },
  {
    hanzi: "电磁",
  },
  {
    hanzi: "一个劲儿",
  },
  {
    hanzi: "暗中",
  },
  {
    hanzi: "看中",
  },
  {
    hanzi: "来临",
  },
  {
    hanzi: "慈善",
  },
  {
    hanzi: "慈祥",
  },
  {
    hanzi: "降临",
  },
  {
    hanzi: "难为情",
  },
  {
    hanzi: "人为",
  },
  {
    hanzi: "定为",
  },
  {
    hanzi: "岩石",
  },
  {
    hanzi: "尤为",
  },
  {
    hanzi: "改为",
  },
  {
    hanzi: "出主意",
  },
  {
    hanzi: "天主教",
  },
  {
    hanzi: "癌",
  },
  {
    hanzi: "癌症",
  },
  {
    hanzi: "肺癌",
  },
  {
    hanzi: "肝癌",
  },
  {
    hanzi: "胃癌",
  },
  {
    hanzi: "亮丽",
  },
  {
    hanzi: "华丽",
  },
  {
    hanzi: "秀丽",
  },
  {
    hanzi: "一举",
  },
  {
    hanzi: "董事",
  },
  {
    hanzi: "董事会",
  },
  {
    hanzi: "董事长",
  },
  {
    hanzi: "古董",
  },
  {
    hanzi: "列举",
  },
  {
    hanzi: "持久",
  },
  {
    hanzi: "永久",
  },
  {
    hanzi: "定义",
  },
  {
    hanzi: "荷花",
  },
  {
    hanzi: "荷兰",
  },
  {
    hanzi: "广义",
  },
  {
    hanzi: "合乎",
  },
  {
    hanzi: "温习",
  },
  {
    hanzi: "演习",
  },
  {
    hanzi: "艾滋病",
  },
  {
    hanzi: "艾特",
  },
  {
    hanzi: "下乡",
  },
  {
    hanzi: "念书",
  },
  {
    hanzi: "收买",
  },
  {
    hanzi: "忙乱",
  },
  {
    hanzi: "哎",
  },
  {
    hanzi: "哎呀",
  },
  {
    hanzi: "吹了",
  },
  {
    hanzi: "不予",
  },
  {
    hanzi: "力争",
  },
  {
    hanzi: "抗争",
  },
  {
    hanzi: "萌",
  },
  {
    hanzi: "萌发",
  },
  {
    hanzi: "当事人",
  },
  {
    hanzi: "领事馆",
  },
  {
    hanzi: "人事",
  },
  {
    hanzi: "公事",
  },
  {
    hanzi: "萌芽",
  },
  {
    hanzi: "喜事",
  },
  {
    hanzi: "坏事",
  },
  {
    hanzi: "干事",
  },
  {
    hanzi: "往事",
  },
  {
    hanzi: "萧条",
  },
  {
    hanzi: "心事",
  },
  {
    hanzi: "懂事",
  },
  {
    hanzi: "理事",
  },
  {
    hanzi: "省事",
  },
  {
    hanzi: "潇洒",
  },
  {
    hanzi: "碍事",
  },
  {
    hanzi: "私事",
  },
  {
    hanzi: "领事",
  },
  {
    hanzi: "介于",
  },
  {
    hanzi: "粗鲁",
  },
  {
    hanzi: "勇于",
  },
  {
    hanzi: "急于",
  },
  {
    hanzi: "源于",
  },
  {
    hanzi: "限于",
  },
  {
    hanzi: "鲁莽",
  },
  {
    hanzi: "风云",
  },
  {
    hanzi: "不亚于",
  },
  {
    hanzi: "逃亡",
  },
  {
    hanzi: "立交桥",
  },
  {
    hanzi: "结晶",
  },
  {
    hanzi: "水晶",
  },
  {
    hanzi: "液晶",
  },
  {
    hanzi: "晶体",
  },
  {
    hanzi: "建交",
  },
  {
    hanzi: "杂交",
  },
  {
    hanzi: "社交",
  },
  {
    hanzi: "转交",
  },
  {
    hanzi: "晶莹",
  },
  {
    hanzi: "特产",
  },
  {
    hanzi: "报亭",
  },
  {
    hanzi: "响亮",
  },
  {
    hanzi: "乡亲",
  },
  {
    hanzi: "克隆",
  },
  {
    hanzi: "隆重",
  },
  {
    hanzi: "探亲",
  },
  {
    hanzi: "主人公",
  },
  {
    hanzi: "老人家",
  },
  {
    hanzi: "专人",
  },
  {
    hanzi: "郑重",
  },
  {
    hanzi: "为人",
  },
  {
    hanzi: "他人",
  },
  {
    hanzi: "传人",
  },
  {
    hanzi: "友人",
  },
  {
    hanzi: "浓郁",
  },
  {
    hanzi: "忧郁",
  },
  {
    hanzi: "郁闷",
  },
  {
    hanzi: "古人",
  },
  {
    hanzi: "同人",
  },
  {
    hanzi: "后人",
  },
  {
    hanzi: "小人",
  },
  {
    hanzi: "防疫",
  },
  {
    hanzi: "免疫",
  },
  {
    hanzi: "免疫力",
  },
  {
    hanzi: "疫情",
  },
  {
    hanzi: "检疫",
  },
  {
    hanzi: "摇篮",
  },
  {
    hanzi: "瘟疫",
  },
  {
    hanzi: "罢免",
  },
  {
    hanzi: "罢休",
  },
  {
    hanzi: "也罢",
  },
  {
    hanzi: "苗",
  },
  {
    hanzi: "禾苗",
  },
  {
    hanzi: "苗条",
  },
  {
    hanzi: "疫苗",
  },
  {
    hanzi: "苗头",
  },
  {
    hanzi: "摆设",
  },
  {
    hanzi: "摇摆",
  },
  {
    hanzi: "肿瘤",
  },
  {
    hanzi: "抵消",
  },
  {
    hanzi: "抵制",
  },
  {
    hanzi: "溜",
  },
  {
    hanzi: "溜达",
  },
  {
    hanzi: "随大溜",
  },
  {
    hanzi: "外援",
  },
  {
    hanzi: "遛",
  },
  {
    hanzi: "遛狗",
  },
  {
    hanzi: "搭乘",
  },
  {
    hanzi: "搭建",
  },
  {
    hanzi: "波涛",
  },
  {
    hanzi: "胡锦涛",
  },
  {
    hanzi: "忽高忽低",
  },
  {
    hanzi: "铸造",
  },
  {
    hanzi: "恩惠",
  },
  {
    hanzi: "范畴",
  },
  {
    hanzi: "坦白",
  },
  {
    hanzi: "坦诚",
  },
  {
    hanzi: "坦然",
  },
  {
    hanzi: "坦率",
  },
  {
    hanzi: "祈祷",
  },
  {
    hanzi: "甜头",
  },
  {
    hanzi: "甜美",
  },
  {
    hanzi: "盖子",
  },
  {
    hanzi: "就座",
  },
  {
    hanzi: "现成",
  },
  {
    hanzi: "筹",
  },
  {
    hanzi: "筹办",
  },
  {
    hanzi: "筹备",
  },
  {
    hanzi: "筹措",
  },
  {
    hanzi: "筹划",
  },
  {
    hanzi: "筹集",
  },
  {
    hanzi: "筹码",
  },
  {
    hanzi: "统筹",
  },
  {
    hanzi: "一筹莫展",
  },
  {
    hanzi: "胆子",
  },
  {
    hanzi: "筛",
  },
  {
    hanzi: "筛选",
  },
  {
    hanzi: "开朗",
  },
  {
    hanzi: "明朗",
  },
  {
    hanzi: "硬朗",
  },
  {
    hanzi: "狮子",
  },
  {
    hanzi: "心肠",
  },
  {
    hanzi: "屈服",
  },
  {
    hanzi: "委屈",
  },
  {
    hanzi: "报销",
  },
  {
    hanzi: "开销",
  },
  {
    hanzi: "眉毛",
  },
  {
    hanzi: "眉头",
  },
  {
    hanzi: "愁眉苦脸",
  },
  {
    hanzi: "眉开眼笑",
  },
  {
    hanzi: "交锋",
  },
  {
    hanzi: "针锋相对",
  },
  {
    hanzi: "尿",
  },
  {
    hanzi: "糖尿病",
  },
  {
    hanzi: "交涉",
  },
  {
    hanzi: "履行",
  },
  {
    hanzi: "漫游",
  },
  {
    hanzi: "覆盖",
  },
  {
    hanzi: "覆盖率",
  },
  {
    hanzi: "翻来覆去",
  },
  {
    hanzi: "翻天覆地",
  },
  {
    hanzi: "交替",
  },
  {
    hanzi: "接替",
  },
  {
    hanzi: "替换",
  },
  {
    hanzi: "替身",
  },
  {
    hanzi: "腹部",
  },
  {
    hanzi: "腹痛",
  },
  {
    hanzi: "潜移默化",
  },
  {
    hanzi: "潜能",
  },
  {
    hanzi: "潜意识",
  },
  {
    hanzi: "腺",
  },
  {
    hanzi: "甲状腺",
  },
  {
    hanzi: "前列腺",
  },
  {
    hanzi: "乳腺",
  },
  {
    hanzi: "乳腺癌",
  },
  {
    hanzi: "纯洁",
  },
  {
    hanzi: "简洁",
  },
  {
    hanzi: "洁净",
  },
  {
    hanzi: "整洁",
  },
  {
    hanzi: "胎",
  },
  {
    hanzi: "胎儿",
  },
  {
    hanzi: "轮胎",
  },
  {
    hanzi: "双胞胎",
  },
  {
    hanzi: "浓厚",
  },
  {
    hanzi: "浓缩",
  },
  {
    hanzi: "浓重",
  },
  {
    hanzi: "胚胎",
  },
  {
    hanzi: "海岸",
  },
  {
    hanzi: "腔",
  },
  {
    hanzi: "腹腔",
  },
  {
    hanzi: "口腔",
  },
  {
    hanzi: "半途而废",
  },
  {
    hanzi: "报废",
  },
  {
    hanzi: "废除",
  },
  {
    hanzi: "废品",
  },
  {
    hanzi: "肾",
  },
  {
    hanzi: "肾脏",
  },
  {
    hanzi: "触动",
  },
  {
    hanzi: "触犯",
  },
  {
    hanzi: "触觉",
  },
  {
    hanzi: "触目惊心",
  },
  {
    hanzi: "抵触",
  },
  {
    hanzi: "感触",
  },
  {
    hanzi: "旨在",
  },
  {
    hanzi: "宗旨",
  },
  {
    hanzi: "珍藏",
  },
  {
    hanzi: "珍视",
  },
  {
    hanzi: "珍重",
  },
  {
    hanzi: "脂肪",
  },
  {
    hanzi: "从今以后",
  },
  {
    hanzi: "滑稽",
  },
  {
    hanzi: "稽查",
  },
  {
    hanzi: "祖传",
  },
  {
    hanzi: "祖先",
  },
  {
    hanzi: "祖宗",
  },
  {
    hanzi: "黎明",
  },
  {
    hanzi: "巴黎",
  },
  {
    hanzi: "常人",
  },
  {
    hanzi: "情人",
  },
  {
    hanzi: "文人",
  },
  {
    hanzi: "用人",
  },
  {
    hanzi: "稀",
  },
  {
    hanzi: "稀奇",
  },
  {
    hanzi: "稀少",
  },
  {
    hanzi: "稀缺",
  },
  {
    hanzi: "能人",
  },
  {
    hanzi: "证人",
  },
  {
    hanzi: "路人",
  },
  {
    hanzi: "引诱",
  },
  {
    hanzi: "诱发",
  },
  {
    hanzi: "诱人",
  },
  {
    hanzi: "当今",
  },
  {
    hanzi: "听从",
  },
  {
    hanzi: "顺从",
  },
  {
    hanzi: "吉他",
  },
  {
    hanzi: "诱饵",
  },
  {
    hanzi: "交付",
  },
  {
    hanzi: "托付",
  },
  {
    hanzi: "世代",
  },
  {
    hanzi: "取代",
  },
  {
    hanzi: "盈利",
  },
  {
    hanzi: "后代",
  },
  {
    hanzi: "朝代",
  },
  {
    hanzi: "夏令营",
  },
  {
    hanzi: "下令",
  },
  {
    hanzi: "怀孕",
  },
  {
    hanzi: "孕妇",
  },
  {
    hanzi: "孕育",
  },
  {
    hanzi: "口令",
  },
  {
    hanzi: "司令",
  },
  {
    hanzi: "指令",
  },
  {
    hanzi: "难以想象",
  },
  {
    hanzi: "魂",
  },
  {
    hanzi: "灵魂",
  },
  {
    hanzi: "信件",
  },
  {
    hanzi: "配件",
  },
  {
    hanzi: "零件",
  },
  {
    hanzi: "性价比",
  },
  {
    hanzi: "坛",
  },
  {
    hanzi: "论坛",
  },
  {
    hanzi: "讨价还价",
  },
  {
    hanzi: "低价",
  },
  {
    hanzi: "平价",
  },
  {
    hanzi: "身价",
  },
  {
    hanzi: "灰尘",
  },
  {
    hanzi: "沙尘",
  },
  {
    hanzi: "造价",
  },
  {
    hanzi: "上任",
  },
  {
    hanzi: "兼任",
  },
  {
    hanzi: "出任",
  },
  {
    hanzi: "城堡",
  },
  {
    hanzi: "汉堡",
  },
  {
    hanzi: "前任",
  },
  {
    hanzi: "就任",
  },
  {
    hanzi: "现任",
  },
  {
    hanzi: "聘任",
  },
  {
    hanzi: "堡垒",
  },
  {
    hanzi: "壁垒",
  },
  {
    hanzi: "胜任",
  },
  {
    hanzi: "连任",
  },
  {
    hanzi: "重任",
  },
  {
    hanzi: "外企",
  },
  {
    hanzi: "杜绝",
  },
  {
    hanzi: "退休金",
  },
  {
    hanzi: "出众",
  },
  {
    hanzi: "当众",
  },
  {
    hanzi: "同伙",
  },
  {
    hanzi: "驱动",
  },
  {
    hanzi: "驱逐",
  },
  {
    hanzi: "工会",
  },
  {
    hanzi: "拜会",
  },
  {
    hanzi: "理会",
  },
  {
    hanzi: "盛会",
  },
  {
    hanzi: "呕吐",
  },
  {
    hanzi: "议会",
  },
  {
    hanzi: "都会",
  },
  {
    hanzi: "集会",
  },
  {
    hanzi: "领会",
  },
  {
    hanzi: "殴打",
  },
  {
    hanzi: "跳伞",
  },
  {
    hanzi: "失传",
  },
  {
    hanzi: "相传",
  },
  {
    hanzi: "创伤",
  },
  {
    hanzi: "身躯",
  },
  {
    hanzi: "重伤",
  },
  {
    hanzi: "老伴儿",
  },
  {
    hanzi: "同伴",
  },
  {
    hanzi: "相伴",
  },
  {
    hanzi: "枢纽",
  },
  {
    hanzi: "看似",
  },
  {
    hanzi: "酷似",
  },
  {
    hanzi: "价位",
  },
  {
    hanzi: "到位",
  },
  {
    hanzi: "抠",
  },
  {
    hanzi: "抠门儿",
  },
  {
    hanzi: "品位",
  },
  {
    hanzi: "席位",
  },
  {
    hanzi: "床位",
  },
  {
    hanzi: "换位",
  },
  {
    hanzi: "压抑",
  },
  {
    hanzi: "抑郁",
  },
  {
    hanzi: "抑郁症",
  },
  {
    hanzi: "抑制",
  },
  {
    hanzi: "穴位",
  },
  {
    hanzi: "车位",
  },
  {
    hanzi: "错位",
  },
  {
    hanzi: "高低",
  },
  {
    hanzi: "拟",
  },
  {
    hanzi: "模拟",
  },
  {
    hanzi: "拟定",
  },
  {
    hanzi: "虚拟",
  },
  {
    hanzi: "大体上",
  },
  {
    hanzi: "简体字",
  },
  {
    hanzi: "一体",
  },
  {
    hanzi: "人体",
  },
  {
    hanzi: "快捷",
  },
  {
    hanzi: "便捷",
  },
  {
    hanzi: "敏捷",
  },
  {
    hanzi: "大体",
  },
  {
    hanzi: "字体",
  },
  {
    hanzi: "实体",
  },
  {
    hanzi: "尸体",
  },
  {
    hanzi: "得体",
  },
  {
    hanzi: "物体",
  },
  {
    hanzi: "立体",
  },
  {
    hanzi: "解体",
  },
  {
    hanzi: "神仙",
  },
  {
    hanzi: "仙女",
  },
  {
    hanzi: "灵感",
  },
  {
    hanzi: "见仁见智",
  },
  {
    hanzi: "仁慈",
  },
  {
    hanzi: "繁华",
  },
  {
    hanzi: "繁忙",
  },
  {
    hanzi: "繁体字",
  },
  {
    hanzi: "繁重",
  },
  {
    hanzi: "俄罗斯",
  },
  {
    hanzi: "俄语",
  },
  {
    hanzi: "紫外线",
  },
  {
    hanzi: "阿拉伯语",
  },
  {
    hanzi: "伯伯",
  },
  {
    hanzi: "伯父",
  },
  {
    hanzi: "伯母",
  },
  {
    hanzi: "说闲话",
  },
  {
    hanzi: "起伏",
  },
  {
    hanzi: "此起彼伏",
  },
  {
    hanzi: "埋伏",
  },
  {
    hanzi: "横向",
  },
  {
    hanzi: "敬佩",
  },
  {
    hanzi: "佩服",
  },
  {
    hanzi: "放纵",
  },
  {
    hanzi: "纵观",
  },
  {
    hanzi: "纵然",
  },
  {
    hanzi: "纵容",
  },
  {
    hanzi: "纵深",
  },
  {
    hanzi: "纵恨交错",
  },
  {
    hanzi: "步伐",
  },
  {
    hanzi: "杆菌",
  },
  {
    hanzi: "侦查",
  },
  {
    hanzi: "侦察",
  },
  {
    hanzi: "侦破",
  },
  {
    hanzi: "刊登",
  },
  {
    hanzi: "刊物",
  },
  {
    hanzi: "赴",
  },
  {
    hanzi: "奔赴",
  },
  {
    hanzi: "赶赴",
  },
  {
    hanzi: "前赴后继",
  },
  {
    hanzi: "全力以赴",
  },
  {
    hanzi: "可谓",
  },
  {
    hanzi: "贪",
  },
  {
    hanzi: "贪玩儿",
  },
  {
    hanzi: "贪污",
  },
  {
    hanzi: "诞辰",
  },
  {
    hanzi: "俊",
  },
  {
    hanzi: "英俊",
  },
  {
    hanzi: "诸多",
  },
  {
    hanzi: "诸如此类",
  },
  {
    hanzi: "严峻",
  },
  {
    hanzi: "奔波",
  },
  {
    hanzi: "东奔西走",
  },
  {
    hanzi: "各奔前程",
  },
  {
    hanzi: "投奔",
  },
  {
    hanzi: "直奔",
  },
  {
    hanzi: "骏马",
  },
  {
    hanzi: "顶尖",
  },
  {
    hanzi: "尖端",
  },
  {
    hanzi: "竣工",
  },
  {
    hanzi: "夸夸其谈",
  },
  {
    hanzi: "毅力",
  },
  {
    hanzi: "毅然",
  },
  {
    hanzi: "跨国",
  },
  {
    hanzi: "跨越",
  },
  {
    hanzi: "粒",
  },
  {
    hanzi: "颗粒",
  },
  {
    hanzi: "回扣",
  },
  {
    hanzi: "扣除",
  },
  {
    hanzi: "扣留",
  },
  {
    hanzi: "折扣",
  },
  {
    hanzi: "粘",
  },
  {
    hanzi: "粘贴",
  },
  {
    hanzi: "冲撞",
  },
  {
    hanzi: "碰撞",
  },
  {
    hanzi: "撞击",
  },
  {
    hanzi: "退役",
  },
  {
    hanzi: "战役",
  },
  {
    hanzi: "触摸",
  },
  {
    hanzi: "摸索",
  },
  {
    hanzi: "徐徐",
  },
  {
    hanzi: "海拔",
  },
  {
    hanzi: "提拔",
  },
  {
    hanzi: "一毛不拔",
  },
  {
    hanzi: "瑞雪",
  },
  {
    hanzi: "瑞士",
  },
  {
    hanzi: "瑞典",
  },
  {
    hanzi: "振奋",
  },
  {
    hanzi: "振兴",
  },
  {
    hanzi: "振作",
  },
  {
    hanzi: "斑点",
  },
  {
    hanzi: "拖累",
  },
  {
    hanzi: "拖欠",
  },
  {
    hanzi: "拖延",
  },
  {
    hanzi: "拖拉机",
  },
  {
    hanzi: "呈现",
  },
  {
    hanzi: "拼命",
  },
  {
    hanzi: "呵护",
  },
  {
    hanzi: "呵呵",
  },
  {
    hanzi: "浮力",
  },
  {
    hanzi: "浮现",
  },
  {
    hanzi: "嘿",
  },
  {
    hanzi: "嘿嘿",
  },
  {
    hanzi: "泥土",
  },
  {
    hanzi: "衰减",
  },
  {
    hanzi: "衰老",
  },
  {
    hanzi: "衰弱",
  },
  {
    hanzi: "衰退",
  },
  {
    hanzi: "湿度",
  },
  {
    hanzi: "湿润",
  },
  {
    hanzi: "胶囊",
  },
  {
    hanzi: "前沿",
  },
  {
    hanzi: "沿岸",
  },
  {
    hanzi: "沿途",
  },
  {
    hanzi: "沿线",
  },
  {
    hanzi: "不堪",
  },
  {
    hanzi: "堪称",
  },
  {
    hanzi: "难堪",
  },
  {
    hanzi: "气泡",
  },
  {
    hanzi: "凌晨",
  },
  {
    hanzi: "盛气凌人",
  },
  {
    hanzi: "凌乱",
  },
  {
    hanzi: "马后炮",
  },
  {
    hanzi: "炮弹",
  },
  {
    hanzi: "丘陵",
  },
  {
    hanzi: "灰心",
  },
  {
    hanzi: "棱角",
  },
  {
    hanzi: "乱七八糟",
  },
  {
    hanzi: "温柔",
  },
  {
    hanzi: "柔软",
  },
  {
    hanzi: "柔和",
  },
  {
    hanzi: "非凡",
  },
  {
    hanzi: "凡事",
  },
  {
    hanzi: "凡人",
  },
  {
    hanzi: "棋子",
  },
  {
    hanzi: "下棋",
  },
  {
    hanzi: "围棋",
  },
  {
    hanzi: "载体",
  },
  {
    hanzi: "遗体",
  },
  {
    hanzi: "多余",
  },
  {
    hanzi: "所作所为",
  },
  {
    hanzi: "棍",
  },
  {
    hanzi: "冰棍儿",
  },
  {
    hanzi: "棍子",
  },
  {
    hanzi: "农作物",
  },
  {
    hanzi: "副作用",
  },
  {
    hanzi: "合作社",
  },
  {
    hanzi: "工作量",
  },
  {
    hanzi: "豆浆",
  },
  {
    hanzi: "血浆",
  },
  {
    hanzi: "协作",
  },
  {
    hanzi: "发作",
  },
  {
    hanzi: "称作",
  },
  {
    hanzi: "假使",
  },
  {
    hanzi: "鳞",
  },
  {
    hanzi: "鱼鳞",
  },
  {
    hanzi: "天使",
  },
  {
    hanzi: "致使",
  },
  {
    hanzi: "行使",
  },
  {
    hanzi: "举例",
  },
  {
    hanzi: "磷",
  },
  {
    hanzi: "先例",
  },
  {
    hanzi: "照例",
  },
  {
    hanzi: "特例",
  },
  {
    hanzi: "督促",
  },
  {
    hanzi: "瞬间",
  },
  {
    hanzi: "一瞬间",
  },
  {
    hanzi: "自信心",
  },
  {
    hanzi: "互信",
  },
  {
    hanzi: "可信",
  },
  {
    hanzi: "坚信",
  },
  {
    hanzi: "面红耳赤",
  },
  {
    hanzi: "赤字",
  },
  {
    hanzi: "赤裸裸",
  },
  {
    hanzi: "威信",
  },
  {
    hanzi: "深信",
  },
  {
    hanzi: "电信",
  },
  {
    hanzi: "确信",
  },
  {
    hanzi: "赫然",
  },
  {
    hanzi: "显赫",
  },
  {
    hanzi: "保修",
  },
  {
    hanzi: "进修",
  },
  {
    hanzi: "压倒",
  },
  {
    hanzi: "反倒",
  },
  {
    hanzi: "岂不",
  },
  {
    hanzi: "岂有此理",
  },
  {
    hanzi: "打倒",
  },
  {
    hanzi: "守候",
  },
  {
    hanzi: "火候",
  },
  {
    hanzi: "稍候",
  },
  {
    hanzi: "凯歌",
  },
  {
    hanzi: "价值观",
  },
  {
    hanzi: "产值",
  },
  {
    hanzi: "度假",
  },
  {
    hanzi: "真假",
  },
  {
    hanzi: "凤凰",
  },
  {
    hanzi: "造假",
  },
  {
    hanzi: "定做",
  },
  {
    hanzi: "稳健",
  },
  {
    hanzi: "木偶",
  },
  {
    hanzi: "讽刺",
  },
  {
    hanzi: "配偶",
  },
  {
    hanzi: "无偿",
  },
  {
    hanzi: "图像",
  },
  {
    hanzi: "影像",
  },
  {
    hanzi: "飙升",
  },
  {
    hanzi: "多元",
  },
  {
    hanzi: "状元",
  },
  {
    hanzi: "冒充",
  },
  {
    hanzi: "填充",
  },
  {
    hanzi: "飓风",
  },
  {
    hanzi: "预兆",
  },
  {
    hanzi: "预先",
  },
  {
    hanzi: "争光",
  },
  {
    hanzi: "发光",
  },
  {
    hanzi: "飘",
  },
  {
    hanzi: "飘飘",
  },
  {
    hanzi: "激光",
  },
  {
    hanzi: "耳光",
  },
  {
    hanzi: "休克",
  },
  {
    hanzi: "以免",
  },
  {
    hanzi: "减免",
  },
  {
    hanzi: "幸免",
  },
  {
    hanzi: "未免",
  },
  {
    hanzi: "介入",
  },
  {
    hanzi: "混凝土",
  },
  {
    hanzi: "凝固",
  },
  {
    hanzi: "凝聚",
  },
  {
    hanzi: "凝聚力",
  },
  {
    hanzi: "凝视",
  },
  {
    hanzi: "店铺",
  },
  {
    hanzi: "铺路",
  },
  {
    hanzi: "姿势",
  },
  {
    hanzi: "姿态",
  },
  {
    hanzi: "封锁",
  },
  {
    hanzi: "拉锁",
  },
  {
    hanzi: "连锁",
  },
  {
    hanzi: "连锁店",
  },
  {
    hanzi: "锁定",
  },
  {
    hanzi: "钦佩",
  },
  {
    hanzi: "观赏",
  },
  {
    hanzi: "尖锐",
  },
  {
    hanzi: "敏锐",
  },
  {
    hanzi: "算账",
  },
  {
    hanzi: "账单",
  },
  {
    hanzi: "账号",
  },
  {
    hanzi: "结账",
  },
  {
    hanzi: "保姆",
  },
  {
    hanzi: "贺电",
  },
  {
    hanzi: "贺信",
  },
  {
    hanzi: "庆贺",
  },
  {
    hanzi: "化妆",
  },
  {
    hanzi: "化妆品",
  },
  {
    hanzi: "驾车",
  },
  {
    hanzi: "嫩",
  },
  {
    hanzi: "壁画",
  },
  {
    hanzi: "戈壁",
  },
  {
    hanzi: "牧场",
  },
  {
    hanzi: "牧民",
  },
  {
    hanzi: "后勤",
  },
  {
    hanzi: "勤快",
  },
  {
    hanzi: "勤劳",
  },
  {
    hanzi: "辛勤",
  },
  {
    hanzi: "迈",
  },
  {
    hanzi: "迈进",
  },
  {
    hanzi: "迈出",
  },
  {
    hanzi: "年迈",
  },
  {
    hanzi: "启蒙",
  },
  {
    hanzi: "逢",
  },
  {
    hanzi: "每逢",
  },
  {
    hanzi: "富豪",
  },
  {
    hanzi: "豪华",
  },
  {
    hanzi: "缝",
  },
  {
    hanzi: "缝合",
  },
  {
    hanzi: "裂缝",
  },
  {
    hanzi: "毫不",
  },
  {
    hanzi: "毫无",
  },
  {
    hanzi: "丝毫",
  },
  {
    hanzi: "缤纷",
  },
  {
    hanzi: "结尾",
  },
  {
    hanzi: "尾气",
  },
  {
    hanzi: "尾声",
  },
  {
    hanzi: "追尾",
  },
  {
    hanzi: "滨海",
  },
  {
    hanzi: "海滨",
  },
  {
    hanzi: "哈尔滨",
  },
  {
    hanzi: "耗费",
  },
  {
    hanzi: "耗时",
  },
  {
    hanzi: "能耗",
  },
  {
    hanzi: "泄",
  },
  {
    hanzi: "发泄",
  },
  {
    hanzi: "泄漏",
  },
  {
    hanzi: "泄露",
  },
  {
    hanzi: "泄密",
  },
  {
    hanzi: "泄气",
  },
  {
    hanzi: "宣泄",
  },
  {
    hanzi: "口径",
  },
  {
    hanzi: "直径",
  },
  {
    hanzi: "抽屉",
  },
  {
    hanzi: "均衡",
  },
  {
    hanzi: "抗衡",
  },
  {
    hanzi: "权衡",
  },
  {
    hanzi: "浴室",
  },
  {
    hanzi: "歹徒",
  },
  {
    hanzi: "徒步",
  },
  {
    hanzi: "溶解",
  },
  {
    hanzi: "溶液",
  },
  {
    hanzi: "趋于",
  },
  {
    hanzi: "日趋",
  },
  {
    hanzi: "呼和浩特",
  },
  {
    hanzi: "逼近",
  },
  {
    hanzi: "逼迫",
  },
  {
    hanzi: "逼真",
  },
  {
    hanzi: "粗糙",
  },
  {
    hanzi: "重返",
  },
  {
    hanzi: "返还",
  },
  {
    hanzi: "往返",
  },
  {
    hanzi: "高雅",
  },
  {
    hanzi: "文雅",
  },
  {
    hanzi: "优雅",
  },
  {
    hanzi: "猛烈",
  },
  {
    hanzi: "猛然",
  },
  {
    hanzi: "凶猛",
  },
  {
    hanzi: "灌",
  },
  {
    hanzi: "灌输",
  },
  {
    hanzi: "礼仪",
  },
  {
    hanzi: "仪表",
  },
  {
    hanzi: "罐",
  },
  {
    hanzi: "罐头",
  },
  {
    hanzi: "易拉罐",
  },
  {
    hanzi: "民俗",
  },
  {
    hanzi: "俗话",
  },
  {
    hanzi: "俗语",
  },
  {
    hanzi: "通俗",
  },
  {
    hanzi: "习俗",
  },
  {
    hanzi: "约定俗成",
  },
  {
    hanzi: "开拓",
  },
  {
    hanzi: "拓宽",
  },
  {
    hanzi: "拓展",
  },
  {
    hanzi: "面面俱到",
  },
  {
    hanzi: "一应俱全",
  },
  {
    hanzi: "与日俱增",
  },
  {
    hanzi: "一日俱进",
  },
  {
    hanzi: "抚摸",
  },
  {
    hanzi: "安抚",
  },
  {
    hanzi: "抚养",
  },
  {
    hanzi: "抚养费",
  },
  {
    hanzi: "傻瓜",
  },
  {
    hanzi: "傻逼",
  },
  {
    hanzi: "撒",
  },
  {
    hanzi: "撒谎",
  },
  {
    hanzi: "精妙",
  },
  {
    hanzi: "美妙",
  },
  {
    hanzi: "微妙",
  },
  {
    hanzi: "莫名其妙",
  },
  {
    hanzi: "携带",
  },
  {
    hanzi: "携手",
  },
  {
    hanzi: "发愤图强",
  },
  {
    hanzi: "摊",
  },
  {
    hanzi: "摊位",
  },
  {
    hanzi: "气愤",
  },
  {
    hanzi: "抛",
  },
  {
    hanzi: "抛开",
  },
  {
    hanzi: "抛弃",
  },
  {
    hanzi: "打磨",
  },
  {
    hanzi: "磨合",
  },
  {
    hanzi: "磨难",
  },
  {
    hanzi: "磨损",
  },
  {
    hanzi: "折磨",
  },
  {
    hanzi: "劫",
  },
  {
    hanzi: "浩劫",
  },
  {
    hanzi: "劫持",
  },
  {
    hanzi: "抢劫",
  },
  {
    hanzi: "搞鬼",
  },
  {
    hanzi: "恶劣",
  },
  {
    hanzi: "劣势",
  },
  {
    hanzi: "劣质",
  },
  {
    hanzi: "优胜劣汰",
  },
  {
    hanzi: "唯独",
  },
  {
    hanzi: "勒索",
  },
  {
    hanzi: "燃放",
  },
  {
    hanzi: "燃气",
  },
  {
    hanzi: "燃油",
  },
  {
    hanzi: "霸占",
  },
  {
    hanzi: "霸气",
  },
  {
    hanzi: "霸王",
  },
  {
    hanzi: "霸道",
  },
  {
    hanzi: "霸权",
  },
  {
    hanzi: "腐败",
  },
  {
    hanzi: "腐化",
  },
  {
    hanzi: "蓬勃",
  },
  {
    hanzi: "潮气蓬勃",
  },
  {
    hanzi: "蓬勃发展",
  },
  {
    hanzi: "勃起",
  },
  {
    hanzi: "宏观",
  },
  {
    hanzi: "宏伟",
  },
  {
    hanzi: "脖子",
  },
  {
    hanzi: "前辈",
  },
  {
    hanzi: "长辈",
  },
  {
    hanzi: "鹏程万里",
  },
  {
    hanzi: "卷入",
  },
  {
    hanzi: "引入",
  },
  {
    hanzi: "步入",
  },
  {
    hanzi: "注入",
  },
  {
    hanzi: "共鸣",
  },
  {
    hanzi: "流入",
  },
  {
    hanzi: "公共场所",
  },
  {
    hanzi: "公关",
  },
  {
    hanzi: "把关",
  },
  {
    hanzi: "割",
  },
  {
    hanzi: "分割",
  },
  {
    hanzi: "切割",
  },
  {
    hanzi: "任人宰割",
  },
  {
    hanzi: "攻关",
  },
  {
    hanzi: "过关",
  },
  {
    hanzi: "难关",
  },
  {
    hanzi: "复兴",
  },
  {
    hanzi: "管辖",
  },
  {
    hanzi: "直辖市",
  },
  {
    hanzi: "扫兴",
  },
  {
    hanzi: "官兵",
  },
  {
    hanzi: "及其",
  },
  {
    hanzi: "出具",
  },
  {
    hanzi: "豁",
  },
  {
    hanzi: "豁出去",
  },
  {
    hanzi: "豁达",
  },
  {
    hanzi: "文具",
  },
  {
    hanzi: "道具",
  },
  {
    hanzi: "庆典",
  },
  {
    hanzi: "休养",
  },
  {
    hanzi: "瞎",
  },
  {
    hanzi: "教养",
  },
  {
    hanzi: "素养",
  },
  {
    hanzi: "领养",
  },
  {
    hanzi: "海内外",
  },
  {
    hanzi: "愈合",
  },
  {
    hanzi: "愈来愈",
  },
  {
    hanzi: "愈演愈烈",
  },
  {
    hanzi: "治愈",
  },
  {
    hanzi: "书写",
  },
  {
    hanzi: "编写",
  },
  {
    hanzi: "参军",
  },
  {
    hanzi: "领军",
  },
  {
    hanzi: "忽悠",
  },
  {
    hanzi: "悠久",
  },
  {
    hanzi: "悠闲",
  },
  {
    hanzi: "转悠",
  },
  {
    hanzi: "夺冠",
  },
  {
    hanzi: "结冰",
  },
  {
    hanzi: "取决于",
  },
  {
    hanzi: "下决心",
  },
  {
    hanzi: "困惑",
  },
  {
    hanzi: "迷惑",
  },
  {
    hanzi: "迷惑不解",
  },
  {
    hanzi: "疑惑",
  },
  {
    hanzi: "诱惑",
  },
  {
    hanzi: "否决",
  },
  {
    hanzi: "表决",
  },
  {
    hanzi: "裁决",
  },
  {
    hanzi: "何况",
  },
  {
    hanzi: "飞翔",
  },
  {
    hanzi: "实况",
  },
  {
    hanzi: "概况",
  },
  {
    hanzi: "路况",
  },
  {
    hanzi: "泼冷水",
  },
  {
    hanzi: "不翼而飞",
  },
  {
    hanzi: "小心翼翼",
  },
  {
    hanzi: "爆冷门",
  },
  {
    hanzi: "没准儿",
  },
  {
    hanzi: "不准",
  },
  {
    hanzi: "基准",
  },
  {
    hanzi: "恭喜",
  },
  {
    hanzi: "恭维",
  },
  {
    hanzi: "对准",
  },
  {
    hanzi: "水准",
  },
  {
    hanzi: "进出口",
  },
  {
    hanzi: "展出",
  },
  {
    hanzi: "谱",
  },
  {
    hanzi: "离谱儿",
  },
  {
    hanzi: "胜出",
  },
  {
    hanzi: "进出",
  },
  {
    hanzi: "点击率",
  },
  {
    hanzi: "反击",
  },
  {
    hanzi: "边疆",
  },
  {
    hanzi: "新疆",
  },
  {
    hanzi: "插手",
  },
  {
    hanzi: "插图",
  },
  {
    hanzi: "插嘴",
  },
  {
    hanzi: "僵",
  },
  {
    hanzi: "僵化",
  },
  {
    hanzi: "僵局",
  },
  {
    hanzi: "僵尸",
  },
  {
    hanzi: "烧毁",
  },
  {
    hanzi: "销毁",
  },
  {
    hanzi: "毁坏",
  },
  {
    hanzi: "仇",
  },
  {
    hanzi: "报仇",
  },
  {
    hanzi: "仇恨",
  },
  {
    hanzi: "仇人",
  },
  {
    hanzi: "复仇",
  },
  {
    hanzi: "翻番",
  },
  {
    hanzi: "三番五次",
  },
  {
    hanzi: "催",
  },
  {
    hanzi: "催促",
  },
  {
    hanzi: "催眠",
  },
  {
    hanzi: "投稿",
  },
  {
    hanzi: "稿件",
  },
  {
    hanzi: "草稿",
  },
  {
    hanzi: "霍乱",
  },
  {
    hanzi: "挥霍",
  },
  {
    hanzi: "飞跃",
  },
  {
    hanzi: "跳跃",
  },
  {
    hanzi: "倒霉",
  },
  {
    hanzi: "青霉素",
  },
  {
    hanzi: "画册",
  },
  {
    hanzi: "手册",
  },
  {
    hanzi: "相册",
  },
  {
    hanzi: "雾",
  },
  {
    hanzi: "烟雾",
  },
  {
    hanzi: "上岗",
  },
  {
    hanzi: "下岗",
  },
  {
    hanzi: "勋章",
  },
  {
    hanzi: "麻醉",
  },
  {
    hanzi: "筋",
  },
  {
    hanzi: "脑筋",
  },
  {
    hanzi: "伤脑筋",
  },
  {
    hanzi: "钢筋",
  },
  {
    hanzi: "抽筋",
  },
  {
    hanzi: "纳粹",
  },
  {
    hanzi: "胀",
  },
  {
    hanzi: "通胀",
  },
  {
    hanzi: "含糊",
  },
  {
    hanzi: "手臂",
  },
  {
    hanzi: "游览",
  },
  {
    hanzi: "不慎",
  },
  {
    hanzi: "慎重",
  },
  {
    hanzi: "鉴别",
  },
  {
    hanzi: "鉴赏",
  },
  {
    hanzi: "鉴于",
  },
  {
    hanzi: "喜悦",
  },
  {
    hanzi: "悦耳",
  },
  {
    hanzi: "愉悦",
  },
  {
    hanzi: "祸害",
  },
  {
    hanzi: "永恒",
  },
  {
    hanzi: "持之以恒",
  },
  {
    hanzi: "养殖",
  },
  {
    hanzi: "昆虫",
  },
  {
    hanzi: "昆明",
  },
  {
    hanzi: "断裂",
  },
  {
    hanzi: "破裂",
  },
  {
    hanzi: "晋升",
  },
  {
    hanzi: "晋级",
  },
  {
    hanzi: "滚动",
  },
  {
    hanzi: "连滚带爬",
  },
  {
    hanzi: "摇滚",
  },
  {
    hanzi: "摇滚乐",
  },
  {
    hanzi: "昂贵",
  },
  {
    hanzi: "高昂",
  },
  {
    hanzi: "民事诉讼",
  },
  {
    hanzi: "行政诉讼",
  },
  {
    hanzi: "刑事诉讼",
  },
  {
    hanzi: "上旬",
  },
  {
    hanzi: "中旬",
  },
  {
    hanzi: "下旬",
  },
  {
    hanzi: "感叹",
  },
  {
    hanzi: "惊叹",
  },
  {
    hanzi: "赞叹",
  },
  {
    hanzi: "赞叹不已",
  },
  {
    hanzi: "叹息",
  },
  {
    hanzi: "陶醉",
  },
  {
    hanzi: "涉嫌",
  },
  {
    hanzi: "嫌弃",
  },
  {
    hanzi: "嫌疑",
  },
  {
    hanzi: "嫌疑人",
  },
  {
    hanzi: "邪",
  },
  {
    hanzi: "邪恶",
  },
  {
    hanzi: "改邪归正",
  },
  {
    hanzi: "伴奏",
  },
  {
    hanzi: "奏效",
  },
  {
    hanzi: "贩卖",
  },
  {
    hanzi: "商贩",
  },
  {
    hanzi: "小贩",
  },
  {
    hanzi: "健壮",
  },
  {
    hanzi: "理直气壮",
  },
  {
    hanzi: "壮大",
  },
  {
    hanzi: "壮胆",
  },
  {
    hanzi: "壮丽",
  },
  {
    hanzi: "壮实",
  },
  {
    hanzi: "圣贤",
  },
  {
    hanzi: "嘉年华",
  },
  {
    hanzi: "贼",
  },
  {
    hanzi: "牵挂",
  },
  {
    hanzi: "牵涉",
  },
  {
    hanzi: "牵头",
  },
  {
    hanzi: "牵制",
  },
  {
    hanzi: "牵引",
  },
  {
    hanzi: "婴儿",
  },
  {
    hanzi: "倾诉",
  },
  {
    hanzi: "倾听",
  },
  {
    hanzi: "倾销",
  },
  {
    hanzi: "嫁",
  },
  {
    hanzi: "嫁妆",
  },
  {
    hanzi: "突击",
  },
  {
    hanzi: "百分比",
  },
  {
    hanzi: "万分",
  },
  {
    hanzi: "天分",
  },
  {
    hanzi: "妥",
  },
  {
    hanzi: "妥当",
  },
  {
    hanzi: "妥善",
  },
  {
    hanzi: "妥协",
  },
  {
    hanzi: "稳妥",
  },
  {
    hanzi: "本分",
  },
  {
    hanzi: "瓜分",
  },
  {
    hanzi: "深切",
  },
  {
    hanzi: "确切",
  },
  {
    hanzi: "娇惯",
  },
  {
    hanzi: "娇气",
  },
  {
    hanzi: "撒娇",
  },
  {
    hanzi: "贴切",
  },
  {
    hanzi: "并列",
  },
  {
    hanzi: "行列",
  },
  {
    hanzi: "陈列",
  },
  {
    hanzi: "妖怪",
  },
  {
    hanzi: "准则",
  },
  {
    hanzi: "原创",
  },
  {
    hanzi: "重创",
  },
  {
    hanzi: "首创",
  },
  {
    hanzi: "肥沃",
  },
  {
    hanzi: "月初",
  },
  {
    hanzi: "起初",
  },
  {
    hanzi: "审判",
  },
  {
    hanzi: "批判",
  },
  {
    hanzi: "渔船",
  },
  {
    hanzi: "渔民",
  },
  {
    hanzi: "渔业",
  },
  {
    hanzi: "评判",
  },
  {
    hanzi: "便利店",
  },
  {
    hanzi: "名利",
  },
  {
    hanzi: "失利",
  },
  {
    hanzi: "滞后",
  },
  {
    hanzi: "滞留",
  },
  {
    hanzi: "水利",
  },
  {
    hanzi: "错别字",
  },
  {
    hanzi: "派别",
  },
  {
    hanzi: "类别",
  },
  {
    hanzi: "沉浸",
  },
  {
    hanzi: "浸泡",
  },
  {
    hanzi: "级别",
  },
  {
    hanzi: "识别",
  },
  {
    hanzi: "送别",
  },
  {
    hanzi: "说到底",
  },
  {
    hanzi: "浑身",
  },
  {
    hanzi: "料到",
  },
  {
    hanzi: "专制",
  },
  {
    hanzi: "克制",
  },
  {
    hanzi: "压制",
  },
  {
    hanzi: "丞",
  },
  {
    hanzi: "强制",
  },
  {
    hanzi: "录制",
  },
  {
    hanzi: "特制",
  },
  {
    hanzi: "印刷术",
  },
  {
    hanzi: "蒸",
  },
  {
    hanzi: "蒸发",
  },
  {
    hanzi: "蒸汽",
  },
  {
    hanzi: "冲刺",
  },
  {
    hanzi: "日前",
  },
  {
    hanzi: "生前",
  },
  {
    hanzi: "空前",
  },
  {
    hanzi: "公函",
  },
  {
    hanzi: "函授",
  },
  {
    hanzi: "函数",
  },
  {
    hanzi: "超前",
  },
  {
    hanzi: "挑剔",
  },
  {
    hanzi: "加剧",
  },
  {
    hanzi: "急剧",
  },
  {
    hanzi: "涵盖",
  },
  {
    hanzi: "涵义",
  },
  {
    hanzi: "内涵",
  },
  {
    hanzi: "歌剧",
  },
  {
    hanzi: "编剧",
  },
  {
    hanzi: "过剩",
  },
  {
    hanzi: "致力于",
  },
  {
    hanzi: "茫然",
  },
  {
    hanzi: "迷茫",
  },
  {
    hanzi: "茫茫",
  },
  {
    hanzi: "主力",
  },
  {
    hanzi: "功力",
  },
  {
    hanzi: "奋力",
  },
  {
    hanzi: "威力",
  },
  {
    hanzi: "莲子",
  },
  {
    hanzi: "莲花",
  },
  {
    hanzi: "得力",
  },
  {
    hanzi: "接力",
  },
  {
    hanzi: "效力",
  },
  {
    hanzi: "无力",
  },
  {
    hanzi: "根深蒂固",
  },
  {
    hanzi: "极力",
  },
  {
    hanzi: "武力",
  },
  {
    hanzi: "用力",
  },
  {
    hanzi: "着力",
  },
  {
    hanzi: "取缔",
  },
  {
    hanzi: "苦力",
  },
  {
    hanzi: "视力",
  },
  {
    hanzi: "财力",
  },
  {
    hanzi: "阻力",
  },
  {
    hanzi: "芬芳",
  },
  {
    hanzi: "风力",
  },
  {
    hanzi: "马力",
  },
  {
    hanzi: "开办",
  },
  {
    hanzi: "民办",
  },
  {
    hanzi: "纺织",
  },
  {
    hanzi: "照办",
  },
  {
    hanzi: "申办",
  },
  {
    hanzi: "下功夫",
  },
  {
    hanzi: "多功能",
  },
  {
    hanzi: "海绵",
  },
  {
    hanzi: "连绵",
  },
  {
    hanzi: "用功",
  },
  {
    hanzi: "立功",
  },
  {
    hanzi: "强加",
  },
  {
    hanzi: "施加",
  },
  {
    hanzi: "攀",
  },
  {
    hanzi: "攀升",
  },
  {
    hanzi: "服务器",
  },
  {
    hanzi: "事务所",
  },
  {
    hanzi: "事务",
  },
  {
    hanzi: "公务",
  },
  {
    hanzi: "拳头",
  },
  {
    hanzi: "太极拳",
  },
  {
    hanzi: "拳击",
  },
  {
    hanzi: "劳务",
  },
  {
    hanzi: "医务",
  },
  {
    hanzi: "税务",
  },
  {
    hanzi: "一动不动",
  },
  {
    hanzi: "泰斗",
  },
  {
    hanzi: "泰国",
  },
  {
    hanzi: "泰山",
  },
  {
    hanzi: "开动",
  },
  {
    hanzi: "手动",
  },
  {
    hanzi: "拉动",
  },
  {
    hanzi: "改动",
  },
  {
    hanzi: "山寨",
  },
  {
    hanzi: "机动",
  },
  {
    hanzi: "跳动",
  },
  {
    hanzi: "震动",
  },
  {
    hanzi: "鼓动",
  },
  {
    hanzi: "鼎",
  },
  {
    hanzi: "大名鼎鼎",
  },
  {
    hanzi: "有助于",
  },
  {
    hanzi: "互助",
  },
  {
    hanzi: "借助",
  },
  {
    hanzi: "求助",
  },
  {
    hanzi: "痕迹",
  },
  {
    hanzi: "裂痕",
  },
  {
    hanzi: "伤痕",
  },
  {
    hanzi: "惊诧",
  },
  {
    hanzi: "痴呆",
  },
  {
    hanzi: "痴迷",
  },
  {
    hanzi: "痴心",
  },
  {
    hanzi: "白痴",
  },
  {
    hanzi: "如醉如痴",
  },
  {
    hanzi: "畅谈",
  },
  {
    hanzi: "畅销",
  },
  {
    hanzi: "流畅",
  },
  {
    hanzi: "舒畅",
  },
  {
    hanzi: "顺畅",
  },
  {
    hanzi: "通畅",
  },
  {
    hanzi: "疲劳",
  },
  {
    hanzi: "疲软",
  },
  {
    hanzi: "伸手",
  },
  {
    hanzi: "伸缩",
  },
  {
    hanzi: "伸张",
  },
  {
    hanzi: "颇有",
  },
  {
    hanzi: "颇为",
  },
  {
    hanzi: "凭借",
  },
  {
    hanzi: "凭着",
  },
  {
    hanzi: "凭证",
  },
  {
    hanzi: "文凭",
  },
  {
    hanzi: "颁布",
  },
  {
    hanzi: "颁发",
  },
  {
    hanzi: "颁奖",
  },
  {
    hanzi: "仿制",
  },
  {
    hanzi: "效仿",
  },
  {
    hanzi: "颈部",
  },
  {
    hanzi: "瓶颈",
  },
  {
    hanzi: "漩涡",
  },
  {
    hanzi: "旋律",
  },
  {
    hanzi: "周旋",
  },
  {
    hanzi: "野兽",
  },
  {
    hanzi: "兽医",
  },
  {
    hanzi: "凶狠",
  },
  {
    hanzi: "呼唤",
  },
  {
    hanzi: "使唤",
  },
  {
    hanzi: "唤起",
  },
  {
    hanzi: "呼风唤雨",
  },
  {
    hanzi: "召唤",
  },
  {
    hanzi: "唤醒",
  },
  {
    hanzi: "艰巨",
  },
  {
    hanzi: "艰苦奋斗",
  },
  {
    hanzi: "艰险",
  },
  {
    hanzi: "艰辛",
  },
  {
    hanzi: "呜呜",
  },
  {
    hanzi: "恨不得",
  },
  {
    hanzi: "悔恨",
  },
  {
    hanzi: "怨恨",
  },
  {
    hanzi: "哀求",
  },
  {
    hanzi: "悲哀",
  },
  {
    hanzi: "喜怒哀乐",
  },
  {
    hanzi: "忧虑",
  },
  {
    hanzi: "后顾之忧",
  },
  {
    hanzi: "无忧无虑",
  },
  {
    hanzi: "忧伤",
  },
  {
    hanzi: "由衷",
  },
  {
    hanzi: "初衷",
  },
  {
    hanzi: "热衷",
  },
  {
    hanzi: "衷心",
  },
  {
    hanzi: "惨白",
  },
  {
    hanzi: "惨痛",
  },
  {
    hanzi: "惨重",
  },
  {
    hanzi: "吻",
  },
  {
    hanzi: "吻合",
  },
  {
    hanzi: "亲吻",
  },
  {
    hanzi: "宽泛",
  },
  {
    hanzi: "匆匆",
  },
  {
    hanzi: "匆忙",
  },
  {
    hanzi: "洪亮",
  },
  {
    hanzi: "安逸",
  },
  {
    hanzi: "飘逸",
  },
  {
    hanzi: "遗漏",
  },
  {
    hanzi: "排斥",
  },
  {
    hanzi: "充斥",
  },
  {
    hanzi: "度过",
  },
  {
    hanzi: "卵",
  },
  {
    hanzi: "输卵管",
  },
  {
    hanzi: "排卵",
  },
  {
    hanzi: "核桃",
  },
  {
    hanzi: "卸",
  },
  {
    hanzi: "推卸",
  },
  {
    hanzi: "卸妆",
  },
  {
    hanzi: "榜样",
  },
  {
    hanzi: "标榜",
  },
  {
    hanzi: "榜首",
  },
  {
    hanzi: "上榜",
  },
  {
    hanzi: "抵御",
  },
  {
    hanzi: "防御",
  },
  {
    hanzi: "肩负",
  },
  {
    hanzi: "擦肩而过",
  },
  {
    hanzi: "国徽",
  },
  {
    hanzi: "安徽",
  },
  {
    hanzi: "徽章",
  },
  {
    hanzi: "捐献",
  },
  {
    hanzi: "螺丝",
  },
  {
    hanzi: "螺旋",
  },
  {
    hanzi: "柜台",
  },
  {
    hanzi: "专柜",
  },
  {
    hanzi: "亩",
  },
  {
    hanzi: "抗拒",
  },
  {
    hanzi: "彩虹",
  },
  {
    hanzi: "被捕",
  },
  {
    hanzi: "抓捕",
  },
  {
    hanzi: "蜜月",
  },
  {
    hanzi: "甜蜜",
  },
  {
    hanzi: "揭发",
  },
  {
    hanzi: "揭露",
  },
  {
    hanzi: "揭示",
  },
  {
    hanzi: "揭晓",
  },
  {
    hanzi: "蜜蜂",
  },
  {
    hanzi: "蜂蜜",
  },
  {
    hanzi: "撤换",
  },
  {
    hanzi: "寂静",
  },
  {
    hanzi: "扶持",
  },
  {
    hanzi: "扶贫",
  },
  {
    hanzi: "帮扶",
  },
  {
    hanzi: "寂寞",
  },
  {
    hanzi: "三峡",
  },
  {
    hanzi: "骚乱",
  },
  {
    hanzi: "骚扰",
  },
  {
    hanzi: "栋梁",
  },
  {
    hanzi: "驰名",
  },
  {
    hanzi: "冷冻",
  },
  {
    hanzi: "狼",
  },
  {
    hanzi: "防盗",
  },
  {
    hanzi: "防盗门",
  },
  {
    hanzi: "海盗",
  },
  {
    hanzi: "狼狈",
  },
  {
    hanzi: "欣喜",
  },
  {
    hanzi: "欣欣向荣",
  },
  {
    hanzi: "地狱",
  },
  {
    hanzi: "监狱",
  },
  {
    hanzi: "越狱",
  },
  {
    hanzi: "自助",
  },
  {
    hanzi: "没劲",
  },
  {
    hanzi: "费劲",
  },
  {
    hanzi: "起劲",
  },
  {
    hanzi: "谨慎",
  },
  {
    hanzi: "严谨",
  },
  {
    hanzi: "较劲",
  },
  {
    hanzi: "功劳",
  },
  {
    hanzi: "操劳",
  },
  {
    hanzi: "伤势",
  },
  {
    hanzi: "坑",
  },
  {
    hanzi: "局势",
  },
  {
    hanzi: "弱势",
  },
  {
    hanzi: "手势",
  },
  {
    hanzi: "架势",
  },
  {
    hanzi: "绳子",
  },
  {
    hanzi: "气势",
  },
  {
    hanzi: "顺势",
  },
  {
    hanzi: "奋勇",
  },
  {
    hanzi: "承包",
  },
  {
    hanzi: "苍蝇",
  },
  {
    hanzi: "净化",
  },
  {
    hanzi: "分化",
  },
  {
    hanzi: "恶化",
  },
  {
    hanzi: "激化",
  },
  {
    hanzi: "龟",
  },
  {
    hanzi: "乌龟",
  },
  {
    hanzi: "简化",
  },
  {
    hanzi: "美化",
  },
  {
    hanzi: "老化",
  },
  {
    hanzi: "景区",
  },
  {
    hanzi: "奄奄一息",
  },
  {
    hanzi: "禁区",
  },
  {
    hanzi: "误区",
  },
  {
    hanzi: "就医",
  },
  {
    hanzi: "求医",
  },
  {
    hanzi: "淹",
  },
  {
    hanzi: "淹没",
  },
  {
    hanzi: "成千上万",
  },
  {
    hanzi: "回升",
  },
  {
    hanzi: "过半",
  },
  {
    hanzi: "才华",
  },
  {
    hanzi: "俺",
  },
  {
    hanzi: "精华",
  },
  {
    hanzi: "孤单",
  },
  {
    hanzi: "清单",
  },
  {
    hanzi: "订单",
  },
  {
    hanzi: "掩盖",
  },
  {
    hanzi: "掩护",
  },
  {
    hanzi: "掩饰",
  },
  {
    hanzi: "专卖店",
  },
  {
    hanzi: "倒卖",
  },
  {
    hanzi: "出卖",
  },
  {
    hanzi: "拍卖",
  },
  {
    hanzi: "拘留",
  },
  {
    hanzi: "拘束",
  },
  {
    hanzi: "指南针",
  },
  {
    hanzi: "指南",
  },
  {
    hanzi: "占卜",
  },
  {
    hanzi: "强占",
  },
  {
    hanzi: "拦",
  },
  {
    hanzi: "阻拦",
  },
  {
    hanzi: "拦住",
  },
  {
    hanzi: "拦截",
  },
  {
    hanzi: "一卡通",
  },
  {
    hanzi: "自卫",
  },
  {
    hanzi: "防卫",
  },
  {
    hanzi: "当即",
  },
  {
    hanzi: "抹",
  },
  {
    hanzi: "涂抹",
  },
  {
    hanzi: "了却",
  },
  {
    hanzi: "退却",
  },
  {
    hanzi: "问卷",
  },
  {
    hanzi: "出厂",
  },
  {
    hanzi: "朱红",
  },
  {
    hanzi: "舞厅",
  },
  {
    hanzi: "农历",
  },
  {
    hanzi: "来历",
  },
  {
    hanzi: "减压",
  },
  {
    hanzi: "株",
  },
  {
    hanzi: "守株待兔",
  },
  {
    hanzi: "施压",
  },
  {
    hanzi: "高压",
  },
  {
    hanzi: "丰厚",
  },
  {
    hanzi: "宽厚",
  },
  {
    hanzi: "框",
  },
  {
    hanzi: "框架",
  },
  {
    hanzi: "复原",
  },
  {
    hanzi: "还原",
  },
  {
    hanzi: "除去",
  },
  {
    hanzi: "危及",
  },
  {
    hanzi: "纯朴",
  },
  {
    hanzi: "古朴",
  },
  {
    hanzi: "朴实",
  },
  {
    hanzi: "朴素",
  },
  {
    hanzi: "质朴",
  },
  {
    hanzi: "波及",
  },
  {
    hanzi: "顾及",
  },
  {
    hanzi: "亲友",
  },
  {
    hanzi: "盟友",
  },
  {
    hanzi: "卓越",
  },
  {
    hanzi: "开发区",
  },
  {
    hanzi: "开发商",
  },
  {
    hanzi: "出发点",
  },
  {
    hanzi: "复发",
  },
  {
    hanzi: "炭",
  },
  {
    hanzi: "煤炭",
  },
  {
    hanzi: "批发",
  },
  {
    hanzi: "散发",
  },
  {
    hanzi: "激发",
  },
  {
    hanzi: "突发",
  },
  {
    hanzi: "碳",
  },
  {
    hanzi: "低碳",
  },
  {
    hanzi: "二氧化碳",
  },
  {
    hanzi: "自发",
  },
  {
    hanzi: "越发",
  },
  {
    hanzi: "吸取",
  },
  {
    hanzi: "换取",
  },
  {
    hanzi: "桂花",
  },
  {
    hanzi: "祥和",
  },
  {
    hanzi: "槽",
  },
  {
    hanzi: "水槽",
  },
  {
    hanzi: "跳槽",
  },
  {
    hanzi: "插槽",
  },
  {
    hanzi: "忠实",
  },
  {
    hanzi: "忠于",
  },
  {
    hanzi: "枚",
  },
  {
    hanzi: "慰劳",
  },
  {
    hanzi: "欣慰",
  },
  {
    hanzi: "柳树",
  },
  {
    hanzi: "悬挂",
  },
  {
    hanzi: "悬念",
  },
  {
    hanzi: "悬殊",
  },
  {
    hanzi: "清晰",
  },
  {
    hanzi: "接轨",
  },
  {
    hanzi: "出轨",
  },
  {
    hanzi: "柏树",
  },
  {
    hanzi: "辅导",
  },
  {
    hanzi: "辅导老师",
  },
  {
    hanzi: "相辅相成",
  },
  {
    hanzi: "湖泊",
  },
  {
    hanzi: "停泊",
  },
  {
    hanzi: "夸耀",
  },
  {
    hanzi: "耀眼",
  },
  {
    hanzi: "荣耀",
  },
  {
    hanzi: "崩溃",
  },
  {
    hanzi: "一晃",
  },
  {
    hanzi: "小溪",
  },
  {
    hanzi: "晕倒",
  },
  {
    hanzi: "海滩",
  },
  {
    hanzi: "沙滩",
  },
  {
    hanzi: "昏迷",
  },
  {
    hanzi: "雇",
  },
  {
    hanzi: "雇员",
  },
  {
    hanzi: "雇主",
  },
  {
    hanzi: "解雇",
  },
  {
    hanzi: "旺季",
  },
  {
    hanzi: "旺盛",
  },
  {
    hanzi: "溢",
  },
  {
    hanzi: "洋溢",
  },
  {
    hanzi: "牢固",
  },
  {
    hanzi: "牢记",
  },
  {
    hanzi: "亡羊补牢",
  },
  {
    hanzi: "狭隘",
  },
  {
    hanzi: "踏上",
  },
  {
    hanzi: "沉淀",
  },
  {
    hanzi: "淀粉",
  },
  {
    hanzi: "积淀",
  },
  {
    hanzi: "埋藏",
  },
  {
    hanzi: "埋没",
  },
  {
    hanzi: "埋怨",
  },
  {
    hanzi: "宪法",
  },
  {
    hanzi: "公墓",
  },
  {
    hanzi: "墓地",
  },
  {
    hanzi: "扫墓",
  },
  {
    hanzi: "追踪",
  },
  {
    hanzi: "跟踪",
  },
  {
    hanzi: "失踪",
  },
  {
    hanzi: "踪影",
  },
  {
    hanzi: "戒指",
  },
  {
    hanzi: "戒备",
  },
  {
    hanzi: "开辟",
  },
  {
    hanzi: "开天辟地",
  },
  {
    hanzi: "机械化",
  },
  {
    hanzi: "殿堂",
  },
  {
    hanzi: "宫殿",
  },
  {
    hanzi: "栏杆",
  },
  {
    hanzi: "专栏",
  },
  {
    hanzi: "屡",
  },
  {
    hanzi: "屡屡",
  },
  {
    hanzi: "屡次",
  },
  {
    hanzi: "腐烂",
  },
  {
    hanzi: "发掘",
  },
  {
    hanzi: "挖掘",
  },
  {
    hanzi: "辞去",
  },
  {
    hanzi: "辞退",
  },
  {
    hanzi: "告辞",
  },
  {
    hanzi: "推辞",
  },
  {
    hanzi: "言辞",
  },
  {
    hanzi: "致辞",
  },
  {
    hanzi: "搏斗",
  },
  {
    hanzi: "脉搏",
  },
  {
    hanzi: "拼搏",
  },
  {
    hanzi: "分辨率",
  },
  {
    hanzi: "抖",
  },
  {
    hanzi: "发抖",
  },
  {
    hanzi: "辩护",
  },
  {
    hanzi: "辩解",
  },
  {
    hanzi: "答辩",
  },
  {
    hanzi: "扯",
  },
  {
    hanzi: "牵扯",
  },
  {
    hanzi: "纲要",
  },
  {
    hanzi: "不耻下问",
  },
  {
    hanzi: "耻笑",
  },
  {
    hanzi: "可耻",
  },
  {
    hanzi: "无耻",
  },
  {
    hanzi: "思绪",
  },
  {
    hanzi: "分歧",
  },
  {
    hanzi: "歧视",
  },
  {
    hanzi: "捐赠",
  },
  {
    hanzi: "肢体",
  },
  {
    hanzi: "四肢",
  },
  {
    hanzi: "下肢",
  },
  {
    hanzi: "比比皆是",
  },
  {
    hanzi: "肖像",
  },
  {
    hanzi: "索取",
  },
  {
    hanzi: "备受",
  },
  {
    hanzi: "深受",
  },
  {
    hanzi: "经受",
  },
  {
    hanzi: "削",
  },
  {
    hanzi: "削弱",
  },
  {
    hanzi: "削减",
  },
  {
    hanzi: "演变",
  },
  {
    hanzi: "两口子",
  },
  {
    hanzi: "可口",
  },
  {
    hanzi: "开口",
  },
  {
    hanzi: "俊俏",
  },
  {
    hanzi: "缺口",
  },
  {
    hanzi: "宁可",
  },
  {
    hanzi: "下台",
  },
  {
    hanzi: "前台",
  },
  {
    hanzi: "不屑",
  },
  {
    hanzi: "不屑一顾",
  },
  {
    hanzi: "后台",
  },
  {
    hanzi: "看台",
  },
  {
    hanzi: "代号",
  },
  {
    hanzi: "外号",
  },
  {
    hanzi: "树梢",
  },
  {
    hanzi: "头号",
  },
  {
    hanzi: "挂号",
  },
  {
    hanzi: "编号",
  },
  {
    hanzi: "记号",
  },
  {
    hanzi: "捎",
  },
  {
    hanzi: "上司",
  },
  {
    hanzi: "大吃一惊",
  },
  {
    hanzi: "口吃",
  },
  {
    hanzi: "四合院",
  },
  {
    hanzi: "通宵",
  },
  {
    hanzi: "元宵节",
  },
  {
    hanzi: "复合",
  },
  {
    hanzi: "折合",
  },
  {
    hanzi: "汇合",
  },
  {
    hanzi: "口哨",
  },
  {
    hanzi: "百合",
  },
  {
    hanzi: "迎合",
  },
  {
    hanzi: "重合",
  },
  {
    hanzi: "共同体",
  },
  {
    hanzi: "哼",
  },
  {
    hanzi: "不同",
  },
  {
    hanzi: "寻常",
  },
  {
    hanzi: "协同",
  },
  {
    hanzi: "雷同",
  },
  {
    hanzi: "燕子",
  },
  {
    hanzi: "命名",
  },
  {
    hanzi: "提名",
  },
  {
    hanzi: "改名",
  },
  {
    hanzi: "闻名",
  },
  {
    hanzi: "咽",
  },
  {
    hanzi: "呜咽",
  },
  {
    hanzi: "走后门",
  },
  {
    hanzi: "其后",
  },
  {
    hanzi: "日后",
  },
  {
    hanzi: "稍后",
  },
  {
    hanzi: "婚姻",
  },
  {
    hanzi: "方向盘",
  },
  {
    hanzi: "偏向",
  },
  {
    hanzi: "内向",
  },
  {
    hanzi: "动向",
  },
  {
    hanzi: "姜",
  },
  {
    hanzi: "生姜",
  },
  {
    hanzi: "去向",
  },
  {
    hanzi: "双向",
  },
  {
    hanzi: "定向",
  },
  {
    hanzi: "导向",
  },
  {
    hanzi: "强奸",
  },
  {
    hanzi: "意向",
  },
  {
    hanzi: "指向",
  },
  {
    hanzi: "流向",
  },
  {
    hanzi: "恐吓",
  },
  {
    hanzi: "旱",
  },
  {
    hanzi: "干旱",
  },
  {
    hanzi: "旱灾",
  },
  {
    hanzi: "抗旱",
  },
  {
    hanzi: "与否",
  },
  {
    hanzi: "富含",
  },
  {
    hanzi: "动听",
  },
  {
    hanzi: "接听",
  },
  {
    hanzi: "塌",
  },
  {
    hanzi: "倒塌",
  },
  {
    hanzi: "死心塌地",
  },
  {
    hanzi: "一塌糊涂",
  },
  {
    hanzi: "争吵",
  },
  {
    hanzi: "辞呈",
  },
  {
    hanzi: "宣告",
  },
  {
    hanzi: "控告",
  },
  {
    hanzi: "垫",
  },
  {
    hanzi: "垫底",
  },
  {
    hanzi: "垫子",
  },
  {
    hanzi: "通告",
  },
  {
    hanzi: "预告",
  },
  {
    hanzi: "职员",
  },
  {
    hanzi: "议员",
  },
  {
    hanzi: "新颖",
  },
  {
    hanzi: "脱颖而出",
  },
  {
    hanzi: "一味",
  },
  {
    hanzi: "回味",
  },
  {
    hanzi: "气味",
  },
  {
    hanzi: "趣味",
  },
  {
    hanzi: "穆斯林",
  },
  {
    hanzi: "风味",
  },
  {
    hanzi: "香味",
  },
  {
    hanzi: "欢呼",
  },
  {
    hanzi: "生命线",
  },
  {
    hanzi: "谦逊",
  },
  {
    hanzi: "逊色",
  },
  {
    hanzi: "任命",
  },
  {
    hanzi: "使命",
  },
  {
    hanzi: "性命",
  },
  {
    hanzi: "致命",
  },
  {
    hanzi: "逝世",
  },
  {
    hanzi: "流逝",
  },
  {
    hanzi: "要命",
  },
  {
    hanzi: "亲和力",
  },
  {
    hanzi: "平和",
  },
  {
    hanzi: "缓和",
  },
  {
    hanzi: "发誓",
  },
  {
    hanzi: "宣誓",
  },
  {
    hanzi: "附和",
  },
  {
    hanzi: "饱和",
  },
  {
    hanzi: "止咳",
  },
  {
    hanzi: "人品",
  },
  {
    hanzi: "掀",
  },
  {
    hanzi: "掀起",
  },
  {
    hanzi: "制品",
  },
  {
    hanzi: "小品",
  },
  {
    hanzi: "样品",
  },
  {
    hanzi: "礼品",
  },
  {
    hanzi: "枪毙",
  },
  {
    hanzi: "矛头",
  },
  {
    hanzi: "葬",
  },
  {
    hanzi: "葬礼",
  },
  {
    hanzi: "陪葬",
  },
  {
    hanzi: "自相矛盾",
  },
  {
    hanzi: "后盾",
  },
  {
    hanzi: "芝麻",
  },
  {
    hanzi: "芝士",
  },
  {
    hanzi: "循序渐进",
  },
  {
    hanzi: "恶性循环",
  },
  {
    hanzi: "萝卜",
  },
  {
    hanzi: "胡萝卜",
  },
  {
    hanzi: "安眠药",
  },
  {
    hanzi: "失眠",
  },
  {
    hanzi: "休眠",
  },
  {
    hanzi: "冬眠",
  },
  {
    hanzi: "罩",
  },
  {
    hanzi: "口罩",
  },
  {
    hanzi: "笼罩",
  },
  {
    hanzi: "盲目",
  },
  {
    hanzi: "文盲",
  },
  {
    hanzi: "部署",
  },
  {
    hanzi: "签署",
  },
  {
    hanzi: "垂头丧气",
  },
  {
    hanzi: "丧生",
  },
  {
    hanzi: "芯片",
  },
  {
    hanzi: "遵照",
  },
  {
    hanzi: "遵循",
  },
  {
    hanzi: "葱",
  },
  {
    hanzi: "洋葱",
  },
  {
    hanzi: "递交",
  },
  {
    hanzi: "惩处",
  },
  {
    hanzi: "惩罚",
  },
  {
    hanzi: "欺骗",
  },
  {
    hanzi: "忌",
  },
  {
    hanzi: "忌口",
  },
  {
    hanzi: "禁忌",
  },
  {
    hanzi: "哲理",
  },
  {
    hanzi: "惹",
  },
  {
    hanzi: "吊销",
  },
  {
    hanzi: "提心吊胆",
  },
  {
    hanzi: "藏匿",
  },
  {
    hanzi: "匿名",
  },
  {
    hanzi: "增添",
  },
  {
    hanzi: "土匪",
  },
  {
    hanzi: "凉爽",
  },
  {
    hanzi: "爽快",
  },
  {
    hanzi: "砸",
  },
  {
    hanzi: "无可奈何",
  },
  {
    hanzi: "砖",
  },
  {
    hanzi: "崇高",
  },
  {
    hanzi: "崇尚",
  },
  {
    hanzi: "碑",
  },
  {
    hanzi: "纪念碑",
  },
  {
    hanzi: "口碑",
  },
  {
    hanzi: "里程碑",
  },
  {
    hanzi: "墓碑",
  },
  {
    hanzi: "卧铺",
  },
  {
    hanzi: "砍",
  },
  {
    hanzi: "扑灭",
  },
  {
    hanzi: "红扑扑",
  },
  {
    hanzi: "扑克",
  },
  {
    hanzi: "扑面而来",
  },
  {
    hanzi: "砂糖",
  },
  {
    hanzi: "拨款",
  },
  {
    hanzi: "拨通",
  },
  {
    hanzi: "纱",
  },
  {
    hanzi: "婚纱",
  },
  {
    hanzi: "挤压",
  },
  {
    hanzi: "拥挤",
  },
  {
    hanzi: "绑",
  },
  {
    hanzi: "绑架",
  },
  {
    hanzi: "松绑",
  },
  {
    hanzi: "绑定",
  },
  {
    hanzi: "抵挡",
  },
  {
    hanzi: "阻挡",
  },
  {
    hanzi: "挡住",
  },
  {
    hanzi: "缠",
  },
  {
    hanzi: "纠缠",
  },
  {
    hanzi: "扭曲",
  },
  {
    hanzi: "扭头",
  },
  {
    hanzi: "扭转",
  },
  {
    hanzi: "廉价",
  },
  {
    hanzi: "廉洁",
  },
  {
    hanzi: "廉正",
  },
  {
    hanzi: "廉政",
  },
  {
    hanzi: "扫描",
  },
  {
    hanzi: "素描",
  },
  {
    hanzi: "帆",
  },
  {
    hanzi: "帆船",
  },
  {
    hanzi: "一帆风顺",
  },
  {
    hanzi: "挖苦",
  },
  {
    hanzi: "帐子",
  },
  {
    hanzi: "抵押",
  },
  {
    hanzi: "扣押",
  },
  {
    hanzi: "贱",
  },
  {
    hanzi: "贱人",
  },
  {
    hanzi: "禽兽",
  },
  {
    hanzi: "商贾",
  },
  {
    hanzi: "恰到好处",
  },
  {
    hanzi: "恰恰相反",
  },
  {
    hanzi: "恰巧",
  },
  {
    hanzi: "恰如其分",
  },
  {
    hanzi: "受贿",
  },
  {
    hanzi: "行贿",
  },
  {
    hanzi: "悄然",
  },
  {
    hanzi: "贿赂",
  },
  {
    hanzi: "领悟",
  },
  {
    hanzi: "醒悟",
  },
  {
    hanzi: "均匀",
  },
  {
    hanzi: "书籍",
  },
  {
    hanzi: "外籍",
  },
  {
    hanzi: "祖籍",
  },
  {
    hanzi: "户籍",
  },
  {
    hanzi: "凑",
  },
  {
    hanzi: "凑合",
  },
  {
    hanzi: "凑巧",
  },
  {
    hanzi: "紧凑",
  },
  {
    hanzi: "狼藉",
  },
  {
    hanzi: "奢望",
  },
  {
    hanzi: "藏品",
  },
  {
    hanzi: "交响乐",
  },
  {
    hanzi: "音响",
  },
  {
    hanzi: "预售",
  },
  {
    hanzi: "默契",
  },
  {
    hanzi: "契机",
  },
  {
    hanzi: "契约",
  },
  {
    hanzi: "合唱",
  },
  {
    hanzi: "独唱",
  },
  {
    hanzi: "工商界",
  },
  {
    hanzi: "经商",
  },
  {
    hanzi: "盗窃",
  },
  {
    hanzi: "窃取",
  },
  {
    hanzi: "啦啦队",
  },
  {
    hanzi: "友善",
  },
  {
    hanzi: "吵嘴",
  },
  {
    hanzi: "乐器",
  },
  {
    hanzi: "奢侈",
  },
  {
    hanzi: "奢侈品",
  },
  {
    hanzi: "一回事",
  },
  {
    hanzi: "来回",
  },
  {
    hanzi: "退回",
  },
  {
    hanzi: "乐园",
  },
  {
    hanzi: "仲裁",
  },
  {
    hanzi: "庄园",
  },
  {
    hanzi: "果园",
  },
  {
    hanzi: "解围",
  },
  {
    hanzi: "稳固",
  },
  {
    hanzi: "耻辱",
  },
  {
    hanzi: "帝国主义",
  },
  {
    hanzi: "中国画",
  },
  {
    hanzi: "帝国",
  },
  {
    hanzi: "王国",
  },
  {
    hanzi: "侮辱",
  },
  {
    hanzi: "邻国",
  },
  {
    hanzi: "意图",
  },
  {
    hanzi: "汤圆",
  },
  {
    hanzi: "出土",
  },
  {
    hanzi: "华侨",
  },
  {
    hanzi: "国土",
  },
  {
    hanzi: "领土",
  },
  {
    hanzi: "神圣",
  },
  {
    hanzi: "好在",
  },
  {
    hanzi: "轿车",
  },
  {
    hanzi: "暗地里",
  },
  {
    hanzi: "产地",
  },
  {
    hanzi: "余地",
  },
  {
    hanzi: "原地",
  },
  {
    hanzi: "车轴",
  },
  {
    hanzi: "境地",
  },
  {
    hanzi: "大地",
  },
  {
    hanzi: "天地",
  },
  {
    hanzi: "实地",
  },
  {
    hanzi: "敦促",
  },
  {
    hanzi: "敦厚",
  },
  {
    hanzi: "伦敦",
  },
  {
    hanzi: "就地",
  },
  {
    hanzi: "工地",
  },
  {
    hanzi: "空地",
  },
  {
    hanzi: "空地",
  },
  {
    hanzi: "醇厚",
  },
  {
    hanzi: "胆固醇",
  },
  {
    hanzi: "落地",
  },
  {
    hanzi: "质地",
  },
  {
    hanzi: "入场券",
  },
  {
    hanzi: "开场白",
  },
  {
    hanzi: "报酬",
  },
  {
    hanzi: "应酬",
  },
  {
    hanzi: "上场",
  },
  {
    hanzi: "下场",
  },
  {
    hanzi: "会场",
  },
  {
    hanzi: "入场",
  },
  {
    hanzi: "宫廷",
  },
  {
    hanzi: "农场",
  },
  {
    hanzi: "开场",
  },
  {
    hanzi: "进场",
  },
  {
    hanzi: "遗址",
  },
  {
    hanzi: "潜艇",
  },
  {
    hanzi: "好坏",
  },
  {
    hanzi: "中型",
  },
  {
    hanzi: "原型",
  },
  {
    hanzi: "发型",
  },
  {
    hanzi: "剥",
  },
  {
    hanzi: "剥削",
  },
  {
    hanzi: "剥夺",
  },
  {
    hanzi: "巨型",
  },
  {
    hanzi: "微型",
  },
  {
    hanzi: "成型",
  },
  {
    hanzi: "转型",
  },
  {
    hanzi: "刹车",
  },
  {
    hanzi: "一刹那",
  },
  {
    hanzi: "轻型",
  },
  {
    hanzi: "重型",
  },
  {
    hanzi: "地域",
  },
  {
    hanzi: "水域",
  },
  {
    hanzi: "乖",
  },
  {
    hanzi: "乖巧",
  },
  {
    hanzi: "流域",
  },
  {
    hanzi: "海域",
  },
  {
    hanzi: "根基",
  },
  {
    hanzi: "学堂",
  },
  {
    hanzi: "竭尽全力",
  },
  {
    hanzi: "竭力",
  },
  {
    hanzi: "精疲力竭",
  },
  {
    hanzi: "衰竭",
  },
  {
    hanzi: "雕塑",
  },
  {
    hanzi: "入境",
  },
  {
    hanzi: "出境",
  },
  {
    hanzi: "困境",
  },
  {
    hanzi: "爹",
  },
  {
    hanzi: "处境",
  },
  {
    hanzi: "家境",
  },
  {
    hanzi: "过境",
  },
  {
    hanzi: "学士",
  },
  {
    hanzi: "栽",
  },
  {
    hanzi: "栽培",
  },
  {
    hanzi: "荒诞",
  },
  {
    hanzi: "荒凉",
  },
  {
    hanzi: "荒唐",
  },
  {
    hanzi: "大棚",
  },
  {
    hanzi: "慌乱",
  },
  {
    hanzi: "慌张",
  },
  {
    hanzi: "惊慌",
  },
  {
    hanzi: "惊慌失措",
  },
  {
    hanzi: "恐慌",
  },
  {
    hanzi: "心慌",
  },
  {
    hanzi: "棘手",
  },
  {
    hanzi: "说谎",
  },
  {
    hanzi: "拐杖",
  },
  {
    hanzi: "月薪",
  },
  {
    hanzi: "年薪",
  },
  {
    hanzi: "官吏",
  },
  {
    hanzi: "疏忽",
  },
  {
    hanzi: "疏导",
  },
  {
    hanzi: "疏通",
  },
  {
    hanzi: "疏远",
  },
  {
    hanzi: "打仗",
  },
  {
    hanzi: "红薯",
  },
  {
    hanzi: "伴侣",
  },
  {
    hanzi: "情侣",
  },
  {
    hanzi: "腊月",
  },
  {
    hanzi: "侍候",
  },
  {
    hanzi: "猎人",
  },
  {
    hanzi: "猎犬",
  },
  {
    hanzi: "鞭策",
  },
  {
    hanzi: "鞭炮",
  },
  {
    hanzi: "记忆犹新",
  },
  {
    hanzi: "佐料",
  },
  {
    hanzi: "瞧不起",
  },
  {
    hanzi: "精髓",
  },
  {
    hanzi: "期盼",
  },
  {
    hanzi: "左顾右盼",
  },
  {
    hanzi: "懒惰",
  },
  {
    hanzi: "发愁",
  },
  {
    hanzi: "犯愁",
  },
  {
    hanzi: "忧愁",
  },
  {
    hanzi: "当之无愧",
  },
  {
    hanzi: "羞愧",
  },
  {
    hanzi: "寿命",
  },
  {
    hanzi: "寿险",
  },
  {
    hanzi: "感慨",
  },
  {
    hanzi: "愤慨",
  },
  {
    hanzi: "艳丽",
  },
  {
    hanzi: "灌溉",
  },
  {
    hanzi: "钻空子",
  },
  {
    hanzi: "钻研",
  },
  {
    hanzi: "钻石",
  },
  {
    hanzi: "泛滥",
  },
  {
    hanzi: "滥用",
  },
  {
    hanzi: "电铃",
  },
  {
    hanzi: "门铃",
  },
  {
    hanzi: "沸沸扬扬",
  },
  {
    hanzi: "沸腾",
  },
  {
    hanzi: "顽固",
  },
  {
    hanzi: "生涯",
  },
  {
    hanzi: "天涯",
  },
  {
    hanzi: "倡议",
  },
  {
    hanzi: "分泌",
  },
  {
    hanzi: "内分泌",
  },
  {
    hanzi: "久仰",
  },
  {
    hanzi: "前仰后合",
  },
  {
    hanzi: "仰望",
  },
  {
    hanzi: "渣子",
  },
  {
    hanzi: "人渣",
  },
  {
    hanzi: "匹配",
  },
  {
    hanzi: "过滤",
  },
  {
    hanzi: "劝告",
  },
  {
    hanzi: "劝说",
  },
  {
    hanzi: "劝阻",
  },
  {
    hanzi: "泡沫",
  },
  {
    hanzi: "交叉",
  },
  {
    hanzi: "汪洋",
  },
  {
    hanzi: "倾斜",
  },
  {
    hanzi: "漆",
  },
  {
    hanzi: "油漆",
  },
  {
    hanzi: "漆黑",
  },
  {
    hanzi: "树枝",
  },
  {
    hanzi: "膝盖",
  },
  {
    hanzi: "躲避",
  },
  {
    hanzi: "躲藏",
  },
  {
    hanzi: "脊梁",
  },
  {
    hanzi: "脊髓",
  },
  {
    hanzi: "毫无犹豫",
  },
  {
    hanzi: "犹豫不决",
  },
  {
    hanzi: "细腻",
  },
  {
    hanzi: "油腻",
  },
  {
    hanzi: "烈士",
  },
  {
    hanzi: "院士",
  },
  {
    hanzi: "欢声",
  },
  {
    hanzi: "笑语",
  },
  {
    hanzi: "赋予",
  },
  {
    hanzi: "天赋",
  },
  {
    hanzi: "名声",
  },
  {
    hanzi: "呼声",
  },
  {
    hanzi: "噪声",
  },
  {
    hanzi: "心声",
  },
  {
    hanzi: "光芒",
  },
  {
    hanzi: "芒果",
  },
  {
    hanzi: "随处",
  },
  {
    hanzi: "可见",
  },
  {
    hanzi: "住处",
  },
  {
    hanzi: "何处",
  },
  {
    hanzi: "茅台",
  },
  {
    hanzi: "判处",
  },
  {
    hanzi: "去处",
  },
  {
    hanzi: "益处",
  },
  {
    hanzi: "难处",
  },
  {
    hanzi: "荆棘",
  },
  {
    hanzi: "后备箱",
  },
  {
    hanzi: "后备",
  },
  {
    hanzi: "完备",
  },
  {
    hanzi: "责备",
  },
  {
    hanzi: "隐蔽",
  },
  {
    hanzi: "屏蔽",
  },
  {
    hanzi: "日复一日",
  },
  {
    hanzi: "报复",
  },
  {
    hanzi: "收复",
  },
  {
    hanzi: "朝夕",
  },
  {
    hanzi: "弊病",
  },
  {
    hanzi: "弊端",
  },
  {
    hanzi: "作弊",
  },
  {
    hanzi: "相处",
  },
  {
    hanzi: "前夕",
  },
  {
    hanzi: "分外",
  },
  {
    hanzi: "境外",
  },
  {
    hanzi: "憋",
  },
  {
    hanzi: "见外",
  },
  {
    hanzi: "野外",
  },
  {
    hanzi: "除外",
  },
  {
    hanzi: "额外",
  },
  {
    hanzi: "撇",
  },
  {
    hanzi: "或多或少",
  },
  {
    hanzi: "顶多",
  },
  {
    hanzi: "年夜饭",
  },
  {
    hanzi: "彻夜",
  },
  {
    hanzi: "撕",
  },
  {
    hanzi: "连夜",
  },
  {
    hanzi: "一大早",
  },
  {
    hanzi: "盛大",
  },
  {
    hanzi: "老大",
  },
  {
    hanzi: "挫折",
  },
  {
    hanzi: "抑扬顿挫",
  },
  {
    hanzi: "一天到晚",
  },
  {
    hanzi: "航天员",
  },
  {
    hanzi: "先天",
  },
  {
    hanzi: "成天",
  },
  {
    hanzi: "挽",
  },
  {
    hanzi: "挽回",
  },
  {
    hanzi: "挽救",
  },
  {
    hanzi: "航天",
  },
  {
    hanzi: "露天",
  },
  {
    hanzi: "丢失",
  },
  {
    hanzi: "得失",
  },
  {
    hanzi: "捧",
  },
  {
    hanzi: "捧场",
  },
  {
    hanzi: "吹捧",
  },
  {
    hanzi: "挂失",
  },
  {
    hanzi: "流失",
  },
  {
    hanzi: "缺失",
  },
  {
    hanzi: "过失",
  },
  {
    hanzi: "挪",
  },
  {
    hanzi: "迷失",
  },
  {
    hanzi: "带头",
  },
  {
    hanzi: "带头人",
  },
  {
    hanzi: "个头儿",
  },
  {
    hanzi: "到头来",
  },
  {
    hanzi: "搅",
  },
  {
    hanzi: "打搅",
  },
  {
    hanzi: "一头",
  },
  {
    hanzi: "上头",
  },
  {
    hanzi: "从头",
  },
  {
    hanzi: "兆头",
  },
  {
    hanzi: "抨击",
  },
  {
    hanzi: "关头",
  },
  {
    hanzi: "出头",
  },
  {
    hanzi: "劲头",
  },
  {
    hanzi: "势头",
  },
  {
    hanzi: "秤",
  },
  {
    hanzi: "口头",
  },
  {
    hanzi: "尽头",
  },
  {
    hanzi: "巨头",
  },
  {
    hanzi: "念头",
  },
  {
    hanzi: "萍水相逢",
  },
  {
    hanzi: "手头",
  },
  {
    hanzi: "掉头",
  },
  {
    hanzi: "源头",
  },
  {
    hanzi: "过头",
  },
  {
    hanzi: "草坪",
  },
  {
    hanzi: "抢夺",
  },
  {
    hanzi: "好奇心",
  },
  {
    hanzi: "传奇",
  },
  {
    hanzi: "池塘",
  },
  {
    hanzi: "惊奇",
  },
  {
    hanzi: "新奇",
  },
  {
    hanzi: "离奇",
  },
  {
    hanzi: "供奉",
  },
  {
    hanzi: "坠",
  },
  {
    hanzi: "摇摇欲坠",
  },
  {
    hanzi: "下坠",
  },
  {
    hanzi: "坠落",
  },
  {
    hanzi: "兴奋剂",
  },
  {
    hanzi: "过奖",
  },
  {
    hanzi: "圈套",
  },
  {
    hanzi: "深奥",
  },
  {
    hanzi: "陌生",
  },
  {
    hanzi: "陌生人",
  },
  {
    hanzi: "少女",
  },
  {
    hanzi: "时好时坏",
  },
  {
    hanzi: "叫好",
  },
  {
    hanzi: "喜好",
  },
  {
    hanzi: "走廊",
  },
  {
    hanzi: "完好",
  },
  {
    hanzi: "讨好",
  },
  {
    hanzi: "不如说",
  },
  {
    hanzi: "自如",
  },
  {
    hanzi: "鸦雀无声",
  },
  {
    hanzi: "乌鸦",
  },
  {
    hanzi: "冷漠",
  },
  {
    hanzi: "漠然",
  },
  {
    hanzi: "鹰",
  },
  {
    hanzi: "老鹰",
  },
  {
    hanzi: "猫头鹰",
  },
  {
    hanzi: "脆弱",
  },
  {
    hanzi: "清脆",
  },
  {
    hanzi: "庙",
  },
  {
    hanzi: "庙会",
  },
  {
    hanzi: "寺庙",
  },
  {
    hanzi: "挣扎",
  },
  {
    hanzi: "鹿",
  },
  {
    hanzi: "捕捉",
  },
  {
    hanzi: "捉迷藏",
  },
  {
    hanzi: "庸俗",
  },
  {
    hanzi: "中庸",
  },
  {
    hanzi: "平庸",
  },
  {
    hanzi: "掏钱",
  },
  {
    hanzi: "蔗糖",
  },
  {
    hanzi: "矣",
  },
  {
    hanzi: "遮",
  },
  {
    hanzi: "遮盖",
  },
  {
    hanzi: "挨家挨户",
  },
  {
    hanzi: "派遣",
  },
  {
    hanzi: "消遣",
  },
  {
    hanzi: "宠爱",
  },
  {
    hanzi: "谴责",
  },
  {
    hanzi: "世袭",
  },
  {
    hanzi: "抄袭",
  },
  {
    hanzi: "擅长",
  },
  {
    hanzi: "擅自",
  },
  {
    hanzi: "拉拢",
  },
  {
    hanzi: "颤抖",
  },
  {
    hanzi: "灯笼",
  },
  {
    hanzi: "笼统",
  },
  {
    hanzi: "颠倒",
  },
  {
    hanzi: "颠覆",
  },
  {
    hanzi: "绘声绘色",
  },
  {
    hanzi: "描绘",
  },
  {
    hanzi: "巅峰",
  },
  {
    hanzi: "一锅粥",
  },
  {
    hanzi: "喘",
  },
  {
    hanzi: "喘息",
  },
  {
    hanzi: "拐弯",
  },
  {
    hanzi: "急转弯",
  },
  {
    hanzi: "走弯路",
  },
  {
    hanzi: "弯腰",
  },
  {
    hanzi: "嘴唇",
  },
  {
    hanzi: "沉闷",
  },
  {
    hanzi: "烦闷",
  },
  {
    hanzi: "纳闷儿",
  },
  {
    hanzi: "咽喉",
  },
  {
    hanzi: "热腾腾",
  },
  {
    hanzi: "折腾",
  },
  {
    hanzi: "奔腾",
  },
  {
    hanzi: "喉咙",
  },
  {
    hanzi: "变幻莫测",
  },
  {
    hanzi: "幻觉",
  },
  {
    hanzi: "幻影",
  },
  {
    hanzi: "科幻",
  },
  {
    hanzi: "梦幻",
  },
  {
    hanzi: "虚幻",
  },
  {
    hanzi: "吼",
  },
  {
    hanzi: "牲畜",
  },
  {
    hanzi: "解剖",
  },
  {
    hanzi: "含蓄",
  },
  {
    hanzi: "积蓄",
  },
  {
    hanzi: "呼吁",
  },
  {
    hanzi: "荣誉",
  },
  {
    hanzi: "声誉",
  },
  {
    hanzi: "信誉",
  },
  {
    hanzi: "害臊",
  },
  {
    hanzi: "袖手旁观",
  },
  {
    hanzi: "暴躁",
  },
  {
    hanzi: "烦躁",
  },
  {
    hanzi: "浮躁",
  },
  {
    hanzi: "焦躁",
  },
  {
    hanzi: "主妇",
  },
  {
    hanzi: "创始人",
  },
  {
    hanzi: "评委",
  },
  {
    hanzi: "助威",
  },
  {
    hanzi: "海藻",
  },
  {
    hanzi: "示威",
  },
  {
    hanzi: "求婚",
  },
  {
    hanzi: "订婚",
  },
  {
    hanzi: "位子",
  },
  {
    hanzi: "枯燥",
  },
  {
    hanzi: "干燥",
  },
  {
    hanzi: "卡子",
  },
  {
    hanzi: "卷子",
  },
  {
    hanzi: "口子",
  },
  {
    hanzi: "学子",
  },
  {
    hanzi: "灿烂",
  },
  {
    hanzi: "帘子",
  },
  {
    hanzi: "底子",
  },
  {
    hanzi: "弟子",
  },
  {
    hanzi: "担子",
  },
  {
    hanzi: "山岭",
  },
  {
    hanzi: "架子",
  },
  {
    hanzi: "梯子",
  },
  {
    hanzi: "点子",
  },
  {
    hanzi: "片子",
  },
  {
    hanzi: "辉煌",
  },
  {
    hanzi: "管子",
  },
  {
    hanzi: "豆子",
  },
  {
    hanzi: "路子",
  },
  {
    hanzi: "身子",
  },
  {
    hanzi: "碧绿",
  },
  {
    hanzi: "金子",
  },
  {
    hanzi: "老字号",
  },
  {
    hanzi: "十字路口",
  },
  {
    hanzi: "内存",
  },
  {
    hanzi: "惊心动魄",
  },
  {
    hanzi: "魄力",
  },
  {
    hanzi: "气魄",
  },
  {
    hanzi: "幸存",
  },
  {
    hanzi: "四季",
  },
  {
    hanzi: "淡季",
  },
  {
    hanzi: "国学",
  },
  {
    hanzi: "魅力",
  },
  {
    hanzi: "求学",
  },
  {
    hanzi: "治学",
  },
  {
    hanzi: "讲学",
  },
  {
    hanzi: "转学",
  },
  {
    hanzi: "铝",
  },
  {
    hanzi: "退学",
  },
  {
    hanzi: "安宁",
  },
  {
    hanzi: "坚守",
  },
  {
    hanzi: "公安局",
  },
  {
    hanzi: "铭记",
  },
  {
    hanzi: "座右铭",
  },
  {
    hanzi: "大宗",
  },
  {
    hanzi: "军官",
  },
  {
    hanzi: "警官",
  },
  {
    hanzi: "不定",
  },
  {
    hanzi: "钉",
  },
  {
    hanzi: "钉子",
  },
  {
    hanzi: "碰钉子",
  },
  {
    hanzi: "假定",
  },
  {
    hanzi: "判定",
  },
  {
    hanzi: "协定",
  },
  {
    hanzi: "安定",
  },
  {
    hanzi: "锡",
  },
  {
    hanzi: "审定",
  },
  {
    hanzi: "必定",
  },
  {
    hanzi: "断定",
  },
  {
    hanzi: "注定",
  },
  {
    hanzi: "曝光",
  },
  {
    hanzi: "界定",
  },
  {
    hanzi: "裁定",
  },
  {
    hanzi: "评定",
  },
  {
    hanzi: "限定",
  },
  {
    hanzi: "花瓣",
  },
  {
    hanzi: "预定",
  },
  {
    hanzi: "不宜",
  },
  {
    hanzi: "事宜",
  },
  {
    hanzi: "适宜",
  },
  {
    hanzi: "括弧",
  },
  {
    hanzi: "国宝",
  },
  {
    hanzi: "瑰宝",
  },
  {
    hanzi: "软实力",
  },
  {
    hanzi: "老实说",
  },
  {
    hanzi: "弥补",
  },
  {
    hanzi: "弥漫",
  },
  {
    hanzi: "充实",
  },
  {
    hanzi: "务实",
  },
  {
    hanzi: "坚实",
  },
  {
    hanzi: "如实",
  },
  {
    hanzi: "彩霞",
  },
  {
    hanzi: "核实",
  },
  {
    hanzi: "着实",
  },
  {
    hanzi: "纪实",
  },
  {
    hanzi: "评审",
  },
  {
    hanzi: "霜",
  },
  {
    hanzi: "雪上加霜",
  },
  {
    hanzi: "作客",
  },
  {
    hanzi: "黑客",
  },
  {
    hanzi: "温室",
  },
  {
    hanzi: "皇室",
  },
  {
    hanzi: "车厢",
  },
  {
    hanzi: "皇宫",
  },
  {
    hanzi: "受害人",
  },
  {
    hanzi: "利害",
  },
  {
    hanzi: "媳妇",
  },
  {
    hanzi: "受害",
  },
  {
    hanzi: "妨害",
  },
  {
    hanzi: "杀害",
  },
  {
    hanzi: "要害",
  },
  {
    hanzi: "明媚",
  },
  {
    hanzi: "一家人",
  },
  {
    hanzi: "好家伙",
  },
  {
    hanzi: "无家可归",
  },
  {
    hanzi: "大家庭",
  },
  {
    hanzi: "屠杀",
  },
  {
    hanzi: "家家户户",
  },
  {
    hanzi: "私家车",
  },
  {
    hanzi: "厂家",
  },
  {
    hanzi: "成家",
  },
  {
    hanzi: "奸诈",
  },
  {
    hanzi: "欺诈",
  },
  {
    hanzi: "敲诈",
  },
  {
    hanzi: "诈骗",
  },
  {
    hanzi: "独家",
  },
  {
    hanzi: "管家",
  },
  {
    hanzi: "行家",
  },
  {
    hanzi: "输家",
  },
  {
    hanzi: "谣言",
  },
  {
    hanzi: "不容",
  },
  {
    hanzi: "从容",
  },
  {
    hanzi: "包容",
  },
  {
    hanzi: "宽容",
  },
  {
    hanzi: "大肆",
  },
  {
    hanzi: "放肆",
  },
  {
    hanzi: "阵容",
  },
  {
    hanzi: "来宾",
  },
  {
    hanzi: "贵宾",
  },
  {
    hanzi: "住宿",
  },
  {
    hanzi: "时髦",
  },
  {
    hanzi: "归宿",
  },
  {
    hanzi: "食宿",
  },
  {
    hanzi: "严密",
  },
  {
    hanzi: "周密",
  },
  {
    hanzi: "碟",
  },
  {
    hanzi: "光碟",
  },
  {
    hanzi: "飞碟",
  },
  {
    hanzi: "机密",
  },
  {
    hanzi: "致富",
  },
  {
    hanzi: "贫富",
  },
  {
    hanzi: "检察",
  },
  {
    hanzi: "忙碌",
  },
  {
    hanzi: "视察",
  },
  {
    hanzi: "分寸",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "而言",
  },
  {
    hanzi: "光明磊落",
  },
  {
    hanzi: "作对",
  },
  {
    hanzi: "核对",
  },
  {
    hanzi: "搜寻",
  },
  {
    hanzi: "误导",
  },
  {
    hanzi: "蘑菇",
  },
  {
    hanzi: "密封",
  },
  {
    hanzi: "投射",
  },
  {
    hanzi: "折射",
  },
  {
    hanzi: "穿小鞋",
  },
  {
    hanzi: "芦花",
  },
  {
    hanzi: "狭小",
  },
  {
    hanzi: "极少数",
  },
  {
    hanzi: "高尔夫球",
  },
  {
    hanzi: "和尚",
  },
  {
    hanzi: "菊花",
  },
  {
    hanzi: "芭蕾",
  },
  {
    hanzi: "风尚",
  },
  {
    hanzi: "也就是说",
  },
  {
    hanzi: "造就",
  },
  {
    hanzi: "详尽",
  },
  {
    hanzi: "底蕴",
  },
  {
    hanzi: "蕴藏",
  },
  {
    hanzi: "蕴涵",
  },
  {
    hanzi: "全局",
  },
  {
    hanzi: "出局",
  },
  {
    hanzi: "大局",
  },
  {
    hanzi: "底层",
  },
  {
    hanzi: "光缆",
  },
  {
    hanzi: "缆车",
  },
  {
    hanzi: "电缆",
  },
  {
    hanzi: "阶层",
  },
  {
    hanzi: "定居",
  },
  {
    hanzi: "历届",
  },
  {
    hanzi: "画展",
  },
  {
    hanzi: "揽",
  },
  {
    hanzi: "大包大揽",
  },
  {
    hanzi: "一揽子",
  },
  {
    hanzi: "招揽",
  },
  {
    hanzi: "下属",
  },
  {
    hanzi: "归属",
  },
  {
    hanzi: "所属",
  },
  {
    hanzi: "下山",
  },
  {
    hanzi: "拌",
  },
  {
    hanzi: "搅拌",
  },
  {
    hanzi: "冰山",
  },
  {
    hanzi: "出山",
  },
  {
    hanzi: "火山",
  },
  {
    hanzi: "雪山",
  },
  {
    hanzi: "背叛",
  },
  {
    hanzi: "叛逆",
  },
  {
    hanzi: "叛徒",
  },
  {
    hanzi: "高山",
  },
  {
    hanzi: "半岛",
  },
  {
    hanzi: "高峰期",
  },
  {
    hanzi: "山川",
  },
  {
    hanzi: "捏",
  },
  {
    hanzi: "人工智能",
  },
  {
    hanzi: "义工",
  },
  {
    hanzi: "动工",
  },
  {
    hanzi: "开工",
  },
  {
    hanzi: "撰写",
  },
  {
    hanzi: "撰文",
  },
  {
    hanzi: "灵巧",
  },
  {
    hanzi: "偏差",
  },
  {
    hanzi: "反差",
  },
  {
    hanzi: "相差",
  },
  {
    hanzi: "熙熙攘攘",
  },
  {
    hanzi: "落差",
  },
  {
    hanzi: "误差",
  },
  {
    hanzi: "顺差",
  },
  {
    hanzi: "知己",
  },
  {
    hanzi: "土壤",
  },
  {
    hanzi: "不已",
  },
  {
    hanzi: "而已",
  },
  {
    hanzi: "菜市场",
  },
  {
    hanzi: "夜市",
  },
  {
    hanzi: "镶",
  },
  {
    hanzi: "发布会",
  },
  {
    hanzi: "散布",
  },
  {
    hanzi: "导师",
  },
  {
    hanzi: "热带",
  },
  {
    hanzi: "嚷",
  },
  {
    hanzi: "皮带",
  },
  {
    hanzi: "附带",
  },
  {
    hanzi: "缺席",
  },
  {
    hanzi: "平常心",
  },
  {
    hanzi: "曰",
  },
  {
    hanzi: "反常",
  },
  {
    hanzi: "往常",
  },
  {
    hanzi: "大幅度",
  },
  {
    hanzi: "篇幅",
  },
  {
    hanzi: "海啸",
  },
  {
    hanzi: "内幕",
  },
  {
    hanzi: "字幕",
  },
  {
    hanzi: "序幕",
  },
  {
    hanzi: "银幕",
  },
  {
    hanzi: "呐喊",
  },
  {
    hanzi: "说干就干",
  },
  {
    hanzi: "骨干",
  },
  {
    hanzi: "和平共处",
  },
  {
    hanzi: "不平",
  },
  {
    hanzi: "嘲笑",
  },
  {
    hanzi: "嘲弄",
  },
  {
    hanzi: "天平",
  },
  {
    hanzi: "太平",
  },
  {
    hanzi: "生平",
  },
  {
    hanzi: "一年到头",
  },
  {
    hanzi: "比喻",
  },
  {
    hanzi: "家喻户晓",
  },
  {
    hanzi: "多年来",
  },
  {
    hanzi: "近年来",
  },
  {
    hanzi: "同年",
  },
  {
    hanzi: "成年",
  },
  {
    hanzi: "哗变",
  },
  {
    hanzi: "哗然",
  },
  {
    hanzi: "早年",
  },
  {
    hanzi: "晚年",
  },
  {
    hanzi: "来年",
  },
  {
    hanzi: "逐年",
  },
  {
    hanzi: "哑",
  },
  {
    hanzi: "庆幸",
  },
  {
    hanzi: "有幸",
  },
  {
    hanzi: "喜庆",
  },
  {
    hanzi: "病床",
  },
  {
    hanzi: "哄",
  },
  {
    hanzi: "哄堂大笑",
  },
  {
    hanzi: "工序",
  },
  {
    hanzi: "有序",
  },
  {
    hanzi: "宝库",
  },
  {
    hanzi: "呼应",
  },
  {
    hanzi: "瞩目",
  },
  {
    hanzi: "举世瞩目",
  },
  {
    hanzi: "响应",
  },
  {
    hanzi: "顺应",
  },
  {
    hanzi: "功底",
  },
  {
    hanzi: "首府",
  },
  {
    hanzi: "遗嘱",
  },
  {
    hanzi: "温度计",
  },
  {
    hanzi: "厚度",
  },
  {
    hanzi: "密度",
  },
  {
    hanzi: "尺度",
  },
  {
    hanzi: "叮嘱",
  },
  {
    hanzi: "极度",
  },
  {
    hanzi: "经度",
  },
  {
    hanzi: "进度",
  },
  {
    hanzi: "适度",
  },
  {
    hanzi: "请柬",
  },
  {
    hanzi: "限度",
  },
  {
    hanzi: "小康",
  },
  {
    hanzi: "兴建",
  },
  {
    hanzi: "波澜",
  },
  {
    hanzi: "封建",
  },
  {
    hanzi: "扩建",
  },
  {
    hanzi: "公开信",
  },
  {
    hanzi: "盛开",
  },
  {
    hanzi: "烫",
  },
  {
    hanzi: "优异",
  },
  {
    hanzi: "变异",
  },
  {
    hanzi: "怪异",
  },
  {
    hanzi: "丢弃",
  },
  {
    hanzi: "洽谈",
  },
  {
    hanzi: "融洽",
  },
  {
    hanzi: "遗弃",
  },
  {
    hanzi: "卖弄",
  },
  {
    hanzi: "各式各样",
  },
  {
    hanzi: "新式",
  },
  {
    hanzi: "衍生",
  },
  {
    hanzi: "格式",
  },
  {
    hanzi: "指引",
  },
  {
    hanzi: "子弟",
  },
  {
    hanzi: "开张",
  },
  {
    hanzi: "澄清",
  },
  {
    hanzi: "减弱",
  },
  {
    hanzi: "微弱",
  },
  {
    hanzi: "虚弱",
  },
  {
    hanzi: "软弱",
  },
  {
    hanzi: "橙汁",
  },
  {
    hanzi: "橙色",
  },
  {
    hanzi: "橙子",
  },
  {
    hanzi: "动弹",
  },
  {
    hanzi: "富强",
  },
  {
    hanzi: "要强",
  },
  {
    hanzi: "充当",
  },
  {
    hanzi: "凳子",
  },
  {
    hanzi: "得当",
  },
  {
    hanzi: "担当",
  },
  {
    hanzi: "每当",
  },
  {
    hanzi: "纪录片",
  },
  {
    hanzi: "蹬",
  },
  {
    hanzi: "目录",
  },
  {
    hanzi: "无形中",
  },
  {
    hanzi: "形形色色",
  },
  {
    hanzi: "图形",
  },
  {
    hanzi: "瞪",
  },
  {
    hanzi: "目瞪口呆",
  },
  {
    hanzi: "圆形",
  },
  {
    hanzi: "外形",
  },
  {
    hanzi: "无形",
  },
  {
    hanzi: "队形",
  },
  {
    hanzi: "睁",
  },
  {
    hanzi: "睁开",
  },
  {
    hanzi: "隐形",
  },
  {
    hanzi: "光彩",
  },
  {
    hanzi: "喝彩",
  },
  {
    hanzi: "缩影",
  },
  {
    hanzi: "盯",
  },
  {
    hanzi: "身影",
  },
  {
    hanzi: "透彻",
  },
  {
    hanzi: "向往",
  },
  {
    hanzi: "赶往",
  },
  {
    hanzi: "趁",
  },
  {
    hanzi: "趁机",
  },
  {
    hanzi: "趁早",
  },
  {
    hanzi: "趁着",
  },
  {
    hanzi: "过往",
  },
  {
    hanzi: "通往",
  },
  {
    hanzi: "飞往",
  },
  {
    hanzi: "长征",
  },
  {
    hanzi: "膨胀",
  },
  {
    hanzi: "通货膨胀",
  },
  {
    hanzi: "招待会",
  },
  {
    hanzi: "招待",
  },
  {
    hanzi: "有待",
  },
  {
    hanzi: "表彰",
  },
  {
    hanzi: "彰显",
  },
  {
    hanzi: "不得已",
  },
  {
    hanzi: "对得起",
  },
  {
    hanzi: "心得",
  },
  {
    hanzi: "非得",
  },
  {
    hanzi: "皱",
  },
  {
    hanzi: "皱纹",
  },
  {
    hanzi: "略微",
  },
  {
    hanzi: "细微",
  },
  {
    hanzi: "轻微",
  },
  {
    hanzi: "品德",
  },
  {
    hanzi: "虐待",
  },
  {
    hanzi: "美德",
  },
  {
    hanzi: "定心丸",
  },
  {
    hanzi: "好心人",
  },
  {
    hanzi: "一心一意",
  },
  {
    hanzi: "秩序",
  },
  {
    hanzi: "一心",
  },
  {
    hanzi: "多心",
  },
  {
    hanzi: "存心",
  },
  {
    hanzi: "募捐",
  },
  {
    hanzi: "招募",
  },
  {
    hanzi: "安心",
  },
  {
    hanzi: "忍心",
  },
  {
    hanzi: "操心",
  },
  {
    hanzi: "死心",
  },
  {
    hanzi: "勉强",
  },
  {
    hanzi: "甘心",
  },
  {
    hanzi: "留心",
  },
  {
    hanzi: "痛心",
  },
  {
    hanzi: "真心",
  },
  {
    hanzi: "勘探",
  },
  {
    hanzi: "精心",
  },
  {
    hanzi: "细心",
  },
  {
    hanzi: "良心",
  },
  {
    hanzi: "苦心",
  },
  {
    hanzi: "涝",
  },
  {
    hanzi: "身心",
  },
  {
    hanzi: "重心",
  },
  {
    hanzi: "顺心",
  },
  {
    hanzi: "黑心",
  },
  {
    hanzi: "捞",
  },
  {
    hanzi: "打捞",
  },
  {
    hanzi: "何必",
  },
  {
    hanzi: "务必",
  },
  {
    hanzi: "势必",
  },
  {
    hanzi: "回忆录",
  },
  {
    hanzi: "唠叨",
  },
  {
    hanzi: "励志",
  },
  {
    hanzi: "斗志",
  },
  {
    hanzi: "遗忘",
  },
  {
    hanzi: "欢快",
  },
  {
    hanzi: "韵味",
  },
  {
    hanzi: "纪念日",
  },
  {
    hanzi: "纪念馆",
  },
  {
    hanzi: "思念",
  },
  {
    hanzi: "挂念",
  },
  {
    hanzi: "瓷",
  },
  {
    hanzi: "陶瓷",
  },
  {
    hanzi: "瓷器",
  },
  {
    hanzi: "留念",
  },
  {
    hanzi: "情怀",
  },
  {
    hanzi: "满怀",
  },
  {
    hanzi: "事态",
  },
  {
    hanzi: "镶嵌",
  },
  {
    hanzi: "曲折",
  },
  {
    hanzi: "波折",
  },
  {
    hanzi: "转折",
  },
  {
    hanzi: "救护车",
  },
  {
    hanzi: "岳父",
  },
  {
    hanzi: "岳母",
  },
  {
    hanzi: "常态",
  },
  {
    hanzi: "神态",
  },
  {
    hanzi: "表态",
  },
  {
    hanzi: "生怕",
  },
  {
    hanzi: "虾",
  },
  {
    hanzi: "反思",
  },
  {
    hanzi: "心思",
  },
  {
    hanzi: "构思",
  },
  {
    hanzi: "沉思",
  },
  {
    hanzi: "蚊子",
  },
  {
    hanzi: "蚊帐",
  },
  {
    hanzi: "深思",
  },
  {
    hanzi: "危急",
  },
  {
    hanzi: "中性",
  },
  {
    hanzi: "人性",
  },
  {
    hanzi: "愚公移山",
  },
  {
    hanzi: "共性",
  },
  {
    hanzi: "天性",
  },
  {
    hanzi: "属性",
  },
  {
    hanzi: "弹性",
  },
  {
    hanzi: "愚蠢",
  },
  {
    hanzi: "恶性",
  },
  {
    hanzi: "感性",
  },
  {
    hanzi: "慢性",
  },
  {
    hanzi: "本性",
  },
  {
    hanzi: "旭日",
  },
  {
    hanzi: "索性",
  },
  {
    hanzi: "耐性",
  },
  {
    hanzi: "良性",
  },
  {
    hanzi: "阳性",
  },
  {
    hanzi: "间隙",
  },
  {
    hanzi: "空隙",
  },
  {
    hanzi: "阴性",
  },
  {
    hanzi: "隐性",
  },
  {
    hanzi: "恩怨",
  },
  {
    hanzi: "古怪",
  },
  {
    hanzi: "赐",
  },
  {
    hanzi: "赐教",
  },
  {
    hanzi: "恩赐",
  },
  {
    hanzi: "责怪",
  },
  {
    hanzi: "夜总会",
  },
  {
    hanzi: "留恋",
  },
  {
    hanzi: "迷恋",
  },
  {
    hanzi: "坝",
  },
  {
    hanzi: "出息",
  },
  {
    hanzi: "平息",
  },
  {
    hanzi: "气息",
  },
  {
    hanzi: "丑恶",
  },
  {
    hanzi: "堤",
  },
  {
    hanzi: "堤坝",
  },
  {
    hanzi: "凶恶",
  },
  {
    hanzi: "可恶",
  },
  {
    hanzi: "隐患",
  },
  {
    hanzi: "可悲",
  },
  {
    hanzi: "炉灶",
  },
  {
    hanzi: "交情",
  },
  {
    hanzi: "亲情",
  },
  {
    hanzi: "人情",
  },
  {
    hanzi: "剧情",
  },
  {
    hanzi: "删",
  },
  {
    hanzi: "删除",
  },
  {
    hanzi: "友情",
  },
  {
    hanzi: "国情",
  },
  {
    hanzi: "尽情",
  },
  {
    hanzi: "性情",
  },
  {
    hanzi: "丛林",
  },
  {
    hanzi: "恩情",
  },
  {
    hanzi: "敢情",
  },
  {
    hanzi: "无情",
  },
  {
    hanzi: "深情",
  },
  {
    hanzi: "巫婆",
  },
  {
    hanzi: "真情",
  },
  {
    hanzi: "行情",
  },
  {
    hanzi: "说情",
  },
  {
    hanzi: "隐情",
  },
  {
    hanzi: "耸立",
  },
  {
    hanzi: "耸肩",
  },
  {
    hanzi: "风情",
  },
  {
    hanzi: "受惊",
  },
  {
    hanzi: "怜惜",
  },
  {
    hanzi: "休想",
  },
  {
    hanzi: "叙述",
  },
  {
    hanzi: "回想",
  },
  {
    hanzi: "构想",
  },
  {
    hanzi: "着想",
  },
  {
    hanzi: "空想",
  },
  {
    hanzi: "驾驭",
  },
  {
    hanzi: "玩意儿",
  },
  {
    hanzi: "下意识",
  },
  {
    hanzi: "乐意",
  },
  {
    hanzi: "任意",
  },
  {
    hanzi: "步骤",
  },
  {
    hanzi: "骤然",
  },
  {
    hanzi: "暴风骤雨",
  },
  {
    hanzi: "会意",
  },
  {
    hanzi: "刻意",
  },
  {
    hanzi: "善意",
  },
  {
    hanzi: "在意",
  },
  {
    hanzi: "反驳",
  },
  {
    hanzi: "驳回",
  },
  {
    hanzi: "大意",
  },
  {
    hanzi: "好意",
  },
  {
    hanzi: "如意",
  },
  {
    hanzi: "寓意",
  },
  {
    hanzi: "骇人听闻",
  },
  {
    hanzi: "心意",
  },
  {
    hanzi: "恶意",
  },
  {
    hanzi: "执意",
  },
  {
    hanzi: "敬意",
  },
  {
    hanzi: "驮",
  },
  {
    hanzi: "无意",
  },
  {
    hanzi: "有意",
  },
  {
    hanzi: "本意",
  },
  {
    hanzi: "歉意",
  },
  {
    hanzi: "驯",
  },
  {
    hanzi: "用意",
  },
  {
    hanzi: "留意",
  },
  {
    hanzi: "示意",
  },
  {
    hanzi: "伤感",
  },
  {
    hanzi: "鸟巢",
  },
  {
    hanzi: "动感",
  },
  {
    hanzi: "反感",
  },
  {
    hanzi: "口感",
  },
  {
    hanzi: "同感",
  },
  {
    hanzi: "辐射",
  },
  {
    hanzi: "好感",
  },
  {
    hanzi: "观感",
  },
  {
    hanzi: "预感",
  },
  {
    hanzi: "但愿",
  },
  {
    hanzi: "没辙",
  },
  {
    hanzi: "宁愿",
  },
  {
    hanzi: "情愿",
  },
  {
    hanzi: "遗愿",
  },
  {
    hanzi: "慢慢来",
  },
  {
    hanzi: "敷",
  },
  {
    hanzi: "敷衍",
  },
  {
    hanzi: "偷懒",
  },
  {
    hanzi: "干戈",
  },
  {
    hanzi: "拍戏",
  },
  {
    hanzi: "演戏",
  },
  {
    hanzi: "宽敞",
  },
  {
    hanzi: "敞开",
  },
  {
    hanzi: "马戏",
  },
  {
    hanzi: "未成年人",
  },
  {
    hanzi: "促成",
  },
  {
    hanzi: "换成",
  },
  {
    hanzi: "收敛",
  },
  {
    hanzi: "冷战",
  },
  {
    hanzi: "住户",
  },
  {
    hanzi: "落户",
  },
  {
    hanzi: "私房钱",
  },
  {
    hanzi: "肇事",
  },
  {
    hanzi: "客房",
  },
  {
    hanzi: "新房",
  },
  {
    hanzi: "票房",
  },
  {
    hanzi: "有所",
  },
  {
    hanzi: "玫瑰",
  },
  {
    hanzi: "二手车",
  },
  {
    hanzi: "一手",
  },
  {
    hanzi: "下手",
  },
  {
    hanzi: "亲手",
  },
  {
    hanzi: "槐树",
  },
  {
    hanzi: "人手",
  },
  {
    hanzi: "出手",
  },
  {
    hanzi: "帮手",
  },
  {
    hanzi: "得手",
  },
  {
    hanzi: "血栓",
  },
  {
    hanzi: "把手",
  },
  {
    hanzi: "拿手",
  },
  {
    hanzi: "接手",
  },
  {
    hanzi: "新手",
  },
  {
    hanzi: "耍",
  },
  {
    hanzi: "玩耍",
  },
  {
    hanzi: "耍赖",
  },
  {
    hanzi: "杀手",
  },
  {
    hanzi: "水手",
  },
  {
    hanzi: "着手",
  },
  {
    hanzi: "顺手",
  },
  {
    hanzi: "儒学",
  },
  {
    hanzi: "儒家",
  },
  {
    hanzi: "黑手",
  },
  {
    hanzi: "口才",
  },
  {
    hanzi: "成才",
  },
  {
    hanzi: "依托",
  },
  {
    hanzi: "公仆",
  },
  {
    hanzi: "寄托",
  },
  {
    hanzi: "衬托",
  },
  {
    hanzi: "争执",
  },
  {
    hanzi: "固执",
  },
  {
    hanzi: "僧人",
  },
  {
    hanzi: "宣扬",
  },
  {
    hanzi: "张扬",
  },
  {
    hanzi: "首批",
  },
  {
    hanzi: "查找",
  },
  {
    hanzi: "蹭",
  },
  {
    hanzi: "传承",
  },
  {
    hanzi: "杂技",
  },
  {
    hanzi: "演技",
  },
  {
    hanzi: "竞技",
  },
  {
    hanzi: "愣",
  },
  {
    hanzi: "发愣",
  },
  {
    hanzi: "绝技",
  },
  {
    hanzi: "一把手",
  },
  {
    hanzi: "转折点",
  },
  {
    hanzi: "存折",
  },
  {
    hanzi: "不懈",
  },
  {
    hanzi: "坚持不懈",
  },
  {
    hanzi: "闸",
  },
  {
    hanzi: "守护",
  },
  {
    hanzi: "拥护",
  },
  {
    hanzi: "监护",
  },
  {
    hanzi: "看护",
  },
  {
    hanzi: "阐述",
  },
  {
    hanzi: "防护",
  },
  {
    hanzi: "上报",
  },
  {
    hanzi: "情报",
  },
  {
    hanzi: "电报",
  },
  {
    hanzi: "禅杖",
  },
  {
    hanzi: "怀抱",
  },
  {
    hanzi: "分担",
  },
  {
    hanzi: "绝招",
  },
  {
    hanzi: "兑换",
  },
  {
    hanzi: "奴隶",
  },
  {
    hanzi: "数据库",
  },
  {
    hanzi: "收据",
  },
  {
    hanzi: "关掉",
  },
  {
    hanzi: "手掌",
  },
  {
    hanzi: "逮",
  },
  {
    hanzi: "逮捕",
  },
  {
    hanzi: "编排",
  },
  {
    hanzi: "紧接着",
  },
  {
    hanzi: "交接",
  },
  {
    hanzi: "失控",
  },
  {
    hanzi: "逗",
  },
  {
    hanzi: "操控",
  },
  {
    hanzi: "举措",
  },
  {
    hanzi: "别提了",
  },
  {
    hanzi: "观摩",
  },
  {
    hanzi: "逾期",
  },
  {
    hanzi: "演播室",
  },
  {
    hanzi: "转播",
  },
  {
    hanzi: "重播",
  },
  {
    hanzi: "分支",
  },
  {
    hanzi: "遂心",
  },
  {
    hanzi: "开支",
  },
  {
    hanzi: "收支",
  },
  {
    hanzi: "透支",
  },
  {
    hanzi: "增收",
  },
  {
    hanzi: "谜",
  },
  {
    hanzi: "猜谜",
  },
  {
    hanzi: "谜团",
  },
  {
    hanzi: "谜底",
  },
  {
    hanzi: "谜语",
  },
  {
    hanzi: "征收",
  },
  {
    hanzi: "招收",
  },
  {
    hanzi: "验收",
  },
  {
    hanzi: "更改",
  },
  {
    hanzi: "惊讶",
  },
  {
    hanzi: "停放",
  },
  {
    hanzi: "存放",
  },
  {
    hanzi: "排放",
  },
  {
    hanzi: "家政",
  },
  {
    hanzi: "渊源",
  },
  {
    hanzi: "世故",
  },
  {
    hanzi: "无故",
  },
  {
    hanzi: "有效期",
  },
  {
    hanzi: "功效",
  },
  {
    hanzi: "哭泣",
  },
  {
    hanzi: "可歌可泣",
  },
  {
    hanzi: "失效",
  },
  {
    hanzi: "生效",
  },
  {
    hanzi: "见效",
  },
  {
    hanzi: "长效",
  },
  {
    hanzi: "泥潭",
  },
  {
    hanzi: "高效",
  },
  {
    hanzi: "无敌",
  },
  {
    hanzi: "灵敏",
  },
  {
    hanzi: "呼救",
  },
  {
    hanzi: "沾",
  },
  {
    hanzi: "沾光",
  },
  {
    hanzi: "搜救",
  },
  {
    hanzi: "求救",
  },
  {
    hanzi: "营救",
  },
  {
    hanzi: "解救",
  },
  {
    hanzi: "泻",
  },
  {
    hanzi: "腹泻",
  },
  {
    hanzi: "家教",
  },
  {
    hanzi: "指教",
  },
  {
    hanzi: "管教",
  },
  {
    hanzi: "竟敢",
  },
  {
    hanzi: "冤",
  },
  {
    hanzi: "解散",
  },
  {
    hanzi: "孝敬",
  },
  {
    hanzi: "致敬",
  },
  {
    hanzi: "大数据",
  },
  {
    hanzi: "冤枉",
  },
  {
    hanzi: "倒数",
  },
  {
    hanzi: "倒数",
  },
  {
    hanzi: "半数",
  },
  {
    hanzi: "招数",
  },
  {
    hanzi: "枣",
  },
  {
    hanzi: "红枣",
  },
  {
    hanzi: "整数",
  },
  {
    hanzi: "推敲",
  },
  {
    hanzi: "工整",
  },
  {
    hanzi: "人文",
  },
  {
    hanzi: "梳",
  },
  {
    hanzi: "梳子",
  },
  {
    hanzi: "梳理",
  },
  {
    hanzi: "全文",
  },
  {
    hanzi: "意料",
  },
  {
    hanzi: "意料之外",
  },
  {
    hanzi: "照料",
  },
  {
    hanzi: "枕头",
  },
  {
    hanzi: "肥料",
  },
  {
    hanzi: "预料",
  },
  {
    hanzi: "香料",
  },
  {
    hanzi: "断断续续",
  },
  {
    hanzi: "耽误",
  },
  {
    hanzi: "切断",
  },
  {
    hanzi: "推断",
  },
  {
    hanzi: "间断",
  },
  {
    hanzi: "伊斯兰教",
  },
  {
    hanzi: "通缉",
  },
  {
    hanzi: "高新技术",
  },
  {
    hanzi: "清新",
  },
  {
    hanzi: "全方位",
  },
  {
    hanzi: "立方米",
  },
  {
    hanzi: "咧嘴",
  },
  {
    hanzi: "大大咧咧",
  },
  {
    hanzi: "方方面面",
  },
  {
    hanzi: "单方面",
  },
  {
    hanzi: "上方",
  },
  {
    hanzi: "偏方",
  },
  {
    hanzi: "卑鄙",
  },
  {
    hanzi: "鄙视",
  },
  {
    hanzi: "处方",
  },
  {
    hanzi: "秘方",
  },
  {
    hanzi: "立方",
  },
  {
    hanzi: "药方",
  },
  {
    hanzi: "宽恕",
  },
  {
    hanzi: "种族",
  },
  {
    hanzi: "贵族",
  },
  {
    hanzi: "平日",
  },
  {
    hanzi: "当日",
  },
  {
    hanzi: "饶",
  },
  {
    hanzi: "饶恕",
  },
  {
    hanzi: "往日",
  },
  {
    hanzi: "改日",
  },
  {
    hanzi: "早日",
  },
  {
    hanzi: "末日",
  },
  {
    hanzi: "爵士",
  },
  {
    hanzi: "爵士乐",
  },
  {
    hanzi: "次日",
  },
  {
    hanzi: "怀旧",
  },
  {
    hanzi: "破旧",
  },
  {
    hanzi: "陈旧",
  },
  {
    hanzi: "嚼",
  },
  {
    hanzi: "从早到晚",
  },
  {
    hanzi: "一早",
  },
  {
    hanzi: "及早",
  },
  {
    hanzi: "尽早",
  },
  {
    hanzi: "喇叭",
  },
  {
    hanzi: "提早",
  },
  {
    hanzi: "过早",
  },
  {
    hanzi: "划时代",
  },
  {
    hanzi: "何时",
  },
  {
    hanzi: "扒",
  },
  {
    hanzi: "历时",
  },
  {
    hanzi: "计时",
  },
  {
    hanzi: "适时",
  },
  {
    hanzi: "分明",
  },
  {
    hanzi: "震撼",
  },
  {
    hanzi: "失明",
  },
  {
    hanzi: "查明",
  },
  {
    hanzi: "清明",
  },
  {
    hanzi: "照明",
  },
  {
    hanzi: "挠",
  },
  {
    hanzi: "阻挠",
  },
  {
    hanzi: "精明",
  },
  {
    hanzi: "高明",
  },
  {
    hanzi: "简易",
  },
  {
    hanzi: "外星人",
  },
  {
    hanzi: "掠夺",
  },
  {
    hanzi: "五星级",
  },
  {
    hanzi: "巨星",
  },
  {
    hanzi: "上映",
  },
  {
    hanzi: "放映",
  },
  {
    hanzi: "摧毁",
  },
  {
    hanzi: "青春期",
  },
  {
    hanzi: "真是的",
  },
  {
    hanzi: "当晚",
  },
  {
    hanzi: "吉普",
  },
  {
    hanzi: "瘫",
  },
  {
    hanzi: "科普",
  },
  {
    hanzi: "不景气",
  },
  {
    hanzi: "美景",
  },
  {
    hanzi: "明智",
  },
  {
    hanzi: "瘫痪",
  },
  {
    hanzi: "机智",
  },
  {
    hanzi: "避暑",
  },
  {
    hanzi: "供暖",
  },
  {
    hanzi: "保暖",
  },
  {
    hanzi: "幼稚",
  },
  {
    hanzi: "取暖",
  },
  {
    hanzi: "阴暗",
  },
  {
    hanzi: "火暴",
  },
  {
    hanzi: "粗暴",
  },
  {
    hanzi: "秧歌",
  },
  {
    hanzi: "小曲",
  },
  {
    hanzi: "享有",
  },
  {
    hanzi: "国有",
  },
  {
    hanzi: "少有",
  },
  {
    hanzi: "绣",
  },
  {
    hanzi: "刺绣",
  },
  {
    hanzi: "患有",
  },
  {
    hanzi: "私有",
  },
  {
    hanzi: "负有",
  },
  {
    hanzi: "不服气",
  },
  {
    hanzi: "萎缩",
  },
  {
    hanzi: "制服",
  },
  {
    hanzi: "礼服",
  },
  {
    hanzi: "声望",
  },
  {
    hanzi: "展望",
  },
  {
    hanzi: "妄想",
  },
  {
    hanzi: "指望",
  },
  {
    hanzi: "探望",
  },
  {
    hanzi: "观望",
  },
  {
    hanzi: "上期",
  },
  {
    hanzi: "娶",
  },
  {
    hanzi: "下期",
  },
  {
    hanzi: "任期",
  },
  {
    hanzi: "前期",
  },
  {
    hanzi: "后期",
  },
  {
    hanzi: "嫂子",
  },
  {
    hanzi: "晚期",
  },
  {
    hanzi: "活期",
  },
  {
    hanzi: "麻木",
  },
  {
    hanzi: "基本功",
  },
  {
    hanzi: "艘",
  },
  {
    hanzi: "亏本",
  },
  {
    hanzi: "标本",
  },
  {
    hanzi: "样本",
  },
  {
    hanzi: "手术室",
  },
  {
    hanzi: "妒忌",
  },
  {
    hanzi: "客机",
  },
  {
    hanzi: "投机",
  },
  {
    hanzi: "有机",
  },
  {
    hanzi: "嫉妒",
  },
  {
    hanzi: "生机",
  },
  {
    hanzi: "转机",
  },
  {
    hanzi: "随机",
  },
  {
    hanzi: "暗杀",
  },
  {
    hanzi: "矫正",
  },
  {
    hanzi: "主权",
  },
  {
    hanzi: "特权",
  },
  {
    hanzi: "职权",
  },
  {
    hanzi: "原材料",
  },
  {
    hanzi: "大厦",
  },
  {
    hanzi: "器材",
  },
  {
    hanzi: "木材",
  },
  {
    hanzi: "素材",
  },
  {
    hanzi: "药材",
  },
  {
    hanzi: "丹麦",
  },
  {
    hanzi: "无条件",
  },
  {
    hanzi: "借条",
  },
  {
    hanzi: "头条",
  },
  {
    hanzi: "教条",
  },
  {
    hanzi: "委婉",
  },
  {
    hanzi: "欠条",
  },
  {
    hanzi: "线条",
  },
  {
    hanzi: "从来不",
  },
  {
    hanzi: "历来",
  },
  {
    hanzi: "惋惜",
  },
  {
    hanzi: "向来",
  },
  {
    hanzi: "归来",
  },
  {
    hanzi: "由来",
  },
  {
    hanzi: "奖杯",
  },
  {
    hanzi: "怡然自得",
  },
  {
    hanzi: "宽松",
  },
  {
    hanzi: "叫板",
  },
  {
    hanzi: "拍板",
  },
  {
    hanzi: "木板",
  },
  {
    hanzi: "陶冶",
  },
  {
    hanzi: "冶金",
  },
  {
    hanzi: "太极",
  },
  {
    hanzi: "虚构",
  },
  {
    hanzi: "解析",
  },
  {
    hanzi: "少林寺",
  },
  {
    hanzi: "怠工",
  },
  {
    hanzi: "怠慢",
  },
  {
    hanzi: "硕果",
  },
  {
    hanzi: "糖果",
  },
  {
    hanzi: "感染力",
  },
  {
    hanzi: "复查",
  },
  {
    hanzi: "恳求",
  },
  {
    hanzi: "诚恳",
  },
  {
    hanzi: "搜查",
  },
  {
    hanzi: "招标",
  },
  {
    hanzi: "超标",
  },
  {
    hanzi: "达标",
  },
  {
    hanzi: "甩",
  },
  {
    hanzi: "建树",
  },
  {
    hanzi: "杨树",
  },
  {
    hanzi: "夜校",
  },
  {
    hanzi: "这样一来",
  },
  {
    hanzi: "雇佣",
  },
  {
    hanzi: "看样子",
  },
  {
    hanzi: "像样",
  },
  {
    hanzi: "花样",
  },
  {
    hanzi: "审核",
  },
  {
    hanzi: "疲倦",
  },
  {
    hanzi: "厌倦",
  },
  {
    hanzi: "人格",
  },
  {
    hanzi: "规格",
  },
  {
    hanzi: "个案",
  },
  {
    hanzi: "破案",
  },
  {
    hanzi: "巷",
  },
  {
    hanzi: "大街小巷",
  },
  {
    hanzi: "天桥",
  },
  {
    hanzi: "滑梯",
  },
  {
    hanzi: "阶梯",
  },
  {
    hanzi: "酒楼",
  },
  {
    hanzi: "保佑",
  },
  {
    hanzi: "一概",
  },
  {
    hanzi: "仅次于",
  },
  {
    hanzi: "人次",
  },
  {
    hanzi: "初次",
  },
  {
    hanzi: "租赁",
  },
  {
    hanzi: "狂欢",
  },
  {
    hanzi: "狂欢节",
  },
  {
    hanzi: "联欢",
  },
  {
    hanzi: "中止",
  },
  {
    hanzi: "俯首",
  },
  {
    hanzi: "举止",
  },
  {
    hanzi: "制止",
  },
  {
    hanzi: "静止",
  },
  {
    hanzi: "修正",
  },
  {
    hanzi: "俘获",
  },
  {
    hanzi: "端正",
  },
  {
    hanzi: "由此看来",
  },
  {
    hanzi: "据此",
  },
  {
    hanzi: "至此",
  },
  {
    hanzi: "俘虏",
  },
  {
    hanzi: "同步",
  },
  {
    hanzi: "地步",
  },
  {
    hanzi: "止步",
  },
  {
    hanzi: "让步",
  },
  {
    hanzi: "乞丐",
  },
  {
    hanzi: "起步",
  },
  {
    hanzi: "核武器",
  },
  {
    hanzi: "好歹",
  },
  {
    hanzi: "生死",
  },
  {
    hanzi: "钙",
  },
  {
    hanzi: "伤残",
  },
  {
    hanzi: "凶残",
  },
  {
    hanzi: "地段",
  },
  {
    hanzi: "时段",
  },
  {
    hanzi: "头衔",
  },
  {
    hanzi: "衔接",
  },
  {
    hanzi: "片段",
  },
  {
    hanzi: "路段",
  },
  {
    hanzi: "刚毅",
  },
  {
    hanzi: "继母",
  },
  {
    hanzi: "钩",
  },
  {
    hanzi: "挂钩",
  },
  {
    hanzi: "钩子",
  },
  {
    hanzi: "好比",
  },
  {
    hanzi: "出毛病",
  },
  {
    hanzi: "摄氏度",
  },
  {
    hanzi: "姓氏",
  },
  {
    hanzi: "弘扬",
  },
  {
    hanzi: "居民楼",
  },
  {
    hanzi: "平民",
  },
  {
    hanzi: "网民",
  },
  {
    hanzi: "股民",
  },
  {
    hanzi: "化险为夷",
  },
  {
    hanzi: "选民",
  },
  {
    hanzi: "热气球",
  },
  {
    hanzi: "争气",
  },
  {
    hanzi: "人气",
  },
  {
    hanzi: "帖子",
  },
  {
    hanzi: "请帖",
  },
  {
    hanzi: "口气",
  },
  {
    hanzi: "名气",
  },
  {
    hanzi: "和气",
  },
  {
    hanzi: "士气",
  },
  {
    hanzi: "手帕",
  },
  {
    hanzi: "大气",
  },
  {
    hanzi: "志气",
  },
  {
    hanzi: "怨气",
  },
  {
    hanzi: "热气",
  },
  {
    hanzi: "兜",
  },
  {
    hanzi: "兜售",
  },
  {
    hanzi: "神气",
  },
  {
    hanzi: "福气",
  },
  {
    hanzi: "节气",
  },
  {
    hanzi: "透气",
  },
  {
    hanzi: "丫头",
  },
  {
    hanzi: "风气",
  },
  {
    hanzi: "骨气",
  },
  {
    hanzi: "口水",
  },
  {
    hanzi: "放水",
  },
  {
    hanzi: "凸",
  },
  {
    hanzi: "凸显",
  },
  {
    hanzi: "流水",
  },
  {
    hanzi: "缩水",
  },
  {
    hanzi: "节水",
  },
  {
    hanzi: "风水",
  },
  {
    hanzi: "凹",
  },
  {
    hanzi: "凹凸",
  },
  {
    hanzi: "饮水",
  },
  {
    hanzi: "香水",
  },
  {
    hanzi: "乞求",
  },
  {
    hanzi: "供求",
  },
  {
    hanzi: "富裕",
  },
  {
    hanzi: "力求",
  },
  {
    hanzi: "探求",
  },
  {
    hanzi: "老汉",
  },
  {
    hanzi: "消沉",
  },
  {
    hanzi: "旗袍",
  },
  {
    hanzi: "长跑",
  },
  {
    hanzi: "风沙",
  },
  {
    hanzi: "运河",
  },
  {
    hanzi: "香油",
  },
  {
    hanzi: "救治",
  },
  {
    hanzi: "痒",
  },
  {
    hanzi: "根治",
  },
  {
    hanzi: "统治",
  },
  {
    hanzi: "源泉",
  },
  {
    hanzi: "刑法",
  },
  {
    hanzi: "瘾",
  },
  {
    hanzi: "上瘾",
  },
  {
    hanzi: "过瘾",
  },
  {
    hanzi: "司法",
  },
  {
    hanzi: "执法",
  },
  {
    hanzi: "疗法",
  },
  {
    hanzi: "风波",
  },
  {
    hanzi: "反馈",
  },
  {
    hanzi: "回馈",
  },
  {
    hanzi: "专注",
  },
  {
    hanzi: "喜洋洋",
  },
  {
    hanzi: "出洋相",
  },
  {
    hanzi: "冲洗",
  },
  {
    hanzi: "腐蚀",
  },
  {
    hanzi: "侵蚀",
  },
  {
    hanzi: "养活",
  },
  {
    hanzi: "复活",
  },
  {
    hanzi: "忙活",
  },
  {
    hanzi: "激活",
  },
  {
    hanzi: "坚韧",
  },
  {
    hanzi: "韧性",
  },
  {
    hanzi: "韧带",
  },
  {
    hanzi: "鲜活",
  },
  {
    hanzi: "气派",
  },
  {
    hanzi: "上流",
  },
  {
    hanzi: "客流",
  },
  {
    hanzi: "寡妇",
  },
  {
    hanzi: "河流",
  },
  {
    hanzi: "物流",
  },
  {
    hanzi: "风流",
  },
  {
    hanzi: "探测",
  },
  {
    hanzi: "酿造",
  },
  {
    hanzi: "推测",
  },
  {
    hanzi: "观测",
  },
  {
    hanzi: "接济",
  },
  {
    hanzi: "救济",
  },
  {
    hanzi: "酝酿",
  },
  {
    hanzi: "冲浪",
  },
  {
    hanzi: "流浪",
  },
  {
    hanzi: "风浪",
  },
  {
    hanzi: "下海",
  },
  {
    hanzi: "别墅",
  },
  {
    hanzi: "脑海",
  },
  {
    hanzi: "航海",
  },
  {
    hanzi: "旋涡",
  },
  {
    hanzi: "红润",
  },
  {
    hanzi: "牡丹",
  },
  {
    hanzi: "输液",
  },
  {
    hanzi: "冷淡",
  },
  {
    hanzi: "加深",
  },
  {
    hanzi: "体温",
  },
  {
    hanzi: "温馨",
  },
  {
    hanzi: "升温",
  },
  {
    hanzi: "常温",
  },
  {
    hanzi: "水温",
  },
  {
    hanzi: "上游",
  },
  {
    hanzi: "殷勤",
  },
  {
    hanzi: "下游",
  },
  {
    hanzi: "出游",
  },
  {
    hanzi: "郊游",
  },
  {
    hanzi: "来源于",
  },
  {
    hanzi: "尴尬",
  },
  {
    hanzi: "发源地",
  },
  {
    hanzi: "根源",
  },
  {
    hanzi: "水源",
  },
  {
    hanzi: "起源",
  },
  {
    hanzi: "炫耀",
  },
  {
    hanzi: "光滑",
  },
  {
    hanzi: "丰满",
  },
  {
    hanzi: "爆满",
  },
  {
    hanzi: "美满",
  },
  {
    hanzi: "毯子",
  },
  {
    hanzi: "地毯",
  },
  {
    hanzi: "饱满",
  },
  {
    hanzi: "主演",
  },
  {
    hanzi: "出演",
  },
  {
    hanzi: "新潮",
  },
  {
    hanzi: "冒昧",
  },
  {
    hanzi: "感激",
  },
  {
    hanzi: "导火索",
  },
  {
    hanzi: "上火",
  },
  {
    hanzi: "发火",
  },
  {
    hanzi: "猩猩",
  },
  {
    hanzi: "黑猩猩",
  },
  {
    hanzi: "大猩猩",
  },
  {
    hanzi: "点火",
  },
  {
    hanzi: "烟火",
  },
  {
    hanzi: "红火",
  },
  {
    hanzi: "红灯",
  },
  {
    hanzi: "大臣",
  },
  {
    hanzi: "功臣",
  },
  {
    hanzi: "绿灯",
  },
  {
    hanzi: "路灯",
  },
  {
    hanzi: "水灵灵",
  },
  {
    hanzi: "失灵",
  },
  {
    hanzi: "耕地",
  },
  {
    hanzi: "春耕",
  },
  {
    hanzi: "机灵",
  },
  {
    hanzi: "亮点",
  },
  {
    hanzi: "弱点",
  },
  {
    hanzi: "指点",
  },
  {
    hanzi: "歪",
  },
  {
    hanzi: "歪曲",
  },
  {
    hanzi: "疑点",
  },
  {
    hanzi: "网点",
  },
  {
    hanzi: "要点",
  },
  {
    hanzi: "难点",
  },
  {
    hanzi: "缸",
  },
  {
    hanzi: "提炼",
  },
  {
    hanzi: "剧烈",
  },
  {
    hanzi: "香烟",
  },
  {
    hanzi: "厌烦",
  },
  {
    hanzi: "窑",
  },
  {
    hanzi: "焚烧",
  },
  {
    hanzi: "看热闹",
  },
  {
    hanzi: "亲热",
  },
  {
    hanzi: "发热",
  },
  {
    hanzi: "窍门",
  },
  {
    hanzi: "火热",
  },
  {
    hanzi: "狂热",
  },
  {
    hanzi: "自然界",
  },
  {
    hanzi: "公然",
  },
  {
    hanzi: "窜",
  },
  {
    hanzi: "固然",
  },
  {
    hanzi: "关照",
  },
  {
    hanzi: "写照",
  },
  {
    hanzi: "参照",
  },
  {
    hanzi: "偷窥",
  },
  {
    hanzi: "对照",
  },
  {
    hanzi: "牌照",
  },
  {
    hanzi: "心爱",
  },
  {
    hanzi: "敬爱",
  },
  {
    hanzi: "窟窿",
  },
  {
    hanzi: "继父",
  },
  {
    hanzi: "卡片",
  },
  {
    hanzi: "大片",
  },
  {
    hanzi: "胶片",
  },
  {
    hanzi: "窒息",
  },
  {
    hanzi: "改版",
  },
  {
    hanzi: "奖牌",
  },
  {
    hanzi: "招牌",
  },
  {
    hanzi: "王牌",
  },
  {
    hanzi: "窘迫",
  },
  {
    hanzi: "吹牛",
  },
  {
    hanzi: "产物",
  },
  {
    hanzi: "作物",
  },
  {
    hanzi: "实物",
  },
  {
    hanzi: "榨",
  },
  {
    hanzi: "怪物",
  },
  {
    hanzi: "财物",
  },
  {
    hanzi: "遗物",
  },
  {
    hanzi: "奇特",
  },
  {
    hanzi: "把柄",
  },
  {
    hanzi: "冒犯",
  },
  {
    hanzi: "罪犯",
  },
  {
    hanzi: "告状",
  },
  {
    hanzi: "几率",
  },
  {
    hanzi: "杠杆",
  },
  {
    hanzi: "杠铃",
  },
  {
    hanzi: "功率",
  },
  {
    hanzi: "表率",
  },
  {
    hanzi: "光环",
  },
  {
    hanzi: "兑现",
  },
  {
    hanzi: "桩",
  },
  {
    hanzi: "再现",
  },
  {
    hanzi: "显现",
  },
  {
    hanzi: "重现",
  },
  {
    hanzi: "接班人",
  },
  {
    hanzi: "两栖",
  },
  {
    hanzi: "栖息",
  },
  {
    hanzi: "夜班",
  },
  {
    hanzi: "接班",
  },
  {
    hanzi: "台球",
  },
  {
    hanzi: "环球",
  },
  {
    hanzi: "腐朽",
  },
  {
    hanzi: "代理人",
  },
  {
    hanzi: "按理说",
  },
  {
    hanzi: "管理费",
  },
  {
    hanzi: "不理",
  },
  {
    hanzi: "书橱",
  },
  {
    hanzi: "受理",
  },
  {
    hanzi: "常理",
  },
  {
    hanzi: "护理",
  },
  {
    hanzi: "推理",
  },
  {
    hanzi: "门槛",
  },
  {
    hanzi: "料理",
  },
  {
    hanzi: "无理",
  },
  {
    hanzi: "生理",
  },
  {
    hanzi: "自理",
  },
  {
    hanzi: "棺材",
  },
  {
    hanzi: "抗生素",
  },
  {
    hanzi: "亲生",
  },
  {
    hanzi: "养生",
  },
  {
    hanzi: "天生",
  },
  {
    hanzi: "椰子",
  },
  {
    hanzi: "新生",
  },
  {
    hanzi: "终生",
  },
  {
    hanzi: "逃生",
  },
  {
    hanzi: "试用期",
  },
  {
    hanzi: "船桨",
  },
  {
    hanzi: "饮用水",
  },
  {
    hanzi: "不用说",
  },
  {
    hanzi: "借用",
  },
  {
    hanzi: "公用",
  },
  {
    hanzi: "揉",
  },
  {
    hanzi: "动用",
  },
  {
    hanzi: "占用",
  },
  {
    hanzi: "备用",
  },
  {
    hanzi: "家用",
  },
  {
    hanzi: "抒情",
  },
  {
    hanzi: "引用",
  },
  {
    hanzi: "服用",
  },
  {
    hanzi: "民用",
  },
  {
    hanzi: "管用",
  },
  {
    hanzi: "捣乱",
  },
  {
    hanzi: "聘用",
  },
  {
    hanzi: "试用",
  },
  {
    hanzi: "选用",
  },
  {
    hanzi: "食用",
  },
  {
    hanzi: "拱",
  },
  {
    hanzi: "发电机",
  },
  {
    hanzi: "核电站",
  },
  {
    hanzi: "停电",
  },
  {
    hanzi: "彩电",
  },
  {
    hanzi: "扳",
  },
  {
    hanzi: "来电",
  },
  {
    hanzi: "勾画",
  },
  {
    hanzi: "国画",
  },
  {
    hanzi: "年画",
  },
  {
    hanzi: "搁",
  },
  {
    hanzi: "搁浅",
  },
  {
    hanzi: "搁置",
  },
  {
    hanzi: "耽搁",
  },
  {
    hanzi: "油画",
  },
  {
    hanzi: "世界级",
  },
  {
    hanzi: "交界",
  },
  {
    hanzi: "境界",
  },
  {
    hanzi: "捂",
  },
  {
    hanzi: "眼界",
  },
  {
    hanzi: "边界",
  },
  {
    hanzi: "收留",
  },
  {
    hanzi: "残留",
  },
  {
    hanzi: "攒",
  },
  {
    hanzi: "遗留",
  },
  {
    hanzi: "省略",
  },
  {
    hanzi: "粗略",
  },
  {
    hanzi: "领略",
  },
  {
    hanzi: "搓",
  },
  {
    hanzi: "可疑",
  },
  {
    hanzi: "迟疑",
  },
  {
    hanzi: "心病",
  },
  {
    hanzi: "病症",
  },
  {
    hanzi: "揣",
  },
  {
    hanzi: "揣摩",
  },
  {
    hanzi: "揣测",
  },
  {
    hanzi: "悲痛",
  },
  {
    hanzi: "说白了",
  },
  {
    hanzi: "对白",
  },
  {
    hanzi: "白白",
  },
  {
    hanzi: "捆",
  },
  {
    hanzi: "捆绑",
  },
  {
    hanzi: "空白",
  },
  {
    hanzi: "表白",
  },
  {
    hanzi: "黑白",
  },
  {
    hanzi: "目的地",
  },
  {
    hanzi: "沐浴露",
  },
  {
    hanzi: "总的来说",
  },
  {
    hanzi: "得益于",
  },
  {
    hanzi: "公益",
  },
  {
    hanzi: "公益性",
  },
  {
    hanzi: "受益",
  },
  {
    hanzi: "浏览",
  },
  {
    hanzi: "浏览器",
  },
  {
    hanzi: "有益",
  },
  {
    hanzi: "算盘",
  },
  {
    hanzi: "丰盛",
  },
  {
    hanzi: "同盟",
  },
  {
    hanzi: "洗涤剂",
  },
  {
    hanzi: "剧目",
  },
  {
    hanzi: "心目",
  },
  {
    hanzi: "科目",
  },
  {
    hanzi: "醒目",
  },
  {
    hanzi: "混浊",
  },
  {
    hanzi: "正直",
  },
  {
    hanzi: "亮相",
  },
  {
    hanzi: "竞相",
  },
  {
    hanzi: "反省",
  },
  {
    hanzi: "渺小",
  },
  {
    hanzi: "偷看",
  },
  {
    hanzi: "别看",
  },
  {
    hanzi: "察看",
  },
  {
    hanzi: "小看",
  },
  {
    hanzi: "防汛",
  },
  {
    hanzi: "清真寺",
  },
  {
    hanzi: "当真",
  },
  {
    hanzi: "果真",
  },
  {
    hanzi: "着眼",
  },
  {
    hanzi: "鼻涕",
  },
  {
    hanzi: "鼻涕虫",
  },
  {
    hanzi: "心眼儿",
  },
  {
    hanzi: "字眼",
  },
  {
    hanzi: "抢眼",
  },
  {
    hanzi: "显眼",
  },
  {
    hanzi: "充沛",
  },
  {
    hanzi: "着眼于",
  },
  {
    hanzi: "红眼",
  },
  {
    hanzi: "转眼",
  },
  {
    hanzi: "当着",
  },
  {
    hanzi: "瀑布",
  },
  {
    hanzi: "怀着",
  },
  {
    hanzi: "执着",
  },
  {
    hanzi: "朝着",
  },
  {
    hanzi: "本着",
  },
  {
    hanzi: "溅",
  },
  {
    hanzi: "沉着",
  },
  {
    hanzi: "穿着",
  },
  {
    hanzi: "顺着",
  },
  {
    hanzi: "未知数",
  },
  {
    hanzi: "淌",
  },
  {
    hanzi: "流淌",
  },
  {
    hanzi: "哪知道",
  },
  {
    hanzi: "谁知道",
  },
  {
    hanzi: "不知",
  },
  {
    hanzi: "告知",
  },
  {
    hanzi: "沮丧",
  },
  {
    hanzi: "得知",
  },
  {
    hanzi: "无知",
  },
  {
    hanzi: "认知",
  },
  {
    hanzi: "简短",
  },
  {
    hanzi: "追溯",
  },
  {
    hanzi: "溯源",
  },
  {
    hanzi: "采矿",
  },
  {
    hanzi: "突破口",
  },
  {
    hanzi: "坚硬",
  },
  {
    hanzi: "强硬",
  },
  {
    hanzi: "鲨鱼",
  },
  {
    hanzi: "生硬",
  },
  {
    hanzi: "过硬",
  },
  {
    hanzi: "精确",
  },
  {
    hanzi: "饭碗",
  },
  {
    hanzi: "涮",
  },
  {
    hanzi: "显示器",
  },
  {
    hanzi: "公示",
  },
  {
    hanzi: "告示",
  },
  {
    hanzi: "标示",
  },
  {
    hanzi: "混淆",
  },
  {
    hanzi: "演示",
  },
  {
    hanzi: "预示",
  },
  {
    hanzi: "洗礼",
  },
  {
    hanzi: "报社",
  },
  {
    hanzi: "沏",
  },
  {
    hanzi: "精神病",
  },
  {
    hanzi: "留神",
  },
  {
    hanzi: "售票",
  },
  {
    hanzi: "月票",
  },
  {
    hanzi: "潦草",
  },
  {
    hanzi: "严禁",
  },
  {
    hanzi: "造福",
  },
  {
    hanzi: "无私",
  },
  {
    hanzi: "教科书",
  },
  {
    hanzi: "官僚",
  },
  {
    hanzi: "官僚主义",
  },
  {
    hanzi: "工科",
  },
  {
    hanzi: "文科",
  },
  {
    hanzi: "理科",
  },
  {
    hanzi: "奥秘",
  },
  {
    hanzi: "勤工俭学",
  },
  {
    hanzi: "节俭",
  },
  {
    hanzi: "公积金",
  },
  {
    hanzi: "累积",
  },
  {
    hanzi: "号称",
  },
  {
    hanzi: "声称",
  },
  {
    hanzi: "阀门",
  },
  {
    hanzi: "宣称",
  },
  {
    hanzi: "对称",
  },
  {
    hanzi: "自称",
  },
  {
    hanzi: "推移",
  },
  {
    hanzi: "侃大山",
  },
  {
    hanzi: "调侃",
  },
  {
    hanzi: "专程",
  },
  {
    hanzi: "全程",
  },
  {
    hanzi: "历程",
  },
  {
    hanzi: "旅程",
  },
  {
    hanzi: "伺候",
  },
  {
    hanzi: "伺机 sìjī",
  },
  {
    hanzi: "日程",
  },
  {
    hanzi: "流程",
  },
  {
    hanzi: "议程",
  },
  {
    hanzi: "起程",
  },
  {
    hanzi: "倚",
  },
  {
    hanzi: "路程",
  },
  {
    hanzi: "远程",
  },
  {
    hanzi: "稍稍",
  },
  {
    hanzi: "纳税人",
  },
  {
    hanzi: "偏僻",
  },
  {
    hanzi: "僻静",
  },
  {
    hanzi: "关税",
  },
  {
    hanzi: "纳税",
  },
  {
    hanzi: "安稳",
  },
  {
    hanzi: "沉稳",
  },
  {
    hanzi: "劈",
  },
  {
    hanzi: "终究",
  },
  {
    hanzi: "上空",
  },
  {
    hanzi: "时空",
  },
  {
    hanzi: "真空",
  },
  {
    hanzi: "倘若",
  },
  {
    hanzi: "高空",
  },
  {
    hanzi: "贯穿",
  },
  {
    hanzi: "中立",
  },
  {
    hanzi: "公立",
  },
  {
    hanzi: "倔",
  },
  {
    hanzi: "倔强",
  },
  {
    hanzi: "孤立",
  },
  {
    hanzi: "私立",
  },
  {
    hanzi: "站立",
  },
  {
    hanzi: "自立",
  },
  {
    hanzi: "嘱咐",
  },
  {
    hanzi: "订立",
  },
  {
    hanzi: "印章",
  },
  {
    hanzi: "违章",
  },
  {
    hanzi: "争端",
  },
  {
    hanzi: "吩咐",
  },
  {
    hanzi: "冷笑",
  },
  {
    hanzi: "取笑",
  },
  {
    hanzi: "可笑",
  },
  {
    hanzi: "好笑",
  },
  {
    hanzi: "哺育",
  },
  {
    hanzi: "苦笑",
  },
  {
    hanzi: "同等",
  },
  {
    hanzi: "建筑师",
  },
  {
    hanzi: "建筑物",
  },
  {
    hanzi: "喧哗",
  },
  {
    hanzi: "喧闹",
  },
  {
    hanzi: "解答",
  },
  {
    hanzi: "对策",
  },
  {
    hanzi: "计策",
  },
  {
    hanzi: "抽签",
  },
  {
    hanzi: "歌咏",
  },
  {
    hanzi: "精简",
  },
  {
    hanzi: "不算",
  },
  {
    hanzi: "划算",
  },
  {
    hanzi: "推算",
  },
  {
    hanzi: "嗜好",
  },
  {
    hanzi: "测算",
  },
  {
    hanzi: "盘算",
  },
  {
    hanzi: "保管",
  },
  {
    hanzi: "掌管",
  },
  {
    hanzi: "哆嗦",
  },
  {
    hanzi: "气管",
  },
  {
    hanzi: "水管",
  },
  {
    hanzi: "同类",
  },
  {
    hanzi: "面粉",
  },
  {
    hanzi: "嗅觉",
  },
  {
    hanzi: "味精",
  },
  {
    hanzi: "酒精",
  },
  {
    hanzi: "喜糖",
  },
  {
    hanzi: "体系",
  },
  {
    hanzi: "鳄鱼",
  },
  {
    hanzi: "激素",
  },
  {
    hanzi: "利索",
  },
  {
    hanzi: "思索",
  },
  {
    hanzi: "加紧",
  },
  {
    hanzi: "刁难",
  },
  {
    hanzi: "要紧",
  },
  {
    hanzi: "劳累",
  },
  {
    hanzi: "分红",
  },
  {
    hanzi: "眼红",
  },
  {
    hanzi: "叼",
  },
  {
    hanzi: "公约",
  },
  {
    hanzi: "条约",
  },
  {
    hanzi: "相约",
  },
  {
    hanzi: "违约",
  },
  {
    hanzi: "啃",
  },
  {
    hanzi: "隐约",
  },
  {
    hanzi: "下级",
  },
  {
    hanzi: "阶级",
  },
  {
    hanzi: "顶级",
  },
  {
    hanzi: "一声不吭",
  },
  {
    hanzi: "交纳",
  },
  {
    hanzi: "吸纳",
  },
  {
    hanzi: "归纳",
  },
  {
    hanzi: "接纳",
  },
  {
    hanzi: "唾液",
  },
  {
    hanzi: "造纸术",
  },
  {
    hanzi: "图纸",
  },
  {
    hanzi: "无线电",
  },
  {
    hanzi: "一线",
  },
  {
    hanzi: "吓唬",
  },
  {
    hanzi: "前线",
  },
  {
    hanzi: "天线",
  },
  {
    hanzi: "底线",
  },
  {
    hanzi: "曲线",
  },
  {
    hanzi: "菩萨",
  },
  {
    hanzi: "电线",
  },
  {
    hanzi: "界线",
  },
  {
    hanzi: "视线",
  },
  {
    hanzi: "排练",
  },
  {
    hanzi: "茂密",
  },
  {
    hanzi: "茂盛",
  },
  {
    hanzi: "演练",
  },
  {
    hanzi: "精练",
  },
  {
    hanzi: "苦练",
  },
  {
    hanzi: "剧组",
  },
  {
    hanzi: "蒜",
  },
  {
    hanzi: "精细",
  },
  {
    hanzi: "年终",
  },
  {
    hanzi: "不经意",
  },
  {
    hanzi: "一经",
  },
  {
    hanzi: "荧光",
  },
  {
    hanzi: "历经",
  },
  {
    hanzi: "取经",
  },
  {
    hanzi: "未经",
  },
  {
    hanzi: "财经",
  },
  {
    hanzi: "藤椅",
  },
  {
    hanzi: "了结",
  },
  {
    hanzi: "勾结",
  },
  {
    hanzi: "归结",
  },
  {
    hanzi: "情结",
  },
  {
    hanzi: "蔓延",
  },
  {
    hanzi: "症结",
  },
  {
    hanzi: "终结",
  },
  {
    hanzi: "集结",
  },
  {
    hanzi: "环绕",
  },
  {
    hanzi: "轻蔑",
  },
  {
    hanzi: "补给",
  },
  {
    hanzi: "脉络",
  },
  {
    hanzi: "统统",
  },
  {
    hanzi: "相继",
  },
  {
    hanzi: "苛刻",
  },
  {
    hanzi: "后续",
  },
  {
    hanzi: "三维",
  },
  {
    hanzi: "延缓",
  },
  {
    hanzi: "缓缓",
  },
  {
    hanzi: "朝三暮四",
  },
  {
    hanzi: "主编",
  },
  {
    hanzi: "改编",
  },
  {
    hanzi: "邮编",
  },
  {
    hanzi: "人缘儿",
  },
  {
    hanzi: "有的放矢",
  },
  {
    hanzi: "无缘",
  },
  {
    hanzi: "绝缘",
  },
  {
    hanzi: "血缘",
  },
  {
    hanzi: "压缩",
  },
  {
    hanzi: "树荫",
  },
  {
    hanzi: "收缩",
  },
  {
    hanzi: "畏缩",
  },
  {
    hanzi: "紧缩",
  },
  {
    hanzi: "退缩",
  },
  {
    hanzi: "茎",
  },
  {
    hanzi: "欠缺",
  },
  {
    hanzi: "残缺",
  },
  {
    hanzi: "短缺",
  },
  {
    hanzi: "紧缺",
  },
  {
    hanzi: "和蔼",
  },
  {
    hanzi: "电网",
  },
  {
    hanzi: "联网",
  },
  {
    hanzi: "得罪",
  },
  {
    hanzi: "处置",
  },
  {
    hanzi: "蘸",
  },
  {
    hanzi: "放置",
  },
  {
    hanzi: "健美",
  },
  {
    hanzi: "审美",
  },
  {
    hanzi: "秀美",
  },
  {
    hanzi: "礁石",
  },
  {
    hanzi: "鲜美",
  },
  {
    hanzi: "推翻",
  },
  {
    hanzi: "养老金",
  },
  {
    hanzi: "养老院",
  },
  {
    hanzi: "磋商",
  },
  {
    hanzi: "元老",
  },
  {
    hanzi: "使者",
  },
  {
    hanzi: "前者",
  },
  {
    hanzi: "后者",
  },
  {
    hanzi: "堆砌",
  },
  {
    hanzi: "继而",
  },
  {
    hanzi: "进而",
  },
  {
    hanzi: "刺耳",
  },
  {
    hanzi: "专职",
  },
  {
    hanzi: "磕",
  },
  {
    hanzi: "任职",
  },
  {
    hanzi: "免职",
  },
  {
    hanzi: "公职",
  },
  {
    hanzi: "在职",
  },
  {
    hanzi: "胆怯",
  },
  {
    hanzi: "就职",
  },
  {
    hanzi: "离职",
  },
  {
    hanzi: "对联",
  },
  {
    hanzi: "欢聚",
  },
  {
    hanzi: "抚恤",
  },
  {
    hanzi: "汇聚",
  },
  {
    hanzi: "化肥",
  },
  {
    hanzi: "生育",
  },
  {
    hanzi: "违背",
  },
  {
    hanzi: "警惕",
  },
  {
    hanzi: "取胜",
  },
  {
    hanzi: "获胜",
  },
  {
    hanzi: "心胸",
  },
  {
    hanzi: "正能量",
  },
  {
    hanzi: "威慑",
  },
  {
    hanzi: "万能",
  },
  {
    hanzi: "体能",
  },
  {
    hanzi: "全能",
  },
  {
    hanzi: "无能",
  },
  {
    hanzi: "慷慨",
  },
  {
    hanzi: "本能",
  },
  {
    hanzi: "核能",
  },
  {
    hanzi: "血脉",
  },
  {
    hanzi: "手脚",
  },
  {
    hanzi: "惭愧",
  },
  {
    hanzi: "解脱",
  },
  {
    hanzi: "丢脸",
  },
  {
    hanzi: "发脾气",
  },
  {
    hanzi: "大腕儿",
  },
  {
    hanzi: "惦记",
  },
  {
    hanzi: "手腕",
  },
  {
    hanzi: "出自",
  },
  {
    hanzi: "以至于",
  },
  {
    hanzi: "甚至于",
  },
  {
    hanzi: "悼念",
  },
  {
    hanzi: "哀悼",
  },
  {
    hanzi: "追悼会",
  },
  {
    hanzi: "乃至",
  },
  {
    hanzi: "直至",
  },
  {
    hanzi: "以致",
  },
  {
    hanzi: "兴致",
  },
  {
    hanzi: "绰号",
  },
  {
    hanzi: "阔绰",
  },
  {
    hanzi: "别致",
  },
  {
    hanzi: "标致",
  },
  {
    hanzi: "标致",
  },
  {
    hanzi: "精致",
  },
  {
    hanzi: "演绎",
  },
  {
    hanzi: "络绎不绝",
  },
  {
    hanzi: "歌舞",
  },
  {
    hanzi: "龙舟",
  },
  {
    hanzi: "游船",
  },
  {
    hanzi: "改良",
  },
  {
    hanzi: "丝绸",
  },
  {
    hanzi: "本色",
  },
  {
    hanzi: "眼色",
  },
  {
    hanzi: "演艺圈",
  },
  {
    hanzi: "学艺",
  },
  {
    hanzi: "绞",
  },
  {
    hanzi: "手艺",
  },
  {
    hanzi: "技艺",
  },
  {
    hanzi: "佳节",
  },
  {
    hanzi: "关节",
  },
  {
    hanzi: "缅怀",
  },
  {
    hanzi: "脱节",
  },
  {
    hanzi: "过节",
  },
  {
    hanzi: "零花钱",
  },
  {
    hanzi: "火花",
  },
  {
    hanzi: "绽放",
  },
  {
    hanzi: "何苦",
  },
  {
    hanzi: "刻苦",
  },
  {
    hanzi: "受苦",
  },
  {
    hanzi: "吃苦",
  },
  {
    hanzi: "纬度",
  },
  {
    hanzi: "诉苦",
  },
  {
    hanzi: "精英",
  },
  {
    hanzi: "典范",
  },
  {
    hanzi: "师范",
  },
  {
    hanzi: "束缚",
  },
  {
    hanzi: "风范",
  },
  {
    hanzi: "起草",
  },
  {
    hanzi: "火药",
  },
  {
    hanzi: "荣获",
  },
  {
    hanzi: "绷",
  },
  {
    hanzi: "绷带",
  },
  {
    hanzi: "私营",
  },
  {
    hanzi: "野营",
  },
  {
    hanzi: "阵营",
  },
  {
    hanzi: "下落",
  },
  {
    hanzi: "绯闻",
  },
  {
    hanzi: "冷落",
  },
  {
    hanzi: "坐落",
  },
  {
    hanzi: "失落",
  },
  {
    hanzi: "绅士",
  },
  {
    hanzi: "段落",
  },
  {
    hanzi: "没落",
  },
  {
    hanzi: "着落",
  },
  {
    hanzi: "脱落",
  },
  {
    hanzi: "缕",
  },
  {
    hanzi: "角落",
  },
  {
    hanzi: "专著",
  },
  {
    hanzi: "单薄",
  },
  {
    hanzi: "宝藏",
  },
  {
    hanzi: "搂",
  },
  {
    hanzi: "矿藏",
  },
  {
    hanzi: "马虎",
  },
  {
    hanzi: "疑虑",
  },
  {
    hanzi: "顾虑",
  },
  {
    hanzi: "掺",
  },
  {
    hanzi: "空虚",
  },
  {
    hanzi: "害虫",
  },
  {
    hanzi: "完蛋",
  },
  {
    hanzi: "心血",
  },
  {
    hanzi: "拧",
  },
  {
    hanzi: "止血",
  },
  {
    hanzi: "流血",
  },
  {
    hanzi: "献血",
  },
  {
    hanzi: "输血",
  },
  {
    hanzi: "拯救",
  },
  {
    hanzi: "鲜血",
  },
  {
    hanzi: "通行证",
  },
  {
    hanzi: "人行道",
  },
  {
    hanzi: "内行",
  },
  {
    hanzi: "扛",
  },
  {
    hanzi: "可行",
  },
  {
    hanzi: "品行",
  },
  {
    hanzi: "外行",
  },
  {
    hanzi: "并行",
  },
  {
    hanzi: "拎",
  },
  {
    hanzi: "强行",
  },
  {
    hanzi: "施行",
  },
  {
    hanzi: "现行",
  },
  {
    hanzi: "绕行",
  },
  {
    hanzi: "拙劣",
  },
  {
    hanzi: "自行",
  },
  {
    hanzi: "航行",
  },
  {
    hanzi: "言行",
  },
  {
    hanzi: "试行",
  },
  {
    hanzi: "拽",
  },
  {
    hanzi: "临街",
  },
  {
    hanzi: "更衣室",
  },
  {
    hanzi: "互补",
  },
  {
    hanzi: "修补",
  },
  {
    hanzi: "撬",
  },
  {
    hanzi: "填补",
  },
  {
    hanzi: "图表",
  },
  {
    hanzi: "外表",
  },
  {
    hanzi: "睡袋",
  },
  {
    hanzi: "捅",
  },
  {
    hanzi: "制裁",
  },
  {
    hanzi: "集装箱",
  },
  {
    hanzi: "乔装",
  },
  {
    hanzi: "假装",
  },
  {
    hanzi: "拣",
  },
  {
    hanzi: "原装",
  },
  {
    hanzi: "组装",
  },
  {
    hanzi: "简要",
  },
  {
    hanzi: "首要",
  },
  {
    hanzi: "揍",
  },
  {
    hanzi: "偏见",
  },
  {
    hanzi: "参见",
  },
  {
    hanzi: "少见",
  },
  {
    hanzi: "拜见",
  },
  {
    hanzi: "搀",
  },
  {
    hanzi: "接见",
  },
  {
    hanzi: "远见",
  },
  {
    hanzi: "预见",
  },
  {
    hanzi: "可观",
  },
  {
    hanzi: "捶",
  },
  {
    hanzi: "微观",
  },
  {
    hanzi: "旁观",
  },
  {
    hanzi: "景观",
  },
  {
    hanzi: "直观",
  },
  {
    hanzi: "拴",
  },
  {
    hanzi: "美观",
  },
  {
    hanzi: "收视率",
  },
  {
    hanzi: "卫视",
  },
  {
    hanzi: "审视",
  },
  {
    hanzi: "拄",
  },
  {
    hanzi: "正视",
  },
  {
    hanzi: "监视",
  },
  {
    hanzi: "直视",
  },
  {
    hanzi: "察觉",
  },
  {
    hanzi: "抡",
  },
  {
    hanzi: "直觉",
  },
  {
    hanzi: "知觉",
  },
  {
    hanzi: "视觉",
  },
  {
    hanzi: "错觉",
  },
  {
    hanzi: "捍卫",
  },
  {
    hanzi: "三角",
  },
  {
    hanzi: "视角",
  },
  {
    hanzi: "不解",
  },
  {
    hanzi: "和解",
  },
  {
    hanzi: "会晤",
  },
  {
    hanzi: "破解",
  },
  {
    hanzi: "见解",
  },
  {
    hanzi: "讲解",
  },
  {
    hanzi: "换言之",
  },
  {
    hanzi: "旷课",
  },
  {
    hanzi: "代言人",
  },
  {
    hanzi: "名言",
  },
  {
    hanzi: "宣言",
  },
  {
    hanzi: "寓言",
  },
  {
    hanzi: "曙光",
  },
  {
    hanzi: "怨言",
  },
  {
    hanzi: "方言",
  },
  {
    hanzi: "预言",
  },
  {
    hanzi: "倒计时",
  },
  {
    hanzi: "腥",
  },
  {
    hanzi: "合计",
  },
  {
    hanzi: "总计",
  },
  {
    hanzi: "算计",
  },
  {
    hanzi: "累计",
  },
  {
    hanzi: "膳食",
  },
  {
    hanzi: "修订",
  },
  {
    hanzi: "乞讨",
  },
  {
    hanzi: "商讨",
  },
  {
    hanzi: "检讨",
  },
  {
    hanzi: "胸膛",
  },
  {
    hanzi: "研讨",
  },
  {
    hanzi: "退让",
  },
  {
    hanzi: "异议",
  },
  {
    hanzi: "提议",
  },
  {
    hanzi: "朦胧",
  },
  {
    hanzi: "电讯",
  },
  {
    hanzi: "书记",
  },
  {
    hanzi: "传记",
  },
  {
    hanzi: "评论员",
  },
  {
    hanzi: "女婿",
  },
  {
    hanzi: "无论如何",
  },
  {
    hanzi: "定论",
  },
  {
    hanzi: "概论",
  },
  {
    hanzi: "社论",
  },
  {
    hanzi: "姥姥",
  },
  {
    hanzi: "姥爷",
  },
  {
    hanzi: "言论",
  },
  {
    hanzi: "谈论",
  },
  {
    hanzi: "互访",
  },
  {
    hanzi: "来访",
  },
  {
    hanzi: "絮叨",
  },
  {
    hanzi: "做证",
  },
  {
    hanzi: "公证",
  },
  {
    hanzi: "印证",
  },
  {
    hanzi: "求证",
  },
  {
    hanzi: "嬉笑",
  },
  {
    hanzi: "物证",
  },
  {
    hanzi: "见证",
  },
  {
    hanzi: "论证",
  },
  {
    hanzi: "验证",
  },
  {
    hanzi: "嫦娥",
  },
  {
    hanzi: "好评",
  },
  {
    hanzi: "点评",
  },
  {
    hanzi: "知识分子",
  },
  {
    hanzi: "共识",
  },
  {
    hanzi: "媲美",
  },
  {
    hanzi: "相识",
  },
  {
    hanzi: "结识",
  },
  {
    hanzi: "见识",
  },
  {
    hanzi: "上诉",
  },
  {
    hanzi: "凄凉",
  },
  {
    hanzi: "会诊",
  },
  {
    hanzi: "就诊",
  },
  {
    hanzi: "急诊",
  },
  {
    hanzi: "确诊",
  },
  {
    hanzi: "贪婪",
  },
  {
    hanzi: "比试",
  },
  {
    hanzi: "俗话说",
  },
  {
    hanzi: "活该",
  },
  {
    hanzi: "标语",
  },
  {
    hanzi: "彬彬有礼",
  },
  {
    hanzi: "话语",
  },
  {
    hanzi: "没说的",
  },
  {
    hanzi: "好说",
  },
  {
    hanzi: "学说",
  },
  {
    hanzi: "心急如焚",
  },
  {
    hanzi: "按说",
  },
  {
    hanzi: "演说",
  },
  {
    hanzi: "胡说",
  },
  {
    hanzi: "虽说",
  },
  {
    hanzi: "灼热",
  },
  {
    hanzi: "诉说",
  },
  {
    hanzi: "难说",
  },
  {
    hanzi: "敬请",
  },
  {
    hanzi: "宣读",
  },
  {
    hanzi: "焕发",
  },
  {
    hanzi: "就读",
  },
  {
    hanzi: "攻读",
  },
  {
    hanzi: "解读",
  },
  {
    hanzi: "默读",
  },
  {
    hanzi: "暖烘烘",
  },
  {
    hanzi: "烘干",
  },
  {
    hanzi: "烘托",
  },
  {
    hanzi: "备课",
  },
  {
    hanzi: "交谈",
  },
  {
    hanzi: "座谈",
  },
  {
    hanzi: "访谈",
  },
  {
    hanzi: "焊",
  },
  {
    hanzi: "情谊",
  },
  {
    hanzi: "抽象",
  },
  {
    hanzi: "风貌",
  },
  {
    hanzi: "抱负",
  },
  {
    hanzi: "熄火",
  },
  {
    hanzi: "担负",
  },
  {
    hanzi: "自负",
  },
  {
    hanzi: "发财",
  },
  {
    hanzi: "钱财",
  },
  {
    hanzi: "闪烁",
  },
  {
    hanzi: "自责",
  },
  {
    hanzi: "保质期",
  },
  {
    hanzi: "人质",
  },
  {
    hanzi: "体质",
  },
  {
    hanzi: "炖",
  },
  {
    hanzi: "变质",
  },
  {
    hanzi: "地质",
  },
  {
    hanzi: "实质",
  },
  {
    hanzi: "特质",
  },
  {
    hanzi: "野炊",
  },
  {
    hanzi: "并购",
  },
  {
    hanzi: "订购",
  },
  {
    hanzi: "张贴",
  },
  {
    hanzi: "可贵",
  },
  {
    hanzi: "针灸",
  },
  {
    hanzi: "名贵",
  },
  {
    hanzi: "尊贵",
  },
  {
    hanzi: "高贵",
  },
  {
    hanzi: "信贷",
  },
  {
    hanzi: "煲",
  },
  {
    hanzi: "付费",
  },
  {
    hanzi: "公费",
  },
  {
    hanzi: "自费",
  },
  {
    hanzi: "话费",
  },
  {
    hanzi: "耿直",
  },
  {
    hanzi: "索赔",
  },
  {
    hanzi: "预赛",
  },
  {
    hanzi: "双赢",
  },
  {
    hanzi: "出走",
  },
  {
    hanzi: "痰",
  },
  {
    hanzi: "行走",
  },
  {
    hanzi: "追赶",
  },
  {
    hanzi: "发起人",
  },
  {
    hanzi: "不起眼",
  },
  {
    hanzi: "麻痹",
  },
  {
    hanzi: "兴起",
  },
  {
    hanzi: "响起",
  },
  {
    hanzi: "挑起",
  },
  {
    hanzi: "比起",
  },
  {
    hanzi: "煽动",
  },
  {
    hanzi: "激起",
  },
  {
    hanzi: "谈起",
  },
  {
    hanzi: "高超",
  },
  {
    hanzi: "优越",
  },
  {
    hanzi: "翅膀",
  },
  {
    hanzi: "穿越",
  },
  {
    hanzi: "风趣",
  },
  {
    hanzi: "富足",
  },
  {
    hanzi: "知足",
  },
  {
    hanzi: "翘",
  },
  {
    hanzi: "立足",
  },
  {
    hanzi: "长足",
  },
  {
    hanzi: "起跑线",
  },
  {
    hanzi: "赛跑",
  },
  {
    hanzi: "戳",
  },
  {
    hanzi: "焦距",
  },
  {
    hanzi: "修路",
  },
  {
    hanzi: "半路",
  },
  {
    hanzi: "小路",
  },
  {
    hanzi: "大雁",
  },
  {
    hanzi: "山路",
  },
  {
    hanzi: "带路",
  },
  {
    hanzi: "思路",
  },
  {
    hanzi: "门路",
  },
  {
    hanzi: "仙鹤",
  },
  {
    hanzi: "鹤立鸡群",
  },
  {
    hanzi: "顺路",
  },
  {
    hanzi: "亲身",
  },
  {
    hanzi: "人身",
  },
  {
    hanzi: "出身",
  },
  {
    hanzi: "寝室",
  },
  {
    hanzi: "切身",
  },
  {
    hanzi: "动身",
  },
  {
    hanzi: "化身",
  },
  {
    hanzi: "投身",
  },
  {
    hanzi: "寥寥无几",
  },
  {
    hanzi: "独身",
  },
  {
    hanzi: "脱身",
  },
  {
    hanzi: "藏身",
  },
  {
    hanzi: "隐身",
  },
  {
    hanzi: "荒谬",
  },
  {
    hanzi: "停车位",
  },
  {
    hanzi: "公车",
  },
  {
    hanzi: "警车",
  },
  {
    hanzi: "赛车",
  },
  {
    hanzi: "诀窍",
  },
  {
    hanzi: "秘诀",
  },
  {
    hanzi: "诀别",
  },
  {
    hanzi: "超车",
  },
  {
    hanzi: "跑车",
  },
  {
    hanzi: "通车",
  },
  {
    hanzi: "流转",
  },
  {
    hanzi: "朗诵",
  },
  {
    hanzi: "背诵",
  },
  {
    hanzi: "运转",
  },
  {
    hanzi: "承载",
  },
  {
    hanzi: "计较",
  },
  {
    hanzi: "火辣辣",
  },
  {
    hanzi: "忌讳",
  },
  {
    hanzi: "半边天",
  },
  {
    hanzi: "敲边鼓",
  },
  {
    hanzi: "单边",
  },
  {
    hanzi: "双边",
  },
  {
    hanzi: "告诫",
  },
  {
    hanzi: "周边",
  },
  {
    hanzi: "多边",
  },
  {
    hanzi: "直达",
  },
  {
    hanzi: "转达",
  },
  {
    hanzi: "诽谤",
  },
  {
    hanzi: "长达",
  },
  {
    hanzi: "莫过于",
  },
  {
    hanzi: "走过场",
  },
  {
    hanzi: "反过来",
  },
  {
    hanzi: "讹诈",
  },
  {
    hanzi: "受过",
  },
  {
    hanzi: "放过",
  },
  {
    hanzi: "渡过",
  },
  {
    hanzi: "穿过",
  },
  {
    hanzi: "间谍",
  },
  {
    hanzi: "越过",
  },
  {
    hanzi: "透过",
  },
  {
    hanzi: "客运",
  },
  {
    hanzi: "海运",
  },
  {
    hanzi: "讥笑",
  },
  {
    hanzi: "航运",
  },
  {
    hanzi: "远近",
  },
  {
    hanzi: "临近",
  },
  {
    hanzi: "亲近",
  },
  {
    hanzi: "秃",
  },
  {
    hanzi: "就近",
  },
  {
    hanzi: "贴近",
  },
  {
    hanzi: "走近",
  },
  {
    hanzi: "偿还",
  },
  {
    hanzi: "颓废",
  },
  {
    hanzi: "望远镜",
  },
  {
    hanzi: "偏远",
  },
  {
    hanzi: "深远",
  },
  {
    hanzi: "老远",
  },
  {
    hanzi: "秉承",
  },
  {
    hanzi: "边远",
  },
  {
    hanzi: "久违",
  },
  {
    hanzi: "一连串",
  },
  {
    hanzi: "一连",
  },
  {
    hanzi: "黏",
  },
  {
    hanzi: "相连",
  },
  {
    hanzi: "迟迟",
  },
  {
    hanzi: "表述",
  },
  {
    hanzi: "论述",
  },
  {
    hanzi: "污秽",
  },
  {
    hanzi: "低迷",
  },
  {
    hanzi: "沉迷",
  },
  {
    hanzi: "着迷",
  },
  {
    hanzi: "后退",
  },
  {
    hanzi: "稠",
  },
  {
    hanzi: "稠密",
  },
  {
    hanzi: "接送",
  },
  {
    hanzi: "输送",
  },
  {
    hanzi: "运送",
  },
  {
    hanzi: "配送",
  },
  {
    hanzi: "庄稼",
  },
  {
    hanzi: "不适",
  },
  {
    hanzi: "候选人",
  },
  {
    hanzi: "人选",
  },
  {
    hanzi: "入选",
  },
  {
    hanzi: "锈",
  },
  {
    hanzi: "大选",
  },
  {
    hanzi: "推选",
  },
  {
    hanzi: "竞选",
  },
  {
    hanzi: "角逐",
  },
  {
    hanzi: "锤子",
  },
  {
    hanzi: "追逐",
  },
  {
    hanzi: "中途",
  },
  {
    hanzi: "路途",
  },
  {
    hanzi: "普通人",
  },
  {
    hanzi: "钞票",
  },
  {
    hanzi: "卡通",
  },
  {
    hanzi: "打通",
  },
  {
    hanzi: "接通",
  },
  {
    hanzi: "灵通",
  },
  {
    hanzi: "锯",
  },
  {
    hanzi: "相通",
  },
  {
    hanzi: "精通",
  },
  {
    hanzi: "贯通",
  },
  {
    hanzi: "通通",
  },
  {
    hanzi: "钳子",
  },
  {
    hanzi: "人造",
  },
  {
    hanzi: "编造",
  },
  {
    hanzi: "营造",
  },
  {
    hanzi: "境遇",
  },
  {
    hanzi: "千钧一发",
  },
  {
    hanzi: "相遇",
  },
  {
    hanzi: "东道主",
  },
  {
    hanzi: "人道",
  },
  {
    hanzi: "便道",
  },
  {
    hanzi: "钓鱼",
  },
  {
    hanzi: "沽名钓誉",
  },
  {
    hanzi: "公道",
  },
  {
    hanzi: "出道",
  },
  {
    hanzi: "厚道",
  },
  {
    hanzi: "茶道",
  },
  {
    hanzi: "豹",
  },
  {
    hanzi: "说道",
  },
  {
    hanzi: "跑道",
  },
  {
    hanzi: "车道",
  },
  {
    hanzi: "过道",
  },
  {
    hanzi: "酌情",
  },
  {
    hanzi: "后遗症",
  },
  {
    hanzi: "应邀",
  },
  {
    hanzi: "特邀",
  },
  {
    hanzi: "联邦",
  },
  {
    hanzi: "酣畅",
  },
  {
    hanzi: "酣睡",
  },
  {
    hanzi: "集邮",
  },
  {
    hanzi: "喜酒",
  },
  {
    hanzi: "敬酒",
  },
  {
    hanzi: "冷酷",
  },
  {
    hanzi: "酥",
  },
  {
    hanzi: "惊醒",
  },
  {
    hanzi: "苏醒",
  },
  {
    hanzi: "觉醒",
  },
  {
    hanzi: "开采",
  },
  {
    hanzi: "酗酒",
  },
  {
    hanzi: "风采",
  },
  {
    hanzi: "心里话",
  },
  {
    hanzi: "怀里",
  },
  {
    hanzi: "保重",
  },
  {
    hanzi: "发酵",
  },
  {
    hanzi: "加重",
  },
  {
    hanzi: "双重",
  },
  {
    hanzi: "敬重",
  },
  {
    hanzi: "看重",
  },
  {
    hanzi: "烹调",
  },
  {
    hanzi: "着重",
  },
  {
    hanzi: "稳重",
  },
  {
    hanzi: "贵重",
  },
  {
    hanzi: "重量级",
  },
  {
    hanzi: "孪生",
  },
  {
    hanzi: "分量",
  },
  {
    hanzi: "容量",
  },
  {
    hanzi: "少量",
  },
  {
    hanzi: "打量",
  },
  {
    hanzi: "对弈",
  },
  {
    hanzi: "流量",
  },
  {
    hanzi: "海量",
  },
  {
    hanzi: "考量",
  },
  {
    hanzi: "较量",
  },
  {
    hanzi: "花卉",
  },
  {
    hanzi: "适量",
  },
  {
    hanzi: "定金",
  },
  {
    hanzi: "警钟",
  },
  {
    hanzi: "值钱",
  },
  {
    hanzi: "沉甸甸",
  },
  {
    hanzi: "本钱",
  },
  {
    hanzi: "差错",
  },
  {
    hanzi: "认错",
  },
  {
    hanzi: "过错",
  },
  {
    hanzi: "河畔",
  },
  {
    hanzi: "按键",
  },
  {
    hanzi: "专长",
  },
  {
    hanzi: "修长",
  },
  {
    hanzi: "全长",
  },
  {
    hanzi: "畸形",
  },
  {
    hanzi: "师长",
  },
  {
    hanzi: "特长",
  },
  {
    hanzi: "串门",
  },
  {
    hanzi: "冷门",
  },
  {
    hanzi: "瞄准",
  },
  {
    hanzi: "成问题",
  },
  {
    hanzi: "质问",
  },
  {
    hanzi: "追问",
  },
  {
    hanzi: "时间表",
  },
  {
    hanzi: "目睹",
  },
  {
    hanzi: "其间",
  },
  {
    hanzi: "晚间",
  },
  {
    hanzi: "车间",
  },
  {
    hanzi: "传闻",
  },
  {
    hanzi: "隐瞒",
  },
  {
    hanzi: "带队",
  },
  {
    hanzi: "掉队",
  },
  {
    hanzi: "领队",
  },
  {
    hanzi: "国防",
  },
  {
    hanzi: "眨眼",
  },
  {
    hanzi: "提防",
  },
  {
    hanzi: "简陋",
  },
  {
    hanzi: "投降",
  },
  {
    hanzi: "上限",
  },
  {
    hanzi: "和睦",
  },
  {
    hanzi: "局限",
  },
  {
    hanzi: "年限",
  },
  {
    hanzi: "极限",
  },
  {
    hanzi: "界限",
  },
  {
    hanzi: "理睬",
  },
  {
    hanzi: "剧院",
  },
  {
    hanzi: "免除",
  },
  {
    hanzi: "去除",
  },
  {
    hanzi: "开除",
  },
  {
    hanzi: "打盹儿",
  },
  {
    hanzi: "扫除",
  },
  {
    hanzi: "清除",
  },
  {
    hanzi: "破除",
  },
  {
    hanzi: "惊险",
  },
  {
    hanzi: "瞻仰",
  },
  {
    hanzi: "探险",
  },
  {
    hanzi: "遇险",
  },
  {
    hanzi: "伴随",
  },
  {
    hanzi: "追随",
  },
  {
    hanzi: "赡养",
  },
  {
    hanzi: "出难题",
  },
  {
    hanzi: "空难",
  },
  {
    hanzi: "苦难",
  },
  {
    hanzi: "遇难",
  },
  {
    hanzi: "赎",
  },
  {
    hanzi: "避难",
  },
  {
    hanzi: "交集",
  },
  {
    hanzi: "召集",
  },
  {
    hanzi: "密集",
  },
  {
    hanzi: "忠贞",
  },
  {
    hanzi: "征集",
  },
  {
    hanzi: "汇集",
  },
  {
    hanzi: "聚集",
  },
  {
    hanzi: "采集",
  },
  {
    hanzi: "贬值",
  },
  {
    hanzi: "贬义",
  },
  {
    hanzi: "风雨",
  },
  {
    hanzi: "孤零零",
  },
  {
    hanzi: "内需",
  },
  {
    hanzi: "急需",
  },
  {
    hanzi: "贮藏",
  },
  {
    hanzi: "流露",
  },
  {
    hanzi: "裸露",
  },
  {
    hanzi: "动静",
  },
  {
    hanzi: "清静",
  },
  {
    hanzi: "屯",
  },
  {
    hanzi: "并非",
  },
  {
    hanzi: "无非",
  },
  {
    hanzi: "是非",
  },
  {
    hanzi: "莫非",
  },
  {
    hanzi: "分赃",
  },
  {
    hanzi: "爱面子",
  },
  {
    hanzi: "大面积",
  },
  {
    hanzi: "一面",
  },
  {
    hanzi: "书面",
  },
  {
    hanzi: "陨石",
  },
  {
    hanzi: "会面",
  },
  {
    hanzi: "体面",
  },
  {
    hanzi: "反面",
  },
  {
    hanzi: "封面",
  },
  {
    hanzi: "陷阱",
  },
  {
    hanzi: "平面",
  },
  {
    hanzi: "当面",
  },
  {
    hanzi: "正面",
  },
  {
    hanzi: "水面",
  },
  {
    hanzi: "陡",
  },
  {
    hanzi: "海面",
  },
  {
    hanzi: "背面",
  },
  {
    hanzi: "负面",
  },
  {
    hanzi: "路面",
  },
  {
    hanzi: "丑陋",
  },
  {
    hanzi: "露面",
  },
  {
    hanzi: "变革",
  },
  {
    hanzi: "口音",
  },
  {
    hanzi: "配音",
  },
  {
    hanzi: "堕落",
  },
  {
    hanzi: "主页",
  },
  {
    hanzi: "封顶",
  },
  {
    hanzi: "奖项",
  },
  {
    hanzi: "强项",
  },
  {
    hanzi: "轮廓",
  },
  {
    hanzi: "选项",
  },
  {
    hanzi: "孝顺",
  },
  {
    hanzi: "通顺",
  },
  {
    hanzi: "光顾",
  },
  {
    hanzi: "隧道",
  },
  {
    hanzi: "停顿",
  },
  {
    hanzi: "引领",
  },
  {
    hanzi: "申领",
  },
  {
    hanzi: "要领",
  },
  {
    hanzi: "遏制",
  },
  {
    hanzi: "频频",
  },
  {
    hanzi: "主题歌",
  },
  {
    hanzi: "命题",
  },
  {
    hanzi: "容颜",
  },
  {
    hanzi: "迭起",
  },
  {
    hanzi: "份额",
  },
  {
    hanzi: "余额",
  },
  {
    hanzi: "巨额",
  },
  {
    hanzi: "差额",
  },
  {
    hanzi: "迄今",
  },
  {
    hanzi: "迄今为止",
  },
  {
    hanzi: "总额",
  },
  {
    hanzi: "数额",
  },
  {
    hanzi: "高额",
  },
  {
    hanzi: "出风头",
  },
  {
    hanzi: "逞强",
  },
  {
    hanzi: "逞能",
  },
  {
    hanzi: "风风雨雨",
  },
  {
    hanzi: "作风",
  },
  {
    hanzi: "威风",
  },
  {
    hanzi: "通风",
  },
  {
    hanzi: "琢磨",
  },
  {
    hanzi: "主食",
  },
  {
    hanzi: "伙食",
  },
  {
    hanzi: "素食",
  },
  {
    hanzi: "就餐",
  },
  {
    hanzi: "筐",
  },
  {
    hanzi: "用餐",
  },
  {
    hanzi: "野餐",
  },
  {
    hanzi: "便饭",
  },
  {
    hanzi: "茶馆儿",
  },
  {
    hanzi: "筒",
  },
  {
    hanzi: "话筒",
  },
  {
    hanzi: "元首",
  },
  {
    hanzi: "回首",
  },
  {
    hanzi: "口香糖",
  },
  {
    hanzi: "黑马",
  },
  {
    hanzi: "帐篷",
  },
  {
    hanzi: "化验",
  },
  {
    hanzi: "测验",
  },
  {
    hanzi: "受骗",
  },
  {
    hanzi: "刺骨",
  },
  {
    hanzi: "笛子",
  },
  {
    hanzi: "保鲜",
  },
  {
    hanzi: "天鹅",
  },
  {
    hanzi: "高龄",
  },
  {
    hanzi: "水龙头",
  },
  {
    hanzi: "风筝",
  },
  {
    hanzi: "跑龙套",
  },
  {
    hanzi: "尼龙",
  },
  {
    hanzi: "恐龙",
  },
  {
    hanzi: "沙龙",
  },
  {
    hanzi: "簇拥",
  },
  {
    hanzi: "举一反三",
  },
  {
    hanzi: "独一无二",
  },
  {
    hanzi: "力不从心",
  },
  {
    hanzi: "竹竿",
  },
  {
    hanzi: "密不可分",
  },
  {
    hanzi: "必不可少",
  },
  {
    hanzi: "势不可当",
  },
  {
    hanzi: "稀罕",
  },
  {
    hanzi: "罕见",
  },
  {
    hanzi: "毫不犹豫",
  },
  {
    hanzi: "经久不息",
  },
  {
    hanzi: "身不由己",
  },
  {
    hanzi: "凿",
  },
  {
    hanzi: "确凿",
  },
  {
    hanzi: "素不相识",
  },
  {
    hanzi: "情不自禁",
  },
  {
    hanzi: "综上所述",
  },
  {
    hanzi: "废墟",
  },
  {
    hanzi: "得不偿失",
  },
  {
    hanzi: "微不足道",
  },
  {
    hanzi: "目不转睛",
  },
  {
    hanzi: "开垦",
  },
  {
    hanzi: "爱不释手",
  },
  {
    hanzi: "举世无双",
  },
  {
    hanzi: "举世闻名",
  },
  {
    hanzi: "坟",
  },
  {
    hanzi: "坟墓",
  },
  {
    hanzi: "美中不足",
  },
  {
    hanzi: "重中之重",
  },
  {
    hanzi: "目中无人",
  },
  {
    hanzi: "紊乱",
  },
  {
    hanzi: "不为人知",
  },
  {
    hanzi: "一举一动",
  },
  {
    hanzi: "见义勇为",
  },
  {
    hanzi: "虔诚",
  },
  {
    hanzi: "可乘之机",
  },
  {
    hanzi: "杂乱无章",
  },
  {
    hanzi: "不了了之",
  },
  {
    hanzi: "剃",
  },
  {
    hanzi: "一事无成",
  },
  {
    hanzi: "实事求是",
  },
  {
    hanzi: "接二连三",
  },
  {
    hanzi: "刨",
  },
  {
    hanzi: "不亦乐乎",
  },
  {
    hanzi: "乘人之危",
  },
  {
    hanzi: "引人入胜",
  },
  {
    hanzi: "剔除",
  },
  {
    hanzi: "损人利己",
  },
  {
    hanzi: "讨人喜欢",
  },
  {
    hanzi: "出人意料",
  },
  {
    hanzi: "竖",
  },
  {
    hanzi: "横七竖八",
  },
  {
    hanzi: "引人注目",
  },
  {
    hanzi: "因人而异",
  },
  {
    hanzi: "古今中外",
  },
  {
    hanzi: "幢",
  },
  {
    hanzi: "自以为是",
  },
  {
    hanzi: "不以为然",
  },
  {
    hanzi: "夜以继日",
  },
  {
    hanzi: "旗帜",
  },
  {
    hanzi: "难以置信",
  },
  {
    hanzi: "与众不同",
  },
  {
    hanzi: "依依不舍",
  },
  {
    hanzi: "寻觅",
  },
  {
    hanzi: "相依为命",
  },
  {
    hanzi: "半信半疑",
  },
  {
    hanzi: "不假思索",
  },
  {
    hanzi: "孵化",
  },
  {
    hanzi: "争先恐后",
  },
  {
    hanzi: "容光焕发",
  },
  {
    hanzi: "深入人心",
  },
  {
    hanzi: "气馁",
  },
  {
    hanzi: "顾全大局",
  },
  {
    hanzi: "大公无私",
  },
  {
    hanzi: "无关紧要",
  },
  {
    hanzi: "馋",
  },
  {
    hanzi: "至关重要",
  },
  {
    hanzi: "顺其自然",
  },
  {
    hanzi: "千军万马",
  },
  {
    hanzi: "饥饿",
  },
  {
    hanzi: "忍饥挨饿",
  },
  {
    hanzi: "层出不穷",
  },
  {
    hanzi: "喜出望外",
  },
  {
    hanzi: "思前想后",
  },
  {
    hanzi: "冗长",
  },
  {
    hanzi: "名副其实",
  },
  {
    hanzi: "自力更生",
  },
  {
    hanzi: "当务之急",
  },
  {
    hanzi: "弦",
  },
  {
    hanzi: "扣人心弦",
  },
  {
    hanzi: "多劳多得",
  },
  {
    hanzi: "千变万化",
  },
  {
    hanzi: "异口同声",
  },
  {
    hanzi: "松弛",
  },
  {
    hanzi: "出口成章",
  },
  {
    hanzi: "有口无心",
  },
  {
    hanzi: "脱口而出",
  },
  {
    hanzi: "靶子",
  },
  {
    hanzi: "万古长青",
  },
  {
    hanzi: "无可厚非",
  },
  {
    hanzi: "无可奉告",
  },
  {
    hanzi: "靴子",
  },
  {
    hanzi: "不可思议",
  },
  {
    hanzi: "大同小异",
  },
  {
    hanzi: "风和日丽",
  },
  {
    hanzi: "鞠躬",
  },
  {
    hanzi: "吃喝玩乐",
  },
  {
    hanzi: "七嘴八舌",
  },
  {
    hanzi: "峰回路转",
  },
  {
    hanzi: "粪",
  },
  {
    hanzi: "粪便",
  },
  {
    hanzi: "有声有色",
  },
  {
    hanzi: "惊天动地",
  },
  {
    hanzi: "得天独厚",
  },
  {
    hanzi: "粽子",
  },
  {
    hanzi: "交头接耳",
  },
  {
    hanzi: "头头是道",
  },
  {
    hanzi: "突如其来",
  },
  {
    hanzi: "舵手",
  },
  {
    hanzi: "一如既往",
  },
  {
    hanzi: "自始至终",
  },
  {
    hanzi: "心安理得",
  },
  {
    hanzi: "船舶",
  },
  {
    hanzi: "没完没了",
  },
  {
    hanzi: "千家万户",
  },
  {
    hanzi: "丰富多彩",
  },
  {
    hanzi: "肥皂",
  },
  {
    hanzi: "废寝忘食",
  },
  {
    hanzi: "一干二净",
  },
  {
    hanzi: "东张西望",
  },
  {
    hanzi: "真挚",
  },
  {
    hanzi: "诚挚",
  },
  {
    hanzi: "自强不息",
  },
  {
    hanzi: "门当户对",
  },
  {
    hanzi: "形影不离",
  },
  {
    hanzi: "引擎",
  },
  {
    hanzi: "勇往直前",
  },
  {
    hanzi: "难得一见",
  },
  {
    hanzi: "不得而知",
  },
  {
    hanzi: "掰",
  },
  {
    hanzi: "无微不至",
  },
  {
    hanzi: "全心全意",
  },
  {
    hanzi: "齐心协力",
  },
  {
    hanzi: "打岔",
  },
  {
    hanzi: "粗心大意",
  },
  {
    hanzi: "诚心诚意",
  },
  {
    hanzi: "众志成城",
  },
  {
    hanzi: "崛起",
  },
  {
    hanzi: "念念不忘",
  },
  {
    hanzi: "恋恋不舍",
  },
  {
    hanzi: "息息相关",
  },
  {
    hanzi: "崭新",
  },
  {
    hanzi: "无恶不作",
  },
  {
    hanzi: "合情合理",
  },
  {
    hanzi: "无情无义",
  },
  {
    hanzi: "对峙",
  },
  {
    hanzi: "大惊小怪",
  },
  {
    hanzi: "心想事成",
  },
  {
    hanzi: "异想天开",
  },
  {
    hanzi: "岛屿",
  },
  {
    hanzi: "可想而知",
  },
  {
    hanzi: "过意不去",
  },
  {
    hanzi: "得意扬扬",
  },
  {
    hanzi: "屹立",
  },
  {
    hanzi: "如愿以偿",
  },
  {
    hanzi: "一成不变",
  },
  {
    hanzi: "有所不同",
  },
  {
    hanzi: "悬崖",
  },
  {
    hanzi: "无所事事",
  },
  {
    hanzi: "无所作为",
  },
  {
    hanzi: "众所周知",
  },
  {
    hanzi: "青蛙",
  },
  {
    hanzi: "理所当然",
  },
  {
    hanzi: "前所未有",
  },
  {
    hanzi: "力所能及",
  },
  {
    hanzi: "八卦",
  },
  {
    hanzi: "措手不及",
  },
  {
    hanzi: "指手画脚",
  },
  {
    hanzi: "精打细算",
  },
  {
    hanzi: "卤味",
  },
  {
    hanzi: "发扬光大",
  },
  {
    hanzi: "一技之长",
  },
  {
    hanzi: "走投无路",
  },
  {
    hanzi: "闺女",
  },
  {
    hanzi: "闺蜜",
  },
  {
    hanzi: "相提并论",
  },
  {
    hanzi: "日新月异",
  },
  {
    hanzi: "千方百计",
  },
  {
    hanzi: "隔阂",
  },
  {
    hanzi: "万无一失",
  },
  {
    hanzi: "史无前例",
  },
  {
    hanzi: "前无古人",
  },
  {
    hanzi: "蹦",
  },
  {
    hanzi: "一无所有",
  },
  {
    hanzi: "一无所知",
  },
  {
    hanzi: "与日俱增",
  },
  {
    hanzi: "踹",
  },
  {
    hanzi: "与时俱进",
  },
  {
    hanzi: "随时随地",
  },
  {
    hanzi: "似是而非",
  },
  {
    hanzi: "趴",
  },
  {
    hanzi: "似曾相识",
  },
  {
    hanzi: "大有可为",
  },
  {
    hanzi: "应有尽有",
  },
  {
    hanzi: "踊跃",
  },
  {
    hanzi: "亲朋好友",
  },
  {
    hanzi: "有朝一日",
  },
  {
    hanzi: "长期以来",
  },
  {
    hanzi: "摔跤",
  },
  {
    hanzi: "灵机一动",
  },
  {
    hanzi: "归根到底",
  },
  {
    hanzi: "格格不入",
  },
  {
    hanzi: "狡猾",
  },
  {
    hanzi: "一概而论",
  },
  {
    hanzi: "大模大样",
  },
  {
    hanzi: "纵横交错",
  },
  {
    hanzi: "猖狂",
  },
  {
    hanzi: "悲欢离合",
  },
  {
    hanzi: "不正之风",
  },
  {
    hanzi: "除此之外",
  },
  {
    hanzi: "疲惫",
  },
  {
    hanzi: "疲惫不堪",
  },
  {
    hanzi: "与此同时",
  },
  {
    hanzi: "相比之下",
  },
  {
    hanzi: "朝气蓬勃",
  },
  {
    hanzi: "烟囱",
  },
  {
    hanzi: "原汁原味",
  },
  {
    hanzi: "川流不息",
  },
  {
    hanzi: "无济于事",
  },
  {
    hanzi: "囚犯",
  },
  {
    hanzi: "水涨船高",
  },
  {
    hanzi: "源源不断",
  },
  {
    hanzi: "张灯结彩",
  },
  {
    hanzi: "熏",
  },
  {
    hanzi: "熏陶",
  },
  {
    hanzi: "心灵手巧",
  },
  {
    hanzi: "自然而然",
  },
  {
    hanzi: "耳熟能详",
  },
  {
    hanzi: "歼灭",
  },
  {
    hanzi: "爱理不理",
  },
  {
    hanzi: "顺理成章",
  },
  {
    hanzi: "土生土长",
  },
  {
    hanzi: "遭殃",
  },
  {
    hanzi: "自由自在",
  },
  {
    hanzi: "精益求精",
  },
  {
    hanzi: "耳目一新",
  },
  {
    hanzi: "公顷",
  },
  {
    hanzi: "一目了然",
  },
  {
    hanzi: "面目全非",
  },
  {
    hanzi: "不相上下",
  },
  {
    hanzi: "脸颊",
  },
  {
    hanzi: "半真半假",
  },
  {
    hanzi: "闹着玩儿",
  },
  {
    hanzi: "不知不觉",
  },
  {
    hanzi: "木匠",
  },
  {
    hanzi: "别具匠心",
  },
  {
    hanzi: "自私自利",
  },
  {
    hanzi: "百科全书",
  },
  {
    hanzi: "司空见惯",
  },
  {
    hanzi: "斧子",
  },
  {
    hanzi: "独立自主",
  },
  {
    hanzi: "哭笑不得",
  },
  {
    hanzi: "聚精会神",
  },
  {
    hanzi: "鹅",
  },
  {
    hanzi: "无精打采",
  },
  {
    hanzi: "不约而同",
  },
  {
    hanzi: "天经地义",
  },
  {
    hanzi: "鸽子",
  },
  {
    hanzi: "引经据典",
  },
  {
    hanzi: "错综复杂",
  },
  {
    hanzi: "恼羞成怒",
  },
  {
    hanzi: "徘徊",
  },
  {
    hanzi: "成群结队",
  },
  {
    hanzi: "取而代之",
  },
  {
    hanzi: "轻而易举",
  },
  {
    hanzi: "挑衅",
  },
  {
    hanzi: "显而易见",
  },
  {
    hanzi: "总而言之",
  },
  {
    hanzi: "敬而远之",
  },
  {
    hanzi: "盏",
  },
  {
    hanzi: "无能为力",
  },
  {
    hanzi: "同舟共济",
  },
  {
    hanzi: "五花八门",
  },
  {
    hanzi: "祭祀",
  },
  {
    hanzi: "奇花异草",
  },
  {
    hanzi: "斩草除根",
  },
  {
    hanzi: "水落石出",
  },
  {
    hanzi: "包袱",
  },
  {
    hanzi: "画蛇添足",
  },
  {
    hanzi: "节衣缩食",
  },
  {
    hanzi: "一言一行",
  },
  {
    hanzi: "兢兢业业",
  },
  {
    hanzi: "一言不发",
  },
  {
    hanzi: "无话可说",
  },
  {
    hanzi: "实话实说",
  },
  {
    hanzi: "夺魁",
  },
  {
    hanzi: "罪魁祸首",
  },
  {
    hanzi: "无足轻重",
  },
  {
    hanzi: "以身作则",
  },
  {
    hanzi: "冷酷无情",
  },
  {
    hanzi: "山冈",
  },
  {
    hanzi: "见钱眼开",
  },
  {
    hanzi: "一长一短",
  },
  {
    hanzi: "天长地久",
  },
  {
    hanzi: "华裔",
  },
  {
    hanzi: "后裔",
  },
  {
    hanzi: "耳闻目睹",
  },
  {
    hanzi: "新陈代谢",
  },
  {
    hanzi: "孤陋寡闻",
  },
  {
    hanzi: "昼夜",
  },
  {
    hanzi: "四面八方",
  },
  {
    hanzi: "衣食住行",
  },
  {
    hanzi: "风餐露宿",
  },
  {
    hanzi: "面孔",
  },
  {
    hanzi: "孔子",
  },
  {
    hanzi: "毛孔",
  },
  {
    hanzi: "孔雀",
  },
  {
    hanzi: "居高临下",
  },
  {
    hanzi: "兴高采烈",
  },
  {
    hanzi: "默默无闻",
  },
  {
    hanzi: "啥",
  },
  {
    hanzi: "一鼓作气",
  },
  {
    hanzi: "来龙去脉",
  },
  {
    hanzi: "画龙点睛",
  },
  {
    hanzi: "咋",
  },
  {
    hanzi: "不同寻常",
  },
  {
    hanzi: "欢声笑语",
  },
  {
    hanzi: "随处可见",
  },
  {
    hanzi: "呻吟",
  },
  {
    hanzi: "相对而言",
  },
  {
    hanzi: "朝夕相处",
  },
  {
    hanzi: "远近闻名",
  },
  {
    hanzi: "吴",
  },
  {
    hanzi: "嗨",
  },
  {
    hanzi: "噢",
  },
  {
    hanzi: "澳洲",
  },
  {
    hanzi: "澳门",
  },
  {
    hanzi: "澳大利亚",
  },
  {
    hanzi: "羞涩",
  },
  {
    hanzi: "苦涩",
  },
  {
    hanzi: "洛杉矶",
  },
  {
    hanzi: "浙江",
  },
  {
    hanzi: "沈阳",
  },
  {
    hanzi: "飞利浦",
  },
  {
    hanzi: "屁股",
  },
  {
    hanzi: "放屁",
  },
  {
    hanzi: "杭州",
  },
  {
    hanzi: "宋代",
  },
  {
    hanzi: "颈椎",
  },
  {
    hanzi: "腰椎",
  },
  {
    hanzi: "脊椎",
  },
  {
    hanzi: "雌性",
  },
  {
    hanzi: "雌激素",
  },
  {
    hanzi: "蝴蝶",
  },
  {
    hanzi: "笑眯眯",
  },
  {
    hanzi: "热泪盈眶",
  },
  {
    hanzi: "玛丽",
  },
  {
    hanzi: "菲律宾",
  },
  {
    hanzi: "布莱尔",
  },
  {
    hanzi: "伤疤",
  },
  {
    hanzi: "深圳",
  },
  {
    hanzi: "侄女",
  },
  {
    hanzi: "侄子",
  },
  {
    hanzi: "投掷",
  },
  {
    hanzi: "给我",
    pinyin: "gěi wǒ",
    en: "give me",
    custom: true,
  },
  {
    hanzi: "一个",
    pinyin: "yī gè",
    en: "one",
    custom: true,
  },
  {
    hanzi: "我的",
  },
  {
    hanzi: "年少",
  },
  {
    hanzi: "总要",
  },
  {
    hanzi: "多少钱",
  },
  {
    hanzi: "想办法",
  },
];
// Words End

// Nouns 名词 (2421)
export const allNouns = [
  {
    hanzi: "人",
  },
  {
    hanzi: "年",
  },
  {
    hanzi: "半年",
  },
  {
    hanzi: "人口",
  },
  {
    hanzi: "入口",
  },
  {
    hanzi: "中",
  },
  {
    hanzi: "马",
  },
  {
    hanzi: "气",
  },
  {
    hanzi: "电",
  },
  {
    hanzi: "今年",
  },
  {
    hanzi: "话",
  },
  {
    hanzi: "电话",
  },
  {
    hanzi: "月",
  },
  {
    hanzi: "明年",
  },
  {
    hanzi: "儿子",
  },
  {
    hanzi: "日子",
  },
  {
    hanzi: "勺子",
  },
  {
    hanzi: "上",
  },
  {
    hanzi: "早上",
  },
  {
    hanzi: "上午",
  },
  {
    hanzi: "下",
  },
  {
    hanzi: "下午",
  },
  {
    hanzi: "卡",
  },
  {
    hanzi: "点",
  },
  {
    hanzi: "早点",
  },
  {
    hanzi: "目的",
  },
  {
    hanzi: "面",
  },
  {
    hanzi: "上面",
  },
  {
    hanzi: "下面",
  },
  {
    hanzi: "身上",
  },
  {
    hanzi: "手",
  },
  {
    hanzi: "本子",
  },
  {
    hanzi: "身体",
  },
  {
    hanzi: "米",
  },
  {
    hanzi: "桌子",
  },
  {
    hanzi: "种",
  },
  {
    hanzi: "手机",
  },
  {
    hanzi: "飞机",
  },
  {
    hanzi: "心",
  },
  {
    hanzi: "休息日",
  },
  {
    hanzi: "包",
  },
  {
    hanzi: "面包",
  },
  {
    hanzi: "肚子",
  },
  {
    hanzi: "杯子",
  },
  {
    hanzi: "去年",
  },
  {
    hanzi: "想法",
  },
  {
    hanzi: "看法",
  },
  {
    hanzi: "门",
  },
  {
    hanzi: "门口",
  },
  {
    hanzi: "人们",
  },
  {
    hanzi: "时间",
  },
  {
    hanzi: "中间",
  },
  {
    hanzi: "公司",
  },
  {
    hanzi: "词",
  },
  {
    hanzi: "地上",
  },
  {
    hanzi: "小时",
  },
  {
    hanzi: "大小",
  },
  {
    hanzi: "大人",
  },
  {
    hanzi: "太太",
  },
  {
    hanzi: "狗",
  },
  {
    hanzi: "羊",
  },
  {
    hanzi: "样子",
  },
  {
    hanzi: "一边",
  },
  {
    hanzi: "东边",
  },
  {
    hanzi: "上边",
  },
  {
    hanzi: "下边",
  },
  {
    hanzi: "云",
  },
  {
    hanzi: "运气",
  },
  {
    hanzi: "活动",
  },
  {
    hanzi: "运动",
  },
  {
    hanzi: "会",
  },
  {
    hanzi: "一会儿",
  },
  {
    hanzi: "机会",
  },
  {
    hanzi: "哥哥",
  },
  {
    hanzi: "哥们儿",
  },
  {
    hanzi: "河",
  },
  {
    hanzi: "椅子",
  },
  {
    hanzi: "以上",
  },
  {
    hanzi: "以下",
  },
  {
    hanzi: "内心",
  },
  {
    hanzi: "以内",
  },
  {
    hanzi: "肉",
  },
  {
    hanzi: "周",
  },
  {
    hanzi: "周末",
  },
  {
    hanzi: "玉米",
  },
  {
    hanzi: "中国",
  },
  {
    hanzi: "中国人",
  },
  {
    hanzi: "国内",
  },
  {
    hanzi: "行为",
  },
  {
    hanzi: "天",
  },
  {
    hanzi: "今天",
  },
  {
    hanzi: "明天",
  },
  {
    hanzi: "每天",
  },
  {
    hanzi: "白天",
  },
  {
    hanzi: "天气",
  },
  {
    hanzi: "半天",
  },
  {
    hanzi: "关注",
  },
  {
    hanzi: "关系",
  },
  {
    hanzi: "联系",
  },
  {
    hanzi: "女人",
  },
  {
    hanzi: "美女",
  },
  {
    hanzi: "女儿",
  },
  {
    hanzi: "妈",
  },
  {
    hanzi: "妈妈",
  },
  {
    hanzi: "开始",
  },
  {
    hanzi: "东西",
  },
  {
    hanzi: "西边",
  },
  {
    hanzi: "楼",
  },
  {
    hanzi: "楼上",
  },
  {
    hanzi: "楼下",
  },
  {
    hanzi: "书",
  },
  {
    hanzi: "书包",
  },
  {
    hanzi: "朋友",
  },
  {
    hanzi: "女朋友",
  },
  {
    hanzi: "小朋友",
  },
  {
    hanzi: "信",
  },
  {
    hanzi: "中文",
  },
  {
    hanzi: "文化",
  },
  {
    hanzi: "父母",
  },
  {
    hanzi: "风",
  },
  {
    hanzi: "网",
  },
  {
    hanzi: "网上",
  },
  {
    hanzi: "网友",
  },
  {
    hanzi: "袋子",
  },
  {
    hanzi: "大衣",
  },
  {
    hanzi: "口袋",
  },
  {
    hanzi: "被子",
  },
  {
    hanzi: "银行",
  },
  {
    hanzi: "长相",
  },
  {
    hanzi: "衣服",
  },
  {
    hanzi: "公园",
  },
  {
    hanzi: "字",
  },
  {
    hanzi: "汉字",
  },
  {
    hanzi: "宝宝",
  },
  {
    hanzi: "能力",
  },
  {
    hanzi: "可能",
  },
  {
    hanzi: "外面",
  },
  {
    hanzi: "外国",
  },
  {
    hanzi: "外国人",
  },
  {
    hanzi: "以外",
  },
  {
    hanzi: "外边",
  },
  {
    hanzi: "国外",
  },
  {
    hanzi: "名字",
  },
  {
    hanzi: "死",
  },
  {
    hanzi: "问题",
  },
  {
    hanzi: "现在",
  },
  {
    hanzi: "现金",
  },
  {
    hanzi: "听力",
  },
  {
    hanzi: "最近",
  },
  {
    hanzi: "以后",
  },
  {
    hanzi: "后",
  },
  {
    hanzi: "后来",
  },
  {
    hanzi: "最后",
  },
  {
    hanzi: "后天",
  },
  {
    hanzi: "后面",
  },
  {
    hanzi: "后边",
  },
  {
    hanzi: "米饭",
  },
  {
    hanzi: "早饭",
  },
  {
    hanzi: "午饭",
  },
  {
    hanzi: "员工",
  },
  {
    hanzi: "工人",
  },
  {
    hanzi: "江",
  },
  {
    hanzi: "左边",
  },
  {
    hanzi: "左右",
  },
  {
    hanzi: "右边",
  },
  {
    hanzi: "约会",
  },
  {
    hanzi: "天空",
  },
  {
    hanzi: "空",
  },
  {
    hanzi: "空间",
  },
  {
    hanzi: "空气",
  },
  {
    hanzi: "刀子",
  },
  {
    hanzi: "月份",
  },
  {
    hanzi: "计划",
  },
  {
    hanzi: "别人",
  },
  {
    hanzi: "刚才",
  },
  {
    hanzi: "班",
  },
  {
    hanzi: "以前",
  },
  {
    hanzi: "前",
  },
  {
    hanzi: "前天",
  },
  {
    hanzi: "前面",
  },
  {
    hanzi: "前边",
  },
  {
    hanzi: "照相机",
  },
  {
    hanzi: "照片",
  },
  {
    hanzi: "进步",
  },
  {
    hanzi: "山",
  },
  {
    hanzi: "变化",
  },
  {
    hanzi: "课",
  },
  {
    hanzi: "课本",
  },
  {
    hanzi: "鱼",
  },
  {
    hanzi: "男人",
  },
  {
    hanzi: "男朋友",
  },
  {
    hanzi: "花",
  },
  {
    hanzi: "花园",
  },
  {
    hanzi: "草",
  },
  {
    hanzi: "草地",
  },
  {
    hanzi: "猫",
  },
  {
    hanzi: "药",
  },
  {
    hanzi: "菜",
  },
  {
    hanzi: "菜单",
  },
  {
    hanzi: "爱好",
  },
  {
    hanzi: "借口",
  },
  {
    hanzi: "收入",
  },
  {
    hanzi: "改变",
  },
  {
    hanzi: "数",
  },
  {
    hanzi: "记者",
  },
  {
    hanzi: "猪",
  },
  {
    hanzi: "猪肉",
  },
  {
    hanzi: "老公",
  },
  {
    hanzi: "老外",
  },
  {
    hanzi: "老人",
  },
  {
    hanzi: "口语",
  },
  {
    hanzi: "语言",
  },
  {
    hanzi: "汉语",
  },
  {
    hanzi: "语法",
  },
  {
    hanzi: "外语",
  },
  {
    hanzi: "床",
  },
  {
    hanzi: "饭店",
  },
  {
    hanzi: "书店",
  },
  {
    hanzi: "反应",
  },
  {
    hanzi: "小学",
  },
  {
    hanzi: "中学",
  },
  {
    hanzi: "大学",
  },
  {
    hanzi: "学习",
  },
  {
    hanzi: "同学",
  },
  {
    hanzi: "学校",
  },
  {
    hanzi: "教学楼",
  },
  {
    hanzi: "学院",
  },
  {
    hanzi: "孩子",
  },
  {
    hanzi: "男孩",
  },
  {
    hanzi: "小孩",
  },
  {
    hanzi: "水",
  },
  {
    hanzi: "水果",
  },
  {
    hanzi: "冰",
  },
  {
    hanzi: "冰水",
  },
  {
    hanzi: "要求",
  },
  {
    hanzi: "地球",
  },
  {
    hanzi: "球",
  },
  {
    hanzi: "火",
  },
  {
    hanzi: "灯",
  },
  {
    hanzi: "里面",
  },
  {
    hanzi: "里边",
  },
  {
    hanzi: "作为",
  },
  {
    hanzi: "工作",
  },
  {
    hanzi: "动作",
  },
  {
    hanzi: "工作日",
  },
  {
    hanzi: "昨天",
  },
  {
    hanzi: "情",
  },
  {
    hanzi: "情况",
  },
  {
    hanzi: "表情",
  },
  {
    hanzi: "手表",
  },
  {
    hanzi: "女生",
  },
  {
    hanzi: "男生",
  },
  {
    hanzi: "学生",
  },
  {
    hanzi: "生日",
  },
  {
    hanzi: "生活",
  },
  {
    hanzi: "小学生",
  },
  {
    hanzi: "中学生",
  },
  {
    hanzi: "大学生",
  },
  {
    hanzi: "星",
  },
  {
    hanzi: "晚饭",
  },
  {
    hanzi: "晚上",
  },
  {
    hanzi: "家",
  },
  {
    hanzi: "家里",
  },
  {
    hanzi: "国家",
  },
  {
    hanzi: "家人",
  },
  {
    hanzi: "老家",
  },
  {
    hanzi: "大象",
  },
  {
    hanzi: "头",
  },
  {
    hanzi: "头发",
  },
  {
    hanzi: "木头",
  },
  {
    hanzi: "舌头",
  },
  {
    hanzi: "实话",
  },
  {
    hanzi: "买卖",
  },
  {
    hanzi: "牛",
  },
  {
    hanzi: "牛肉",
  },
  {
    hanzi: "特点",
  },
  {
    hanzi: "广告",
  },
  {
    hanzi: "先生",
  },
  {
    hanzi: "洗手间",
  },
  {
    hanzi: "当时",
  },
  {
    hanzi: "事",
  },
  {
    hanzi: "事情",
  },
  {
    hanzi: "同事",
  },
  {
    hanzi: "事儿",
  },
  {
    hanzi: "大便",
  },
  {
    hanzi: "小便",
  },
  {
    hanzi: "石头",
  },
  {
    hanzi: "公交车",
  },
  {
    hanzi: "火车",
  },
  {
    hanzi: "汽车",
  },
  {
    hanzi: "自行车",
  },
  {
    hanzi: "电动车",
  },
  {
    hanzi: "年轻人",
  },
  {
    hanzi: "女士",
  },
  {
    hanzi: "信任",
  },
  {
    hanzi: "土豆",
  },
  {
    hanzi: "热水",
  },
  {
    hanzi: "风景",
  },
  {
    hanzi: "电影",
  },
  {
    hanzi: "影子",
  },
  {
    hanzi: "电影院",
  },
  {
    hanzi: "成长",
  },
  {
    hanzi: "成人",
  },
  {
    hanzi: "感情",
  },
  {
    hanzi: "感觉",
  },
  {
    hanzi: "钱",
    pinyin: "",
    en: "Money",
  },
  {
    hanzi: "钱包",
  },
  {
    hanzi: "帅哥",
  },
  {
    hanzi: "老师",
  },
  {
    hanzi: "城市",
  },
  {
    hanzi: "雨",
  },
  {
    hanzi: "雪",
  },
  {
    hanzi: "冬天",
  },
  {
    hanzi: "地图",
  },
  {
    hanzi: "客人",
  },
  {
    hanzi: "服务",
  },
  {
    hanzi: "服务员",
  },
  {
    hanzi: "夏天",
  },
  {
    hanzi: "跑步",
  },
  {
    hanzi: "路",
  },
  {
    hanzi: "走路",
  },
  {
    hanzi: "路上",
  },
  {
    hanzi: "路口",
  },
  {
    hanzi: "马路",
  },
  {
    hanzi: "票",
  },
  {
    hanzi: "车票",
  },
  {
    hanzi: "机票",
  },
  {
    hanzi: "火车票",
  },
  {
    hanzi: "门票",
  },
  {
    hanzi: "电影票",
  },
  {
    hanzi: "电视",
  },
  {
    hanzi: "电视机",
  },
  {
    hanzi: "短信",
  },
  {
    hanzi: "医生",
  },
  {
    hanzi: "医院",
  },
  {
    hanzi: "时候",
  },
  {
    hanzi: "小时候",
  },
  {
    hanzi: "有时候",
  },
  {
    hanzi: "虫子",
  },
  {
    hanzi: "兄弟",
  },
  {
    hanzi: "准备",
  },
  {
    hanzi: "笑",
  },
  {
    hanzi: "发音",
  },
  {
    hanzi: "意思",
  },
  {
    hanzi: "注意",
  },
  {
    hanzi: "意外",
  },
  {
    hanzi: "站",
  },
  {
    hanzi: "网站",
  },
  {
    hanzi: "火车站",
  },
  {
    hanzi: "车站",
  },
  {
    hanzi: "母亲",
  },
  {
    hanzi: "父亲",
  },
  {
    hanzi: "新闻",
  },
  {
    hanzi: "新年",
  },
  {
    hanzi: "面条",
  },
  {
    hanzi: "音乐",
  },
  {
    hanzi: "茶",
  },
  {
    hanzi: "奶奶",
  },
  {
    hanzi: "牛奶",
  },
  {
    hanzi: "声音",
  },
  {
    hanzi: "歌",
  },
  {
    hanzi: "歌手",
  },
  {
    hanzi: "上次",
  },
  {
    hanzi: "下次",
  },
  {
    hanzi: "地方",
  },
  {
    hanzi: "方法",
  },
  {
    hanzi: "房子",
  },
  {
    hanzi: "房间",
  },
  {
    hanzi: "房东",
  },
  {
    hanzi: "白色",
  },
  {
    hanzi: "红色",
  },
  {
    hanzi: "黑色",
  },
  {
    hanzi: "姐姐",
  },
  {
    hanzi: "小姐",
  },
  {
    hanzi: "病",
  },
  {
    hanzi: "报纸",
  },
  {
    hanzi: "纸",
  },
  {
    hanzi: "北边",
  },
  {
    hanzi: "南边",
  },
  {
    hanzi: "海",
  },
  {
    hanzi: "上海",
  },
  {
    hanzi: "上海市",
  },
  {
    hanzi: "大海",
  },
  {
    hanzi: "海边",
  },
  {
    hanzi: "海关",
  },
  {
    hanzi: "毒",
  },
  {
    hanzi: "病毒",
  },
  {
    hanzi: "羊肉",
  },
  {
    hanzi: "包子",
  },
  {
    hanzi: "皮包",
  },
  {
    hanzi: "长江",
  },
  {
    hanzi: "长城",
  },
  {
    hanzi: "海洋",
  },
  {
    hanzi: "大西洋",
  },
  {
    hanzi: "知识",
  },
  {
    hanzi: "不一会儿",
  },
  {
    hanzi: "原因",
  },
  {
    hanzi: "原来",
  },
  {
    hanzi: "原文",
  },
  {
    hanzi: "来源",
  },
  {
    hanzi: "源",
  },
  {
    hanzi: "能源",
  },
  {
    hanzi: "同时",
  },
  {
    hanzi: "爱情",
  },
  {
    hanzi: "老太太",
  },
  {
    hanzi: "老头儿",
  },
  {
    hanzi: "四川",
  },
  {
    hanzi: "地点",
  },
  {
    hanzi: "重点",
  },
  {
    hanzi: "里头",
  },
  {
    hanzi: "心里",
  },
  {
    hanzi: "心情",
  },
  {
    hanzi: "广州",
  },
  {
    hanzi: "州",
  },
  {
    hanzi: "贵州",
  },
  {
    hanzi: "洲",
  },
  {
    hanzi: "非洲",
  },
  {
    hanzi: "美洲",
  },
  {
    hanzi: "拉丁美洲",
  },
  {
    hanzi: "北美洲",
  },
  {
    hanzi: "南美洲",
  },
  {
    hanzi: "信心",
  },
  {
    hanzi: "大自然",
  },
  {
    hanzi: "心中",
  },
  {
    hanzi: "中医",
  },
  {
    hanzi: "西医",
  },
  {
    hanzi: "教育",
  },
  {
    hanzi: "体育",
  },
  {
    hanzi: "网球",
  },
  {
    hanzi: "足球",
  },
  {
    hanzi: "主流",
  },
  {
    hanzi: "流感",
  },
  {
    hanzi: "校园",
  },
  {
    hanzi: "校长",
  },
  {
    hanzi: "班长",
  },
  {
    hanzi: "家长",
  },
  {
    hanzi: "市长",
  },
  {
    hanzi: "院长",
  },
  {
    hanzi: "所长",
  },
  {
    hanzi: "系统",
  },
  {
    hanzi: "统计",
  },
  {
    hanzi: "总统",
  },
  {
    hanzi: "信用卡",
  },
  {
    hanzi: "银行卡",
  },
  {
    hanzi: "卡车",
  },
  {
    hanzi: "车辆",
  },
  {
    hanzi: "公共汽车",
  },
  {
    hanzi: "经济",
  },
  {
    hanzi: "相关",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "精力",
  },
  {
    hanzi: "消息",
  },
  {
    hanzi: "对比",
  },
  {
    hanzi: "小说",
  },
  {
    hanzi: "对方",
  },
  {
    hanzi: "方式",
  },
  {
    hanzi: "样式",
  },
  {
    hanzi: "方面",
  },
  {
    hanzi: "方便面",
  },
  {
    hanzi: "治安",
  },
  {
    hanzi: "北方",
  },
  {
    hanzi: "东方",
  },
  {
    hanzi: "西方",
  },
  {
    hanzi: "南方",
  },
  {
    hanzi: "东南",
  },
  {
    hanzi: "东北",
  },
  {
    hanzi: "西南",
  },
  {
    hanzi: "西北",
  },
  {
    hanzi: "露",
  },
  {
    hanzi: "对手",
  },
  {
    hanzi: "对象",
  },
  {
    hanzi: "千万",
  },
  {
    hanzi: "酒",
  },
  {
    hanzi: "酒店",
  },
  {
    hanzi: "白酒",
  },
  {
    hanzi: "红酒",
  },
  {
    hanzi: "感谢",
  },
  {
    hanzi: "首都",
  },
  {
    hanzi: "自尊",
  },
  {
    hanzi: "自尊心",
  },
  {
    hanzi: "酸奶",
  },
  {
    hanzi: "对话",
  },
  {
    hanzi: "笑话",
  },
  {
    hanzi: "波",
  },
  {
    hanzi: "波动",
  },
  {
    hanzi: "胡子",
  },
  {
    hanzi: "湖",
  },
  {
    hanzi: "湖南",
  },
  {
    hanzi: "江湖",
  },
  {
    hanzi: "面前",
  },
  {
    hanzi: "前后",
  },
  {
    hanzi: "动脉",
  },
  {
    hanzi: "名单",
  },
  {
    hanzi: "姓名",
  },
  {
    hanzi: "名片",
  },
  {
    hanzi: "图片",
  },
  {
    hanzi: "药片",
  },
  {
    hanzi: "药店",
  },
  {
    hanzi: "药水",
  },
  {
    hanzi: "影片",
  },
  {
    hanzi: "影视",
  },
  {
    hanzi: "电视台",
  },
  {
    hanzi: "米兰",
  },
  {
    hanzi: "之后",
  },
  {
    hanzi: "之间",
  },
  {
    hanzi: "之前",
  },
  {
    hanzi: "之中",
  },
  {
    hanzi: "之外",
  },
  {
    hanzi: "之下",
  },
  {
    hanzi: "之所以",
  },
  {
    hanzi: "之内",
  },
  {
    hanzi: "之上",
  },
  {
    hanzi: "主意",
  },
  {
    hanzi: "意见",
  },
  {
    hanzi: "派",
  },
  {
    hanzi: "派出所",
  },
  {
    hanzi: "游客",
  },
  {
    hanzi: "游泳",
  },
  {
    hanzi: "表面",
  },
  {
    hanzi: "代表",
  },
  {
    hanzi: "家族",
  },
  {
    hanzi: "旅游",
  },
  {
    hanzi: "旅客",
  },
  {
    hanzi: "旅行",
  },
  {
    hanzi: "新浪",
  },
  {
    hanzi: "海浪",
  },
  {
    hanzi: "表现",
  },
  {
    hanzi: "体会",
  },
  {
    hanzi: "会计",
  },
  {
    hanzi: "新郎",
  },
  {
    hanzi: "新娘",
  },
  {
    hanzi: "娘",
  },
  {
    hanzi: "姑娘",
  },
  {
    hanzi: "力气",
  },
  {
    hanzi: "气候",
  },
  {
    hanzi: "沙",
  },
  {
    hanzi: "沙子",
  },
  {
    hanzi: "长沙",
  },
  {
    hanzi: "沙发",
  },
  {
    hanzi: "省",
  },
  {
    hanzi: "全省",
  },
  {
    hanzi: "广东省",
  },
  {
    hanzi: "眼",
  },
  {
    hanzi: "眼前",
  },
  {
    hanzi: "眼睛",
  },
  {
    hanzi: "现实",
  },
  {
    hanzi: "前途",
  },
  {
    hanzi: "旅途",
  },
  {
    hanzi: "用途",
  },
  {
    hanzi: "作用",
  },
  {
    hanzi: "应用",
  },
  {
    hanzi: "外汇",
  },
  {
    hanzi: "词汇",
  },
  {
    hanzi: "差距",
  },
  {
    hanzi: "湾",
  },
  {
    hanzi: "台湾",
  },
  {
    hanzi: "海湾",
  },
  {
    hanzi: "实习",
  },
  {
    hanzi: "果实",
  },
  {
    hanzi: "子弹",
  },
  {
    hanzi: "污染",
  },
  {
    hanzi: "污水",
  },
  {
    hanzi: "汗",
  },
  {
    hanzi: "汗水",
  },
  {
    hanzi: "水平",
  },
  {
    hanzi: "和平",
  },
  {
    hanzi: "平台",
  },
  {
    hanzi: "平时",
  },
  {
    hanzi: "太平洋",
  },
  {
    hanzi: "幸运",
  },
  {
    hanzi: "不幸",
  },
  {
    hanzi: "超市",
  },
  {
    hanzi: "兴趣",
  },
  {
    hanzi: "乐趣",
  },
  {
    hanzi: "事实",
  },
  {
    hanzi: "好事",
  },
  {
    hanzi: "本事",
  },
  {
    hanzi: "聚会",
  },
  {
    hanzi: "果汁",
  },
  {
    hanzi: "表演",
  },
  {
    hanzi: "演出",
  },
  {
    hanzi: "演员",
  },
  {
    hanzi: "演唱",
  },
  {
    hanzi: "演唱会",
  },
  {
    hanzi: "事件",
  },
  {
    hanzi: "条件",
  },
  {
    hanzi: "日记",
  },
  {
    hanzi: "人物",
  },
  {
    hanzi: "动物",
  },
  {
    hanzi: "动物园",
  },
  {
    hanzi: "药物",
  },
  {
    hanzi: "生物",
  },
  {
    hanzi: "植物",
  },
  {
    hanzi: "物品",
  },
  {
    hanzi: "文物",
  },
  {
    hanzi: "事物",
  },
  {
    hanzi: "交易",
  },
  {
    hanzi: "汤",
  },
  {
    hanzi: "场",
  },
  {
    hanzi: "市场",
  },
  {
    hanzi: "现场",
  },
  {
    hanzi: "市场经济",
  },
  {
    hanzi: "广场",
  },
  {
    hanzi: "主场",
  },
  {
    hanzi: "半场",
  },
  {
    hanzi: "机场",
  },
  {
    hanzi: "场所",
  },
  {
    hanzi: "全场",
  },
  {
    hanzi: "客场",
  },
  {
    hanzi: "当场",
  },
  {
    hanzi: "场面",
  },
  {
    hanzi: "球场",
  },
  {
    hanzi: "体育场",
  },
  {
    hanzi: "停车场",
  },
  {
    hanzi: "场合",
  },
  {
    hanzi: "现象",
  },
  {
    hanzi: "现代",
  },
  {
    hanzi: "近代",
  },
  {
    hanzi: "古代",
  },
  {
    hanzi: "主持人",
  },
  {
    hanzi: "年代",
  },
  {
    hanzi: "少年",
  },
  {
    hanzi: "青年",
  },
  {
    hanzi: "青少年",
  },
  {
    hanzi: "中年",
  },
  {
    hanzi: "老年",
  },
  {
    hanzi: "前年",
  },
  {
    hanzi: "后年",
  },
  {
    hanzi: "周年",
  },
  {
    hanzi: "上周",
  },
  {
    hanzi: "下周",
  },
  {
    hanzi: "全年",
  },
  {
    hanzi: "特征",
  },
  {
    hanzi: "微笑",
  },
  {
    hanzi: "微软",
  },
  {
    hanzi: "微信",
  },
  {
    hanzi: "根据",
  },
  {
    hanzi: "数据",
  },
  {
    hanzi: "指数",
  },
  {
    hanzi: "指示",
  },
  {
    hanzi: "手指",
  },
  {
    hanzi: "龙",
  },
  {
    hanzi: "全国",
  },
  {
    hanzi: "全家",
  },
  {
    hanzi: "全身",
  },
  {
    hanzi: "全球",
  },
  {
    hanzi: "技能",
  },
  {
    hanzi: "鼓",
  },
  {
    hanzi: "护照",
  },
  {
    hanzi: "护士",
  },
  {
    hanzi: "骗子",
  },
  {
    hanzi: "时代",
  },
  {
    hanzi: "时差",
  },
  {
    hanzi: "时期",
  },
  {
    hanzi: "学期",
  },
  {
    hanzi: "定期",
  },
  {
    hanzi: "近期",
  },
  {
    hanzi: "期间",
  },
  {
    hanzi: "常识",
  },
  {
    hanzi: "执照",
  },
  {
    hanzi: "爪子",
  },
  {
    hanzi: "老百姓",
  },
  {
    hanzi: "老朋友",
  },
  {
    hanzi: "西瓜",
  },
  {
    hanzi: "木瓜",
  },
  {
    hanzi: "南瓜",
  },
  {
    hanzi: "瓜子",
  },
  {
    hanzi: "冬瓜",
  },
  {
    hanzi: "苦瓜",
  },
  {
    hanzi: "花生",
  },
  {
    hanzi: "生意",
  },
  {
    hanzi: "生词",
  },
  {
    hanzi: "词语",
  },
  {
    hanzi: "心跳",
  },
  {
    hanzi: "一生",
  },
  {
    hanzi: "人生",
  },
  {
    hanzi: "行人",
  },
  {
    hanzi: "飞行",
  },
  {
    hanzi: "措施",
  },
  {
    hanzi: "进展",
  },
  {
    hanzi: "行动",
  },
  {
    hanzi: "动力",
  },
  {
    hanzi: "实力",
  },
  {
    hanzi: "教授",
  },
  {
    hanzi: "家庭",
  },
  {
    hanzi: "法庭",
  },
  {
    hanzi: "主张",
  },
  {
    hanzi: "拥抱",
  },
  {
    hanzi: "粉",
  },
  {
    hanzi: "奶粉",
  },
  {
    hanzi: "主人",
  },
  {
    hanzi: "主题",
  },
  {
    hanzi: "主任",
  },
  {
    hanzi: "任务",
  },
  {
    hanzi: "技术",
  },
  {
    hanzi: "手术",
  },
  {
    hanzi: "学术",
  },
  {
    hanzi: "美术",
  },
  {
    hanzi: "风格",
  },
  {
    hanzi: "表格",
  },
  {
    hanzi: "标准",
  },
  {
    hanzi: "目标",
  },
  {
    hanzi: "指标",
  },
  {
    hanzi: "标题",
  },
  {
    hanzi: "国际",
  },
  {
    hanzi: "实际",
  },
  {
    hanzi: "之际",
  },
  {
    hanzi: "梦",
  },
  {
    hanzi: "梦想",
  },
  {
    hanzi: "麻烦",
  },
  {
    hanzi: "摩托车",
  },
  {
    hanzi: "蛋",
  },
  {
    hanzi: "蛋白",
  },
  {
    hanzi: "森林",
  },
  {
    hanzi: "案",
  },
  {
    hanzi: "方案",
  },
  {
    hanzi: "案件",
  },
  {
    hanzi: "草案",
  },
  {
    hanzi: "未来",
  },
  {
    hanzi: "味道",
  },
  {
    hanzi: "口味",
  },
  {
    hanzi: "妹妹",
  },
  {
    hanzi: "姐妹",
  },
  {
    hanzi: "兄妹",
  },
  {
    hanzi: "兄弟姐妹",
  },
  {
    hanzi: "根",
  },
  {
    hanzi: "根本",
  },
  {
    hanzi: "勾",
  },
  {
    hanzi: "机构",
  },
  {
    hanzi: "沟",
  },
  {
    hanzi: "村",
  },
  {
    hanzi: "树",
  },
  {
    hanzi: "树木",
  },
  {
    hanzi: "老板",
  },
  {
    hanzi: "板块",
  },
  {
    hanzi: "黑板",
  },
  {
    hanzi: "版",
  },
  {
    hanzi: "版本",
  },
  {
    hanzi: "教材",
  },
  {
    hanzi: "身材",
  },
  {
    hanzi: "整个",
  },
  {
    hanzi: "整体",
  },
  {
    hanzi: "整天",
  },
  {
    hanzi: "千辛万苦",
  },
  {
    hanzi: "道路",
  },
  {
    hanzi: "路边",
  },
  {
    hanzi: "公路",
  },
  {
    hanzi: "核心",
  },
  {
    hanzi: "时刻",
  },
  {
    hanzi: "一刻",
  },
  {
    hanzi: "书架",
  },
  {
    hanzi: "衣架",
  },
  {
    hanzi: "枪",
  },
  {
    hanzi: "手枪",
  },
  {
    hanzi: "档案",
  },
  {
    hanzi: "档次",
  },
  {
    hanzi: "光",
  },
  {
    hanzi: "目光",
  },
  {
    hanzi: "时光",
  },
  {
    hanzi: "光明",
  },
  {
    hanzi: "电梯",
  },
  {
    hanzi: "楼梯",
  },
  {
    hanzi: "公主",
  },
  {
    hanzi: "外公",
  },
  {
    hanzi: "公元",
  },
  {
    hanzi: "耳朵",
  },
  {
    hanzi: "花朵",
  },
  {
    hanzi: "西红柿",
  },
  {
    hanzi: "柿子",
  },
  {
    hanzi: "橡皮",
  },
  {
    hanzi: "单元",
  },
  {
    hanzi: "美元",
  },
  {
    hanzi: "单位",
  },
  {
    hanzi: "地位",
  },
  {
    hanzi: "元旦",
  },
  {
    hanzi: "位置",
  },
  {
    hanzi: "配置",
  },
  {
    hanzi: "罗马",
  },
  {
    hanzi: "保安",
  },
  {
    hanzi: "价",
  },
  {
    hanzi: "价格",
  },
  {
    hanzi: "价值",
  },
  {
    hanzi: "房价",
  },
  {
    hanzi: "代价",
  },
  {
    hanzi: "价钱",
  },
  {
    hanzi: "票价",
  },
  {
    hanzi: "教师",
  },
  {
    hanzi: "教学",
  },
  {
    hanzi: "外界",
  },
  {
    hanzi: "台阶",
  },
  {
    hanzi: "专家",
  },
  {
    hanzi: "专题",
  },
  {
    hanzi: "传说",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传统",
  },
  {
    hanzi: "传染病",
  },
  {
    hanzi: "转化",
  },
  {
    hanzi: "港",
  },
  {
    hanzi: "香港",
  },
  {
    hanzi: "暴力",
  },
  {
    hanzi: "风暴",
  },
  {
    hanzi: "暴雨",
  },
  {
    hanzi: "开水",
  },
  {
    hanzi: "伤",
  },
  {
    hanzi: "损伤",
  },
  {
    hanzi: "优点",
  },
  {
    hanzi: "夜",
  },
  {
    hanzi: "夜间",
  },
  {
    hanzi: "半夜",
  },
  {
    hanzi: "夜晚",
  },
  {
    hanzi: "深夜",
  },
  {
    hanzi: "夜里",
  },
  {
    hanzi: "洗手液",
  },
  {
    hanzi: "液体",
  },
  {
    hanzi: "依据",
  },
  {
    hanzi: "假期",
  },
  {
    hanzi: "发言",
  },
  {
    hanzi: "发票",
  },
  {
    hanzi: "支票",
  },
  {
    hanzi: "办公室",
  },
  {
    hanzi: "室内",
  },
  {
    hanzi: "教室",
  },
  {
    hanzi: "屋",
  },
  {
    hanzi: "房屋",
  },
  {
    hanzi: "家伙",
  },
  {
    hanzi: "小伙子",
  },
  {
    hanzi: "伙伴",
  },
  {
    hanzi: "静脉",
  },
  {
    hanzi: "法律",
  },
  {
    hanzi: "律师",
  },
  {
    hanzi: "健康",
  },
  {
    hanzi: "保健",
  },
  {
    hanzi: "健身",
  },
  {
    hanzi: "君子",
  },
  {
    hanzi: "人群",
  },
  {
    hanzi: "方向",
  },
  {
    hanzi: "走向",
  },
  {
    hanzi: "影响",
  },
  {
    hanzi: "影响力",
  },
  {
    hanzi: "时尚",
  },
  {
    hanzi: "躺椅",
  },
  {
    hanzi: "作品",
  },
  {
    hanzi: "品种",
  },
  {
    hanzi: "药品",
  },
  {
    hanzi: "精品",
  },
  {
    hanzi: "正品",
  },
  {
    hanzi: "噪音",
  },
  {
    hanzi: "发明",
  },
  {
    hanzi: "明星",
  },
  {
    hanzi: "星星",
  },
  {
    hanzi: "文明",
  },
  {
    hanzi: "操场",
  },
  {
    hanzi: "洗澡",
  },
  {
    hanzi: "机器",
  },
  {
    hanzi: "曾经",
  },
  {
    hanzi: "号",
  },
  {
    hanzi: "信号",
  },
  {
    hanzi: "考试",
  },
  {
    hanzi: "考生",
  },
  {
    hanzi: "思考",
  },
  {
    hanzi: "高考",
  },
  {
    hanzi: "考核",
  },
  {
    hanzi: "声明",
  },
  {
    hanzi: "歌声",
  },
  {
    hanzi: "小吃",
  },
  {
    hanzi: "技巧",
  },
  {
    hanzi: "巧合",
  },
  {
    hanzi: "花言巧语",
  },
  {
    hanzi: "自由",
  },
  {
    hanzi: "路由器",
  },
  {
    hanzi: "油",
  },
  {
    hanzi: "加油站",
  },
  {
    hanzi: "石油",
  },
  {
    hanzi: "原油",
  },
  {
    hanzi: "黄金",
  },
  {
    hanzi: "黄色",
  },
  {
    hanzi: "黄河",
  },
  {
    hanzi: "黄瓜",
  },
  {
    hanzi: "高峰",
  },
  {
    hanzi: "否定",
  },
  {
    hanzi: "文件",
  },
  {
    hanzi: "硬件",
  },
  {
    hanzi: "软件",
  },
  {
    hanzi: "命",
  },
  {
    hanzi: "生命",
  },
  {
    hanzi: "命运",
  },
  {
    hanzi: "善",
  },
  {
    hanzi: "善良",
  },
  {
    hanzi: "叶",
  },
  {
    hanzi: "茶叶",
  },
  {
    hanzi: "叶子",
  },
  {
    hanzi: "树叶",
  },
  {
    hanzi: "呼吸",
  },
  {
    hanzi: "文字",
  },
  {
    hanzi: "字母",
  },
  {
    hanzi: "文学",
  },
  {
    hanzi: "嘴",
  },
  {
    hanzi: "嘴巴",
  },
  {
    hanzi: "售价",
  },
  {
    hanzi: "咖啡",
  },
  {
    hanzi: "学问",
  },
  {
    hanzi: "排",
  },
  {
    hanzi: "排名",
  },
  {
    hanzi: "安排",
  },
  {
    hanzi: "排球",
  },
  {
    hanzi: "罪",
  },
  {
    hanzi: "依靠",
  },
  {
    hanzi: "结果",
  },
  {
    hanzi: "结构",
  },
  {
    hanzi: "结合",
  },
  {
    hanzi: "总结",
  },
  {
    hanzi: "组",
  },
  {
    hanzi: "小组",
  },
  {
    hanzi: "组合",
  },
  {
    hanzi: "组长",
  },
  {
    hanzi: "工具",
  },
  {
    hanzi: "家具",
  },
  {
    hanzi: "玩具",
  },
  {
    hanzi: "化学",
  },
  {
    hanzi: "作家",
  },
  {
    hanzi: "作者",
  },
  {
    hanzi: "读者",
  },
  {
    hanzi: "读音",
  },
  {
    hanzi: "音乐会",
  },
  {
    hanzi: "收音机",
  },
  {
    hanzi: "线",
  },
  {
    hanzi: "路线",
  },
  {
    hanzi: "线路",
  },
  {
    hanzi: "热线",
  },
  {
    hanzi: "级",
  },
  {
    hanzi: "各级",
  },
  {
    hanzi: "等级",
  },
  {
    hanzi: "年级",
  },
  {
    hanzi: "中级",
  },
  {
    hanzi: "班级",
  },
  {
    hanzi: "手续",
  },
  {
    hanzi: "职工",
  },
  {
    hanzi: "职能",
  },
  {
    hanzi: "职务",
  },
  {
    hanzi: "最终",
  },
  {
    hanzi: "思维",
  },
  {
    hanzi: "维生素",
  },
  {
    hanzi: "焦点",
  },
  {
    hanzi: "香蕉",
  },
  {
    hanzi: "相机",
  },
  {
    hanzi: "计算机",
  },
  {
    hanzi: "洗衣机",
  },
  {
    hanzi: "上衣",
  },
  {
    hanzi: "熊",
  },
  {
    hanzi: "熊猫",
  },
  {
    hanzi: "小熊",
  },
  {
    hanzi: "世界",
  },
  {
    hanzi: "世界杯",
  },
  {
    hanzi: "全世界",
  },
  {
    hanzi: "负担",
  },
  {
    hanzi: "世纪",
  },
  {
    hanzi: "教练",
  },
  {
    hanzi: "主教练",
  },
  {
    hanzi: "练习",
  },
  {
    hanzi: "作文",
  },
  {
    hanzi: "外文",
  },
  {
    hanzi: "丝",
  },
  {
    hanzi: "粉丝",
  },
  {
    hanzi: "成绩",
  },
  {
    hanzi: "综合",
  },
  {
    hanzi: "写作",
  },
  {
    hanzi: "合作",
  },
  {
    hanzi: "合同",
  },
  {
    hanzi: "联合",
  },
  {
    hanzi: "联合国",
  },
  {
    hanzi: "宿舍",
  },
  {
    hanzi: "边缘",
  },
  {
    hanzi: "缘分",
  },
  {
    hanzi: "交往",
  },
  {
    hanzi: "外交",
  },
  {
    hanzi: "控制",
  },
  {
    hanzi: "机制",
  },
  {
    hanzi: "体制",
  },
  {
    hanzi: "编制",
  },
  {
    hanzi: "法制",
  },
  {
    hanzi: "刑事",
  },
  {
    hanzi: "死刑",
  },
  {
    hanzi: "车型",
  },
  {
    hanzi: "形式",
  },
  {
    hanzi: "形象",
  },
  {
    hanzi: "情形",
  },
  {
    hanzi: "家务",
  },
  {
    hanzi: "日报",
  },
  {
    hanzi: "晚报",
  },
  {
    hanzi: "晚会",
  },
  {
    hanzi: "原则",
  },
  {
    hanzi: "厕所",
  },
  {
    hanzi: "测试",
  },
  {
    hanzi: "创新",
  },
  {
    hanzi: "创作",
  },
  {
    hanzi: "创意",
  },
  {
    hanzi: "列",
  },
  {
    hanzi: "系列",
  },
  {
    hanzi: "一系列",
  },
  {
    hanzi: "以色列",
  },
  {
    hanzi: "列车",
  },
  {
    hanzi: "排列",
  },
  {
    hanzi: "例",
  },
  {
    hanzi: "比例",
  },
  {
    hanzi: "条例",
  },
  {
    hanzi: "病例",
  },
  {
    hanzi: "案例",
  },
  {
    hanzi: "例子",
  },
  {
    hanzi: "例外",
  },
  {
    hanzi: "副主任",
  },
  {
    hanzi: "副总统",
  },
  {
    hanzi: "幸福",
  },
  {
    hanzi: "福建",
  },
  {
    hanzi: "报道",
  },
  {
    hanzi: "地道",
  },
  {
    hanzi: "报告",
  },
  {
    hanzi: "涨幅",
  },
  {
    hanzi: "剧",
  },
  {
    hanzi: "电视剧",
  },
  {
    hanzi: "京剧",
  },
  {
    hanzi: "话剧",
  },
  {
    hanzi: "剧场",
  },
  {
    hanzi: "连续剧",
  },
  {
    hanzi: "判决",
  },
  {
    hanzi: "刺",
  },
  {
    hanzi: "牙刷",
  },
  {
    hanzi: "个子",
  },
  {
    hanzi: "小偷",
  },
  {
    hanzi: "线索",
  },
  {
    hanzi: "素",
  },
  {
    hanzi: "因素",
  },
  {
    hanzi: "元素",
  },
  {
    hanzi: "像素",
  },
  {
    hanzi: "责任",
  },
  {
    hanzi: "负责人",
  },
  {
    hanzi: "职责",
  },
  {
    hanzi: "数字",
  },
  {
    hanzi: "人数",
  },
  {
    hanzi: "分数",
  },
  {
    hanzi: "分别",
  },
  {
    hanzi: "表达",
  },
  {
    hanzi: "选手",
  },
  {
    hanzi: "造型",
  },
  {
    hanzi: "成分",
  },
  {
    hanzi: "成就",
  },
  {
    hanzi: "机遇",
  },
  {
    hanzi: "偶像",
  },
  {
    hanzi: "公寓",
  },
  {
    hanzi: "官员",
  },
  {
    hanzi: "官方",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "主管",
  },
  {
    hanzi: "图书馆",
  },
  {
    hanzi: "旅馆",
  },
  {
    hanzi: "大使馆",
  },
  {
    hanzi: "饭馆",
  },
  {
    hanzi: "体育馆",
  },
  {
    hanzi: "饺子",
  },
  {
    hanzi: "成果",
  },
  {
    hanzi: "后果",
  },
  {
    hanzi: "迷",
  },
  {
    hanzi: "球迷",
  },
  {
    hanzi: "歌迷",
  },
  {
    hanzi: "印",
  },
  {
    hanzi: "印象",
  },
  {
    hanzi: "脚",
  },
  {
    hanzi: "遗传",
  },
  {
    hanzi: "成语",
  },
  {
    hanzi: "语气",
  },
  {
    hanzi: "逃避",
  },
  {
    hanzi: "邀请",
  },
  {
    hanzi: "刺激",
  },
  {
    hanzi: "激情",
  },
  {
    hanzi: "疑问",
  },
  {
    hanzi: "预算",
  },
  {
    hanzi: "预习",
  },
  {
    hanzi: "预报",
  },
  {
    hanzi: "需求",
  },
  {
    hanzi: "请求",
  },
  {
    hanzi: "景色",
  },
  {
    hanzi: "野",
  },
  {
    hanzi: "视野",
  },
  {
    hanzi: "野心",
  },
  {
    hanzi: "概括",
  },
  {
    hanzi: "毛",
  },
  {
    hanzi: "毛巾",
  },
  {
    hanzi: "毛发",
  },
  {
    hanzi: "毛病",
  },
  {
    hanzi: "夫人",
  },
  {
    hanzi: "大夫",
  },
  {
    hanzi: "丈夫",
  },
  {
    hanzi: "工夫",
  },
  {
    hanzi: "规定",
  },
  {
    hanzi: "规划",
  },
  {
    hanzi: "法规",
  },
  {
    hanzi: "规则",
  },
  {
    hanzi: "规律",
  },
  {
    hanzi: "常规",
  },
  {
    hanzi: "皮肤",
  },
  {
    hanzi: "肤色",
  },
  {
    hanzi: "损失",
  },
  {
    hanzi: "铁",
  },
  {
    hanzi: "铁路",
  },
  {
    hanzi: "地铁",
  },
  {
    hanzi: "地铁站",
  },
  {
    hanzi: "城乡",
  },
  {
    hanzi: "家乡",
  },
  {
    hanzi: "率",
  },
  {
    hanzi: "汇率",
  },
  {
    hanzi: "概率",
  },
  {
    hanzi: "利润",
  },
  {
    hanzi: "意大利",
  },
  {
    hanzi: "专利",
  },
  {
    hanzi: "福利",
  },
  {
    hanzi: "利率",
  },
  {
    hanzi: "过程",
  },
  {
    hanzi: "工程",
  },
  {
    hanzi: "程序",
  },
  {
    hanzi: "课程",
  },
  {
    hanzi: "进程",
  },
  {
    hanzi: "工程师",
  },
  {
    hanzi: "斗争",
  },
  {
    hanzi: "科技",
  },
  {
    hanzi: "科学",
  },
  {
    hanzi: "科研",
  },
  {
    hanzi: "学科",
  },
  {
    hanzi: "科学家",
  },
  {
    hanzi: "料",
  },
  {
    hanzi: "材料",
  },
  {
    hanzi: "原料",
  },
  {
    hanzi: "饮料",
  },
  {
    hanzi: "简称",
  },
  {
    hanzi: "名称",
  },
  {
    hanzi: "称呼",
  },
  {
    hanzi: "面积",
  },
  {
    hanzi: "积分",
  },
  {
    hanzi: "税",
  },
  {
    hanzi: "税收",
  },
  {
    hanzi: "冬季",
  },
  {
    hanzi: "夏季",
  },
  {
    hanzi: "秀",
  },
  {
    hanzi: "秘书",
  },
  {
    hanzi: "便秘",
  },
  {
    hanzi: "秘密",
  },
  {
    hanzi: "出租车",
  },
  {
    hanzi: "房租",
  },
  {
    hanzi: "秋季",
  },
  {
    hanzi: "秋天",
  },
  {
    hanzi: "中秋",
  },
  {
    hanzi: "秒钟",
  },
  {
    hanzi: "球队",
  },
  {
    hanzi: "队员",
  },
  {
    hanzi: "中国队",
  },
  {
    hanzi: "大队",
  },
  {
    hanzi: "国家队",
  },
  {
    hanzi: "队长",
  },
  {
    hanzi: "乐队",
  },
  {
    hanzi: "预防",
  },
  {
    hanzi: "消防",
  },
  {
    hanzi: "有限公司",
  },
  {
    hanzi: "舞台",
  },
  {
    hanzi: "跳舞",
  },
  {
    hanzi: "处女",
  },
  {
    hanzi: "之处",
  },
  {
    hanzi: "好处",
  },
  {
    hanzi: "坏处",
  },
  {
    hanzi: "长处",
  },
  {
    hanzi: "短处",
  },
  {
    hanzi: "陈述",
  },
  {
    hanzi: "阵雨",
  },
  {
    hanzi: "亲人",
  },
  {
    hanzi: "爱人",
  },
  {
    hanzi: "爱心",
  },
  {
    hanzi: "大陆",
  },
  {
    hanzi: "附近",
  },
  {
    hanzi: "保障",
  },
  {
    hanzi: "陪伴",
  },
  {
    hanzi: "邮件",
  },
  {
    hanzi: "邮票",
  },
  {
    hanzi: "电子邮件",
  },
  {
    hanzi: "郊外",
  },
  {
    hanzi: "理",
  },
  {
    hanzi: "概念",
  },
  {
    hanzi: "心理",
  },
  {
    hanzi: "理解",
  },
  {
    hanzi: "理由",
  },
  {
    hanzi: "理想",
  },
  {
    hanzi: "经理",
  },
  {
    hanzi: "总理",
  },
  {
    hanzi: "总经理",
  },
  {
    hanzi: "管理",
  },
  {
    hanzi: "道理",
  },
  {
    hanzi: "代理",
  },
  {
    hanzi: "地理",
  },
  {
    hanzi: "量",
  },
  {
    hanzi: "力量",
  },
  {
    hanzi: "数量",
  },
  {
    hanzi: "含量",
  },
  {
    hanzi: "总量",
  },
  {
    hanzi: "能量",
  },
  {
    hanzi: "成交量",
  },
  {
    hanzi: "剂量",
  },
  {
    hanzi: "愿望",
  },
  {
    hanzi: "环保",
  },
  {
    hanzi: "皇上",
  },
  {
    hanzi: "皇家",
  },
  {
    hanzi: "皇后",
  },
  {
    hanzi: "相貌",
  },
  {
    hanzi: "美貌",
  },
  {
    hanzi: "外貌",
  },
  {
    hanzi: "牌",
  },
  {
    hanzi: "品牌",
  },
  {
    hanzi: "金牌",
  },
  {
    hanzi: "名牌",
  },
  {
    hanzi: "牌子",
  },
  {
    hanzi: "银牌",
  },
  {
    hanzi: "啤酒",
  },
  {
    hanzi: "脾",
  },
  {
    hanzi: "脾气",
  },
  {
    hanzi: "基金",
  },
  {
    hanzi: "基本",
  },
  {
    hanzi: "基地",
  },
  {
    hanzi: "基因",
  },
  {
    hanzi: "社会",
  },
  {
    hanzi: "社员",
  },
  {
    hanzi: "出版社",
  },
  {
    hanzi: "旅行社",
  },
  {
    hanzi: "礼物",
  },
  {
    hanzi: "礼貌",
  },
  {
    hanzi: "礼拜天",
  },
  {
    hanzi: "祝福",
  },
  {
    hanzi: "祝愿",
  },
  {
    hanzi: "境内",
  },
  {
    hanzi: "环境",
  },
  {
    hanzi: "镜头",
  },
  {
    hanzi: "眼镜",
  },
  {
    hanzi: "镜子",
  },
  {
    hanzi: "压力",
  },
  {
    hanzi: "热心",
  },
  {
    hanzi: "中心",
  },
  {
    hanzi: "圣经",
  },
  {
    hanzi: "地址",
  },
  {
    hanzi: "垃圾",
  },
  {
    hanzi: "丑闻",
  },
  {
    hanzi: "中介",
  },
  {
    hanzi: "塑料",
  },
  {
    hanzi: "塑料袋",
  },
  {
    hanzi: "逆行",
  },
  {
    hanzi: "股",
  },
  {
    hanzi: "股东",
  },
  {
    hanzi: "股票",
  },
  {
    hanzi: "股份",
  },
  {
    hanzi: "股市",
  },
  {
    hanzi: "股价",
  },
  {
    hanzi: "胜利",
  },
  {
    hanzi: "细胞",
  },
  {
    hanzi: "同胞",
  },
  {
    hanzi: "腿",
  },
  {
    hanzi: "大腿",
  },
  {
    hanzi: "小腿",
  },
  {
    hanzi: "阅读",
  },
  {
    hanzi: "爸",
  },
  {
    hanzi: "爸爸",
  },
  {
    hanzi: "高中",
  },
  {
    hanzi: "土地",
  },
  {
    hanzi: "外地",
  },
  {
    hanzi: "各地",
  },
  {
    hanzi: "各位",
  },
  {
    hanzi: "肯定",
  },
  {
    hanzi: "阴",
  },
  {
    hanzi: "阴天",
  },
  {
    hanzi: "肿",
  },
  {
    hanzi: "牙膏",
  },
  {
    hanzi: "石膏",
  },
  {
    hanzi: "药膏",
  },
  {
    hanzi: "朝鲜",
  },
  {
    hanzi: "潮",
  },
  {
    hanzi: "潮流",
  },
  {
    hanzi: "高潮",
  },
  {
    hanzi: "热潮",
  },
  {
    hanzi: "韩国",
  },
  {
    hanzi: "韩元",
  },
  {
    hanzi: "赢家",
  },
  {
    hanzi: "输赢",
  },
  {
    hanzi: "决心",
  },
  {
    hanzi: "点心",
  },
  {
    hanzi: "背",
  },
  {
    hanzi: "背景",
  },
  {
    hanzi: "背后",
  },
  {
    hanzi: "肌",
  },
  {
    hanzi: "肌肉",
  },
  {
    hanzi: "肌肤",
  },
  {
    hanzi: "胶",
  },
  {
    hanzi: "橡胶",
  },
  {
    hanzi: "胶带",
  },
  {
    hanzi: "乘客",
  },
  {
    hanzi: "剩余",
  },
  {
    hanzi: "剩女",
  },
  {
    hanzi: "滑雪",
  },
  {
    hanzi: "滑冰",
  },
  {
    hanzi: "区",
  },
  {
    hanzi: "地区",
  },
  {
    hanzi: "区域",
  },
  {
    hanzi: "社区",
  },
  {
    hanzi: "小区",
  },
  {
    hanzi: "区别",
  },
  {
    hanzi: "郊区",
  },
  {
    hanzi: "欧洲",
  },
  {
    hanzi: "欧元",
  },
  {
    hanzi: "欧美",
  },
  {
    hanzi: "意义",
  },
  {
    hanzi: "社会主义",
  },
  {
    hanzi: "主义",
  },
  {
    hanzi: "义务",
  },
  {
    hanzi: "含义",
  },
  {
    hanzi: "会议",
  },
  {
    hanzi: "建议",
  },
  {
    hanzi: "决议",
  },
  {
    hanzi: "希望",
  },
  {
    hanzi: "凶手",
  },
  {
    hanzi: "歌曲",
  },
  {
    hanzi: "经典",
  },
  {
    hanzi: "典型",
  },
  {
    hanzi: "典礼",
  },
  {
    hanzi: "古典",
  },
  {
    hanzi: "词典",
  },
  {
    hanzi: "字典",
  },
  {
    hanzi: "胸",
  },
  {
    hanzi: "牙齿",
  },
  {
    hanzi: "年龄",
  },
  {
    hanzi: "距离",
  },
  {
    hanzi: "电脑",
  },
  {
    hanzi: "脑袋",
  },
  {
    hanzi: "脑子",
  },
  {
    hanzi: "大脑",
  },
  {
    hanzi: "头脑",
  },
  {
    hanzi: "烦恼",
  },
  {
    hanzi: "功",
  },
  {
    hanzi: "成功",
  },
  {
    hanzi: "功能",
  },
  {
    hanzi: "功夫",
  },
  {
    hanzi: "功课",
  },
  {
    hanzi: "优势",
  },
  {
    hanzi: "形势",
  },
  {
    hanzi: "走势",
  },
  {
    hanzi: "势力",
  },
  {
    hanzi: "帮助",
  },
  {
    hanzi: "救助",
  },
  {
    hanzi: "历史",
  },
  {
    hanzi: "经历",
  },
  {
    hanzi: "历史上",
  },
  {
    hanzi: "学历",
  },
  {
    hanzi: "阅历",
  },
  {
    hanzi: "努力",
  },
  {
    hanzi: "穷人",
  },
  {
    hanzi: "勇气",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "交通",
  },
  {
    hanzi: "通知",
  },
  {
    hanzi: "沟通",
  },
  {
    hanzi: "通信",
  },
  {
    hanzi: "午睡",
  },
  {
    hanzi: "白菜",
  },
  {
    hanzi: "红茶",
  },
  {
    hanzi: "奶茶",
  },
  {
    hanzi: "桶",
  },
  {
    hanzi: "马桶",
  },
  {
    hanzi: "垃圾桶",
  },
  {
    hanzi: "水桶",
  },
  {
    hanzi: "木桶",
  },
  {
    hanzi: "痛苦",
  },
  {
    hanzi: "疼痛",
  },
  {
    hanzi: "疾病",
  },
  {
    hanzi: "残疾",
  },
  {
    hanzi: "残疾人",
  },
  {
    hanzi: "疯子",
  },
  {
    hanzi: "行业",
  },
  {
    hanzi: "业务",
  },
  {
    hanzi: "专业",
  },
  {
    hanzi: "工业",
  },
  {
    hanzi: "事业",
  },
  {
    hanzi: "职业",
  },
  {
    hanzi: "就业",
  },
  {
    hanzi: "毕业",
  },
  {
    hanzi: "创业",
  },
  {
    hanzi: "作业",
  },
  {
    hanzi: "业内",
  },
  {
    hanzi: "业主",
  },
  {
    hanzi: "毕业生",
  },
  {
    hanzi: "中小企业",
  },
  {
    hanzi: "亚洲",
  },
  {
    hanzi: "显示",
  },
  {
    hanzi: "普通话",
  },
  {
    hanzi: "尊严",
  },
  {
    hanzi: "卫生",
  },
  {
    hanzi: "卫星",
  },
  {
    hanzi: "卫生间",
  },
  {
    hanzi: "武器",
  },
  {
    hanzi: "武汉",
  },
  {
    hanzi: "武术",
  },
  {
    hanzi: "指导",
  },
  {
    hanzi: "导演",
  },
  {
    hanzi: "引导",
  },
  {
    hanzi: "导弹",
  },
  {
    hanzi: "主导",
  },
  {
    hanzi: "导游",
  },
  {
    hanzi: "人民",
  },
  {
    hanzi: "市民",
  },
  {
    hanzi: "民族",
  },
  {
    hanzi: "民主",
  },
  {
    hanzi: "村民",
  },
  {
    hanzi: "公民",
  },
  {
    hanzi: "民间",
  },
  {
    hanzi: "中国人民",
  },
  {
    hanzi: "移民",
  },
  {
    hanzi: "国民经济",
  },
  {
    hanzi: "差异",
  },
  {
    hanzi: "异地",
  },
  {
    hanzi: "将来",
  },
  {
    hanzi: "麻将",
  },
  {
    hanzi: "装",
  },
  {
    hanzi: "装备",
  },
  {
    hanzi: "服装",
  },
  {
    hanzi: "武装",
  },
  {
    hanzi: "包装",
  },
  {
    hanzi: "装置",
  },
  {
    hanzi: "装扮",
  },
  {
    hanzi: "伪装",
  },
  {
    hanzi: "大奖",
  },
  {
    hanzi: "奖金",
  },
  {
    hanzi: "奖品",
  },
  {
    hanzi: "状况",
  },
  {
    hanzi: "症状",
  },
  {
    hanzi: "现状",
  },
  {
    hanzi: "形状",
  },
  {
    hanzi: "射手",
  },
  {
    hanzi: "耐心",
  },
  {
    hanzi: "能耐",
  },
  {
    hanzi: "冠",
  },
  {
    hanzi: "节",
  },
  {
    hanzi: "节目",
  },
  {
    hanzi: "环节",
  },
  {
    hanzi: "音节",
  },
  {
    hanzi: "规范",
  },
  {
    hanzi: "示范",
  },
  {
    hanzi: "艺术",
  },
  {
    hanzi: "工艺",
  },
  {
    hanzi: "文艺",
  },
  {
    hanzi: "瓶",
  },
  {
    hanzi: "瓶子",
  },
  {
    hanzi: "月饼",
  },
  {
    hanzi: "名著",
  },
  {
    hanzi: "苹果",
  },
  {
    hanzi: "苏联",
  },
  {
    hanzi: "江苏",
  },
  {
    hanzi: "协议",
  },
  {
    hanzi: "协会",
  },
  {
    hanzi: "西藏",
  },
  {
    hanzi: "子宫",
  },
  {
    hanzi: "营养",
  },
  {
    hanzi: "劳动",
  },
  {
    hanzi: "劳动力",
  },
  {
    hanzi: "辛劳",
  },
  {
    hanzi: "荣幸",
  },
  {
    hanzi: "理论",
  },
  {
    hanzi: "讨论",
  },
  {
    hanzi: "结论",
  },
  {
    hanzi: "论文",
  },
  {
    hanzi: "评论",
  },
  {
    hanzi: "评价",
  },
  {
    hanzi: "评估",
  },
  {
    hanzi: "批评",
  },
  {
    hanzi: "本报讯",
  },
  {
    hanzi: "通讯员",
  },
  {
    hanzi: "通讯",
  },
  {
    hanzi: "轻视",
  },
  {
    hanzi: "讲话",
  },
  {
    hanzi: "演讲",
  },
  {
    hanzi: "证明",
  },
  {
    hanzi: "保证",
  },
  {
    hanzi: "证据",
  },
  {
    hanzi: "身份证",
  },
  {
    hanzi: "证书",
  },
  {
    hanzi: "证件",
  },
  {
    hanzi: "谈判",
  },
  {
    hanzi: "会谈",
  },
  {
    hanzi: "谈话",
  },
  {
    hanzi: "训练",
  },
  {
    hanzi: "培训",
  },
  {
    hanzi: "采访",
  },
  {
    hanzi: "访问",
  },
  {
    hanzi: "拜访",
  },
  {
    hanzi: "错误",
  },
  {
    hanzi: "失误",
  },
  {
    hanzi: "误会",
  },
  {
    hanzi: "预订",
  },
  {
    hanzi: "诊所",
  },
  {
    hanzi: "承诺",
  },
  {
    hanzi: "诺言",
  },
  {
    hanzi: "真诚",
  },
  {
    hanzi: "诚实",
  },
  {
    hanzi: "诚意",
  },
  {
    hanzi: "详情",
  },
  {
    hanzi: "友谊",
  },
  {
    hanzi: "县",
  },
  {
    hanzi: "县城",
  },
  {
    hanzi: "区县",
  },
  {
    hanzi: "县长",
  },
  {
    hanzi: "原谅",
  },
  {
    hanzi: "谅解",
  },
  {
    hanzi: "体谅",
  },
  {
    hanzi: "凉水",
  },
  {
    hanzi: "度",
  },
  {
    hanzi: "制度",
  },
  {
    hanzi: "程度",
  },
  {
    hanzi: "高度",
  },
  {
    hanzi: "角度",
  },
  {
    hanzi: "印度",
  },
  {
    hanzi: "力度",
  },
  {
    hanzi: "年度",
  },
  {
    hanzi: "季度",
  },
  {
    hanzi: "幅度",
  },
  {
    hanzi: "难度",
  },
  {
    hanzi: "度过",
  },
  {
    hanzi: "强度",
  },
  {
    hanzi: "印度洋",
  },
  {
    hanzi: "主席",
  },
  {
    hanzi: "毛主席",
  },
  {
    hanzi: "首席",
  },
  {
    hanzi: "底",
  },
  {
    hanzi: "年底",
  },
  {
    hanzi: "底下",
  },
  {
    hanzi: "星座",
  },
  {
    hanzi: "座位",
  },
  {
    hanzi: "如今",
  },
  {
    hanzi: "今后",
  },
  {
    hanzi: "庆祝",
  },
  {
    hanzi: "国庆",
  },
  {
    hanzi: "矿",
  },
  {
    hanzi: "矿泉水",
  },
  {
    hanzi: "基础",
  },
  {
    hanzi: "障碍",
  },
  {
    hanzi: "不足",
  },
  {
    hanzi: "数码",
  },
  {
    hanzi: "号码",
  },
  {
    hanzi: "密码",
  },
  {
    hanzi: "码头",
  },
  {
    hanzi: "水库",
  },
  {
    hanzi: "村庄",
  },
  {
    hanzi: "石家庄",
  },
  {
    hanzi: "山庄",
  },
  {
    hanzi: "心脏",
  },
  {
    hanzi: "内脏",
  },
  {
    hanzi: "糖",
  },
  {
    hanzi: "身边",
  },
  {
    hanzi: "自身",
  },
  {
    hanzi: "领导",
  },
  {
    hanzi: "领域",
  },
  {
    hanzi: "领导人",
  },
  {
    hanzi: "本领",
  },
  {
    hanzi: "零钱",
  },
  {
    hanzi: "零下",
  },
  {
    hanzi: "项目",
  },
  {
    hanzi: "专项",
  },
  {
    hanzi: "事项",
  },
  {
    hanzi: "须知",
  },
  {
    hanzi: "修改",
  },
  {
    hanzi: "装修",
  },
  {
    hanzi: "精彩",
  },
  {
    hanzi: "色彩",
  },
  {
    hanzi: "彩色",
  },
  {
    hanzi: "颜色",
  },
  {
    hanzi: "颜面",
  },
  {
    hanzi: "身份",
  },
  {
    hanzi: "顺序",
  },
  {
    hanzi: "照顾",
  },
  {
    hanzi: "顾客",
  },
  {
    hanzi: "视频",
  },
  {
    hanzi: "频道",
  },
  {
    hanzi: "频率",
  },
  {
    hanzi: "顶",
  },
  {
    hanzi: "头顶",
  },
  {
    hanzi: "屋顶",
  },
  {
    hanzi: "山顶",
  },
  {
    hanzi: "硕士",
  },
  {
    hanzi: "手工",
  },
  {
    hanzi: "工厂",
  },
  {
    hanzi: "人工",
  },
  {
    hanzi: "状态",
  },
  {
    hanzi: "态度",
  },
  {
    hanzi: "生态",
  },
  {
    hanzi: "心态",
  },
  {
    hanzi: "动态",
  },
  {
    hanzi: "形态",
  },
  {
    hanzi: "同志",
  },
  {
    hanzi: "标志",
  },
  {
    hanzi: "杂志",
  },
  {
    hanzi: "志愿",
  },
  {
    hanzi: "志愿者",
  },
  {
    hanzi: "概念",
  },
  {
    hanzi: "理念",
  },
  {
    hanzi: "纪念",
  },
  {
    hanzi: "恋爱",
  },
  {
    hanzi: "感恩",
  },
  {
    hanzi: "抱怨",
  },
  {
    hanzi: "碗",
  },
  {
    hanzi: "德国",
  },
  {
    hanzi: "道德",
  },
  {
    hanzi: "道德经",
  },
  {
    hanzi: "电台",
  },
  {
    hanzi: "特色",
  },
  {
    hanzi: "角色",
  },
  {
    hanzi: "焦急",
  },
  {
    hanzi: "隐私",
  },
  {
    hanzi: "稳定",
  },
  {
    hanzi: "悲剧",
  },
  {
    hanzi: "串串",
  },
  {
    hanzi: "患者",
  },
  {
    hanzi: "考虑",
  },
  {
    hanzi: "虚荣",
  },
  {
    hanzi: "老虎",
  },
  {
    hanzi: "认可",
  },
  {
    hanzi: "企业",
  },
  {
    hanzi: "国有企业",
  },
  {
    hanzi: "中小企业",
  },
  {
    hanzi: "企业家",
  },
  {
    hanzi: "群众",
  },
  {
    hanzi: "公众",
  },
  {
    hanzi: "大众",
  },
  {
    hanzi: "众人",
  },
  {
    hanzi: "民众",
  },
  {
    hanzi: "听众",
  },
  {
    hanzi: "食品",
  },
  {
    hanzi: "食物",
  },
  {
    hanzi: "零食",
  },
  {
    hanzi: "美食",
  },
  {
    hanzi: "餐",
  },
  {
    hanzi: "早餐",
  },
  {
    hanzi: "晚餐",
  },
  {
    hanzi: "午餐",
  },
  {
    hanzi: "快餐",
  },
  {
    hanzi: "餐桌",
  },
  {
    hanzi: "餐馆",
  },
  {
    hanzi: "餐饮",
  },
  {
    hanzi: "西餐",
  },
  {
    hanzi: "中餐",
  },
  {
    hanzi: "大门",
  },
  {
    hanzi: "院子",
  },
  {
    hanzi: "住房",
  },
  {
    hanzi: "曼谷",
  },
  {
    hanzi: "低谷",
  },
  {
    hanzi: "山谷",
  },
  {
    hanzi: "内容",
  },
  {
    hanzi: "笑容",
  },
  {
    hanzi: "容貌",
  },
  {
    hanzi: "欲望",
  },
  {
    hanzi: "食欲",
  },
  {
    hanzi: "回复",
  },
  {
    hanzi: "反复",
  },
  {
    hanzi: "重复",
  },
  {
    hanzi: "复习",
  },
  {
    hanzi: "阳光",
  },
  {
    hanzi: "太阳",
  },
  {
    hanzi: "阴阳",
  },
  {
    hanzi: "审批",
  },
  {
    hanzi: "审查",
  },
  {
    hanzi: "神",
  },
  {
    hanzi: "精神",
  },
  {
    hanzi: "神经",
  },
  {
    hanzi: "眼神",
  },
  {
    hanzi: "智能",
  },
  {
    hanzi: "智力",
  },
  {
    hanzi: "理智",
  },
  {
    hanzi: "出口",
  },
  {
    hanzi: "进口",
  },
  {
    hanzi: "早晨",
  },
  {
    hanzi: "晨报",
  },
  {
    hanzi: "地震",
  },
  {
    hanzi: "晴天",
  },
  {
    hanzi: "暑假",
  },
  {
    hanzi: "暑期",
  },
  {
    hanzi: "先进",
  },
  {
    hanzi: "女性",
  },
  {
    hanzi: "性能",
  },
  {
    hanzi: "个性",
  },
  {
    hanzi: "性格",
  },
  {
    hanzi: "男性",
  },
  {
    hanzi: "可能性",
  },
  {
    hanzi: "理性",
  },
  {
    hanzi: "积极性",
  },
  {
    hanzi: "活性",
  },
  {
    hanzi: "异性",
  },
  {
    hanzi: "性欲",
  },
  {
    hanzi: "性别",
  },
  {
    hanzi: "怀疑",
  },
  {
    hanzi: "怀念",
  },
  {
    hanzi: "惊喜",
  },
  {
    hanzi: "话题",
  },
  {
    hanzi: "试题",
  },
  {
    hanzi: "题目",
  },
  {
    hanzi: "回忆",
  },
  {
    hanzi: "记忆",
  },
  {
    hanzi: "记忆力",
  },
  {
    hanzi: "后悔",
  },
  {
    hanzi: "遗憾",
  },
  {
    hanzi: "习惯",
  },
  {
    hanzi: "惯例",
  },
  {
    hanzi: "惯性",
  },
  {
    hanzi: "新华社",
  },
  {
    hanzi: "中华",
  },
  {
    hanzi: "新华网",
  },
  {
    hanzi: "中华人民共和国",
  },
  {
    hanzi: "华人",
  },
  {
    hanzi: "中华民族",
  },
  {
    hanzi: "巧克力",
  },
  {
    hanzi: "千克",
  },
  {
    hanzi: "目前",
  },
  {
    hanzi: "从前",
  },
  {
    hanzi: "党",
  },
  {
    hanzi: "党员",
  },
  {
    hanzi: "国民党",
  },
  {
    hanzi: "掌声",
  },
  {
    hanzi: "天堂",
  },
  {
    hanzi: "课堂",
  },
  {
    hanzi: "食堂",
  },
  {
    hanzi: "教堂",
  },
  {
    hanzi: "葡萄",
  },
  {
    hanzi: "葡萄酒",
  },
  {
    hanzi: "葡萄牙",
  },
  {
    hanzi: "缺点",
  },
  {
    hanzi: "筷子",
  },
  {
    hanzi: "师傅",
  },
  {
    hanzi: "博文",
  },
  {
    hanzi: "博士",
  },
  {
    hanzi: "博物馆",
  },
  {
    hanzi: "人事 1",
  },
  {
    hanzi: "胳膊",
  },
  {
    hanzi: "产品",
  },
  {
    hanzi: "产业",
  },
  {
    hanzi: "房地产",
  },
  {
    hanzi: "产量",
  },
  {
    hanzi: "地产",
  },
  {
    hanzi: "无产阶级",
  },
  {
    hanzi: "房产",
  },
  {
    hanzi: "国产",
  },
  {
    hanzi: "遗产",
  },
  {
    hanzi: "质量",
  },
  {
    hanzi: "素质",
  },
  {
    hanzi: "物质",
  },
  {
    hanzi: "性质",
  },
  {
    hanzi: "品质",
  },
  {
    hanzi: "气质",
  },
  {
    hanzi: "质疑",
  },
  {
    hanzi: "蛋白质",
  },
  {
    hanzi: "餐厅",
  },
  {
    hanzi: "大厅",
  },
  {
    hanzi: "客厅",
  },
  {
    hanzi: "鼓励",
  },
  {
    hanzi: "奖励",
  },
  {
    hanzi: "激励",
  },
  {
    hanzi: "危机",
  },
  {
    hanzi: "危害",
  },
  {
    hanzi: "厨房",
  },
  {
    hanzi: "厨师",
  },
  {
    hanzi: "登机牌",
  },
  {
    hanzi: "人员",
  },
  {
    hanzi: "成员",
  },
  {
    hanzi: "会员",
  },
  {
    hanzi: "公务员",
  },
  {
    hanzi: "人才",
  },
  {
    hanzi: "才能",
  },
  {
    hanzi: "段",
  },
  {
    hanzi: "阶段",
  },
  {
    hanzi: "一段",
  },
  {
    hanzi: "手段",
  },
  {
    hanzi: "政",
  },
  {
    hanzi: "政府",
  },
  {
    hanzi: "政治",
  },
  {
    hanzi: "行政",
  },
  {
    hanzi: "市政府",
  },
  {
    hanzi: "政协",
  },
  {
    hanzi: "邮政",
  },
  {
    hanzi: "效果",
  },
  {
    hanzi: "效率",
  },
  {
    hanzi: "疗效",
  },
  {
    hanzi: "故事",
  },
  {
    hanzi: "事故",
  },
  {
    hanzi: "故障",
  },
  {
    hanzi: "故乡",
  },
  {
    hanzi: "散步",
  },
  {
    hanzi: "攻击",
  },
  {
    hanzi: "进攻",
  },
  {
    hanzi: "失败",
  },
  {
    hanzi: "敌人",
  },
  {
    hanzi: "警方",
  },
  {
    hanzi: "民警",
  },
  {
    hanzi: "交警",
  },
  {
    hanzi: "警告",
  },
  {
    hanzi: "局面",
  },
  {
    hanzi: "局长",
  },
  {
    hanzi: "总局",
  },
  {
    hanzi: "格局",
  },
  {
    hanzi: "格局",
  },
  {
    hanzi: "结局",
  },
  {
    hanzi: "当局",
  },
  {
    hanzi: "邮局",
  },
  {
    hanzi: "居民",
  },
  {
    hanzi: "邻居",
  },
  {
    hanzi: "基层",
  },
  {
    hanzi: "高层",
  },
  {
    hanzi: "层次",
  },
  {
    hanzi: "感受",
  },
  {
    hanzi: "感想",
  },
  {
    hanzi: "思想",
  },
  {
    hanzi: "金属",
  },
  {
    hanzi: "家属",
  },
  {
    hanzi: "尺子",
  },
  {
    hanzi: "尺寸",
  },
  {
    hanzi: "屏",
  },
  {
    hanzi: "股权",
  },
  {
    hanzi: "权利",
  },
  {
    hanzi: "权力",
  },
  {
    hanzi: "产权",
  },
  {
    hanzi: "知识产权",
  },
  {
    hanzi: "观众",
  },
  {
    hanzi: "观念",
  },
  {
    hanzi: "观点",
  },
  {
    hanzi: "外观",
  },
  {
    hanzi: "双方",
  },
  {
    hanzi: "双手",
  },
  {
    hanzi: "难题",
  },
  {
    hanzi: "摄影",
  },
  {
    hanzi: "摄影师",
  },
  {
    hanzi: "摄影机",
  },
  {
    hanzi: "戏",
  },
  {
    hanzi: "游戏",
  },
  {
    hanzi: "戏剧",
  },
  {
    hanzi: "叔叔",
  },
  {
    hanzi: "亲戚",
  },
  {
    hanzi: "辣椒",
  },
  {
    hanzi: "花椒",
  },
  {
    hanzi: "胡椒",
  },
  {
    hanzi: "血",
  },
  {
    hanzi: "血管",
  },
  {
    hanzi: "血液",
  },
  {
    hanzi: "高血压",
  },
  {
    hanzi: "血压",
  },
  {
    hanzi: "利益",
  },
  {
    hanzi: "收益",
  },
  {
    hanzi: "权益",
  },
  {
    hanzi: "温度",
  },
  {
    hanzi: "气温",
  },
  {
    hanzi: "温泉",
  },
  {
    hanzi: "国王",
  },
  {
    hanzi: "王子",
  },
  {
    hanzi: "竹子",
  },
  {
    hanzi: "男子",
  },
  {
    hanzi: "女子",
  },
  {
    hanzi: "种子",
  },
  {
    hanzi: "子女",
  },
  {
    hanzi: "法院",
  },
  {
    hanzi: "监管",
  },
  {
    hanzi: "监测",
  },
  {
    hanzi: "监控",
  },
  {
    hanzi: "监督",
  },
  {
    hanzi: "篮球",
  },
  {
    hanzi: "蓝色",
  },
  {
    hanzi: "蓝图",
  },
  {
    hanzi: "汉语蓝图",
  },
  {
    hanzi: "盖",
  },
  {
    hanzi: "联盟",
  },
  {
    hanzi: "欧盟",
  },
  {
    hanzi: "加盟",
  },
  {
    hanzi: "盐",
  },
  {
    hanzi: "盒子",
  },
  {
    hanzi: "盒饭",
  },
  {
    hanzi: "饭盒",
  },
  {
    hanzi: "包装盒",
  },
  {
    hanzi: "宣传",
  },
  {
    hanzi: "防守",
  },
  {
    hanzi: "灾",
  },
  {
    hanzi: "火灾",
  },
  {
    hanzi: "灾害",
  },
  {
    hanzi: "灾难",
  },
  {
    hanzi: "宗教",
  },
  {
    hanzi: "奥运",
  },
  {
    hanzi: "奥运会",
  },
  {
    hanzi: "观察",
  },
  {
    hanzi: "警察",
  },
  {
    hanzi: "考察",
  },
  {
    hanzi: "监察",
  },
  {
    hanzi: "摩擦",
  },
  {
    hanzi: "比赛",
  },
  {
    hanzi: "联赛",
  },
  {
    hanzi: "决赛",
  },
  {
    hanzi: "赛季",
  },
  {
    hanzi: "大赛",
  },
  {
    hanzi: "赛事",
  },
  {
    hanzi: "寒假",
  },
  {
    hanzi: "春节",
  },
  {
    hanzi: "青春",
  },
  {
    hanzi: "春天",
  },
  {
    hanzi: "春运",
  },
  {
    hanzi: "春季",
  },
  {
    hanzi: "春秋",
  },
  {
    hanzi: "棒",
  },
  {
    hanzi: "棒子",
  },
  {
    hanzi: "棒球",
  },
  {
    hanzi: "选举",
  },
  {
    hanzi: "举报",
  },
  {
    hanzi: "抬举",
  },
  {
    hanzi: "举重",
  },
  {
    hanzi: "选择",
  },
  {
    hanzi: "直播员",
  },
  {
    hanzi: "广播",
  },
  {
    hanzi: "直播",
  },
  {
    hanzi: "解释",
  },
  {
    hanzi: "羽毛球",
  },
  {
    hanzi: "羽毛",
  },
  {
    hanzi: "翻译",
  },
  {
    hanzi: "扇子",
  },
  {
    hanzi: "旁边",
  },
  {
    hanzi: "一旁",
  },
  {
    hanzi: "身旁",
  },
  {
    hanzi: "儿童",
  },
  {
    hanzi: "童年",
  },
  {
    hanzi: "童话",
  },
  {
    hanzi: "童心",
  },
  {
    hanzi: "竞争",
  },
  {
    hanzi: "竞争力",
  },
  {
    hanzi: "竞赛",
  },
  {
    hanzi: "章",
  },
  {
    hanzi: "文章",
  },
  {
    hanzi: "篇章",
  },
  {
    hanzi: "端",
  },
  {
    hanzi: "皇帝",
  },
  {
    hanzi: "上帝",
  },
  {
    hanzi: "商业",
  },
  {
    hanzi: "商品",
  },
  {
    hanzi: "商务",
  },
  {
    hanzi: "工商",
  },
  {
    hanzi: "厂商",
  },
  {
    hanzi: "商场",
  },
  {
    hanzi: "商标",
  },
  {
    hanzi: "协商",
  },
  {
    hanzi: "商业银行",
  },
  {
    hanzi: "商家",
  },
  {
    hanzi: "商店",
  },
  {
    hanzi: "商量",
  },
  {
    hanzi: "智商",
  },
  {
    hanzi: "商人",
  },
  {
    hanzi: "橘子",
  },
  {
    hanzi: "消费者",
  },
  {
    hanzi: "消费",
  },
  {
    hanzi: "费用",
  },
  {
    hanzi: "经费",
  },
  {
    hanzi: "学费",
  },
  {
    hanzi: "佛",
  },
  {
    hanzi: "佛教",
  },
  {
    hanzi: "聊天",
  },
  {
    hanzi: "贸易",
  },
  {
    hanzi: "经贸",
  },
  {
    hanzi: "外贸",
  },
  {
    hanzi: "留学",
  },
  {
    hanzi: "留学生",
  },
  {
    hanzi: "债",
  },
  {
    hanzi: "债务",
  },
  {
    hanzi: "战争",
  },
  {
    hanzi: "挑战",
  },
  {
    hanzi: "战斗",
  },
  {
    hanzi: "战士",
  },
  {
    hanzi: "战术",
  },
  {
    hanzi: "赔偿",
  },
  {
    hanzi: "财政",
  },
  {
    hanzi: "财务",
  },
  {
    hanzi: "财产",
  },
  {
    hanzi: "财富",
  },
  {
    hanzi: "理财",
  },
  {
    hanzi: "贫穷",
  },
  {
    hanzi: "贷",
  },
  {
    hanzi: "参考",
  },
  {
    hanzi: "参观",
  },
  {
    hanzi: "类",
  },
  {
    hanzi: "人类",
  },
  {
    hanzi: "类型",
  },
  {
    hanzi: "分类",
  },
  {
    hanzi: "中央",
  },
  {
    hanzi: "央行",
  },
  {
    hanzi: "央视",
  },
  {
    hanzi: "英国",
  },
  {
    hanzi: "英语",
  },
  {
    hanzi: "英文",
  },
  {
    hanzi: "反映",
  },
  {
    hanzi: "好奇",
  },
  {
    hanzi: "好客",
  },
  {
    hanzi: "做法",
  },
  {
    hanzi: "奋斗",
  },
  {
    hanzi: "争夺",
  },
  {
    hanzi: "模式",
  },
  {
    hanzi: "规模",
  },
  {
    hanzi: "模型",
  },
  {
    hanzi: "大规模",
  },
  {
    hanzi: "模版",
  },
  {
    hanzi: "幕",
  },
  {
    hanzi: "开幕",
  },
  {
    hanzi: "幕后",
  },
  {
    hanzi: "屏幕",
  },
  {
    hanzi: "角膜",
  },
  {
    hanzi: "存在",
  },
  {
    hanzi: "生存",
  },
  {
    hanzi: "库存",
  },
  {
    hanzi: "行李",
  },
  {
    hanzi: "分享",
  },
  {
    hanzi: "享受",
  },
  {
    hanzi: "月亮",
  },
  {
    hanzi: "熟人",
  },
  {
    hanzi: "孙女",
  },
  {
    hanzi: "孙子",
  },
  {
    hanzi: "子孙",
  },
  {
    hanzi: "收获",
  },
  {
    hanzi: "文献",
  },
  {
    hanzi: "奉献",
  },
  {
    hanzi: "贡献",
  },
  {
    hanzi: "沉默",
  },
  {
    hanzi: "幽默",
  },
  {
    hanzi: "独特",
  },
  {
    hanzi: "孤独",
  },
  {
    hanzi: "金融",
  },
  {
    hanzi: "犯罪",
  },
  {
    hanzi: "疯狂",
  },
  {
    hanzi: "猜测",
  },
  {
    hanzi: "猜想",
  },
  {
    hanzi: "检查",
  },
  {
    hanzi: "检测",
  },
  {
    hanzi: "经验",
  },
  {
    hanzi: "实验",
  },
  {
    hanzi: "实验室",
  },
  {
    hanzi: "试验",
  },
  {
    hanzi: "体验",
  },
  {
    hanzi: "检验",
  },
  {
    hanzi: "考验",
  },
  {
    hanzi: "风险",
  },
  {
    hanzi: "保险",
  },
  {
    hanzi: "危险",
  },
  {
    hanzi: "保险公司",
  },
  {
    hanzi: "脸",
  },
  {
    hanzi: "脸色",
  },
  {
    hanzi: "签名",
  },
  {
    hanzi: "签约",
  },
  {
    hanzi: "标签",
  },
  {
    hanzi: "签证",
  },
  {
    hanzi: "莫斯科",
  },
  {
    hanzi: "诊断",
  },
  {
    hanzi: "判断",
  },
  {
    hanzi: "果断",
  },
  {
    hanzi: "暂时",
  },
  {
    hanzi: "山丘",
  },
  {
    hanzi: "乒乓球",
  },
  {
    hanzi: "士兵",
  },
  {
    hanzi: "宾馆",
  },
  {
    hanzi: "军",
  },
  {
    hanzi: "冠军",
  },
  {
    hanzi: "军事",
  },
  {
    hanzi: "军队",
  },
  {
    hanzi: "将军",
  },
  {
    hanzi: "海军",
  },
  {
    hanzi: "季军",
  },
  {
    hanzi: "农",
  },
  {
    hanzi: "农村",
  },
  {
    hanzi: "农民",
  },
  {
    hanzi: "农业",
  },
  {
    hanzi: "农民工",
  },
  {
    hanzi: "推广",
  },
  {
    hanzi: "情景",
  },
  {
    hanzi: "情感",
  },
  {
    hanzi: "编辑",
  },
  {
    hanzi: "专辑",
  },
  {
    hanzi: "转载",
  },
  {
    hanzi: "记载",
  },
  {
    hanzi: "总裁",
  },
  {
    hanzi: "裁判",
  },
  {
    hanzi: "戴尔",
  },
  {
    hanzi: "穿戴",
  },
  {
    hanzi: "船",
  },
  {
    hanzi: "飞船",
  },
  {
    hanzi: "船票",
  },
  {
    hanzi: "划船",
  },
  {
    hanzi: "一般",
  },
  {
    hanzi: "反抗",
  },
  {
    hanzi: "航空",
  },
  {
    hanzi: "航班",
  },
  {
    hanzi: "导航",
  },
  {
    hanzi: "硬盘",
  },
  {
    hanzi: "盘子",
  },
  {
    hanzi: "信封",
  },
  {
    hanzi: "改革",
  },
  {
    hanzi: "革命",
  },
  {
    hanzi: "改革开放",
  },
  {
    hanzi: "鞋子",
  },
  {
    hanzi: "皮鞋",
  },
  {
    hanzi: "高跟鞋",
  },
  {
    hanzi: "运动鞋",
  },
  {
    hanzi: "鞋带",
  },
  {
    hanzi: "球鞋",
  },
  {
    hanzi: "街道",
  },
  {
    hanzi: "街头",
  },
  {
    hanzi: "大街",
  },
  {
    hanzi: "逛街",
  },
  {
    hanzi: "街上",
  },
  {
    hanzi: "步行街",
  },
  {
    hanzi: "政策",
  },
  {
    hanzi: "决策",
  },
  {
    hanzi: "策划",
  },
  {
    hanzi: "符号",
  },
  {
    hanzi: "冰箱",
  },
  {
    hanzi: "邮箱",
  },
  {
    hanzi: "行李箱",
  },
  {
    hanzi: "笨蛋",
  },
  {
    hanzi: "笔",
  },
  {
    hanzi: "笔者",
  },
  {
    hanzi: "笔记",
  },
  {
    hanzi: "笔记本",
  },
  {
    hanzi: "回答",
  },
  {
    hanzi: "答案",
  },
  {
    hanzi: "建筑",
  },
  {
    hanzi: "恐惧",
  },
  {
    hanzi: "恐怖主义",
  },
  {
    hanzi: "恐怖组织",
  },
  {
    hanzi: "委员",
  },
  {
    hanzi: "委员会",
  },
  {
    hanzi: "党委",
  },
  {
    hanzi: "委托",
  },
  {
    hanzi: "省委",
  },
  {
    hanzi: "市委",
  },
  {
    hanzi: "权威",
  },
  {
    hanzi: "威胁",
  },
  {
    hanzi: "结婚",
  },
  {
    hanzi: "离婚",
  },
  {
    hanzi: "婚礼",
  },
  {
    hanzi: "媒体",
  },
  {
    hanzi: "妇女",
  },
  {
    hanzi: "夫妇",
  },
  {
    hanzi: "妻子",
  },
  {
    hanzi: "夫妻",
  },
  {
    hanzi: "周围",
  },
  {
    hanzi: "范围",
  },
  {
    hanzi: "困难",
  },
  {
    hanzi: "困扰",
  },
  {
    hanzi: "圆",
  },
  {
    hanzi: "卷",
  },
  {
    hanzi: "圈",
  },
  {
    hanzi: "圈子",
  },
  {
    hanzi: "眼圈",
  },
  {
    hanzi: "窗口",
  },
  {
    hanzi: "窗户",
  },
  {
    hanzi: "窗外",
  },
  {
    hanzi: "车窗",
  },
  {
    hanzi: "窗帘",
  },
  {
    hanzi: "布什",
  },
  {
    hanzi: "新闻发布会",
  },
  {
    hanzi: "布局",
  },
  {
    hanzi: "人民币",
  },
  {
    hanzi: "金币",
  },
  {
    hanzi: "港币",
  },
  {
    hanzi: "硬币",
  },
  {
    hanzi: "纸币",
  },
  {
    hanzi: "闹钟",
  },
  {
    hanzi: "闹市",
  },
  {
    hanzi: "胡闹",
  },
  {
    hanzi: "感冒",
  },
  {
    hanzi: "冒险",
  },
  {
    hanzi: "帽子",
  },
  {
    hanzi: "套",
  },
  {
    hanzi: "配套",
  },
  {
    hanzi: "外套",
  },
  {
    hanzi: "套子",
  },
  {
    hanzi: "记录",
  },
  {
    hanzi: "录取",
  },
  {
    hanzi: "纪录",
  },
  {
    hanzi: "录音",
  },
  {
    hanzi: "绿色",
  },
  {
    hanzi: "绿化",
  },
  {
    hanzi: "绿地",
  },
  {
    hanzi: "绿茶",
  },
  {
    hanzi: "兼职",
  },
  {
    hanzi: "道歉",
  },
  {
    hanzi: "抱歉",
  },
  {
    hanzi: "当初",
  },
  {
    hanzi: "初中",
  },
  {
    hanzi: "最初",
  },
  {
    hanzi: "年初",
  },
  {
    hanzi: "补充",
  },
  {
    hanzi: "补贴",
  },
  {
    hanzi: "补偿",
  },
  {
    hanzi: "补救",
  },
  {
    hanzi: "裤子",
  },
  {
    hanzi: "内裤",
  },
  {
    hanzi: "短裤",
  },
  {
    hanzi: "长裤",
  },
  {
    hanzi: "裙子",
  },
  {
    hanzi: "衬衫",
  },
  {
    hanzi: "衬衣",
  },
  {
    hanzi: "妹妹",
  },
  {
    hanzi: "姐妹",
  },
  {
    hanzi: "兄妹",
  },
  {
    hanzi: "战略",
  },
  {
    hanzi: "策略",
  },
  {
    hanzi: "画",
  },
  {
    hanzi: "画面",
  },
  {
    hanzi: "动画",
  },
  {
    hanzi: "画画",
  },
  {
    hanzi: "画家",
  },
  {
    hanzi: "图画",
  },
  {
    hanzi: "雷雨",
  },
  {
    hanzi: "雷电",
  },
  {
    hanzi: "地雷",
  },
  {
    hanzi: "手雷",
  },
  {
    hanzi: "甲",
  },
  {
    hanzi: "指甲",
  },
  {
    hanzi: "鼻子",
  },
  {
    hanzi: "敬畏",
  },
  {
    hanzi: "针",
  },
  {
    hanzi: "方针",
  },
  {
    hanzi: "打针",
  },
  {
    hanzi: "镇",
  },
  {
    hanzi: "城镇",
  },
  {
    hanzi: "乡镇",
  },
  {
    hanzi: "钢",
  },
  {
    hanzi: "钢铁",
  },
  {
    hanzi: "关键",
  },
  {
    hanzi: "键盘",
  },
  {
    hanzi: "铅笔",
  },
  {
    hanzi: "钥匙",
  },
  {
    hanzi: "骄傲",
  },
  {
    hanzi: "桥",
  },
  {
    hanzi: "鸟",
  },
  {
    hanzi: "鸡",
  },
  {
    hanzi: "鸡蛋",
  },
  {
    hanzi: "鸡肉",
  },
  {
    hanzi: "岛",
  },
  {
    hanzi: "青岛",
  },
  {
    hanzi: "鸭",
  },
  {
    hanzi: "鸭子",
  },
  {
    hanzi: "鸭蛋",
  },
  {
    hanzi: "鸭肉",
  },
  {
    hanzi: "心灵",
  },
  {
    hanzi: "烟",
  },
  {
    hanzi: "吸烟",
  },
  {
    hanzi: "抽烟",
  },
  {
    hanzi: "炎症",
  },
  {
    hanzi: "发炎",
  },
  {
    hanzi: "灾",
  },
  {
    hanzi: "火灾",
  },
  {
    hanzi: "灾害",
  },
  {
    hanzi: "灾难",
  },
  {
    hanzi: "锻炼",
  },
  {
    hanzi: "发烧",
  },
  {
    hanzi: "部",
  },
  {
    hanzi: "部分",
  },
  {
    hanzi: "大部分",
  },
  {
    hanzi: "一部分",
  },
  {
    hanzi: "全部",
  },
  {
    hanzi: "部位",
  },
  {
    hanzi: "部件",
  },
  {
    hanzi: "中部",
  },
  {
    hanzi: "面部",
  },
  {
    hanzi: "头部",
  },
  {
    hanzi: "胸部",
  },
  {
    hanzi: "部门",
  },
  {
    hanzi: "部长",
  },
  {
    hanzi: "内部",
  },
  {
    hanzi: "外部",
  },
  {
    hanzi: "局部",
  },
  {
    hanzi: "总部",
  },
  {
    hanzi: "教育部",
  },
  {
    hanzi: "外交部",
  },
  {
    hanzi: "部队",
  },
  {
    hanzi: "干部",
  },
  {
    hanzi: "北部",
  },
  {
    hanzi: "南部",
  },
  {
    hanzi: "西部",
  },
  {
    hanzi: "东部",
  },
  {
    hanzi: "生活费",
  },
  {
    hanzi: "手续费",
  },
  {
    hanzi: "花费",
  },
  {
    hanzi: "小费",
  },
  {
    hanzi: "小型",
  },
  {
    hanzi: "型号",
  },
  {
    hanzi: "存款",
  },
  {
    hanzi: "贷款",
  },
  {
    hanzi: "付款",
  },
  {
    hanzi: "汇款",
  },
  {
    hanzi: "取款机",
  },
  {
    hanzi: "工资",
  },
  {
    hanzi: "资格",
  },
  {
    hanzi: "资金",
  },
  {
    hanzi: "投资",
  },
  {
    hanzi: "投资者",
  },
  {
    hanzi: "资料",
  },
  {
    hanzi: "资源",
  },
  {
    hanzi: "资本",
  },
  {
    hanzi: "资本主义",
  },
  {
    hanzi: "资本市场",
  },
  {
    hanzi: "资产",
  },
  {
    hanzi: "资助",
  },
  {
    hanzi: "货",
  },
  {
    hanzi: "百货",
  },
  {
    hanzi: "售货员",
  },
  {
    hanzi: "支出",
  },
  {
    hanzi: "雕",
  },
  {
    hanzi: "调 diào",
  },
  {
    hanzi: "调查",
  },
  {
    hanzi: "空调",
  },
  {
    hanzi: "调整",
  },
  {
    hanzi: "调动",
  },
  {
    hanzi: "调研",
  },
  {
    hanzi: "出路",
  },
  {
    hanzi: "一路",
  },
  {
    hanzi: "一路上",
  },
  {
    hanzi: "建设",
  },
  {
    hanzi: "设备",
  },
  {
    hanzi: "设计",
  },
  {
    hanzi: "设计师",
  },
  {
    hanzi: "设施",
  },
  {
    hanzi: "设想",
  },
  {
    hanzi: "出入",
  },
  {
    hanzi: "罚款",
  },
  {
    hanzi: "脚步",
  },
  {
    hanzi: "脚印",
  },
  {
    hanzi: "剑",
  },
  {
    hanzi: "许可证",
  },
  {
    hanzi: "行程",
  },
  {
    hanzi: "游行 1",
  },
  {
    hanzi: "同行 háng",
  },
  {
    hanzi: "阴谋",
  },
  {
    hanzi: "阴谋论",
  },
  {
    hanzi: "一行",
  },
  {
    hanzi: "煤",
  },
  {
    hanzi: "煤气",
  },
  {
    hanzi: "一带",
  },
  {
    hanzi: "灭火",
  },
  {
    hanzi: "一向",
  },
  {
    hanzi: "一口气",
  },
  {
    hanzi: "爆炸",
  },
  {
    hanzi: "炸弹",
  },
  {
    hanzi: "炸药",
  },
  {
    hanzi: "一身",
  },
  {
    hanzi: "一代",
  },
  {
    hanzi: "储存",
  },
  {
    hanzi: "储备",
  },
  {
    hanzi: "一模一样",
  },
  {
    hanzi: "一时",
  },
  {
    hanzi: "单打",
  },
  {
    hanzi: "双打",
  },
  {
    hanzi: "侧",
  },
  {
    hanzi: "两侧",
  },
  {
    hanzi: "右侧",
  },
  {
    hanzi: "左侧",
  },
  {
    hanzi: "官司",
  },
  {
    hanzi: "法官",
  },
  {
    hanzi: "外交官",
  },
  {
    hanzi: "伦理",
  },
  {
    hanzi: "打印机",
  },
  {
    hanzi: "耳机",
  },
  {
    hanzi: "轮",
  },
  {
    hanzi: "轮船",
  },
  {
    hanzi: "轮椅",
  },
  {
    hanzi: "轮子",
  },
  {
    hanzi: "摄像机",
  },
  {
    hanzi: "录音机",
  },
  {
    hanzi: "亿",
  },
  {
    hanzi: "游戏机",
  },
  {
    hanzi: "戏曲",
  },
  {
    hanzi: "乐曲",
  },
  {
    hanzi: "高速公路",
  },
  {
    hanzi: "速度",
  },
  {
    hanzi: "直升机",
  },
  {
    hanzi: "动机",
  },
  {
    hanzi: "机器人",
  },
  {
    hanzi: "压迫",
  },
  {
    hanzi: "电器",
  },
  {
    hanzi: "充电器",
  },
  {
    hanzi: "器官",
  },
  {
    hanzi: "热水器",
  },
  {
    hanzi: "推荐",
  },
  {
    hanzi: "纯净水",
  },
  {
    hanzi: "海水",
  },
  {
    hanzi: "汽水",
  },
  {
    hanzi: "汽油",
  },
  {
    hanzi: "细菌",
  },
  {
    hanzi: "抗菌药",
  },
  {
    hanzi: "胶水",
  },
  {
    hanzi: "水产",
  },
  {
    hanzi: "团",
  },
  {
    hanzi: "团结",
  },
  {
    hanzi: "代表团",
  },
  {
    hanzi: "团体",
  },
  {
    hanzi: "集团",
  },
  {
    hanzi: "团长",
  },
  {
    hanzi: "团队",
  },
  {
    hanzi: "水灾",
  },
  {
    hanzi: "灾区",
  },
  {
    hanzi: "雨水",
  },
  {
    hanzi: "闭幕式",
  },
  {
    hanzi: "闪",
  },
  {
    hanzi: "闪电",
  },
  {
    hanzi: "启发 ",
  },
  {
    hanzi: "启事 ",
  },
  {
    hanzi: "大奖赛",
  },
  {
    hanzi: "富人",
  },
  {
    hanzi: "师父",
  },
  {
    hanzi: "大纲",
  },
  {
    hanzi: "水产品",
  },
  {
    hanzi: "煎饼",
  },
  {
    hanzi: "微博",
  },
  {
    hanzi: "两手",
  },
  {
    hanzi: "吉他",
  },
  {
    hanzi: "度过",
  },
  {
    hanzi: "卧铺",
  },
  {
    hanzi: "和尚",
  },
];
// Nouns End

// Verbs 动词 (1619)
export const allVerbs = [
  {
    hanzi: "干",
  },
  {
    hanzi: "叫",
  },
  {
    hanzi: "说",
  },
  {
    hanzi: "认识",
  },
  {
    hanzi: "骂",
  },
  {
    hanzi: "吃",
  },
  {
    hanzi: "气",
  },
  {
    hanzi: "飞",
  },
  {
    hanzi: "唱",
  },
  {
    hanzi: "说话",
  },
  {
    hanzi: "活",
  },
  {
    hanzi: "用",
  },
  {
    hanzi: "明白",
  },
  {
    hanzi: "说明",
  },
  {
    hanzi: "过",
  },
  {
    hanzi: "上",
  },
  {
    hanzi: "下",
  },
  {
    hanzi: "卡",
  },
  {
    hanzi: "吓",
  },
  {
    hanzi: "点",
  },
  {
    hanzi: "是",
  },
  {
    hanzi: "看",
  },
  {
    hanzi: "拍",
  },
  {
    hanzi: "提",
  },
  {
    hanzi: "找",
  },
  {
    hanzi: "来",
  },
  {
    hanzi: "来自",
  },
  {
    hanzi: "上来",
  },
  {
    hanzi: "过来",
  },
  {
    hanzi: "呆",
  },
  {
    hanzi: "种",
  },
  {
    hanzi: "担心",
  },
  {
    hanzi: "想",
  },
  {
    hanzi: "休息",
  },
  {
    hanzi: "怕",
  },
  {
    hanzi: "记",
  },
  {
    hanzi: "包",
  },
  {
    hanzi: "坐",
  },
  {
    hanzi: "坐下",
  },
  {
    hanzi: "在",
  },
  {
    hanzi: "起飞",
  },
  {
    hanzi: "还",
  },
  {
    hanzi: "干杯",
  },
  {
    hanzi: "干什么",
  },
  {
    hanzi: "去",
  },
  {
    hanzi: "上去",
  },
  {
    hanzi: "下去",
  },
  {
    hanzi: "过去",
  },
  {
    hanzi: "丢",
  },
  {
    hanzi: "等",
  },
  {
    hanzi: "问",
  },
  {
    hanzi: "哭",
  },
  {
    hanzi: "加",
  },
  {
    hanzi: "办",
  },
  {
    hanzi: "认为",
  },
  {
    hanzi: "动",
  },
  {
    hanzi: "活动",
  },
  {
    hanzi: "运动",
  },
  {
    hanzi: "会",
  },
  {
    hanzi: "打",
  },
  {
    hanzi: "打包",
  },
  {
    hanzi: "骑",
  },
  {
    hanzi: "可以",
    pinyin: "kěyǐ",
    en: "can",
  },
  {
    hanzi: "以为",
  },
  {
    hanzi: "住",
  },
  {
    hanzi: "记住",
  },
  {
    hanzi: "回",
  },
  {
    hanzi: "回来",
  },
  {
    hanzi: "回去",
  },
  {
    hanzi: "得",
  },
  {
    hanzi: "记得",
  },
  {
    hanzi: "关",
  },
  {
    hanzi: "关注",
  },
  {
    hanzi: "关上",
  },
  {
    hanzi: "送",
  },
  {
    hanzi: "开",
  },
  {
    hanzi: "开门",
  },
  {
    hanzi: "开会",
  },
  {
    hanzi: "打开",
  },
  {
    hanzi: "闻",
  },
  {
    hanzi: "关系",
  },
  {
    hanzi: "联系",
  },
  {
    hanzi: "开始",
  },
  {
    hanzi: "要",
    pinyin: "yào",
    en: "want",
    examples: [
      {
        hanzi: "我要那个",
        pinyin: "wǒ yào nà ge",
        en: "I want that one",
      },
    ],
  },
  {
    hanzi: "快要",
  },
  {
    hanzi: "取",
  },
  {
    hanzi: "看书",
  },
  {
    hanzi: "有",
    pinyin: "yǒu",
    en: "To have / to exist",
    examples: [
      {
        hanzi: "我要那个问题",
        pinyin: "wǒ yǒu yī gè wèntí",
        en: "I have a question",
      },
    ],
  },
  {
    hanzi: "没有",
  },
  {
    hanzi: "发",
  },
  {
    hanzi: "信",
  },
  {
    hanzi: "相信",
  },
  {
    hanzi: "上网",
  },
  {
    hanzi: "长",
  },
  {
    hanzi: "长大",
  },
  {
    hanzi: "说服",
  },
  {
    hanzi: "一定",
  },
  {
    hanzi: "决定",
  },
  {
    hanzi: "寄",
  },
  {
    hanzi: "能",
  },
  {
    hanzi: "可能",
  },
  {
    hanzi: "死",
  },
  {
    hanzi: "吓死",
  },
  {
    hanzi: "见",
  },
  {
    hanzi: "看见",
  },
  {
    hanzi: "见面",
  },
  {
    hanzi: "发现",
  },
  {
    hanzi: "听",
  },
  {
    hanzi: "听见",
  },
  {
    hanzi: "听说",
  },
  {
    hanzi: "吃饭",
  },
  {
    hanzi: "差",
  },
  {
    hanzi: "约会",
  },
  {
    hanzi: "给",
    pinyin: "gěi",
    en: "give",
  },
  {
    hanzi: "拿",
  },
  {
    hanzi: "穿",
  },
  {
    hanzi: "试试",
  },
  {
    hanzi: "分",
  },
  {
    hanzi: "分手",
  },
  {
    hanzi: "分开",
  },
  {
    hanzi: "切",
  },
  {
    hanzi: "上班",
  },
  {
    hanzi: "下班",
  },
  {
    hanzi: "加班",
  },
  {
    hanzi: "介绍",
  },
  {
    hanzi: "拍照",
  },
  {
    hanzi: "到",
  },
  {
    hanzi: "回到",
  },
  {
    hanzi: "得到",
  },
  {
    hanzi: "找到",
  },
  {
    hanzi: "来到",
  },
  {
    hanzi: "看到",
  },
  {
    hanzi: "听到",
  },
  {
    hanzi: "进",
  },
  {
    hanzi: "进来",
  },
  {
    hanzi: "进去",
  },
  {
    hanzi: "出",
  },
  {
    hanzi: "出来",
  },
  {
    hanzi: "出去",
  },
  {
    hanzi: "出国",
  },
  {
    hanzi: "出发",
  },
  {
    hanzi: "出现",
  },
  {
    hanzi: "想出来",
  },
  {
    hanzi: "变",
  },
  {
    hanzi: "上课",
  },
  {
    hanzi: "下课",
  },
  {
    hanzi: "点菜",
  },
  {
    hanzi: "受",
  },
  {
    hanzi: "受到",
  },
  {
    hanzi: "爱",
  },
  {
    hanzi: "爱好",
  },
  {
    hanzi: "借",
  },
  {
    hanzi: "收",
  },
  {
    hanzi: "改",
  },
  {
    hanzi: "改变",
  },
  {
    hanzi: "数",
  },
  {
    hanzi: "做",
  },
  {
    hanzi: "做饭",
  },
  {
    hanzi: "做爱",
  },
  {
    hanzi: "叫做",
  },
  {
    hanzi: "起床",
  },
  {
    hanzi: "学习",
  },
  {
    hanzi: "学",
  },
  {
    hanzi: "自学",
  },
  {
    hanzi: "上学",
  },
  {
    hanzi: "觉得",
  },
  {
    hanzi: "该",
  },
  {
    hanzi: "应该",
  },
  {
    hanzi: "求",
  },
  {
    hanzi: "要求",
  },
  {
    hanzi: "打球",
  },
  {
    hanzi: "火",
  },
  {
    hanzi: "烦",
  },
  {
    hanzi: "懂",
  },
  {
    hanzi: "作为",
  },
  {
    hanzi: "工作",
  },
  {
    hanzi: "请",
  },
  {
    hanzi: "请进",
  },
  {
    hanzi: "请问",
  },
  {
    hanzi: "生",
  },
  {
    hanzi: "生活",
  },
  {
    hanzi: "发生",
  },
  {
    hanzi: "生气",
  },
  {
    hanzi: "姓",
  },
  {
    hanzi: "回家",
  },
  {
    hanzi: "像",
  },
  {
    hanzi: "回头",
  },
  {
    hanzi: "买",
  },
  {
    hanzi: "买单",
  },
  {
    hanzi: "卖",
  },
  {
    hanzi: "读",
  },
  {
    hanzi: "读书",
  },
  {
    hanzi: "告诉",
  },
  {
    hanzi: "洗",
  },
  {
    hanzi: "了解",
  },
  {
    hanzi: "解决",
  },
  {
    hanzi: "打扫",
  },
  {
    hanzi: "出事",
  },
  {
    hanzi: "上车",
  },
  {
    hanzi: "下车",
  },
  {
    hanzi: "开车",
  },
  {
    hanzi: "打车",
  },
  {
    hanzi: "比较",
  },
  {
    hanzi: "经过",
  },
  {
    hanzi: "写",
  },
  {
    hanzi: "听写",
  },
  {
    hanzi: "信任",
  },
  {
    hanzi: "提高",
  },
  {
    hanzi: "停",
  },
  {
    hanzi: "加热",
  },
  {
    hanzi: "完成",
  },
  {
    hanzi: "成长",
  },
  {
    hanzi: "变成",
  },
  {
    hanzi: "成为",
  },
  {
    hanzi: "感动",
  },
  {
    hanzi: "感到",
  },
  {
    hanzi: "感觉",
  },
  {
    hanzi: "带",
  },
  {
    hanzi: "带来",
  },
  {
    hanzi: "带走",
  },
  {
    hanzi: "帮",
  },
  {
    hanzi: "下雨",
  },
  {
    hanzi: "下雪",
  },
  {
    hanzi: "服务",
  },
  {
    hanzi: "跑",
  },
  {
    hanzi: "跑步",
  },
  {
    hanzi: "走路",
  },
  {
    hanzi: "表示",
  },
  {
    hanzi: "知道",
  },
  {
    hanzi: "推",
  },
  {
    hanzi: "准备",
  },
  {
    hanzi: "笑",
  },
  {
    hanzi: "介意",
  },
  {
    hanzi: "同意",
  },
  {
    hanzi: "注意",
  },
  {
    hanzi: "站",
  },
  {
    hanzi: "拉",
  },
  {
    hanzi: "拉肚子",
  },
  {
    hanzi: "接",
  },
  {
    hanzi: "接受",
  },
  {
    hanzi: "亲",
  },
  {
    hanzi: "杀",
  },
  {
    hanzi: "扔",
  },
  {
    hanzi: "欠",
  },
  {
    hanzi: "吹",
  },
  {
    hanzi: "唱歌",
  },
  {
    hanzi: "喜欢",
  },
  {
    hanzi: "忘",
  },
  {
    hanzi: "忘记",
  },
  {
    hanzi: "帮忙",
  },
  {
    hanzi: "放",
  },
  {
    hanzi: "放下",
  },
  {
    hanzi: "放心",
  },
  {
    hanzi: "放开",
  },
  {
    hanzi: "放学",
  },
  {
    hanzi: "需要",
  },
  {
    hanzi: "病",
  },
  {
    hanzi: "生病",
  },
  {
    hanzi: "看病",
  },
  {
    hanzi: "睡",
  },
  {
    hanzi: "睡觉",
  },
  {
    hanzi: "毒",
  },
  {
    hanzi: "中毒",
  },
  {
    hanzi: "怎么办",
  },
  {
    hanzi: "来源",
  },
  {
    hanzi: "同情",
  },
  {
    hanzi: "愿意",
  },
  {
    hanzi: "愿",
  },
  {
    hanzi: "不愿",
  },
  {
    hanzi: "点头",
  },
  {
    hanzi: "重点",
  },
  {
    hanzi: "自信",
  },
  {
    hanzi: "放弃",
  },
  {
    hanzi: "教育",
  },
  {
    hanzi: "发育",
  },
  {
    hanzi: "能够",
  },
  {
    hanzi: "干活儿",
  },
  {
    hanzi: "充电",
  },
  {
    hanzi: "流",
  },
  {
    hanzi: "交流",
  },
  {
    hanzi: "流行",
  },
  {
    hanzi: "流动",
  },
  {
    hanzi: "统一",
  },
  {
    hanzi: "统计",
  },
  {
    hanzi: "进行",
  },
  {
    hanzi: "骑车",
  },
  {
    hanzi: "停车",
  },
  {
    hanzi: "停止",
  },
  {
    hanzi: "清",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "取消",
  },
  {
    hanzi: "消化",
  },
  {
    hanzi: "对比",
  },
  {
    hanzi: "相比",
  },
  {
    hanzi: "治",
  },
  {
    hanzi: "落",
  },
  {
    hanzi: "落实",
  },
  {
    hanzi: "落后",
  },
  {
    hanzi: "回落",
  },
  {
    hanzi: "露",
  },
  {
    hanzi: "露出",
  },
  {
    hanzi: "满足",
  },
  {
    hanzi: "充满",
  },
  {
    hanzi: "不满",
  },
  {
    hanzi: "配",
  },
  {
    hanzi: "配合",
  },
  {
    hanzi: "分配",
  },
  {
    hanzi: "配备",
  },
  {
    hanzi: "醒",
  },
  {
    hanzi: "提醒",
  },
  {
    hanzi: "醒来",
  },
  {
    hanzi: "清醒",
  },
  {
    hanzi: "睡醒",
  },
  {
    hanzi: "感谢",
  },
  {
    hanzi: "尊重",
  },
  {
    hanzi: "反对",
  },
  {
    hanzi: "对话",
  },
  {
    hanzi: "笑话",
  },
  {
    hanzi: "面对",
  },
  {
    hanzi: "波动",
  },
  {
    hanzi: "胡思乱想",
  },
  {
    hanzi: "前往",
  },
  {
    hanzi: "提前",
  },
  {
    hanzi: "承担",
  },
  {
    hanzi: "承认",
  },
  {
    hanzi: "承受",
  },
  {
    hanzi: "报名",
  },
  {
    hanzi: "重视",
  },
  {
    hanzi: "乏力",
  },
  {
    hanzi: "派",
  },
  {
    hanzi: "派出",
  },
  {
    hanzi: "游",
  },
  {
    hanzi: "游泳",
  },
  {
    hanzi: "实施",
  },
  {
    hanzi: "施工",
  },
  {
    hanzi: "发表",
  },
  {
    hanzi: "表明",
  },
  {
    hanzi: "代表",
  },
  {
    hanzi: "旅游",
  },
  {
    hanzi: "旅行",
  },
  {
    hanzi: "表现",
  },
  {
    hanzi: "体会",
  },
  {
    hanzi: "计算",
  },
  {
    hanzi: "省",
  },
  {
    hanzi: "沉",
  },
  {
    hanzi: "染",
  },
  {
    hanzi: "感染",
  },
  {
    hanzi: "实现",
  },
  {
    hanzi: "除",
  },
  {
    hanzi: "消除",
  },
  {
    hanzi: "切除",
  },
  {
    hanzi: "使用",
  },
  {
    hanzi: "运用",
  },
  {
    hanzi: "作用",
  },
  {
    hanzi: "应用",
  },
  {
    hanzi: "应付",
  },
  {
    hanzi: "支付",
  },
  {
    hanzi: "汇报",
  },
  {
    hanzi: "涨",
  },
  {
    hanzi: "上涨",
  },
  {
    hanzi: "高涨",
  },
  {
    hanzi: "引",
  },
  {
    hanzi: "引起",
  },
  {
    hanzi: "引进",
  },
  {
    hanzi: "引发",
  },
  {
    hanzi: "实习",
  },
  {
    hanzi: "反弹",
  },
  {
    hanzi: "淡化",
  },
  {
    hanzi: "污染",
  },
  {
    hanzi: "出汗",
  },
  {
    hanzi: "一路平安",
  },
  {
    hanzi: "赶",
  },
  {
    hanzi: "赶",
  },
  {
    hanzi: "赶来",
  },
  {
    hanzi: "赶到",
  },
  {
    hanzi: "超",
  },
  {
    hanzi: "超过",
  },
  {
    hanzi: "超越",
  },
  {
    hanzi: "感兴趣",
  },
  {
    hanzi: "有兴趣",
  },
  {
    hanzi: "好事",
  },
  {
    hanzi: "聚",
  },
  {
    hanzi: "聚会",
  },
  {
    hanzi: "聚在一起",
  },
  {
    hanzi: "泼",
  },
  {
    hanzi: "演",
  },
  {
    hanzi: "表演",
  },
  {
    hanzi: "演出",
  },
  {
    hanzi: "演唱",
  },
  {
    hanzi: "出差",
  },
  {
    hanzi: "购物",
  },
  {
    hanzi: "交易",
  },
  {
    hanzi: "踢",
  },
  {
    hanzi: "踢球",
  },
  {
    hanzi: "想象",
  },
  {
    hanzi: "发扬",
  },
  {
    hanzi: "表扬",
  },
  {
    hanzi: "支持",
  },
  {
    hanzi: "持有",
  },
  {
    hanzi: "主持",
  },
  {
    hanzi: "待",
  },
  {
    hanzi: "期待",
  },
  {
    hanzi: "等待",
  },
  {
    hanzi: "对待",
  },
  {
    hanzi: "接待",
  },
  {
    hanzi: "过年",
  },
  {
    hanzi: "微笑",
  },
  {
    hanzi: "占据",
  },
  {
    hanzi: "投",
  },
  {
    hanzi: "投入",
  },
  {
    hanzi: "投票",
  },
  {
    hanzi: "投诉",
  },
  {
    hanzi: "指",
  },
  {
    hanzi: "指出",
  },
  {
    hanzi: "指示",
  },
  {
    hanzi: "回国",
  },
  {
    hanzi: "鼓",
  },
  {
    hanzi: "编",
  },
  {
    hanzi: "骗",
  },
  {
    hanzi: "骗人",
  },
  {
    hanzi: "过期",
  },
  {
    hanzi: "按",
  },
  {
    hanzi: "招",
  },
  {
    hanzi: "招生",
  },
  {
    hanzi: "包括",
  },
  {
    hanzi: "掉",
  },
  {
    hanzi: "吃掉",
  },
  {
    hanzi: "丢掉",
  },
  {
    hanzi: "去掉",
  },
  {
    hanzi: "忘掉",
  },
  {
    hanzi: "掉下来",
  },
  {
    hanzi: "托",
  },
  {
    hanzi: "托运",
  },
  {
    hanzi: "发挥",
  },
  {
    hanzi: "指挥",
  },
  {
    hanzi: "挥",
  },
  {
    hanzi: "损",
  },
  {
    hanzi: "损坏",
  },
  {
    hanzi: "折",
  },
  {
    hanzi: "打折",
  },
  {
    hanzi: "抓",
  },
  {
    hanzi: "抓住",
  },
  {
    hanzi: "抓好",
  },
  {
    hanzi: "爬",
  },
  {
    hanzi: "爬山",
  },
  {
    hanzi: "爬行",
  },
  {
    hanzi: "拥有",
  },
  {
    hanzi: "出生",
  },
  {
    hanzi: "生长",
  },
  {
    hanzi: "抢",
  },
  {
    hanzi: "抢救",
  },
  {
    hanzi: "探",
  },
  {
    hanzi: "试探",
  },
  {
    hanzi: "探讨",
  },
  {
    hanzi: "挑",
  },
  {
    hanzi: "跳",
  },
  {
    hanzi: "逃",
  },
  {
    hanzi: "逃跑",
  },
  {
    hanzi: "飞行",
  },
  {
    hanzi: "实行",
  },
  {
    hanzi: "扩大",
  },
  {
    hanzi: "扩张",
  },
  {
    hanzi: "批",
  },
  {
    hanzi: "批准",
  },
  {
    hanzi: "混",
  },
  {
    hanzi: "混合",
  },
  {
    hanzi: "完毕",
  },
  {
    hanzi: "不知所措",
  },
  {
    hanzi: "发展",
  },
  {
    hanzi: "开展",
  },
  {
    hanzi: "展开",
  },
  {
    hanzi: "展示",
  },
  {
    hanzi: "展现",
  },
  {
    hanzi: "行动",
  },
  {
    hanzi: "带动",
  },
  {
    hanzi: "推动",
  },
  {
    hanzi: "发动",
  },
  {
    hanzi: "教授",
  },
  {
    hanzi: "延长",
  },
  {
    hanzi: "延期",
  },
  {
    hanzi: "挺",
  },
  {
    hanzi: "挺身而出",
  },
  {
    hanzi: "主动",
  },
  {
    hanzi: "主张",
  },
  {
    hanzi: "抱",
  },
  {
    hanzi: "拥抱",
  },
  {
    hanzi: "干扰",
  },
  {
    hanzi: "打扰",
  },
  {
    hanzi: "扰乱",
  },
  {
    hanzi: "抬",
  },
  {
    hanzi: "抬头",
  },
  {
    hanzi: "抬起",
  },
  {
    hanzi: "抬高",
  },
  {
    hanzi: "抬不起头",
  },
  {
    hanzi: "扮",
  },
  {
    hanzi: "扮演",
  },
  {
    hanzi: "打扮",
  },
  {
    hanzi: "收拾",
  },
  {
    hanzi: "担任",
  },
  {
    hanzi: "禁止",
  },
  {
    hanzi: "梦",
  },
  {
    hanzi: "做梦",
  },
  {
    hanzi: "麻烦",
  },
  {
    hanzi: "清楚",
  },
  {
    hanzi: "查",
  },
  {
    hanzi: "查看",
  },
  {
    hanzi: "集中",
  },
  {
    hanzi: "收集",
  },
  {
    hanzi: "等到",
  },
  {
    hanzi: "送到",
  },
  {
    hanzi: "送给",
  },
  {
    hanzi: "发送",
  },
  {
    hanzi: "提到",
  },
  {
    hanzi: "想到",
  },
  {
    hanzi: "做到",
  },
  {
    hanzi: "放到",
  },
  {
    hanzi: "见到",
  },
  {
    hanzi: "见过",
  },
  {
    hanzi: "拿到",
  },
  {
    hanzi: "接到",
  },
  {
    hanzi: "未能",
  },
  {
    hanzi: "意味着",
  },
  {
    hanzi: "勾",
  },
  {
    hanzi: "构成",
  },
  {
    hanzi: "购买",
  },
  {
    hanzi: "收购",
  },
  {
    hanzi: "采购",
  },
  {
    hanzi: "接着",
  },
  {
    hanzi: "接下来",
  },
  {
    hanzi: "树立",
  },
  {
    hanzi: "出版",
  },
  {
    hanzi: "分析",
  },
  {
    hanzi: "约束",
  },
  {
    hanzi: "整",
  },
  {
    hanzi: "整合",
  },
  {
    hanzi: "整治",
  },
  {
    hanzi: "问路",
  },
  {
    hanzi: "刻",
  },
  {
    hanzi: "咳嗽",
  },
  {
    hanzi: "松",
  },
  {
    hanzi: "放松",
  },
  {
    hanzi: "吵架",
  },
  {
    hanzi: "打架",
  },
  {
    hanzi: "开枪",
  },
  {
    hanzi: "种植",
  },
  {
    hanzi: "置",
  },
  {
    hanzi: "配置",
  },
  {
    hanzi: "值",
  },
  {
    hanzi: "保",
  },
  {
    hanzi: "保护",
  },
  {
    hanzi: "保持",
  },
  {
    hanzi: "担保",
  },
  {
    hanzi: "抬价",
  },
  {
    hanzi: "涨价",
  },
  {
    hanzi: "请教",
  },
  {
    hanzi: "开学",
  },
  {
    hanzi: "公开",
  },
  {
    hanzi: "养",
  },
  {
    hanzi: "养成",
  },
  {
    hanzi: "传",
  },
  {
    hanzi: "传来",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传真",
  },
  {
    hanzi: "传染",
  },
  {
    hanzi: "传授",
  },
  {
    hanzi: "转",
  },
  {
    hanzi: "转发",
  },
  {
    hanzi: "转变",
  },
  {
    hanzi: "转让",
  },
  {
    hanzi: "转化",
  },
  {
    hanzi: "转身",
  },
  {
    hanzi: "右转",
  },
  {
    hanzi: "左转",
  },
  {
    hanzi: "供",
  },
  {
    hanzi: "提供",
  },
  {
    hanzi: "供应",
  },
  {
    hanzi: "暴露",
  },
  {
    hanzi: "开放",
  },
  {
    hanzi: "召开",
  },
  {
    hanzi: "解开",
  },
  {
    hanzi: "推开",
  },
  {
    hanzi: "走开",
  },
  {
    hanzi: "走进",
  },
  {
    hanzi: "走过",
  },
  {
    hanzi: "爆",
  },
  {
    hanzi: "爆发",
  },
  {
    hanzi: "伤",
  },
  {
    hanzi: "受伤",
  },
  {
    hanzi: "损伤",
  },
  {
    hanzi: "优化",
  },
  {
    hanzi: "放假",
  },
  {
    hanzi: "请假",
  },
  {
    hanzi: "休假",
  },
  {
    hanzi: "倒",
  },
  {
    hanzi: "致",
  },
  {
    hanzi: "开发",
  },
  {
    hanzi: "发言",
  },
  {
    hanzi: "促进",
  },
  {
    hanzi: "促使",
  },
  {
    hanzi: "合伙",
  },
  {
    hanzi: "估计",
  },
  {
    hanzi: "低估",
  },
  {
    hanzi: "高估",
  },
  {
    hanzi: "加倍",
  },
  {
    hanzi: "争",
  },
  {
    hanzi: "争取",
  },
  {
    hanzi: "减",
  },
  {
    hanzi: "减少",
  },
  {
    hanzi: "减轻",
  },
  {
    hanzi: "建",
  },
  {
    hanzi: "建立",
  },
  {
    hanzi: "建成",
  },
  {
    hanzi: "构建",
  },
  {
    hanzi: "健身",
  },
  {
    hanzi: "面向",
  },
  {
    hanzi: "向上",
  },
  {
    hanzi: "向前",
  },
  {
    hanzi: "响",
  },
  {
    hanzi: "影响",
  },
  {
    hanzi: "躺",
  },
  {
    hanzi: "躺下",
  },
  {
    hanzi: "发明",
  },
  {
    hanzi: "操",
  },
  {
    hanzi: "洗澡",
  },
  {
    hanzi: "增",
  },
  {
    hanzi: "增加",
  },
  {
    hanzi: "增长",
  },
  {
    hanzi: "增强",
  },
  {
    hanzi: "新增",
  },
  {
    hanzi: "增多",
  },
  {
    hanzi: "亏",
  },
  {
    hanzi: "亏损",
  },
  {
    hanzi: "吃亏",
  },
  {
    hanzi: "考",
  },
  {
    hanzi: "考试",
  },
  {
    hanzi: "思考",
  },
  {
    hanzi: "考核",
  },
  {
    hanzi: "声明",
  },
  {
    hanzi: "自由化",
  },
  {
    hanzi: "加油",
  },
  {
    hanzi: "聘",
  },
  {
    hanzi: "招聘",
  },
  {
    hanzi: "聘请",
  },
  {
    hanzi: "应聘",
  },
  {
    hanzi: "抽",
  },
  {
    hanzi: "害",
  },
  {
    hanzi: "伤害",
  },
  {
    hanzi: "害怕",
  },
  {
    hanzi: "损害",
  },
  {
    hanzi: "拜",
  },
  {
    hanzi: "拜拜",
  },
  {
    hanzi: "拜托",
  },
  {
    hanzi: "否认",
  },
  {
    hanzi: "否定",
  },
  {
    hanzi: "舍不得",
  },
  {
    hanzi: "舍得",
  },
  {
    hanzi: "命令",
  },
  {
    hanzi: "善",
  },
  {
    hanzi: "完善",
  },
  {
    hanzi: "改善",
  },
  {
    hanzi: "吸",
  },
  {
    hanzi: "吸引",
  },
  {
    hanzi: "吸收",
  },
  {
    hanzi: "位于",
  },
  {
    hanzi: "在于",
  },
  {
    hanzi: "用于",
  },
  {
    hanzi: "低于",
  },
  {
    hanzi: "高于",
  },
  {
    hanzi: "等于",
  },
  {
    hanzi: "相当于",
  },
  {
    hanzi: "善于",
  },
  {
    hanzi: "在乎",
  },
  {
    hanzi: "呼吸",
  },
  {
    hanzi: "招呼",
  },
  {
    hanzi: "打招呼",
  },
  {
    hanzi: "含",
  },
  {
    hanzi: "含有",
  },
  {
    hanzi: "包含",
  },
  {
    hanzi: "确定",
  },
  {
    hanzi: "明确",
  },
  {
    hanzi: "确保",
  },
  {
    hanzi: "确认",
  },
  {
    hanzi: "出售",
  },
  {
    hanzi: "问候",
  },
  {
    hanzi: "提问",
  },
  {
    hanzi: "排",
  },
  {
    hanzi: "排名",
  },
  {
    hanzi: "排除",
  },
  {
    hanzi: "安排",
  },
  {
    hanzi: "靠",
  },
  {
    hanzi: "依靠",
  },
  {
    hanzi: "喝",
  },
  {
    hanzi: "喝酒",
  },
  {
    hanzi: "渴",
  },
  {
    hanzi: "渴求",
  },
  {
    hanzi: "歇",
  },
  {
    hanzi: "结",
  },
  {
    hanzi: "结束",
  },
  {
    hanzi: "结合",
  },
  {
    hanzi: "总结",
  },
  {
    hanzi: "纠结",
  },
  {
    hanzi: "结实",
  },
  {
    hanzi: "组",
  },
  {
    hanzi: "组成",
  },
  {
    hanzi: "组合",
  },
  {
    hanzi: "重组",
  },
  {
    hanzi: "组建",
  },
  {
    hanzi: "分组",
  },
  {
    hanzi: "具有",
  },
  {
    hanzi: "具备",
  },
  {
    hanzi: "在线",
  },
  {
    hanzi: "占线",
  },
  {
    hanzi: "持续",
  },
  {
    hanzi: "延续",
  },
  {
    hanzi: "组织",
  },
  {
    hanzi: "维护",
  },
  {
    hanzi: "维持",
  },
  {
    hanzi: "开机",
  },
  {
    hanzi: "关机",
  },
  {
    hanzi: "照相",
  },
  {
    hanzi: "继续",
  },
  {
    hanzi: "负",
  },
  {
    hanzi: "负担",
  },
  {
    hanzi: "依赖",
  },
  {
    hanzi: "信赖",
  },
  {
    hanzi: "懒得",
  },
  {
    hanzi: "练",
  },
  {
    hanzi: "练习",
  },
  {
    hanzi: "纳入",
  },
  {
    hanzi: "收看",
  },
  {
    hanzi: "收听",
  },
  {
    hanzi: "作文",
  },
  {
    hanzi: "顿",
  },
  {
    hanzi: "写作",
  },
  {
    hanzi: "叫作",
  },
  {
    hanzi: "合作",
  },
  {
    hanzi: "联合",
  },
  {
    hanzi: "合影",
  },
  {
    hanzi: "纠正",
  },
  {
    hanzi: "纠结",
  },
  {
    hanzi: "缩",
  },
  {
    hanzi: "缩小",
  },
  {
    hanzi: "互动",
  },
  {
    hanzi: "着火",
  },
  {
    hanzi: "打工",
  },
  {
    hanzi: "打听",
  },
  {
    hanzi: "打交道",
  },
  {
    hanzi: "交往",
  },
  {
    hanzi: "交给",
  },
  {
    hanzi: "控制",
  },
  {
    hanzi: "制定",
  },
  {
    hanzi: "制作",
  },
  {
    hanzi: "制约",
  },
  {
    hanzi: "形成",
  },
  {
    hanzi: "研发",
  },
  {
    hanzi: "研制",
  },
  {
    hanzi: "测",
  },
  {
    hanzi: "测试",
  },
  {
    hanzi: "测定",
  },
  {
    hanzi: "创新",
  },
  {
    hanzi: "创作",
  },
  {
    hanzi: "创建",
  },
  {
    hanzi: "排列",
  },
  {
    hanzi: "例如",
  },
  {
    hanzi: "例外",
  },
  {
    hanzi: "报道",
  },
  {
    hanzi: "报到",
  },
  {
    hanzi: "报告",
  },
  {
    hanzi: "告别",
  },
  {
    hanzi: "判决",
  },
  {
    hanzi: "归",
  },
  {
    hanzi: "回归",
  },
  {
    hanzi: "归还",
  },
  {
    hanzi: "刺",
  },
  {
    hanzi: "刷",
  },
  {
    hanzi: "刷新",
  },
  {
    hanzi: "刷牙",
  },
  {
    hanzi: "刮",
  },
  {
    hanzi: "刮目相看",
  },
  {
    hanzi: "刮风",
  },
  {
    hanzi: "偷",
  },
  {
    hanzi: "偷拍",
  },
  {
    hanzi: "输",
  },
  {
    hanzi: "运输",
  },
  {
    hanzi: "输入",
  },
  {
    hanzi: "输出",
  },
  {
    hanzi: "抓紧",
  },
  {
    hanzi: "探索",
  },
  {
    hanzi: "负责",
  },
  {
    hanzi: "分别",
  },
  {
    hanzi: "得分",
  },
  {
    hanzi: "达到",
  },
  {
    hanzi: "表达",
  },
  {
    hanzi: "高达",
  },
  {
    hanzi: "达成",
  },
  {
    hanzi: "到达",
  },
  {
    hanzi: "选",
  },
  {
    hanzi: "挑选",
  },
  {
    hanzi: "造",
  },
  {
    hanzi: "造成",
  },
  {
    hanzi: "创造",
  },
  {
    hanzi: "改造",
  },
  {
    hanzi: "制造",
  },
  {
    hanzi: "打造",
  },
  {
    hanzi: "造型",
  },
  {
    hanzi: "建造",
  },
  {
    hanzi: "伪造",
  },
  {
    hanzi: "成就",
  },
  {
    hanzi: "适应",
  },
  {
    hanzi: "退",
  },
  {
    hanzi: "退出",
  },
  {
    hanzi: "退休",
  },
  {
    hanzi: "遇到",
  },
  {
    hanzi: "偶遇",
  },
  {
    hanzi: "追",
  },
  {
    hanzi: "追求",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "成立",
  },
  {
    hanzi: "迷",
  },
  {
    hanzi: "迷路",
  },
  {
    hanzi: "透",
  },
  {
    hanzi: "透露",
  },
  {
    hanzi: "欢迎",
  },
  {
    hanzi: "迎接",
  },
  {
    hanzi: "迎来",
  },
  {
    hanzi: "印",
  },
  {
    hanzi: "打印",
  },
  {
    hanzi: "印刷",
  },
  {
    hanzi: "即",
  },
  {
    hanzi: "却",
  },
  {
    hanzi: "遗传",
  },
  {
    hanzi: "逛",
  },
  {
    hanzi: "违法",
  },
  {
    hanzi: "违规",
  },
  {
    hanzi: "不可避免",
  },
  {
    hanzi: "逃避",
  },
  {
    hanzi: "回避",
  },
  {
    hanzi: "邀请",
  },
  {
    hanzi: "刺激",
  },
  {
    hanzi: "激动",
  },
  {
    hanzi: "给予",
  },
  {
    hanzi: "予以",
  },
  {
    hanzi: "授予",
  },
  {
    hanzi: "预计",
  },
  {
    hanzi: "预期",
  },
  {
    hanzi: "预测",
  },
  {
    hanzi: "预算",
  },
  {
    hanzi: "预习",
  },
  {
    hanzi: "预估",
  },
  {
    hanzi: "需求",
  },
  {
    hanzi: "请求",
  },
  {
    hanzi: "无",
  },
  {
    hanzi: "无法",
  },
  {
    hanzi: "无疑",
  },
  {
    hanzi: "无数",
  },
  {
    hanzi: "无人",
  },
  {
    hanzi: "概括",
  },
  {
    hanzi: "打击",
  },
  {
    hanzi: "规定",
  },
  {
    hanzi: "规划",
  },
  {
    hanzi: "失去",
  },
  {
    hanzi: "损失",
  },
  {
    hanzi: "消失",
  },
  {
    hanzi: "跌",
  },
  {
    hanzi: "下跌",
  },
  {
    hanzi: "升",
  },
  {
    hanzi: "上升",
  },
  {
    hanzi: "提升",
  },
  {
    hanzi: "升级",
  },
  {
    hanzi: "升值",
  },
  {
    hanzi: "率先",
  },
  {
    hanzi: "利用",
  },
  {
    hanzi: "有利于",
  },
  {
    hanzi: "斗",
  },
  {
    hanzi: "斗争",
  },
  {
    hanzi: "称",
  },
  {
    hanzi: "称为",
  },
  {
    hanzi: "称呼",
  },
  {
    hanzi: "积累",
  },
  {
    hanzi: "移",
  },
  {
    hanzi: "转移",
  },
  {
    hanzi: "移动",
  },
  {
    hanzi: "移植",
  },
  {
    hanzi: "移交",
  },
  {
    hanzi: "走私",
  },
  {
    hanzi: "秀",
  },
  {
    hanzi: "便秘",
  },
  {
    hanzi: "租",
  },
  {
    hanzi: "出租",
  },
  {
    hanzi: "自觉",
  },
  {
    hanzi: "排队",
  },
  {
    hanzi: "防",
  },
  {
    hanzi: "防止",
  },
  {
    hanzi: "预防",
  },
  {
    hanzi: "防治",
  },
  {
    hanzi: "限",
  },
  {
    hanzi: "限制",
  },
  {
    hanzi: "降",
  },
  {
    hanzi: "下降",
  },
  {
    hanzi: "降低",
  },
  {
    hanzi: "降价",
  },
  {
    hanzi: "跳舞",
  },
  {
    hanzi: "鼓舞",
  },
  {
    hanzi: "处于",
  },
  {
    hanzi: "查处",
  },
  {
    hanzi: "陈述",
  },
  {
    hanzi: "疼爱",
  },
  {
    hanzi: "附",
  },
  {
    hanzi: "附加",
  },
  {
    hanzi: "保障",
  },
  {
    hanzi: "阻止",
  },
  {
    hanzi: "陪",
  },
  {
    hanzi: "陪伴",
  },
  {
    hanzi: "陪同",
  },
  {
    hanzi: "理",
  },
  {
    hanzi: "处理",
  },
  {
    hanzi: "理解",
  },
  {
    hanzi: "办理",
  },
  {
    hanzi: "治理",
  },
  {
    hanzi: "整理",
  },
  {
    hanzi: "管理",
  },
  {
    hanzi: "代理",
  },
  {
    hanzi: "清理",
  },
  {
    hanzi: "理发",
  },
  {
    hanzi: "量",
  },
  {
    hanzi: "测量",
  },
  {
    hanzi: "望",
  },
  {
    hanzi: "失望",
  },
  {
    hanzi: "有望",
  },
  {
    hanzi: "渴望",
  },
  {
    hanzi: "弄",
  },
  {
    hanzi: "弄清",
  },
  {
    hanzi: "玩弄",
  },
  {
    hanzi: "弄好",
  },
  {
    hanzi: "弄死",
  },
  {
    hanzi: "弄死",
  },
  {
    hanzi: "貌似",
  },
  {
    hanzi: "基于",
  },
  {
    hanzi: "祝",
  },
  {
    hanzi: "祝福",
  },
  {
    hanzi: "祝愿",
  },
  {
    hanzi: "预祝",
  },
  {
    hanzi: "压",
  },
  {
    hanzi: "平均",
  },
  {
    hanzi: "人均",
  },
  {
    hanzi: "坚持",
  },
  {
    hanzi: "热爱",
  },
  {
    hanzi: "培养",
  },
  {
    hanzi: "培育",
  },
  {
    hanzi: "填",
  },
  {
    hanzi: "填写",
  },
  {
    hanzi: "填空",
  },
  {
    hanzi: "堵",
  },
  {
    hanzi: "堵塞",
  },
  {
    hanzi: "堵车",
  },
  {
    hanzi: "中介",
  },
  {
    hanzi: "塑造",
  },
  {
    hanzi: "逆行",
  },
  {
    hanzi: "控股",
  },
  {
    hanzi: "胜",
  },
  {
    hanzi: "胜利",
  },
  {
    hanzi: "脱",
  },
  {
    hanzi: "阅读",
  },
  {
    hanzi: "减肥",
  },
  {
    hanzi: "上当",
  },
  {
    hanzi: "当心",
  },
  {
    hanzi: "肯",
  },
  {
    hanzi: "不肯",
  },
  {
    hanzi: "肿",
  },
  {
    hanzi: "冲",
  },
  {
    hanzi: "冲突",
  },
  {
    hanzi: "冲击",
  },
  {
    hanzi: "赢",
  },
  {
    hanzi: "赢得",
  },
  {
    hanzi: "决心",
  },
  {
    hanzi: "背",
  },
  {
    hanzi: "乘",
  },
  {
    hanzi: "乘坐",
  },
  {
    hanzi: "剩下",
  },
  {
    hanzi: "剩",
  },
  {
    hanzi: "剩余",
  },
  {
    hanzi: "骨折",
  },
  {
    hanzi: "滑",
  },
  {
    hanzi: "下滑",
  },
  {
    hanzi: "滑雪",
  },
  {
    hanzi: "滑冰",
  },
  {
    hanzi: "区别",
  },
  {
    hanzi: "建议",
  },
  {
    hanzi: "希望",
  },
  {
    hanzi: "离",
  },
  {
    hanzi: "离开",
  },
  {
    hanzi: "距离",
  },
  {
    hanzi: "分离",
  },
  {
    hanzi: "成功",
  },
  {
    hanzi: "帮助",
  },
  {
    hanzi: "救助",
  },
  {
    hanzi: "经历",
  },
  {
    hanzi: "努力",
  },
  {
    hanzi: "无穷",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "通过",
  },
  {
    hanzi: "通知",
  },
  {
    hanzi: "流通",
  },
  {
    hanzi: "沟通",
  },
  {
    hanzi: "通道",
  },
  {
    hanzi: "通信",
  },
  {
    hanzi: "联通",
  },
  {
    hanzi: "开通",
  },
  {
    hanzi: "通用",
  },
  {
    hanzi: "午睡",
  },
  {
    hanzi: "变为",
  },
  {
    hanzi: "头痛",
  },
  {
    hanzi: "治疗",
  },
  {
    hanzi: "医疗",
  },
  {
    hanzi: "搜",
  },
  {
    hanzi: "搜索",
  },
  {
    hanzi: "搜集",
  },
  {
    hanzi: "疯",
  },
  {
    hanzi: "发疯",
  },
  {
    hanzi: "就业",
  },
  {
    hanzi: "毕业",
  },
  {
    hanzi: "业绩",
  },
  {
    hanzi: "创业",
  },
  {
    hanzi: "开业",
  },
  {
    hanzi: "显",
  },
  {
    hanzi: "显示",
  },
  {
    hanzi: "显得",
  },
  {
    hanzi: "普及",
  },
  {
    hanzi: "导致",
  },
  {
    hanzi: "指导",
  },
  {
    hanzi: "导演",
  },
  {
    hanzi: "引导",
  },
  {
    hanzi: "移民",
  },
  {
    hanzi: "将",
  },
  {
    hanzi: "装",
  },
  {
    hanzi: "安装",
  },
  {
    hanzi: "武装",
  },
  {
    hanzi: "包装",
  },
  {
    hanzi: "装置",
  },
  {
    hanzi: "装扮",
  },
  {
    hanzi: "伪装",
  },
  {
    hanzi: "射",
  },
  {
    hanzi: "发射",
  },
  {
    hanzi: "注射",
  },
  {
    hanzi: "寻找",
  },
  {
    hanzi: "寻求",
  },
  {
    hanzi: "冠",
  },
  {
    hanzi: "节约",
  },
  {
    hanzi: "节能",
  },
  {
    hanzi: "规范",
  },
  {
    hanzi: "示范",
  },
  {
    hanzi: "防范",
  },
  {
    hanzi: "若",
  },
  {
    hanzi: "协议",
  },
  {
    hanzi: "协助",
  },
  {
    hanzi: "藏",
  },
  {
    hanzi: "收藏",
  },
  {
    hanzi: "经营",
  },
  {
    hanzi: "运营",
  },
  {
    hanzi: "营业",
  },
  {
    hanzi: "劳动",
  },
  {
    hanzi: "辛劳",
  },
  {
    hanzi: "理论",
  },
  {
    hanzi: "讨论",
  },
  {
    hanzi: "结论",
  },
  {
    hanzi: "评论",
  },
  {
    hanzi: "评价",
  },
  {
    hanzi: "评估",
  },
  {
    hanzi: "批评",
  },
  {
    hanzi: "评选",
  },
  {
    hanzi: "看不起",
  },
  {
    hanzi: "轻视",
  },
  {
    hanzi: "讲",
  },
  {
    hanzi: "讲话",
  },
  {
    hanzi: "演讲",
  },
  {
    hanzi: "讲述",
  },
  {
    hanzi: "听讲",
  },
  {
    hanzi: "证明",
  },
  {
    hanzi: "保证",
  },
  {
    hanzi: "证实",
  },
  {
    hanzi: "认证",
  },
  {
    hanzi: "谈",
  },
  {
    hanzi: "谈判",
  },
  {
    hanzi: "会谈",
  },
  {
    hanzi: "谈到",
  },
  {
    hanzi: "谈话",
  },
  {
    hanzi: "训练",
  },
  {
    hanzi: "采访",
  },
  {
    hanzi: "访问",
  },
  {
    hanzi: "拜访",
  },
  {
    hanzi: "误会",
  },
  {
    hanzi: "延误",
  },
  {
    hanzi: "订",
  },
  {
    hanzi: "预订",
  },
  {
    hanzi: "承诺",
  },
  {
    hanzi: "原谅",
  },
  {
    hanzi: "谅解",
  },
  {
    hanzi: "体谅",
  },
  {
    hanzi: "见谅",
  },
  {
    hanzi: "度",
  },
  {
    hanzi: "出席",
  },
  {
    hanzi: "庆祝",
  },
  {
    hanzi: "扩大",
  },
  {
    hanzi: "扩张",
  },
  {
    hanzi: "破",
  },
  {
    hanzi: "突破",
  },
  {
    hanzi: "破坏",
  },
  {
    hanzi: "打破",
  },
  {
    hanzi: "阻碍",
  },
  {
    hanzi: "领导",
  },
  {
    hanzi: "领先",
  },
  {
    hanzi: "带领",
  },
  {
    hanzi: "领取",
  },
  {
    hanzi: "零售",
  },
  {
    hanzi: "须知",
  },
  {
    hanzi: "修",
  },
  {
    hanzi: "修改",
  },
  {
    hanzi: "装修",
  },
  {
    hanzi: "维修",
  },
  {
    hanzi: "修理",
  },
  {
    hanzi: "随身",
  },
  {
    hanzi: "顺",
  },
  {
    hanzi: "一路顺风",
  },
  {
    hanzi: "照顾",
  },
  {
    hanzi: "回顾",
  },
  {
    hanzi: "顶",
  },
  {
    hanzi: "加工",
  },
  {
    hanzi: "标志",
  },
  {
    hanzi: "志愿",
  },
  {
    hanzi: "念",
  },
  {
    hanzi: "纪念",
  },
  {
    hanzi: "恋爱",
  },
  {
    hanzi: "失恋",
  },
  {
    hanzi: "加快",
  },
  {
    hanzi: "加强",
  },
  {
    hanzi: "感恩",
  },
  {
    hanzi: "抱怨",
  },
  {
    hanzi: "宛如",
  },
  {
    hanzi: "得出",
  },
  {
    hanzi: "拿出",
  },
  {
    hanzi: "提出",
  },
  {
    hanzi: "找出",
  },
  {
    hanzi: "发出",
  },
  {
    hanzi: "认出",
  },
  {
    hanzi: "患",
  },
  {
    hanzi: "患病",
  },
  {
    hanzi: "考虑",
  },
  {
    hanzi: "弄虚作假",
  },
  {
    hanzi: "忍",
  },
  {
    hanzi: "忍受",
  },
  {
    hanzi: "忍耐",
  },
  {
    hanzi: "认可",
  },
  {
    hanzi: "认得",
  },
  {
    hanzi: "懂得",
  },
  {
    hanzi: "取得",
  },
  {
    hanzi: "出门",
  },
  {
    hanzi: "出院",
  },
  {
    hanzi: "住院",
  },
  {
    hanzi: "站住",
  },
  {
    hanzi: "美容",
  },
  {
    hanzi: "容纳",
  },
  {
    hanzi: "容忍",
  },
  {
    hanzi: "随心所欲",
  },
  {
    hanzi: "回复",
  },
  {
    hanzi: "反复",
  },
  {
    hanzi: "重复",
  },
  {
    hanzi: "复习",
  },
  {
    hanzi: "复印",
  },
  {
    hanzi: "申请",
  },
  {
    hanzi: "申报",
  },
  {
    hanzi: "重申",
  },
  {
    hanzi: "审计",
  },
  {
    hanzi: "审批",
  },
  {
    hanzi: "审查",
  },
  {
    hanzi: "出示",
  },
  {
    hanzi: "出口",
  },
  {
    hanzi: "进口",
  },
  {
    hanzi: "暗示",
  },
  {
    hanzi: "震",
  },
  {
    hanzi: "地震",
  },
  {
    hanzi: "进入",
  },
  {
    hanzi: "深入",
  },
  {
    hanzi: "前进",
  },
  {
    hanzi: "推进",
  },
  {
    hanzi: "改进",
  },
  {
    hanzi: "改正",
  },
  {
    hanzi: "怀疑",
  },
  {
    hanzi: "怀念",
  },
  {
    hanzi: "惊喜",
  },
  {
    hanzi: "接近",
  },
  {
    hanzi: "不惜",
  },
  {
    hanzi: "爱惜",
  },
  {
    hanzi: "在所不惜",
  },
  {
    hanzi: "回忆",
  },
  {
    hanzi: "记忆",
  },
  {
    hanzi: "后悔",
  },
  {
    hanzi: "悔过",
  },
  {
    hanzi: "悔改",
  },
  {
    hanzi: "遗憾",
  },
  {
    hanzi: "可怜",
  },
  {
    hanzi: "习惯",
  },
  {
    hanzi: "克服",
  },
  {
    hanzi: "鼓掌",
  },
  {
    hanzi: "击掌",
  },
  {
    hanzi: "缺",
  },
  {
    hanzi: "缺少",
  },
  {
    hanzi: "缺乏",
  },
  {
    hanzi: "从事 1",
  },
  {
    hanzi: "生产",
  },
  {
    hanzi: "产生",
  },
  {
    hanzi: "质疑",
  },
  {
    hanzi: "鼓励",
  },
  {
    hanzi: "奖励",
  },
  {
    hanzi: "激励",
  },
  {
    hanzi: "危害",
  },
  {
    hanzi: "登陆",
  },
  {
    hanzi: "登山",
  },
  {
    hanzi: "登机",
  },
  {
    hanzi: "散",
  },
  {
    hanzi: "扩散",
  },
  {
    hanzi: "散步",
  },
  {
    hanzi: "攻击",
  },
  {
    hanzi: "进攻",
  },
  {
    hanzi: "失败",
  },
  {
    hanzi: "击败",
  },
  {
    hanzi: "打败",
  },
  {
    hanzi: "敢",
  },
  {
    hanzi: "不敢",
  },
  {
    hanzi: "尊敬",
  },
  {
    hanzi: "敬业",
  },
  {
    hanzi: "敬礼",
  },
  {
    hanzi: "报警",
  },
  {
    hanzi: "警告",
  },
  {
    hanzi: "熬夜",
  },
  {
    hanzi: "尝",
  },
  {
    hanzi: "尝试",
  },
  {
    hanzi: "品尝",
  },
  {
    hanzi: "宝贵",
  },
  {
    hanzi: "感受",
  },
  {
    hanzi: "属",
  },
  {
    hanzi: "属于",
  },
  {
    hanzi: "尽",
  },
  {
    hanzi: "尽量",
  },
  {
    hanzi: "迟到",
  },
  {
    hanzi: "推迟",
  },
  {
    hanzi: "延迟",
  },
  {
    hanzi: "授权",
  },
  {
    hanzi: "观看",
  },
  {
    hanzi: "摄",
  },
  {
    hanzi: "拍摄",
  },
  {
    hanzi: "摄影",
  },
  {
    hanzi: "游戏",
  },
  {
    hanzi: "敲",
  },
  {
    hanzi: "敲门",
  },
  {
    hanzi: "敲定",
  },
  {
    hanzi: "出血",
  },
  {
    hanzi: "监管",
  },
  {
    hanzi: "监测",
  },
  {
    hanzi: "监控",
  },
  {
    hanzi: "监督",
  },
  {
    hanzi: "临",
  },
  {
    hanzi: "临床",
  },
  {
    hanzi: "面临",
  },
  {
    hanzi: "盖",
  },
  {
    hanzi: "加盟",
  },
  {
    hanzi: "宣传",
  },
  {
    hanzi: "守",
  },
  {
    hanzi: "防守",
  },
  {
    hanzi: "救灾",
  },
  {
    hanzi: "观察",
  },
  {
    hanzi: "考察",
  },
  {
    hanzi: "监察",
  },
  {
    hanzi: "擦",
  },
  {
    hanzi: "摩擦",
  },
  {
    hanzi: "擦干",
  },
  {
    hanzi: "擦伤",
  },
  {
    hanzi: "比赛",
  },
  {
    hanzi: "塞",
  },
  {
    hanzi: "塞车",
  },
  {
    hanzi: "堵塞",
  },
  {
    hanzi: "举",
  },
  {
    hanzi: "举行",
  },
  {
    hanzi: "举办",
  },
  {
    hanzi: "选举",
  },
  {
    hanzi: "举报",
  },
  {
    hanzi: "抬举",
  },
  {
    hanzi: "举重",
  },
  {
    hanzi: "举手",
  },
  {
    hanzi: "选择",
  },
  {
    hanzi: "播",
  },
  {
    hanzi: "传播",
  },
  {
    hanzi: "播放",
  },
  {
    hanzi: "播出",
  },
  {
    hanzi: "直播",
  },
  {
    hanzi: "释放",
  },
  {
    hanzi: "解释",
  },
  {
    hanzi: "据悉",
  },
  {
    hanzi: "翻",
  },
  {
    hanzi: "翻译",
  },
  {
    hanzi: "竞争",
  },
  {
    hanzi: "竞赛",
  },
  {
    hanzi: "端",
  },
  {
    hanzi: "协商",
  },
  {
    hanzi: "商量",
  },
  {
    hanzi: "消费",
  },
  {
    hanzi: "免费",
  },
  {
    hanzi: "收费",
  },
  {
    hanzi: "浪费",
  },
  {
    hanzi: "交费",
  },
  {
    hanzi: "聊",
  },
  {
    hanzi: "聊天",
  },
  {
    hanzi: "贸易",
  },
  {
    hanzi: "留",
  },
  {
    hanzi: "留下",
  },
  {
    hanzi: "保留",
  },
  {
    hanzi: "停留",
  },
  {
    hanzi: "留学",
  },
  {
    hanzi: "贴",
  },
  {
    hanzi: "挑战",
  },
  {
    hanzi: "战斗",
  },
  {
    hanzi: "战胜",
  },
  {
    hanzi: "作战",
  },
  {
    hanzi: "赔",
  },
  {
    hanzi: "赔钱",
  },
  {
    hanzi: "赔偿",
  },
  {
    hanzi: "采取",
  },
  {
    hanzi: "采用",
  },
  {
    hanzi: "理财",
  },
  {
    hanzi: "扶贫",
  },
  {
    hanzi: "贷",
  },
  {
    hanzi: "参加",
  },
  {
    hanzi: "参与",
  },
  {
    hanzi: "参考",
  },
  {
    hanzi: "参赛",
  },
  {
    hanzi: "参观",
  },
  {
    hanzi: "类似",
  },
  {
    hanzi: "分类",
  },
  {
    hanzi: "映",
  },
  {
    hanzi: "反映",
  },
  {
    hanzi: "换",
  },
  {
    hanzi: "转换",
  },
  {
    hanzi: "交换",
  },
  {
    hanzi: "更换",
  },
  {
    hanzi: "好奇",
  },
  {
    hanzi: "好客",
  },
  {
    hanzi: "请客",
  },
  {
    hanzi: "做客",
  },
  {
    hanzi: "奋斗",
  },
  {
    hanzi: "争夺",
  },
  {
    hanzi: "夺得",
  },
  {
    hanzi: "夺取",
  },
  {
    hanzi: "开幕",
  },
  {
    hanzi: "羡慕",
  },
  {
    hanzi: "爱慕",
  },
  {
    hanzi: "存",
  },
  {
    hanzi: "存在",
  },
  {
    hanzi: "生存",
  },
  {
    hanzi: "保存",
  },
  {
    hanzi: "分享",
  },
  {
    hanzi: "享受",
  },
  {
    hanzi: "共享",
  },
  {
    hanzi: "熟知",
  },
  {
    hanzi: "熟睡",
  },
  {
    hanzi: "获得",
  },
  {
    hanzi: "获悉",
  },
  {
    hanzi: "收获",
  },
  {
    hanzi: "获取",
  },
  {
    hanzi: "奉献",
  },
  {
    hanzi: "贡献",
  },
  {
    hanzi: "沉默",
  },
  {
    hanzi: "默认",
  },
  {
    hanzi: "独立",
  },
  {
    hanzi: "融",
  },
  {
    hanzi: "融合",
  },
  {
    hanzi: "融化",
  },
  {
    hanzi: "犯",
  },
  {
    hanzi: "犯罪",
  },
  {
    hanzi: "猜",
  },
  {
    hanzi: "猜测",
  },
  {
    hanzi: "猜猜",
  },
  {
    hanzi: "猜想",
  },
  {
    hanzi: "猜中",
  },
  {
    hanzi: "检查",
  },
  {
    hanzi: "检测",
  },
  {
    hanzi: "试验",
  },
  {
    hanzi: "体验",
  },
  {
    hanzi: "检验",
  },
  {
    hanzi: "考验",
  },
  {
    hanzi: "签",
  },
  {
    hanzi: "签订",
  },
  {
    hanzi: "签名",
  },
  {
    hanzi: "签到",
  },
  {
    hanzi: "签约",
  },
  {
    hanzi: "签字",
  },
  {
    hanzi: "断",
  },
  {
    hanzi: "不断",
  },
  {
    hanzi: "诊断",
  },
  {
    hanzi: "判断",
  },
  {
    hanzi: "斩",
  },
  {
    hanzi: "斩断",
  },
  {
    hanzi: "暂停",
  },
  {
    hanzi: "暂定",
  },
  {
    hanzi: "暂缓",
  },
  {
    hanzi: "推广",
  },
  {
    hanzi: "情感",
  },
  {
    hanzi: "编辑",
  },
  {
    hanzi: "转载",
  },
  {
    hanzi: "记载",
  },
  {
    hanzi: "下载",
  },
  {
    hanzi: "裁判",
  },
  {
    hanzi: "戴",
  },
  {
    hanzi: "戴上",
  },
  {
    hanzi: "爱戴",
  },
  {
    hanzi: "穿戴",
  },
  {
    hanzi: "划船",
  },
  {
    hanzi: "搬",
  },
  {
    hanzi: "搬家",
  },
  {
    hanzi: "反抗",
  },
  {
    hanzi: "导航",
  },
  {
    hanzi: "收盘",
  },
  {
    hanzi: "封",
  },
  {
    hanzi: "信封",
  },
  {
    hanzi: "挂",
  },
  {
    hanzi: "改革",
  },
  {
    hanzi: "革命",
  },
  {
    hanzi: "改革开放",
  },
  {
    hanzi: "逛街",
  },
  {
    hanzi: "上街",
  },
  {
    hanzi: "策划",
  },
  {
    hanzi: "符合",
  },
  {
    hanzi: "笔记",
  },
  {
    hanzi: "回答",
  },
  {
    hanzi: "答应",
  },
  {
    hanzi: "建筑",
  },
  {
    hanzi: "恐怕",
  },
  {
    hanzi: "恐惧",
  },
  {
    hanzi: "委托",
  },
  {
    hanzi: "威胁",
  },
  {
    hanzi: "结婚",
  },
  {
    hanzi: "离婚",
  },
  {
    hanzi: "妨碍",
  },
  {
    hanzi: "困",
  },
  {
    hanzi: "困扰",
  },
  {
    hanzi: "固定",
  },
  {
    hanzi: "巩固",
  },
  {
    hanzi: "卷",
  },
  {
    hanzi: "圈",
  },
  {
    hanzi: "公布",
  },
  {
    hanzi: "发布",
  },
  {
    hanzi: "宣布",
  },
  {
    hanzi: "分布",
  },
  {
    hanzi: "布局",
  },
  {
    hanzi: "遍布",
  },
  {
    hanzi: "闹",
  },
  {
    hanzi: "闹事",
  },
  {
    hanzi: "胡闹",
  },
  {
    hanzi: "冒",
  },
  {
    hanzi: "感冒",
  },
  {
    hanzi: "冒险",
  },
  {
    hanzi: "假冒",
  },
  {
    hanzi: "套",
  },
  {
    hanzi: "配套",
  },
  {
    hanzi: "录",
  },
  {
    hanzi: "记录",
  },
  {
    hanzi: "录取",
  },
  {
    hanzi: "登录",
  },
  {
    hanzi: "录音",
  },
  {
    hanzi: "绿化",
  },
  {
    hanzi: "兼职",
  },
  {
    hanzi: "兼并",
  },
  {
    hanzi: "兼顾",
  },
  {
    hanzi: "兼容",
  },
  {
    hanzi: "赚",
  },
  {
    hanzi: "赚钱",
  },
  {
    hanzi: "道歉",
  },
  {
    hanzi: "抱歉",
  },
  {
    hanzi: "谦虚",
  },
  {
    hanzi: "贯彻",
  },
  {
    hanzi: "补",
  },
  {
    hanzi: "补充",
  },
  {
    hanzi: "补贴",
  },
  {
    hanzi: "补偿",
  },
  {
    hanzi: "补救",
  },
  {
    hanzi: "画",
  },
  {
    hanzi: "画画",
  },
  {
    hanzi: "敬畏",
  },
  {
    hanzi: "畏惧",
  },
  {
    hanzi: "喂",
  },
  {
    hanzi: "喂养",
  },
  {
    hanzi: "针对",
  },
  {
    hanzi: "打针",
  },
  {
    hanzi: "镇",
  },
  {
    hanzi: "骄傲",
  },
  {
    hanzi: "吸烟",
  },
  {
    hanzi: "抽烟",
  },
  {
    hanzi: "炎症",
  },
  {
    hanzi: "发炎",
  },
  {
    hanzi: "救灾",
  },
  {
    hanzi: "锻炼",
  },
  {
    hanzi: "烧",
  },
  {
    hanzi: "发烧",
  },
  {
    hanzi: "绕",
  },
  {
    hanzi: "围绕",
  },
  {
    hanzi: "浇",
  },
  {
    hanzi: "浇水",
  },
  {
    hanzi: "花费",
  },
  {
    hanzi: "隔",
  },
  {
    hanzi: "隔开",
  },
  {
    hanzi: "存款",
  },
  {
    hanzi: "贷款",
  },
  {
    hanzi: "还款",
  },
  {
    hanzi: "付款",
  },
  {
    hanzi: "汇款",
  },
  {
    hanzi: "取款",
  },
  {
    hanzi: "投资",
  },
  {
    hanzi: "资助",
  },
  {
    hanzi: "不敢当",
  },
  {
    hanzi: "当成",
  },
  {
    hanzi: "当作",
  },
  {
    hanzi: "作出",
  },
  {
    hanzi: "出于",
  },
  {
    hanzi: "付出",
  },
  {
    hanzi: "赞",
  },
  {
    hanzi: "称赞",
  },
  {
    hanzi: "赞成",
  },
  {
    hanzi: "赞助",
  },
  {
    hanzi: "对付",
  },
  {
    hanzi: "看出",
  },
  {
    hanzi: "支出",
  },
  {
    hanzi: "支配",
  },
  {
    hanzi: "雕",
  },
  {
    hanzi: "雕刻",
  },
  {
    hanzi: "查出",
  },
  {
    hanzi: "超出",
  },
  {
    hanzi: "出访",
  },
  {
    hanzi: "传出",
  },
  {
    hanzi: "外出",
  },
  {
    hanzi: "显出",
  },
  {
    hanzi: "调 tiáo",
  },
  {
    hanzi: "调 diào",
  },
  {
    hanzi: "调查",
  },
  {
    hanzi: "强调",
  },
  {
    hanzi: "调整",
  },
  {
    hanzi: "调动",
  },
  {
    hanzi: "调节",
  },
  {
    hanzi: "调解",
  },
  {
    hanzi: "调研",
  },
  {
    hanzi: "协调",
  },
  {
    hanzi: "出场",
  },
  {
    hanzi: "出动",
  },
  {
    hanzi: "路过",
  },
  {
    hanzi: "建设",
  },
  {
    hanzi: "设计",
  },
  {
    hanzi: "设立",
  },
  {
    hanzi: "设置",
  },
  {
    hanzi: "设想",
  },
  {
    hanzi: "开设",
  },
  {
    hanzi: "出面",
  },
  {
    hanzi: "出名",
  },
  {
    hanzi: "出入",
  },
  {
    hanzi: "出台",
  },
  {
    hanzi: "出行",
  },
  {
    hanzi: "罚",
  },
  {
    hanzi: "处罚",
  },
  {
    hanzi: "罚款",
  },
  {
    hanzi: "推出",
  },
  {
    hanzi: "推行",
  },
  {
    hanzi: "步行",
  },
  {
    hanzi: "发行",
  },
  {
    hanzi: "运行",
  },
  {
    hanzi: "执行",
  },
  {
    hanzi: "盛行",
  },
  {
    hanzi: "通行",
  },
  {
    hanzi: "不许",
  },
  {
    hanzi: "许可",
  },
  {
    hanzi: "允许",
  },
  {
    hanzi: "同行 xíng",
  },
  {
    hanzi: "流传",
  },
  {
    hanzi: "灭",
  },
  {
    hanzi: "消灭",
  },
  {
    hanzi: "灭火",
  },
  {
    hanzi: "炸 zhà",
  },
  {
    hanzi: "炸 zhá",
  },
  {
    hanzi: "爆炸",
  },
  {
    hanzi: "储存",
  },
  {
    hanzi: "储备",
  },
  {
    hanzi: "侧",
  },
  {
    hanzi: "打雷",
  },
  {
    hanzi: "打动",
  },
  {
    hanzi: "打断",
  },
  {
    hanzi: "中断",
  },
  {
    hanzi: "侵犯",
  },
  {
    hanzi: "打发",
  },
  {
    hanzi: "打官司",
  },
  {
    hanzi: "打牌",
  },
  {
    hanzi: "轮",
  },
  {
    hanzi: "摄像",
  },
  {
    hanzi: "加速",
  },
  {
    hanzi: "减速",
  },
  {
    hanzi: "被迫",
  },
  {
    hanzi: "强迫",
  },
  {
    hanzi: "压迫",
  },
  {
    hanzi: "推荐",
  },
  {
    hanzi: "团结",
  },
  {
    hanzi: "受灾",
  },
  {
    hanzi: "闭",
  },
  {
    hanzi: "闭上",
  },
  {
    hanzi: "倒闭",
  },
  {
    hanzi: "封闭",
  },
  {
    hanzi: "关闭",
  },
  {
    hanzi: "闭幕",
  },
  {
    hanzi: "闭嘴",
  },
  {
    hanzi: "闪",
  },
  {
    hanzi: "喊 ",
  },
  {
    hanzi: "启动 ",
  },
  {
    hanzi: "启发 ",
  },
  {
    hanzi: "启事 ",
  },
  {
    hanzi: "杀毒",
  },
  {
    hanzi: "扶贫",
  },
];
// Verbs End

// Adjectives 形容词 (620)
export const allAdjectives = [
  {
    hanzi: "干",
  },
  {
    hanzi: "气",
  },
  {
    hanzi: "旧",
  },
  {
    hanzi: "早",
  },
  {
    hanzi: "白",
  },
  {
    hanzi: "活",
  },
  {
    hanzi: "乱",
  },
  {
    hanzi: "胖",
  },
  {
    hanzi: "明白",
  },
  {
    hanzi: "卡",
  },
  {
    hanzi: "呆",
  },
  {
    hanzi: "香",
  },
  {
    hanzi: "丢人",
  },
  {
    hanzi: "母",
  },
  {
    hanzi: "小",
  },
  {
    hanzi: "小心",
  },
  {
    hanzi: "大",
  },
  {
    hanzi: "快",
  },
  {
    hanzi: "一样",
  },
  {
    hanzi: "美",
  },
  {
    hanzi: "自动",
  },
  {
    hanzi: "国内",
  },
  {
    hanzi: "行",
  },
  {
    hanzi: "不行",
  },
  {
    hanzi: "开心",
  },
  {
    hanzi: "好",
  },
  {
    hanzi: "好吃",
  },
  {
    hanzi: "好看",
  },
  {
    hanzi: "最好",
  },
  {
    hanzi: "慢",
  },
  {
    hanzi: "有用",
  },
  {
    hanzi: "友好",
  },
  {
    hanzi: "长",
  },
  {
    hanzi: "远",
  },
  {
    hanzi: "好玩",
  },
  {
    hanzi: "完",
  },
  {
    hanzi: "完美",
  },
  {
    hanzi: "安全",
  },
  {
    hanzi: "多",
  },
  {
    hanzi: "很多",
  },
  {
    hanzi: "好多",
  },
  {
    hanzi: "够",
  },
  {
    hanzi: "另外",
  },
  {
    hanzi: "国外",
  },
  {
    hanzi: "有名",
  },
  {
    hanzi: "少",
  },
  {
    hanzi: "不少",
  },
  {
    hanzi: "贵",
  },
  {
    hanzi: "认真",
  },
  {
    hanzi: "讨厌",
  },
  {
    hanzi: "好听",
  },
  {
    hanzi: "听话",
  },
  {
    hanzi: "近",
  },
  {
    hanzi: "厚",
  },
  {
    hanzi: "相反",
  },
  {
    hanzi: "饿",
  },
  {
    hanzi: "差",
  },
  {
    hanzi: "差不多",
  },
  {
    hanzi: "差点儿",
  },
  {
    hanzi: "红",
  },
  {
    hanzi: "合法",
  },
  {
    hanzi: "有空",
  },
  {
    hanzi: "空",
  },
  {
    hanzi: "深",
  },
  {
    hanzi: "正式",
  },
  {
    hanzi: "过分",
  },
  {
    hanzi: "别的",
  },
  {
    hanzi: "单身",
  },
  {
    hanzi: "简单",
  },
  {
    hanzi: "累",
  },
  {
    hanzi: "宽",
  },
  {
    hanzi: "可爱",
  },
  {
    hanzi: "错",
  },
  {
    hanzi: "不错",
  },
  {
    hanzi: "苦",
  },
  {
    hanzi: "老",
  },
  {
    hanzi: "冰",
  },
  {
    hanzi: "火",
  },
  {
    hanzi: "烦",
  },
  {
    hanzi: "重",
  },
  {
    hanzi: "重要",
  },
  {
    hanzi: "黑",
  },
  {
    hanzi: "窄",
  },
  {
    hanzi: "生",
  },
  {
    hanzi: "晚",
  },
  {
    hanzi: "像",
  },
  {
    hanzi: "不像话",
  },
  {
    hanzi: "老实",
  },
  {
    hanzi: "特别",
  },
  {
    hanzi: "随便",
  },
  {
    hanzi: "硬",
  },
  {
    hanzi: "轻",
  },
  {
    hanzi: "年轻",
  },
  {
    hanzi: "高",
  },
  {
    hanzi: "高兴",
  },
  {
    hanzi: "热",
  },
  {
    hanzi: "热情",
  },
  {
    hanzi: "咸",
  },
  {
    hanzi: "有钱",
  },
  {
    hanzi: "浅",
  },
  {
    hanzi: "帅",
  },
  {
    hanzi: "正常",
  },
  {
    hanzi: "非法",
  },
  {
    hanzi: "各种各样",
  },
  {
    hanzi: "冷",
  },
  {
    hanzi: "短",
  },
  {
    hanzi: "矮",
  },
  {
    hanzi: "强",
  },
  {
    hanzi: "弱",
  },
  {
    hanzi: "难",
  },
  {
    hanzi: "难受",
  },
  {
    hanzi: "难过",
  },
  {
    hanzi: "难吃",
  },
  {
    hanzi: "难听",
  },
  {
    hanzi: "搞笑",
  },
  {
    hanzi: "有意思",
  },
  {
    hanzi: "没意思",
  },
  {
    hanzi: "不好意思",
  },
  {
    hanzi: "意外",
  },
  {
    hanzi: "亲",
  },
  {
    hanzi: "新",
  },
  {
    hanzi: "最新",
  },
  {
    hanzi: "快乐",
  },
  {
    hanzi: "软",
  },
  {
    hanzi: "忙",
  },
  {
    hanzi: "方便",
  },
  {
    hanzi: "便宜",
  },
  {
    hanzi: "疼",
  },
  {
    hanzi: "低",
  },
  {
    hanzi: "鲜",
  },
  {
    hanzi: "正好",
  },
  {
    hanzi: "原",
  },
  {
    hanzi: "原有",
  },
  {
    hanzi: "不同",
  },
  {
    hanzi: "自信",
  },
  {
    hanzi: "自然",
  },
  {
    hanzi: "能干",
  },
  {
    hanzi: "充分",
  },
  {
    hanzi: "流行",
  },
  {
    hanzi: "系统",
  },
  {
    hanzi: "齐",
  },
  {
    hanzi: "齐全",
  },
  {
    hanzi: "进行",
  },
  {
    hanzi: "公共",
  },
  {
    hanzi: "共同",
  },
  {
    hanzi: "清",
  },
  {
    hanzi: "相同",
  },
  {
    hanzi: "相当",
  },
  {
    hanzi: "相关",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "满",
  },
  {
    hanzi: "满意",
  },
  {
    hanzi: "不满",
  },
  {
    hanzi: "十分",
  },
  {
    hanzi: "配",
  },
  {
    hanzi: "清醒",
  },
  {
    hanzi: "酷",
  },
  {
    hanzi: "酸",
  },
  {
    hanzi: "心酸",
  },
  {
    hanzi: "片面",
  },
  {
    hanzi: "乏力",
  },
  {
    hanzi: "得意",
  },
  {
    hanzi: "良好",
  },
  {
    hanzi: "不良",
  },
  {
    hanzi: "良",
  },
  {
    hanzi: "及时",
  },
  {
    hanzi: "准时",
  },
  {
    hanzi: "沉",
  },
  {
    hanzi: "沉重",
  },
  {
    hanzi: "现实",
  },
  {
    hanzi: "实在",
  },
  {
    hanzi: "实用",
  },
  {
    hanzi: "应用",
  },
  {
    hanzi: "巨大",
  },
  {
    hanzi: "真实",
  },
  {
    hanzi: "真正",
  },
  {
    hanzi: "天真",
  },
  {
    hanzi: "天上",
  },
  {
    hanzi: "淡",
  },
  {
    hanzi: "清淡",
  },
  {
    hanzi: "润",
  },
  {
    hanzi: "平",
  },
  {
    hanzi: "和平",
  },
  {
    hanzi: "平安",
  },
  {
    hanzi: "公平",
  },
  {
    hanzi: "平等",
  },
  {
    hanzi: "平常",
  },
  {
    hanzi: "幸运",
  },
  {
    hanzi: "不幸",
  },
  {
    hanzi: "有趣",
  },
  {
    hanzi: "活泼",
  },
  {
    hanzi: "全年",
  },
  {
    hanzi: "投入",
  },
  {
    hanzi: "全国",
  },
  {
    hanzi: "全体",
  },
  {
    hanzi: "全球",
  },
  {
    hanzi: "鼓",
  },
  {
    hanzi: "扁",
  },
  {
    hanzi: "扁平",
  },
  {
    hanzi: "偏",
  },
  {
    hanzi: "长期",
  },
  {
    hanzi: "短期",
  },
  {
    hanzi: "近期",
  },
  {
    hanzi: "过期",
  },
  {
    hanzi: "日常",
  },
  {
    hanzi: "常见",
  },
  {
    hanzi: "常用",
  },
  {
    hanzi: "照常",
  },
  {
    hanzi: "生动",
  },
  {
    hanzi: "抢手",
  },
  {
    hanzi: "混乱",
  },
  {
    hanzi: "动力",
  },
  {
    hanzi: "动人",
  },
  {
    hanzi: "主动",
  },
  {
    hanzi: "合格",
  },
  {
    hanzi: "标准",
  },
  {
    hanzi: "直接",
  },
  {
    hanzi: "实际",
  },
  {
    hanzi: "麻烦",
  },
  {
    hanzi: "清楚",
  },
  {
    hanzi: "美味",
  },
  {
    hanzi: "根本",
  },
  {
    hanzi: "极大",
  },
  {
    hanzi: "整",
  },
  {
    hanzi: "完整",
  },
  {
    hanzi: "整齐",
  },
  {
    hanzi: "辛苦",
  },
  {
    hanzi: "辛酸",
  },
  {
    hanzi: "辣",
  },
  {
    hanzi: "麻辣",
  },
  {
    hanzi: "毒辣",
  },
  {
    hanzi: "辛辣",
  },
  {
    hanzi: "深刻",
  },
  {
    hanzi: "松",
  },
  {
    hanzi: "轻松",
  },
  {
    hanzi: "高档",
  },
  {
    hanzi: "光",
  },
  {
    hanzi: "光明",
  },
  {
    hanzi: "美好",
  },
  {
    hanzi: "值",
  },
  {
    hanzi: "值得",
  },
  {
    hanzi: "价值",
  },
  {
    hanzi: "公开",
  },
  {
    hanzi: "专用",
  },
  {
    hanzi: "传统",
  },
  {
    hanzi: "开放",
  },
  {
    hanzi: "伤心",
  },
  {
    hanzi: "假",
  },
  {
    hanzi: "倒",
  },
  {
    hanzi: "一致",
  },
  {
    hanzi: "相似",
  },
  {
    hanzi: "静",
  },
  {
    hanzi: "平静",
  },
  {
    hanzi: "安静",
  },
  {
    hanzi: "冷静",
  },
  {
    hanzi: "干净",
  },
  {
    hanzi: "千篇一律",
  },
  {
    hanzi: "健康",
  },
  {
    hanzi: "健全",
  },
  {
    hanzi: "时尚",
  },
  {
    hanzi: "文明",
  },
  {
    hanzi: "突然",
  },
  {
    hanzi: "突出",
  },
  {
    hanzi: "小声",
  },
  {
    hanzi: "大声",
  },
  {
    hanzi: "巧",
  },
  {
    hanzi: "轻巧",
  },
  {
    hanzi: "自由",
  },
  {
    hanzi: "黄",
  },
  {
    hanzi: "善",
  },
  {
    hanzi: "善良",
  },
  {
    hanzi: "确定",
  },
  {
    hanzi: "明确",
  },
  {
    hanzi: "正确",
  },
  {
    hanzi: "准确",
  },
  {
    hanzi: "可靠",
  },
  {
    hanzi: "渴",
  },
  {
    hanzi: "口渴",
  },
  {
    hanzi: "具体",
  },
  {
    hanzi: "高级",
  },
  {
    hanzi: "细",
  },
  {
    hanzi: "绝对",
  },
  {
    hanzi: "负",
  },
  {
    hanzi: "懒",
  },
  {
    hanzi: "懒洋洋",
  },
  {
    hanzi: "纯",
  },
  {
    hanzi: "单纯",
  },
  {
    hanzi: "暖",
  },
  {
    hanzi: "暖和",
  },
  {
    hanzi: "纷纷",
  },
  {
    hanzi: "相互",
  },
  {
    hanzi: "外交",
  },
  {
    hanzi: "大型",
  },
  {
    hanzi: "新型",
  },
  {
    hanzi: "晚安",
  },
  {
    hanzi: "残",
  },
  {
    hanzi: "残酷",
  },
  {
    hanzi: "强烈",
  },
  {
    hanzi: "热烈",
  },
  {
    hanzi: "幸福",
  },
  {
    hanzi: "地道",
  },
  {
    hanzi: "周到",
  },
  {
    hanzi: "丰富",
  },
  {
    hanzi: "富有",
  },
  {
    hanzi: "个别",
  },
  {
    hanzi: "个人",
  },
  {
    hanzi: "愉快",
  },
  {
    hanzi: "紧",
  },
  {
    hanzi: "紧张",
  },
  {
    hanzi: "素",
  },
  {
    hanzi: "负责",
  },
  {
    hanzi: "少数",
  },
  {
    hanzi: "多数",
  },
  {
    hanzi: "多云",
  },
  {
    hanzi: "大多数",
  },
  {
    hanzi: "发达",
  },
  {
    hanzi: "适合",
  },
  {
    hanzi: "适当",
  },
  {
    hanzi: "合适",
  },
  {
    hanzi: "适用",
  },
  {
    hanzi: "偶然",
  },
  {
    hanzi: "透",
  },
  {
    hanzi: "透明",
  },
  {
    hanzi: "上述",
  },
  {
    hanzi: "小气",
  },
  {
    hanzi: "刺激",
  },
  {
    hanzi: "激烈",
  },
  {
    hanzi: "激动",
  },
  {
    hanzi: "野",
  },
  {
    hanzi: "野生",
  },
  {
    hanzi: "舒服",
  },
  {
    hanzi: "舒适",
  },
  {
    hanzi: "不舒服",
  },
  {
    hanzi: "无数",
  },
  {
    hanzi: "无人",
  },
  {
    hanzi: "无线",
  },
  {
    hanzi: "无赖",
  },
  {
    hanzi: "大概",
  },
  {
    hanzi: "肤浅",
  },
  {
    hanzi: "久",
  },
  {
    hanzi: "不久",
  },
  {
    hanzi: "很久",
  },
  {
    hanzi: "好久",
  },
  {
    hanzi: "有利",
  },
  {
    hanzi: "流利",
  },
  {
    hanzi: "暴利",
  },
  {
    hanzi: "吉利",
  },
  {
    hanzi: "科学",
  },
  {
    hanzi: "积极",
  },
  {
    hanzi: "私人",
  },
  {
    hanzi: "自私",
  },
  {
    hanzi: "优秀",
  },
  {
    hanzi: "必要",
  },
  {
    hanzi: "密切",
  },
  {
    hanzi: "紧密",
  },
  {
    hanzi: "亲密",
  },
  {
    hanzi: "粗",
  },
  {
    hanzi: "粗心",
  },
  {
    hanzi: "自觉",
  },
  {
    hanzi: "有限",
  },
  {
    hanzi: "无限",
  },
  {
    hanzi: "亲切",
  },
  {
    hanzi: "亲爱",
  },
  {
    hanzi: "合理",
  },
  {
    hanzi: "理想",
  },
  {
    hanzi: "大量",
  },
  {
    hanzi: "失望",
  },
  {
    hanzi: "环保",
  },
  {
    hanzi: "自卑",
  },
  {
    hanzi: "基本",
  },
  {
    hanzi: "礼貌",
  },
  {
    hanzi: "均",
  },
  {
    hanzi: "平均",
  },
  {
    hanzi: "坚决",
  },
  {
    hanzi: "坚强",
  },
  {
    hanzi: "坚定",
  },
  {
    hanzi: "坚挺",
  },
  {
    hanzi: "热心",
  },
  {
    hanzi: "堵",
  },
  {
    hanzi: "垃圾",
  },
  {
    hanzi: "丑",
  },
  {
    hanzi: "害羞",
  },
  {
    hanzi: "肥",
  },
  {
    hanzi: "肥胖",
  },
  {
    hanzi: "当地",
  },
  {
    hanzi: "肯定",
  },
  {
    hanzi: "阴",
  },
  {
    hanzi: "红肿",
  },
  {
    hanzi: "潮",
  },
  {
    hanzi: "决心",
  },
  {
    hanzi: "滑",
  },
  {
    hanzi: "哪怕",
  },
  {
    hanzi: "可怕",
  },
  {
    hanzi: "凶",
  },
  {
    hanzi: "经典",
  },
  {
    hanzi: "典型",
  },
  {
    hanzi: "古典",
  },
  {
    hanzi: "不得了",
  },
  {
    hanzi: "烦恼",
  },
  {
    hanzi: "苦恼",
  },
  {
    hanzi: "恼火",
  },
  {
    hanzi: "努力",
  },
  {
    hanzi: "强劲",
  },
  {
    hanzi: "穷",
  },
  {
    hanzi: "无穷",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "通常",
  },
  {
    hanzi: "次要",
  },
  {
    hanzi: "奶茶",
  },
  {
    hanzi: "痛",
  },
  {
    hanzi: "痛苦",
  },
  {
    hanzi: "疼痛",
  },
  {
    hanzi: "瘦",
  },
  {
    hanzi: "疯",
  },
  {
    hanzi: "专业",
  },
  {
    hanzi: "业余",
  },
  {
    hanzi: "显",
  },
  {
    hanzi: "明显",
  },
  {
    hanzi: "显然",
  },
  {
    hanzi: "显著",
  },
  {
    hanzi: "普通",
  },
  {
    hanzi: "普遍",
  },
  {
    hanzi: "严",
  },
  {
    hanzi: "严重",
  },
  {
    hanzi: "严格",
  },
  {
    hanzi: "恶",
  },
  {
    hanzi: "恶心",
  },
  {
    hanzi: "卫生",
  },
  {
    hanzi: "美丽",
  },
  {
    hanzi: "主导",
  },
  {
    hanzi: "民主",
  },
  {
    hanzi: "异常",
  },
  {
    hanzi: "耐心",
  },
  {
    hanzi: "不耐烦",
  },
  {
    hanzi: "能耐",
  },
  {
    hanzi: "耐人寻味",
  },
  {
    hanzi: "节约",
  },
  {
    hanzi: "规范",
  },
  {
    hanzi: "文艺",
  },
  {
    hanzi: "著名",
  },
  {
    hanzi: "显著",
  },
  {
    hanzi: "了不起",
  },
  {
    hanzi: "营养",
  },
  {
    hanzi: "民营",
  },
  {
    hanzi: "吃苦耐劳",
  },
  {
    hanzi: "荣幸",
  },
  {
    hanzi: "轻视",
  },
  {
    hanzi: "真诚",
  },
  {
    hanzi: "诚实",
  },
  {
    hanzi: "不安",
  },
  {
    hanzi: "不如",
  },
  {
    hanzi: "详细",
  },
  {
    hanzi: "凉",
  },
  {
    hanzi: "清凉",
  },
  {
    hanzi: "冰凉",
  },
  {
    hanzi: "凉快",
  },
  {
    hanzi: "破",
  },
  {
    hanzi: "不足",
  },
  {
    hanzi: "有的是",
  },
  {
    hanzi: "庄严",
  },
  {
    hanzi: "庄重",
  },
  {
    hanzi: "脏",
  },
  {
    hanzi: "脏乱",
  },
  {
    hanzi: "自主",
  },
  {
    hanzi: "精彩",
  },
  {
    hanzi: "彩色",
  },
  {
    hanzi: "五颜六色",
  },
  {
    hanzi: "顺",
  },
  {
    hanzi: "顺利",
  },
  {
    hanzi: "丰硕",
  },
  {
    hanzi: "随手",
  },
  {
    hanzi: "人工",
  },
  {
    hanzi: "蛮",
  },
  {
    hanzi: "强大",
  },
  {
    hanzi: "道德",
  },
  {
    hanzi: "急",
  },
  {
    hanzi: "紧急",
  },
  {
    hanzi: "着急",
  },
  {
    hanzi: "焦急",
  },
  {
    hanzi: "稳定",
  },
  {
    hanzi: "焦虑",
  },
  {
    hanzi: "虚假",
  },
  {
    hanzi: "虚荣",
  },
  {
    hanzi: "虚伪",
  },
  {
    hanzi: "马马虎虎",
  },
  {
    hanzi: "生龙活虎",
  },
  {
    hanzi: "残忍",
  },
  {
    hanzi: "众多",
  },
  {
    hanzi: "容易",
  },
  {
    hanzi: "随心所欲",
  },
  {
    hanzi: "复杂",
  },
  {
    hanzi: "神",
  },
  {
    hanzi: "精神",
  },
  {
    hanzi: "神秘",
  },
  {
    hanzi: "神奇",
  },
  {
    hanzi: "理智",
  },
  {
    hanzi: "出色",
  },
  {
    hanzi: "进口",
  },
  {
    hanzi: "暗",
  },
  {
    hanzi: "黑暗",
  },
  {
    hanzi: "先进",
  },
  {
    hanzi: "怪",
  },
  {
    hanzi: "奇怪",
  },
  {
    hanzi: "理性",
  },
  {
    hanzi: "性感",
  },
  {
    hanzi: "急性",
  },
  {
    hanzi: "吃惊",
  },
  {
    hanzi: "震惊",
  },
  {
    hanzi: "可惜",
  },
  {
    hanzi: "可怜",
  },
  {
    hanzi: "薄",
  },
  {
    hanzi: "优质",
  },
  {
    hanzi: "厉害",
  },
  {
    hanzi: "严厉",
  },
  {
    hanzi: "有效",
  },
  {
    hanzi: "勇敢",
  },
  {
    hanzi: "聪明",
  },
  {
    hanzi: "尊敬",
  },
  {
    hanzi: "高傲",
  },
  {
    hanzi: "傲慢",
  },
  {
    hanzi: "宝贵",
  },
  {
    hanzi: "附属",
  },
  {
    hanzi: "本届",
  },
  {
    hanzi: "届时",
  },
  {
    hanzi: "尽",
  },
  {
    hanzi: "客观",
  },
  {
    hanzi: "乐观",
  },
  {
    hanzi: "悲观",
  },
  {
    hanzi: "双",
  },
  {
    hanzi: "难免",
  },
  {
    hanzi: "温暖",
  },
  {
    hanzi: "临时",
  },
  {
    hanzi: "蓝",
  },
  {
    hanzi: "盛",
  },
  {
    hanzi: "正宗",
  },
  {
    hanzi: "寒冷",
  },
  {
    hanzi: "棒",
  },
  {
    hanzi: "端",
  },
  {
    hanzi: "端庄",
  },
  {
    hanzi: "无聊",
  },
  {
    hanzi: "体贴",
  },
  {
    hanzi: "贫穷",
  },
  {
    hanzi: "类似",
  },
  {
    hanzi: "各类",
  },
  {
    hanzi: "好客",
  },
  {
    hanzi: "兴奋",
  },
  {
    hanzi: "亮",
  },
  {
    hanzi: "漂亮",
  },
  {
    hanzi: "熟",
  },
  {
    hanzi: "成熟",
  },
  {
    hanzi: "熟悉",
  },
  {
    hanzi: "熟练",
  },
  {
    hanzi: "幽默",
  },
  {
    hanzi: "独立",
  },
  {
    hanzi: "独特",
  },
  {
    hanzi: "孤独",
  },
  {
    hanzi: "疯狂",
  },
  {
    hanzi: "保险",
  },
  {
    hanzi: "危险",
  },
  {
    hanzi: "重大",
  },
  {
    hanzi: "大方",
  },
  {
    hanzi: "广大",
  },
  {
    hanzi: "果断",
  },
  {
    hanzi: "短暂",
  },
  {
    hanzi: "一般",
  },
  {
    hanzi: "最佳",
  },
  {
    hanzi: "符合",
  },
  {
    hanzi: "笨",
  },
  {
    hanzi: "笨重",
  },
  {
    hanzi: "恐怖",
  },
  {
    hanzi: "困",
  },
  {
    hanzi: "困难",
  },
  {
    hanzi: "固定",
  },
  {
    hanzi: "巩固",
  },
  {
    hanzi: "圆",
  },
  {
    hanzi: "闹",
  },
  {
    hanzi: "热闹",
  },
  {
    hanzi: "绿",
  },
  {
    hanzi: "谦虚",
  },
  {
    hanzi: "初步",
  },
  {
    hanzi: "初级",
  },
  {
    hanzi: "彻底",
  },
  {
    hanzi: "无畏",
  },
  {
    hanzi: "镇定",
  },
  {
    hanzi: "关键",
  },
  {
    hanzi: "骄傲",
  },
  {
    hanzi: "灵",
  },
  {
    hanzi: "炎热",
  },
  {
    hanzi: "绕",
  },
  {
    hanzi: "内部",
  },
  {
    hanzi: "外部",
  },
  {
    hanzi: "矮小",
  },
  {
    hanzi: "单调",
  },
  {
    hanzi: "调皮",
  },
  {
    hanzi: "协调",
  },
  {
    hanzi: "建设",
  },
  {
    hanzi: "出入",
  },
  {
    hanzi: "许多",
  },
  {
    hanzi: "一同",
  },
  {
    hanzi: "同一",
  },
  {
    hanzi: "一流",
  },
  {
    hanzi: "一身",
  },
  {
    hanzi: "一次性",
  },
  {
    hanzi: "伟大",
  },
  {
    hanzi: "单一",
  },
  {
    hanzi: "侧",
  },
  {
    hanzi: "打动",
  },
  {
    hanzi: "高速",
  },
  {
    hanzi: "快速",
  },
  {
    hanzi: "迅速",
  },
  {
    hanzi: "迫切",
  },
  {
    hanzi: "抗菌",
  },
  {
    hanzi: "水产",
  },
  {
    hanzi: "团结",
  },
  {
    hanzi: "封闭",
  },
  {
    hanzi: "闪",
  },
  {
    hanzi: "电动",
  },
  {
    hanzi: "新鲜",
  },
  {
    hanzi: "如下",
  },
  {
    hanzi: "永久",
  },
];
// Adjectives End

// Adverbs 副词 (268)
export const allAdverbs = [
  {
    hanzi: "只",
  },
  {
    hanzi: "才",
  },
  {
    hanzi: "马上",
  },
  {
    hanzi: "早点",
  },
  {
    hanzi: "总是",
  },
  {
    hanzi: "在",
  },
  {
    hanzi: "正在",
  },
  {
    hanzi: "一起",
  },
  {
    hanzi: "不用",
  },
  {
    hanzi: "还",
  },
  {
    hanzi: "也",
  },
  {
    hanzi: "太",
  },
  {
    hanzi: "再",
  },
  {
    hanzi: "总算",
  },
  {
    hanzi: "只好",
  },
  {
    hanzi: "还好",
  },
  {
    hanzi: "好好",
  },
  {
    hanzi: "主要",
  },
  {
    hanzi: "又",
  },
  {
    hanzi: "最",
  },
  {
    hanzi: "慢慢",
  },
  {
    hanzi: "只有",
  },
  {
    hanzi: "有点儿",
  },
  {
    hanzi: "随时",
  },
  {
    hanzi: "这么",
  },
  {
    hanzi: "那么",
  },
  {
    hanzi: "很",
  },
  {
    hanzi: "完全",
  },
  {
    hanzi: "多么",
  },
  {
    hanzi: "另外",
  },
  {
    hanzi: "一直",
  },
  {
    hanzi: "真",
  },
  {
    hanzi: "然后",
  },
  {
    hanzi: "最后",
  },
  {
    hanzi: "反正",
  },
  {
    hanzi: "相反",
  },
  {
    hanzi: "差不多",
  },
  {
    hanzi: "差点儿",
  },
  {
    hanzi: "别",
  },
  {
    hanzi: "刚",
  },
  {
    hanzi: "刚刚",
  },
  {
    hanzi: "至少",
  },
  {
    hanzi: "一共",
  },
  {
    hanzi: "改天",
  },
  {
    hanzi: "好像",
  },
  {
    hanzi: "其实",
  },
  {
    hanzi: "特别",
  },
  {
    hanzi: "先",
  },
  {
    hanzi: "当然",
  },
  {
    hanzi: "更",
  },
  {
    hanzi: "随便",
  },
  {
    hanzi: "比较",
  },
  {
    hanzi: "已经",
  },
  {
    hanzi: "就",
  },
  {
    hanzi: "越",
  },
  {
    hanzi: "越来越",
  },
  {
    hanzi: "常常",
  },
  {
    hanzi: "经常",
  },
  {
    hanzi: "非常",
  },
  {
    hanzi: "所有",
  },
  {
    hanzi: "正好",
  },
  {
    hanzi: "不得不",
  },
  {
    hanzi: "原来",
  },
  {
    hanzi: "原本",
  },
  {
    hanzi: "同时",
  },
  {
    hanzi: "不太",
  },
  {
    hanzi: "重新",
  },
  {
    hanzi: "足够",
  },
  {
    hanzi: "不够",
  },
  {
    hanzi: "只能",
  },
  {
    hanzi: "只要",
  },
  {
    hanzi: "充分",
  },
  {
    hanzi: "共同",
  },
  {
    hanzi: "相当",
  },
  {
    hanzi: "相对",
  },
  {
    hanzi: "十分",
  },
  {
    hanzi: "千万",
  },
  {
    hanzi: "首先",
  },
  {
    hanzi: "胡乱",
  },
  {
    hanzi: "提前",
  },
  {
    hanzi: "永不",
  },
  {
    hanzi: "永远",
  },
  {
    hanzi: "不乏",
  },
  {
    hanzi: "全面",
  },
  {
    hanzi: "大约",
  },
  {
    hanzi: "及时",
  },
  {
    hanzi: "实在",
  },
  {
    hanzi: "应当",
  },
  {
    hanzi: "真正",
  },
  {
    hanzi: "淡淡",
  },
  {
    hanzi: "渐渐",
  },
  {
    hanzi: "平常",
  },
  {
    hanzi: "幸好",
  },
  {
    hanzi: "事实上",
  },
  {
    hanzi: "本来",
  },
  {
    hanzi: "勿",
  },
  {
    hanzi: "轻易",
  },
  {
    hanzi: "微微",
  },
  {
    hanzi: "偏",
  },
  {
    hanzi: "偏偏",
  },
  {
    hanzi: "遍",
  },
  {
    hanzi: "遍地",
  },
  {
    hanzi: "定期",
  },
  {
    hanzi: "按",
  },
  {
    hanzi: "按照",
  },
  {
    hanzi: "按时",
  },
  {
    hanzi: "往往",
  },
  {
    hanzi: "难道",
  },
  {
    hanzi: "老是",
  },
  {
    hanzi: "挺",
  },
  {
    hanzi: "简直",
  },
  {
    hanzi: "不禁",
  },
  {
    hanzi: "未",
  },
  {
    hanzi: "从未",
  },
  {
    hanzi: "根本",
  },
  {
    hanzi: "极",
  },
  {
    hanzi: "极为",
  },
  {
    hanzi: "接着",
  },
  {
    hanzi: "整整",
  },
  {
    hanzi: "立刻",
  },
  {
    hanzi: "光",
  },
  {
    hanzi: "不光",
  },
  {
    hanzi: "专门",
  },
  {
    hanzi: "仅",
  },
  {
    hanzi: "不仅",
  },
  {
    hanzi: "仅仅",
  },
  {
    hanzi: "依然",
  },
  {
    hanzi: "依法",
  },
  {
    hanzi: "依旧",
  },
  {
    hanzi: "倒是",
  },
  {
    hanzi: "一致",
  },
  {
    hanzi: "仍",
  },
  {
    hanzi: "仍然",
  },
  {
    hanzi: "仍在",
  },
  {
    hanzi: "倍",
  },
  {
    hanzi: "加倍",
  },
  {
    hanzi: "一律",
  },
  {
    hanzi: "尚未",
  },
  {
    hanzi: "突然",
  },
  {
    hanzi: "曾",
  },
  {
    hanzi: "曾经",
  },
  {
    hanzi: "幸亏",
  },
  {
    hanzi: "多亏",
  },
  {
    hanzi: "由此",
  },
  {
    hanzi: "不由",
  },
  {
    hanzi: "不由得",
  },
  {
    hanzi: "是否",
  },
  {
    hanzi: "能否",
  },
  {
    hanzi: "过于",
  },
  {
    hanzi: "几乎",
  },
  {
    hanzi: "似乎",
  },
  {
    hanzi: "的确",
  },
  {
    hanzi: "超级",
  },
  {
    hanzi: "连续",
  },
  {
    hanzi: "终于",
  },
  {
    hanzi: "始终",
  },
  {
    hanzi: "绝对",
  },
  {
    hanzi: "绝不",
  },
  {
    hanzi: "顿时",
  },
  {
    hanzi: "纷纷",
  },
  {
    hanzi: "相互",
  },
  {
    hanzi: "偷偷",
  },
  {
    hanzi: "赶紧",
  },
  {
    hanzi: "紧紧",
  },
  {
    hanzi: "素",
  },
  {
    hanzi: "早已",
  },
  {
    hanzi: "早就",
  },
  {
    hanzi: "偶尔",
  },
  {
    hanzi: "偶然",
  },
  {
    hanzi: "即",
  },
  {
    hanzi: "立即",
  },
  {
    hanzi: "随即",
  },
  {
    hanzi: "却",
  },
  {
    hanzi: "逐步",
  },
  {
    hanzi: "逐渐",
  },
  {
    hanzi: "无",
  },
  {
    hanzi: "无比",
  },
  {
    hanzi: "大概",
  },
  {
    hanzi: "以来",
  },
  {
    hanzi: "必",
  },
  {
    hanzi: "必然",
  },
  {
    hanzi: "不必",
  },
  {
    hanzi: "密切",
  },
  {
    hanzi: "稍微",
  },
  {
    hanzi: "各自",
  },
  {
    hanzi: "亲自",
  },
  {
    hanzi: "有限",
  },
  {
    hanzi: "到处",
  },
  {
    hanzi: "陆续",
  },
  {
    hanzi: "基本",
  },
  {
    hanzi: "竟",
  },
  {
    hanzi: "竟然",
  },
  {
    hanzi: "毕竟",
  },
  {
    hanzi: "均",
  },
  {
    hanzi: "肯定",
  },
  {
    hanzi: "背后",
  },
  {
    hanzi: "不见得",
  },
  {
    hanzi: "不得了",
  },
  {
    hanzi: "不然",
  },
  {
    hanzi: "要不",
  },
  {
    hanzi: "要不然",
  },
  {
    hanzi: "通常",
  },
  {
    hanzi: "果然",
  },
  {
    hanzi: "异常",
  },
  {
    hanzi: "将",
  },
  {
    hanzi: "即将",
  },
  {
    hanzi: "将近",
  },
  {
    hanzi: "说不定",
  },
  {
    hanzi: "看起来",
  },
  {
    hanzi: "看上去",
  },
  {
    hanzi: "一度",
  },
  {
    hanzi: "再度",
  },
  {
    hanzi: "过度",
  },
  {
    hanzi: "到底",
  },
  {
    hanzi: "至今",
  },
  {
    hanzi: "总共",
  },
  {
    hanzi: "共有",
  },
  {
    hanzi: "必须",
  },
  {
    hanzi: "无须",
  },
  {
    hanzi: "顺便",
  },
  {
    hanzi: "蛮",
  },
  {
    hanzi: "野蛮",
  },
  {
    hanzi: "更加",
  },
  {
    hanzi: "急忙",
  },
  {
    hanzi: "正是",
  },
  {
    hanzi: "难怪",
  },
  {
    hanzi: "可惜",
  },
  {
    hanzi: "一贯",
  },
  {
    hanzi: "从小",
  },
  {
    hanzi: "反而",
  },
  {
    hanzi: "从此",
  },
  {
    hanzi: "事先",
  },
  {
    hanzi: "居然",
  },
  {
    hanzi: "尽管",
  },
  {
    hanzi: "尽快",
  },
  {
    hanzi: "尽量",
  },
  {
    hanzi: "迟早",
  },
  {
    hanzi: "难免",
  },
  {
    hanzi: "日益",
  },
  {
    hanzi: "临时",
  },
  {
    hanzi: "盛",
  },
  {
    hanzi: "悉心",
  },
  {
    hanzi: "连忙",
  },
  {
    hanzi: "万一",
  },
  {
    hanzi: "一再",
  },
  {
    hanzi: "再三",
  },
  {
    hanzi: "大大",
  },
  {
    hanzi: "默默",
  },
  {
    hanzi: "独立",
  },
  {
    hanzi: "单独",
  },
  {
    hanzi: "独自",
  },
  {
    hanzi: "甚至",
  },
  {
    hanzi: "不断",
  },
  {
    hanzi: "暂",
  },
  {
    hanzi: "一般",
  },
  {
    hanzi: "恐怕",
  },
  {
    hanzi: "不妨",
  },
  {
    hanzi: "彻底",
  },
  {
    hanzi: "也许",
  },
  {
    hanzi: "或许",
  },
  {
    hanzi: "一同",
  },
  {
    hanzi: "一下子",
  },
  {
    hanzi: "一向",
  },
  {
    hanzi: "一口气",
  },
  {
    hanzi: "一道",
  },
  {
    hanzi: "一齐",
  },
  {
    hanzi: "一时",
  },
  {
    hanzi: "宁愿",
  },
];
// Adverbs End

// Pronouns 代词 (56)
export const allPronouns = [
  {
    hanzi: "我",
  },
  {
    hanzi: "自己",
  },
  {
    hanzi: "什么",
  },
  {
    hanzi: "什么的",
  },
  {
    hanzi: "他",
  },
  {
    hanzi: "您",
  },
  {
    hanzi: "为什么",
  },
  {
    hanzi: "她",
  },
  {
    hanzi: "有的",
  },
  {
    hanzi: "这儿",
  },
  {
    hanzi: "这样",
  },
  {
    hanzi: "这边",
  },
  {
    hanzi: "那天",
  },
  {
    hanzi: "那边",
  },
  {
    hanzi: "那儿",
  },
  {
    hanzi: "那个",
  },
  {
    hanzi: "哪个",
  },
  {
    hanzi: "它",
  },
  {
    hanzi: "它们",
  },
  {
    hanzi: "这些",
  },
  {
    hanzi: "那些",
  },
  {
    hanzi: "多少",
  },
  {
    hanzi: "某个",
  },
  {
    hanzi: "某些",
  },
  {
    hanzi: "其他",
  },
  {
    hanzi: "一切",
  },
  {
    hanzi: "哪里",
  },
  {
    hanzi: "这里",
  },
  {
    hanzi: "那里",
  },
  {
    hanzi: "怎么",
  },
  {
    hanzi: "怎么样",
  },
  {
    hanzi: "大家",
  },
  {
    hanzi: "谁",
  },
  {
    hanzi: "这次",
  },
  {
    hanzi: "那次",
  },
  {
    hanzi: "每次",
  },
  {
    hanzi: "那会儿",
  },
  {
    hanzi: "那时候",
  },
  {
    hanzi: "这时候",
  },
  {
    hanzi: "那样",
  },
  {
    hanzi: "怎样",
  },
  {
    hanzi: "同样",
  },
  {
    hanzi: "其余",
  },
  {
    hanzi: "何",
  },
  {
    hanzi: "如何",
  },
  {
    hanzi: "任何",
  },
  {
    hanzi: "为何",
  },
  {
    hanzi: "俩",
  },
  {
    hanzi: "我俩",
  },
  {
    hanzi: "我们俩",
  },
  {
    hanzi: "他们俩",
  },
  {
    hanzi: "咱",
  },
  {
    hanzi: "咱们",
  },
  {
    hanzi: "咱俩",
  },
  {
    hanzi: "好久",
  },
  {
    hanzi: "若干",
  },
];
// Pronouns End

// Measure 量词 (83)
export const allMeasures = [
  {
    hanzi: "年",
    pinyin: "nián",
    en: "Year",
    examples: [],
  },
  {
    hanzi: "只",
  },
  {
    hanzi: "下",
  },
  {
    hanzi: "本",
  },
  {
    hanzi: "种",
  },
  {
    hanzi: "包",
  },
  {
    hanzi: "台",
  },
  {
    hanzi: "块",
    pinyin: "kuài",
    en: "Dollar (measure word for money)",
    examples: [],
  },
  {
    hanzi: "周",
  },
  {
    hanzi: "天",
  },
  {
    hanzi: "元",
  },
  {
    hanzi: "页",
  },
  {
    hanzi: "斤",
  },
  {
    hanzi: "公斤",
  },
  {
    hanzi: "分钟",
  },
  {
    hanzi: "份儿",
  },
  {
    hanzi: "班",
  },
  {
    hanzi: "岁",
  },
  {
    hanzi: "公里",
  },
  {
    hanzi: "星期",
  },
  {
    hanzi: "头",
  },
  {
    hanzi: "件",
  },
  {
    hanzi: "辆",
  },
  {
    hanzi: "把",
  },
  {
    hanzi: "派",
  },
  {
    hanzi: "一眼",
  },
  {
    hanzi: "平方米",
  },
  {
    hanzi: "场",
  },
  {
    hanzi: "指",
  },
  {
    hanzi: "遍",
  },
  {
    hanzi: "篇",
  },
  {
    hanzi: "批",
  },
  {
    hanzi: "集",
  },
  {
    hanzi: "根",
  },
  {
    hanzi: "刻",
  },
  {
    hanzi: "朵",
  },
  {
    hanzi: "棵",
  },
  {
    hanzi: "倍",
  },
  {
    hanzi: "群",
  },
  {
    hanzi: "一群",
  },
  {
    hanzi: "趟",
  },
  {
    hanzi: "排",
  },
  {
    hanzi: "组",
  },
  {
    hanzi: "顿",
  },
  {
    hanzi: "吨",
  },
  {
    hanzi: "则",
  },
  {
    hanzi: "列",
  },
  {
    hanzi: "幅",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "季",
  },
  {
    hanzi: "秒",
  },
  {
    hanzi: "队",
  },
  {
    hanzi: "阵",
  },
  {
    hanzi: "股",
  },
  {
    hanzi: "通",
  },
  {
    hanzi: "桶",
  },
  {
    hanzi: "节",
  },
  {
    hanzi: "瓶",
  },
  {
    hanzi: "度",
  },
  {
    hanzi: "座",
  },
  {
    hanzi: "项",
  },
  {
    hanzi: "顶",
  },
  {
    hanzi: "碗",
  },
  {
    hanzi: "串",
  },
  {
    hanzi: "段",
  },
  {
    hanzi: "层",
  },
  {
    hanzi: "届",
  },
  {
    hanzi: "双",
  },
  {
    hanzi: "章",
  },
  {
    hanzi: "类",
  },
  {
    hanzi: "英寸",
  },
  {
    hanzi: "幕",
  },
  {
    hanzi: "般",
  },
  {
    hanzi: "盘",
  },
  {
    hanzi: "封",
  },
  {
    hanzi: "笔",
  },
  {
    hanzi: "卷",
  },
  {
    hanzi: "圈",
  },
  {
    hanzi: "套",
  },
  {
    hanzi: "部",
  },
  {
    hanzi: "剑",
  },
  {
    hanzi: "轮",
  },
  {
    hanzi: "团",
  },
];
// Measure End

// Numbers 数词 (20)
export const allNumbers = [
  {
    hanzi: "一",
  },
  {
    hanzi: "二",
  },
  {
    hanzi: "两",
    pinyin: "liǎng",
    explanation:
      "there is also er for ordinal numbers. when you want to use with measure words you say liang",
  },
  {
    hanzi: "三",
  },
  {
    hanzi: "十",
  },
  {
    hanzi: "半",
  },
  {
    hanzi: "一半",
  },
  {
    hanzi: "一点点",
  },
  {
    hanzi: "十几",
  },
  {
    hanzi: "几百",
  },
  {
    hanzi: "几千",
  },
  {
    hanzi: "一些",
  },
  {
    hanzi: "有些",
  },
  {
    hanzi: "五",
  },
  {
    hanzi: "九",
  },
  {
    hanzi: "第一",
  },
  {
    hanzi: "万",
  },
  {
    hanzi: "之一",
  },
  {
    hanzi: "百分之",
  },
  {
    hanzi: "零",
  },
  {
    hanzi: "零下",
  },
];
// Numbers End

// Prepositions 介词 (51)
export const allPrepositions = [
  {
    hanzi: "从",
  },
  {
    hanzi: "让",
  },
  {
    hanzi: "代",
  },
  {
    hanzi: "在",
  },
  {
    hanzi: "为",
  },
  {
    hanzi: "为了",
  },
  {
    hanzi: "往",
  },
  {
    hanzi: "对",
  },
  {
    hanzi: "被",
  },
  {
    hanzi: "比",
  },
  {
    hanzi: "比如",
  },
  {
    hanzi: "给",
  },
  {
    hanzi: "使",
  },
  {
    hanzi: "连",
  },
  {
    hanzi: "经过",
  },
  {
    hanzi: "跟",
  },
  {
    hanzi: "把",
  },
  {
    hanzi: "其中",
  },
  {
    hanzi: "当中",
  },
  {
    hanzi: "随着",
  },
  {
    hanzi: "面前",
  },
  {
    hanzi: "除了",
  },
  {
    hanzi: "距",
  },
  {
    hanzi: "直到",
  },
  {
    hanzi: "等到",
  },
  {
    hanzi: "依",
  },
  {
    hanzi: "向",
  },
  {
    hanzi: "由",
  },
  {
    hanzi: "经由",
  },
  {
    hanzi: "于",
  },
  {
    hanzi: "由于",
  },
  {
    hanzi: "对于",
  },
  {
    hanzi: "关于",
  },
  {
    hanzi: "至于",
  },
  {
    hanzi: "靠",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "自从",
  },
  {
    hanzi: "朝",
  },
  {
    hanzi: "离",
  },
  {
    hanzi: "通过",
  },
  {
    hanzi: "将",
  },
  {
    hanzi: "临",
  },
  {
    hanzi: "针对",
  },
  {
    hanzi: "隔",
  },
  {
    hanzi: "小于",
  },
  {
    hanzi: "大于",
  },
  {
    hanzi: "便于",
  },
  {
    hanzi: "不至于",
  },
  {
    hanzi: "敢于",
  },
  {
    hanzi: "当天",
  },
  {
    hanzi: "出于",
  },
];
// Prepositions End

// Conjunction 连词 (65)
export const allConjuctions = [
  {
    hanzi: "但",
  },
  {
    hanzi: "的话",
  },
  {
    hanzi: "但是",
  },
  {
    hanzi: "只是",
  },
  {
    hanzi: "或",
  },
  {
    hanzi: "和",
  },
  {
    hanzi: "不过",
  },
  {
    hanzi: "还是",
  },
  {
    hanzi: "一边",
  },
  {
    hanzi: "可是",
  },
  {
    hanzi: "因为",
  },
  {
    hanzi: "要是",
  },
  {
    hanzi: "只有",
  },
  {
    hanzi: "还有",
  },
  {
    hanzi: "另外",
  },
  {
    hanzi: "如果",
  },
  {
    hanzi: "或者",
  },
  {
    hanzi: "就算",
  },
  {
    hanzi: "跟",
  },
  {
    hanzi: "虽然",
  },
  {
    hanzi: "所以",
  },
  {
    hanzi: "而是",
  },
  {
    hanzi: "而且",
  },
  {
    hanzi: "并且",
  },
  {
    hanzi: "不但",
  },
  {
    hanzi: "然而",
  },
  {
    hanzi: "比如说",
  },
  {
    hanzi: "一方面",
  },
  {
    hanzi: "另一方面",
  },
  {
    hanzi: "其次",
  },
  {
    hanzi: "因此",
  },
  {
    hanzi: "接着",
  },
  {
    hanzi: "接下来",
  },
  {
    hanzi: "一旦",
  },
  {
    hanzi: "不仅",
  },
  {
    hanzi: "假如",
  },
  {
    hanzi: "于是",
  },
  {
    hanzi: "则",
  },
  {
    hanzi: "否则",
  },
  {
    hanzi: "管",
  },
  {
    hanzi: "不管",
  },
  {
    hanzi: "即",
  },
  {
    hanzi: "即使",
  },
  {
    hanzi: "即便",
  },
  {
    hanzi: "无",
  },
  {
    hanzi: "既",
  },
  {
    hanzi: "既然",
  },
  {
    hanzi: "以及",
  },
  {
    hanzi: "可见",
  },
  {
    hanzi: "不然",
  },
  {
    hanzi: "要不",
  },
  {
    hanzi: "要不然",
  },
  {
    hanzi: "若",
  },
  {
    hanzi: "若是",
  },
  {
    hanzi: "无论",
  },
  {
    hanzi: "不论",
  },
  {
    hanzi: "不如",
  },
  {
    hanzi: "与其",
  },
  {
    hanzi: "从而",
  },
  {
    hanzi: "反而",
  },
  {
    hanzi: "因而",
  },
  {
    hanzi: "此外",
  },
  {
    hanzi: "尽管",
  },
  {
    hanzi: "万一",
  },
  {
    hanzi: "甚至",
  },
];
// Conjunction End

// Particles 助词 (13)
export const allParticles = [
  {
    hanzi: "了",
  },
  {
    hanzi: "过",
  },
  {
    hanzi: "什么的",
  },
  {
    hanzi: "等等",
  },
  {
    hanzi: "着",
  },
  {
    hanzi: "得",
  },
  {
    hanzi: "干吗",
  },
  {
    hanzi: "之",
  },
  {
    hanzi: "据",
  },
  {
    hanzi: "据说",
  },
  {
    hanzi: "依据",
  },
  {
    hanzi: "似的",
  },
  {
    hanzi: "般",
  },
  {
    hanzi: "吗",
  },
];
// Particles End

// Mood 语气词 11
export const allMoods = [
  {
    hanzi: "吗",
  },
  {
    hanzi: "嗯",
  },
  {
    hanzi: "呢",
  },
  {
    hanzi: "吧",
  },
  {
    hanzi: "哈",
  },
  {
    hanzi: "呀",
  },
  {
    hanzi: "啦",
  },
  {
    hanzi: "哦",
  },
  {
    hanzi: "啊",
  },
  {
    hanzi: "啊啊",
  },
  {
    hanzi: "啊哈",
  },
];
// Mood End

export const allSentences = [
  {
    hanzi: "没 问题",
    pinyin: "méi wèntí",
    en: "No problem",
    lit: "without question",
  },
];
