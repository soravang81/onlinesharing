import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  getMetadata 
} from 'firebase/storage';
import { bucket } from './firebase';
import { addCodeWithExpiration, deleteFromDb, getUrlFromCode } from "./action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const EXPIRATION_TIME = 2 * 60 * 1000; // 30 minutes in milliseconds
const CLEANUP_INTERVAL = 15 * 60 * 1000; // Run cleanup every 15 minutes

// Cleanup function to delete expired files
export const cleanupExpiredFiles = async () => {
  try {
    const storageRef = ref(bucket);
    const listResult = await listAll(storageRef);
    
    for (const fileRef of listResult.items) {
      try {
        const metadata = await getMetadata(fileRef);
        const uploadTime = parseInt(metadata.customMetadata?.uploadTime || '0');
        
        if (Date.now() - uploadTime >= EXPIRATION_TIME) {
          await deleteObject(fileRef);
          await deleteFromDb(fileRef.name);
          console.log(`Cleaned up expired file: ${fileRef.fullPath}`);
        } else {
          console.log(`File ${fileRef.fullPath} is not expired yet.`);
        }
      } catch (error) {
        console.error(`Error processing file ${fileRef.fullPath}:`, error);
      }
    }
  } catch (error) {
    console.error("Error cleaning up expired files:", error);
  }
}

// Start periodic cleanup
if (typeof window !== 'undefined') {  // Only run in browser environment
  // Initial cleanup
  cleanupExpiredFiles();
  
  // Set up periodic cleanup
  setInterval(cleanupExpiredFiles, CLEANUP_INTERVAL);
}

export async function uploadImageAndGetCode(file: File) {
  try {
    console.log("Uploading image");
    const code = await getCode();
    const storageRef = ref(bucket, `${code}`);

    // Add metadata to the file
    const metadata = {
      customMetadata: {
        uploadTime: Date.now().toString(),
        expirationTime: (Date.now() + EXPIRATION_TIME).toString()
      }
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL);

    // Schedule individual file deletion
    setTimeout(async () => {
      try {
        await deleteObject(storageRef);
        await deleteFromDb(code);
        console.log(`File ${code} deleted after 30 minutes`);
      } catch (error) {
        console.error("Error deleting expired file:", error);
      }
    }, EXPIRATION_TIME);

    addCodeWithExpiration(code, downloadURL);
    return code;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export const getCode = async () => {
  return `${Math.random().toString(36).substr(2, 5)}`;
}

export const getImage = async (code: string) => {
  try {
    const url = await getUrlFromCode(code);
    
    // Check if the file has expired
    const storageRef = ref(bucket, code);
    try {
      const metadata = await getMetadata(storageRef);
      const uploadTime = parseInt(metadata.customMetadata?.uploadTime || '0');
      
      if (Date.now() - uploadTime >= EXPIRATION_TIME) {
        throw new Error("File has expired");
      }
      
      return url;
    } catch (error) {
      throw new Error("File not found or has expired");
    }
  } catch (error) {
    console.error("Error getting image:", error);
    throw error;
  }
}