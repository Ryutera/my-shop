"use server"

import { encodedRedirect } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { contentfulClient, contentfulManagementClient } from "@/lib/contentful"
import type { ProductFields, ProductFieldsSkeleton } from "@/lib/types"


export const signUpAction = async (formData: FormData) => {
  console.log(formData)

  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const name = formData.get("name")?.toString()

  const supabase = await createClient()
  const origin = (await headers()).get("origin")

  
  if (!email || !password) {
    return encodedRedirect("error", "/sign-up", "Email and password are required")
  }

  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/sign-up", error.message)
  } else {
    const user = await supabase.auth.getUser()

   
    const supabaseUserId = user.data.user?.id

    await prisma.user.create({
      data: {
        id: supabaseUserId,
        email: email,
        password: password,
        name: name || email, 
      },
    })

    return encodedRedirect("success", "/", "Thanks for signing up! Please check your email for a verification link.")
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString().trim() as string
  const password = formData.get("password")?.toString() as string

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("Login error", error)
    return encodedRedirect("error", "/sign-in", error.message)
  } else {
    console.log("Login successful", data)
  }

  return redirect("/")
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get("origin")
  const callbackUrl = formData.get("callbackUrl")?.toString()

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required")
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect("error", "/forgot-password", "Could not reset password")
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect("success", "/forgot-password", "Check your email for a link to reset your password.")
}


export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Password and confirm password are required")
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Passwords do not match")
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect("error", "/protected/reset-password", "Password update failed")
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated")
}


export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect("/")
}


//Get user information by user ID

export async function getUserWithId(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return data
}


// Get all products from Contentful

export async function getProducts() {
  const entries = await contentfulClient.getEntries({
    content_type: "clothes",
  })

  return entries.items
}

export type Product = ProductFields & { id: string }


// Get specific product by product ID

export async function getProduct(id: string): Promise<Product> {
  const entry = await contentfulClient.getEntry<ProductFieldsSkeleton>(id)

  return {
    id: entry.sys.id,
    ...entry.fields,
  }
}


export async function markProductAsSold(id: string) {
  try {
    const space = await contentfulManagementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment("master")
    const entry = await environment.getEntry(id)

    entry.fields.isSoldOut = { "en-US": true }

    const updatedEntry = await entry.update()
    await updatedEntry.publish() 

    return updatedEntry
  } catch (error) {
    console.error("Failed to mark product as sold:", error)
    throw error
  }
}




//Favorite
// Get favorite products list by user ID
export async function getFavoriteWithUserId(id: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId: id,
    },
  })

  return data
}


//  Add product to favorites
//  Adds product to currently logged-in user's favorites (with duplicate check)

export async function addFavoriteToDb(cmsItemId: string) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user?.id) return

  // Check if already added to favorites
  const existing = await prisma.favorite.findFirst({
    where: {
      userId: data.user.id,
      cmsItemId,
    },
  })

  // Create new entry only if not already added
  if (!existing) {
    await prisma.favorite.create({
      data: {
        userId: data.user.id,
        cmsItemId,
      },
    })
  }
}


// Remove product from favorites

export async function removeFavoriteFromDb(cmsItemId: string) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user?.id) return

  await prisma.favorite.deleteMany({
    where: {
      userId: data.user.id,
      cmsItemId,
    },
  })
}


//  Check if product is registered in favorites

export async function isFavoriteInDatabase(id: string, userData: any) {
  // Early return if userId doesn't exist
  // This prevents searching with only cmsItemId when userId is undefined
  // (otherwise null would never be returned, causing issues with heart icon toggle)
  const userId = userData?.identities[0].user_id

  if (!userId) return null

  const item = await prisma.favorite.findFirst({
    where: {
      userId: userId,
      cmsItemId: id,
    },
  })

  return item
}






//Cart


export async function addCartToDb(userId: string | undefined, id: string) {
  if (!userId) return null

  // Check if already added to cart
  const existing = await prisma.cartItem.findFirst({
    where: {
      userId: userId,
      cmsItemId: id,
    },
  })

  // Create new entry only if not already added
  if (!existing) {
    await prisma.cartItem.create({
      data: {
        userId: userId,
        cmsItemId: id,
      },
    })
  }

  return
}


//  Check if product is in cart
export async function isCartInDatabase(id: string, userId: any) {
  // Early return if userId doesn't exist
  // This prevents searching with only cmsItemId when userId is undefined
  if (!userId) return null

  const item = await prisma.cartItem.findFirst({
    where: {
      userId: userId,
      cmsItemId: id,
    },
  })

  return item
}

//  Get user's cart items list 
export async function getCartItemsInDb(id: string) {
  const items = await prisma.cartItem.findMany({
    where: {
      userId: id,
    },
  })

  return items
}


// Remove product from cart
export async function removeCartItemFromDB(userId: string, productId: string) {
  await prisma.cartItem.deleteMany({
    where: {
      userId,
      cmsItemId: productId,
    },
  })
}





// Get user's purchase history
// Sorted by creation date in descending order (latest purchases appear first)

export async function getPurchaseItemsIndb(userId: string) {
  const items = await prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return items
}
