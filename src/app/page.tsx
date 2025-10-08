'use client'

import { useState, useEffect } from 'react'
import { Brain, Target, CheckCircle, ArrowRight, Home, HelpCircle, FileText, Menu, X } from 'lucide-react'

// Tipos para os testes
interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  type?: 'logic' | 'pattern' | 'memory'
}

interface AutismQuestion {
  id: number
  question: string
  scale: number // 1-4 (Discordo totalmente a Concordo totalmente)
}

// Dados dos testes
const iqQuestions: Question[] = [
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
  }
]

const autismQuestions: AutismQuestion[] = [
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
  { id: 20, question: "Quando leio uma história, acho difícil descobrir as intenções dos personagens", scale: 0 }
]

export default function MindScale() {
  const [currentView, setCurrentView] = useState<'home' | 'iq-test' | 'autism-test' | 'iq-result' | 'autism-result' | 'payment'>('home')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [iqAnswers, setIqAnswers] = useState<number[]>([])
  const [autismAnswers, setAutismAnswers] = useState<number[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [testType, setTestType] = useState<'iq' | 'autism'>('iq')
  const [showPayment, setShowPayment] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  // Carregar dados salvos
  useEffect(() => {
    const savedIqAnswers = localStorage.getItem('mindscale-iq-answers')
    const savedAutismAnswers = localStorage.getItem('mindscale-autism-answers')
    const paidStatus = localStorage.getItem('mindscale-paid')
    
    if (savedIqAnswers) setIqAnswers(JSON.parse(savedIqAnswers))
    if (savedAutismAnswers) setAutismAnswers(JSON.parse(savedAutismAnswers))
    if (paidStatus) setIsPaid(JSON.parse(paidStatus))
  }, [])

  const startIQTest = () => {
    setCurrentView('iq-test')
    setCurrentQuestion(0)
    setIqAnswers([])
    setTestType('iq')
  }

  const startAutismTest = () => {
    setCurrentView('autism-test')
    setCurrentQuestion(0)
    setAutismAnswers([])
    setTestType('autism')
  }

  const handleIQAnswer = (answerIndex: number) => {
    const newAnswers = [...iqAnswers, answerIndex]
    setIqAnswers(newAnswers)
    localStorage.setItem('mindscale-iq-answers', JSON.stringify(newAnswers))

    if (currentQuestion < iqQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setCurrentView('iq-result'), 500)
    }
  }

  const handleAutismAnswer = (scale: number) => {
    const newAnswers = [...autismAnswers, scale]
    setAutismAnswers(newAnswers)
    localStorage.setItem('mindscale-autism-answers', JSON.stringify(newAnswers))

    if (currentQuestion < autismQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setCurrentView('autism-result'), 500)
    }
  }

  const calculateIQScore = () => {
    const correct = iqAnswers.reduce((acc, answer, index) => {
      return acc + (answer === iqQuestions[index].correct ? 1 : 0)
    }, 0)
    return Math.round((correct / iqQuestions.length) * 100)
  }

  const calculateAutismScore = () => {
    const total = autismAnswers.reduce((acc, answer) => acc + answer, 0)
    return Math.round((total / (autismQuestions.length * 4)) * 100)
  }

  const handlePayment = () => {
    // Simular pagamento
    setShowPayment(true)
    setTimeout(() => {
      setIsPaid(true)
      localStorage.setItem('mindscale-paid', 'true')
      setShowPayment(false)
    }, 2000)
  }

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MindScale</span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </button>
            <span className="text-gray-700">Testes</span>
            <span className="text-gray-700">Ajuda</span>
            <span className="text-gray-700">Termos</span>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {setCurrentView('home'); setIsMenuOpen(false)}}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <Home className="w-4 h-4" />
                <span>Início</span>
              </button>
              <span className="text-gray-700">Testes</span>
              <span className="text-gray-700">Ajuda</span>
              <span className="text-gray-700">Termos</span>
            </nav>
          </div>
        )}
      </div>
    </header>
  )

  const Footer = () => (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Aviso Importante:</strong> Este site não fornece diagnóstico médico, apenas estimativas informativas. 
            Os resultados são para fins recreativos e educacionais. Consulte sempre um profissional qualificado para avaliações médicas ou psicológicas.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          © 2024 MindScale. Todos os direitos reservados. | Cada mente é única — descubra o poder da sua.
        </p>
      </div>
    </footer>
  )

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Mind<span className="text-blue-600">Scale</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-4">
                Testes Mentais Interativos
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Descubra mais sobre sua mente com nossos testes científicos interativos. 
                Explore seu QI e padrões de pensamento de forma divertida e informativa.
              </p>
            </div>

            {/* Test Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* IQ Test Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Teste de QI</h3>
                  <p className="text-gray-600 mb-6">
                    15 questões de lógica, padrões e raciocínio. Descubra seu potencial intelectual 
                    com perguntas cuidadosamente elaboradas.
                  </p>
                  <button
                    onClick={startIQTest}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Fazer Teste de QI</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Autism Test Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Teste de Traços Autistas</h3>
                  <p className="text-gray-600 mb-6">
                    20 questões baseadas em pesquisas científicas para identificar padrões 
                    de pensamento e comportamento únicos.
                  </p>
                  <button
                    onClick={startAutismTest}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Fazer Teste de Autismo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cientificamente Baseado</h4>
                <p className="text-gray-600 text-sm">Questões baseadas em metodologias reconhecidas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Resultados Precisos</h4>
                <p className="text-gray-600 text-sm">Análise detalhada do seu desempenho</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Interface Intuitiva</h4>
                <p className="text-gray-600 text-sm">Experiência fluida e envolvente</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (currentView === 'iq-test') {
    const progress = ((currentQuestion + 1) / iqQuestions.length) * 100
    const question = iqQuestions[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso do Teste</span>
                <span className="text-sm font-medium text-gray-700">{currentQuestion + 1}/{iqQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{currentQuestion + 1}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.question}</h2>
              </div>

              <div className="grid gap-4 max-w-2xl mx-auto">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleIQAnswer(index)}
                    className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-medium text-gray-900">{String.fromCharCode(65 + index)}. {option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (currentView === 'autism-test') {
    const progress = ((currentQuestion + 1) / autismQuestions.length) * 100
    const question = autismQuestions[currentQuestion]
    const scaleLabels = ['Discordo totalmente', 'Discordo', 'Concordo', 'Concordo totalmente']

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso do Teste</span>
                <span className="text-sm font-medium text-gray-700">{currentQuestion + 1}/{autismQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{currentQuestion + 1}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{question.question}</h2>
              </div>

              <div className="grid gap-3 max-w-2xl mx-auto">
                {scaleLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => handleAutismAnswer(index + 1)}
                    className="p-4 text-center border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-medium text-gray-900">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (currentView === 'iq-result') {
    const score = calculateIQScore()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Teste de QI Concluído!</h2>
              <p className="text-lg text-gray-600 mb-8">Parabéns por completar todas as questões!</p>
              
              {!isPaid ? (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                  <p className="text-lg text-gray-700 mb-4">
                    Seu resultado parece estar <strong>acima da média</strong> (~{score}% de precisão estimada)
                  </p>
                  <p className="text-gray-600 mb-6">
                    Quer ver sua pontuação completa, análise detalhada e gráfico de desempenho?
                  </p>
                  
                  {!showPayment ? (
                    <button
                      onClick={handlePayment}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                    >
                      Ver Resultado Completo por $1.00
                    </button>
                  ) : (
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Processando pagamento...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Seu Resultado Completo</h3>
                  <div className="text-6xl font-bold text-green-600 mb-4">{score}%</div>
                  <p className="text-lg text-gray-700 mb-4">
                    Você acertou {iqAnswers.filter((answer, index) => answer === iqQuestions[index].correct).length} de {iqQuestions.length} questões
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Análise por Categoria:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Lógica: Excelente desempenho</p>
                      <p>• Padrões: Acima da média</p>
                      <p>• Memória: Bom resultado</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Cada mente é única — descubra o poder da sua."
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors"
                >
                  Voltar ao Início
                </button>
                <button
                  onClick={startAutismTest}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
                >
                  Fazer Teste de Autismo
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  if (currentView === 'autism-result') {
    const score = calculateAutismScore()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Teste de Traços Autistas Concluído!</h2>
              <p className="text-lg text-gray-600 mb-8">Obrigado por completar todas as questões!</p>
              
              {!isPaid ? (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
                  <p className="text-lg text-gray-700 mb-4">
                    Seu padrão de respostas sugere uma <strong>tendência leve</strong> (~{score}% de correlação)
                  </p>
                  <p className="text-gray-600 mb-2">
                    Lembre-se: isso não é diagnóstico médico, apenas uma análise informativa.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Quer ver sua análise detalhada e interpretação completa?
                  </p>
                  
                  {!showPayment ? (
                    <button
                      onClick={handlePayment}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                    >
                      Ver Análise Detalhada ($1.00)
                    </button>
                  ) : (
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Processando pagamento...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sua Análise Completa</h3>
                  <div className="text-6xl font-bold text-emerald-600 mb-4">{score}%</div>
                  <p className="text-lg text-gray-700 mb-4">
                    Índice de correlação com traços do espectro autista
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Interpretação:</h4>
                    <div className="text-sm text-gray-600 space-y-1 text-left">
                      <p>• <strong>Comunicação Social:</strong> Padrão típico</p>
                      <p>• <strong>Interesses Específicos:</strong> Moderadamente focado</p>
                      <p>• <strong>Sensibilidade Sensorial:</strong> Dentro da média</p>
                      <p>• <strong>Flexibilidade:</strong> Boa adaptabilidade</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Cada mente é única — descubra o poder da sua."
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors"
                >
                  Voltar ao Início
                </button>
                <button
                  onClick={startIQTest}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Fazer Teste de QI
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return null
}