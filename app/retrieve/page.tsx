"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUrlFromCode } from "@/lib/action";

const Retrieve = () => {
  const [code, setCode] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [textContent, setTextContent] = useState<string | null>(null);

  const downloadAndShowFile = async () => {
    try {
      const url = await getUrlFromCode(code);
      if (!url) {
        console.log('Code not found');
        return;
      }
      setFileUrl(url);
      console.log(fileUrl)
      if (!url?.startsWith('https')) {
        setTextContent(url);
      }
      console.log(textContent)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileUrl;
      link.click();
    }
  };

  const handleCopyText = () => {
    if (textContent) {
      navigator.clipboard.writeText(textContent)
        .then(() => setIsCopied(true))
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <div className="flex justify-center bg-black w-screen pt-20">
      <Card className="p-6 max-w-[70vw]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Enter the code</p>
            <section className="flex gap-4">
              <Input 
                className="text-lg font-semibold border border-input rounded-md p-2"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button onClick={downloadAndShowFile}>
                Retrieve
              </Button>
            </section>
          </div>
          {textContent && (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold ">Text Content:</p>
              <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-[65vh] text-wrap ">
                {textContent}
              </pre>
              <Button onClick={handleCopyText} className="mt-2">{
                isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          )}
          {fileUrl && (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">File URL</p>
              <p className="text-sm">{fileUrl}</p>
              <Button onClick={handleDownload} className="text-sm text-blue-500 hover:underline">
                Download
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Retrieve;