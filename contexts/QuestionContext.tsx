import React, { createContext, useContext, useState } from 'react';

interface QuestionAnswers {
  screenTime: string;
  age: string;
  occupation: string;
}

interface QuestionContextType {
  answers: QuestionAnswers;
  setAnswer: (field: keyof QuestionAnswers, value: string) => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<QuestionAnswers>({
    screenTime: '',
    age: '',
    occupation: '',
  });

  const setAnswer = (field: keyof QuestionAnswers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <QuestionContext.Provider value={{ answers, setAnswer }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestion must be used within a QuestionProvider');
  }
  return context;
} 