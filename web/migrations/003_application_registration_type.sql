ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS registration_type TEXT NOT NULL DEFAULT 'in_person';

UPDATE applications
SET registration_type = 'virtual'
WHERE LOWER(COALESCE(status, '')) = 'virtual registration';

