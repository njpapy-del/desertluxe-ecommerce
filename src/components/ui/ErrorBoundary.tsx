'use client'

import React from 'react'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-4">
              Oops
            </p>
            <h1 className="font-serif text-3xl text-luxury-dark mb-4">
              Une erreur est survenue
            </h1>
            <p className="text-luxury-light font-sans text-sm mb-8 leading-relaxed">
              Cette page a rencontré un problème inattendu. Notre équipe a été notifiée.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-gold-500 text-white px-6 py-3 text-xs uppercase
                           tracking-[0.2em] font-sans hover:bg-gold-400 transition-colors"
              >
                Réessayer
              </button>
              <Link
                href="/"
                className="border border-luxury-dark text-luxury-dark px-6 py-3 text-xs
                           uppercase tracking-[0.2em] font-sans hover:bg-luxury-dark
                           hover:text-white transition-colors"
              >
                Accueil
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
