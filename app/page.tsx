'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [title, setTitle] = useState('')
  const [goal, setGoal] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<any[]>([])

  // 1. Busca as campanhas no banco
  async function fetchCampaigns() {
    const { data } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setCampaigns(data)
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  // 2. Envia a nova campanha
  async function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('campaigns')
      .insert([{ 
        title, 
        description, 
        goal_value: Number(goal) * 100, 
        current_value: 0 
      }])

    setLoading(false)

    if (error) {
      alert('Erro: ' + error.message)
    } else {
      setTitle(''); setGoal(''); setDescription('')
      fetchCampaigns() // Atualiza a lista na hora!
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 text-white p-10 font-sans">
      
      {/* FORMULÁRIO DE CRIAÇÃO */}
      <form onSubmit={handleCreateCampaign} className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800 space-y-4 mb-16 shadow-2xl">
        <h2 className="text-2xl font-black text-red-600 mb-6 tracking-tighter italic uppercase">Lançar Projeto</h2>
        <input type="text" placeholder="Título" className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:border-red-600 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Meta (R$)" className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:border-red-600 outline-none" value={goal} onChange={(e) => setGoal(e.target.value)} required />
        <textarea placeholder="Descrição curta do seu sonho..." className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg h-24 focus:border-red-600 outline-none resize-none" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-lg transition-all uppercase tracking-widest">
          {loading ? 'Processando...' : 'Colocar no Ar'}
        </button>
      </form>

      {/* LISTAGEM - ONDE O MAP ACONTECE */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((c) => {
          // Lógica de visualização dentro do loop
          const progress = Math.min((c.current_value / c.goal_value) * 100, 100);
          const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

          return (
            <div key={c.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-all group flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">{c.title}</h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-3">{c.description}</p>
              </div>
              
              <div className="space-y-4">
                {/* Barra de Progresso */}
                <div className="space-y-1">
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full transition-all duration-700 shadow-[0_0_10px_rgba(220,38,38,0.4)]" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">{progress.toFixed(0)}% Alcançado</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">Meta</span>
                    <span className="text-sm text-zinc-300">{BRL.format(c.goal_value / 100)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-red-900 font-bold uppercase tracking-tighter">Arrecadado</span>
                    <span className="text-red-500 font-black text-xl leading-none">{BRL.format(c.current_value / 100)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}