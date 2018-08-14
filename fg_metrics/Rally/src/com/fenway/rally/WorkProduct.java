package com.fenway.rally;

public class WorkProduct {
	private String FormattedID;
	private String Name;
	private Double PlanEstimate;
	private String ScheduleState;
	public String getFormattedID() {
		return FormattedID;
	}
	public void setFormattedID(String formattedID) {
		FormattedID = formattedID;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Double getPlanEstimate() {
		return PlanEstimate;
	}
	public void setPlanEstimate(Double planEstimate) {
		PlanEstimate = planEstimate;
	}
	public String getScheduleState() {
		return ScheduleState;
	}
	public void setScheduleState(String state) {
		ScheduleState = state;
	}
}
