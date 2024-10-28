import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState({ id: null, ime: '', sestavine: '', navodila: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(3);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        const response = await fetch('http://localhost:8080/recepti');
        const data = await response.json();
        setRecipes(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await fetch(`http://localhost:8080/recepti/${recipe.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe),
            });
        } else {
            await fetch('http://localhost:8080/recepti', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe),
            });
        }
        fetchRecipes();
        setRecipe({ id: null, ime: '', sestavine: '', navodila: '' });
        setIsEditing(false);
    };

    const editRecipe = (recipe) => {
        setRecipe(recipe);
        setIsEditing(true);
    };

    const deleteRecipe = async (id) => {
        await fetch(`http://localhost:8080/recepti/${id}`, {
            method: 'DELETE',
        });
        fetchRecipes();
    };


    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


    const filteredRecipes = currentRecipes.filter((rec) =>
        rec.ime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.sestavine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    return (
        <div className="App">
            {/* Header */}
            <header className="success text-white p-3 mb-4">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0">Spletna stran z recepti</h1>
                        <nav>
                            <ul className="nav">
                                <li className="nav-item"><a className="nav-link text-white" href="/">Domov</a></li>
                                <li className="nav-item"><a className="nav-link text-white" href="/Onas">O nas</a></li>
                                <li className="nav-item"><a className="nav-link text-white" href="/kontakt">Kontakt</a></li>
                            </ul>
                        </nav>
                        <div className="auth-buttons">
                            <button className="btn btn-success">Registracija</button>
                        </div>
                    </div>

                    {/* Search bar */}
                    <div className="search-bar mt-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control custom-search"
                                placeholder="Išči recepte..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>Počisti</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container">
                <h2>Recepti</h2>

                {/* Recipe Form */}
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="ime"
                            placeholder="Ime recepta"
                            value={recipe.ime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="sestavine"
                            placeholder="Sestavine"
                            value={recipe.sestavine}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            name="navodila"
                            placeholder="Navodila"
                            value={recipe.navodila}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className={`btn btn-${isEditing ? 'warning' : 'primary'}`}>
                        {isEditing ? 'Posodobi recept' : 'Dodaj recept'}
                    </button>
                    {isEditing && <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Prekliči</button>}
                </form>

                {/* Recipe List */}
                <div className="recipe-list">
                    {filteredRecipes.map((rec) => (
                        <div className="recipe-item" key={rec.id}>
                            <h3>{rec.ime}</h3>
                            <p><strong>Sestavine:</strong> {rec.sestavine}</p>
                            <p><strong>Navodila:</strong> {rec.navodila}</p>
                            <button className="btn btn-warning mr-2" onClick={() => editRecipe(rec)}>Uredi</button>
                            <button className="btn btn-danger" onClick={() => deleteRecipe(rec.id)}>Izbriši</button>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-2 mt-4">
                <p>&copy; 2024 Spletna stran z recepti</p>
            </footer>
        </div>
    );
}

export default App;