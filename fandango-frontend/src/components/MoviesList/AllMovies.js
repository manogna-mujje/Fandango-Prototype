import React, { Component} from 'react';
import HomeHeader from './../AfterLogin/HomeHeader'
import './movies.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {selectedMovie} from "../../actions";
import * as API from './../../api/apicall_for_users';
import {log1} from "../../App";

class AllMovies extends Component{

    constructor(props){
        super(props);

        this.state={
            filter: '',
            movies: [],
            movies_tofilter: []

        }
        this.handleCaptureLessSeen = this.handleCaptureLessSeen.bind(this);
    }

    componentDidMount(){
        API.getMovies({})
            .then((result) => {
                this.setState({
                    movies: result.data,
                    movies_tofilter: result.data
                });
            });
    }


    filterMovies = (filter) => {
        let msg = '{"event":"section_click","section_name":"filter_genre","genre_name":"'+filter.toString()+'"}';
        log1.info(msg);
        this.setState({
            filter: filter,
            movies_tofilter: this.state.movies.filter(movie => movie.genres.toLocaleLowerCase().includes(filter.toLowerCase()))
        })

        console.log(this.state.movies);
    }


    renderTitle(){
        if(this.state.filter == "") {
            return (
                <div className="page-header-container">
                    <div className="row">
                        <div className="large-12 columns">
                            <h2 className="page-header">SHOWING ALL MOVIES</h2>
                        </div>
                    </div>
                </div>

            )
        }

            else{
                return(
                    <div className="page-header-container">
                        <div className="row">
                            <div className="large-12 columns">
                                <h2 className="page-header">SHOWING <span style={{color: '#F15500'}}>"{this.state.filter}"</span> MOVIES</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        }


    handleCaptureLessSeen(){
/*
        log1.info('{"event":"page_click","page_name":"AllMovies","count":"1"}');
*/
        let msg = '{"event":"section_click","section_name":"movie_Listing"}';
        log1.info(msg);
    }

    renderMovies(){
            if(this.state.movies_tofilter.length == 0){
            return(<h3 className="col-md-offset-2 col-md-8" style={{ textAlign: 'left', marginTop: '20px'}}>
                NO MATCHING RESULTS
            </h3>)
        }
        return this.state.movies_tofilter.map((movie) => {
            return(
                <div className="col-md-offset-2 col-md-8 list-moviedetails" onClick={this.handleCaptureLessSeen}>
                    <div className="img-style">
                        <img src={movie.photos} className="img-peculiar"
                        alt={movie.movie_name + "Movie Poster"}/>
                    </div>
                    <div className="movie-heading">
                        <h4 className="movie-link" onClick={() => this.handleSubmit(this.props.selectedMovie(movie))}>{ movie.movie_name}</h4>
                    </div>
                    <div className="movie-extra-details">
                        <h5 className="gap">Release date: {movie.release_date}</h5>
                        <h5 className="gap">PG13 | {movie.movie_length} min</h5>
                        <h5 calss="gap">{movie.genres}</h5>
                    </div>
                    <div className="cast">
                        <h5>
                            Cast + Crew: {movie.cast}
                        </h5>
                    </div>
                    <div className="see-it-in">
                        <h5>
                            See It in: {movie.see_it_in}
                        </h5>
                    </div>
                    <div className="book-now">
                        <button type="button" className="btn buy-tickets"> BUY TICKETS</button>
                    </div>
                </div>
            )

        })
    }

    handleSubmit = () => {
        this.props.redirectURL("/moviedetail");
    }


    render(){
        return(
            <div>
                <div className="site-wrap">
                    <HomeHeader/>

                    <div className="page-header-container">
                        <div className="row">
                            <div className="large-12 columns">
                                <h4 className="page-header">FILTER BY MOVIE GENRES</h4>
                            </div>
                        </div>
                    </div>

                    <div className="genre-list">
                        <ul>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("")}>ALL MOVIES</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("action")}>ACTION</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("drama")}>DRAMA</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("comedy")}>COMEDY</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("kids")}>KIDS</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("horror")}>HORROR</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("romance")}>ROMANCE</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("sci-fi")}>SCI-FI</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("animated")}>ANIMATED</button>
                        </ul>
                    </div>


                    {this.renderTitle()}

                    <div className="col-md-offset-2 col-md-8 list-header">
                        <h3 className="list-font">MOVIES</h3>
                    </div>

                    {this.renderMovies()}

                </div>



            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectedMovie: selectedMovie}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(AllMovies);