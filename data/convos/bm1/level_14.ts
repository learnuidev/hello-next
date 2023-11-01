export const lesson14 = {
  id: "lesson24",
  level: 3,
  language: "zh",
  course: "Real World Mandarin",
  author: "vishal",
  location: "js",
  topics: ["javascript", "react", "frontend developer", "ui"],
  title: "14. 学习 React",
  audio: {
    slow: "https://cdn.fs.teachablecdn.com/Aha0gfTkThmVBco4UCtH",
    fast: "https://cdn.fs.teachablecdn.com/iw52BOQKQkS2gcoeSSQJ",
  },

  questionsAndAnswers: [
    {
      id: "这章节会介绍哪些概念",
      hanzi: "这章节会介绍哪些 React 概念？",
      type: "question",
      pinyin: "Zhè zhāngjié huì jièshào nǎxiē React gàiniàn?",
      en: "This chapter will introduce which React concepts?",
    },
    {
      id: "本章节将介绍你每天都会使用的的概念",
      hanzi: "本章节将介绍你每天都会使用的 80% 的 React 概念。",
      pinyin:
        "Běn zhāngjié jiāng jièshào nǐ měitiān dōu huì shǐyòng de 80% de React gàiniàn.",
      en: "This chapter will introduce the 80% of React concepts that you use every day.",
      questionId: "这章节会介绍哪些概念",
    },
  ],
  lessonsV2: [
    {
      id: "快速入门",
      hanzi: "快速入门",
      pinyin: "Kuàisù rùmén",
      lit: "",
      en: "Quick Start",
    },
    {
      id: "欢迎来到文档",
      hanzi: "欢迎来到 React 文档！",
      pinyin: "Huānyíng lái dào React wéndàng!",
      lit: "",
      en: "Welcome to the React documentation!",
    },
    {
      id: "本章节将介绍你每天都会使用的的概念",
      hanzi: "本章节将介绍你每天都会使用的 80% 的 React 概念。",
      pinyin:
        "Běn zhāngjié jiāng jièshào nǐ měitiān dūhuì shǐyòng de 80% de React gàiniàn.",
      lit: "",
      en: "This chapter will introduce you to 80% of the React concepts you’ll use every day.",
    },
    {
      id: "你将会学习到",
      hanzi: "你将会学习到",
      pinyin: "Nǐ jiāng huì xuéxí dào",
      lit: "",
      en: "You will learn",
    },
    {
      id: "如何创建和嵌套组件",
      hanzi: "如何创建和嵌套组件",
      pinyin: "Rúhé chuàngjiàn hé qiàn tào zǔjiàn",
      lit: "",
      en: "How to create and nest components",
    },
    {
      id: "如何添加标签和样式",
      hanzi: "如何添加标签和样式",
      pinyin: "Rúhé tiānjiā biāoqiān hé yàngshì",
      lit: "",
      en: "How to add tags and styles",
    },
    {
      id: "如何显示数据",
      hanzi: "如何显示数据",
      pinyin: "Rúhé xiǎnshì shùjù",
      lit: "",
      en: "How to display data",
    },
    {
      id: "如何渲染条件和列表",
      hanzi: "如何渲染条件和列表",
      pinyin: "Rúhé xuànrǎn tiáojiàn hé lièbiǎo",
      lit: "",
      en: "How to render conditions and lists",
    },
    {
      id: "如何对事件做出响应并更新界面",
      hanzi: "如何对事件做出响应并更新界面",
      pinyin: "Rúhé duì shìjiàn zuò chū xiǎngyìng bìng gēngxīn jièmiàn",
      lit: "",
      en: "How to respond to events and update the interface",
    },
    {
      id: "如何在组件间共享数据",
      hanzi: "如何在组件间共享数据",
      pinyin: "Rúhé zài zǔjiàn jiān gòngxiǎng shùjù",
      lit: "",
      en: "How to share data between components",
    },
    // Learning Objectives End
    // Content Start
    {
      id: "创建和嵌套组件",
      hanzi: "创建和嵌套组件",
      pinyin: "Chuàngjiàn hé qiàn tào zǔjiàn",
      lit: "",
      en: "Create and nest components",
    },
    {
      id: "应用程序是由组件组成的",
      hanzi: "React 应用程序是由 组件 组成的。",
      pinyin: "React yìngyòng chéngxù shì yóu zǔjiàn zǔchéng de.",
      lit: "",
      en: "React applications are made up of components.",
    },
    {
      id: "一个组件是用户界面的一部分它拥有自己的逻辑和外观",
      hanzi: "一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。",
      pinyin:
        "Yīgè zǔjiàn shì UI(yònghù jièmiàn) de yībùfèn, tā yǒngyǒu zìjǐ de luójí hé wàiguān.",
      lit: "",
      en: "A component is a part of a UI (user interface) that has its own logic and appearance.",
    },
    {
      id: "组件可以小到一个按钮也可以大到整个页面",
      hanzi: "组件可以小到一个按钮，也可以大到整个页面。",
      pinyin: "Zǔjiàn kěyǐ xiǎo dào yīgè ànniǔ, yě kěyǐ dà dào zhěnggè yèmiàn.",
      lit: "",
      en: "Components can be as small as a button or as large as an entire page.",
    },
    {
      id: "组件是返回标签的函数",
      hanzi: "React 组件是返回标签的 JavaScript 函数",
      pinyin: "React zǔjiàn shì fǎnhuí biāoqiān de JavaScript hánshù:",
      lit: "",
      en: "React components are JavaScript functions that return tags",
    },
    {
      id: "至此你已经声明了现在把它嵌套到另一个组件中",
      hanzi: "至此，你已经声明了 MyButton，现在把它嵌套到另一个组件中",
      pinyin:
        "Zhìcǐ, nǐ yǐjīng shēngmíngliǎo MyButton, xiànzài bǎ tā qiàn tào dào lìng yīgè zǔjiàn zhōng",
      lit: "",
      en: "At this point, you have declared MyButton, now nest it into another component",
    },
  ],
};
