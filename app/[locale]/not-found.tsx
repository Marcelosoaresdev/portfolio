import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Página não encontrada</p>
        <Link href="/pt-BR" className="mt-4 inline-block text-sm underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}