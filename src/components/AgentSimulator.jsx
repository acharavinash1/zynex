import React, { useState, useEffect } from 'react'
import { Cpu, Send, ShieldAlert, Sparkles, Zap, Terminal, Play, Info } from 'lucide-react'

const agentsMetadata = [
  {
    id: 'classroom',
    name: 'Classroom Allocation Agent',
    role: 'Space Optimization Officer',
    goal: 'Maximize space fill-rate while minimizing energy footprint and respecting classroom capacities.',
    prompt: 'You are the Space Optimization Officer. Your role is to monitor physical rooms, review class enrollment numbers, and allocate the smallest adequate room. Activate standby climate modes when vacant.',
    color: '#06b6d4',
    x: 100, y: 150
  },
  {
    id: 'exam',
    name: 'Exam Scheduling Agent',
    role: 'Assessment Timetabler',
    goal: 'Generate stress-free, conflict-free midterm and final exam schedules across available exam halls.',
    prompt: 'You are the Assessment Timetabler. Ensure students do not have back-to-back exams, that exam halls have 1.5m social-density spaces, and map qualified teachers as invigilators.',
    color: '#3b82f6',
    x: 250, y: 80
  },
  {
    id: 'faculty',
    name: 'Faculty Workload Agent',
    role: 'Academic Labor Controller',
    goal: 'Ensure balanced teaching hours (max 16 hrs/week) and prevent burnout across departments.',
    prompt: 'You are the Academic Labor Controller. Monitor faculty credit loads. Flag any teacher exceeded 14 teaching hours. Prioritize assigning classes to qualified adjuncts with lower loads.',
    color: '#10b981',
    x: 400, y: 150
  },
  {
    id: 'conflict',
    name: 'Conflict Detection Agent',
    role: 'Double-Allocation Shield',
    goal: 'Intercept schedules before deployment and enforce rigid constraint integrity.',
    prompt: 'You are the Double-Allocation Shield. Constantly run deep overlapping matches across three vectors: Teacher overlaps, Room overlaps, and Batch overlaps. Reject scheduled overlaps instantly.',
    color: '#ef4444',
    x: 400, y: 310
  },
  {
    id: 'emergency',
    name: 'Emergency Rescheduling Agent',
    role: 'Incident Response Commander',
    goal: 'Resolve sudden operational outages (sick leave, AC failures) in under 5 seconds.',
    prompt: 'You are the Incident Response Commander. When an incident is flagged, evaluate alternative rooms and available faculty. Negotiate with other agents to swap schedules safely.',
    color: '#f59e0b',
    x: 250, y: 380
  },
  {
    id: 'analytics',
    name: 'Analytics & Prediction Agent',
    role: 'Campus Predictive Oracle',
    goal: 'Forecast room occupancy patterns and analyze overall scheduling structural efficiency.',
    prompt: 'You are the Campus Predictive Oracle. Mine historical attendance logs. Predict peak campus load days, and suggest proactive structural adjustments to improve class distribution.',
    color: '#a855f7',
    x: 100, y: 310
  },
  {
    id: 'chatbot',
    name: 'Student Assistant Chatbot',
    role: 'Natural Language Gateway',
    goal: 'Translate natural language queries into complex scheduling actions or direct information.',
    prompt: 'You are the Natural Language Gateway. Parse structured intents from informal dialogue (e.g., "reschedule Monday lab"). Deliver structured JSON requests to the orchestrator.',
    color: '#6366f1',
    x: 250, y: 230
  },
  {
    id: 'notification',
    name: 'Notification Agent',
    role: 'Multi-Channel Dispatcher',
    goal: 'Push instant schedule updates to academic dashboards, SMS, and messaging networks.',
    prompt: 'You are the Multi-Channel Dispatcher. Package rescheduling logs into clean readable notices. Dispatch instant WebSocket updates and hook SMS push gateways for emergency alerts.',
    color: '#ec4899',
    x: 550, y: 230
  }
]

export default function AgentSimulator({ logs, injectScenario }) {
  const [selectedAgent, setSelectedAgent] = useState(agentsMetadata[0])
  const [simulationState, setSimulationState] = useState('idle') // idle, running, finished
  const [activeStep, setActiveStep] = useState(-1)
  const [consoleLogs, setConsoleLogs] = useState([])

  // Simulated crisis flow steps
  const crisisSteps = [
    { 
      agentId: 'emergency', 
      title: 'Emergency Agent Alerted', 
      text: 'Incident Commander intercepting AC Fault inside Room 301. Initiating reallocation negotiation.', 
      highlightNode: 'emergency'
    },
    { 
      agentId: 'classroom', 
      title: 'Scanning Spaces', 
      text: 'Classroom Allocation Agent searching vacant halls. Filter: Block B Lab rooms. Result: CS-Lab-B (Vacant).', 
      highlightNode: 'classroom'
    },
    { 
      agentId: 'conflict', 
      title: 'Sanity Constraints Check', 
      text: 'Conflict Agent conducting triple-scan validation. CS-Lab-B is 100% free Monday afternoon. No overlaps.', 
      highlightNode: 'conflict'
    },
    { 
      agentId: 'faculty', 
      title: 'Faculty Assignment Guard', 
      text: 'Faculty Agent verifying alternate invigilator hours. Doctor Ramesh Sharma confirmed under-limit.', 
      highlightNode: 'faculty'
    },
    { 
      agentId: 'notification', 
      title: 'Dispatch Notices', 
      text: 'Notification Agent sending real-time WebSockets & Twilio SMS updates to 60 students and Prof. Sharma.', 
      highlightNode: 'notification'
    }
  ]

  // Launch simulated crisis visualization
  const runSimulation = () => {
    setSimulationState('running')
    setActiveStep(0)
    setConsoleLogs([`[10:32:01 AM] SYSTEM: Initializing Swarm Crisis Simulation: "Mech Seminar Hall AC Outage"`])
    
    // Inject the actual state change to App.jsx too!
    injectScenario({ id: 'ac_failure', name: 'Mech Hall AC Outage' })
  }

  useEffect(() => {
    if (simulationState !== 'running' || activeStep === -1) return

    if (activeStep < crisisSteps.length) {
      const timer = setTimeout(() => {
        const step = crisisSteps[activeStep]
        setConsoleLogs(prev => [
          `[10:32:${15 + activeStep * 8} AM] ${step.title.toUpperCase()}: ${step.text}`,
          ...prev
        ])
        
        // Auto-select active agent to show data
        const nextAgent = agentsMetadata.find(a => a.id === step.agentId)
        if (nextAgent) setSelectedAgent(nextAgent)

        setActiveStep(prev => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      setSimulationState('finished')
      setConsoleLogs(prev => [`[10:32:55 AM] SYSTEM: Crisis successfully mitigated by autonomous swarm in 4.5 seconds.`, ...prev])
    }
  }, [simulationState, activeStep])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">AI Agent Swarm Hub</h2>
          <p className="text-sm text-slate-400">Visualizing collaborative AI agent interactions, prompt structures, and decentralized negotiations.</p>
        </div>
        <div>
          <button
            onClick={runSimulation}
            disabled={simulationState === 'running'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:from-cyber-primary/90 hover:to-cyber-secondary/90 text-white font-bold font-mono text-xs shadow-neon-indigo transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {simulationState === 'running' ? 'MITIGATING CRISIS...' : 'INJECT MECH HALL OUTAGE'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Network Visualization */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyber-accent animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 font-mono">Live Swarm Mesh View</span>
          </div>

          <div className="absolute top-4 right-4 text-[10px] font-mono bg-slate-900 border border-cyber-border px-2.5 py-0.5 rounded text-slate-400">
            {simulationState === 'running' ? 'SIMULATION IN PROGRESS' : 'SWARM IDLE / SENSING'}
          </div>

          {/* Glowing orbital grid backdrop */}
          <div className="w-full max-w-[650px] aspect-[4/3] relative grid-bg border border-cyber-border/40 rounded-xl my-6 flex items-center justify-center overflow-hidden">
            
            {/* Pulsing visual orbits */}
            <div className="absolute w-[220px] h-[220px] rounded-full border border-cyber-primary/10 animate-pulse-slow"></div>
            <div className="absolute w-[380px] h-[380px] rounded-full border border-cyber-accent/5"></div>
            
            {/* SVG Connection Pathways */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Central hub connections to agents */}
              {agentsMetadata.map((agent) => {
                const isCentralChatbot = agent.id === 'chatbot'
                if (isCentralChatbot) return null

                // Determine path highlights based on active simulation step
                const isActivePath = 
                  simulationState === 'running' && 
                  activeStep < crisisSteps.length && 
                  (crisisSteps[activeStep]?.agentId === agent.id || crisisSteps[activeStep - 1]?.agentId === agent.id)

                return (
                  <g key={agent.id}>
                    <line
                      x1="250"
                      y1="230"
                      x2={agent.x}
                      y2={agent.y}
                      stroke={isActivePath ? '#6366f1' : 'rgba(99, 102, 241, 0.15)'}
                      strokeWidth={isActivePath ? 2.5 : 1.2}
                      className={isActivePath ? 'dash-path-active' : ''}
                    />
                    {/* Ring-bus path connecting all outer agents */}
                    {agentsMetadata.map((otherAgent) => {
                      if (otherAgent.id === 'chatbot' || otherAgent.id === agent.id) return null
                      // Draw adjacent links
                      const isLinked = 
                        (agent.id === 'classroom' && otherAgent.id === 'exam') ||
                        (agent.id === 'exam' && otherAgent.id === 'faculty') ||
                        (agent.id === 'faculty' && otherAgent.id === 'notification') ||
                        (agent.id === 'notification' && otherAgent.id === 'conflict') ||
                        (agent.id === 'conflict' && otherAgent.id === 'emergency') ||
                        (agent.id === 'emergency' && otherAgent.id === 'analytics') ||
                        (agent.id === 'analytics' && otherAgent.id === 'classroom')

                      if (!isLinked) return null

                      const isCrisisActivePath = 
                        simulationState === 'running' && 
                        activeStep < crisisSteps.length &&
                        ((crisisSteps[activeStep]?.agentId === agent.id && crisisSteps[activeStep - 1]?.agentId === otherAgent.id) ||
                         (crisisSteps[activeStep]?.agentId === otherAgent.id && crisisSteps[activeStep - 1]?.agentId === agent.id))

                      return (
                        <line
                          key={`${agent.id}-${otherAgent.id}`}
                          x1={agent.x}
                          y1={agent.y}
                          x2={otherAgent.x}
                          y2={otherAgent.y}
                          stroke={isCrisisActivePath ? '#06b6d4' : 'rgba(6, 182, 212, 0.08)'}
                          strokeWidth={isCrisisActivePath ? 3 : 1}
                          className={isCrisisActivePath ? 'dash-path-active' : ''}
                        />
                      )
                    })}
                  </g>
                )
              })}
            </svg>

            {/* Interactive Agent Nodes */}
            {agentsMetadata.map((agent) => {
              const isSelected = selectedAgent.id === agent.id
              const isSimActive = 
                simulationState === 'running' && 
                activeStep < crisisSteps.length && 
                crisisSteps[activeStep]?.agentId === agent.id

              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  style={{ left: `${agent.x - 28}px`, top: `${agent.y - 28}px` }}
                  className={`absolute w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 z-10 ${
                    isSimActive 
                      ? 'animate-bounce shadow-neon-indigo' 
                      : isSelected 
                      ? 'shadow-neon-cyan scale-110' 
                      : 'hover:scale-105'
                  }`}
                >
                  {/* Glowing background ring */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{ backgroundColor: agent.color }}
                  ></div>
                  <div 
                    className={`absolute inset-0 rounded-2xl border-2 ${
                      isSimActive 
                        ? 'border-white animate-pulse' 
                        : isSelected 
                        ? 'border-cyber-accent' 
                        : 'border-white/10'
                    }`}
                  ></div>

                  {/* Dynamic pulse rings if active */}
                  {isSimActive && (
                    <span 
                      className="agent-ring w-14 h-14" 
                      style={{ border: `3px solid ${agent.color}` }}
                    ></span>
                  )}

                  {/* Core Icon wrapper */}
                  <div className="relative z-10 text-white">
                    <Cpu 
                      className="w-6 h-6" 
                      style={{ color: isSimActive ? '#ffffff' : agent.color }}
                    />
                  </div>

                  {/* Small tag indicator */}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 font-semibold whitespace-nowrap bg-slate-950 px-1 rounded border border-cyber-border">
                    {agent.id === 'chatbot' ? 'CORE GATEWAY' : agent.name.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* High Tech Swarm Log Output */}
          <div className="w-full bg-slate-950/80 rounded-xl p-4 border border-cyber-border/80 font-mono text-[10px] h-36 overflow-y-auto leading-relaxed">
            <div className="flex items-center gap-2 text-cyber-accent mb-2 border-b border-cyber-border pb-1 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>SIMULATED MULTI-AGENT SWARM CHANNEL</span>
            </div>
            {consoleLogs.map((cl, i) => (
              <p key={i} className="text-slate-300 mb-1">{cl}</p>
            ))}
            {consoleLogs.length === 0 && (
              <p className="text-slate-500 italic">No simulator actions fired. Click "INJECT MECH HALL OUTAGE" to begin telemetry simulation.</p>
            )}
          </div>
        </div>

        {/* Right Column: Inspector Details Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cyber-border">
            <Info className="w-5 h-5 text-cyber-accent" />
            <h3 className="font-bold text-white tracking-wide">Agent Inspector</h3>
          </div>

          {selectedAgent ? (
            <div className="flex-1 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-cyber-accent border border-cyber-border uppercase font-semibold">
                  {selectedAgent.role}
                </span>
                <h4 className="text-base font-extrabold text-white mt-1.5">{selectedAgent.name}</h4>
              </div>

              {/* Goal section */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-cyber-border">
                <span className="font-mono text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">Decentralized Goal</span>
                <p className="text-slate-300 leading-relaxed font-sans">{selectedAgent.goal}</p>
              </div>

              {/* Prompts / ReAct System prompts */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-cyber-border flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">CrewAI System Directive</span>
                  <span className="text-[9px] font-mono text-cyber-primary">MEMORY ENABLED</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px] p-2 bg-slate-950 rounded border border-cyber-border/40 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {selectedAgent.prompt}
                </p>
              </div>

              {/* Collaborative partners */}
              <div>
                <span className="font-mono text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Direct Swarm Partners</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-cyber-border text-slate-400 font-mono">Student Chatbot</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-cyber-border text-slate-400 font-mono">Conflict Agent</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-cyber-border text-slate-400 font-mono">Notification Agent</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 italic text-center my-auto">Select any agent node on the swarm mesh to inspect details.</p>
          )}
        </div>
      </div>
    </div>
  )
}
