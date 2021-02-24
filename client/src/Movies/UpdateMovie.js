import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: []
}

const UpdateMovie = (props) => {
    const {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState(initialMovie);

    useEffect(()=> {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data);
        })
        .catch(err=> {
            console.log(err);
        })
    },[])


    const changeHandler = event => {
    //     let value = event.target.value;
    //     if (event.target.name === "metascore") {
    //     value = parseInt(value, 10);
    // }
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log('PUT RESPONSE: ', res.data)
            props.setMovieList(props.movieList.map(movieItem => {
                if(movieItem.id === res.data.id) {
                    return res.data
                } else {
                    return movieItem
                }
            }))
            setMovie({
                title: '',
                director: '',
                metascore: null,
                stars: []
            })
            push(`/movies/${movie.id}`)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Movie Title...'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Movie Director...'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Movie Metascore...'
                    value={movie.metascore}
                />
                {/* <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Add Movie Stars...'
                    value={movie.stars}
                /> */}

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie
