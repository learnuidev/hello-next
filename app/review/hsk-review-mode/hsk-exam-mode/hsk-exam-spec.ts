interface IHskQuestion {}

interface IHskExam {
  title: string;
  hskLevel: number;
  questions: IHskQuestion[];
}
