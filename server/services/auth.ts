import * as jose from "jose";
import type { Kysely } from "kysely";
import type { Tables } from "../database/tables";
import BaseService from "./base";

export async function getKeyPair(algorithm: string, priv: string, pub: string) {
  const privateKey = await jose.importPKCS8(priv, algorithm);
  const publicKey = await jose.importSPKI(pub, algorithm);

  return { algorithm, privateKey, publicKey };
}

export type KeyPair = Awaited<ReturnType<typeof getKeyPair>>;

export class AuthService extends BaseService {
  constructor(protected db: Kysely<Tables>, protected keyPair: KeyPair) {
    super(db);
  }

  public async createToken(userId: string, noExpire?: boolean) {
    const jwt = new jose.SignJWT()
      .setSubject(userId)
      .setIssuer("crosspad")
      .setIssuedAt()
      .setProtectedHeader({ alg: this.keyPair.algorithm });

    if (noExpire) {
      jwt.setExpirationTime("5y"); // Ustaw czas wygaśnięcia tylko jeśli token nie jest tokenem sesji
    } else {
      jwt.setExpirationTime("4h");
    }
    return jwt.sign(this.keyPair.privateKey);
  }

  public async verifyToken(token: string) {
    const { payload } = await jose.jwtVerify(token, this.keyPair.publicKey);

    if (!payload.sub || !payload.iat || !payload.exp) {
      throw new Error("Invalid token");
    }

    return {
      userId: payload.sub,
      issuedAt: payload.iat,
      expiresAt: payload.exp,
    };
  }

  public async verifyRequest(request: Request) {
    const cookie = request.headers.get("cookie");
    const sessionToken = this.extractSessionToken(cookie);

    if (!sessionToken) {
      return null;
    }

    const userSession = await this.verifyToken(sessionToken).catch(() => null);

    if (!userSession) {
      return null;
    }

    return userSession;
  }

  private extractSessionToken(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('login-session-token='));
    
    return sessionCookie ? sessionCookie.split('=')[1] : null;
  }
}
AuthService;
