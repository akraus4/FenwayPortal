create database metrics;
create user 'metrics'@'localhost' identified by 'metrics';
grant all privileges on *.* to 'metrics'@'localhost';

-- Local portal db and user
create database portal;
create user 'fg_user'@'localhost' identified by 'fg_user';
grant all privileges on *.* to 'fg_user'@'localhost';