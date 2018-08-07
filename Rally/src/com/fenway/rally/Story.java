package com.fenway.rally;
import java.util.ArrayList;
import java.util.List;

public class Story {
	private String story_id;
	private Double story_points = 0.0;
	private List<AssignedTo> assigned_to = new ArrayList<AssignedTo>();
	public String getStory_id() {
		return story_id;
	}
	public void setStory_id(String story_id) {
		this.story_id = story_id;
	}
	public Double getStory_points() {
		return story_points;
	}
	public void setStory_points(Double story_points) {
		this.story_points = story_points;
	}
	public List<AssignedTo> getAssigned_to() {
		return assigned_to;
	}
	public void setAssigned_to(List<AssignedTo> assigned_to) {
		this.assigned_to = assigned_to;
	}
	public void addAssigned_to(AssignedTo assigned_to) {
		//First, check to see if the user already exists for the story - if so, add the hours to what's already there
		for (AssignedTo at : this.assigned_to) {
			if (at.getUser().equals(assigned_to.getUser())) {
				//Found an existing user, so add the hours already there with the new hours for the new task
				at.setUser_points(at.getUser_points() + assigned_to.getUser_points());
				return;
			}
		}
		this.assigned_to.add(assigned_to);
	}
}
