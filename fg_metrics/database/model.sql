drop table if exists work_user;

create table work_user (
    work_user_id varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    active tinyint(1),
    PRIMARY KEY(work_user_id)
);

drop table if exists work_team;

create table work_team (
    work_team_id varchar(255),
    work_team_name varchar(255),
    project_id varchar(255), -- From Timecard System
    project_name varchar(255), -- From Timecard System
    active tinyint(1),
    PRIMARY KEY(work_team_id)
);

drop table if exists work_team_member;

create table work_team_member (
    work_team_member_id varchar(255),
    work_team_id varchar(255),
    work_user_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(work_team_member_id)
);

drop table if exists work_dailyhours;

create table work_dailyhours (
    work_dailyhours_id varchar(255),
    work_team_member_id varchar(255),
    work_date date,
    hours int(11),
    active tinyint(1),
    PRIMARY KEY(work_dailyhours_id)
);

drop table if exists agile_system;

create table agile_system (
    agile_system_id varchar(255),
    agile_system_name varchar(255),
    agile_system_type varchar(255),
    work_team_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_id)
);

drop table if exists agile_system_user;

create table agile_system_user (
    agile_system_user_id varchar(255),
    agile_system_user_name varchar(255),
    agile_system_id varchar(255),
    work_team_member_id varchar(255),
    work_user_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_user_id)
);

drop table if exists agile_sprint;

create table agile_sprint (
    agile_sprint_id varchar(255),
    agile_sprint_name varchar(255),
    agile_system_id varchar(255),
    sprint_description varchar(255),
    sprint_start_date date,
    sprint_end_date date,
    active tinyint(1),
    PRIMARY KEY(agile_sprint_id)
);

drop table if exists agile_story;

create table agile_story (
    agile_story_id varchar(255),
    agile_story_name varchar(255),
    agile_sprint_id varchar(255),
    story_description varchar(255),
    story_type varchar(255), 
    story_status varchar(255),
    story_points varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_story_id)
);

drop table if exists agile_story_agile_system_user;

create table agile_story_agile_system_user (
    agile_story_agile_system_user_id varchar(255),
    agile_story_id varchar(255),
    agile_system_user_id varchar(255),
    agile_system_user_story_points varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_story_agile_system_user_id)
);
