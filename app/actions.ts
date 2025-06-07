"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { contentfulClient } from "@/lib/contentful";
import { ProductFields, ProductFieldsSkeleton } from "@/lib/types";

export const signUpAction = async (formData: FormData) => {
  console.log(formData)
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
     const user = await supabase.auth.getUser()
    //  subabaseのユーザーIDと紐づける
     const supabaseUserId = user.data.user?.id
    await prisma.user.create({
      data:{
        id:supabaseUserId,
        email:email,
        password:password,
        name:name || email
      }
  
      
    })
    return encodedRedirect(
      "success",
      "/",
      "Thanks for signing up! Please check your email for a verification link.",
    );
    
  }
};




export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString().trim() as string;
const password = formData.get("password")?.toString() as string; 

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("ログインエラー",error)
    return encodedRedirect("error", "/sign-in", error.message);
  }else{
    console.log("ログイン成功",data)
  }
  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
  
};


export async function getUserWithId (id:string) {
  const data = await prisma.user.findUnique({
    where:{
    id
    }
  })
return data
}



export async function getProducts() {
  const entries = await contentfulClient.getEntries({
    content_type: 'clothes', 
  });

  return entries.items;
}


export async function getProduct(id:string):Promise<ProductFields>{
  const entry = await contentfulClient.getEntry<ProductFieldsSkeleton>(id)
   
   return entry.fields
}



export async function addFavoriteToDb(cmsItemId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.id) return;

  await prisma.favorite.create({
    data: {
      userId: data.user.id,
      cmsItemId,
    },
  });
}

export async function removeFavoriteFromDb(cmsItemId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.id) return;

  await prisma.favorite.deleteMany({
    where: {
      userId: data.user.id,
      cmsItemId,
    },
  });
}

export async function  isFavoriteInDatabase(id:string,data:any){
  const item = await prisma.favorite.findFirst({
    where:{
      userId:data.identities[0].userId,
      cmsItemId:id
    }
  })
return item
}