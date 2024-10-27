interface IHSKQuestion {}

interface IHSKSectionPart {
  title: string;
  questions: IHSKQuestion[];
}

interface IHSKExamSection {
  title: string;
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
