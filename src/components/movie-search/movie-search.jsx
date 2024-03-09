import { useState } from "react";
import { Form, Nav, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom"; 


export const MovieSearch = ({ movies }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate();

  // const handleInput =(e) => {
  //   setQuery(e.target.value);
  // };

  const handleSearch = ( e, movie ) => {
    e.preventDefault();
    const movieQuery = movies.filter((movie) => movie.title === query);
    
   if (movieQuery.length > 0) {
      console.log("True, ", query, movieQuery[0].id);
        // navigate(`/movies/${encodeURIComponent(movieQuery.id)}`);
      
    } else {
      console.log("Error, no match", query)
      // return (
      //   searchForm.setAttribute(placeholder, "No match found")
      // )
    }
  };

  return (
    <Nav>
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control 
          type="search"
          className="me-2 search-form"
          onChange={setQuery}
        />
        <Button type="submit">Search</Button>
      </Form>
    </Nav>
  );
};