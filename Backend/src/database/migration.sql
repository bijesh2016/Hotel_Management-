-- Migration to fix biggest problems in hotel reservation system

-- Problem #2: Update room statuses
-- Remove: occupied
-- Add: cleaning, out_of_service
-- Current statuses: available, occupied, maintenance
-- New statuses: available, maintenance, cleaning, out_of_service

-- First, update any existing 'occupied' rooms to 'available'
UPDATE rooms SET status = 'available' WHERE status = 'occupied';

-- Add check constraint for valid room statuses
ALTER TABLE rooms DROP CONSTRAINT IF EXISTS rooms_status_check;
ALTER TABLE rooms ADD CONSTRAINT rooms_status_check 
  CHECK (status IN ('available', 'maintenance', 'cleaning', 'out_of_service'));

-- Problem #3: Add room number uniqueness constraint
ALTER TABLE rooms DROP CONSTRAINT IF EXISTS unique_room_per_hotel;
ALTER TABLE rooms ADD CONSTRAINT unique_room_per_hotel UNIQUE (hotel_id, room_number);

-- Problem #4: Update reservation statuses
-- Add: pending_payment, expired
-- Current: pending, confirmed, checked_in, checked_out, cancelled
-- New: pending_payment, confirmed, checked_in, checked_out, cancelled, expired

-- Update any existing 'pending' reservations to 'pending_payment'
UPDATE reservations SET status = 'pending_payment' WHERE status = 'pending';

-- Add check constraint for valid reservation statuses
ALTER TABLE reservations DROP CONSTRAINT IF EXISTS reservations_status_check;
ALTER TABLE reservations ADD CONSTRAINT reservations_status_check 
  CHECK (status IN ('pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'expired'));

-- Problem #6: Add validation constraint for check-in < check-out
ALTER TABLE reservations ADD CONSTRAINT valid_date_range 
  CHECK (check_out > check_in);
