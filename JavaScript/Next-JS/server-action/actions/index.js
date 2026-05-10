"use server";

export async function createUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "All fields are required",
    };
  }

  console.log(email, password);

  return {
    success: true,
  };
}
