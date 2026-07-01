import {getUserData} from "../../actions/getUserData"
import {auth} from "../../../../lib/auth/server"
import {headers} from "next/headers"
import {saveCardAction} from "../../actions/saveCardAction"

/**
 * Decode a JWT payload without verification.
 * The session_data cookie is a JWT containing { session, user } fields.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = Buffer.from(parts[1], "base64url").toString("utf-8");
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

export async function POST(request: Request){
    const headerStore = await headers()
    const rawCookie = headerStore.get("cookie") || ""

    // 1. Try standard auth first
    const userData = await auth.getSession()
    let userEmail: string | undefined = userData?.data?.user?.email

    // 2. Fallback: if auth.getSession() can't validate (e.g. extension can't
    //    forward the session_token cookie), parse the session_data JWT directly.
    //    The extension CAN send __Secure-neon-auth.local.session_data which is
    //    a signed JWT containing the full user object.
    if (!userEmail) {
        console.log("auth.getSession() returned no user, trying session_data JWT fallback...")
        
        // Parse the session_data cookie from the raw Cookie header
        const cookies = Object.fromEntries(
            rawCookie.split(";").map(c => {
                const [name, ...rest] = c.trim().split("=");
                return [name, rest.join("=")];
            })
        );

        const sessionDataJwt = cookies["__Secure-neon-auth.local.session_data"];
        if (sessionDataJwt) {
            const payload = decodeJwtPayload(sessionDataJwt);
            console.log("Decoded session_data JWT:", JSON.stringify(payload, null, 2));

            if (payload) {
                const user = payload.user as { email?: string } | undefined;
                userEmail = user?.email;
                
                // Verify the session hasn't expired
                const session = payload.session as { expiresAt?: string } | undefined;
                if (session?.expiresAt && new Date(session.expiresAt) < new Date()) {
                    console.log("Session expired at:", session.expiresAt);
                    return Response.json({
                        success: false,
                        message: "Session expired, please log in again"
                    });
                }
            }
        }
    }

    if (!userEmail) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        });
    }

    console.log("Authenticated user email:", userEmail);

    const id = await getUserData(userEmail)
    if (!id) {
        return Response.json({
            success: false,
            message: "User not found in database"
        });
    }

    const body = await request.json();
    const { title, description, url, folderId } = body;
    console.log("Saving card:", { title, description, url, folderId });
    try{
      await saveCardAction(title, description, url, folderId)
    }catch{
      console.log("Failed to save the card")
    }

    return Response.json({
        success: true,
        userId: id,
        body,
    });
}