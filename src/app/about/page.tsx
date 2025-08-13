// app/about/page.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <main className="flex max-w-7xl mx-auto mt-48 justify-center px-4">
      <div className="w-full space-y-8">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Sobre Nós</h1>
          <p className="text-muted-foreground">
            Conheça nossa história, missão e valores.
          </p>
        </div>

        <Separator />

        {/* Card principal */}
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Nossa Missão</CardTitle>
            <CardDescription>O que nos move todos os dias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Somos uma equipe apaixonada por tecnologia e inovação. Nosso
              objetivo é criar soluções digitais que impactem positivamente a
              vida das pessoas, unindo design, performance e funcionalidade.
            </p>
            <p>
              Com anos de experiência no mercado, trabalhamos com dedicação para
              entregar produtos de qualidade e oferecer suporte excepcional aos
              nossos clientes.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Inovação</Badge>
              <Badge variant="secondary">Qualidade</Badge>
              <Badge variant="secondary">Transparência</Badge>
              <Badge variant="secondary">Colaboração</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
