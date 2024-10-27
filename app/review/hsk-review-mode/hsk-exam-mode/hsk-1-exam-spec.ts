const hsk2ExamReadExample = {
  title: {
    zh: "二、阅 读",
    en: "2. Reading",
  },

  sections: [
    {
      title: {
        zh: "第一部分",
        en: "Part One",
      },
      question: {
        en: "Determine whether the Chinese character matches the English translation. Answer True or False.",
        zh: "判断这个汉字是否与英文翻译相匹配。回答“是”或“否”。",
      },
      totalQuestions: 5,
      type: "simple-true-false",
      questions: [
        {
          zh: "电视",
          pinyin: "diànshì",
          en: "Airplane",
          answer: false,
        },
        {
          zh: "火车",
          pinyin: "huǒchē",
          en: "Train",
          answer: true,
        },
        {
          zh: "游泳",
          pinyin: "yóuyǒng",
          en: "Swimming",
          answer: true,
        },
        {
          zh: "自行车",
          pinyin: "zìxíngchē",
          en: "Car",
          answer: false,
        },
        {
          zh: "休息",
          pinyin: "xiūxi",
          en: "Rest",
          answer: true,
        },
      ],
    },
    {
      title: {
        zh: "第二部分",
        en: "Part Two",
      },
      question: {
        en: "Match each Chinese character with its English meaning.",
        zh: "将每个汉字与它的英文意思相匹配。",
      },
      type: "social-interaction-simple-match",
      totalQuestions: 5,

      options: [
        {
          id: 1,
          zh: "我很喜欢这本书。",
          pinyin: "Wǒ hěn xǐhuān zhè běn shū.",
          topics:
            "reading, activity, literature, personal interests, education, social interaction",
        },
        {
          id: 2,
          zh: "你今天做什么菜？",
          pinyin: "Nǐ jīntiān zuò shénme cài?",
          topics:
            "asking question, culinary arts, daily life, social interaction",
        },
        {
          id: 3,
          zh: "对不起，我想去睡觉了。",
          pinyin: "Duìbùqǐ, wǒ xiǎng qù shuìjiàole.",
          topics:
            "daily life, communication, health and well-being, social interaction",
        },
        {
          id: 4,
          zh: "妈妈，你能看见我吗？",
          pinyin: "Māmā, nǐ néng kànjiàn wǒ ma?",
          topics:
            "family relationships, child development, communication, everyday situations",
        },
        {
          id: 5,
          zh: "不客气，你 好点儿了吗？",
          pinyin: "Bù kèqì, nǐ hǎo diǎn erle ma?",
          topics:
            "social etiquette, health and well-being, communication, relationships",
        },
      ],
      answers: [
        { optionId: 1, en: "I like this book very much." },
        { optionId: 2, en: "What are you cooking today?" },
        { optionId: 3, en: "Sorry, I want to go to bed." },
        { optionId: 4, en: "Mama, can you see me?" },
        { optionId: 5, en: "You're welcome. Are you feeling better?" },
      ],
    },
    {
      title: {
        zh: "第三部分",
        en: "Part Three",
      },
      totalQuestions: 5,
      question: {
        en: "Match each question with the correct response.",
        zh: "将每个问题与正确的回答相匹配。",
      },
      type: "question-answer-simple-match",
      options: [
        { id: 1, zh: "你叫什么名字？", pinyin: "nǐ jiào shénme míngzi?" },
        { id: 2, zh: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén?" },
        { id: 3, zh: "你几岁？", pinyin: "nǐ jǐ suì?" },
        { id: 4, zh: "现在几点？", pinyin: "xiànzài jǐ diǎn?" },
        { id: 5, zh: "你住在哪里？", pinyin: "nǐ zhù zài nǎlǐ?" },
      ],
      answers: [
        { optionId: 1, zh: "我叫李明。", pinyin: "wǒ jiào Lǐ Míng." },
        {
          optionId: 2,
          zh: "我是中国人。",
          pinyin: "wǒ shì Zhōngguó rén.",
        },
        { optionId: 3, zh: "我二十岁。", pinyin: "wǒ èrshí suì." },
        { optionId: 4, zh: "现在三点。", pinyin: "xiànzài sān diǎn." },
        {
          optionId: 5,
          zh: "我住在北京。",
          pinyin: "wǒ zhù zài Běijīng.",
        },
      ],
    },

    {
      title: {
        zh: "第四部分",
        en: "Part Three",
      },
      question: {
        en: "Fill in the blank with the correct response.",
        zh: "用正确的答案填空。",
      },
      type: "social-interaction-fill-in-the-blank",
      totalQuestions: 5,

      options: [
        {
          id: 1,
          zh: "我喜欢吃______。",
          pinyin: "Wǒ xǐhuān chī ______.",
          topics: "food, preferences, social interaction, daily life",
        },
        {
          id: 2,
          zh: "你______去哪里？",
          pinyin: "Nǐ ______ qù nǎlǐ?",
          topics: "asking questions, travel, daily life, communication",
        },
        {
          id: 3,
          zh: "今天的天气很好，我们______去公园。",
          pinyin: "Jīntiān de tiānqì hěn hǎo, wǒmen ______ qù gōngyuán.",
          topics: "weather, activities, planning, social interaction",
        },
        {
          id: 4,
          zh: "你______这个电影吗？",
          pinyin: "Nǐ ______ zhège diànyǐng ma?",
          topics: "asking questions, movies, entertainment, social interaction",
        },
        {
          id: 5,
          zh: "我在学校______。",
          pinyin: "Wǒ zài xuéxiào ______.",
          topics: "education, daily life, social interaction, location",
        },
      ],
      answers: [
        { optionId: 1, hanzi: "苹果", pinyin: "píngguǒ" }, // "apple"
        { optionId: 2, hanzi: "想", pinyin: "xiǎng" }, // "where to go"
        { optionId: 3, hanzi: "一起", pinyin: "yīqǐ" }, // "together"
        { optionId: 4, hanzi: "喜欢", pinyin: "xǐhuān" }, // "like"
        { optionId: 5, hanzi: "上课", pinyin: "shàngkè" }, // "in class"
      ],
    },
  ],
};
