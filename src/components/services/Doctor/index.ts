"use server";

// services/userService.ts
export async function getDoctors() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/doctor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // If needed: credentials, auth tokens, etc.
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error("Failed to fetch user data");
    }
    return result;
  } catch (err) {
    console.log(err);
  }
}
