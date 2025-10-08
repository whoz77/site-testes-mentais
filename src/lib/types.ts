// Tipos para o sistema MindScale

export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  type?: 'logic' | 'pattern' | 'memory'
}

export interface AutismQuestion {
  id: number
  question: string
  scale: number // 1-4 (Discordo totalmente a Concordo totalmente)
}

export type ViewType = 'home' | 'iq-test' | 'autism-test' | 'iq-result' | 'autism-result' | 'payment'

export type TestType = 'iq' | 'autism'

export interface TestResult {
  score: number
  answers: number[]
  completedAt: Date
  testType: TestType
}

export interface PaymentStatus {
  isPaid: boolean
  paidAt?: Date
  transactionId?: string
}