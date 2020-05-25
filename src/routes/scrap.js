
//width 14.286%



	{
	this.state.test.map((user, index) => (

		<label className="btn btn-secondary w-100">
			<input type="radio" name="user" id={'option' + index} checked={false} />{user}
		</label>
	)
	)

}