import React, { Component } from 'react';
import gql from 'graphql-tag'; //allows us to write queries inside components
import { graphql } from 'react-apollo' //helps us bond/join a component with a query
import { Link } from 'react-router';

import query from '../queries/fetchSongs'



//this.props.data is added to our component automatically from react/apollo library

class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({ variables: { id } }) //this is how you run a mutation inside component
            .then(() => this.props.data.refetch())
    }


    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }

    render() {
        //You need this because the data has not yet loaded before trying to run the return statement below
        if (this.props.data.loading) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons"> add</i>
                </Link>
            </div>


        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong(id: $id){
        id
        }
    }
    `;


//first returns a function, which is immedately calling the second ()
export default graphql(mutation)(
    graphql(query)(SongList)
);

