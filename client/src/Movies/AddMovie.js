import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: []
}

const AddMovie = ({movieList, setMovieList, getMovieList}) => {
    const {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState(initialMovie);


    const changeHandler = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log(res.data)
            getMovieList();
            setMovie({
                title: '',
                director: '',
                metascore: null,
                stars: []
            })
            push(`/movies`)
        })
    }


    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Add Movie Title...'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Add Movie Director...'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='metastore'
                    onChange={changeHandler}
                    placeholder='Add Movie Metascore...'
                    value={movie.metascore}
                />
                {/* <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Add Movie Stars...'
                    value={movie.stars}
                /> */}

                <button>Add Movie</button>
            </form>
        </div>
    )

}

export default AddMovie