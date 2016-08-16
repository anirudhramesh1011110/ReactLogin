var React = require('react');
var ReactDOM = require('react-dom');

var Register = React.createClass ({

	getInitialState: function(){
    return this.state = {
        email: "",
        password: "",
        passwordConfirm: "",
				errMsg: "",
        emailError: ""
    };
  },

	onChange: function(elem){
		var updateState = {};
		updateState[elem.target.name] = elem.target.value;
		this.setState(updateState);
	},

  _register: function(e){

     e.preventDefault();

			$.ajax({
				url: '/register',
				dataType: 'json',
				type: 'POST',
				data: this.state,
				success: function(data) {
          console.log(data);
					if(data.status === 'ok') {
						window.location = 'https://www.google.com/'
					} else if(data.status === 'error') {
						this.setState({
							errMsg: data.error,
              emailError: data.emailError
						});
					}
				}.bind(this),
				error: function(xhr, status, err) {
          console.log('error', err);
				}.bind(this)
			});
  },

  render: function() {

    return (
      <div className="container" >
             <div className="card card-container" >
                 <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
                 <p id="profile-name" className="profile-name-card" ></p>
                 <form className="form-signin" method="POST" href="/register" >
                     <input type="email" id="email" className="form-control" name="email" placeholder="Email address" onChange={this.onChange} required />
                     <input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange} required />
                     <input type="password" id="passwordConfirm" className="form-control" name="passwordConfirm" placeholder="Confirm Password"  onChange={this.onChange} required />
                     <div id="remember" className="checkbox">
                         <label>
                             <input type="checkbox" value="remember-me" /> Remember me
                         </label>
                     </div>
                      <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this._register}>Sign Up</button>
                 </form>
                 <br />
								 <div className="error">
								 	<b>{this.state.errMsg}</b><br />
                  <b>{this.state.emailError}</b>
								 </div>
             </div>
         </div>
    );
  }
});

module.exports = Register;
