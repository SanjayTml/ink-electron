import { Store } from "./store";

const defaultDoc = "store";
const objectName = "user";
const defaultValue = {};
let userStore;

export function init() {
	userStore = new Store(defaultDoc, objectName, defaultValue);
	return userStore;
}

export function User(email) {
	this.email = email;
}

export function set(user) {
	userStore.set(user);
	return user;
}

export function get() {
	return userStore.get();
}

export function reset() {
	userStore.set(defaultValue);
	return [];
}
