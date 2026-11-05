ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS registration_type TEXT NOT NULL DEFAULT 'in_person';

UPDATE applications
SET registration_type = 'virtual'
WHERE LOWER(REPLACE(TRIM(COALESCE(registration_type, '')), '-', '_')) IN (
  'virtual',
  'virtual_registration',
  'virtual registration'
)
OR LOWER(TRIM(COALESCE(status, ''))) IN (
  'virtual',
  'virtual registration'
);

UPDATE applications
SET registration_type = 'in_person'
WHERE LOWER(REPLACE(TRIM(COALESCE(registration_type, 'in_person')), '-', '_')) NOT IN (
  'virtual',
  'virtual_registration',
  'virtual registration',
  'in_person',
  'in person'
);
