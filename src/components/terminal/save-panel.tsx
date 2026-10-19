"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import { DownloadIcon, Trash2Icon, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/toast"
import { AUTO_SAVE, clearSaves, looksLikeSave, readSave, subscribeSaves, summarize, writeSave } from "@/lib/saves"
import { requestStart } from "./terminal-events"

export function SavePanel() {
  const text = useSyncExternalStore(subscribeSaves, () => readSave(AUTO_SAVE), () => null)
  const save = summarize(text)
  const fileInput = useRef<HTMLInputElement>(null)
  const [confirming, setConfirming] = useState(false)

  const download = () => {
    if (!text) return
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }))
    a.download = AUTO_SAVE
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const importFile = async (file: File | undefined) => {
    if (!file) return
    const content = await file.text()
    if (!looksLikeSave(content)) {
      toast.add({ type: "error", title: "Arquivo não reconhecido", description: "Um save do Andante tem as linhas 'Nome:' e 'Classe:'." })
      return
    }
    writeSave(AUTO_SAVE, content)
    toast.add({ type: "success", title: "Save importado", description: `${summarize(content)?.nome} está pronto para continuar a torre.` })
    requestStart({ onlyIfRunning: true })
  }

  const erase = () => {
    setConfirming(false)
    clearSaves()
    toast.add({ title: "Save apagado", description: "O próximo andante começa do Porto." })
    requestStart({ onlyIfRunning: true })
  }

  return (
    <Card size="sm" className="mt-4">
      <CardHeader className="max-sm:flex max-sm:flex-col">
        <CardTitle className="font-sans text-sm">
          {save ? (
            <>
              Save neste navegador: <span className="text-primary">{save.nome}</span> · {save.classe} · Volta {save.volta} ·
              Andar {save.andar} · Nível {save.nivel}
            </>
          ) : (
            "Nenhum save ainda — seu andante nasce quando você ligar o terminal."
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          É o mesmo <code className="text-gold-soft">save_auto_idle.txt</code> do jogo de terminal: baixe aqui e continue no
          PC, ou importe o do PC e continue aqui.
        </CardDescription>
        <CardAction className="flex flex-wrap gap-2 max-sm:mt-2">
          <Button variant="outline" size="sm" disabled={!save} onClick={download}>
            <DownloadIcon data-icon="inline-start" /> Baixar save
          </Button>
          <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
            <UploadIcon data-icon="inline-start" /> Importar
          </Button>
          <input
            ref={fileInput}
            type="file"
            accept=".txt,text/plain"
            hidden
            onChange={(e) => { importFile(e.target.files?.[0]); e.target.value = "" }}
          />
          <AlertDialog open={confirming} onOpenChange={setConfirming}>
            <AlertDialogTrigger render={<Button variant="destructive" size="sm" disabled={!save} />}>
              <Trash2Icon data-icon="inline-start" /> Apagar
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-sans font-semibold">Apagar o save deste navegador?</AlertDialogTitle>
                <AlertDialogDescription>
                  {save?.nome} ({save?.classe}, nível {save?.nivel}) será perdido. Baixe o .txt antes se quiser guardar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={erase}>Apagar save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
