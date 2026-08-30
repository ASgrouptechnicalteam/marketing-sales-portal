import { Router } from 'express';
import { 
  createDemoBooking,
  getDemoBookings,
  getDemoBookingById,
  updateDemoBookingStatus,
  deleteDemoBooking
} from '../controllers/demoBookingController';
import { authenticate } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.use(authenticate);

// Create Demo Booking
router.post('/', createDemoBooking);

// List Demo Bookings
router.get('/', getDemoBookings);

// Get specific Demo Booking
router.get('/:id', getDemoBookingById);

// Update Status
router.patch('/:id/status', updateDemoBookingStatus);

// Delete
router.delete('/:id', requireRole('MD', 'CHANNEL_PARTNER_MANAGER'), deleteDemoBooking);

export default router;
