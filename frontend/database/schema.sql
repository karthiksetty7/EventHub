-- =========================================
-- USERS TABLE
-- Stores attendees, organizers, and admins
-- =========================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    password TEXT NOT NULL,

    role TEXT NOT NULL CHECK (
        role IN ('attendee', 'organizer', 'admin')
    ),

    profile_image TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



-- =========================================
-- EVENTS TABLE
-- Stores all event details
-- =========================================

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    organizer_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    description TEXT NOT NULL,

    category TEXT NOT NULL,

    location TEXT NOT NULL,

    event_date TEXT NOT NULL,

    event_time TEXT NOT NULL,

    total_seats INTEGER NOT NULL,

    available_seats INTEGER NOT NULL,

    base_price REAL NOT NULL,

    current_price REAL NOT NULL,

    image_url TEXT,

    status TEXT DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'CANCELLED', 'COMPLETED')
    ),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (organizer_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);



-- =========================================
-- SEAT INVENTORY TABLE
-- Tracks individual seat booking status
-- =========================================

CREATE TABLE IF NOT EXISTS seat_inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    event_id INTEGER NOT NULL,

    seat_number TEXT NOT NULL,

    is_booked INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    UNIQUE(event_id, seat_number)
);



-- =========================================
-- TICKETS TABLE
-- Stores booked ticket information
-- =========================================

CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    event_id INTEGER NOT NULL,

    seat_number TEXT NOT NULL,

    ticket_price REAL NOT NULL,

    booking_status TEXT DEFAULT 'CONFIRMED' CHECK (
        booking_status IN (
            'CONFIRMED',
            'CANCELLED'
        )
    ),

    qr_code TEXT,

    payment_status TEXT DEFAULT 'PAID' CHECK (
        payment_status IN (
            'PAID',
            'PENDING',
            'FAILED'
        )
    ),

    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE
);



-- =========================================
-- BOOKING HISTORY TABLE
-- Tracks booking activities
-- =========================================

CREATE TABLE IF NOT EXISTS booking_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    event_id INTEGER NOT NULL,

    ticket_id INTEGER NOT NULL,

    action TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    FOREIGN KEY (ticket_id)
        REFERENCES tickets(id)
        ON DELETE CASCADE
);



-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_events_category
ON events(category);

CREATE INDEX IF NOT EXISTS idx_events_date
ON events(event_date);

CREATE INDEX IF NOT EXISTS idx_tickets_user
ON tickets(user_id);

CREATE INDEX IF NOT EXISTS idx_tickets_event
ON tickets(event_id);

CREATE INDEX IF NOT EXISTS idx_seat_inventory_event
ON seat_inventory(event_id);