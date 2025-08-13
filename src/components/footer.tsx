import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-muted/50 bg-background py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NextSimpleCommerce
        </p>

        <div className="flex space-x-6">
          <Link
            href="https://github.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://twitter.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://instagram.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
