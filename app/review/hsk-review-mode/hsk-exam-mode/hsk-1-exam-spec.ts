const hsk2ExamSpec = {
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
      ],
    },
    {
      title: {
        zh: "第二部分",
        en: "Part Two",
      },
      question: {
        en: "Match each Chinese character with its English meaning.",
      },
      type: "social-interaction-simple-match",

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
        { id: 1, en: "I like this book very much." },
        { id: 2, en: "What are you cooking today?" },
        { id: 3, en: "Sorry, I want to go to bed." },
        { id: 4, en: "Mama, can you see me?" },
        { id: 5, en: "You're welcome. Are you feeling better?" },
      ],
    },
  ],
};
