webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(3);
	__webpack_require__(4);

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ArtistHeader = __webpack_require__(7);

	var artists = window.post_meta.split(",");
	React.render(React.createElement(ArtistHeader, { artists: artists }), document.getElementById('react_artists'));
	$(".artistHolder").width(10 + artists.length * 110);

	$("iframe").each(function () {
	  var src = $(this).attr("src");
	  if (src.indexOf("soundcloud") > -1) {
	    $(this).wrap("<div class='soundcloud'></div>");
	  }
	});

	$(".post_title").text(window.post_title);
	$(".post_date").text(window.post_time);

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var ArtistInfo = __webpack_require__(8);

	module.exports = React.createClass({
	    displayName: 'exports',

	    getInitialState: function getInitialState() {
	        return {
	            artists: []
	        };
	    },

	    render: function render() {

	        var artistlist = [];

	        for (var i = 0; i < this.props.artists.length; i++) {
	            artistlist.push(React.createElement(ArtistInfo, { key: i, className: 'tag-item label label-default', artist: this.props.artists[i] }));
	        }

	        return React.createElement(
	            'div',
	            { className: '' },
	            React.createElement(
	                'div',
	                { className: 'artist_title' },
	                React.createElement(
	                    'div',
	                    { className: 'artist_title_text' },
	                    'Artists featured in this article'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'artistHeader' },
	                React.createElement(
	                    'div',
	                    { className: 'artistHolder' },
	                    artistlist
	                )
	            )
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(2);
	module.exports = React.createClass({
	    displayName: 'exports',

	    getInitialState: function getInitialState() {
	        return {
	            artist: "",
	            artist_url: "http://jimpunk.net/Loading/wp-content/uploads/loading6.gif"
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.getInfo();
	    },
	    render: function render() {
	        var divStyle = {
	            backgroundImage: "url(" + this.state.artist_url + ")"
	        };
	        return React.createElement(
	            'div',
	            null,
	            React.createElement('div', { className: 'avatar-holder', style: divStyle })
	        );
	    },
	    getInfo: function getInfo() {

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
	                v: '1.0',
	                q: that.props.artist,
	                format: 'json',
	                jsoncallback: '?'
	            },
	            success: function success(data) {
	                var img = data.responseData.results[1].url;
	                that.setState({ artist_url: img, artist: that.props.artist });
	            },
	            error: function error(xhr, textStatus, _error) {
	                console.log(xhr.statusText, textStatus, _error);
	            }

	        });

	        var imgHolder = $(that.getDOMNode()).find('.avatar-holder');
	        imgHolder.hover(function () {
	            $(".artist_title_text").fadeOut(50, function () {
	                $(".artist_title_text").text(that.props.artist);
	                $(".artist_title_text").fadeIn();
	            });
	        }, function () {

	            $(".artist_title_text").fadeOut(50, function () {
	                $(".artist_title_text").text("Artists featured in this article");
	                $(".artist_title_text").fadeIn();
	            });
	        });
	    }
	});

/***/ }
]);