import React, { useState } from 'react';
import { Header } from './components/Header';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import type { Feedback } from './types';
import { analyzeFeedback } from './services/geminiService';
import { supabase } from './services/supabaseCliente';

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddFeedback = async (name: string, rating: number, comment: string) => {
    setIsSubmitting(true);

    // Adiciona temporariamente o feedback na tela
    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      rating,
      comment,
      isLoadingAnalysis: true,
    };
    setFeedbacks(prev => [newFeedback, ...prev]);

    try {
      // 🔹 1. Faz análise de sentimento (Gemini)
      const analysis = await analyzeFeedback(comment);

      // 🔹 2. Salva no Supabase (usando os nomes corretos das colunas)
      const { data, error } = await supabase
        .from('avaliacoes')
        .insert([
          {
            nome: name,
            nota: rating,
            comentario: comment,
            criado_em: new Date(),
          },
        ])
        .select();

      if (error) {
        console.error('❌ Erro ao salvar no Supabase:', error);
      } else {
        console.log('✅ Feedback salvo no Supabase:', data);
      }

      // 🔹 3. Atualiza o estado com o resultado do Gemini
      setFeedbacks(prev =>
        prev.map(fb =>
          fb.id === newFeedback.id
            ? { ...fb, analysis, isLoadingAnalysis: false }
            : fb
        )
      );
    } catch (error) {
      console.error('Erro geral:', error);
      setFeedbacks(prev =>
        prev.map(fb =>
          fb.id === newFeedback.id
            ? { ...fb, error: 'Falha ao analisar o feedback.', isLoadingAnalysis: false }
            : fb
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <FeedbackForm onSubmit={handleAddFeedback} isSubmitting={isSubmitting} />
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </main>
    </div>
  );
};

export default App;
