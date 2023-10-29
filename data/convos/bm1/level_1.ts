"use client";
export const lesson1 = {
  id: "lesson11",
  language: "zh",
  level: 1,
  course: "Beginner Mandarin",
  learnings: [
    {
      title: "Sections & Contexts",
      sortOrder: 1,
      types: ["section", "context"],
      values: [{ title: "Exchanging Greetings ", filter: "你好" }],
    },
    {
      title: "Goals",
      sortOrder: 2,
      types: ["goals", "greetings", "requests"],
      values: [
        { title: "Exchange basic greetings", filter: "你好" },
        {
          title: "Request a person’s name, and provide your own",
          filter: "名字",
        },
      ],
    },
    {
      title: "Forms & Accuracy",
      sortOrder: 3,
      types: ["verb", "adverb", "possessive particle", "questions"],
      values: [
        { title: "The verb 是 (shì)", filter: "是" },
        { title: "The adverb 很 (hěn)", filter: "很" },
        { title: "The verb 会 (huì)", filter: "会" },
        { title: "Possessive particle 的 (de)", filter: "的" },
        { title: "The verb 叫 (jiào)", filter: "叫" },
        { title: "Questions ending with 吗 (ma)", filter: "吗" },
        { title: "Questions ending with 呢 (ne)", filter: "呢" },
        { title: "The adverb 也 (yě)", filter: "也" },
      ],
    },
    {
      sortOrder: 4,
      title: "Culture Highlights",
      types: ["culture", "greetings", "chinese"],
      values: [{ title: "Greeting in Chinese" }],
    },
  ],
  location: "starbucks",
  author: "xiaoma",
  title: "1. 认识小伟 Rènshi Xiǎowěi (Meeting Xiaowei)",

  audio: {
    slow: "https://cdn.fs.teachablecdn.com/GolrgGjoQ3Cz3fqfGK92",
    fast: "https://cdn.fs.teachablecdn.com/RDSIyNCDTraTgFtqPe9v",
  },
  // audio: 'blob:http://localhost:4000/99be90c5-8eab-4604-8289-c2ba',
  video:
    "https://player.hotmart.com/embed/4qXd5gNPqv?signature=yrCRRwuehZEFuEijzKvnLcqwt-UuzbCPwuEBhSYT17OIsvZ4209eQLpb9xmjJWaGBhJfBA7kZdAh7H8g5y_DQNXeLym30nyFgsxDkVIVZlqULGtVzf9DLXTgYWqQlAxQRq9LRa2wt5kP5rgjkGx65YbNhwkacQtyeB7tV-2f1uI681iAhlZ4XBjSCAhgwoydpHWccDTrqAiodKpdHEoznYBkOHYaNCyk85QQn_Ria-HDcoWSqJTpJovoAmSvIO6dDNhWiWpKSvOyTYNdqXR913Tbs4H5HXVQ_JRnydQFncJQCkrlZLgC_zUBzdV5vUBoKjNU7cqBrpMRR_0DQfa2RQ==&token=aa2d356b-e2f0-45e8-9725-e0efc7b5d29c&user=93500610",

  lesson: [
    [
      ["time", [[0, 1.8, "你好!"]]],
      ["Cindy", " 你 好 ！"],
      ["Cindy", " Nǐhǎo!"],
      ["Cindy", " You-good!"],
      ["Cindy", " Hi!"],
    ],
    [
      ["time", [[1.8, 6, "你 好 ！ 你会说中文吗？"]]],
      ["咖啡师", "你 好 ！ 你 会 说 中文 吗 ？"],
      ["Kāfēi shī", " Nǐhǎo! Nǐ huì shuō Zhōngwén ma?"],
      ["Coffee master", " You-good! You can speak chinese question-particle?"],
      ["The barista", " Hello! Do you speak Chinese?"],
    ],
    [
      [
        "time",
        [
          [6, 8, "Wǒ huì yīdiǎndiǎn"],
          [8, 11, "Wǒ zài xuéxí Zhōngwén!"],
        ],
      ],
      ["Cindy", "我 会 一点点 。 我 在 学习 中文！"],
      ["Cindy", "Wǒ huì yīdiǎndiǎn. Wǒ zài xuéxí Zhōngwén!"],
      ["Cindy", "I can one-little-bit. I -ing learn Chinese!"],
      ["Cindy", "Yes, a little bit. I’m learning Chinese!"],
    ],
    [
      [
        "time",
        [
          [11, 13, "Nǐ shuōde hěn hǎo!"],
          [13.5, 16, "Nǐ hǎo ma?"],
        ],
      ],
      ["咖啡师", " 你 说得 很 好 ！  你 好 吗 ？"],
      ["Kāfēi shī", "Nǐ shuōde hěn hǎo! Nǐ hǎo ma?"],
      ["Coffee master", "You speak-of very good! You good question-particle?"],
      ["The Barista", "You speak it well! How are you?"],
    ],
    [
      [
        "time",
        [
          [16, 18, "Wǒ hěn hǎo"],
          [19, 20, "xièxiè! nǐ ne?"],
        ],
      ],
      ["Cindy", "我 很 好 ， 谢谢 !  你 呢 ？"],
      ["Cindy", "Wǒ hěn hǎo, xièxiè! nǐ ne?"],
      ["Cindy", "I very good, thank-thank! You what-about?"],
      ["Cindy", "I am good, thank you! And you?"],
    ],
    [
      [
        "time",
        [
          [20, 23, "Wǒ yě hěn hǎo, xièxiè!"],
          [23.5, 26.5, "Nǐ xūyào yī bēi kāfēi ma?"],
        ],
      ],
      ["咖啡师", "我 也 很 好 ， 谢谢 ！ 你 需要 一 杯 咖啡 吗 ?"],
      ["Kāfēi shī", "Wǒ yě hěn hǎo, xièxiè! Nǐ xūyào yī bēi kāfēi ma?"],
      [
        "Coffee-master",
        " I also very good, thank-thank you! You need one cup coffee question-particle?",
      ],
      ["The Barista", "I am great, thank you! Do you want a coffee?"],
    ],
    [
      ["time", [[26.5, 29.5]]],
      ["Cindy", "好 的 ， 谢谢 ！"],
      ["Cindy", "Hǎo de, xièxiè!"],
      ["Cindy", "Good of, thank-thank!!"],
      ["Cindy", "Yes! Thank you!"],
    ],
    [
      ["time", [[29.5, 32.5]]],
      ["咖啡师", "你 叫 什么 名字 ？"],
      ["Kāfēi shī", "Nǐ jiào shénme míngzì?"],
      ["Coffee master", "You are-called what name?"],
      ["The Barista", " What is your name?"],
    ],
    [
      [
        "time",
        [
          [32.5, 33.5],
          [33.5, 35.5],
          [35.5, 40],
        ],
      ],
      ["Cindy", "啊，我 叫 Cindy...... 你 叫 什么 名字 ？"],
      ["Cindy", "Ā, wǒ jiào Cindy... Nǐ jiào shénme míngzì?"],
      ["Cindy", "Ah, I am-called Cindy…You are-called what name?"],
      ["Cindy", "Ah, my name is Cindy…What is your name?"],
    ],
    [
      [
        "time",
        [
          [40, 42],
          [42.5, 45],
        ],
      ],
      ["咖啡师", "我 叫 小伟 ！ 这 是 你 的 咖啡 。"],
      ["Kāfēi shī", "Wǒ jiào Xiǎowěi! Zhè shì nǐ de kāfēi."],
      ["Coffee master", "I am-called Small-great! This is you of coffee."],
      ["The Barista", "My name is Xiaowei! Here is your coffee."],
    ],
    [
      [
        "time",
        [
          [45, 47.5],
          [47.5, 51],
        ],
      ],
      ["Cindy", "好 的 ,  谢谢 ！ 很 高兴 认识 你 ！"],
      ["Cindy", "Hǎode，xièxie！Hěn gāoxīng rènshí nǐ!"],
      ["Cindy", "Good-of, thank-thank! Very glad know you!"],
      ["Cindy", "Thank you! It’s nice to meet you!"],
    ],
    [
      ["time", [[51, 54]]],
      ["小伟", "我 也 很 高兴 认识 你 ！"],
      ["Xiǎowěi", " Wǒ yě hěn gāoxīng rènshí nǐ!"],
      ["Small-great", " I also very glad know you!"],
      ["Xiaowei", " It is nice to meet you too!"],
    ],
    [
      [
        "time",
        [
          [54, 55],
          [55, 58],
        ],
      ],
      ["Cindy", "嗯 ，这个 多少 钱 ？"],
      ["Cindy", "Èn,  zhège duōshǎo qián?"],
      ["Cindy", "Hm,  this how-much money?"],
      ["Cindy", "Mmmm, how much is it?"],
    ],
    [
      ["time", [[58, 61]]],
      ["小伟", "这个 是 免费 的 ！"],
      ["Xiǎowěi", " Zhègè shì miǎnfèi de!"],
      ["Small-great", " This is free of!"],
      ["Xiaowei", " It’s free! "],
    ],
    [
      [
        "time",
        [
          [61, 62.5],
          [62.5, 65.5],
        ],
      ],
      ["Cindy", "免费 的 ？ 非常 感谢 ！"],
      ["Cindy", "Miǎnfèi de? Fēicháng gǎnxiè!"],
      ["Cindy", "Free of? extremely thankful!"],
      ["Cindy", "Free? Thank you so much! "],
    ],
    [
      ["time", [[65.5, 69]]],
      ["小伟", "你 一个人 在 这儿 吗 ？"],
      ["Xiǎowěi", " Nǐ yīgèrén zài zhèr ma?"],
      ["Small-great", " You alone at here question-particle?"],
      ["Xiaowei", " Are you alone here?"],
    ],
    [
      [
        "time",
        [
          [69, 70],
          [70, 71.5],
          [72, 74.5],
          [75, 77.5],
          [78, 81],
        ],
      ],
      [
        "Cindy",
        " 嗯，是的 ，但 我 的 弟弟 快 来 了 ！我 现在 马上 要 走 了 ， 对不起  ！",
      ],
      [
        "Cindy",
        " Èn，shìde, dàn wǒ de dìdi kuài lái le! wǒ xiànzài mǎshàng yào zǒu le, duìbuqǐ!",
      ],
      [
        "Cindy",
        " Yes, but I of younger-brother soon come particle*! I now immediately must want walk particle*, sorry!",
      ],
      ["Cindy", " Yes, but my brother is coming soon! I must go now, sorry!"],
    ],
    [
      [
        "time",
        [
          [81, 82],
          [83, 86],
        ],
      ],
      ["小伟", "没关系 。再见 ！"],
      ["Xiǎowěi", " Méiguānxì. zàijiàn!"],
      ["Small-great", " It-doesn't-matter. Good-bye!"],
      ["Xiaowei", " No problem. Goodbye!"],
    ],
  ],
  exercises: [
    {
      id: "stsml/lesson1/q1",
      type: "blanks",
      title: "Choose the appropriate word to fill in the blank",
      options: ["在", "也", "叫", "会", "很"],
      exercises: [
        {
          id: "stsml/lesson1/q1/ex1",
          pinyin: "Wǒ _______ xué Zhōngwén",
          hanzi: "我 _______ 学 中文",
          en: "I am studying Chinese",
          answer: "在",
        },
        {
          id: "stsml/lesson1/q1/ex2",
          pinyin: "Wǒ _______ xiǎng yào yībēi kāfēi.",
          hanzi: "我 _______ 想 要 一杯 咖啡 ☕️",
          en: "I also want a cup of cup of coffee",
          answer: "也",
        },
        {
          id: "stsml/lesson1/q1/ex3",
          pinyin: "Wǒ _______ hǎo, xièxiè nǐ!",
          hanzi: "我 _______ 好 谢谢 你！",
          en: 'I am very good, thank you!',
          answer: "很",
        },
        {
          id: "stsml/lesson1/q1/ex4",
          pinyin: "Nǐ _______ shénme míngzi?",
          hanzi: "你 _______ 什么 名字",
          en: 'What is your name?',
          answer: "叫",
        },
        {
          id: "stsml/lesson1/q1/ex5",
          pinyin: "Wǒ _______ shuō zhōngwén.",
          hanzi: "我 _______ 说 中文",
          en: 'I can speak Chinese.',
          answer: "会",
        },
      ],
    },
  ],
};

const getHsk = (document: any) =>
  [...document.querySelectorAll("tr")].map(
    (item) => item.children[0].innerText.split("\n")[0]
  );

const calculateHsk = (res: any, lesson1: any) =>
  [
    // @ts-ignore
    ...new Set(
      lesson1.lesson
        .map((item: any) => item.map((i: any) => i[1]))
        .map((item: any) => item[1])
        .join("")
        .split("")
    ),
  ]
    .map((char) => (res.includes(char) ? char : null))
    .filter(Boolean);
