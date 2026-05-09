import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// GET /api/submissions — list all approved submissions (public) or all (admin)
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const submissions = await prisma.pathwaySubmission.findMany({
      where: isAdmin ? {} : { status: 'approved' },
      orderBy: { created_date: 'desc' },
      take: 100,
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// GET /api/submissions/all — admin: list all regardless of status
router.get('/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const submissions = await prisma.pathwaySubmission.findMany({
      orderBy: { created_date: 'desc' },
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// POST /api/submissions — create a new submission (authenticated users)
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      pathway_name, description, organism, cancer_type,
      tags, submitter_name, submitter_institution,
      submitter_country, pathway_data, journal_links,
    } = req.body;

    if (!pathway_name || !description || !organism || !cancer_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const submission = await prisma.pathwaySubmission.create({
      data: {
        pathway_name,
        description,
        organism,
        cancer_type,
        tags: tags ?? [],
        submitter_name: submitter_name ?? req.user.name,
        submitter_email: req.user.email,
        submitter_institution: submitter_institution ?? '',
        submitter_country: submitter_country ?? '',
        pathway_data: pathway_data ?? {},
        journal_links: journal_links ?? [],
        status: 'pending',
      },
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// PATCH /api/submissions/:id/status — admin: approve or reject
router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const submission = await prisma.pathwaySubmission.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

export default router;
