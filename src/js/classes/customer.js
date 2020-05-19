class customer {
	constructor(i, u, n, a, a2, c, z, p) {
		this._id = i;
		this._uid = u;
		this._name = n;
		this._address = a;
		this._address2 = a2;
		this._city = c;
		this._zip = z;
		this._phone = p;

	}

	get id() {
		return this._id;
	}

	set id(x) {
		this._id = x;
	}

	get uid() {
		return this._id;
	}

	set uid(x) {
		this._id = x;
	}

	get name() {
		return this._name;
	}

	set name(x) {
		this._name = x;
	}

	get address() { 
		return this._address;
	}

	set address(x) {
		this._address = x;
	}

	get address2() { 
		return this._address2;
	}

	set address2(x) {
		this._address2 = x;
	}

	get city() { 
		return this._city;
	}

	set city(x) {
		this._city = x;
	}

	get zip() { 
		return this._zip;
	}

	set zip(x) {
		this._zip = x;
	}

	get phone() { 
		return this._phone;
	}

	set phone(x) {
		this._phone = x;
	}

	print() {
		console.log("_id:" + this._id);
		console.log("_uid:" + this._uid);
		console.log("_name:" + this._name);
		console.log("_address" + this._address);
		console.log("_address2" + this._address2);
		console.log("_city" + this._city);
		console.log("_zip" + this._zip);
		console.log("_phone" + this._phone);
	}
}

export default customer;