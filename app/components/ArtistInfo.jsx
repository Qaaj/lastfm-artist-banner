'use strict'
var React = require('react');
module.exports = React.createClass({

	getInitialState: function() {
        return {
            artist: "",
            artist_url: "http://jimpunk.net/Loading/wp-content/uploads/loading6.gif"
        };
    },

  	componentDidMount: function() {
     this.getInfo();
  	},
  	render: function() {        
      var divStyle = {
        backgroundImage: "url(" + this.state.artist_url + ")"
      };
    	return <div>
               <div className="avatar-holder" style={divStyle}></div>
           </div>
  	},
  	getInfo:function(){

  		var that = this;

      // LAST FM 
     	// $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+ that.props.artist + "&api_key=07794bbd8ceb3fc636085da01e965506&format=json", function(data){
     	// 	var img = data.artist.image[2]["#text"];
      //   	that.setState({artist_url:img,artist:that.props.artist});
     	// });

      // GOOGLE IMAGES
      var iURL = "http://ajax.googleapis.com/ajax/services/search/images";
      $.ajax({
          url: iURL,
          type: 'GET',
          dataType: 'jsonp',
          data: {
              v:  '1.0',
              q:  that.props.artist,
              format: 'json',
              jsoncallback:  '?'
          },
          success: function(data){
              var img =data.responseData.results[1].url;
              that.setState({artist_url:img,artist:that.props.artist});
          },
          error: function(xhr, textStatus, error){
              console.log(xhr.statusText, textStatus, error);
          }
          
      });




      var imgHolder = $(that.getDOMNode()).find('.avatar-holder');
      imgHolder.hover(
        function() {
         $(".artist_title_text").fadeOut( 50, function() {
            $(".artist_title_text").text(that.props.artist);
            $(".artist_title_text").fadeIn();
          });
          
        }, function() {

           $(".artist_title_text").fadeOut( 50, function() {
            $(".artist_title_text").text("Artists featured in this article");
            $(".artist_title_text").fadeIn();
          });
           
        }
      );
  }
})