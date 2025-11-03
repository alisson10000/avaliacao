
export interface FeedbackAnalysis {
  summary: string;
  sentiment: 'Positivo' | 'Neutro' | 'Negativo';
}

export interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  analysis?: FeedbackAnalysis;
  isLoadingAnalysis: boolean;
  error?: string;
}
