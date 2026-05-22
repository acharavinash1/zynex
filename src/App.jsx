import React, { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Cpu, 
  Map, 
  Calendar, 
  GraduationCap, 
  MessageSquare, 
  Bell, 
  ShieldCheck, 
  Activity, 
  AlertTriangle,
  Users,
  Compass
} from 'lucide-react'
import Dashboard from './components/Dashboard'
import AgentSimulator from './components/AgentSimulator'
import CampusMap from './components/CampusMap'
import TimetableVisualizer from './components/TimetableVisualizer'
import Chatbot from './components/Chatbot'
import AnalyticsPanel from './components/AnalyticsPanel'
import ExamManager from './components/ExamManager'

// Mock Initial Databases
const initialClassrooms = [
  { id: '101', name: 'LH-101', type: 'Lecture Hall', capacity: 120, currentOccupancy: 85, status: 'Occupied', currentClass: 'Maths-101 (Prof. Rao)', acStatus: 'Normal', temp: 22, block: 'Block A' },
  { id: '102', name: 'LH-102', type: 'Lecture Hall', capacity: 90, currentOccupancy: 0, status: 'Free', currentClass: 'None', acStatus: 'Normal', temp: 21, block: 'Block A' },
  { id: '201', name: 'CS-Lab-A', type: 'Computer Lab', capacity: 60, currentOccupancy: 54, status: 'Occupied', currentClass: 'Compiler Design Lab', acStatus: 'Normal', temp: 20, block: 'Block B' },
  { id: '202', name: 'CS-Lab-B', type: 'Computer Lab', capacity: 60, currentOccupancy: 0, status: 'Free', currentClass: 'None', acStatus: 'Normal', temp: 24, block: 'Block B' },
  { id: '301', name: 'Mech-Sem-Hall', type: 'Seminar Hall', capacity: 150, currentOccupancy: 0, status: 'Free', currentClass: 'None', acStatus: 'Faulty', temp: 26, block: 'Block C' },
  { id: '302', name: 'ECE-Lab', type: 'Electronics Lab', capacity: 45, currentOccupancy: 40, status: 'Occupied', currentClass: 'Embedded Systems Lab', acStatus: 'Normal', temp: 22, block: 'Block C' },
]

const initialFaculty = [
  { id: 'F01', name: 'Dr. Ramesh Sharma', department: 'CSE', maxHours: 16, currentHours: 12, status: 'Active', currentClass: 'Compiler Design Lab' },
  { id: 'F02', name: 'Prof. Sneha Verma', department: 'CSE', maxHours: 16, currentHours: 14, status: 'Active', currentClass: 'Data Structures' },
  { id: 'F03', name: 'Dr. Amit Patel', department: 'Mathematics', maxHours: 12, currentHours: 8, status: 'Active', currentClass: 'Maths-101' },
  { id: 'F04', name: 'Prof. Vikram Dave', department: 'ECE', maxHours: 16, currentHours: 15, status: 'Active', currentClass: 'Embedded Systems Lab' },
  { id: 'F05', name: 'Dr. Ananya Roy', department: 'CSE', maxHours: 14, currentHours: 6, status: 'Active', currentClass: 'None' },
]

const initialTimetable = [
  { id: 'T1', day: 'Monday', time: '09:00 - 10:30', room: 'LH-101', subject: 'Maths-101', teacher: 'Dr. Amit Patel', batch: 'CSE-A', conflict: false },
  { id: 'T2', day: 'Monday', time: '11:00 - 12:30', room: 'CS-Lab-A', subject: 'Compiler Design Lab', teacher: 'Dr. Ramesh Sharma', batch: 'CSE-B', conflict: false },
  { id: 'T3', day: 'Monday', time: '14:00 - 15:30', room: 'ECE-Lab', subject: 'Embedded Systems Lab', teacher: 'Prof. Vikram Dave', batch: 'ECE-A', conflict: false },
  { id: 'T4', day: 'Tuesday', time: '09:00 - 10:30', room: 'LH-102', subject: 'Data Structures', teacher: 'Prof. Sneha Verma', batch: 'CSE-A', conflict: false },
  { id: 'T5', day: 'Tuesday', time: '11:00 - 12:30', room: 'LH-101', subject: 'Maths-101', teacher: 'Dr. Amit Patel', batch: 'ECE-B', conflict: false },
  { id: 'T6', day: 'Wednesday', time: '09:00 - 10:30', room: 'LH-101', subject: 'Compiler Design', teacher: 'Dr. Ramesh Sharma', batch: 'CSE-A', conflict: false }
]

const initialLogs = [
  { timestamp: '10:14:22 AM', agent: 'System Monitor', text: 'EduSphere Core OS booted. Connecting multi-agent swarm...' },
  { timestamp: '10:14:23 AM', agent: 'Agent Registry', text: '8 Autonomous Agents loaded with custom prompt directives.' },
  { timestamp: '10:14:24 AM', agent: 'Classroom Allocation Agent', text: 'Scanned 6 active rooms in Block A, B & C. Energy-saver mode enabled on vacant halls.' },
  { timestamp: '10:15:01 AM', agent: 'Timetable Clash Agent', text: 'Clash scan completed. Current schedule is 100% Conflict-Free.' },
  { timestamp: '10:15:05 AM', agent: 'Analytics & Prediction Agent', text: 'Optimization score calculated: 94.2%. Campus load within normal margins.' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [classrooms, setClassrooms] = useState(initialClassrooms)
  const [faculty, setFaculty] = useState(initialFaculty)
  const [timetable, setTimetable] = useState(initialTimetable)
  const [logs, setLogs] = useState(initialLogs)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', text: 'EduSphere Swarm is live and scanning schedule.', read: false },
    { id: 2, type: 'warning', text: 'Mech Seminar Hall temperature is abnormal (26°C).', read: false }
  ])
  const [systemHealth, setSystemHealth] = useState(99.4)
  const [activeConflicts, setActiveConflicts] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  // Simulation clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Add agent log helper
  const addLog = (agent, text) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, agent, text }, ...prev.slice(0, 49)])
  }

  // Trigger alert helper
  const triggerNotification = (type, text) => {
    setNotifications(prev => [
      { id: Date.now(), type, text, read: false },
      ...prev
    ])
  }

  // Reset or run a dynamic mock conflict
  const injectScenario = (scenario) => {
    addLog('Emergency Agent', `Scenario Injected: "${scenario.name}"`)
    
    if (scenario.id === 'ac_failure') {
      // Set Mech Hall AC Faulty
      setClassrooms(prev => prev.map(c => 
        c.id === '301' ? { ...c, acStatus: 'Critical Failure', temp: 31 } : c
      ))
      triggerNotification('danger', 'CRITICAL: AC Failure in Mech Seminar Hall (31°C). Classroom Allocation Agent taking control...')
      
      // Simulating Agent swarms processing
      setTimeout(() => {
        addLog('Classroom Allocation Agent', 'Scanning for empty halls to reallocate Mech seminar...')
      }, 1000)
      setTimeout(() => {
        addLog('Conflict Detection Agent', 'Verifying free slot availability for Mech-Sem-Hall reallocation.')
      }, 2000)
      setTimeout(() => {
        addLog('Faculty Workload Agent', 'Confirming Dr. Ramesh Sharma availability for updated allocation.')
      }, 3000)
      setTimeout(() => {
        addLog('Notification Agent', 'SMS & WhatsApp alert broadcasts dispatched to Mech batch students.')
        triggerNotification('success', 'RESOLVED: Mech Seminar reallocated to CS-Lab-B. Students notified.')
        setClassrooms(prev => prev.map(c => 
          c.id === '301' ? { ...c, acStatus: 'Faulty', status: 'Under Maintenance' } : 
          c.id === '202' ? { ...c, status: 'Occupied', currentClass: 'Mech Seminar (Reallocated)' } : c
        ))
      }, 4500)
    }

    if (scenario.id === 'faculty_sick') {
      // Set Sneha Verma sick
      setFaculty(prev => prev.map(f => 
        f.id === 'F02' ? { ...f, status: 'On Leave' } : f
      ))
      triggerNotification('danger', 'EMERGENCY: Prof. Sneha Verma reported sick. Rescheduling afternoon CSE classes.')
      
      setTimeout(() => {
        addLog('Emergency Rescheduling Agent', 'Analyzing Prof. Sneha Verma\'s schedule (T4: Data Structures at 09:00).')
      }, 1000)
      setTimeout(() => {
        addLog('Faculty Workload Agent', 'Searching for competent alternate faculty within CSE. Found: Dr. Ananya Roy (6 hours current load).')
      }, 2500)
      setTimeout(() => {
        // Reallocate timetable slot
        setTimetable(prev => prev.map(t => 
          t.subject === 'Data Structures' ? { ...t, teacher: 'Dr. Ananya Roy' } : t
        ))
        addLog('Conflict Detection Agent', 'Timetable slot reassignment completed. No scheduling clashes detected.')
      }, 4000)
      setTimeout(() => {
        addLog('Notification Agent', 'Dynamic timetable update sent to CSE-A batch dashboard and Dr. Ananya Roy.')
        triggerNotification('success', 'RESOLVED: Data Structures class reassigned to Dr. Ananya Roy.')
        setFaculty(prev => prev.map(f => 
          f.id === 'F05' ? { ...f, currentHours: 8, currentClass: 'Data Structures' } : f
        ))
      }, 5500)
    }

    if (scenario.id === 'clash_injection') {
      // Add a clashing event
      const clashingEvent = {
        id: 'T-CLASH',
        day: 'Monday',
        time: '09:00 - 10:30', // Clashes with T1
        room: 'LH-101', 
        subject: 'Compiler Design',
        teacher: 'Dr. Ramesh Sharma',
        batch: 'CSE-A',
        conflict: true
      }
      setTimetable(prev => [clashingEvent, ...prev])
      setActiveConflicts(1)
      setSystemHealth(82.4)
      triggerNotification('danger', 'CLASH DETECTED: LH-101 allocated for Maths-101 & Compiler Design simultaneously!')
      
      setTimeout(() => {
        addLog('Conflict Detection Agent', 'FLAGGED: Double allocation of room LH-101 at Mon 09:00.')
      }, 1000)
      setTimeout(() => {
        addLog('Classroom Allocation Agent', 'Searching alternate lecture halls with capacity > 80. Found: LH-102 (Vacant).')
      }, 2500)
      setTimeout(() => {
        // Resolve clash
        setTimetable(prev => prev.map(t => 
          t.id === 'T-CLASH' ? { ...t, room: 'LH-102', conflict: false } : t
        ))
        setActiveConflicts(0)
        setSystemHealth(99.4)
        addLog('Conflict Detection Agent', 'Double booking resolved. Compiler Design moved to LH-102.')
        triggerNotification('success', 'RESOLVED: Schedule conflict cleared. Compiler Design shifted to LH-102.')
      }, 4500)
    }
  }

  // Handle chatbot requests
  const handleChatbotAction = (action) => {
    if (action.type === 'schedule') {
      const newEvent = {
        id: 'T-CHAT-' + Date.now(),
        day: action.data.day || 'Wednesday',
        time: action.data.time || '11:00 - 12:30',
        room: action.data.room || 'LH-102',
        subject: action.data.subject || 'AI Seminar',
        teacher: action.data.teacher || 'Dr. Ananya Roy',
        batch: action.data.batch || 'CSE-C',
        conflict: false
      }
      setTimetable(prev => [...prev, newEvent])
      addLog('Student Assistant Chatbot Agent', `Interactive scheduling triggered: ${newEvent.subject} allocated in ${newEvent.room}`)
      triggerNotification('success', `SCHEDULED: ${newEvent.subject} set for ${newEvent.day} ${newEvent.time}`)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cyber-bg text-cyber-text">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-accent/10 blur-[120px] pointer-events-none"></div>
      
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-cyber-border flex flex-col z-20 holo-shimmer">
        {/* Branding header */}
        <div className="p-6 border-b border-cyber-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center shadow-neon-indigo animate-pulse-slow">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              EduSphere <span className="text-cyber-accent text-glow-cyan text-xs">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Campus Agent OS</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto stagger-children">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Control Center</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('agents')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'agents' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <Cpu className="w-5 h-5" />
            <span>AI Agent Swarm</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-cyber-primary/30 text-cyber-primary font-mono animate-pulse">8/8</span>
          </button>

          <button 
            onClick={() => setActiveTab('timetable')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'timetable' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Campus Timetable</span>
            {activeConflicts > 0 && (
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-cyber-danger/30 text-cyber-danger font-mono animate-bounce">!</span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('map')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'map' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <Map className="w-5 h-5" />
            <span>Classroom Monitor</span>
          </button>

          <button 
            onClick={() => setActiveTab('exams')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'exams' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Exam Hub</span>
          </button>

          <button 
            onClick={() => setActiveTab('chatbot')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'chatbot' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>NLP Coordinator</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'analytics' 
                ? 'bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/15 text-white border-l-4 border-cyber-primary shadow-neon-indigo' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>Predictive Intelligence</span>
          </button>
        </nav>

        {/* Sidebar Footer Widget - Live System Performance */}
        <div className="p-4 border-t border-cyber-border m-3 rounded-xl bg-slate-950/40">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-cyber-success" />
            <span className="text-xs font-semibold text-slate-300">OS Security Engine</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-500">Scheduler Optimization</span>
              <span className="text-cyber-success">98.1%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-success" style={{ width: '98.1%' }}></div>
            </div>

            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-500">Faculty Overlap Probability</span>
              <span className="text-cyber-success">0.0%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-success" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Status Bar */}
        <header className="h-16 glass-panel border-b border-cyber-border px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-success animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-success absolute status-beacon"></span>
              <span className="text-xs font-semibold text-slate-300 font-mono tracking-wider">SWARM CONNECTED</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Sys Health: <strong className="text-cyber-accent text-glow-cyan">{systemHealth}%</strong></span>
              <span>•</span>
              <span>Conflicts: <strong className={activeConflicts > 0 ? "text-cyber-danger animate-pulse" : "text-cyber-success"}>{activeConflicts}</strong></span>
              <span>•</span>
              <span>Active Rooms: <strong className="text-white">6/6</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Real-time Clock display */}
            <div className="px-3 py-1 rounded-lg bg-slate-900 border border-cyber-border font-mono text-xs text-cyber-accent typing-cursor">
              {currentTime}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-cyber-border hover:border-cyber-primary flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyber-danger border-2 border-cyber-bg"></span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-panel-neon-indigo rounded-xl p-4 shadow-glass z-50 gradient-border animate-fade-in">
                  <div className="flex justify-between items-center border-b border-cyber-border pb-2 mb-2">
                    <h3 className="font-semibold text-xs text-slate-300 font-mono">Agent Dispatch Logs</h3>
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                        setShowNotifications(false)
                      }}
                      className="text-[10px] text-cyber-primary hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className="p-2.5 rounded bg-slate-950/60 border-l-2 border-cyber-primary text-xs">
                        <p className="text-slate-300 font-sans leading-relaxed">{notif.text}</p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-center text-slate-500 text-xs py-4">No new logs available</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-2 border-l border-cyber-border pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-200">Admin Control</p>
                <p className="text-[10px] text-slate-400 font-mono">Level 1 SEC-OP</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 overflow-y-auto p-6 relative hex-grid-bg">
          {activeTab === 'dashboard' && (
            <Dashboard 
              classrooms={classrooms} 
              faculty={faculty} 
              timetable={timetable} 
              logs={logs}
              systemHealth={systemHealth}
              activeConflicts={activeConflicts}
              injectScenario={injectScenario}
            />
          )}

          {activeTab === 'agents' && (
            <AgentSimulator 
              logs={logs} 
              injectScenario={injectScenario}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableVisualizer 
              timetable={timetable} 
              faculty={faculty} 
              classrooms={classrooms}
              setTimetable={setTimetable}
              addLog={addLog}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'map' && (
            <CampusMap 
              classrooms={classrooms}
            />
          )}

          {activeTab === 'exams' && (
            <ExamManager />
          )}

          {activeTab === 'chatbot' && (
            <Chatbot 
              onAction={handleChatbotAction}
              classrooms={classrooms}
              faculty={faculty}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPanel />
          )}
        </main>
      </div>
    </div>
  )
}
