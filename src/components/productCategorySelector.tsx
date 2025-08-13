"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  categories: string[];
  selectedCategories: string[];
  onChange: (val: string[]) => void;
};

export function ProductCategoriesSelector({
  categories,
  selectedCategories,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);

  function addCategory(category: string) {
    if (!selectedCategories.includes(category)) {
      onChange([...selectedCategories, category]);
    }
  }

  function removeCategory(category: string) {
    onChange(selectedCategories.filter((c) => c !== category));
  }

  // Filtra categorias já selecionadas da lista de opções
  const filteredCategories = categories.filter(
    (cat) => !selectedCategories.includes(cat)
  );

  return (
    <div>
      {/* Tags selecionadas */}
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <div
            key={category}
            className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
          >
            {category}
            <button
              type="button"
              onClick={() => removeCategory(category)}
              className="ml-2 flex items-center justify-center rounded-full p-1 hover:bg-blue-200"
              aria-label={`Remover categoria ${category}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            {selectedCategories.length > 0
              ? `${selectedCategories.length} selecionada(s)`
              : "Selecione categorias"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Buscar categoria..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
              <CommandGroup>
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => {
                      addCategory(category);
                      setOpen(false);
                    }}
                  >
                    {category}
                    <Check className="ml-auto opacity-0" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
