// src/utils/jwt.ts
import * as jwt from 'jsonwebtoken';

export type JwtUserPayload = {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type ExpiresIn = jwt.SignOptions['expiresIn'];

function getSecret(): jwt.Secret {
  const secrect = process.env.JWT_ACCESS_SECRET;
  if (!secrect) throw new Error('JWT_ACCESS_SECRET is not set');
  return secrect;
}

function getExpiresIn(): ExpiresIn {
  return (process.env.JWT_ACCESS_EXPIRES as ExpiresIn) || '8h';
}

export function signAccessToken(u: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) {
  const payload: JwtUserPayload = {
    sub: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
  };
  return jwt.sign(payload, getSecret(), { expiresIn: getExpiresIn() });
}

export function decodeExpiry(token: string): Date {
  const decoded = jwt.decode(token) as jwt.JwtPayload | null;
  const expiry = decoded?.exp;
  if (!expiry) throw new Error('JWT missing exp');
  return new Date(expiry * 1000);
}

export function handleVerifyAccessToken(
  err: jwt.VerifyErrors | null,
  decoded: string | jwt.JwtPayload | undefined,
  onValidate:
    | ((isValid: boolean, payload: JwtUserPayload | null) => void)
    | undefined,
  resolve: (payload: JwtUserPayload | null) => void,
): void {
  const isValid = !err && !!decoded;
  const payload = isValid ? (decoded as JwtUserPayload) : null;

  if (onValidate) {
    onValidate(isValid, payload);
  }

  resolve(payload);
}

type VerifyOptions = {
  onSuccess?: (payload: JwtUserPayload) => void;
  onError?: () => void;
  resolve: (payload: JwtUserPayload | null) => void;
  reject: (err: unknown) => void;
};

export function jwtVerifyCallback({
  onSuccess,
  onError,
  resolve,
  reject,
}: VerifyOptions): jwt.VerifyCallback {
  return (err, decoded) => {
    if (err) {
      if (onError) onError();
      return resolve(null);
    }

    try {
      const payload = decoded as JwtUserPayload;

      if (onSuccess) onSuccess(payload);

      resolve(payload);
    } catch (error) {
      reject(error);
    }
  };
}

export function verifyAccessToken(
  token: string,
  options?: {
    onSuccess?: (payload: JwtUserPayload) => void;
    onError?: () => void;
  },
): Promise<JwtUserPayload | null> {
  return new Promise((resolve, reject) => {
    const callback = jwtVerifyCallback({
      ...options,
      resolve,
      reject,
    });

    jwt.verify(token, getSecret(), callback);
  });
}
