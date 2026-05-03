'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, RotateCcw } from 'lucide-react'
import type { ChatMessage } from '@/types'
import Image from 'next/image'

const SUGGESTED = [
  'Quel sac recommandes-tu pour une soirée à Dubaï ?',
  'Quels sont vos best sellers ?',
  "Quelle est votre politique de livraison ?",
  'Je cherche un cadeau luxe < 200€',
]

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Bonjour ! Je suis **Leila**, votre conseillère MA LUXURY. Comment puis-je vous aider aujourd'hui ? 🌟",
      createdAt: new Date(),
    },
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)
  const inputRef              = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: ChatMessage = {
      id:        Date.now().toString(),
      role:      'user',
      content,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.slice(-10).map((m) => ({
        role:    m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id:        `ai-${Date.now()}`,
          role:      'assistant',
          content:   data.reply || 'Désolée, je n\'ai pas pu répondre. Réessayez.',
          createdAt: new Date(),
          products:  data.products,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id:        `err-${Date.now()}`,
          role:      'assistant',
          content:   'Service momentanément indisponible. Contactez-nous sur WhatsApp.',
          createdAt: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Bonjour ! Je suis **Leila**, votre conseillère MA LUXURY. Comment puis-je vous aider aujourd'hui ? 🌟",
      createdAt: new Date(),
    }])
  }

  return (
    <>
      {/* ── Toggle button ────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-luxury-dark text-white
                   shadow-luxury-lg flex items-center justify-center
                   hover:bg-gold-500 transition-colors"
        aria-label="Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-ping" />
        )}
      </motion.button>

      {/* ── Chat panel ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-3rem)]
                       bg-white shadow-luxury-lg flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-luxury-dark text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 bg-gold-500 flex items-center justify-center text-white font-serif text-base">
                  L
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-luxury-dark" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-serif text-sm">Leila</p>
                    <Sparkles className="w-3 h-3 text-gold-400" />
                  </div>
                  <p className="text-[10px] text-cream-400 font-sans">Conseillère MA LUXURY · IA</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="p-1.5 text-cream-400 hover:text-white transition-colors"
                title="Nouvelle conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-gold-500 text-white font-serif text-xs
                                    flex items-center justify-center shrink-0 mt-1 mr-2">
                      L
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 text-sm font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-luxury-dark text-white'
                        : 'bg-cream-100 text-luxury-dark'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>'),
                    }}
                  />
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 bg-gold-500 text-white font-serif text-xs
                                  flex items-center justify-center shrink-0 mt-1 mr-2">
                    L
                  </div>
                  <div className="bg-cream-100 px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggested questions (only at start) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] font-sans border border-gold-300 text-gold-600
                               px-2.5 py-1 hover:bg-gold-50 transition-colors text-left
                               max-w-full truncate"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-cream-300 px-4 py-3 flex gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question..."
                disabled={loading}
                className="flex-1 text-sm font-sans px-3 py-2 border border-cream-300
                           focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none
                           transition-colors placeholder:text-luxury-light
                           disabled:opacity-60 bg-cream-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-gold-500 text-white flex items-center justify-center
                           hover:bg-gold-600 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
