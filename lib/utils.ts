import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { bucket } from './firebase';
import { addCodeWithExpiration, getUrlFromCode } from "./action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function uploadImageAndGetCOde(file : File) {
  try {
    console.log("Uploading image")
    const code = await getCode()
    
    const storageRef = ref(bucket, `${code}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL);

    addCodeWithExpiration(code, downloadURL);
    // console.log("Code added:", codeMap);

    return code;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
export const getCode = async () => {
  return `${Math.random().toString(36).substr(2, 5)}`
}

export const getImage = (code:string) => {
  try {
    const url = getUrlFromCode(code);
    console.log(url)
    return url
  } catch (error) {
    console.error("Error getting image:", error);
    throw error;
  }
}
