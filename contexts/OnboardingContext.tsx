import React, { createContext, useContext, useState } from 'react';

interface OnboardingAnswers {
  screenTime: string;
  age: string;
  occupation: string;
}

interface OnboardingContextType {
  answers: OnboardingAnswers;
  setAnswer: (field: keyof OnboardingAnswers, value: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    screenTime: '',
    age: '',
    occupation: '',
  });

  const setAnswer = (field: keyof OnboardingAnswers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <OnboardingContext.Provider value={{ answers, setAnswer }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}