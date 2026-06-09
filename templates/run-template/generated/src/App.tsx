import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>AgentOrchestrix App</h1>
        <p>Bem-vindo à sua aplicação React gerada com testes integrados.</p>
      </header>
      <section className="app-content">
        <button 
          className="btn-counter" 
          onClick={() => setCount((prev) => prev + 1)}
        >
          Cliques: {count}
        </button>
      </section>
    </main>
  )
}
