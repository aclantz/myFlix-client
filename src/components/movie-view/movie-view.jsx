export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director.name}</span>
        <span>Bio:</span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.name}</span>
        <span>Description:</span>
        <Span>{movie.genre.description}</Span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  )
}