import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import History from './pages/History'; // Uvoz nove komponente


function App() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        categoryId: '',
    });
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginRegisterVisible, setIsLoginRegisterVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [portions, setPortions] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const [adjustedIngredients, setAdjustedIngredients] = useState([]);

    useEffect(() => {
        fetchRecipes();
        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8080/recipes');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched recipes:', data); // Debug log
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchComments = async (recipeId) => {
        try {
            const response = await fetch(`http://localhost:8080/comments/recipe/${recipeId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchIngredients = async (recipeId) => {
        try{
            const response = await fetch(`http://localhost:8080/ingredients/recipe/${recipeId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setIngredients(data);
            return data;

        } catch (error) {
            console.error('Error fetching ingredients:', error);
            return [];
        }
    };

    const handleRecipeClick = async (recipe) => {
        setSelectedRecipe(recipe);
        fetchComments(recipe.id);
        //fetchIngredients(recipe.id);
        const ingredientsData = await fetchIngredients(recipe.id)


        if (ingredientsData) {
            const adjusted = ingredientsData.map((ingredient) => ({
                name: ingredient.name,
                quantity: ingredient.quantity * portions,
                unit: ingredient.unit,
            }));
            setAdjustedIngredients(adjusted);
        }
    };

    const handleNewRecipeChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOrEditRecipe = async () => {

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User is not logged in. Please log in to create or edit recipes.');
            return;
        }
        const url = editingRecipeId
            ? `http://localhost:8080/recipes/${editingRecipeId}`
            : `http://localhost:8080/recipes?userId=${userId}`; // tukaj daj user id trenutnega uporabnika **********++++++++++++++++++++++++++++
        const method = editingRecipeId ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });
            setNewRecipe({ title: '', description: '', ingredients: '', instructions: '', categoryId: ''  });
            setEditingRecipeId(null);
            fetchRecipes();
        } catch (error) {
            console.error(`Error ${editingRecipeId ? 'editing' : 'creating'} recipe:`, error);
        }
    };

    const handleEditClick = (recipe) => {
        setEditingRecipeId(recipe.id);
        setNewRecipe({
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            categoryId: recipe.category ? recipe.category.id : '',
        });
    };

    const handleDeleteRecipe = async (id) => {
        try {
            await fetch(`http://localhost:8080/recipes/${id}`, { method: 'DELETE' });
            fetchRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage. Please log in again.');
            return;
        }
        if (!selectedRecipe) return;
        try {
            await fetch('http://localhost:8080/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    userId,
                    recipeId: selectedRecipe.id,
                }),
            });
            setNewComment('');
            fetchComments(selectedRecipe.id);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await fetch(`http://localhost:8080/comments/${commentId}`, { method: 'DELETE' });
            if (selectedRecipe) fetchComments(selectedRecipe.id);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    //Log in/register logic
    const toggleLoginRegister = () => {
        console.log("stisnjen register button")
        setIsLoginRegisterVisible((prev) => !prev);
    };

    const handleRegisterFormChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log('Register form submitted:', registerForm);

        try {
            const response = await fetch('http://localhost:8080/users/new_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerForm),
            });

            // Checking if the request was seccessful
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error: ${response.status} - ${errorMessage}`);
            }

            const data = await response.json(); // Parse the response JSON
            console.log('User registered successfully:', data);

            // Empty the form after registering
             setRegisterForm({ username: '', password: '', email: '' });

            // Hide the form after successful registration
            setIsLoginRegisterVisible(false);
        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Error during registration:', error.message);
        }

        setIsLoginRegisterVisible(false);
    };

    //Login
    const toggleLogin = () => {
        console.log("stisnjen login button")
        setIsLoginVisible((prev) => !prev);
    };

    const handleLoginFormChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const userData = await response.json();

            const {user, userId} = userData;
            console.log('username',user,'user', userId);


            setLoggedInUser(user);
            localStorage.setItem('username', user);
            localStorage.setItem('userId', userId);
            setLoginForm({ username: '', password: ''});
            setIsLoginVisible(false);

            console.log(userData);

        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Invalid username or password.');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) setLoggedInUser(storedUser);
    }, []);

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        alert('Logged out successfully.');
    };

    const handlePortionsChange = (newPortions) => {
        const parsedPortions = parseInt(newPortions, 10);
        setPortions(parsedPortions);

        console.log("selected rec", selectedRecipe)
        console.log('ingredients', selectedRecipe.recipeIngredients)

        if (selectedRecipe && selectedRecipe.recipeIngredients) {

            console.log('hello')

            const adjusted = selectedRecipe.recipeIngredients.map((ingredient) => ({
                name: ingredient.ingredientName,
                quantity: ingredient.quantity * parsedPortions,
                unit: ingredient.unit,
            }));

            setAdjustedIngredients(adjusted);
        }

        console.log('Portions:', parsedPortions);
        console.log('Original Ingredients:', adjustedIngredients);

    };

    return (
        <Router>
        <div className="App d-flex flex-column min-vh-100">
            {/* Header */}
            <header className="success text-white p-3 mb-4">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0">Spletna stran z recepti</h1>
                        <nav>
                        <ul className="nav">
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/">Domov</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/Onas">O nas</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/kontakt">Kontakt</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/History">Ogledani Recepti</Link>
                                    </li>
                                </ul>
                        </nav>
                        <div className="auth-buttons">
                            {loggedInUser ? (
                                // Show the logged-in user's name and logout button
                                <div>
                                    <span className="text-white me-3">Welcome, {loggedInUser}</span>
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                // Show login/register buttons wrapped in React Fragment
                                <>
                                    <button className="btn btn-success" onClick={toggleLoginRegister}>Registracija</button>
                                    <button className="btn btn-success" onClick={toggleLogin}>Prijava</button>
                                </>
                            )}
                        </div>
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
            </header>

            {/* Conditional render for register form */}
            {isLoginRegisterVisible && (
                <div className="container">
                    <h2>Registracija</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={registerForm.username}
                                onChange={handleRegisterFormChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={registerForm.email}
                                onChange={handleRegisterFormChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={registerForm.password}
                                onChange={handleRegisterFormChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Registracija</button>
                    </form>
                </div>
            )}

            {/* Conditional render for login form */}
            {isLoginVisible && (<div className="container">
                <h2>Prijava</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={loginForm.username}
                            onChange={handleLoginFormChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={loginForm.password}
                            onChange={handleLoginFormChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Prijava</button>
                </form>
            </div>)}

                {/* Glavna vsebina s potmi */}
                <main className="container flex-grow-1">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <>
                                    <h2>Recepti</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="list-group">
                                                {recipes
                                                    .filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .map((recipe) => (
                                                        <li
                                                            key={recipe.id}
                                                            className="list-group-item d-flex justify-content-between align-items-center"
                                                            onClick={() => handleRecipeClick(recipe)}
                                                        >
                                                            {recipe.title} - {recipe.category?.name || 'Neurejen'}
                                                            <div>
                                                                <button 
                                                                    className="btn btn-primary btn-sm me-2"
                                                                    onClick={() => handleEditClick(recipe)}
                                                                >
                                                                    Uredi
                                                                </button>
                                                                <button 
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleDeleteRecipe(recipe.id)}
                                                                >
                                                                    Izbriši
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            {selectedRecipe && (
                                                <div>
                                                    <h3>{selectedRecipe.title}</h3>
                                                    <p>{selectedRecipe.description}</p>
                                                    <p><strong>Kategorija:</strong> {selectedRecipe.category?.name || 'Neurejena'}</p>

                                                    {/* Vnos za število porcij */}
                                                    <div className="mb-3">
                                                        <label htmlFor="portions" className="form-label">Število porcij:</label>
                                                        <input
                                                            type="number"
                                                            id="portions"
                                                            className="form-control"
                                                            value={portions}
                                                            min="1"
                                                            onChange={(e) => handlePortionsChange(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Tabela sestavin */}
                                                    <h4>Sestavine</h4>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Ime sestavine</th>
                                                                <th>Količina</th>
                                                                <th>Enota</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(adjustedIngredients.length > 0 ? adjustedIngredients : []).map((ingredient, index) => (
                                                                <tr key={index}>
                                                                    <td>{ingredient.name}</td>
                                                                    <td>{ingredient.quantity.toFixed(2)}</td>
                                                                    <td>{ingredient.unit}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    <p><strong>Navodila:</strong> {selectedRecipe.instructions}</p>

                                                    <h4>Komentarji</h4>
                                                    <ul className="list-group">
                                                        {comments.map((comment) => (
                                                            <li key={comment.id}
                                                                className="list-group-item d-flex justify-content-between align-items-center">
                                                                {comment.content}
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleDeleteComment(comment.id)}
                                                                >
                                                                    Izbriši
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="input-group mt-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Dodaj komentar..."
                                                            value={newComment}
                                                            onChange={handleCommentChange}
                                                        />
                                                        <button className="btn btn-primary" onClick={handleAddComment}>Komentiraj</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h2 className="mt-4">{editingRecipeId ? 'Uredi recept' : 'Dodaj nov recept'}</h2>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control mb-2"
                                            placeholder="Naslov"
                                            value={newRecipe.title}
                                            onChange={handleNewRecipeChange}
                                        />
                                        <textarea
                                            name="description"
                                            className="form-control mb-2"
                                            placeholder="Opis"
                                            value={newRecipe.description}
                                            onChange={handleNewRecipeChange}
                                        ></textarea>
                                        <textarea
                                            name="ingredients"
                                            className="form-control mb-2"
                                            placeholder="Sestavine"
                                            value={newRecipe.ingredients}
                                            onChange={handleNewRecipeChange}
                                        ></textarea>
                                        <textarea
                                            name="instructions"
                                            className="form-control mb-2"
                                            placeholder="Navodila"
                                            value={newRecipe.instructions}
                                            onChange={handleNewRecipeChange}
                                        ></textarea>
                                        <select
                                            name="categoryId"
                                            className="form-control mb-2"
                                            value={newRecipe.categoryId}
                                            onChange={handleNewRecipeChange}
                                        >
                                            <option value="">Izberite kategorijo</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="btn btn-success" onClick={handleCreateOrEditRecipe}>
                                            {editingRecipeId ? 'Shrani spremembe' : 'Dodaj recept'}
                                        </button>
                                    </div>
                                </>
                            } 
                        />
                        <Route 
                            path="/History" 
                            element={<History />} 
                        />
                        {/* Dodajte dodatne poti, npr. O nas, Kontakt */}
                        <Route 
                            path="/Onas" 
                            element={
                                <div className="container">
                                    <h2>O nas</h2>
                                    <p>Informacije o nas.</p>
                                </div>
                            }
                        />
                        <Route 
                            path="/kontakt" 
                            element={
                                <div className="container">
                                    <h2>Kontakt</h2>
                                    <p>Kontaktni podatki.</p>
                                </div>
                            }
                        />
                    </Routes>
                </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-2 mt-4">
                <p>&copy; 2024 Spletna stran z recepti</p>
            </footer>
        </div>
        </Router>
    );
}

export default App;