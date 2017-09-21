import React, {Component} from 'react';


export default class NewPlaylist extends Component {
	constructor(){
		super();
		this.state = { inputValue : '', dirty:false };
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		this.setState({inputValue: event.target.value, dirty: true})
	}

	handleSubmit(event){
		event.preventDefault();
		console.log(this.state.inputValue)
		console.log(this.props.test)
		console.log('this.props')
		const name = this.state.inputValue

		console.log(this.props.addPlaylist)
		this.props.addPlaylist(name)

		this.setState({inputValue:''})
	}

	render(){
		// console.log(this.state.inputValue)
		const inputLength = this.state.inputValue.length
		const tooLong = inputLength >16
		const tooShort = inputLength <1 && this.state.dirty

		let warning;
		if(tooShort) {
			warning = 'tooshort'
		} else if (tooLong){
			warning = 'toolong'
		}

		return(
			<div className="well">
			  <form onSubmit={this.handleSubmit} className="form-horizontal">
			    <fieldset>
			      <legend>New Playlist</legend>
			      {
			      	warning && <div className="alert alert-warning">{warning}</div>
			      }
			      
			      <div className="form-group">
			        <label className="col-xs-2 control-label">Name</label>
			        <div className="col-xs-10">
			          <input 
			          	value={this.state.inputValue} 
			          	onChange = {this.handleChange} 
			          	className="form-control" 
			          	type="text"/>
			        </div>
			      </div>
			      <div className="form-group">
			        <div className="col-xs-10 col-xs-offset-2">
			          <button 
			          	disabled={this.state.inputValue.length<1 || this.state.inputValue.length>16}
			          	type="submit" 
			          	className="btn btn-success">
			          	Create Playlist</button>
			        </div>
			      </div>
			    </fieldset>
			  </form>
			</div>
		)
	}
}