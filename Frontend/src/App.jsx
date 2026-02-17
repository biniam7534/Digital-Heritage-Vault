import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#2b3844] font-sans selection:bg-primary-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                <span className="text-white font-display font-bold text-xl">D</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Digital Heritage <span className="text-primary-600">Vault</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="font-medium hover:text-primary-600 transition-colors">Explorer</a>
              <a href="#" className="font-medium hover:text-primary-600 transition-colors">Collections</a>
              <a href="#" className="font-medium hover:text-primary-600 transition-colors">About</a>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full text-primary-700 mb-8 border border-primary-100 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider">New artifacts discovered today</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 bg-gradient-to-r from-[#2b3844] via-primary-700 to-[#2b3844] bg-clip-text text-transparent leading-tight">
            Preserving History <br /> for the Digital Age
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            The Digital Heritage Vault is a community-driven platform dedicated to archiving, categorizing, and sharing our collective cultural treasures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto bg-[#2b3844] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2">
              Explore Collections
            </button>
            <button className="w-full sm:w-auto bg-white text-[#2b3844] border-2 border-primary-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-all active:scale-95">
              Submit Artifact
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-left mt-20">
            <div className="bg-white p-8 rounded-3xl border border-primary-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21V3m8 15L12 21l-8-7"></path></svg>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">Immutable Archiving</h3>
              <p className="text-slate-600 leading-relaxed">Every document is verified and stored with redundant backups across multiple global nodes.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-primary-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">Smart Discovery</h3>
              <p className="text-slate-600 leading-relaxed">AI-powered search and categorization helps you find history through visual and temporal mapping.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-primary-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">Community Driven</h3>
              <p className="text-slate-600 leading-relaxed">Collaborate with historians and enthusiasts worldwide to annotate and expand our collections.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Banner */}
      <div className="bg-[#2b3844] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold mb-2">500k+</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Artifacts</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold mb-2">120+</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Cultures</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold mb-2">2M+</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Contributors</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold mb-2">24/7</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Node Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
