// Constantes e dados dos testes MindScale

import { Question, AutismQuestion } from './types'

// Questões do teste de QI
export const IQ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Complete a sequência: 2, 4, 8, 16, ?",
    options: ["24", "32", "20", "28"],
    correct: 1,
    type: "logic"
  },
  {
    id: 2,
    question: "Qual número não pertence ao grupo: 3, 5, 7, 9, 11?",
    options: ["3", "9", "7", "11"],
    correct: 1,
    type: "logic"
  },
  {
    id: 3,
    question: "Se todos os A são B, e alguns B são C, então:",
    options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
    correct: 1,
    type: "logic"
  },
  {
    id: 4,
    question: "Complete: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "10", "12"],
    correct: 1,
    type: "pattern"
  },
  {
    id: 5,
    question: "Qual forma completa o padrão: ○ △ □ ○ △ ?",
    options: ["○", "□", "△", "◇"],
    correct: 1,
    type: "pattern"
  },
  {
    id: 6,
    question: "Se 3x + 7 = 22, então x é igual a:",
    options: ["5", "6", "4", "7"],
    correct: 0,
    type: "logic"
  },
  {
    id: 7,
    question: "Quantos triângulos você consegue ver na figura: △▲△?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    type: "memory"
  },
  {
    id: 8,
    question: "Complete a analogia: Livro está para Ler como Comida está para:",
    options: ["Cozinhar", "Comer", "Comprar", "Guardar"],
    correct: 1,
    type: "logic"
  },
  {
    id: 9,
    question: "Qual é o próximo número: 100, 50, 25, 12.5, ?",
    options: ["6.25", "6", "5", "7.5"],
    correct: 0,
    type: "pattern"
  },
  {
    id: 10,
    question: "Se você reorganizar as letras 'OCEAN', qual palavra pode formar?",
    options: ["CANOE", "DANCE", "CLEAN", "PLANE"],
    correct: 0,
    type: "memory"
  },
  {
    id: 11,
    question: "Qual número vem a seguir: 3, 7, 15, 31, ?",
    options: ["63", "47", "55", "39"],
    correct: 0,
    type: "pattern"
  },
  {
    id: 12,
    question: "Em uma corrida, você ultrapassou a pessoa em 2º lugar. Em que posição você está?",
    options: ["1º lugar", "2º lugar", "3º lugar", "Depende"],
    correct: 1,
    type: "logic"
  },
  {
    id: 13,
    question: "Complete: AZ, BY, CX, ?",
    options: ["DW", "EV", "FU", "DV"],
    correct: 0,
    type: "pattern"
  },
  {
    id: 14,
    question: "Quantos meses têm 28 dias?",
    options: ["1", "2", "11", "12"],
    correct: 3,
    type: "logic"
  },
  {
    id: 15,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correct: 0,
    type: "logic"
  },
  {
    id: 16,
    question: "Complete a sequência: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "35", "49"],
    correct: 1,
    type: "pattern"
  },
  {
    id: 17,
    question: "Qual é o oposto de 'sempre'?",
    options: ["Às vezes", "Nunca", "Raramente", "Frequentemente"],
    correct: 1,
    type: "logic"
  },
  {
    id: 18,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correct: 0,
    type: "logic"
  }
]

// Questões do teste de autismo (baseadas no AQ-10)
export const AUTISM_QUESTIONS: AutismQuestion[] = [
  { id: 1, question: "Prefiro fazer as coisas com outras pessoas do que sozinho(a)", scale: 0 },
  { id: 2, question: "Prefiro fazer as coisas da mesma maneira repetidamente", scale: 0 },
  { id: 3, question: "Se tento imaginar algo, acho fácil criar uma imagem na minha mente", scale: 0 },
  { id: 4, question: "Frequentemente fico tão absorvido(a) em uma coisa que perco de vista outras coisas", scale: 0 },
  { id: 5, question: "Frequentemente noto pequenos sons quando outros não notam", scale: 0 },
  { id: 6, question: "Costumo notar números de carros ou informações similares", scale: 0 },
  { id: 7, question: "Outras pessoas frequentemente me dizem que o que eu disse foi rude", scale: 0 },
  { id: 8, question: "Quando leio uma história, consigo facilmente imaginar como os personagens podem parecer", scale: 0 },
  { id: 9, question: "Sou fascinado(a) por datas", scale: 0 },
  { id: 10, question: "Em um grupo social, consigo facilmente acompanhar as conversas de várias pessoas", scale: 0 },
  { id: 11, question: "Acho situações sociais fáceis", scale: 0 },
  { id: 12, question: "Tendo a notar detalhes que outros não notam", scale: 0 },
  { id: 13, question: "Preferiria ir a uma biblioteca do que a uma festa", scale: 0 },
  { id: 14, question: "Acho fácil inventar histórias", scale: 0 },
  { id: 15, question: "Sinto-me mais atraído(a) por pessoas do que por coisas", scale: 0 },
  { id: 16, question: "Tendo a ter interesses muito fortes que fico chateado(a) se não posso perseguir", scale: 0 },
  { id: 17, question: "Gosto de conversas sociais casuais", scale: 0 },
  { id: 18, question: "Quando falo, nem sempre é fácil para outros conseguirem falar", scale: 0 },
  { id: 19, question: "Sou fascinado(a) por números", scale: 0 },
  { id: 20, question: "Quando leio uma história, acho difícil descobrir as intenções dos personagens", scale: 0 },
  { id: 21, question: "Não gosto muito de ler ficção", scale: 0 },
  { id: 22, question: "Acho difícil fazer novos amigos", scale: 0 },
  { id: 23, question: "Noto padrões em coisas o tempo todo", scale: 0 },
  { id: 24, question: "Preferiria ir ao teatro do que a um museu", scale: 0 },
  { id: 25, question: "Não me incomoda se minha rotina diária é interrompida", scale: 0 }
]

// Rótulos para as escalas de resposta do teste de autismo
export const AUTISM_SCALE_LABELS = [
  'Discordo totalmente',
  'Discordo',
  'Concordo',
  'Concordo totalmente'
]

// Configurações do aplicativo
export const APP_CONFIG = {
  PAYMENT_AMOUNT: 1.00,
  PAYMENT_CURRENCY: 'USD',
  STORAGE_KEYS: {
    IQ_ANSWERS: 'mindscale-iq-answers',
    AUTISM_ANSWERS: 'mindscale-autism-answers',
    PAYMENT_STATUS: 'mindscale-paid',
    LAST_TEST_DATE: 'mindscale-last-test'
  },
  ANIMATION_DURATION: 300,
  PAYMENT_SIMULATION_DELAY: 2000
}

// Mensagens motivacionais
export const MOTIVATIONAL_MESSAGES = [
  "Cada mente é única — descubra o poder da sua.",
  "O conhecimento de si mesmo é o início da sabedoria.",
  "Sua mente é um universo de possibilidades infinitas.",
  "A diversidade mental é a força da humanidade.",
  "Compreender-se é o primeiro passo para o crescimento."
]