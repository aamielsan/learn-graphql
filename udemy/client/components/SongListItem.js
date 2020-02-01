import React,  { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


import { fetchSongs } from '../queries';


class SongListItem extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  async handleDeleteClick(event) {
    event.stopPropagation();

    const { mutate } = this.props;

    try {
      await mutate({
        refetchQueries: [
          { query: fetchSongs }
        ]
      });
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    const { song: { title } } = this.props;

    return (
      <li className='collection-item'>
        {title}
        <i className="material-icons" onClick={this.handleDeleteClick}>delete</i>
      </li>
    );
  }
}


const mutation = gql`
  mutation ($songId: ID!){
    deleteSong(id: $songId) {
      id
    }
  }
`;


function mapPropsToOptions(props) {
  return {
    variables: {
      songId: props.song.id
    }
  }
}


export default graphql(mutation, { options: mapPropsToOptions })(SongListItem);
