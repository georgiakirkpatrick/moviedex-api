require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const MOVIEDATA = require('./movies-data-small.json')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(cors())

// app.use(function validateBearerToken(req, res, next) {
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')
  
//     if (!authToken || authToken.split(' ')[1] !== apiToken) {
//       return res.status(401).json({ error: 'Unauthorized request' })
//     }

//     // move to the next middleware
//     next()
// })

app.get('/movies', function handleGetMovies(req, res) {
    let response = MOVIEDATA

    if (req.query.genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if (req.query.country) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    if (req.query.avg_vote) {
        console.log('req.query.avg_vote', req.query.avg_vote)
        response = response.filter(movie =>
            movie.avg_vote >= Number(req.query.avg_vote)
        )
    }

    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})