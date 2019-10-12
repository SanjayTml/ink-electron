import { Store } from "./store";

const defaultDoc = "store";
const objectName = "projects";
const defaultValue = [];
let projectStore;

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
	if (newProject.id == null || newProject.name == null || newProject.path == null) {
		throw new Error('invalid project id/name/path');
		return projects;
	}
	projects.push(newProject);
	projectStore.set(projects);
	return projects;
}

export function list() {
	return projectStore.get();
}

export function reset() {
	projectStore.set(defaultValue);
	return list();
}

export function getByPath(path) {
	var projects = projectStore.get();
	return projects.find(project => project.path === path);
}