"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";

const LoginFormSchema = z.object({
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData,
) {
    try {
        const { email, password } = LoginFormSchema.parse(
            Object.fromEntries(formData),
        );

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }

    redirect("/");
}

const SignupFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(20, { message: "Name must be at most 20 characters." }),
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }).max(100, { message: "Password must be at most 100 characters." }),
});

export async function register(
    prevState: any,
    formData: FormData,
) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error),
            message: "Missing Fields. Failed to Register.",
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        const existingUsers = await db
            .select()
            .from(users)
            .where(or(eq(users.email, email), eq(users.name, name)));

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.email === email) {
                return {
                    message: "Email already taken.",
                };
            }
            if (existingUser.name === name) {
                return {
                    message: "Name already taken.",
                };
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        });

    } catch (error) {
        return {
            message: "Database Error: Failed to Create User.",
        };
    }

    redirect("/login");
}
