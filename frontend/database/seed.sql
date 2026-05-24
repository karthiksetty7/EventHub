-- =========================================
-- DEMO USERS
-- Password for all users:
-- 123456
--
-- NOTE:
-- Passwords below are bcrypt hashed
-- =========================================

INSERT INTO users (name, email, password, role)
VALUES
(
    'Admin User',
    'admin@example.com',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi6M9b1l9n7VDaRao7IhiHBpjz2uO7a',
    'admin'
),

(
    'Event Organizer',
    'organizer@example.com',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi6M9b1l9n7VDaRao7IhiHBpjz2uO7a',
    'organizer'
),

(
    'Attendee User',
    'attendee@example.com',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi6M9b1l9n7VDaRao7IhiHBpjz2uO7a',
    'attendee'
);



-- =========================================
-- DEMO EVENTS
-- =========================================

INSERT INTO events (
    organizer_id,
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    available_seats,
    base_price,
    current_price,
    image_url
)
VALUES

(
    2,
    'React Developer Conference',
    'A full day conference for React developers and frontend engineers.',
    'Technology',
    'Hyderabad',
    '2026-08-15',
    '10:00 AM',
    50,
    50,
    999,
    999,
    'https://images.unsplash.com/photo-1511578314322-379afb476865'
),

(
    2,
    'Music Fiesta Night',
    'Live music concert with top performers and bands.',
    'Music',
    'Bangalore',
    '2026-09-05',
    '07:00 PM',
    100,
    100,
    1499,
    1499,
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
),

(
    2,
    'Startup Networking Meetup',
    'Meet startup founders, investors, and developers.',
    'Business',
    'Chennai',
    '2026-07-22',
    '05:00 PM',
    75,
    75,
    799,
    799,
    'https://images.unsplash.com/photo-1515169067868-5387ec356754'
);



-- =========================================
-- SEAT INVENTORY FOR EVENT 1
-- =========================================

INSERT INTO seat_inventory (
    event_id,
    seat_number,
    is_booked
)
VALUES
(1, 'A1', 0),
(1, 'A2', 0),
(1, 'A3', 0),
(1, 'A4', 0),
(1, 'A5', 0),
(1, 'B1', 0),
(1, 'B2', 0),
(1, 'B3', 0),
(1, 'B4', 0),
(1, 'B5', 0);



-- =========================================
-- SEAT INVENTORY FOR EVENT 2
-- =========================================

INSERT INTO seat_inventory (
    event_id,
    seat_number,
    is_booked
)
VALUES
(2, 'A1', 0),
(2, 'A2', 0),
(2, 'A3', 0),
(2, 'A4', 0),
(2, 'A5', 0),
(2, 'B1', 0),
(2, 'B2', 0),
(2, 'B3', 0),
(2, 'B4', 0),
(2, 'B5', 0);



-- =========================================
-- SEAT INVENTORY FOR EVENT 3
-- =========================================

INSERT INTO seat_inventory (
    event_id,
    seat_number,
    is_booked
)
VALUES
(3, 'A1', 0),
(3, 'A2', 0),
(3, 'A3', 0),
(3, 'A4', 0),
(3, 'A5', 0),
(3, 'B1', 0),
(3, 'B2', 0),
(3, 'B3', 0),
(3, 'B4', 0),
(3, 'B5', 0);