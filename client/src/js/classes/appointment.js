class appointment {
	constructor(i, u, c, t, o, h, ty, n, s, e) {
		this._id = i;
        this._userid = u;
		this._custid = c;
		this._title = t;
		this._overlap = o;
		this._hours = h;
        this._type = ty;
        this._notes = n;
        this._stime = s;
        this._etime = e;
    }
    
    get id() {
		return this._id;
	}

	set id(x) {
		this._id = x;
	}

	get userid() {
		return this._userid;
	}

	set userid(x) {
		this._userid = x;
	}

    get custid() {
		return this._custid;
	}

	set custid(x) {
		this._custid = x;
    }
    
    get title() {
		return this._title;
	}

	set title(x) {
		this._title = x;
    }
    
    get overlap() {
		return this._overlap;
	}

	set overlap(x) {
		this._overlap = x;
    }
    
    get hours() {
		return this._hours;
	}

	set hours(x) {
		this._hours = x;
    }
    
    get type() {
		return this._type;
	}

	set type(x) {
		this._type = x;
    }
    
    get notes() {
		return this._notes;
	}

	set notes(x) {
		this._notes = x;
    }
    
    get stime() {
		return this._stime;
	}

	set stime(x) {
		this._stime = x;
    }
    
    get etime() {
		return this._etime;
	}

	set etime(x) {
		this._etime = x;
	}

    exportStartDate(){
        return new Date(this._stime)
    }

    exportEndDate(){
        return new Date(this._etime)
    }

    indexMonth(){
        return new Date(this._stime).getMonth()
    }


}


class routapp extends appointment {
    constructor(i, u, c, t, o, h, ty, n, s, e, r, tl, ta){
        super(i, u, c, t, o, h, ty, n, s, e);
        this._rate = r;
		this._total = tl;
        this._tasks = ta;
    }

    get rate() {
		return this._rate;
	}

	set rate(x) {
		this._rate = x;
    }
    
    get total() {
		return this._total;
	}

	set total(x) {
		this._total = x;
	}

    get task() {
		return this._task;
	}

	set task(x) {
		this._task = x;
    }
    
    getTaskCount(){
        if(this._tasks === undefined || this._tasks === ""){return;}
        return this._tasks.split(",").length;
    }
}


class specapp extends appointment {
    constructor(i, u, c, t, o, h, ty, n, s, e, r, tl, su){
        super(i, u, c, t, o, h, ty, n, s, e);
        this._rate = r;
		this._total = tl;
        this._supply = su;

    }

    get rate() {
		return this._rate;
	}

	set rate(x) {
		this._rate = x;
    }
    
    get total() {
		return this._total;
	}

	set total(x) {
		this._total = x;
	}

    get supply() {
		return this._supply;
	}

	set supply(x) {
		this._supply = x;
	}

}


export {
    appointment,
    routapp,
    specapp
}