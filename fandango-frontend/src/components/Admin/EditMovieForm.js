import React, {Component} from 'react';
import Search from './Search';
import NavBar from './Navigation';
import MovieForm from './MovieForm';
import CommonHeader from '../header/CommonHeader';
import '../MovieHall/subheader.css';
// import * as API from '../../api/API';

class EditMovieForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            group: ''
        };
    }
    componentDidMount(){
        this.setState({
            group: 'Movies'
        })
    }
    render(){
        console.log(this.props);
        return (
            <div id='FullMovieForm' className="admin-sub-header"> 
                <CommonHeader />
                <NavBar />
                <Search group={this.state.group} placeholder='Search for Movies' />
                <MovieForm movieId={this.props.match.params.movieId}/> 
            </div>
        );
    }
}
  
export default EditMovieForm;