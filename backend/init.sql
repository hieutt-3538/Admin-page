CREATE DATABASE IF NOT EXISTS node_auth;
USE node_auth;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES 
('Admin', 'admin@example.com', '$2a$10$zZm3OblBztA6ErOaJt6W/OZ0MzFJKN2eHtOzZPdeGq1HbErfFjhmG'); 