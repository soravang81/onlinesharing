"use client"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
    return <div className=" w-full flex items-center z-20 justify-between px-60 py-2 sticky top-0 bg-black text-background">
        <div className="flex items-center gap-2">
            <div className="overflow-hidden">
                <img src="/onlinesharing.io.avif" alt="Logo" className="w-10 h-10  scale-150 m-auto border rounded-full" />
            </div>
            <Link href={"/"} className="text-2xl font-bold hover:cursor-pointer font-sans">Online-Share.io</Link>
        </div>
        <section>
            <Button onClick={()=>window.location.href = "/share"} variant={"ghost"}>Share</Button>
            <Button onClick={()=>window.location.href = "/retrieve"} variant={"ghost"}>Retrieve</Button>
        </section>
    </div>
}

export default Navbar