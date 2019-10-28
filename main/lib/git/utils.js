import Git from 'nodegit';
import 'path';

export async function gitCheckAndInit(projectPath) {
	try {
		await Git.Repository.open(`${projectPath}/.git`);
		console.log('ALREADY INITIALIZED', projectPath); // TODO: use `debug` module
	} catch (err) {
		if (err.errno === Git.Error.CODE.ENOTFOUND) {
			const repo = await Git.Repository.init(`${projectPath}/.git`, 0);
			console.log('REPO CREATED', repo); // TODO: use `debug` module
		} else {
			throw err;
		}
	}
}

export async function gitStatus(projectPath) {
	const repo = await Git.Repository.open(`${projectPath}/.git`);
	const statuses = await repo.getStatus();
	const state = {
		modified: [],
		new: [],
		deleted: [],
	};

	statuses.forEach(file => {
	if (file.isModified()) {
			state.modified.push(file.path());
		} else if (file.isNew()) {
			state.new.push(file.path());
		} else if (file.isDeleted()) {
			state.deleted.push(file.path());
		}
	});
	return state;
}

export async function gitCommit(projectPath, commitMessage, user) {
	try {
		const repo = await Git.Repository.open(`${projectPath}/.git`);
		const index = await repo.refreshIndex();
		await index.addAll();
		await index.write();
		const oid = await index.writeTree();

		// Fetching parents to create commit
		const headCommit =  await repo.getHeadCommit();
		// If no commit yet, parents is an empty array
		let parents = []
		if (headCommit) {
			const head = await Git.Reference.nameToId(repo, 'HEAD');
			const parent = await repo.getCommit(head);
			parents = [parent]
		}

		// Using logged in user email as signature's name and email
		// Can be changed later on when the collaboration platform is in place
		const signature = await Git.Signature.now(user.email, user.email)

		await repo.createCommit('HEAD', signature, signature, commitMessage, oid, parents);
		return 0; // TODO Return the id
	} catch (err) {
		// TODO Handle error to display to the user
		console.error(err);
		return;
	}
}
