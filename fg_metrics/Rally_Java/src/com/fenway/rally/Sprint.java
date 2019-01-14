package com.fenway.rally;

import java.util.List;

public class Sprint {
	private String sprint_id;
	private String sprint_start_date;
	private String sprint_end_date;
	private List<Story> stories;
	public String getSprint_id() {
		return sprint_id;
	}
	public void setSprint_id(String sprint_id) {
		this.sprint_id = sprint_id;
	}
	public String getSprint_start_date() {
		return sprint_start_date;
	}
	public void setSprint_start_date(String sprint_start_date) {
		this.sprint_start_date = sprint_start_date;
	}
	public String getSprint_end_date() {
		return sprint_end_date;
	}
	public void setSprint_end_date(String sprint_end_date) {
		this.sprint_end_date = sprint_end_date;
	}
	public List<Story> getStories() {
		return stories;
	}
	public void setStories(List<Story> stories) {
		this.stories = stories;
	}
}
