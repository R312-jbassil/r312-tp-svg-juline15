import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    try {
        const newUser = await pb.collection('users').create({
            email,
            password,
            passwordConfirm,
        });

        const authData = await pb.collection('users').authWithPassword(email, password);

        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        return new Response(JSON.stringify({ user: authData.record }), { status: 201 });
    } catch (err) {
        console.error("Erreur d'inscription :", err);
        return new Response(
            JSON.stringify({
                error: err?.message || "Erreur lors de la création du compte",
            }),
            { status: 400 }
        );
    }
};
