import Link from "next/link";
import { Logo } from "./Logo";
import { Phone, MessageCircle, MapPin } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-1">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Embalagens para floriculturas no atacado. Atendemos exclusivamente CNPJ em todo o Sul do Brasil.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Contato</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (47) 3000-0000</li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <a href="https://wa.me/message/DGJ56I645AGPD1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a>
            </li>
            <li className="flex items-center gap-2"><InstagramIcon className="h-4 w-4 text-primary" /> @jdfloreseplantas</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Rua Joaquim Couto, 209<br />Joinville — SC</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Links rápidos</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/produtos" className="hover:text-primary">Catálogo</Link></li>
            <li><Link href="/categorias" className="hover:text-primary">Categorias</Link></li>
            <li><Link href="/sobre" className="hover:text-primary">Sobre nós</Link></li>
            <li><Link href="/contato" className="hover:text-primary">Contato</Link></li>
            <li><Link href="/cadastro" className="hover:text-primary">Cadastro CNPJ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Atendimento</h4>
          <p className="text-sm text-muted-foreground">
            Segunda a sexta<br />
            08h às 18h<br /><br />
            Sábados<br />
            08h às 12h
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JD Flores e Plantas · Atacado de embalagens para floriculturas
      </div>
    </footer>
  );
}
