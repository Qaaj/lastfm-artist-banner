var React = require('react');

var ArtistInfo = require('./ArtistInfo')

module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            artists: []
        };
    },

    render: function() {

    var artistlist = [];

    for (var i = 0; i < this.props.artists.length; i++) {
      artistlist.push(<ArtistInfo key={i} className='tag-item label label-default' artist={this.props.artists[i]} />);
    }


        
    return <div className="">
    <div className="artist_title"><div className="artist_title_text">Artists featured in this article</div></div>
    <div className="artistHeader">
      <div className="artistHolder">
            {artistlist}
      </div>
    </div>
    </div>
    }
});