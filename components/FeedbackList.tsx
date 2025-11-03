
import React from 'react';
import type { Feedback } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const StarDisplay: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const getSentimentChipClass = (sentiment: 'Positivo' | 'Neutro' | 'Negativo') => {
  switch (sentiment) {
    case 'Positivo':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Neutro':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Negativo':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  }
};


export const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Nenhum feedback ainda.</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Seja o primeiro a deixar um comentário!</p>
      </div>
    );
  }

  return (
    <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Feedbacks Recebidos</h2>
        <div className="space-y-4">
        {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{fb.name}</p>
                    </div>
                    <StarDisplay rating={fb.rating} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{fb.comment}"</p>
                
                <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-md">
                    <h4 className="font-semibold text-md text-gray-700 dark:text-gray-200 mb-2">Análise com IA</h4>
                    {fb.isLoadingAnalysis && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <LoadingSpinner />
                            <span>Analisando...</span>
                        </div>
                    )}
                    {fb.error && <p className="text-sm text-red-500 dark:text-red-400">{fb.error}</p>}
                    {fb.analysis && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getSentimentChipClass(fb.analysis.sentiment)}`}>
                                    {fb.analysis.sentiment}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{fb.analysis.summary}</p>
                        </div>
                    )}
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};
