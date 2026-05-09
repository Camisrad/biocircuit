import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// GET /api/comments?pathway_id=xxx — get comments for a pathway
router.get('/', async (req, res) => {
  try {
    const { pathway_id, submission_id } = req.query;
    const comments = await prisma.comment.findMany({
      where: {
        ...(pathway_id ? { pathway_id } : {}),
        ...(submission_id ? { submission_id } : {}),
      },
      orderBy: { created_at: 'asc' },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/comments — post a comment (authenticated)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { body, pathway_id, submission_id } = req.body;

    if (!body?.trim()) {
      return res.status(400).json({ error: 'Comment body is required' });
    }
    if (!pathway_id && !submission_id) {
      return res.status(400).json({ error: 'pathway_id or submission_id required' });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        author_id: req.user.id,
        author_name: req.user.name ?? req.user.email,
        author_email: req.user.email,
        pathway_id: pathway_id ?? null,
        submission_id: submission_id ?? null,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// DELETE /api/comments/:id — delete own comment or admin
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
    if (!comment) return res.status(404).json({ error: 'Not found' });
    if (comment.author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.comment.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
