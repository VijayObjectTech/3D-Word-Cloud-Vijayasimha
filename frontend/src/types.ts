export interface WordData {
    word: string;
    weight: number;
  }
  
  export interface AnalyzeResponse {
    words: WordData[];
    word_count: number;
  }