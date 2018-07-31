package com.fenway.rally;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import com.rallydev.rest.*;
import com.rallydev.rest.request.QueryRequest;
import com.rallydev.rest.response.QueryResponse;
import com.rallydev.rest.util.Fetch;
import com.rallydev.rest.util.QueryFilter;

public class Rally {
	
	//Google GSON - Java serialization/deserialization library to convert Java Objects into JSON and back
	private static Gson gson = new Gson();
	
	/**
	 * Main method
	 * @param args
	 * @throws URISyntaxException
	 * @throws IOException
	 */
	public static void main(String[] args) throws URISyntaxException, IOException {
		//Check to see if a config file was specified - if not, exit out with a message
		if (args == null || args.length == 0 || args[0] == null || args[0].isEmpty()) {
			System.out.println("Please specify the associated config file in JSON format");
			int blah = 0;
			switch (blah) {
				case 0:
					System.out.print(blah);
				case 1:
					System.out.print(blah++);
				case 2:
					System.out.print(blah*2);
					break;
				default:
					System.out.print("Default");
			}
			return;
		}
		//Set the configuration file as what was specified in the command line
		File configFile = new File(args[0]);	
		
		//Retrieve configuration from specified JSON and set it to the configuration object
		StringBuilder configSB = new StringBuilder();
		try (Scanner scanner = new Scanner(configFile)) {
			while (scanner.hasNext()){
				configSB.append(scanner.nextLine());
			}
		}
		Config config = gson.fromJson(configSB.toString(), Config.class);
		
        //Create and configure a new instance of RallyRestApi
        RallyRestApi restApi = new RallyRestApi(new URI("https://rally1.rallydev.com"), config.getApiKey());
        restApi.setApplicationName("Rally");
        
        //Instantiate what will eventually become our JSON object
        Metric metric = new Metric();
        metric.setTeam_id(config.getTeamID());
        
        //Get the list of users to pull tasks (and thus stories) for
    	List<String> userList = config.getUserList();
        
        //Create a map of sprints
        Map<String,Iteration> sprintMap = new HashMap<String,Iteration>();
        try {
           	//Retrieve the previous and current sprint
        	sprintMap = getSprints(restApi, config.getProjectID());
        	
        	//Get the tasks (and consequentially, the stories) for each sprint
        	for (String key : sprintMap.keySet()) {
        		for (String user : userList) {
        			sprintMap.get(key).setStoryMap(getStories(restApi, sprintMap.get(key), user));
        		}
        		
        		//Now need to populate the actual story points per user based on hours worked
        		sprintMap.get(key).setStoryMap(distributePoints(sprintMap.get(key)));
        		
        		//Build out object which will become our JSON object
        		Sprint currSprint = new Sprint();
        		currSprint.setSprint_id(key);
        		//Set the start and end dates of the sprint using just the date component
        		currSprint.setSprint_start_date(sprintMap.get(key).getStartDate().substring(0, sprintMap.get(key).getStartDate().indexOf('T')));
        		currSprint.setSprint_end_date(sprintMap.get(key).getEndDate().substring(0, sprintMap.get(key).getEndDate().indexOf('T')));
        		//Get the list of stories for the sprint
        		List<Story> storyList = new ArrayList<Story>(sprintMap.get(key).getStoryMap().values());
        		currSprint.setStories(storyList);
        		//Add the sprint to the metrics object used to create the JSON output file
        		metric.addSprint(currSprint);
        	}
        	
        	//Convert the metric object to JSON
        	String metricJson = gson.toJson(metric);
        	
        	//Come up with filename
        	StringBuilder pathFileName = new StringBuilder();
        	pathFileName.append("c:/RallyStories/");
        	pathFileName.append(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));
        	pathFileName.append("_");
        	pathFileName.append(configFile.getName());
        	
        	//Write out JSON to file
        	Path path = Paths.get(pathFileName.toString());
        	try (BufferedWriter writer = Files.newBufferedWriter(path)) 
        	{
        	    writer.write(metricJson);
        	    System.out.println("Successfully created JSON extract of metrics\n");
        	} catch (Exception e) {
        		System.out.println("Failed to create JSON extract of metrics - "+e.getMessage());
        	}
        	
        	//Also want to generate a CSV for easy pull-up of summary data per user per sprint
        	//Cheating with the filename - getting rid of the .json and replacing it with _sprints.csv
        	pathFileName.replace(pathFileName.length()-5, pathFileName.length(), "_sprints.csv");
        	path = Paths.get(pathFileName.toString());
        	try (BufferedWriter writer = Files.newBufferedWriter(path)) 
        	{
        		StringBuilder totalUserStoryPoints = new StringBuilder();
        		
        		for (Sprint sprint : metric.getSprint()) {
        			System.out.println("\n"+sprint.getSprint_id()+":");
        			Map<String,Double> users = new HashMap<String,Double>();
        			for (String u : config.getUserList()) {
        				users.put(u, 0.0);
        			}
        			//Loop through all the stories to add up the total story points per user in this sprint
        			for (Story story : sprint.getStories()) {
        				for (AssignedTo owner : story.getAssigned_to()) {
        					if (owner.getUser_points() != null) {
           						users.put(owner.getUser(), users.get(owner.getUser())+owner.getUser_points());
        					}
        				}
        			}
        			//Create output string for each user and their associated story hours
        			for (String user : users.keySet()) {
        				totalUserStoryPoints.append(sprint.getSprint_id()+","+user+","+users.get(user)+"\n");
        				System.out.println(user+" - "+users.get(user)+" points");
        			}
        			
        		}
        		writer.write(totalUserStoryPoints.toString());
        		System.out.println("Successfully created CSV of story points by user");
        	} catch (Exception e) {
        		System.out.println("Failed to create CSV extract of story points by user - "+e.getMessage());
        	}
        	
        } finally {
        	//Release all resources
            restApi.close();
        }
	}

	/**
	 * Retrieves the current and previous sprints in Rally
	 * @param restApi
	 * @return Map<String,Iteration>
	 * @throws IOException
	 */
	private static Map<String,Iteration> getSprints(RallyRestApi restApi, String projectID) throws IOException {
		//Set the begin and end dates for the sprints to pull back
		LocalDateTime startDate = LocalDateTime.now();
		LocalDateTime endDate = LocalDateTime.now();
		startDate = startDate.minusDays(28L);
		//startDate = startDate.minusDays(168L); //Used to get the last 6 sprints
		endDate = endDate.plusDays(14L);
		String startDateISO = startDate.format(DateTimeFormatter.ISO_DATE);
		String endDateISO = endDate.format(DateTimeFormatter.ISO_DATE);
		System.out.println("Retrieving last 2 sprints...");
		QueryRequest iterations = new QueryRequest("iteration");
		iterations.setFetch(new Fetch("Name", "Notes", "StartDate", "EndDate"));
		QueryFilter firstFilter = new QueryFilter("Project.ObjectUUID", "=", projectID);
		QueryFilter secondFilter = new QueryFilter("StartDate", ">=", startDateISO);
		QueryFilter thirdFilter = new QueryFilter("EndDate", "<=", endDateISO);
		iterations.setQueryFilter(firstFilter.and(secondFilter).and(thirdFilter));
		QueryResponse queryResponse = restApi.query(iterations);
		Map<String,Iteration> sprintMap = new HashMap<String,Iteration>();
		for (JsonElement result : queryResponse.getResults()) {
            Iteration sprint = gson.fromJson(result, Iteration.class);
            sprintMap.put(sprint.getName(), sprint);
        }
		return sprintMap;
	}
	
	/**
	 * Takes the restApi connection, the current Sprint, and the user to pull from and returns back a map of stories for that sprint and user
	 * @param restApi
	 * @param currSprint
	 * @param user
	 * @return Map<String,Story>
	 * @throws IOException
	 */
	private static Map<String,Story> getStories(RallyRestApi restApi, Iteration currSprint, String user) throws IOException{
		Map<String,Story> storyMap = (currSprint.getStoryMap() == null) ? new HashMap<String,Story>() : currSprint.getStoryMap();
		System.out.println(String.format("\n\nRetrieving stories for %s for %s...",user,currSprint.getName()));
		QueryRequest tasks = new QueryRequest("task");
		tasks.setFetch(new Fetch("WorkProduct", "Owner", "Project", "Release", "Iteration", "Name", "State", "PlanEstimate", "Estimate", "Actuals"));
		QueryFilter firstFilter = new QueryFilter("Iteration.Name", "=", currSprint.getName());
		QueryFilter secondFilter = new QueryFilter("Owner.Name", "=", user);
		tasks.setQueryFilter(firstFilter.and(secondFilter));
		QueryResponse queryResponse = restApi.query(tasks);
		System.out.println(String.format("\nTotal tasks: %d", queryResponse.getTotalResultCount()));
		for (JsonElement result : queryResponse.getResults()) {
			Task task = gson.fromJson(result,  Task.class);
			String story_id = task.getWorkProduct().getFormattedID();
			
			//Get the story associated with the task
			Story newStory;
			if (storyMap.containsKey(story_id)){
				//This story already exist in the story map, so update it
				newStory = storyMap.get(story_id);
			} else {
				//This is a new story, so create it
				newStory = createStory(restApi, story_id);
			}
			if (newStory != null) {
				AssignedTo newUser = new AssignedTo();
				
				//Set the owner properties for the story
				newUser.setUser(user);
				newUser.setUser_points(task.getActuals());
				
				//Set the story properties
				newStory.addAssigned_to(newUser);
				newStory.setStory_points(task.getWorkProduct().getPlanEstimate());
				
				//Save the new/updated story to the sprint's story map
				storyMap.put(story_id, newStory);
			}
			
        }
		
		return storyMap;
	}
	
	/**
	 * Creates a new story and assigns the story_id to it if the story is in a completed or accepted state - otherwise, return a null
	 * @param restApi
	 * @param story_id
	 * @return Story
	 * @throws IOException
	 */
	private static Story createStory(RallyRestApi restApi, String story_id) throws IOException {
		QueryRequest hir = new QueryRequest("hierarchicalrequirement");
		hir.setFetch(new Fetch("FormattedID", "ScheduleState"));
		QueryFilter filter = new QueryFilter("FormattedID", "=", story_id);
		hir.setQueryFilter(filter);
		QueryResponse queryResponse = restApi.query(hir);
		for (JsonElement result : queryResponse.getResults()) {
			HierarchyItem hi = gson.fromJson(result, HierarchyItem.class);
			System.out.println(hi.getFormattedID()+" - "+hi.getScheduleState());
			if (hi.getScheduleState() != null && (hi.getScheduleState().equalsIgnoreCase("Completed") || hi.getScheduleState().equalsIgnoreCase("Accepted"))) {
				Story newStory = new Story();
				newStory.setStory_id(story_id);
				return newStory;
			}
		}
		return null;
	}

	/**
	 * Calculates distribution of points based on hours worked by each team member
	 * @param currSprint
	 * @return Map<String,Story>
	 */
	private static Map<String, Story> distributePoints(Iteration currSprint) {
		Map<String,Story> storyMap = (currSprint.getStoryMap() == null) ? new HashMap<String,Story>() : currSprint.getStoryMap();
		for (String story_id : storyMap.keySet()) {
			Story currStory = storyMap.get(story_id);
			if (currStory.getAssigned_to().size() == 1) {
				//Only one person assigned to the story, therefore that person gets all the story points
				currStory.getAssigned_to().get(0).setUser_points(currStory.getStory_points());
			} else {
				//More than one person assigned to the story, therefore need to split based on the hours worked
				Double storyPoints = currStory.getStory_points();
				
				//Need to calculate the total hours to calculate what percentage of the points each person should receive
				Double totalHours = 0.0;
				for (AssignedTo currUser : currStory.getAssigned_to()) {
					totalHours += currUser.getUser_points();
				}
				
				//Can now calculate percentage of story points to assign to each person
				for (AssignedTo currUser : currStory.getAssigned_to()) {
					Double thisUserPoints = currUser.getUser_points()/totalHours*storyPoints;
					//Round it to the nearest thousandth
					thisUserPoints = ((int) ((thisUserPoints * 1000.0) + ((thisUserPoints < 0.0) ? -0.5 : 0.5))) / 1000.0;
					currUser.setUser_points(thisUserPoints);
				}
			}
		}
		return storyMap;
	}
	
}
