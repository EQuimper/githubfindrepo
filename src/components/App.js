import React, {Component} from 'react';
/*>>>>>>=============================================<<<<<<*/

import Profile from './github/Profile.js';
import Search from './github/Search.js';
/*>>>>>>=============================================<<<<<<*/

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: 'EQuimper',
			userData: [],
			userRepos: [],
			perPage: 5
		}
	}
	// Get user Data form GitHub
	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({userData: data});
			}.bind(this),
			error: function (xhr, status, err) {
				this.setState({username: null});
				alert(err);
			}.bind(this)
		       });
	}

	// Get user Repo form GitHub
	getUserRepos(){
		$.ajax({
       url: 'https://api.github.com/users/'+this.state.username+'/repos?/per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
       dataType: 'json',
       cache: false,
       success: function (data) {
	       this.setState({userRepos: data});
       }.bind(this),
       error: function (xhr, status, err) {
	       this.setState({username: null});
	       alert(err);
       }.bind(this)
     });
	}

	handleFormSubmit(username){
		this.setState({username: username}, function () {
			this.getUserData();
			this.getUserRepos();
		})
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}
	render(){
		return(
				<div>
					<Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
					<Profile {...this.state} />
				</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};

App.defaultProps = {
	clientId: '78f7a7e582ba19f21628',
	clientSecret: '50b1ca35770156db069b78e39e6584ea54f20d34'
};

export default App;