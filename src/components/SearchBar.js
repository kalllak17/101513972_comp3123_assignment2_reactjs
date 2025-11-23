import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";


function SearchBar({ placeholder = "Search..." }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            // console.log("Searching for:", query);
            navigate("/search", { state: { keyword: query } });
        }
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder={placeholder}
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
        </Form>
    );
}

export default SearchBar;
