import { Skeleton } from "@/components/ui/skeleton";

export function MessageItemSkeleton() {
  return (
    <div className="flex w-full h-[100px] gap-3 p-3 border-b-2 border-black dark:border-zinc-800">
      {/* Lado Esquerdo: Avatar/Checkbox Placeholder */}
      <div className="flex-shrink-0">
        <Skeleton className="h-12 w-12 rounded-full border-2 border-zinc-200 dark:border-zinc-700" />
      </div>

      {/* Lado Direito: Conteúdo Principal */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* Linha Superior: Nome e Data */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" /> {/* Nome */}
          <Skeleton className="h-3 w-16" /> {/* Data */}
        </div>

        {/* Linha do Meio: Badge e Assunto */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-5 w-5 rounded-full" /> {/* Badge Circular */}
            <Skeleton className="h-4 w-48" /> {/* Assunto/Subject */}
          </div>
          <Skeleton className="h-3 w-12" /> {/* Tempo (ex: -2 horas) */}
        </div>

        {/* Linha Inferior: Tag e Avatares de Usuários */}
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4" /> {/* Ícone da caixa */}
            <Skeleton className="h-3 w-24" /> {/* Texto "Caixa de entrada" */}
          </div>

          {/* Empilhamento de Avatares (Mock de 3 usuários) */}
          <div className="flex -space-x-2.5">
            <Skeleton className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-900" />
            <Skeleton className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-900" />
            <Skeleton className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
