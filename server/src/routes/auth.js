import { Router } from 'express';
import { WorkOS } from '@workos-inc/node';
import { PrismaClient } from '@prisma/client';

const router = Router();
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const prisma = new PrismaClient();

const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:5173';

// GET /api/auth/login — redirect to WorkOS hosted login
router.get('/login', (req, res) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: 'authkit',
    clientId: process.env.WORKOS_CLIENT_ID,
    redirectUri: `${process.env.SERVER_URL ?? 'http://localhost:3001'}/api/auth/callback`,
  });
  res.redirect(authorizationUrl);
});

// GET /api/auth/callback — WorkOS redirects here after login
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { user: workosUser, accessToken } = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID,
      code,
    });

    await prisma.user.upsert({
      where: { workos_id: workosUser.id },
      update: { email: workosUser.email, name: `${workosUser.firstName ?? ''} ${workosUser.lastName ?? ''}`.trim() },
      create: {
        workos_id: workosUser.id,
        email: workosUser.email,
        name: `${workosUser.firstName ?? ''} ${workosUser.lastName ?? ''}`.trim(),
        role: 'user',
      },
    });

    // Send token to frontend via redirect with token in URL fragment
    // (frontend stores it in localStorage/memory)
    res.redirect(`${CLIENT_URL}/auth/callback#token=${accessToken}`);
  } catch (err) {
    res.redirect(`${CLIENT_URL}/auth/error`);
  }
});

// GET /api/auth/me — return current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { user: workosUser } = await workos.userManagement.authenticateWithSessionCookie({
      clientId: process.env.WORKOS_CLIENT_ID,
      sessionData: token,
    });

    const user = await prisma.user.findUnique({ where: { workos_id: workosUser.id } });
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Invalid session' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ ok: true });
});

export default router;
