import React from 'react';

function tempoDesde(data) {
  const segundos = Math.floor((new Date() - new Date(data)) / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) return `${dias} dia${dias > 1 ? 's' : ''} atrás`;
  if (horas > 0) return `${horas} hora${horas > 1 ? 's' : ''} atrás`;
  if (minutos > 0) return `${minutos} minuto${minutos > 1 ? 's' : ''} atrás`;
  return 'agora mesmo';
}

export default function CaixaDeNotificacoes({ notificacoes }) {
  // Ordena as notificações por data, mais recentes primeiro
  const ordenadas = [...notificacoes].sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

  const EmotesPorAcao = {
    Album: "🧺",
    feedback: "🗨️",
  }


  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <h1 className="text-lg font-semibold mb-4">🔔 Notificações</h1>
      <ul className="space-y-4 text-sm text-gray-700">
        {ordenadas.filter((n) => n.topico !== 'Compra' &&  n.topico !=='Album').length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma notificação.</p>
        ) : (
          ordenadas.filter((n) => n.topico !== 'Compra' &&  n.topico !=='Album').map((n, index) => (
            <li key={index} className={`border-b pb-2 last:border-b-0 ${n.foiVisualizado ? 'opacity-50' : ''}`}>
              <p>
                <span className="text-2xl inline-block mr-1">
                  {EmotesPorAcao[n.topico]}
                </span>
                {n.acao}
              </p>
              <p className="text-xs text-gray-500 mt-1 ml-8">
                {n.local_acao} · {tempoDesde(n.data_criacao)}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
