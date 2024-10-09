"use client"
import Link from "next/link"
import { Vortex } from "./ui/vortex"

const Hero = () => {
    return <div className="w-full mx-auto self-center rounded-md h-[87vh] overflow-hidden">
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
    >
      <h2 className="text-white text-5xl md:text-6xl font-bold text-center">
        Online Sharing made easy
      </h2>
      <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Share whatever you need, whenever you want.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Link 
            href={"/share"}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
          Share now
        </Link>
        <Link 
            href={"/retrieve"}
            className="px-4 py-2  text-white border rounded-lg shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
          Retrieve
        </Link>
      </div>
    </Vortex>
  </div>
}

export default Hero
