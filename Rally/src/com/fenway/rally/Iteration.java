package com.fenway.rally;

import java.util.Map;

public class Iteration {
	private String _rallyAPIMajor;
	private String _rallyAPIMinor;
	private String _ref;
	private String _refObjectUUID;
	private String _objectVersion;
	private String _refObjectName;
	private String EndDate;
	private String Name;
	private String Notes;
	private String StartDate;
	private String _type;
	private Map<String,Story> storyMap;
	/**
	 * @return the _rallyAPIMajor
	 */
	String get_rallyAPIMajor() {
		return _rallyAPIMajor;
	}
	/**
	 * @param _rallyAPIMajor the _rallyAPIMajor to set
	 */
	void set_rallyAPIMajor(String _rallyAPIMajor) {
		this._rallyAPIMajor = _rallyAPIMajor;
	}
	/**
	 * @return the _rallyAPIMinor
	 */
	String get_rallyAPIMinor() {
		return _rallyAPIMinor;
	}
	/**
	 * @param _rallyAPIMinor the _rallyAPIMinor to set
	 */
	void set_rallyAPIMinor(String _rallyAPIMinor) {
		this._rallyAPIMinor = _rallyAPIMinor;
	}
	/**
	 * @return the _ref
	 */
	String get_ref() {
		return _ref;
	}
	/**
	 * @param _ref the _ref to set
	 */
	void set_ref(String _ref) {
		this._ref = _ref;
	}
	/**
	 * @return the _refObjectUUID
	 */
	String get_refObjectUUID() {
		return _refObjectUUID;
	}
	/**
	 * @param _refObjectUUID the _refObjectUUID to set
	 */
	void set_refObjectUUID(String _refObjectUUID) {
		this._refObjectUUID = _refObjectUUID;
	}
	/**
	 * @return the _objectVersion
	 */
	String get_objectVersion() {
		return _objectVersion;
	}
	/**
	 * @param _objectVersion the _objectVersion to set
	 */
	void set_objectVersion(String _objectVersion) {
		this._objectVersion = _objectVersion;
	}
	/**
	 * @return the _refObjectName
	 */
	String get_refObjectName() {
		return _refObjectName;
	}
	/**
	 * @param _refObjectName the _refObjectName to set
	 */
	void set_refObjectName(String _refObjectName) {
		this._refObjectName = _refObjectName;
	}
	/**
	 * @return the endDate
	 */
	String getEndDate() {
		return EndDate;
	}
	/**
	 * @param endDate the endDate to set
	 */
	void setEndDate(String endDate) {
		EndDate = endDate;
	}
	/**
	 * @return the name
	 */
	String getName() {
		return Name;
	}
	/**
	 * @param name the name to set
	 */
	void setName(String name) {
		Name = name;
	}
	/**
	 * @return the notes
	 */
	String getNotes() {
		return Notes;
	}
	/**
	 * @param notes the notes to set
	 */
	void setNotes(String notes) {
		Notes = notes;
	}
	/**
	 * @return the startDate
	 */
	String getStartDate() {
		return StartDate;
	}
	/**
	 * @param startDate the startDate to set
	 */
	void setStartDate(String startDate) {
		StartDate = startDate;
	}
	/**
	 * @return the _type
	 */
	String get_type() {
		return _type;
	}
	/**
	 * @param _type the _type to set
	 */
	void set_type(String _type) {
		this._type = _type;
	}
	/**
	 * @return the storyList
	 */
	public Map<String,Story> getStoryMap() {
		return storyMap;
	}
	/**
	 * @param storyList the storyList to set
	 */
	public void setStoryMap(Map<String,Story> storyMap) {
		this.storyMap = storyMap;
	}
}
