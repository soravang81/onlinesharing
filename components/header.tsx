"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Download, MenuIcon, Share } from "lucide-react";

const Navbar = () => {
    return <><div className=" w-full flex items-center z-10 justify-between xl:px-60 lg:px-40 md:px-20 sm:px-8 px-2 py-2 sticky top-0 bg-black text-background">
        <div className="flex items-center gap-2">
            <div className="overflow-hidden w-10 h-10 rounded-full">
                <img src="/onlinesharing.io.avif" alt="Logo" className="w-full h-full object-cover scale-150" />
            </div>
            <Link href={"/"} className="text-2xl font-bold hover:cursor-pointer font-sans">Online-Sharing.io</Link>
        </div>
        <section className="sm:block hidden">
            <Button onClick={()=>window.location.href = "/share"} variant={"ghost"}>Share</Button>
            <Button onClick={()=>window.location.href = "/retrieve"} variant={"ghost"}>Retrieve</Button>
        </section>
        <div className="sm:hidden flex items-center">
            <DropdownMenu >
                <DropdownMenuTrigger asChild className="">
                    <MenuIcon size={30} className="text-white rounded-lg"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 self-start flex flex-col">
                <DropdownMenuItem className="p-0 " 
                >
                    <Link href="/share" className="flex items-center gap-2 p-2">
                    <Share/>
                    Share
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem className="p-0 " 
                >
                   
                   <Link href="/retrieve" className="flex items-center gap-2 p-2">
                    <Download/>
                    Retrieve
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
   
</>
}

export default Navbar