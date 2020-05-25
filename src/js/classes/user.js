class user {
	constructor(i, t, n) {
		this._id = i;
		this._type = t;
		this._name = n;
	}

	get id() {
		return this._id;
	}

	set id(x) {
		this._id = x;
	}


	get type() {
		return this.type;
	}

	set type(x) {
		this._id = type;
	}


	get name() {
		return this._name;
	}

	set name(x) {
		this._name = x;
	}

	print() {
		console.log("_id:" + this._id);
		console.log("_name:" + this._name);
	}
}

export default user;