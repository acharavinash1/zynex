import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Cpu, User, Sparkles, Check, ArrowRight, HelpCircle } from 'lucide-react'

export default function Chatbot({ onAction, classrooms, faculty }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Greetings. I am the Natural Language Coordination Gateway for EduSphere AI. You can submit requests in plain English, and I will orchestrate the agent swarm to execute scheduling, checks, or mitigations.',
      reasoning: null,
      actionCard: null
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Suggested prompt chips for fast demo click
  const promptChips = [
    { text: 'Schedule AI Seminar on Wednesday at 11:00 AM', type: 'schedule' },
    { text: 'Find an empty computer lab room for CSE-B', type: 'search' },
    { text: 'AC failed in Mech Seminar Hall room 301', type: 'ac_outage' },
    { text: 'Balance teaching hours across CSE department', type: 'balance' }
  ]

  // NLP parsing simulation
  const handleSendMessage = (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI parsing intent
    setTimeout(() => {
      let aiResponseText = ''
      let reasoningChain = []
      let actionCard = null
      
      const lowerText = text.toLowerCase()

      if (lowerText.includes('schedule') || lowerText.includes('seminar')) {
        // Schedule Intent
        reasoningChain = [
          'Intent parsed: INTENT_SCHEDULE_LECTURE',
          'Extracting parameters: Subject="AI Seminar", Batch="CSE-C", Time="Wednesday 11:00 - 12:30"',
          'Invoking classroom allocation agent to scan capacities...',
          'Found vacant hall: LH-102 (Capacity: 90, current: 0)',
          'Conflict agent verifying schedule integrity: No collisions found.',
          'Instructing database to commit new lecture bind.'
        ]
        aiResponseText = 'Understood. The Classroom Allocation Agent and Conflict Agent have negotiated. A slot has been successfully booked in the timetable database.'
        
        actionCard = {
          title: 'LECTURE ALLOCATION CONFIRMED',
          details: {
            Subject: 'AI Seminar',
            Classroom: 'LH-102',
            Day: 'Wednesday',
            Time: '11:00 - 12:30',
            Batch: 'CSE-C',
            Faculty: 'Dr. Ananya Roy'
          },
          actionType: 'schedule'
        }
      } else if (lowerText.includes('find') || lowerText.includes('empty') || lowerText.includes('lab')) {
        // Search Lab Intent
        reasoningChain = [
          'Intent parsed: INTENT_SEARCH_AVAILABILITY',
          'Scanning physical room telemetry grid (Filtering computers labs)...',
          'Found matching lab: CS-Lab-B is currently free (status: Free, capacity: 60)',
          'Generating recommendations...'
        ]
        aiResponseText = 'Scanning completed. The computer lab classroom CS-Lab-B in Block B is currently vacant and available for allocation. All HVAC units are running at optimal 24°C.'
        
        actionCard = {
          title: 'VACANT LAB AVAILABILITY',
          details: {
            'Available Lab': 'CS-Lab-B',
            Capacity: '60 computer systems',
            Block: 'Block B',
            Temp: '24°C',
            Status: 'Eco-Standby'
          },
          actionType: 'search'
        }
      } else if (lowerText.includes('ac') || lowerText.includes('fail') || lowerText.includes('301')) {
        // AC failure Intent
        reasoningChain = [
          'Intent parsed: INTENT_EMERGENCY_MITIGATION',
          'Filing Incident Log: HVAC System Fault in Mech Seminar Hall 301.',
          'Broadcasting status update to emergency rescheduling agent...',
          'Classroom reallocated to CS-Lab-B. Student notification alerts prepared.'
        ]
        aiResponseText = 'Emergency incident reported. Classroom Allocation Agent has shut down climate systems in Mech Seminar Hall to conserve electricity and reallocated ongoing slots. Check the Control Center for mitigation logs.'
        
        actionCard = {
          title: 'EMERGENCY AC REALLOCATION',
          details: {
            'Fault Room': 'Mech Seminar Hall (301)',
            Mitigation: 'HVAC powered down',
            'New Room': 'CS-Lab-B',
            'Status': 'Broadcast Dispatched'
          },
          actionType: 'notification'
        }
      } else {
        // General Chatbot assistance
        reasoningChain = [
          'Intent parsed: INTENT_GENERAL_FAQ',
          'Browsing academic system policies memory...',
          'Formulating conversational answer.'
        ]
        aiResponseText = 'I am scanning the campus databases. Faculty workloads are currently balanced at an average of 9.6 hours. The scheduler optimization metric stands at 94.2%. Let me know if you would like me to schedule a class, resolve a collision, or report a resource fault.'
      }

      setIsTyping(false)
      
      const newAiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        reasoning: reasoningChain,
        actionCard: actionCard
      }

      setMessages(prev => [...prev, newAiMessage])

      // If action is schedule, trigger actual parent state change!
      if (actionCard && actionCard.actionType === 'schedule') {
        onAction({
          type: 'schedule',
          data: {
            subject: actionCard.details.Subject,
            room: actionCard.details.Classroom,
            day: actionCard.details.Day,
            time: actionCard.details.Time,
            batch: actionCard.details.Batch,
            teacher: actionCard.details.Faculty
          }
        })
      }

    }, 2800)
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col glass-panel border border-cyber-border rounded-2xl overflow-hidden">
      {/* Bot Chat Header */}
      <div className="p-4 border-b border-cyber-border bg-slate-950/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center shadow-neon-indigo">
          <Cpu className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm text-white font-mono flex items-center gap-2">
            <span>NATURAL LANGUAGE GATEWAY</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyber-primary/20 text-cyber-primary animate-pulse font-sans">AGENT ONLINE</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans mt-0.5">Dual-layer intent parsing, semantic mappings, and autonomous execution hooks</p>
        </div>
      </div>

      {/* Message Feed Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-950/20">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex items-start gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Sender Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              msg.sender === 'user' 
                ? 'bg-cyber-accent text-slate-950' 
                : 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/45'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
            </div>

            {/* Bubble Container */}
            <div className="space-y-2">
              <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyber-accent/15 text-white border border-cyber-accent/30 rounded-tr-none'
                  : 'bg-slate-900/90 text-slate-200 border border-cyber-border rounded-tl-none shadow-neon-indigo/5'
              }`}>
                <p className="font-sans leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Show Multi-agent reasoning chain if available */}
              {msg.reasoning && msg.reasoning.length > 0 && (
                <div className="p-3.5 bg-slate-950 border border-cyber-border rounded-xl font-mono text-[10px] space-y-1.5 max-w-lg shadow-inner">
                  <div className="flex items-center gap-1.5 text-cyber-primary font-bold border-b border-cyber-border/40 pb-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-glow-indigo animate-pulse" />
                    <span>SWARM THINKING CHAIN (ReAct Pattern)</span>
                  </div>
                  {msg.reasoning.map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-slate-500">❯</span>
                      <span className="text-slate-300 leading-normal">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Confirm / Action card if available */}
              {msg.actionCard && (
                <div className="p-4 rounded-xl border border-cyber-success/30 bg-cyber-success/5 max-w-sm space-y-3 font-mono text-[11px] text-slate-300 shadow-neon-indigo/5">
                  <div className="flex items-center gap-1.5 text-cyber-success font-extrabold pb-1.5 border-b border-cyber-success/20">
                    <Check className="w-4 h-4" />
                    <span>{msg.actionCard.title}</span>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(msg.actionCard.details).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-500">{key}:</span>
                        <span className="text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between items-center text-[9px] text-slate-400">
                    <span>Database: MONGO_UPDATED</span>
                    <span className="text-cyber-success flex items-center gap-0.5">
                      Completed <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing placeholder animation */}
        {isTyping && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-cyber-primary/20 text-cyber-primary flex items-center justify-center border border-cyber-primary/45">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-cyber-border rounded-tl-none font-mono text-[10px] text-slate-500 animate-pulse">
              Parsing intent structures. Triggering agent negotiations...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Input Chips Widget */}
      <div className="px-6 py-3 border-t border-cyber-border bg-slate-950/40 flex flex-wrap gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Faq:</span>
        </span>
        {promptChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(chip.text)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyber-border hover:border-cyber-primary text-slate-300 hover:text-white transition-all text-[11px] font-medium"
          >
            {chip.text}
          </button>
        ))}
      </div>

      {/* Input Submit Box */}
      <div className="p-4 border-t border-cyber-border bg-slate-950/60">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(inputText)
          }}
          className="flex gap-3"
        >
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your natural language scheduling request... (e.g. 'Schedule AI Seminar on Wednesday')"
            className="flex-1 bg-slate-950 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white focus:border-cyber-primary"
          />
          <button 
            type="submit"
            className="w-12 h-12 rounded-xl bg-cyber-primary hover:bg-cyber-primary/95 text-white flex items-center justify-center shadow-neon-indigo transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
