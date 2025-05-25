-- Create ENUM types first as they are used in table definitions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'hr', 'employee');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_status') THEN
        CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
        CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'on_leave');
    END IF;
END$$;

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    departmentId UUID REFERENCES departments(id) ON DELETE SET NULL,
    phone VARCHAR(50),
    address TEXT,
    profileImage VARCHAR(255),
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Leaves Table
CREATE TABLE IF NOT EXISTS leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employeeId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason TEXT NOT NULL,
    status leave_status NOT NULL DEFAULT 'pending',
    approverId UUID REFERENCES users(id) ON DELETE SET NULL, -- User who approved/rejected
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_dates CHECK (endDate >= startDate)
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employeeId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL,
    checkInTime TIMESTAMPTZ,
    checkOutTime TIMESTAMPTZ,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_checkout_after_checkin CHECK (checkOutTime IS NULL OR checkInTime IS NULL OR checkOutTime > checkInTime),
    UNIQUE (employeeId, date) -- Ensure one attendance record per employee per day
);

-- Indexes for foreign keys and frequently queried columns
CREATE INDEX IF NOT EXISTS idx_users_departmentId ON users(departmentId);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_leaves_employeeId ON leaves(employeeId);
CREATE INDEX IF NOT EXISTS idx_leaves_status ON leaves(status);
CREATE INDEX IF NOT EXISTS idx_attendance_employeeId ON attendance(employeeId);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updatedAt
DO $$
DECLARE
  tbl_name TEXT;
BEGIN
  FOR tbl_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('users', 'departments', 'leaves', 'attendance')
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS update_%s_updatedAt ON %I;', tbl_name, tbl_name); -- Drop if exists
    EXECUTE format('CREATE TRIGGER update_%s_updatedAt
                    BEFORE UPDATE ON %I
                    FOR EACH ROW
                    EXECUTE FUNCTION update_updated_at_column();', tbl_name, tbl_name);
  END LOOP;
END $$;
