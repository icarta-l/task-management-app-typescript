CREATE TABLE teams (
	id bigint PRIMARY KEY,
	title varchar(255) NOT NULL,
	description text
);

CREATE TABLE projects (
	id bigint PRIMARY KEY, 
	name varchar(255) NOT NULL,
	description text
);

CREATE TABLE app_users (
    id bigint PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    description text,
    job_title varchar(255),
    password varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    UNIQUE (username)
);

CREATE TYPE task_status AS ENUM('to do', 'in progress', 'done');

CREATE TABLE tasks (
    id bigint PRIMARY KEY,
    title varchar(255) NOT NULL, 
    description text, 
    foreign_task_reference bigint,
    status task_status NOT NULL DEFAULT 'to do'
);


CREATE TABLE sub_tasks (
    id bigint PRIMARY KEY,
    title text NOT NULL,
    done bool NOT NULL DEFAULT 'false',
    position smallint NOT NULL
);

CREATE TABLE team_members (
    team_id bigint REFERENCES teams,
    user_id bigint REFERENCES app_users,
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE team_projects (
    team_id bigint REFERENCES teams,
    project_id bigint REFERENCES projects,
    PRIMARY KEY (team_id, project_id)
);

CREATE TABLE project_members (
    project_id bigint REFERENCES projects,
    user_id bigint REFERENCES app_users,
    PRIMARY KEY (project_id, user_id)
);

CREATE TABLE project_tasks (
    project_id bigint REFERENCES projects,
    task_id bigint REFERENCES tasks,
    PRIMARY KEY (project_id, task_id)
);

CREATE TABLE user_tasks (
    user_id bigint REFERENCES app_users,
    task_id bigint REFERENCES tasks,
    PRIMARY KEY (user_id, task_id)
);

CREATE TABLE sub_task_lists (
    task_id bigint REFERENCES tasks,
    sub_task_id bigint REFERENCES sub_tasks,
    PRIMARY KEY (task_id, sub_task_id)
);