"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(prevState: unknown, formData: FormData) {
  const response = await fetch(`${process.env.NEXT_API_URI}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    })
  });

  const json = await response.json();
  if (!json.result) return json;

  const cookieStore = await cookies()
  cookieStore.set("token", json.token);
  redirect("/shop");
}