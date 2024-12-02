import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function getUser() {
    try {
        const session = await auth();
        const user = session?.user
        if (user) {
            const email = user?.email as string
            const existinguser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            return existinguser;
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
    }
}