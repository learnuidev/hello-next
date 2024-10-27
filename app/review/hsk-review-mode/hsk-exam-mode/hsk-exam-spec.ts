interface IHSKQuestion {}

interface IHSKSectionPart {
  title: string;
  question?: string;
  questions?: IHSKQuestion[];
}

interface IHSKExamSection {
  title: string;
  type: string;
  parts: IHSKSectionPart[];
}

interface IHSKExam {
  title: string;
  duration: number;
  hskLevel: number;
  sections: IHSKExamSection[];
}

const hskSectionExample: IHSKExamSection = {
  title: "一、听 力",
  type: "listening",
  parts: [
    {
      title: "第 一 部 分",
      questions: [],
    },
  ],
};

const hskExamExample: IHSKExam = {
  title: "HSK 1 Sample Exam",
  duration: 45,
  hskLevel: 1,
  sections: [hskSectionExample],
};

const hsk2ExamExample: IHSKExam = {
  title: "HSK 2 Sample Exam",
  duration: 55,
  hskLevel: 2,
  sections: [
    {
      title: "一、听 力",
      type: "listening",
      parts: [
        {
          title: "第 一 部 分",
          questions: [
            {
              title: "我们家有三的人",
              imageUrl: "",
              type: "true-false",
              answerText: "我们家有三的人",
              answer: false,
            },
            {
              title: "我们家有三的人",
              imageUrl: "",
              type: "true-false",
              answer: false,
              answerText: "这是一个自行车",
            },
            {
              title: "我每天坐公共汽车去上班",
              type: "true-false",
              imageUrl: "",
              answer: false,
              answerText: "这是一个红番茄",
            },
          ],
        },
        {
          title: "第 二 部 分",
          question: "Match the Chinese phrases with their English meanings:",
          questions: [
            {
              title: "我们家有三的人",
              type: "true-false",
              answer: "我们家有三的人",
            },
            {
              title: "我们家有三的人",
              type: "true-false",
              answer: "这是一个自行车",
            },
            {
              title: "我每天坐公共汽车去上班",
              type: "true-false",
              answer: "这是一个红番茄",
            },
          ],
        },
      ],
    },
  ],
};
