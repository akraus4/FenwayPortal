create database metrics;
create user 'metrics'@'localhost' identified by 'metrics';
grant all privileges on *.* to 'metrics'@'localhost';