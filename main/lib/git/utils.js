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

export async function gitCommit(projectPath, commitMessage) {
	try {
		const repo = await Git.Repository.open(`${projectPath}/.git`);
		const index = await repo.refreshIndex();
		await index.addAll();
		await index.write();
		const oid = await index.writeTree();
		const head = await Git.Reference.nameToId(repo, 'HEAD');
		const parent = await repo.getCommit(head);
		const signature = await Git.Signature.default(repo);
		await repo.createCommit('HEAD', signature, signature, commitMessage, oid, [parent]);
		return 0;// TODO: Return the id
	} catch (err) {
		console.error(err);
		return;
	}
}