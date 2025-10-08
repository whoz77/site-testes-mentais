// Utilitários para o MindScale

import { Question, AutismQuestion } from './types'

/**
 * Calcula a pontuação do teste de QI
 */
export function calculateIQScore(answers: number[], questions: Question[]): number {
  const correct = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct ? 1 : 0)
  }, 0)
  return Math.round((correct / questions.length) * 100)
}

/**
 * Calcula a pontuação do teste de autismo
 */
export function calculateAutismScore(answers: number[]): number {
  const total = answers.reduce((acc, answer) => acc + answer, 0)
  return Math.round((total / (answers.length * 4)) * 100)
}

/**
 * Obtém interpretação do resultado de QI
 */
export function getIQInterpretation(score: number): string {
  if (score >= 90) return "Excelente desempenho"
  if (score >= 80) return "Acima da média"
  if (score >= 70) return "Bom resultado"
  if (score >= 60) return "Resultado médio"
  return "Abaixo da média"
}

/**
 * Obtém interpretação do resultado de autismo
 */
export function getAutismInterpretation(score: number): string {
  if (score >= 75) return "Alta correlação com traços autistas"
  if (score >= 50) return "Correlação moderada"
  if (score >= 25) return "Correlação leve"
  return "Baixa correlação"
}

/**
 * Formata data para exibição
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Salva dados no localStorage de forma segura
 */
export function saveToStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn('Erro ao salvar no localStorage:', error)
  }
}

/**
 * Carrega dados do localStorage de forma segura
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn('Erro ao carregar do localStorage:', error)
    return defaultValue
  }
}

/**
 * Simula processamento de pagamento
 */
export function simulatePayment(): Promise<{ success: boolean; transactionId: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
    }, 2000)
  })
}