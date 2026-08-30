import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  createSiteVisit,
  getSiteVisits,
  getSiteVisitById,
  updateStatus,
  updateOutcome,
  deleteSiteVisit
} from '../controllers/siteVisitController';
import { requireRole } from '../middleware/roleMiddleware';

const router = express.Router();

// All Site Visit routes require authentication
router.use(authenticate);

router.get('/', getSiteVisits);
router.post('/', createSiteVisit);
router.get('/:id', getSiteVisitById);
router.patch('/:id/status', updateStatus);
router.patch('/:id/outcome', updateOutcome);
router.delete('/:id', requireRole('MD', 'CHANNEL_PARTNER_MANAGER'), deleteSiteVisit);

export default router;
