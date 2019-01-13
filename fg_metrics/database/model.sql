drop table if exists agile_story_agile_system_user;
drop table if exists agile_story;
drop table if exists agile_sprint;
drop table if exists agile_system_user;
drop table if exists agile_system;
drop table if exists agile_evaluation_session;
drop table if exists agile_evaluation_scores;
drop table if exists agile_evaluations;
drop table if exists agile_stage;

drop table if exists work_dailyhours;
drop table if exists work_team_member;
drop table if exists work_team;
drop table if exists work_user;

create table work_user (
    work_user_id varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    expected_hours int(11),
    active tinyint(1),
    PRIMARY KEY(work_user_id)
);

create table work_team (
    work_team_id varchar(255),
    work_team_name varchar(255),
    project_id varchar(255), -- From Timecard System
    project_name varchar(255), -- From Timecard System
    active tinyint(1),
    PRIMARY KEY(work_team_id)
);

create table work_team_member (
    work_team_member_id varchar(255),
    work_team_id varchar(255),
    work_user_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(work_team_member_id),
    CONSTRAINT `FK_WORK_TEAM_MEMBER_WORK_TEAM` FOREIGN KEY (`work_team_id`) REFERENCES `work_team` (`work_team_id`),
    CONSTRAINT `FK_WORK_TEAM_MEMBER_WORK_USER` FOREIGN KEY (`work_user_id`) REFERENCES `work_user` (`work_user_id`)
);

create table work_dailyhours (
    work_dailyhours_id varchar(255),
    work_team_member_id varchar(255),
    work_date date,
    hours DOUBLE(11, 2),
    PRIMARY KEY(work_dailyhours_id),
    CONSTRAINT `FK_WORK_DAILYHOURS_WORK_TEAM_MEMBER` FOREIGN KEY (`work_team_member_id`) REFERENCES `work_team_member` (`work_team_member_id`)
);

create table agile_system (
    agile_system_id varchar(255),
    agile_system_name varchar(255),
    agile_system_type varchar(255),
    work_team_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_id),
    CONSTRAINT `FK_AGILE_SYSTEM_WORK_TEAM` FOREIGN KEY (`work_team_id`) REFERENCES `work_team` (`work_team_id`)
);

create table agile_system_user (
    agile_system_user_id varchar(255),
    agile_system_user_name varchar(255),
    agile_system_id varchar(255),
    work_team_member_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_user_id),
    CONSTRAINT `FK_AGILE_SYSTEM_USER_WORK_TEAM_MEMBER` FOREIGN KEY (`work_team_member_id`) REFERENCES `work_team_member` (`work_team_member_id`)
);

create table agile_sprint (
    agile_sprint_id varchar(255),
    agile_sprint_name varchar(255),
    agile_system_id varchar(255),
    sprint_description varchar(255),
    sprint_start_date date,
    sprint_end_date date,
    PRIMARY KEY(agile_sprint_id),
    CONSTRAINT `FK_AGILE_SPRINT_AGILE_SYSTEM` FOREIGN KEY (`agile_system_id`) REFERENCES `agile_system` (`agile_system_id`)
);

create table agile_story (
    agile_story_id varchar(255),
    agile_story_name varchar(255),
    agile_sprint_id varchar(255),
    story_description varchar(255),
    story_type varchar(255), 
    story_status varchar(255),
    story_points varchar(255),
    PRIMARY KEY(agile_story_id),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SPRINT` FOREIGN KEY (`agile_sprint_id`) REFERENCES `agile_sprint` (`agile_sprint_id`)
);

create table agile_story_agile_system_user (
    agile_story_agile_system_user_id varchar(255),
    agile_story_id varchar(255),
    agile_system_user_id varchar(255),
    agile_system_user_story_points varchar(255),
    PRIMARY KEY(agile_story_agile_system_user_id),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_STORY` FOREIGN KEY (`agile_story_id`) REFERENCES `agile_story` (`agile_story_id`),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_SYSTEM_USER` FOREIGN KEY (`agile_system_user_id`) REFERENCES `agile_system_user` (`agile_system_user_id`)
);

create table agile_evaluation_session (
    agile_evaluation_session_id varchar(255),
    agile_evaluation_session_name varchar(255),
    agile_evaluation_session_start_date date,
    PRIMARY KEY(agile_evaluation_session_id)
);

create table agile_stage (
    agile_stage_id varchar(255),
    agile_stage_name varchar(255),
    agile_stage_technical_requirements text,
    agile_stage_behavioral_requirements text,
    agile_stage_progression_requirements text,
    PRIMARY KEY(agile_stage_id)
);

create table agile_evaluations (
    agile_evaluation_id varchar(255),
    presenter_user_id varchar(255),
    agile_stage_id varchar(255),
    agile_evaluation_session_id varchar(255),
    agile_evaluation_date date,
    created_by varchar(255),
    last_updated_by varchar(255),
    last_updated_date date,
    passed tinyint(1),
    PRIMARY KEY(agile_evaluation_id),
    CONSTRAINT `FK_AGILE_EVALUATION_AGILE_EVALUATION_SESSION` FOREIGN KEY (`agile_evaluation_session_id`) REFERENCES `agile_evaluation_session` (`agile_evaluation_session_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_AGILE_STAGE` FOREIGN KEY (`agile_stage_id`) REFERENCES `agile_stage` (`agile_stage_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_PRESENTER` FOREIGN KEY (`presenter_user_id`) REFERENCES `work_user` (`work_user_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_CREATED_BY` FOREIGN KEY (`created_by`) REFERENCES `work_user` (`work_user_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_LAST_UPDATED_BY` FOREIGN KEY (`last_updated_by`) REFERENCES `work_user` (`work_user_id`)
);

create table agile_evaluation_scores (
    agile_evaluation_scores_id varchar(255),
    agile_evaluation_id varchar(255),
    appraiser_user_id varchar(255),
    technical_score tinyint,
    technical_comment text,
    communication_score tinyint,
    communication_comment text,
    behavioral_score tinyint,
    behavioral_comment text,
    metric_score tinyint,
    metric_comment text,
    total_score tinyint,
    overall_comment text,
    additional_comment text,
    failure_reason_comment text,
    agile_evaluation_score_date date,
    passed tinyint(1),
    PRIMARY KEY(agile_evaluation_scores_id),
    CONSTRAINT `FK_AGILE_EVALUATION_SCORES_AGILE_EVALUATION` FOREIGN KEY (`agile_evaluation_id`) REFERENCES `agile_evaluations` (`agile_evaluation_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_SCORES_APPRAISER` FOREIGN KEY (`appraiser_user_id`) REFERENCES `work_user` (`work_user_id`)
);drop table if exists agile_story_agile_system_user;
drop table if exists agile_story;
drop table if exists agile_sprint;
drop table if exists agile_system_user;
drop table if exists agile_system;
drop table if exists agile_evaluation_session;
drop table if exists agile_stage;
drop table if exists agile_evaluations;
drop table if exists agile_evaluation_scores;

drop table if exists work_dailyhours;
drop table if exists work_team_member;
drop table if exists work_team;
drop table if exists work_user;

create table work_user (
    work_user_id varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    expected_hours int(11),
    active tinyint(1),
    PRIMARY KEY(work_user_id)
);

create table work_team (
    work_team_id varchar(255),
    work_team_name varchar(255),
    project_id varchar(255), -- From Timecard System
    project_name varchar(255), -- From Timecard System
    active tinyint(1),
    PRIMARY KEY(work_team_id)
);

create table work_team_member (
    work_team_member_id varchar(255),
    work_team_id varchar(255),
    work_user_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(work_team_member_id),
    CONSTRAINT `FK_WORK_TEAM_MEMBER_WORK_TEAM` FOREIGN KEY (`work_team_id`) REFERENCES `work_team` (`work_team_id`),
    CONSTRAINT `FK_WORK_TEAM_MEMBER_WORK_USER` FOREIGN KEY (`work_user_id`) REFERENCES `work_user` (`work_user_id`)
);

create table work_dailyhours (
    work_dailyhours_id varchar(255),
    work_team_member_id varchar(255),
    work_date date,
    hours DOUBLE(11, 2),
    PRIMARY KEY(work_dailyhours_id),
    CONSTRAINT `FK_WORK_DAILYHOURS_WORK_TEAM_MEMBER` FOREIGN KEY (`work_team_member_id`) REFERENCES `work_team_member` (`work_team_member_id`)
);

create table agile_system (
    agile_system_id varchar(255),
    agile_system_name varchar(255),
    agile_system_type varchar(255),
    work_team_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_id),
    CONSTRAINT `FK_AGILE_SYSTEM_WORK_TEAM` FOREIGN KEY (`work_team_id`) REFERENCES `work_team` (`work_team_id`)
);

create table agile_system_user (
    agile_system_user_id varchar(255),
    agile_system_user_name varchar(255),
    agile_system_id varchar(255),
    work_team_member_id varchar(255),
    active tinyint(1),
    PRIMARY KEY(agile_system_user_id),
    CONSTRAINT `FK_AGILE_SYSTEM_USER_WORK_TEAM_MEMBER` FOREIGN KEY (`work_team_member_id`) REFERENCES `work_team_member` (`work_team_member_id`)
);

create table agile_sprint (
    agile_sprint_id varchar(255),
    agile_sprint_name varchar(255),
    agile_system_id varchar(255),
    sprint_description varchar(255),
    sprint_start_date date,
    sprint_end_date date,
    PRIMARY KEY(agile_sprint_id),
    CONSTRAINT `FK_AGILE_SPRINT_AGILE_SYSTEM` FOREIGN KEY (`agile_system_id`) REFERENCES `agile_system` (`agile_system_id`)
);

create table agile_story (
    agile_story_id varchar(255),
    agile_story_name varchar(255),
    agile_sprint_id varchar(255),
    story_description varchar(255),
    story_type varchar(255), 
    story_status varchar(255),
    story_points varchar(255),
    PRIMARY KEY(agile_story_id),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SPRINT` FOREIGN KEY (`agile_sprint_id`) REFERENCES `agile_sprint` (`agile_sprint_id`)
);

create table agile_story_agile_system_user (
    agile_story_agile_system_user_id varchar(255),
    agile_story_id varchar(255),
    agile_system_user_id varchar(255),
    agile_system_user_story_points varchar(255),
    PRIMARY KEY(agile_story_agile_system_user_id),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_STORY` FOREIGN KEY (`agile_story_id`) REFERENCES `agile_story` (`agile_story_id`),
    CONSTRAINT `FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_SYSTEM_USER` FOREIGN KEY (`agile_system_user_id`) REFERENCES `agile_system_user` (`agile_system_user_id`)
);

create table agile_evaluation_session (
    agile_evaluation_session_id varchar(255),
    agile_evaluation_session_name varchar(255),
    agile_evaluation_session_start_date date,
    PRIMARY KEY(agile_evaluation_session_id)
);

create table agile_stage (
    agile_stage_id varchar(255),
    agile_stage_name varchar(255),
    agile_stage_technical_requirements text,
    agile_stage_behavioral_requirements text,
    agile_stage_progression_requirements text,
    PRIMARY KEY(agile_stage_id)
);

create table agile_evaluations (
    agile_evaluation_id varchar(255),
    presenter_user_id varchar(255),
    agile_stage_id varchar(255),
    agile_evaluation_date date,
    created_by varchar(255),
    last_updated_by varchar(255),
    last_updated_date date,
    passed tinyint(1),
    PRIMARY KEY(agile_evaluation_id),
    CONSTRAINT `FK_AGILE_EVALUATION_AGILE_STAGE` FOREIGN KEY (`agile_stage_id`) REFERENCES `agile_stage` (`agile_stage_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_PRESENTER` FOREIGN KEY (`presenter_user_id`) REFERENCES `work_user` (`work_user_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_CREATED_BY` FOREIGN KEY (`created_by`) REFERENCES `work_user` (`work_user_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_LAST_UPDATED_BY` FOREIGN KEY (`last_updated_by`) REFERENCES `work_user` (`work_user_id`)
);

create table agile_evaluation_scores (
    agile_evaluation_scores_id varchar(255),
    agile_evaluation_id varchar(255),
    appraiser_user_id varchar(255),
    technical_score tinyint,
    technical_comment text,
    communication_score tinyint,
    communication_comment text,
    behavioral_score tinyint,
    behavioral_comment text,
    metric_score tinyint,
    metric_comment text,
    total_score tinyint,
    overall_comment text,
    additional_comment text,
    failure_reason_comment text,
    agile_evaluation_score_date date,
    passed tinyint(1),
    PRIMARY KEY(agile_evaluation_scores_id),
    CONSTRAINT `FK_AGILE_EVALUATION_SCORES_AGILE_EVALUATION` FOREIGN KEY (`agile_evaluation_id`) REFERENCES `agile_evaluations` (`agile_evaluation_id`),
    CONSTRAINT `FK_AGILE_EVALUATION_SCORES_APPRAISER` FOREIGN KEY (`appraiser_user_id`) REFERENCES `work_user` (`work_user_id`)
);