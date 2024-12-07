import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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


    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        fetchComments(recipe.id);

        if (recipe.ingredients) {
            const adjusted = recipe.ingredients.map((ingredient) => ({
                title: ingredient.title,
                amount: ingredient.amount,
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
    
        if (selectedRecipe && selectedRecipe.ingredients) {

            const adjusted = selectedRecipe.ingredients.map((ingredient) => ({
                title: ingredient.title,
                amount: ingredient.amount * parsedPortions,
                unit: ingredient.unit,
            }));
    
            setAdjustedIngredients(adjusted);
        }
    };

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
                                <li className="nav-item"><a className="nav-link text-white" href="/kontakt">Kontakt</a>
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

            {/* Main content */}
            <main className="container">
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
                                        {recipe.title} - {recipe.category?.name || 'Uncategorized'}
                                        <div>
                                            <button className="btn btn-primary btn-sm me-2"
                                                    onClick={() => handleEditClick(recipe)}>Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteRecipe(recipe.id)}>Delete
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
                                <p><strong>Category:</strong> {selectedRecipe.category?.name || 'Uncategorized'}</p>

                                {/* Input for portions */}
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

                                {/* Ingredients Table */}
                                <h4>Sestavine</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Ime sestavine</th>
                                            <th>Količina</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adjustedIngredients.map((ingredient, index) => (
                                            <tr key={index}>
                                                <td>{ingredient.name}</td>
                                                <td>{ingredient.amount.toFixed(2)} {ingredient.unit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                        
                                <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>

                                <h4>Comments</h4>
                                <ul className="list-group">
                                    {comments.map((comment) => (
                                        <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {comment.content}
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteComment(comment.id)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="input-group mt-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={handleCommentChange}
                                    />
                                    <button className="btn btn-primary" onClick={handleAddComment}>Comment</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <h2 className="mt-4">{editingRecipeId ? 'Edit recipe' : 'Add new recipe'}</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control mb-2"
                        placeholder="Title"
                        value={newRecipe.title}
                        onChange={handleNewRecipeChange}
                    />
                    <textarea
                        name="description"
                        className="form-control mb-2"
                        placeholder="Description"
                        value={newRecipe.description}
                        onChange={handleNewRecipeChange}
                    ></textarea>
                    <textarea
                        name="ingredients"
                        className="form-control mb-2"
                        placeholder="Ingredients"
                        value={newRecipe.ingredients}
                        onChange={handleNewRecipeChange}
                    ></textarea>
                    <textarea
                        name="instructions"
                        className="form-control mb-2"
                        placeholder="Instructions"
                        value={newRecipe.instructions}
                        onChange={handleNewRecipeChange}
                    ></textarea>
                    <select
                        name="categoryId"
                        className="form-control mb-2"
                        value={newRecipe.categoryId}
                        onChange={handleNewRecipeChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-success" onClick={handleCreateOrEditRecipe}>
                        {editingRecipeId ? 'Save Changes' : 'Add Recipe'}
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-2 mt-4">
                <p>&copy; 2024 Spletna stran z recepti</p>
            </footer>
        </div>
    );
}

export default App;