drop database if exists webapp;
create database webapp;
create user 'spring'@'webapp' identified by 'tomcat'; 
grant all on webapp.* to 'spring'@'webapp';