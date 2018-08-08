#!/usr/bin/env python3

from collections import Counter
from collections import OrderedDict
from jira import JIRA
import urllib3
import getpass
import json
import sys
import configparser
import ast

# Default Globals
config_file		= 'jira.conf'

class JiraPull():

	def __init__(self):
		# Read Defaults
		self.config_file	= config_file
		self.file_mode		= True

		# Load Jira Configuration Variables
		config				= self.get_config()
		self.jira_host		= config['jira']['JiraHost']
		self.jira_user		= config['jira']['User']
		self.jira_pass		= getpass.getpass("Password for {}:".format(self.jira_user))
		self.jira_verify	= config['jira']['Verify']
		self.user_file		= config['jira']['UserFile']
		self.sprint			= config['jira']['Sprint']
		self.project		= config['jira']['Project']
		self.issuetype		= config['jira']['Issuetype']
		self.logfile		= open("{}_log.txt".format(self.sprint),"a+")

		# Load User List
		self.user_list		= self.get_users()
		
		# Initialize Jira
		self.jira			= self.jira_auth()


	def get_config(self):
		try:
			print("Loading Jira Configuration File: {}".format(self.config_file))
			config = configparser.ConfigParser()
			config.read(self.config_file)
			print("Config Load Complete.")
		except Exception as e:
			print('Error reading jira.conf file.')
			print('Check read permissions and formatting')
			print(e)
			sys.exit(1)
		return config


	def get_users(self):
		try:
			self.logfile.write("Loading User File: {}\n".format(self.user_file))
			with open(self.user_file, 'r') as f:
				users = json.loads(f.read())
			self.logfile.write("User Load Complete.\n")
		except Exception as e:
			self.logfile.write('Unable to read {} file\n'.format(self.user_file))
			self.logfile.write(e)
			sys.exit(1)
		return users


	def jira_auth(self):
		try:
			self.logfile.write("Authenticating with {}\n".format(self.jira_host))
			urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
			verify		= (True if self.jira_verify=="True" else False)
			options		= {'server': self.jira_host, 'verify':	verify}
			jira		= JIRA(options, basic_auth=(self.jira_user, self.jira_pass))
			self.logfile.write("Authentication Successful\n")
		except Exception as e:
			self.logfile.write("Authentication with {} Failed.\n".format(self.jira_host))
			self.logfile.write(e)
			sys.exit(1)
		return jira


	def parse_args(self):
		pass


	def jql_pull_assigned(self):

		try:
			self.logfile.write('Parsing Jira Users\n')
			user_names = []
			for user in self.user_list:
				user_names.append(user['user'])
			jira_users = ",".join(user_names)
		except Exception as e:
			self.logfile.write('Failed to Parse Jira Users\n')
			self.logfile.write(e)
			sys.exit(1)
		
		jql_string = "project = {} AND assignee in ({}) and Sprint = '{}' and issuetype in {}".format(self.project, jira_users, self.sprint, self.issuetype)
		try:
			self.logfile.write("Loading JIRA Issues\n")
			self.logfile.write("Query: {}\n".format(jql_string))
			jira_issues = self.jira.search_issues(jql_string, maxResults=300)
			self.logfile.write("{} Issues Loaded from JIRA.\n".format(len(jira_issues)))
		except Exception as e:
			self.logfile.write('Failed to Load JIRA Issues\n')
			self.logfile.write(e)
			sys.exit(1)
		return jira_issues

	def jql_pull_paired(self):
		pass

	def get_sprint_stories_jql(self):
		pass

	def parse_metrics(self, jira_issues):
	
		metrics_data = OrderedDict({'team_id' : self.project})
		stories = []
		metrics_data['sprint'] = [{'sprint_id' : self.sprint, 'sprint_name' : self.sprint, 'sprint_start' : "01/01/2010", 'sprint_end' : "01/01/2017", 'stories' : stories}]
		for user_details in self.user_list:
			user_story_points = 0
			user_story_count  = 0
			user_id		= user_details['user']
			user_name	= user_details['name']
			user_type	= user_details['type']
			self.logfile.write("JIRA Issues for {}\n".format(user_name))
			self.logfile.write('='*25+'\n')
			for issue in jira_issues:
				issue_key		= issue.key
				issue_summary	= issue.fields.summary
				assigned_to = []
				if issue.fields.assignee.name == user_id:
					try:
						story_points = issue.fields.customfield_10053
					except AttributeError as e:
						story_points = 0.0
					try:
						assigned_to.append({'user': user_id, 'user_points': story_points})
						stories.append({'story_id': issue_key, 'story_points': int(story_points), 'assigned to' : assigned_to})
						user_story_points += story_points
					except TypeError as e:
						self.logfile.write(issue_key, issue_summary)
						assigned_to.append({'user': user_id, 'user_points': 0})
						stories.append({'story_id': issue_key, 'story_points': 0, 'assigned to' : assigned_to})
					user_story_count  += 1
					self.logfile.write('{} - [{:<3}] - {}\n'.format(issue.key,story_points,issue.fields.summary))
			self.logfile.write('Total Stories:	   {}\n'.format(user_story_count))
			self.logfile.write('Total Story Points: {}\n'.format(int(user_story_points)))
		self.json_parse(metrics_data)


	def json_parse(self, metrics_data):
		json_file = "{}.json".format(self.sprint)
		self.logfile.write("Creating JSON File [{}]\n".format(json_file))
		json_data = json.dumps(metrics_data, sort_keys = False, indent = 4)
		with open(json_file, 'w') as f:
			f.write(json_data)
		print("{} Created.".format(json_file))

if __name__ == '__main__':
	jira = JiraPull()
	jira_issues = jira.jql_pull_assigned()
	jira.parse_metrics(jira_issues)
