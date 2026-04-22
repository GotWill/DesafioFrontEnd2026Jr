import { MessageSquare } from "lucide-react";

const ContentLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-brand flex-col justify-between p-12 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-light opacity-20" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-light opacity-10" />
      </div>

      <div className="hidden relative z-10 md:flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
          <MessageSquare className="w-5 h-5 text-brand" strokeWidth={2.5} />
        </div>
        <span className="text-white font-semibold text-lg tracking-wide font-sans">
          enContact
        </span>
      </div>

      <div className="relative z-10 space-y-6">
        <h1 className="text-4xl font-bold text-white leading-tight font-sans text-balance">
          Somos a enContact
        </h1>
        <p className="text-white text-base leading-relaxed font-sans">
          Acreditamos que um bom atendimento começa com algo simples, mas
          poderoso: respeito pelo tempo e pela confiança do cliente.
        </p>
        <p className="text-white text-sm leading-relaxed font-sans">
          Desenvolvemos uma plataforma completa para centralizar, organizar e
          agilizar o atendimento por e-mail e WhatsApp — garantindo que nenhuma
          mensagem se perca e que cada interação fortaleça o relacionamento com
          quem confia na sua marca.
        </p>

        <div className="space-y-4 pt-2">
          {[
            "Atendimento centralizado por e-mail e WhatsApp",
            "Nenhuma mensagem sem resposta",
            "O cliente como prioridade estratégica",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="text-white text-sm font-sans">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-white text-sm font-sans">
          &copy; {new Date().getFullYear()} enContact. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default ContentLeft;
