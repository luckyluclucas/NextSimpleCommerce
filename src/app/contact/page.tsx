// app/contact/page.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex content-center items-center h-full max-w-7xl w-full mx-auto justify-center  px-4">
      <div className="w-full space-y-8 items-center">
        {/* Título */}
        <div className="text-center space-y-2 items-center">
          <h1 className="text-4xl font-bold tracking-tight">Contato</h1>
          <p className="text-muted-foreground">
            Fale conosco por e-mail ou WhatsApp. Estamos prontos para ajudar!
          </p>
        </div>

        <Separator />

        {/* Card principal */}
        <Card>
          <CardHeader>
            <CardTitle>Entre em Contato</CardTitle>
            <CardDescription>
              Escolha a forma mais conveniente para você
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <a href="mailto:contato@exemplo.com">
                <Mail className="w-5 h-5" />
                contato@exemplo.com
              </a>
            </Button>

            <Button
              asChild
              className="w-full justify-start gap-2 bg-green-500 hover:bg-green-600"
            >
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
