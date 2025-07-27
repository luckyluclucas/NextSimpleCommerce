"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FaStar, FaUpload } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";

type UploadedImage = {
  file: File;
  previewUrl: string;
  altText: string;
  isMain: boolean;
};

type Props = {
  onChange: (images: UploadedImage[]) => void;
};

export default function ImageUploaderCustom({ onChange }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      altText: "",
      isMain: false,
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    onChange(updated);
  };

  const updateAltText = (index: number, text: string) => {
    const updated = [...images];
    updated[index].altText = text;
    setImages(updated);
    onChange(updated);
  };

  const setAsMain = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isMain: i === index,
    }));
    setImages(updated);
    onChange(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      altText: "",
      isMain: false,
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <Label>Upload de Imagens</Label>

      <div
        className={clsx(
          "border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          ref={inputRef}
          className="hidden"
        />
        <Button
          variant="ghost"
          type="button"
          className="mx-auto flex flex-col items-center"
        >
          <FaUpload className="text-xl mb-1" />
          <span>Selecionar ou arrastar imagens</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {images.map((img, index) => (
          <div key={index} className="border rounded p-2 relative">
            <Image
              src={img.previewUrl}
              alt={img.altText || "preview"}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded"
            />
            <Input
              placeholder="Texto alternativo"
              value={img.altText}
              onChange={(e) => updateAltText(index, e.target.value)}
              className="mt-2"
            />

            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                variant={img.isMain ? "default" : "outline"}
                onClick={() => setAsMain(index)}
                className={clsx("text-sm", img.isMain && "bg-green-600")}
              >
                <FaStar className="mr-2 h-4 w-4" />
                {img.isMain ? "Principal" : "Definir como principal"}
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeImage(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
