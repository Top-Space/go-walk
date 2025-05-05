import React, { createContext, useContext, useState } from 'react'

interface ReportAnswers {
    report1: string
    report2: string
    report3: string
    report4: string
}

interface ReportContextType {
    answers: ReportAnswers
    setAnswer: (field: keyof ReportAnswers, value: string) => void
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
    const [answers, setAnswers] = useState<ReportAnswers>({
        report1: '',
        report2: '',
        report3: '',
        report4: ''
    })

    const setAnswer = (field: keyof ReportAnswers, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    return <ReportContext.Provider value={{ answers, setAnswer }}>{children}</ReportContext.Provider>
}

export const useReport = () => {
    const context = useContext(ReportContext)

    if (context === undefined) {
        throw new Error('useReport must be used within a ReportProvider')
    }

    return context
}
