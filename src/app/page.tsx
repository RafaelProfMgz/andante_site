import { Classes } from "@/components/site/classes"
import { Download } from "@/components/site/download"
import { Hero } from "@/components/site/hero"
import { PlaySection } from "@/components/site/play-section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Systems } from "@/components/site/systems"
import { Tower } from "@/components/site/tower"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 sm:px-8">
        <Hero />
        <PlaySection />
        <Tower />
        <Systems />
        <Classes />
        <Download />
      </main>
      <SiteFooter />
    </>
  )
}
