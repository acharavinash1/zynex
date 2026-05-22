import React, { useState } from 'react'
import { Calendar, ShieldAlert, Plus, HelpCircle, RefreshCw, Check, X, AlertTriangle } from 'lucide-react'

export default function TimetableVisualizer({ 
  timetable, 
  faculty, 
  classrooms, 
  setTimetable, 
  addLog, 
  triggerNotification 
}) {
  const [filterBatch, setFilterBatch] = useState('ALL')
  const [filterRoom, setFilterRoom] = useState('ALL')

  // Form states for adding slots
  const [showAddForm, setShowAddForm] = useState(false)
  const [formSubject, setFormSubject] = useState('')
  const [formTeacher, setFormTeacher] = useState('')
  const [formRoom, setFormRoom] = useState('')
  const [formDay, setFormDay] = useState('Monday')
  const [formTime, setFormTime] = useState('09:00 - 10:30')
  const [formBatch, setFormBatch] = useState('CSE-A')

  // Collision Warning states
  const [clashWarning, setClashWarning] = useState(null)
  const [suggestedResolution, setSuggestedResolution] = useState(null)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const slots = ['09:00 - 10:30', '11:00 - 12:30', '14:00 - 15:30']

  // Core Clash Detection Engine
  const checkConflicts = (newEvent) => {
    // 1. Room Overlap
    const roomClash = timetable.find(t => 
      t.day === newEvent.day && 
      t.time === newEvent.time && 
      t.room === newEvent.room && 
      t.id !== newEvent.id
    )
    if (roomClash) {
      return { type: 'room', desc: `Classroom ${newEvent.room} is already reserved by ${roomClash.subject} (${roomClash.teacher})` }
    }

    // 2. Faculty Overlap
    const teacherClash = timetable.find(t => 
      t.day === newEvent.day && 
      t.time === newEvent.time && 
      t.teacher === newEvent.teacher && 
      t.id !== newEvent.id
    )
    if (teacherClash) {
      return { type: 'teacher', desc: `${newEvent.teacher} is already scheduled in ${teacherClash.room} for ${teacherClash.subject}` }
    }

    // 3. Batch Overlap
    const batchClash = timetable.find(t => 
      t.day === newEvent.day && 
      t.time === newEvent.time && 
      t.batch === newEvent.batch && 
      t.id !== newEvent.id
    )
    if (batchClash) {
      return { type: 'batch', desc: `Student Batch ${newEvent.batch} already has ${batchClash.subject} in ${batchClash.room}` }
    }

    return null
  }

  // Handle slot submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formSubject || !formTeacher || !formRoom) {
      alert('Please fill out all fields.')
      return
    }

    const newEvent = {
      id: 'T-' + Date.now(),
      day: formDay,
      time: formTime,
      room: formRoom,
      subject: formSubject,
      teacher: formTeacher,
      batch: formBatch,
      conflict: false
    }

    const clash = checkConflicts(newEvent)
    if (clash) {
      setClashWarning({ clash, event: newEvent })
      addLog('Conflict Detection Agent', `CRITICAL CONSTRAINT MATCH: Rejected allocation for "${newEvent.subject}". Reason: ${clash.desc}`)
      triggerNotification('danger', `SCHEDULING CLASH: ${clash.desc}`)
      
      // Propose alternate resolution
      findAlternativeSlot(newEvent)
      return
    }

    // If clean, insert slot
    setTimetable(prev => [...prev, newEvent])
    addLog('Classroom Allocation Agent', `Allocated room ${newEvent.room} for ${newEvent.subject} (${newEvent.batch})`)
    triggerNotification('success', `Room allocated: ${newEvent.subject} in ${newEvent.room}`)
    
    // Reset Form
    resetForm()
  }

  const resetForm = () => {
    setShowAddForm(false)
    setFormSubject('')
    setFormTeacher('')
    setFormRoom('')
    setClashWarning(null)
    setSuggestedResolution(null)
  }

  // AI Alternative Finder Algorithm
  const findAlternativeSlot = (failedEvent) => {
    // Try to find another room that is vacant at the exact day/time
    const candidateRooms = classrooms.filter(c => c.status !== 'Under Maintenance')
    
    for (const room of candidateRooms) {
      const candidateEvent = { ...failedEvent, room: room.name }
      const hasClash = checkConflicts(candidateEvent)
      if (!hasClash) {
        setSuggestedResolution({
          type: 'room_swap',
          altRoom: room.name,
          desc: `Move ${failedEvent.subject} to ${room.name} (${room.type}, capacity: ${room.capacity})`
        })
        return
      }
    }

    // Otherwise, try to find another day/time slot for the same room
    for (const day of days) {
      for (const slot of slots) {
        const candidateEvent = { ...failedEvent, day, time: slot }
        const hasClash = checkConflicts(candidateEvent)
        if (!hasClash) {
          setSuggestedResolution({
            type: 'time_swap',
            altDay: day,
            altTime: slot,
            desc: `Reschedule ${failedEvent.subject} to ${day} at ${slot}`
          })
          return
        }
      }
    }

    setSuggestedResolution({
      type: 'none',
      desc: 'No automated resolution possible. Enforce manual override or override teacher.'
    })
  }

  // Apply resolution suggestion
  const applyResolution = () => {
    if (!clashWarning || !suggestedResolution) return

    let resolvedEvent = { ...clashWarning.event }
    if (suggestedResolution.type === 'room_swap') {
      resolvedEvent.room = suggestedResolution.altRoom
    } else if (suggestedResolution.type === 'time_swap') {
      resolvedEvent.day = suggestedResolution.altDay
      resolvedEvent.time = suggestedResolution.altTime
    } else {
      // Manual force override
      resolvedEvent.conflict = true
    }

    setTimetable(prev => [...prev, resolvedEvent])
    addLog('Conflict Detection Agent', `AI Mitigation Complete: Reallocated conflict to safe zone.`)
    triggerNotification('success', `CONFLICT RESOLVED: ${resolvedEvent.subject} has been rescheduled.`)
    resetForm()
  }

  // Delete a class
  const handleDelete = (id) => {
    setTimetable(prev => prev.filter(t => t.id !== id))
    addLog('Classroom Allocation Agent', 'Released scheduled room slot allocation.')
  }

  // Extract unique batches and rooms for filters
  const batches = ['CSE-A', 'CSE-B', 'ECE-A', 'ECE-B']
  const roomNames = classrooms.map(c => c.name)

  return (
    <div className="space-y-6">
      {/* Header and filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Campus Timetable Coordinator</h2>
          <p className="text-sm text-slate-400">View allocations, manage lectures, and run live constraint validation algorithms.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Batch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Batch:</span>
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="bg-slate-900 border border-cyber-border rounded-lg text-xs p-2 text-slate-300 focus:border-cyber-primary"
            >
              <option value="ALL">All Batches</option>
              {batches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Room Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Classroom:</span>
            <select
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
              className="bg-slate-900 border border-cyber-border rounded-lg text-xs p-2 text-slate-300 focus:border-cyber-primary"
            >
              <option value="ALL">All Classrooms</option>
              {roomNames.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyber-primary hover:bg-cyber-primary/95 text-white font-semibold text-xs transition-all shadow-neon-indigo"
          >
            <Plus className="w-4 h-4" />
            <span>Book Lecture</span>
          </button>
        </div>
      </div>

      {/* Clash Alert banner */}
      {clashWarning && (
        <div className="p-4 rounded-xl border border-cyber-danger/30 bg-cyber-danger/10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-cyber-danger mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-cyber-danger">INTELLIGENT CLASH INTERCEPTED</h4>
              <p className="text-xs text-slate-300 mt-1">{clashWarning.clash.desc}</p>
            </div>
          </div>
          {suggestedResolution && suggestedResolution.type !== 'none' && (
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="text-right hidden md:block">
                <span className="text-[10px] font-mono text-cyber-success block">SWARM HEURISTIC REMEDY</span>
                <span className="text-xs text-slate-200">{suggestedResolution.desc}</span>
              </div>
              <button
                onClick={applyResolution}
                className="w-full md:w-auto px-4 py-2 rounded bg-cyber-success hover:bg-cyber-success/90 text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>APPLY AI CORRECTION</span>
              </button>
              <button
                onClick={resetForm}
                className="p-2 rounded bg-slate-900 border border-cyber-border text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Calendar Timetable Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border overflow-x-auto">
        <div className="min-w-[800px] grid grid-cols-6 gap-4">
          {/* Grid corner header */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-cyber-border/40 font-mono text-[11px] font-bold text-slate-500 flex items-center justify-center">
            TIME SLOTS
          </div>
          
          {/* Days headers */}
          {days.map(d => (
            <div key={d} className="p-3 bg-slate-950/60 rounded-xl border border-cyber-border/40 text-center font-bold text-xs text-slate-200 font-mono">
              {d.toUpperCase()}
            </div>
          ))}

          {/* Core slots rows */}
          {slots.map(slotTime => (
            <React.Fragment key={slotTime}>
              {/* Row Time header */}
              <div className="p-4 bg-slate-900/40 rounded-xl border border-cyber-border/20 font-mono text-[10px] font-semibold text-cyber-accent flex flex-col justify-center items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{slotTime}</span>
              </div>

              {/* Day cells */}
              {days.map(dayName => {
                // Fetch classes matching Day & Time
                const activeEvents = timetable.filter(t => 
                  t.day === dayName && 
                  t.time === slotTime &&
                  (filterBatch === 'ALL' || t.batch === filterBatch) &&
                  (filterRoom === 'ALL' || t.room === filterRoom)
                )

                return (
                  <div 
                    key={`${dayName}-${slotTime}`}
                    className="p-3.5 rounded-xl border border-cyber-border/20 bg-slate-950/30 min-h-[120px] flex flex-col gap-2 relative group hover:border-cyber-primary/40 transition-all duration-300"
                  >
                    {activeEvents.map(ev => (
                      <div 
                        key={ev.id}
                        className={`p-2.5 rounded-lg border flex flex-col justify-between h-full text-[11px] transition-all ${
                          ev.conflict 
                            ? 'bg-cyber-danger/10 border-cyber-danger text-cyber-danger shadow-neon-cyan' 
                            : 'bg-cyber-primary/5 border-cyber-primary/20 text-slate-200 hover:border-cyber-primary/60'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-extrabold text-[12px] text-white tracking-wide">{ev.subject}</span>
                            <button
                              onClick={() => handleDelete(ev.id)}
                              className="text-slate-500 hover:text-cyber-danger opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <p className="text-slate-400 mt-1 font-sans">{ev.teacher}</p>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between font-mono text-[9px]">
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-cyber-border text-cyber-accent font-semibold">{ev.room}</span>
                          <span className="text-slate-400">{ev.batch}</span>
                        </div>
                      </div>
                    ))}

                    {activeEvents.length === 0 && (
                      <div className="flex items-center justify-center h-full text-[10px] text-slate-600 font-mono italic">
                        VACANT
                      </div>
                    )}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Book Lecture Drawer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel-neon-indigo rounded-2xl p-6 shadow-glass border border-cyber-primary/30">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-cyber-border">
              <h3 className="font-bold text-base text-white font-mono flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyber-accent" />
                <span>BOOK LECTURE SLOT</span>
              </h3>
              <button 
                onClick={resetForm}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Subject Name</label>
                <input 
                  type="text" 
                  value={formSubject} 
                  onChange={(e) => setFormSubject(e.target.value)} 
                  placeholder="e.g. Artificial Intelligence" 
                  className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-white focus:border-cyber-primary"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Faculty Member</label>
                  <select 
                    value={formTeacher} 
                    onChange={(e) => setFormTeacher(e.target.value)} 
                    className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-slate-300 focus:border-cyber-primary"
                    required
                  >
                    <option value="">Select Faculty</option>
                    {faculty.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Classroom</label>
                  <select 
                    value={formRoom} 
                    onChange={(e) => setFormRoom(e.target.value)} 
                    className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-slate-300 focus:border-cyber-primary"
                    required
                  >
                    <option value="">Select Room</option>
                    {classrooms.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Day</label>
                  <select 
                    value={formDay} 
                    onChange={(e) => setFormDay(e.target.value)} 
                    className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-slate-300 focus:border-cyber-primary"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Time Slot</label>
                  <select 
                    value={formTime} 
                    onChange={(e) => setFormTime(e.target.value)} 
                    className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-slate-300 focus:border-cyber-primary"
                  >
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Student Batch</label>
                  <select 
                    value={formBatch} 
                    onChange={(e) => setFormBatch(e.target.value)} 
                    className="w-full bg-slate-950 border border-cyber-border rounded-lg p-2.5 text-slate-300 focus:border-cyber-primary"
                  >
                    {batches.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 rounded-lg border border-cyber-border hover:border-slate-400 text-slate-400 hover:text-white text-center font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-cyber-primary hover:bg-cyber-primary/90 text-white font-bold shadow-neon-indigo"
                >
                  Verify & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
