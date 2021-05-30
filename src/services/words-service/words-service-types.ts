export type Count = {
  count: number;
};
export type ServerError = {
  message: string;
};
export type Words = {
  words: VocabWord[];
  size?: number;
  page?: number;
};

export type Detail = {
  type: string;
  meaning: string;
  sentence: string;
  _id: string;
};

export type MCQ = {
  options: string[];
  answer: number;
};

export type VocabWord = {
  _id: string;
  word: string;
  isBookmarked: boolean;
  mcq: MCQ;
  details: Detail[];
};
