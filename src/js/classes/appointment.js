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

    exportStartDate(){
        return new Date(this._stime)
    }

    exportEndDate(){
        return new Date(this._etime)
    }

    indexMonth(){
        return new Date(this._stime).getMonth()
    }

	print() {
		console.log("_id:" + this._id);
		console.log("_uid:" + this._uid);

	}
}


class routapp extends appointment {
    constructor(i, u, c, t, o, h, ty, n, s, e, r, tl, ta){
        super(i, u, c, t, o, h, ty, n, s, e);
        this._rate = r;
		this._total = tl;
        this._tasks = ta;
    }

    getTaskCount(){
        console.log(this._tasks);
        if(this._tasks === undefined || this._tasks === ""){return;}
        return this._tasks.split(",").length;
    }
}


class consapp extends appointment {
    constructor(f){
        this._firsttime = f;

    }
    getCost(){
        if(this._firsttime === false){
            this._total = 20;
        }
    }
}

class specapp extends appointment {
    constructor(i, u, c, t, o, h, ty, n, s, e, r, tl, su){
        super(i, u, c, t, o, h, ty, n, s, e);
        this._rate = r;
		this._total = tl;
        this._supply = su;

    }


}


export {
    appointment,
    routapp,
    consapp,
    specapp
}