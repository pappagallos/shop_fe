"use server";

import { redirect } from "next/navigation";

export async function signUp(prevState: unknown, formData: FormData) {
  const response = await fetch(`${process.env.NEXT_API_URI}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string
    })
  });

  const json = await response.json();
  if (!json.result) return json;

  redirect("/signin");
}