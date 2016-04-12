var React = require('react');
var AvatarCropper = require("react-avatar-cropper");
import ReactDom from "react-dom";

var FileUpload = React.createClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
    );
  }
});

var HeaderProfile = React.createClass({
	getInitialState: function() {
	    return {
	      cropperOpen: false,
	      img: null,
	      croppedImg: this.props.profile && this.props.profile.photo_link ? this.props.profile.photo_link : ""
	    };
	  },
	  handleFileChange: function(dataURI) {
	    this.setState({
	      img: dataURI,
	      croppedImg: this.state.croppedImg,
	      cropperOpen: true
	    });
	  },
	  handleCrop: function(dataURI) {
	  	this.props.uploadAvatar(dataURI);
	    this.setState({
	      cropperOpen: false,
	      img: null,
	      croppedImg: dataURI
	    });
	  },
	  handleRequestHide: function() {
	    this.setState({
	      cropperOpen: false
	    });
	  },
	render: function render() {
		return <header className="header-profile">
			<div className="imageProfileHeaderBlock">
				{this.props.profile && <img className="imageProfileHeader" src={this.state.croppedImg ? this.state.croppedImg :
					(this.props.profile.photo_link ? this.props.profile.photo_link :
					(this.props.profile.gender == "female" ? "image/female_icon.png" : "image/male_icon.png"))} />}
				<div className="text-center uploadFile">
					Edit photo
					<FileUpload handleFileChange={this.handleFileChange} />
				</div>
			</div>
			{this.state.cropperOpen &&
	          <AvatarCropper
	            onRequestHide={this.handleRequestHide}
	            cropperOpen={this.state.cropperOpen}
	            onCrop={this.handleCrop}
	            image={this.state.img}
	            width={400}
	            height={400}
	          />
	        }
			<h2 className="labelProfileHeader">{this.props.profile ? this.props.profile.given_name+" "+this.props.profile.family_name : ""}</h2>
		</header>
	}
})

module.exports = HeaderProfile;