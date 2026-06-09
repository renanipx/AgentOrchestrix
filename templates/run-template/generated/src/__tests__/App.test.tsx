import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {
  it('renders the welcome heading and text', () => {
    render(<App />)
    
    const heading = screen.getByRole('heading', { name: /AgentOrchestrix App/i })
    expect(heading).toBeInTheDocument()
    
    const text = screen.getByText(/Bem-vindo à sua aplicação React gerada com testes integrados./i)
    expect(text).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<App />)
    
    const button = screen.getByRole('button', { name: /Cliques: 0/i })
    expect(button).toBeInTheDocument()
    
    fireEvent.click(button)
    
    expect(screen.getByRole('button', { name: /Cliques: 1/i })).toBeInTheDocument()
  })
})
