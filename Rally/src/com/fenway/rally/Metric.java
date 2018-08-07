package com.fenway.rally;
import java.util.ArrayList;
import java.util.List;

public class Metric {
	private String team_id;
	private List<Sprint> sprint = new ArrayList<Sprint>();
	public String getTeam_id() {
		return team_id;
	}
	public void setTeam_id(String team_id) {
		this.team_id = team_id;
	}
	public List<Sprint> getSprint() {
		return sprint;
	}
	public void setSprint(List<Sprint> sprint) {
		this.sprint = sprint;
	}
	public void addSprint(Sprint sprint) {
		this.sprint.add(sprint);
	}
}
