import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';


import { fetchSongs } from '../queries';
import SongListItem from './SongListItem';


class SongList extends Component {
  renderSongs() {
    const { data: { songs = [] } } = this.props;
    return songs.map(song => (
      <SongListItem key={song.id} song={song} />
    ));
  }

  render() {
    const { data: { loading = false } } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <ul className='collection with-header'>
          <li className="collection-header">
            <h4>List of Songs</h4>
          </li>
          {this.renderSongs()}
        </ul>
        <Link 
          to='/song/new'
          className="right btn-floating btn-large waves-effect waves-light red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}


const query = fetchSongs;


export default graphql(query)(SongList);
