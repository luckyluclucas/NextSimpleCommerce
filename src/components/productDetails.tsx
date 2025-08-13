"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type MouseDetails = {
  sensor?: string;
  dpi?: number;
  wireless?: boolean;
  weight?: string;
  dimensions?: string;
  compatibility?: string;
};

type KeyboardDetails = {
  layout?: string;
  switches?: string;
  backlight?: boolean;
  weight?: string;
  dimensions?: string;
  compatibility?: string;
};

type Product = {
  id: number;
  name: string;
  type: "mouse" | "keyboard";
  description?: string;
  landingContent?: React.ReactNode; // Conteúdo HTML/JSX ilimitado
  mouseDetails?: MouseDetails;
  keyboardDetails?: KeyboardDetails;
};

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <Card className="w-full mx-auto bg-card-background">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{product.name}</span>
          <Badge variant="secondary" className="capitalize">
            {product.type}
          </Badge>
        </CardTitle>
        {product.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {product.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Accordion de detalhes */}
        <Accordion type="single" collapsible className="w-full">
          {product.type === "mouse" && product.mouseDetails && (
            <AccordionItem value="mouse-specs">
              <AccordionTrigger>Especificações do Mouse</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {product.mouseDetails.sensor && (
                    <li>Sensor: {product.mouseDetails.sensor}</li>
                  )}
                  {product.mouseDetails.dpi && (
                    <li>DPI: {product.mouseDetails.dpi}</li>
                  )}
                  {"wireless" in product.mouseDetails && (
                    <li>
                      Conexão:{" "}
                      {product.mouseDetails.wireless ? "Sem fio" : "Com fio"}
                    </li>
                  )}
                  {product.mouseDetails.weight && (
                    <li>Peso: {product.mouseDetails.weight}</li>
                  )}
                  {product.mouseDetails.dimensions && (
                    <li>Dimensões: {product.mouseDetails.dimensions}</li>
                  )}
                  {product.mouseDetails.compatibility && (
                    <li>
                      Compatibilidade: {product.mouseDetails.compatibility}
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {product.type === "keyboard" && product.keyboardDetails && (
            <AccordionItem value="keyboard-specs">
              <AccordionTrigger>Especificações do Teclado</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {product.keyboardDetails.layout && (
                    <li>Layout: {product.keyboardDetails.layout}</li>
                  )}
                  {product.keyboardDetails.switches && (
                    <li>Switches: {product.keyboardDetails.switches}</li>
                  )}
                  {"backlight" in product.keyboardDetails && (
                    <li>
                      Iluminação:{" "}
                      {product.keyboardDetails.backlight ? "Sim" : "Não"}
                    </li>
                  )}
                  {product.keyboardDetails.weight && (
                    <li>Peso: {product.keyboardDetails.weight}</li>
                  )}
                  {product.keyboardDetails.dimensions && (
                    <li>Dimensões: {product.keyboardDetails.dimensions}</li>
                  )}
                  {product.keyboardDetails.compatibility && (
                    <li>
                      Compatibilidade: {product.keyboardDetails.compatibility}
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        {/* Área expansível para landing page */}
        {product.landingContent && (
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Sobre o produto</h3>
            <div className="prose max-w-none">{product.landingContent}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
