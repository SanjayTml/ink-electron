import { Store } from "./store";

var defaultDoc = "store";
var objectName = "projects";
var defaultValue = [];
var projectStore;

export function init() {
	projectStore = new Store(defaultDoc, objectName, defaultValue);
	return projectStore;
}

export function Project(id, name, path, type) {
	this.id = id;
	this.name = name;
	this.path = path;
	this.type = type;
}

export function append(newProject) {
	var projects = projectStore.get();
	projects.push(newProject);
	projectStore.set(projects);
	return projects;
}

export function list() {
	return projectStore.get();
}

export function reset() {
	projectStore.set(defaultValue);
	return [];
}

export function getByPath(path) {
	var projects = projectStore.get();
	return projects.find(project => project.path === path);
}