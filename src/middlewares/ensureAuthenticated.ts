import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppErrors';

interface TokenPayload {
  iat: number;
  exp: number;
  id: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing in header', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'af5edf58a54cd21da434be5b1be6b918');

    const { id } = decoded as TokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
