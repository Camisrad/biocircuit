import { WorkOS } from '@workos-inc/node';
import { PrismaClient } from '@prisma/client';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const prisma = new PrismaClient();

// Validates the WorkOS session token from the Authorization header,
// upserts the user in our DB, and attaches req.user.
export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { user: workosUser } = await workos.userManagement.authenticateWithSessionCookie({
      clientId: process.env.WORKOS_CLIENT_ID,
      sessionData: token,
    });

    // Upsert into our users table
    const user = await prisma.user.upsert({
      where: { workos_id: workosUser.id },
      update: { email: workosUser.email, name: `${workosUser.firstName ?? ''} ${workosUser.lastName ?? ''}`.trim() },
      create: {
        workos_id: workosUser.id,
        email: workosUser.email,
        name: `${workosUser.firstName ?? ''} ${workosUser.lastName ?? ''}`.trim(),
        role: 'user',
      },
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Optionally attach user if token present, but don't block if missing
export async function optionalAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) return next();

    const { user: workosUser } = await workos.userManagement.authenticateWithSessionCookie({
      clientId: process.env.WORKOS_CLIENT_ID,
      sessionData: token,
    });

    req.user = await prisma.user.findUnique({ where: { workos_id: workosUser.id } });
  } catch {
    // ignore auth errors for optional routes
  }
  next();
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  return req.cookies?.wos_session ?? null;
}
