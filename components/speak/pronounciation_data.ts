"use client";

export const course = {
  id: 1,
  title: "1. Introduction",
  unitTitle: "Introduction to Mandarin Pronunciation",
  lessons: [
    {
      title: "Pinyin Part 1: Introduction",
      sound: "/pronounciation/01.m4a",
      type: "tutorial",
      video: "/pronounciation/01.mp4",
    },
    {
      title: "Pinyin Part 2: It Wasn't Made for Us",
      sound: "/pronounciation/02.m4a",
      type: "tutorial",
      video: "/pronounciation/02.mp4",
    },
    {
      title: "Mandarin Syllables Introduction",
      sound: "/pronounciation/03.m4a",
      type: "tutorial",
      video: "/pronounciation/03.mp4",
    },
    {
      title: 'Mandarin Syllables: The "Null" Initial',
      sound: "/pronounciation/04.m4a",
      type: "tutorial",
      video: "/pronounciation/04.mp4",
    },
    {
      title: "Mandarin Initials: Categorized",
      sound: "/pronounciation/05.m4a",
      type: "tutorial",
      video: "/pronounciation/05.mp4",
    },
    {
      title: "Mandarin Finals: Categorized",
      sound: "/pronounciation/06.m4a",
      type: "tutorial",
      video: "/pronounciation/06.mp4",
    },
    {
      title: "Mandarin Tones: 1st Tone",
      sound: "/pronounciation/07.m4a",
      type: "tutorial",
      video: "/pronounciation/07.mp4",
    },
    {
      title: "Mandarin Tones: 2nd Tone",
      sound: "/pronounciation/08.m4a",
      type: "tutorial",
      video: "/pronounciation/08.mp4",
    },
    {
      title: "Mandarin Tones: 3rd Tone",
      sound: "/pronounciation/09.m4a",
      type: "tutorial",
      video: "/pronounciation/09.mp4",
    },
    {
      title: "Mandarin Tones: 4th Tone",
      sound: "/pronounciation/10.m4a",
      type: "tutorial",
      video: "/pronounciation/10.mp4",
    },
    {
      title: "Mandarin Tones: 5th Tone",
      sound: "/pronounciation/11.m4a",
      type: "tutorial",
      video: "/pronounciation/11.mp4",
    },
    {
      title: "Anny 老师 Reviews: Tones",
      sound: "/pronounciation/12.m4a",
      type: "tutorial",
      video: "/pronounciation/12.mp4",
    },
    {
      title: "Unit 1 Wrap-Up",
      sound: "/pronounciation/13.m4a",
      type: "tutorial",
      video: "/pronounciation/13.mp4",
    },
    {
      title: "(BONUS) The Benefits of Good Pronunciation",
      sound: "/pronounciation/14.m4a",
      type: "tutorial",
      video: "/pronounciation/14.mp4",
    },
    {
      title: "(BONUS) The Drawbacks of Having Bad Pronunciation",
      sound: "/pronounciation/15.m4a",
      type: "tutorial",
      video: "/pronounciation/15.mp4",
    },
    {
      title: "mā",
      pinyin: "mā",
      hanzi: "妈",
      hanziV2: "妈",
      en: "mom",
      sound: "/pronounciation/ma1.m4a",
      type: "quiz",
      tone: 1,
    },
    {
      title: "má",
      pinyin: "má",
      hanzi: "麻",
      hanziV2: "麻",
      en: "generic name for hemp, flax etc",
      sound: "/pronounciation/ma2.m4a",
      type: "quiz",
      tone: 2,
    },
    {
      pinyin: "mǎ",
      title: "mǎ",
      hanzi: "马",
      hanziV2: "马",
      en: "horse",
      sound: "/pronounciation/ma3.m4a",
      type: "quiz",
      tone: 3,
    },
    {
      title: "mà",
      pinyin: "mà",
      hanzi: "骂",
      hanziV2: "骂",
      en: "scold",
      sound: "/pronounciation/ma4.m4a",
      type: "quiz",
      tone: 4,
    },
    // {
    //   pinyin: 'ma',
    //   hanzi: '吗',
    //   hanziV2: '吗',
    //   en: 'question particle for "yes-no" questions',
    //   sound: '/pronounciation/ma4.m4a',
    //   type: 'quiz',
    //   tone: 4
    // }
  ],
};

// A, E, I
export const course2 = {
  id: 2,
  title: "Simple Finals: A, E & I (YI)",
  levels: ["a:simple-final", "e:simple-final", "i:simple-final"],
  lessons: [
    // {
    //   id: '2a',
    //   title:
    //     'Simple Final A Introduction: 八 bā, 他她它 tā, 妈妈 māma, 爸爸 bàba',
    //   sound: '/pronounciation/02/16.m4a',
    //   type: 'tutorial',
    //   video: '/pronounciation/02/16.mp4'
    // },
    {
      id: "2b",
      pinyin: "bā",
      title: "bā",
      hanzi: "八",
      hanziV2: "八",
      en: "8",
      alternateAnswers: [8, "8", "八", "Eight"],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1538025220_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1538202179_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      id: "2c",
      pinyin: "tā",
      title: "tā",
      hanzi: "他",
      hanziV2: "他",
      en: "he/him, she/her, it",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228421_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472593_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      id: "2d",
      pinyin: "māma",
      title: "māma",
      hanzi: "妈妈",
      hanziV2: "妈妈",
      en: "mom",
      soundFemale:
        "https://firebasestorage.googleapis.com/v0/b/alley-d0944.appspot.com/o/Mandarin_Blueprint%2F1636776199_LEVEL19-%E5%A6%88%E5%A6%88-%E5%A5%B3.mp3?alt=media&token=ecf50dbb-b8df-479a-9875-34a739d3a047",
      sound:
        "https://firebasestorage.googleapis.com/v0/b/alley-d0944.appspot.com/o/Mandarin_Blueprint%2F1636776223_LEVEL19-%E5%A6%88%E5%A6%88-%E7%94%B7.mp3?alt=media&token=80f5b2c8-4e76-47fe-8123-8f78bbe52127",
      type: "quiz",
      tone: 1,
    },
    {
      id: "2e",
      pinyin: "bàba",
      title: "bàba",
      hanzi: "爸爸",
      hanziV2: "爸爸",
      en: "dad",
      soundFemale:
        "https://firebasestorage.googleapis.com/v0/b/alley-d0944.appspot.com/o/Mandarin_Blueprint%2F1638433342_%E7%88%B8%E7%88%B8-%E5%A5%B3.mp3?alt=media&token=9711cba6-8bba-4200-9a1f-c02872fb9fa8",
      sound:
        "https://firebasestorage.googleapis.com/v0/b/alley-d0944.appspot.com/o/Mandarin_Blueprint%2F1638433366_%E7%88%B8%E7%88%B8-%E7%94%B7.mp3?alt=media&token=24d27013-a709-4e1d-806b-7402d9835e89",
      type: "quiz",
      tone: 4,
    },
    // {
    //   pinyin: 'mā bà',
    //   title: 'mā bà',
    //   hanzi: '妈 爸',
    //   hanziV2: '妈 爸',
    //   en: 'mom dad (shortened)',
    //   sound:
    //     'https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228642_1514437556978.mp3',
    //   soundMale:
    //     'https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472759_1514437556978.mp3',
    //   type: 'quiz',
    //   tones: [1, 4]
    // },
    {
      id: "2f",
      pinyin: "pà",
      title: "pà",
      pron: '"phaa" from phaagpa sha',
      hanzi: "怕",
      hanziV2: "怕",
      en: "scared, frightened",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228653_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472771_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "2g",
      pinyin: "tā pà tā",
      title: "tā pà tā",
      pron: '"phaa" from phaagpa sha',
      hanzi: "他怕它",
      hanziV2: "他怕它",
      en: "He's scared of it",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228666_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472830_1514437556978.mp3",
      type: "quiz",
      tones: [1, 4, 1],
    },
    {
      id: "2h",
      pinyin: "ma",
      title: "ma",
      hanzi: "吗",
      hanziV2: "吗",
      en: "Question Particle",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228707_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472855_1514437556978.mp3",
      type: "quiz",
      tones: [1, 4, 1],
    },
    {
      id: "2i",
      pinyin: "tā pà tā ma? pà",
      title: "tā pà tā ma? pà",
      hanzi: "他怕它吗 怕",
      hanziV2: "他怕它吗怕",
      en: "Question Particle",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228740_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472883_1514437556978.mp3",
      type: "quiz",
      tones: [1, 4, 1, 5],
    },
    {
      id: "2j",
      pinyin: "è",
      title: "è",
      hanzi: "饿",
      hanziV2: "饿",
      en: "hungry",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228751_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472905_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "2k",
      pinyin: "le",
      title: "le",
      hanzi: "了",
      hanziV2: "了",
      en: "Grammatical particle indicating change or completion",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.011%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228795_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472939_1514437556978.mp3",
      type: "quiz",
      tone: 5,
    },
    {
      id: "2l",
      pinyin: "tā è le",
      title: "tā è le",
      hanzi: "他饿了",
      hanziV2: "他饿了",
      en: "He's hungry now",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.010%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228766_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472917_1514437556978.mp3",
      type: "quiz",
      tones: [1, 4, 5],
    },
    {
      id: "2m",
      pinyin: "tā è le ma? è le",
      title: "tā è le ma? è le",
      hanzi: "他饿了吗? 饿了",
      hanziV2: "他饿了吗饿了",
      en: "A: Is he hungry now? B: Yes",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.012%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228831_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517472974_1514437556978.mp3",
      type: "quiz",
      // tones: [1, 4, 5]
    },
    {
      id: "2n",
      pinyin: "tā de māma tā de bàba",
      title: "tā de māma tā de bàba",
      hanzi: "她的妈妈 她的爸爸",
      hanziV2: "她的妈妈她的爸爸",
      en: "Her mom / her dad",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.013%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228848_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473018_1514437556978.mp3",
      type: "quiz",
      // tones: [1, 4, 5]
    },
    {
      id: "2o",
      pinyin: "kě     tā   kě   le",
      title: "kě     tā   kě   le",
      hanzi: "渴 她渴了",
      hanziV2: "渴她渴了",
      en: "Thirsty. She is thirsty now",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.014%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228879_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473068_1514437556978.mp3",
      type: "quiz",
      // tones: [1, 4, 5]
    },
    {
      id: "2p",
      pinyin: "kěle",
      title: "kěle",
      hanzi: "渴了",
      hanziV2: "渴了",
      en: "Cola",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.015%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228899_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473087_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2q",
      pinyin: "kělè  ≠  kě   le",
      title: "kělè  ≠  kě   le",
      hanzi: "可乐  ≠  渴了",
      hanziV2: "可乐渴了",
      en: "Note the pronunciation difference between these two words. Tones are important!",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.016%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228915_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473106_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2r",
      pinyin: "hē hē kělè",
      title: "hē hē kělè",
      hanzi: "喝 喝可乐",
      hanziV2: "喝喝可乐",
      en: "To Drink. Drink Cola",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.017%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228940_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473146_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2s",
      pinyin: "yī",
      title: "yī",
      hanzi: "一",
      hanziV2: "一",
      en: "One",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.018%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515228999_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473163_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2t",
      pinyin: "nǐ",
      title: "nǐ",
      hanzi: "你",
      hanziV2: "你",
      en: "You",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.019%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229010_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473182_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2u",
      pinyin: "nǐ   è   le   ma ?",
      title: "nǐ   è   le   ma ?",
      hanzi: "你饿了吗 ？",
      hanziV2: "你饿了吗",
      en: "Are you hungry now?",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.020%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229032_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473275_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2v",
      pinyin: "jǐ   ge ?",
      title: "jǐ   ge ?",
      hanzi: "几个 ?",
      hanziV2: "几个",
      en: "How many? (small numbers between 2-9 approx)",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.021%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229045_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473321_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2w",
      pinyin: "ge",
      title: "ge",
      hanzi: "个",
      hanziV2: "个",
      en: "Measure word",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.022%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229055_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473334_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2x",
      pinyin: "Shrek:  jǐge   māma ? Donkey:  bā   ge",
      title: "Shrek:  jǐge   māma ? Donkey:  bā   ge",
      hanzi: "Shrek:  几个妈妈 ？Donkey:  八个",
      hanziV2: "几个妈妈八个",
      en: "A: How many moms are there? B: Eight.",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.023%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229076_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473388_1514437556978.mp3",
      type: "quiz",
    },

    {
      id: "2y",
      pinyin: "qī",
      title: "qī",
      hanzi: "七",
      hanziV2: "七",
      alternateAnswers: [7, "Seven", "7", "七"],
      en: "7",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.024%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229089_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473424_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2z",
      pinyin: "Harry:  jǐge ? Ron:  qīge",
      title: "Harry:  jǐge ? Ron:  qīge",
      hanzi: "Harry:  几个 ? Ron:  七个",
      hanziV2: "几个七个",
      en: "Harry: How many are there? B: Seven.",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.025%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229107_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473451_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "2za",
      pinyin: "xí",
      title: "xí",
      hanzi: "习",
      hanziV2: "习",
      en: "Xi, surname of the president of China Xi Jinping",
      imageUrl:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/PM%20Video%20Course%20ANKI%20SCREENSHOT%20VERSION.026%20%281%29.jpeg",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229116_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473468_1514437556978.mp3",
      type: "quiz",
    },
  ],
};

// O, U, Ü
export const course3 = {
  id: 3,
  title: "Simple Finals: O, U (WU) & Ü (YU)",
  levels: ["o:simple-final", "u:simple-final", "ü:simple-final"],
  lessons: [
    {
      id: "3a",
      pinyin: "kù",
      title: "kù",
      hanzi: "酷",
      hanziV2: "酷",
      alternateAnswers: ["cool", "Cool", "酷", "kù"],
      en: "Cool",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229136_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473479_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3b",
      pinyin: "wǔ",
      title: "wǔ",
      hanzi: "五",
      hanziV2: "五",
      en: "5",
      alternateAnswers: ["5", 5],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229146_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473491_1514437556978.mp3",
      type: "quiz",
      tone: 3,
    },
    {
      id: "3c",
      pinyin: "A:  jǐge ? B:  wǔge",
      title: "A:  jǐge ? B:  wǔge",
      hanzi: "A:  几个 ? B:  五个 。",
      hanziV2: "几个五个",
      en: "A: How many? B: Five",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229156_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473523_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3d",
      pinyin: "wǒ  è  le ,  nǐ   ne ?",
      title: "wǒ  è  le ,  nǐ   ne ?",
      hanzi: "我 饿 了 ， 你呢 ？",
      hanziV2: "我饿了你呢",
      en: "I'm hungry, what about you?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229191_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473556_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3e",
      pinyin: "wǒ   ne ?",
      title: "wǒ   ne ?",
      hanzi: " 我呢 ？",
      hanziV2: "我呢",
      en: "What about me?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229206_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473585_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3f",
      pinyin: "ní  kě  le   ma ?",
      title: "ní  kě  le   ma ?",
      hanzi: "你 渴 了吗 ？",
      hanziV2: "你渴了吗",
      en: "Are you thirsty?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/%E6%96%B0%E5%BD%95%E9%9F%B3%207.m4a",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473612_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3g",
      pinyin: "wǒ   bù   kě ,  wǒ   è   le",
      title: "wǒ   bù   kě ,  wǒ   è   le",
      hanzi: "我不渴 ， 我饿了",
      alternateAnswers: ["我不可"],
      hanziV2: "我不渴我饿了",
      en: "I'm not thirsty, I'm hungry",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229260_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473651_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3h",
      pinyin: "yīge  (or  yíge )",
      title: "yīge  (or  yíge )",
      hanzi: "一个",
      hanziV2: "一个",
      en: 'One of (something). If you are simply saying 一个 by itself without adding anything after it, 一 remains a first toneyī,but if you want to say "one of [insert object]", the 一 changes to second toneyí.',
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229274_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473681_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3i",
      pinyin: "A:  tā   è  le ma? B:  bú   è",
      title: "A:  tā   è  le ma? B:  bú   è",
      hanzi: "A:  他饿 了吗？B:  不饿",
      hanziV2: "他饿了吗不饿",
      en: "A: Is he hungry? B: No.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229295_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473703_1514437556978.mp3",
      type: "quiz",
    },

    {
      id: "3j",
      pinyin: "yú",
      title: "yú",
      hanzi: "鱼",
      hanziV2: "鱼",
      en: "Fish",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229304_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473719_1514437556978.mp3",
      type: "quiz",
      tone: 2,
    },

    {
      id: "3k",
      pinyin: "qù",
      title: "qù",
      hanzi: "去",
      hanziV2: "去",
      en: "To go",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229311_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473729_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3l",
      pinyin: "A: wǒ  qù   hē  kělè, nǐ  qù  ma? B: wǒ  bú   qù",
      hanzi: "A: 我 去喝 可乐，你 去 吗？ B: 我 不去 。",
      hanziV2: "我去喝可乐你去吗我不去",
      en: "A: I'm going to drink cola, are you going? B: I'm not going.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229351_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473747_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3m",
      pinyin: "A: nǐ  ne ? nǐ  qù   bu   qù ? B:  qù .",
      hanzi: "A: 你 呢 ？你 去不去 ？B:  qù .",
      hanziV2: "你呢你去不去去",
      en: "A: How about you? Are you going or not?  B: I'll go.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229387_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473796_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "3n",
      hanzi: "十",
      hanziV2: "十",
      pinyin: "shí",
      alternateAnswers: ["10", 10],
      pinyinType: "retroflex:initial",
      en: "10",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229402_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473837_1514437556978.mp3",
      type: "quiz",
      tone: 2,
    },
    // {
    //   id: '3o',
    //   hanzi: '是',
    //   hanziV2: '是',
    //   types: ['problem:initial'],
    //   pinyin: 'shì',
    //   en: 'to be, is, am, are',
    //   soundFemale:
    //     'https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229409_1514437556978.mp3',
    //   sound:
    //     'https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473845_1514437556978.mp3',
    //   type: 'quiz',
    //   tone: 4
    // },
    {
      id: "3p",
      hanzi: "是",
      hanziV2: "是",
      types: ["problem:initial"],
      pinyin: "shì",
      en: 'to be, is, am, are. 是 is the conjunction for nouns, like "I am John" "我是John"',
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229409_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473845_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3q",
      hanzi: "她 是 你的妈妈 吗 ？",
      types: ["problem:initial"],
      hanziV2: "她是你的妈妈吗",
      alternateAnswers: ["她是你的妈妈吗", "他是你的妈妈吗"],
      pinyin: "tā  shi  nǐde māma  ma ?",
      en: "Is she your mother?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229437_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473883_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3r",
      hanzi: "A: 她 是不是 你的妈妈？B:  是 。",
      types: ["problem:initial"],
      hanziV2: "她是不是你的妈妈是",
      alternateAnswers: ["他是不是你的妈妈是"],
      pinyin: "A: tā  shì   bu   shì  nǐde māma? B: shì",
      en: 'A: Is she your mother or not? B: Yes. (Note that when using the "是不是" construction you do not need to put "吗" at the end of the sentence)',
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229458_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473909_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3s",
      hanzi: "A: 她 饿 不 饿 ？ B: 饿",
      types: ["problem:initial"],
      hanziV2: "她饿不饿饿",
      alternateAnswers: ["他饿不饿饿", "他", "他 不 饿", "他不饿", "他饿不饿"],
      pinyin: "A: tā  è  bu  è ? B: è",
      en: "A: Is she hungry or not? B: Yes",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229472_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473940_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      id: "3t",
      hanzi: "A: 你 去不去 ？B: 不去",
      hanziV2: "你去不去不去",
      pinyin: "A: nǐ  qù   bu   qù ? B:  bú   qù",
      en: "A: Are you going or not? B: No",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229482_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473956_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
  ],
};

// A
export const course4 = {
  id: 4,
  title: "Compound & Nasal Finals: A",
  levels: ["a:compound-final", "a:nasal-final"],
  lessons: [
    {
      types: ["compound:final"],
      soundType: "ao",
      id: "4a",
      pinyin: "hǎo",
      title: "hǎo",
      hanzi: "好",
      hanziV2: "好",
      en: "Good, fine",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229502_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473968_1514437556978.mp3",
      type: "quiz",
      tone: 3,
    },
    {
      id: "4b",
      types: ["compound:final"],
      soundType: "ao",
      pinyin: "níhǎo",
      title: "níhǎo",
      hanzi: "你好",
      hanziV2: "你好",
      en: "Hello",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229525_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473981_1514437556978.mp3",
      type: "quiz",
      tones: [2, 3],
    },
    {
      id: "4c",
      types: ["compound:final", "problem:initial"],
      soundType: "ao",
      pinyin: "zhīdào",
      title: "zhīdào",
      hanzi: "知道",
      hanziV2: "知道",
      en: "to know",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229533_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517473996_1514437556978.mp3",
      type: "quiz",
      tones: [1, 4],
    },
    {
      id: "4d",
      types: ["compound:final", "problem:initial"],
      soundType: "ao",
      pinyin: "wǒ zhīdào",
      title: "wǒ zhīdào",
      hanzi: "我 知道",
      hanziV2: "我知道",
      en: "I know",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229552_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474013_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4e",
      types: ["compound:final", "problem:initial"],
      soundType: "ao",
      pinyin: "wǒ   bù   zhīdào",
      title: "wǒ   bù   zhīdào",
      hanzi: "我不知道",
      hanziV2: "我不知道",
      en: "I don't know",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229560_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474029_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4f",
      types: ["compound:final", "problem:initial"],
      soundType: "ao",
      pinyin: "zhīdào   le",
      title: "zhīdào   le",
      hanzi: "知道了",
      hanziV2: "知道了",
      en: "I know now (previously did not know)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229569_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474063_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4g",
      pinyin: "zhù",
      tone: 4,
      title: "zhù",
      hanzi: "住",
      alternateAnswers: ["注"],
      hanziV2: "住",
      en: "to live (somewhere)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229578_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474083_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4h",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "ài",
      tone: 4,
      title: "ài",
      hanzi: "爱",
      alternateAnswers: ["love"],
      hanziV2: "爱",
      en: "to love",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229586_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474093_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4i",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "Jafar: wǒ  ài  nǐ. Jasmin: wǒ  bú   ài  nǐ",
      tone: 4,
      title: "Jafar: wǒ  ài  nǐ. Jasmin: wǒ  bú   ài  nǐ",
      hanzi: "Jafar: 我 爱 你。Jasmin: 我 不爱 你。",
      hanziV2: "我爱你我不爱你",
      en: "Jafar: I love you. Jasmin: (thinking) I don't love you.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229614_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474149_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4j",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "nǐ  ài   bu   ài  wǒ?",
      tone: 4,
      title: "nǐ  ài   bu   ài  wǒ?",
      hanzi: "你 爱不爱 我？",
      hanziV2: "你爱不爱我",
      en: "Do you love me or not?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229625_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474166_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4k",
      pinyin: "zài",
      finalType: "compound:final",
      soundType: "ai",
      tone: 4,
      title: "zài",
      hanzi: "在",
      hanziV2: "在",
      en: "located, at, in, on",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229633_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474177_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4l",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "zài   náli",
      title: "zài   náli",
      hanzi: "在哪里 ？",
      hanziV2: "在哪里",
      en: "Where is it?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229649_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474186_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4m",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "zài náli zài zhèli zài nàli",
      title: "zài náli zài zhèli zài nàli",
      hanzi: "在哪 里？在这 里。在那 里。",
      hanziV2: "在哪里在这里在那里",
      en: "Where is it? It is here. It is there",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229672_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474249_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4n",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "Goten: māma zài ná li? Gohan:  zài nà li",
      title: "Goten: māma zài ná li? Gohan:  zài nà li",
      hanzi: "Goten: 妈妈 在哪 里？Gohan:  在那 里。",
      hanziV2: "妈妈在哪里在那里",
      en: "Goten: Where is Mom?  Gohan: There.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229698_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474289_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4o",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "Goten: bàba zài ná li? Gohan:  zài zhè li",
      title: "Goten: bàba zài ná li? Gohan:  zài zhè li",
      hanzi: "Goten: 爸爸 在哪 里？Gohan:  在这 里。",
      hanziV2: "爸爸在哪里在这里",
      en: "Goten: Where is Mom?  Gohan: There.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474306_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474306_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4p",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "nǎ nà zhè",
      title: "nǎ nà zhè",
      hanzi: "哪那这",
      hanziV2: "哪那这",
      en: "which/that/this",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229750_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474331_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4q",
      finalType: "compound:final",
      soundType: "ai",
      pinyin: "lǐ",
      title: "lǐ",
      hanzi: "里",
      hanziV2: "里",
      alternateAnswers: ["李"],
      en: "inside",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229763_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474347_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4r",
      finalType: "compound:final",
      soundType: "ai",
      pinyin:
        "Shiva: nǐ  zhù   zài   ná li? Brian: wǒ  zhù   zài   zhè li /  nà li",
      title:
        "Shiva: nǐ  zhù   zài   ná li? Brian: wǒ  zhù   zài   zhè li /  nà li",
      hanzi: "Shiva: 你 住在哪 里？Brian: 我 住在这 里／ 那 里。",
      hanziV2: "你住在哪里我住在这里那里",
      alternateAnswers: ["我住在那里"],
      en: "Shiva: Where do you live? Brian: I live here/there.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229809_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474385_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4s",
      types: ["nasal:final"],
      soundType: "an",
      pinyin: "àn",
      title: "àn",
      hanzi: "暗",
      hanziV2: "暗",
      alternateAnswers: ["暗"],
      en: "Dark",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229820_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474403_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4t",
      types: ["nasal:final"],
      soundType: "an",
      pinyin: "zhèlihǎo àn",
      title: "zhèlihǎo àn",
      hanzi: "这 里 好暗 ！",
      hanziV2: "这里好暗",
      en: "It is really dark here!",
      alternateAnswers: ["这里好按", "按"],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229828_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474414_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4u",
      types: ["nasal:final"],
      soundType: "an",
      pinyin: "màn",
      title: "màn",
      hanzi: "慢",
      hanziV2: "慢",
      en: "Slow",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229834_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474425_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4v",
      types: ["nasal:final"],
      soundType: "an",
      pinyin: "tā hǎo màn",
      title: "tā hǎo màn",
      hanzi: "它 好慢",
      hanziV2: "它好慢",
      alternateAnswers: ["他好慢", "大好慢", "那好慢", "他", "他好慢"],
      en: "Its really slow",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229840_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474437_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4w",
      types: ["problem:initial"],
      soundType: "ch",
      hanzi: "吃",
      hanziV2: "吃",
      pinyin: "chī",
      title: "chī",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "to eat",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229853_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474456_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4x",
      hanzi: "好吃",
      types: ["problem:initial"],
      soundType: "ch",
      hanziV2: "好吃",
      pinyin: "hǎochī",
      title: "hǎochī",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "chīfàn",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229860_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474465_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4y",
      hanzi: "吃饭",
      types: ["problem:initial"],
      soundType: "ch",
      hanziV2: "吃饭",
      pinyin: "chīfàn",
      title: "chīfàn",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "to eat a meal",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229867_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474476_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4z",
      types: ["problem:initial"],
      soundType: "ch",
      hanzi: "A:  吃饭了 吗？B:  吃了 。",
      hanziV2: "吃饭了吗吃了",
      pinyin: "Andriana:  chīfàn   le  ma? Vishal:  chī   le .",
      title: "Andriana:  chīfàn   le  ma? Vishal:  chī   le .",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "Andriana: did you eat? Vishal: yes.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229877_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474489_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4za",
      types: ["problem:initial"],
      soundType: "ch",
      hanzi: "出去",
      hanziV2: "出去",
      pinyin: "chūqu",
      title: "chūqu",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "Go out or Get out (note the 'tongue gymnastics' in this word, tongue up for 'chū' and then down against the bottom teeth for 'qu')",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229886_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474498_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4zb",
      types: ["nasal:final"],
      soundType: "ang",
      hanzi: "帮",
      hanziV2: "帮",
      pinyin: "bāng",
      title: "bāng",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "to help",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229895_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474510_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4zc",
      types: ["nasal:final"],
      soundType: "ang",
      hanzi: "帮我!",
      hanziV2: "帮我",
      pinyin: "bāng wǒ!",
      title: "bāng wǒ!",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "help me",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229900_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474520_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4zd",
      types: ["nasal:final"],
      soundType: "ang",
      hanzi: "他 在帮 他",
      hanziV2: "他在帮他",
      pinyin: "tā  zài   bāng  tā",
      title: "tā  zài   bāng  tā",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "He's helping him",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474530_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474530_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4ze",
      types: ["nasal:final", "problem:initial"],
      soundType: "ang",
      hanzi: "她 在喝 茶",
      hanziV2: "她在喝茶",
      pinyin: "tā  zài   hē  chá",
      title: "tā  zài   hē  chá",
      alternateAnswers: ["他在喝茶", "他"],
      en: "She's drinking tea",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229914_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474545_1514437556978.mp3",
      type: "quiz",
    },
    {
      id: "4zf",
      types: ["problem:initial"],
      soundType: "ch",
      hanzi: "他 在吃饭",
      hanziV2: "他在吃饭",
      alternateAnswers: ["她在吃饭", "她"],
      pinyin: "tā  zài   chīfàn",
      title: "tā  zài   chīfàn",
      // alternateAnswers: ['他好慢', '大好慢', '那好慢', '他', '他好慢'],
      en: "He's eating a meal",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515229922_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474570_1514437556978.mp3",
      type: "quiz",
    },
  ],
};

// E, O
export const course5 = {
  id: 5,
  title: "Compound & Nasal Finals: E & O",
  levels: [
    "e:compound-final",
    "e:nasal-final",
    "o:compound-final",
    "o:nasal-final",
  ],
  lessons: [
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5a",
      hanzi: "嗯",
      hanziV2: "嗯",
      pinyin: "èn",
      title: "èn",
      alternateAnswers: ["摁"],
      en: "to press (a button) / Mmmmm",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230009_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474601_1514437556978.mp3",
      type: "quiz/multiple-choice",
      tone: 4,
      options: ["他", "们", "嗯"],
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5b",
      hanzi: "他 们很笨",
      hanziV2: "他们很笨",
      pinyin: "tā  men   hěn   bèn",
      title: "tā  men   hěn   bèn",
      en: "They are stupid",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230057_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474637_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5c",
      hanzi: "它很慢",
      alternateAnswers: ["他很慢"],
      hanziV2: "它很慢",
      pinyin: "tā   hěn   màn",
      title: "tā   hěn   màn",
      en: "It is slow",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230087_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474697_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5d",
      hanzi: "什么 ？",
      hanziV2: "什么",
      pinyin: "shénme",
      title: "shénme",
      en: "What?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230094_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474736_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5e",
      hanzi: "吃什么 ？",
      hanziV2: "吃什么",
      pinyin: "chī shénme",
      title: "chī shénme",
      en: "What do you want to eat?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230101_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474777_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5f",
      hanzi: "这是什么 ？",
      hanziV2: "这是什么",
      pinyin: "zhè shi shénme",
      title: "zhè shi shénme",
      en: "What is this?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230109_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474793_1514437556978.mp3",
      type: "quiz",
    },

    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5g",
      hanzi: "诶 ？ 诶 ！",
      hanziV2: "诶诶",
      pinyin: "éi ?  èi !",
      title: "éi ?  èi !",
      en: "Huh? OK?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230152_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474839_1514437556978.mp3",
      type: "quiz/multiple-choice",
      options: ["们们", "诶诶", "嗯嗯"],
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5h",
      hanzi: "谁",
      hanziV2: "谁",
      pinyin: "shéi",
      title: "shéi",
      en: "Who?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230158_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474852_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5i",
      hanzi: "她是谁 ？",
      hanziV2: "她是谁",
      pinyin: "tā   shi   shéi ?",
      title: "tā   shi   shéi ?",
      en: "Who is she?",
      alternateAnswers: ["他是谁"],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230164_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474861_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5j",
      hanzi: "这个",
      hanziV2: "这个",
      pinyin: "zhège  OR  zhèige",
      title: "zhège  OR  zhèige",
      en: "This one",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230176_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474886_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5k",
      hanzi: "那个",
      hanziV2: "那个",
      pinyin: "nàge  OR  nèige",
      title: "nàge  OR  nèige",
      en: "That one",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230184_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474903_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5l",
      hanzi: "哪个 ？",
      hanziV2: "哪个",
      pinyin: "nǎge  OR  něige",
      title: "nǎge  OR  něige",
      en: "Which one?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230192_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474917_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["哪个", "那个"],
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5m",
      hanzi: "还是",
      hanziV2: "还是",
      pinyin: "hái   shi",
      title: "hái   shi",
      en: "or (in either/or questions)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230201_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474931_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5n",
      hanzi: "哪个 ？ 这个还是那个 ？",
      hanziV2: "哪个这个还是那个",
      pinyin: "něige ?  zhèige   háishi   nèige ?",
      title: "něige ?  zhèige   háishi   nèige ?",
      en: "Which one? This one or that one?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230219_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474959_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["哪个", "那个"],
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5o",
      hanzi: "哪个 ？ 这个 。",
      hanziV2: "哪个这个",
      pinyin: "něige ?  zhèige",
      title: "něige ?  zhèige",
      en: "Which one? This one.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230233_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517474980_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["哪个", "那个"],
    },
    {
      soundType: "ei",
      types: ["nasal:final", "problem:initial"],
      id: "5p",
      hanzi: "哪 个？ 这 个 还是那 个？",
      hanziV2: "哪个这个还是那个",
      pinyin: "něige ?  zhèi ge  háishi   nèi ge?",
      title: "něige ?  zhèi ge  háishi   nèi ge?",
      en: "Which one? This one or that one?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230252_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475003_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["哪个", "那个"],
    },
    // === en ===
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5q",
      hanzi: "生日",
      hanziV2: "生日",
      pinyin: "shēngrì",
      title: "shēngrì",
      en: "Birthday",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230262_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475031_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ai",
      types: ["nasal:final", "problem:initial"],
      id: "5r",
      hanzi: "快乐",
      hanziV2: "快乐",
      pinyin: "kuàilè",
      title: "kuàilè",
      en: "Happy",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230267_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475038_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5s",
      hanzi: "生日快乐 ！",
      hanziV2: "生日快乐",
      pinyin: "shēngrì kuài lè",
      title: "shēngrì kuài lè",
      en: "Happy Birthday",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230274_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475049_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5t",
      hanzi: "这里 好热",
      hanziV2: "这里好热",
      pinyin: "zhèli  hǎo   rè / zhèli  hěn   rè",
      title: "zhèli  hǎo   rè / zhèli  hěn   rè",
      en: "It is hot here.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230289_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475067_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["这里很热"],
    },
    {
      soundType: "en",
      types: ["nasal:final", "problem:initial"],
      id: "5u",
      hanzi: "你 是哪 里 人 ？",
      hanziV2: "你是哪里人",
      pinyin: "nǐ  shì   ná li  rén ?",
      title: "nǐ  shì   ná li  rén ?",
      en: "Where are you from?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230324_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475088_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["这里很热"],
    },
    {
      soundType: "er",
      types: ["nasal:final", "problem:initial"],
      id: "5v",
      hanzi: "哪儿 那儿 这儿",
      hanziV2: "哪儿那儿这儿",
      pinyin: "nǎr nàr zhèr",
      title: "nǎr nàr zhèr",
      en: "Where? There here",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230366_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475139_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["那儿"],
    },
    {
      soundType: "er",
      types: ["nasal:final", "problem:initial"],
      id: "5v",
      hanzi: "玩儿",
      hanziV2: "玩儿",
      pinyin: "wánr",
      title: "wánr",
      en: "To play",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475222_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475222_1514437556978.mp3",
      // type: 'quiz'
      type: "quiz/multiple-choice",
      options: ["玩儿", "诶诶", "诶嗯"],
    },
    {
      soundType: "er",
      types: ["nasal:final", "problem:initial"],
      id: "5w",
      hanzi: "出去玩儿",
      hanziV2: "出去玩儿",
      pinyin: "chūqu wánr",
      title: "chūqu wánr",
      en: "Go out to play (kids), go out with friends (adults, usually drinking involved)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230381_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475231_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "an",
      types: ["nasal:final", "problem:initial"],
      id: "5x",
      hanzi: "汉字",
      hanziV2: "汉字",
      pinyin: "hànzì",
      title: "hànzì",
      en: "Chinese Characters",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1538033604_1366716141612_1366716141612.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475248_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "i",
      types: ["nasal:final", "problem:initial"],
      id: "5y",
      hanzi: "词",
      hanziV2: "词",
      pinyin: "cí",
      title: "cí",
      en: "Word",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230434_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475286_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "i",
      types: ["nasal:final", "problem:initial"],
      id: "5z",
      hanzi: "四",
      hanziV2: "四",
      pinyin: "sì",
      title: "sì",
      en: "Number 4",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230440_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475292_1514437556978.mp3",
      type: "quiz",
      alternateAnswers: ["4", "次"],
    },
    {
      soundType: "i",
      types: ["nasal:final", "problem:initial"],
      id: "5a1",
      hanzi: "我 饿死了 ！",
      hanziV2: "我饿死了",
      pinyin: "wǒ  è   sǐ   le",
      title: "wǒ  è   sǐ   le",
      en: "I'm starving to death!",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230456_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475315_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "i",
      types: ["nasal:final", "problem:initial"],
      id: "5a2",
      hanzi: "热死 了！",
      hanziV2: "热死了",
      pinyin: "rè   sǐ  le",
      title: "rè   sǐ  le",
      en: "burning to death (often said in exaggeration)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230465_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475326_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ou",
      types: ["nasal:final", "problem:initial"],
      id: "5a3",
      hanzi: "藕",
      hanziV2: "藕",
      pinyin: "ǒu",
      title: "ǒu",
      en: "Lotus root",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230475_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475332_1514437556978.mp3",
      // type: 'quiz'
      type: "quiz/multiple-choice",
      options: ["玩", "藕", "诶"],
    },
    {
      soundType: "ou",
      types: ["nasal:final", "problem:initial"],
      id: "5a4",
      hanzi: "我 爱吃藕",
      hanziV2: "我爱吃藕",
      pinyin: "wǒ  ài   chī   ǒu",
      title: "wǒ  ài   chī   ǒu",
      en: "I love to eat lotus root",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230483_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475341_1514437556978.mp3",
      type: "quiz",
    },
    {
      soundType: "ou",
      types: ["nasal:final", "problem:initial"],
      id: "5a5",
      hanzi: "走",
      hanziV2: "走",
      pinyin: "zǒu",
      title: "zǒu",
      en: "to leave, to walk",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230489_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475351_1514437556978.mp3",
      // type: 'quiz'
      type: "quiz/multiple-choice",
      options: ["走", "藕", "诶"],
    },
    {
      soundType: "ou",
      types: ["nasal:final", "problem:initial"],
      id: "5a6",
      hanzi: "走了",
      hanziV2: "走了",
      pinyin: "zǒu le",
      title: "zǒu le",
      en: "to have left or have decided to leave",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230507_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475359_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '诶']
    },
    {
      soundType: "ou",
      types: ["nasal:final", "problem:initial"],
      id: "5a7",
      hanzi: "我走了",
      hanziV2: "我走了",
      pinyin: "wó zǒu le",
      title: "wó zǒu le",
      en: "I am leaving",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230513_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475368_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '诶']
    },
    {
      soundType: "a",
      types: ["nasal:final", "problem:initial"],
      id: "5a8",
      hanzi: "吧",
      hanziV2: "吧",
      pinyin: "ba",
      title: "ba",
      en: "grammatical particle put at the end of sentences indicating suggestion",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230519_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475374_1514437556978.mp3",
      // type: 'quiz'
      type: "quiz/multiple-choice",
      options: ["走", "藕", "吧", "诶"],
    },
    {
      soundType: "a",
      types: ["nasal:final", "problem:initial"],
      id: "5a9",
      hanzi: "A:  走吧 。 B:  走 。",
      hanziV2: "走吧走",
      pinyin: "A: zǒu ba. B: zǒu",
      title: "A: zǒu ba. B: zǒu",
      en: "A: Let's go. B: Ok",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230528_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475382_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '吧', '诶']
    },
    {
      soundType: "a",
      types: ["nasal:final", "problem:initial"],
      id: "5a10",
      hanzi: "好吗 ？ 好不好 ？",
      hanziV2: "好吗好不好",
      pinyin: "hǎo   ma ? hǎo   bu   hǎo ?",
      title: "hǎo   ma ? hǎo   bu   hǎo ?",
      en: "Ok? Is it Ok or not?",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230540_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475393_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '吧', '诶']
    },
    {
      soundType: "a",
      types: ["nasal:final", "problem:initial"],
      id: "5a11",
      hanzi: "A: 好吗？or 好不好？ B:  好的 。",
      hanziV2: "好吗好不好好的",
      pinyin: "A: hǎo ma? or hǎo bu hǎo? B:  hǎode",
      title: "A: hǎo ma? or hǎo bu hǎo? B:  hǎode",
      en: "A: Ok? B: Ok",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230559_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475497_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '吧', '诶']
    },
    {
      soundType: "ong",
      types: ["nasal:final", "problem:initial"],
      id: "5a12",
      hanzi: "中国",
      hanziV2: "中国",
      pinyin: "zhōngguó",
      title: "zhōngguó",
      en: "China",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230564_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475509_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '吧', '诶']
    },
    {
      soundType: "ong",
      types: ["nasal:final", "problem:initial"],
      id: "5a13",
      hanzi: "我 住 在 中国",
      hanziV2: "我住在中国",
      pinyin: "wǒ  zhù   zài   zhōngguó",
      title: "wǒ  zhù   zài   zhōngguó",
      en: "I live in China.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230571_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475519_1514437556978.mp3",
      type: "quiz",
      // type: 'quiz/multiple-choice',
      // options: ['走', '藕', '吧', '诶']
    },
  ],
};

// I
export const course6 = {
  id: 6,
  title: "Compound Finals: I (YI)",
  levels: ["i:compound-final"],
  // ye
  lessons: [
    {
      soundType: "ie (ye)",
      types: ["compound:final"],
      id: "6a",
      hanzi: "A: 我 爱 你。 B: 我 也爱 你。",
      hanziV2: "我爱你我也爱你",
      pinyin: "A: wǒ  ài  nǐ. B: wó  yě   ài  nǐ",
      title: "A: wǒ  ài  nǐ. B: wó  yě   ài  nǐ",
      en: "A: I love you. B: I love you too",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230761_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475545_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ie (ye)",
      types: ["compound:final"],
      id: "6b",
      hanzi: "我也是",
      hanziV2: "我也是",
      pinyin: "wó   yě   shì",
      title: "wó   yě   shì",
      en: "Me too",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230769_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475558_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ie (ye)",
      types: ["compound:final"],
      id: "6c",
      hanzi: "它 很慢. 它 也很慢",
      hanziV2: "它很慢它也很慢",
      pinyin: "tā  hěn   màn. tā  yé   hěn   màn",
      title: "tā  hěn   màn. tā  yé   hěn   màn",
      en: "It is slow. It is also slow.",
      alternateAnswers: ["他很慢他也很慢", "他很慢", "他也很慢"],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230779_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475570_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ie (ye)",
      types: ["compound:final"],
      id: "6d",
      hanzi: "谢谢",
      hanziV2: "谢谢",
      pinyin: "xièxie",
      title: "xièxie",
      en: "Thanks",
      // alternateAnswers: ['他很慢他也很慢', '他很慢', '他也很慢'],
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230786_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475582_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ie (ye)",
      types: ["compound:final"],
      id: "6e",
      hanzi: "谢谢你",
      hanziV2: "谢谢你",
      pinyin: "xièxienǐ",
      title: "xièxienǐ",
      en: "Thank you",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230792_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475597_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },

    // ya
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6f",
      hanzi: "哎呀",
      hanziV2: "哎呀",
      pinyin: "āiya",
      title: "āiya",
      en: "Thank you",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230805_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475614_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6g",
      hanzi: "家",
      hanziV2: "家",
      pinyin: "jiā",
      title: "jiā",
      en: "Home",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230811_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475629_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6h",
      hanzi: "A: 你 在家 吗？ B: 嗯,  在 。",
      hanziV2: "你在家吗嗯在",
      pinyin: "A: nǐ  zài   jiā  ma? B: èn,   zài .",
      title: "A: nǐ  zài   jiā  ma? B: èn,   zài .",
      en: "A: Are you at home? B: Uh huh, yeah.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475836_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475836_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6i",
      hanzi: "要",
      hanziV2: "要",
      pinyin: "yào",
      title: "yào",
      en: "to want, to desire",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230846_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475851_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6j",
      hanzi: "我 要 你",
      hanziV2: "我要你",
      pinyin: "wǒ  yào  nǐ",
      title: "wǒ  yào  nǐ",
      en: "I want you",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230861_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475860_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6k",
      hanzi: "我 们 要 吃饭",
      hanziV2: "我们要吃饭",
      pinyin: "wǒ men yào chīfàn",
      title: "wǒ men yào chīfàn",
      en: "We want to eat",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230871_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475902_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6l",
      hanzi: "不要",
      hanziV2: "不要",
      pinyin: "bú yào",
      title: "bú yào",
      en: "to not want, don't",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230960_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475946_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6m",
      hanzi: "不要吃 那个！",
      hanziV2: "不要吃那个",
      pinyin: "bú   yào   chī  nèige",
      title: "bú   yào   chī  nèige",
      en: "Don't eat that!",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230967_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475959_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6n",
      hanzi: "不要喝 我的 茶 ！",
      hanziV2: "不要喝我的茶",
      pinyin: "bú   yào   hē  wǒde  chá !",
      title: "bú   yào   hē  wǒde  chá !",
      en: "Don't drink my tea!",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230977_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475971_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6o",
      hanzi: "我 叫 ... 我 是",
      hanziV2: "我叫我是",
      pinyin: "wǒ  jiào / wǒ  shì",
      title: "wǒ  jiào / wǒ  shì",
      en: "I am... (My name is...)",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515230985_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475985_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6p",
      hanzi: "A: 你 叫什么呢 ？B: 我叫.../ 我是....",
      hanziV2: "你叫什么呢我叫我是",
      pinyin: "A: nǐ  jiào   shénme   ne ? B: wǒ jiào.../ wǒ shì...",
      title: "A: nǐ  jiào   shénme   ne ? B: wǒ jiào.../ wǒ shì..",
      en: "A: What is your name? B: I am...",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475999_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517475999_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6q",
      hanzi: "呢",
      hanziV2: "呢",
      pinyin: "ne",
      title: "ne",
      alternateAnswers: ["那"],
      en: "used to soften the tone of a sentence or question",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231021_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476027_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6r",
      hanzi: "没有 有",
      hanziV2: "没有有",
      pinyin: "méiyǒu yǒu",
      title: "méiyǒu yǒu",
      en: "Not have / Have",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231029_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476040_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6s",
      hanzi: "A: 你 有 车吗？ B: 没有 ",
      hanziV2: "你有车吗没有",
      pinyin: "A: ní  yǒu  chē ma? B:  méiyǒu",
      title: "A: ní  yǒu  chē ma? B:  méiyǒu",
      en: "A: Do you have a car? B: No.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231038_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476055_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6t",
      hanzi: "A: 你 有 车吗？ B: 我 也没有 。",
      hanziV2: "你有车吗我也没有",
      pinyin: "A: ní  yǒu  chē ma? B: wó  yě   méi   yǒu",
      title: "A: ní  yǒu  chē ma? B: wó  yě   méi   yǒu",
      en: "A: Do you have a car? B: I don't have one either.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231050_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476075_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6u",
      hanzi: "A: 你 有没有 手机？B:  有 。",
      hanziV2: "你有没有手机有",
      pinyin: "A: ní  yǒu   mei   yóu  shǒujī? B:  yǒu .",
      title: "A: ní  yǒu   mei   yóu  shǒujī? B:  yǒu .",
      en: "A: Do you have a phone? B: Yes.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231063_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476093_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6v",
      hanzi: "A: 你 有没有 手机？B: 我 也有 。",
      hanziV2: "你有没有手机我也有",
      pinyin: "A: ní  yǒu   mei   yóu  shǒujī? B: wǒ  yé   yǒu",
      title: "A: ní  yǒu   mei   yóu  shǒujī? B: wǒ  yé   yǒu",
      en: "A: Do you have a mobile phone? B: I have one also.",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231074_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476116_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6w",
      hanzi: "六",
      hanziV2: "六",
      pinyin: "liù",
      title: "liù",
      en: "6",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231081_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476132_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
    {
      soundType: "ia (ya)",
      types: ["compound:final"],
      id: "6x",
      hanzi: "九",
      hanziV2: "九",
      pinyin: "jiù",
      title: "jiù",
      en: "9",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231086_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476140_1514437556978.mp3",
      type: "quiz",
      tone: 1,
    },
  ],
};

export const course7 = {
  id: "speak-chapter-7",
  title: "Nasal Finals: I (YI)",
  levels: ["i:nasal-final"],
  lessons: [
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7a",
      hanzi: "抽烟",
      hanziV2: "抽烟",
      pinyin: "chōuyān",
      title: "chōuyān",
      en: "to smoke a cigarette",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231105_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476157_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7b",
      hanzi: "他 在 抽烟",
      hanziV2: "他在抽烟",
      pinyin: "tā zài chōuyān",
      title: "tā zài chōuyān",
      en: "He's smoking a cigarette",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231112_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476166_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7c",
      hanzi: "讨厌",
      hanziV2: "讨厌",
      pinyin: "tǎoyàn",
      title: "tǎoyàn",
      en: "to dislike, to hate",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231118_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476175_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7d",
      hanzi: "钱",
      hanziV2: "钱",
      pinyin: "qián",
      title: "qián",
      en: "money",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231128_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476180_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7e",
      hanzi: "他 没有 钱",
      hanziV2: "他没有钱",
      pinyin: "tā  méiyǒu   qián",
      title: "tā  méiyǒu   qián",
      en: "He doesn't have money",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231134_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476189_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7f",
      hanzi: "他 很有钱",
      hanziV2: "他很有钱",
      pinyin: "tā hényǒu qián",
      title: "tā hényǒu qián",
      en: "He is rich",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231141_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476198_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
    {
      soundType: "ian (yi)",
      types: ["nasal:final"],
      id: "7g",
      hanzi: "再见",
      hanziV2: "再见",
      pinyin: "zàijiàn",
      title: "zàijiàn",
      en: "Goodbye, see you later",
      soundFemale:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1515231148_1514437556978.mp3",
      sound:
        "https://storage.googleapis.com/alley-d0944.appspot.com/Mandarin_Blueprint/rec1517476210_1514437556978.mp3",
      type: "quiz",
      tone: 4,
    },
  ],
};

// U
export const course8 = {
  id: "speak-chapter-8",
  title: "Compound & Nasal Finals: U (WU)",
  levels: ["u:compound-final", "u:nasal-final"],
  lessons: [],
};

// Ü
export const course9 = {
  id: "speak-chapter-9",
  title: "Compound & Nasal Finals: Ü (YU)",
  levels: ["ü:compound-final", "ü:nasal-final"],
  lessons: [],
};

export const course10 = {
  id: "speak-chapter-10",
  title: "10. Moving Forward",
  lessons: [],
};

// const scriptParser = (document: any) =>
//   [...document.querySelectorAll('p')]
//     .slice(8)
//     .filter(elem => elem.innerText !== '\n')
//     .map(item => item.innerText)
//     .filter(Boolean)
//     .map(item =>
//       item
//         .split('\n')
//         .map((item: any) =>
//           item.includes(':') ? item.split(':') : item.split('：')
//         )
//     )

export const pronounciationLessons = [
  ...course.lessons,
  ...course2.lessons,
  ...course3.lessons,
  ...course4.lessons,
  ...course5.lessons,
  ...course6.lessons,
];
