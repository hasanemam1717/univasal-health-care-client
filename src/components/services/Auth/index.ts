"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const patientRegisterService = async (userData: FieldValues) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-patient`,
      {
        method: "POST",
        headers: {
          "content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await response.json();
    console.log(response);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const adminRegisterService = async (userData: FieldValues) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-admin`,
      {
        method: "POST",
        headers: {
          "content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await response.json();
    console.log(response);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const loginService = async (userData: FieldValues) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await response.json();
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
