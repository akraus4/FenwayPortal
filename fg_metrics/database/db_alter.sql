use fg_metrics_dev;

alter table work_user
add column active tinyint(1);

alter table work_team
add column active tinyint(1);

alter table work_team_member
add column active tinyint(1);

alter table agile_system
add column active tinyint(1);

alter table agile_system_user
add column active tinyint(1);
