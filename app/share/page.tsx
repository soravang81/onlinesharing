"use client"

import { useState } from "react"
import { Loader2, Upload, Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { uploadImageAndGetCode } from "@/lib/utils"
import { saveTextAndGetCode } from "@/lib/action"
import { ScrollArea } from "@/components/ui/scroll-area"



export default function Share() {
  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareResult, setShareResult] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleFileShare = async () => {
    setIsSharing(true)
    try {
      const result = await uploadImageAndGetCode(file!)
      setNote("Please be notified that the code will expire in 30 minutes.")
      setShareResult(result)
      setFile(null)
    } catch (error) {
      console.error("Sharing failed:", error)
      setShareResult("Sharing failed. Please try again.")
    }
    setIsSharing(false)
  }

  const handleTextShare = async () => {
    setIsSharing(true)
    try {
      const result = await saveTextAndGetCode(text)
      setShareResult(result)
      setText("")
    } catch (error) {
      console.error("Sharing failed:", error)
      setShareResult("Sharing failed. Please try again.")
    }
    setIsSharing(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareResult)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <ScrollArea className="h-[89vh]">
    <div className="bg-black h-full w-screen text-white">
      {/* <ShootingStars /> */}
      <div className="container mx-auto px-4 pt-20 relative">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
            Cosmic Share
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Share your content across the universe
          </p>
        </header>

        <div className="max-w-2xl mx-auto bg-slate-950 p-8 rounded-lg shadow-2xl text-white">
          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900 text-white">
              <TabsTrigger onClick={() => setShareResult("")} value="file">File</TabsTrigger>
              <TabsTrigger onClick={() => setShareResult("")} value="text">Text</TabsTrigger>
            </TabsList>
            <TabsContent value="file">
              <div className="space-y-4">
                <Label htmlFor="file" className="block text-sm font-medium ">
                  Select a file to share
                </Label>
                <div className="flex items-center">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    onClick={() => document.getElementById('file')?.click()}
                    variant="outline"
                    className="w-full border-2 text-black transition-colors"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {file ? file.name : "Choose File"}
                  </Button>
                </div>
              </div>
              <Button
                    onClick={handleFileShare}
                    disabled={isSharing || (!file && !text)}
                    className="w-full mt-8 bg-white text-black hover:bg-gray-800 transition-colors"
                >
                    {isSharing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transmitting to the cosmos...
                    </>
                    ) : (
                    "Share to the Stars"
                    )}
              </Button>
            </TabsContent>
            <TabsContent value="text">
              <div className="space-y-4">
                <Label htmlFor="text" className="block text-sm font-medium text-white">
                  Enter text to share
                </Label>
                <Textarea
                  id="text"
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={handleTextChange}
                  className="w-full border-2 border-gray-300 focus:border-black transition-colors"
                  rows={4}
                />
              </div>
              <Button
                onClick={handleTextShare}
                disabled={isSharing || (!file && !text)}
                className="w-full mt-8 bg-white text-black hover:bg-gray-800 transition-colors"
                >
                {isSharing ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transmitting to the cosmos...
                </>
                ) : (
                "Share to the Stars"
                )}
            </Button>
            </TabsContent>
          </Tabs>
          {shareResult && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Your Cosmic Code
              </Label>
              <div className="flex flex-col mt-2">
                {note && <p className="text-red-500">{note}</p>}
                <div className="flex ">
                <Input
                  value={shareResult}
                  readOnly
                  className="flex-grow bg-white text-black border-2 border-gray-300"
                />
                <Button onClick={handleCopy} className="ml-2 bg-black text-white hover:bg-gray-800">
                  {isCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </ScrollArea>
  )
}