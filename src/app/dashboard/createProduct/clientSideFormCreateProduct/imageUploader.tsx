"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

type Props = {
  label: string;
  multiple?: boolean;
  onUploadSuccess: (urls: string[] | string) => void;
};

export default function ImageUploader({
  label,
  multiple,
  onUploadSuccess,
}: Props) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const uploads = await Promise.all(
      Array.from(files).map(async (file) => {
        // Solicita URL assinada
        const presigned = await axios.post("/api/upload-url", {
          filename: file.name,
          contentType: file.type,
        });

        // Upload direto para a CDN
        await axios.put(presigned.data.url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        // Retorna a URL pública
        return presigned.data.publicUrl;
      })
    );

    onUploadSuccess(multiple ? uploads : uploads[0]);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
