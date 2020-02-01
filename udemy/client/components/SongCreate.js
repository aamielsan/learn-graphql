import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';


import { fetchSongs } from '../queries';


class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleOnSubmit(event) {
    event.preventDefault();

    const { mutate } = this.props;
    const { title } = this.state;
    
    try {
      await mutate({
        variables: {
          songTitle: title
        },
        refetchQueries: [
          { query: fetchSongs }
        ]
      });
      hashHistory.push('/');
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h5 className="center">Create a New Song</h5>
        <form className="row" onSubmit={this.handleOnSubmit}>
          <label>Song title</label>
          <input 
            placeholder="Enter title" 
            type="text"  
            name="title"
            onChange={this.handleOnChange}
          />
        </form>
      </div>
      
    );
  }
}


const mutation = gql`
  mutation ($songTitle: String!) {
    addSong(title: $songTitle) {
      id
    }
  }
`;


export default graphql(mutation)(SongCreate);
