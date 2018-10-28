import React, {Component} from 'react';

import {graphql} from 'react-apollo';

//used to writing queries & mutations inside react; JS does not understand the language
import gql from 'graphql-tag' 

import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs'


class SongCreate extends Component {
    constructor (props) {
        super(props);
        this.state = {title: ''};
    }


    //onSubmit handler
    onSubmit (e){
        e.preventDefault();

        //this invokes the mutation. It runs the mutation. 
        //Pass all the variable you want to pass to mutation
        this.props.mutate({
                variables: {title: this.state.title},
                refetchQueries: [{query}]
        }).then (()=>{
            hashHistory.push('/') //hashHistory is keeping track of our navigation
        }).catch((error)=>{
           return error
        })
    }
    
    render(){
        return(
            <div>   
            <Link to="/">Back</Link>
            <h3>Create a New Song!</h3>
            <form onSubmit = {this.onSubmit.bind(this)}>   
                <label>Song Title: </label>   
                <input 
                    onChange= {event => this.setState({title: event.target.value})}
                    value = {this.state.title}
                />
            </form>
            
            </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title){
        title
    }
}
`;

//smashing the mutation and component comes from the graphql library
export default graphql(mutation)(SongCreate);
