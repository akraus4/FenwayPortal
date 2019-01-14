package com.fenway.rally;

public class Task {
	private String _rallyAPIMajor;
	private String _rallyAPIMinor;
	private String _ref;
	private String _refObjectUUID;
	private String FormattedID;
	private Owner Owner;
	private double Actuals;
	private double Estimate;
	private WorkProduct WorkProduct;
	private String State;
	public String get_rallyAPIMajor() {
		return _rallyAPIMajor;
	}
	public void set_rallyAPIMajor(String _rallyAPIMajor) {
		this._rallyAPIMajor = _rallyAPIMajor;
	}
	public String get_rallyAPIMinor() {
		return _rallyAPIMinor;
	}
	public void set_rallyAPIMinor(String _rallyAPIMinor) {
		this._rallyAPIMinor = _rallyAPIMinor;
	}
	public String get_ref() {
		return _ref;
	}
	public void set_ref(String _ref) {
		this._ref = _ref;
	}
	public String get_refObjectUUID() {
		return _refObjectUUID;
	}
	public void set_refObjectUUID(String _refObjectUUID) {
		this._refObjectUUID = _refObjectUUID;
	}
	public String getFormattedID() {
		return FormattedID;
	}
	public void setFormattedID(String formattedID) {
		FormattedID = formattedID;
	}
	public Owner getOwner() {
		return Owner;
	}
	public void setOwner(Owner owner) {
		Owner = owner;
	}
	public double getActuals() {
		return Actuals;
	}
	public void setActuals(double actuals) {
		Actuals = actuals;
	}
	public double getEstimate() {
		return Estimate;
	}
	public void setEstimate(double estimate) {
		Estimate = estimate;
	}
	public WorkProduct getWorkProduct() {
		return WorkProduct;
	}
	public void setWorkProduct(WorkProduct workProduct) {
		WorkProduct = workProduct;
	}
	public String getState() {
		return State;
	}
	public void setState(String state) {
		State = state;
	}
}
