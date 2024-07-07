export interface Questions {
  questions: Question[];
}

export interface Question {
  question_id: number;
  question_data: QuestionData;
}

export interface QuestionData {
  question: string;
  options: string[];
  passage_id: string;
  passage: string;
}
