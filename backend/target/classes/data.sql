-- Insert sample buses with Indian routes
INSERT INTO buses (bus_name, source, destination, departure_time, arrival_time, total_seats) VALUES
('Express Travels - AC Sleeper', 'Delhi', 'Jaipur', '08:00:00', '14:00:00', 40),
('Royal Express - AC Seater', 'Delhi', 'Jaipur', '10:30:00', '16:30:00', 45),
('Super Fast - Non AC', 'Delhi', 'Jaipur', '14:00:00', '20:00:00', 50),
('Luxury Coach - AC Sleeper', 'Delhi', 'Jaipur', '18:00:00', '00:00:00', 35),
('Night Rider - AC Seater', 'Delhi', 'Jaipur', '22:00:00', '04:00:00', 42),
('City Express - AC Seater', 'Mumbai', 'Pune', '06:00:00', '09:00:00', 40),
('Highway King - AC Sleeper', 'Mumbai', 'Pune', '09:30:00', '12:30:00', 38),
('Fast Track - Non AC', 'Mumbai', 'Pune', '13:00:00', '16:00:00', 45),
('Comfort Plus - AC Seater', 'Mumbai', 'Pune', '16:30:00', '19:30:00', 40),
('Moonlight Express - AC Sleeper', 'Mumbai', 'Pune', '21:00:00', '00:00:00', 36),
('State Transport - Non AC', 'Bangalore', 'Chennai', '07:00:00', '13:00:00', 50),
('Premium Travel - AC Seater', 'Bangalore', 'Chennai', '10:00:00', '16:00:00', 45),
('Super Deluxe - AC Sleeper', 'Bangalore', 'Chennai', '14:00:00', '20:00:00', 40),
('Economy Class - Non AC', 'Bangalore', 'Chennai', '18:00:00', '00:00:00', 55),
('Business Class - AC Seater', 'Bangalore', 'Chennai', '22:00:00', '04:00:00', 35);

-- Insert seats for each bus with proper seat types
-- Bus 1: Express Travels - AC Sleeper (40 seats)
INSERT INTO seats (bus_id, seat_number, seat_type, is_available) VALUES
(1, 'A1', 'WINDOW', true), (1, 'A2', 'AISLE', true), (1, 'A3', 'AISLE', true), (1, 'A4', 'WINDOW', true),
(1, 'B1', 'WINDOW', true), (1, 'B2', 'AISLE', true), (1, 'B3', 'AISLE', true), (1, 'B4', 'WINDOW', true),
(1, 'C1', 'WINDOW', true), (1, 'C2', 'AISLE', true), (1, 'C3', 'AISLE', true), (1, 'C4', 'WINDOW', true),
(1, 'D1', 'WINDOW', true), (1, 'D2', 'AISLE', true), (1, 'D3', 'AISLE', true), (1, 'D4', 'WINDOW', true),
(1, 'E1', 'WINDOW', true), (1, 'E2', 'AISLE', true), (1, 'E3', 'AISLE', true), (1, 'E4', 'WINDOW', true),
(1, 'F1', 'WINDOW', true), (1, 'F2', 'AISLE', true), (1, 'F3', 'AISLE', true), (1, 'F4', 'WINDOW', true),
(1, 'G1', 'WINDOW', true), (1, 'G2', 'AISLE', true), (1, 'G3', 'AISLE', true), (1, 'G4', 'WINDOW', true),
(1, 'H1', 'WINDOW', true), (1, 'H2', 'AISLE', true), (1, 'H3', 'AISLE', true), (1, 'H4', 'WINDOW', true),
(1, 'I1', 'WINDOW', true), (1, 'I2', 'AISLE', true), (1, 'I3', 'AISLE', true), (1, 'I4', 'WINDOW', true),
(1, 'J1', 'WINDOW', true), (1, 'J2', 'AISLE', true), (1, 'J3', 'AISLE', true), (1, 'J4', 'WINDOW', true);

-- Bus 2: Royal Express - AC Seater (45 seats)
INSERT INTO seats (bus_id, seat_number, seat_type, is_available) VALUES
(2, 'A1', 'WINDOW', true), (2, 'A2', 'AISLE', true), (2, 'A3', 'AISLE', true), (2, 'A4', 'WINDOW', true), (2, 'A5', 'WINDOW', true),
(2, 'B1', 'WINDOW', true), (2, 'B2', 'AISLE', true), (2, 'B3', 'AISLE', true), (2, 'B4', 'WINDOW', true), (2, 'B5', 'WINDOW', true),
(2, 'C1', 'WINDOW', true), (2, 'C2', 'AISLE', true), (2, 'C3', 'AISLE', true), (2, 'C4', 'WINDOW', true), (2, 'C5', 'WINDOW', true),
(2, 'D1', 'WINDOW', true), (2, 'D2', 'AISLE', true), (2, 'D3', 'AISLE', true), (2, 'D4', 'WINDOW', true), (2, 'D5', 'WINDOW', true),
(2, 'E1', 'WINDOW', true), (2, 'E2', 'AISLE', true), (2, 'E3', 'AISLE', true), (2, 'E4', 'WINDOW', true), (2, 'E5', 'WINDOW', true),
(2, 'F1', 'WINDOW', true), (2, 'F2', 'AISLE', true), (2, 'F3', 'AISLE', true), (2, 'F4', 'WINDOW', true), (2, 'F5', 'WINDOW', true),
(2, 'G1', 'WINDOW', true), (2, 'G2', 'AISLE', true), (2, 'G3', 'AISLE', true), (2, 'G4', 'WINDOW', true), (2, 'G5', 'WINDOW', true),
(2, 'H1', 'WINDOW', true), (2, 'H2', 'AISLE', true), (2, 'H3', 'AISLE', true), (2, 'H4', 'WINDOW', true), (2, 'H5', 'WINDOW', true),
(2, 'I1', 'WINDOW', true), (2, 'I2', 'AISLE', true), (2, 'I3', 'AISLE', true), (2, 'I4', 'WINDOW', true), (2, 'I5', 'WINDOW', true);

-- Bus 3: Super Fast - Non AC (50 seats)
INSERT INTO seats (bus_id, seat_number, seat_type, is_available) VALUES
(3, 'A1', 'WINDOW', true), (3, 'A2', 'AISLE', true), (3, 'A3', 'AISLE', true), (3, 'A4', 'WINDOW', true), (3, 'A5', 'WINDOW', true),
(3, 'B1', 'WINDOW', true), (3, 'B2', 'AISLE', true), (3, 'B3', 'AISLE', true), (3, 'B4', 'WINDOW', true), (3, 'B5', 'WINDOW', true),
(3, 'C1', 'WINDOW', true), (3, 'C2', 'AISLE', true), (3, 'C3', 'AISLE', true), (3, 'C4', 'WINDOW', true), (3, 'C5', 'WINDOW', true),
(3, 'D1', 'WINDOW', true), (3, 'D2', 'AISLE', true), (3, 'D3', 'AISLE', true), (3, 'D4', 'WINDOW', true), (3, 'D5', 'WINDOW', true),
(3, 'E1', 'WINDOW', true), (3, 'E2', 'AISLE', true), (3, 'E3', 'AISLE', true), (3, 'E4', 'WINDOW', true), (3, 'E5', 'WINDOW', true),
(3, 'F1', 'WINDOW', true), (3, 'F2', 'AISLE', true), (3, 'F3', 'AISLE', true), (3, 'F4', 'WINDOW', true), (3, 'F5', 'WINDOW', true),
(3, 'G1', 'WINDOW', true), (3, 'G2', 'AISLE', true), (3, 'G3', 'AISLE', true), (3, 'G4', 'WINDOW', true), (3, 'G5', 'WINDOW', true),
(3, 'H1', 'WINDOW', true), (3, 'H2', 'AISLE', true), (3, 'H3', 'AISLE', true), (3, 'H4', 'WINDOW', true), (3, 'H5', 'WINDOW', true),
(3, 'I1', 'WINDOW', true), (3, 'I2', 'AISLE', true), (3, 'I3', 'AISLE', true), (3, 'I4', 'WINDOW', true), (3, 'I5', 'WINDOW', true),
(3, 'J1', 'WINDOW', true), (3, 'J2', 'AISLE', true), (3, 'J3', 'AISLE', true), (3, 'J4', 'WINDOW', true), (3, 'J5', 'WINDOW', true);

-- Insert sample users
INSERT INTO users (name, email, password, role, phone_number) VALUES
('John Doe', 'john.doe@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'USER', '9876543210'),
('Jane Smith', 'jane.smith@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'USER', '9876543211'),
('Admin User', 'admin@busbooking.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN', '9876543212'),
('Bus Manager', 'manager@busbooking.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'BUS_MANAGER', '9876543213');

-- Note: The password hash is for 'password123'