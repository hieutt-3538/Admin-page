CREATE USER 'dev_user'@'%' IDENTIFIED BY 'StrongPassword123!';

GRANT SELECT, INSERT, UPDATE, DELETE ON node_auth.* TO 'dev_user'@'%';

FLUSH PRIVILEGES;
