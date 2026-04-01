-- Insert sample buses
INSERT INTO buses (bus_name, source, destination, departure_time, arrival_time, total_seats) VALUES
('Express Liner', 'New York', 'Boston', '08:00:00', '12:00:00', 40),
('City Hopper', 'Los Angeles', 'San Francisco', '09:00:00', '15:00:00', 35),
('Night Rider', 'Chicago', 'Detroit', '22:00:00', '02:00:00', 30),
('Sunrise Express', 'Miami', 'Orlando', '06:00:00', '10:00:00', 45),
('Mountain View', 'Denver', 'Colorado Springs', '14:00:00', '16:00:00', 25);

-- Insert seats for each bus
-- Bus 1: Express Liner (40 seats)
INSERT INTO seats (bus_id, seat_number, is_available) 
SELECT 1, CONCAT('A', n), true
FROM (SELECT @row := @row + 1 as n FROM information_schema.columns, (SELECT @row := 0) r LIMIT 40) seq;

-- Bus 2: City Hopper (35 seats)
INSERT INTO seats (bus_id, seat_number, is_available) 
SELECT 2, CONCAT('B', n), true
FROM (SELECT @row := @row + 1 as n FROM information_schema.columns, (SELECT @row := 0) r LIMIT 35) seq;

-- Bus 3: Night Rider (30 seats)
INSERT INTO seats (bus_id, seat_number, is_available) 
SELECT 3, CONCAT('C', n), true
FROM (SELECT @row := @row + 1 as n FROM information_schema.columns, (SELECT @row := 0) r LIMIT 30) seq;

-- Bus 4: Sunrise Express (45 seats)
INSERT INTO seats (bus_id, seat_number, is_available) 
SELECT 4, CONCAT('D', n), true
FROM (SELECT @row := @row + 1 as n FROM information_schema.columns, (SELECT @row := 0) r LIMIT 45) seq;

-- Bus 5: Mountain View (25 seats)
INSERT INTO seats (bus_id, seat_number, is_available) 
SELECT 5, CONCAT('E', n), true
FROM (SELECT @row := @row + 1 as n FROM information_schema.columns, (SELECT @row := 0) r LIMIT 25) seq;