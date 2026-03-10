export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-black tracking-tighter text-red-600">
          APOIA<span className="text-white">.CLONE</span>
        </h1>
        <p className="text-zinc-400 text-xl max-w-lg mx-auto font-light">
          A plataforma de financiamento para criadores de Santa Catarina. 
          <br/><span className="text-zinc-500 text-sm italic">Desenvolvido por Henrique (PH)</span>
        </p>
        
        {/* Simulação de Barra de Progresso */}
        <div className="w-full max-w-md mx-auto bg-zinc-900 h-4 rounded-full mt-8 overflow-hidden border border-zinc-800">
          <div className="bg-red-600 h-full w-[65%] shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
        </div>
        <p className="text-sm text-zinc-500">Meta: R$ 6.500,00 de R$ 10.000,00</p>

        <div className="flex gap-4 justify-center pt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold transition-all shadow-lg shadow-red-900/20">
            Apoiar Projeto
          </button>
          <button className="border border-zinc-800 hover:bg-zinc-900 text-white px-10 py-4 rounded-lg font-bold transition-all">
            Ver Recompensas
          </button>
        </div>
      </div>
    </main>
  );
}