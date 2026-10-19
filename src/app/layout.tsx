import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Silkscreen } from "next/font/google"

import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Andante — a torre que se sobe sozinha",
  description:
    "Andante é um RPG idle de terminal: o andante sobe uma torre de 5 andares sozinho, enfrenta chefes, forja melhorias e recomeça mais forte. Jogue no navegador ou baixe o andante.py.",
  openGraph: {
    title: "Andante — idle RPG de terminal",
    description: "Uma torre, cinco chefes, nenhum clique obrigatório. Jogue no navegador, direto no terminal.",
    locale: "pt_BR",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0c0f",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`dark ${jetbrainsMono.variable} ${silkscreen.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden">
        <TooltipProvider>
          <Toaster>{children}</Toaster>
        </TooltipProvider>
        <div aria-hidden className="scanlines fixed inset-0 z-50" />
      </body>
    </html>
  )
}
