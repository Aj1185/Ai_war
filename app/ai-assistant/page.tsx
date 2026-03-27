'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Navbar } from '@/components/navbar'
import { useRef, useEffect } from 'react'
import { Send, MessageCircle } from 'lucide-react'

function getUIMessageText(msg: any): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ''
  return msg.parts
    .filter((p: any) => p.type === 'text')
    .map((p: any) => p.text)
    .join('')
}

export default function AiAssistantPage() {
  const { messages, sendMessage, input, setInput, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput('')
    }
  }

  const suggestedQuestions = [
    'How do I register as a blood donor?',
    'What are the blood stock levels?',
    'Can you explain blood types?',
    'How often can I donate blood?',
    'What are the eligibility criteria for blood donation?',
    'How do I check emergency blood requests?',
  ]

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary-light rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">AI Assistant</h2>
              <p className="text-text-muted">Get help with blood donation information</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-lg border border-border flex flex-col overflow-hidden mb-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-secondary rounded-lg mb-4">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to AI Assistant</h3>
                <p className="text-text-muted mb-6 max-w-sm">
                  Ask me anything about blood donation, donor registration, or blood inventory management.
                </p>

                {/* Suggested Questions */}
                <div className="w-full">
                  <p className="text-sm font-medium text-text-muted mb-3">Suggested questions:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-secondary hover:border-primary transition-all text-sm text-foreground"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => {
                  const isUser = message.role === 'user'
                  const content = getUIMessageText(message)

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div
                        className={`max-w-md px-4 py-3 rounded-lg ${
                          isUser
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-secondary text-foreground rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {content}
                        </p>
                      </div>
                    </div>
                  )
                })}

                {status === 'streaming' && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-md px-4 py-3 rounded-lg bg-secondary text-foreground rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about blood donation..."
                disabled={status === 'streaming'}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary"
              />
              <button
                type="submit"
                disabled={status === 'streaming' || !input.trim()}
                className="p-2 bg-primary text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-xs text-text-muted">
          <p>AI Assistant is here to help. For critical emergencies, contact your local blood bank directly.</p>
        </div>
      </main>
    </div>
  )
}
