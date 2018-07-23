drop table if exists work_user;

create table work_user (
    user_id varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    PRIMARY KEY(user_id)
);

drop table if exists work_team;

create table work_team (
    team_id varchar(255),
    team_name varchar(255),
    project_id varchar(255), -- From Timecard System
    project_name varchar(255), -- From Timecard System
    PRIMARY KEY(team_id)
);

drop table if exists work_team_member;

create table work_team_member (
    team_member_id varchar(255),
    team_id varchar(255),
    user_id varchar(255),
    PRIMARY KEY(team_member_id),
    CONSTRAINT TEAM_MEMBER_UNIQUE_TEAM_USER_KEY UNIQUE (team_id, user_id)
);

drop table if exists work_dailyhours;

create table work_dailyhours (
    dailyhours_id varchar(255),
    team_member_id varchar(255),
    work_date date,
    hours int(11),
    PRIMARY KEY(dailyhours_id),
    CONSTRAINT DAILYHOURS_UNIQUE_WORK_DATE_HOURS_KEY UNIQUE (team_member_id, work_date)
);

drop table if exists agile_system;

create table agile_system (
    system_id varchar(255),
    system_type varchar(255),
    system_name varchar(255),
    PRIMARY KEY(system_id)
);

drop table if exists agile_system_user;

create table agile_system_user (
    system_user_id varchar(255),
    system_id varchar(255),
    user_id varchar(255),
    PRIMARY KEY(system_user_id),
    CONSTRAINT SYSTEM_USER_UNIQUE_SYSTEM_USER_KEY UNIQUE (system_id, user_id)
);

drop table if exists agile_sprint;

create table agile_sprint (
    sprint_id varchar(255),
    system_id varchar(255),
    sprint_name varchar(255),
    sprint_start_date date,
    sprint_end_date date,
    PRIMARY KEY(sprint_id)
);

drop table if exists agile_story;

create table agile_story (
    story_id varchar(255),
    sprint_id varchar(255),
    story_name varchar(255),
    story_points varchar(255),
    PRIMARY KEY(story_id)
);

drop table if exists agile_story_team_member;

create table agile_story_team_member (
    story_team_member_id varchar(255),
    story_id varchar(255),
    team_member_id varchar(255),
    PRIMARY KEY(story_team_member_id),
    CONSTRAINT STORY_TEAM_MEMBER_UNIQUE_STORY_TEAM_MEMBER_KEY UNIQUE (story_id, team_member_id)
);
