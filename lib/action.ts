"use server"
import prisma from "@/db/db";

export async function addCodeWithExpiration(code: string, imageUrl: string) {
    try {
      await prisma.store.create({
        data: {
            code,
            value: imageUrl,
        },
      })
    } catch (error) {
        console.error(error)
    }
}
export const deleteFromDb = async (code: string) => {
    try {
        await prisma.store.delete({
            where: {
                code
            }
        })
    } catch (error) {
        console.error(error)
    }

}

export async function getUrlFromCode(code: string) {
  const store = await prisma.store.findFirst({
    where: {
      code,
    },
  })

  return store?.value
}

// Save text and get generated code
export const saveTextAndGetCode = async (text: string) => {
  const code = Math.random().toString(36).substr(2, 5);
  await addCodeWithExpiration(code, text);
  return code
}
