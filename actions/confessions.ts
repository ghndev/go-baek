"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { confessions } from "@/lib/db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const ConfessionSchema = z.object({
    content: z
        .string()
        .min(10, { message: "Confession must be at least 10 characters long." })
        .max(1000, { message: "Confession cannot exceed 1000 characters." }),
    useProfileName: z.boolean().optional(),
    customName: z.string().max(20, { message: "Name cannot exceed 20 characters." }).optional(),
});

export async function createConfession(prevState: any, formData: FormData) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return {
            message: "You must be logged in to share a secret.",
            success: false,
        };
    }

    // Check if "useProfileName" is present in formData (checkbox)
    // Checkbox value is 'on' if checked, null if not.
    const useProfileNameRaw = formData.get("useProfileName");
    const useProfileName = useProfileNameRaw === "on";

    const validatedFields = ConfessionSchema.safeParse({
        content: formData.get("content"),
        useProfileName: useProfileName,
        customName: formData.get("customName"),
    });

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error),
            message: "Please fix the errors below.",
        };
    }

    const { content, customName } = validatedFields.data;
    let senderName = "Anonymous";
    let finalUseProfileName = false;

    // Logic to determine senderName
    if (user && useProfileName) {
        // If logged in and chose to use profile name
        senderName = user.name || "Anonymous";
        finalUseProfileName = true;
    } else {
        // If not logged in OR chose not to use profile name
        // Use custom name if provided, otherwise remain "Anonymous"
        if (customName && customName.trim() !== "") {
            senderName = customName.trim();
        }
    }

    try {
        await db.insert(confessions).values({
            content,
            userId: user ? Number(user.id) : null,
            senderName,
            useProfileName: finalUseProfileName,
        });

        revalidatePath("/");

        return {
            message: "Confession shared successfully!",
            success: true,
        };

    } catch (error) {
        console.error("Failed to create confession:", error);
        return {
            message: "Database Error: Failed to save confession.",
            success: false
        };
    }
}
