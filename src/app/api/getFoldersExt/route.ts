import {getUserFolders} from "../../actions/getUserFolders"
import {headers} from "next/headers"

/**
 * Decode a JWT payload without verification.
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

function getEmailFromSessionDataCookie(rawCookie: string): { email?: string; expired?: boolean } {
    const cookies = Object.fromEntries(
        rawCookie.split(";").map(c => {
            const [name, ...rest] = c.trim().split("=");
            return [name, rest.join("=")];
        })
    );

    const sessionDataJwt = cookies["__Secure-neon-auth.local.session_data"];
    if (!sessionDataJwt) return {};

    const payload = decodeJwtPayload(sessionDataJwt);
    if (!payload) return {};

    const session = payload.session as { expiresAt?: string } | undefined;
    if (session?.expiresAt && new Date(session.expiresAt) < new Date()) {
        return { expired: true };
    }

    const user = payload.user as { email?: string } | undefined;
    return { email: user?.email };
}

export async function GET(){
    const headerStore = await headers()
    const rawCookie = headerStore.get("cookie") || ""

    const { email, expired } = getEmailFromSessionDataCookie(rawCookie);

    if (expired) {
        return Response.json({ success: false, message: "Session expired" });
    }

    if (!email) {
        return Response.json({ success: false, message: "Not authenticated" });
    }

    const { folders, error } = await getUserFolders(email);

    if (error) {
        return Response.json({ success: false, message: error });
    }

    return Response.json({ success: true, folders });
}
