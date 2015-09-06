var React = require('react');
var ArtistHeader = require('./ArtistHeader')


 var artists = window.post_meta.split(",");
 React.render(<ArtistHeader artists={artists} />, document.getElementById('react_artists'));
 $(".artistHolder").width(10+(artists.length*110));

 

 $("iframe").each(function(){
 	var src = $(this).attr("src");
 	if(src.indexOf("soundcloud") > -1){
 		$( this ).wrap( "<div class='soundcloud'></div>" ); 
 	}
 });


$(".post_title").text(window.post_title);
$(".post_date").text(window.post_time);
