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
    //const [loggedInUser, setLoggedInUser] = useState(null);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
    });

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
    };

    const handleNewRecipeChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOrEditRecipe = async () => {
        const url = editingRecipeId
            ? `http://localhost:8080/recipes/${editingRecipeId}`
            : 'http://localhost:8080/recipes?userId=1'; // tukaj daj user id trenutnega uporabnika **********++++++++++++++++++++++++++++
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
        if (!selectedRecipe) return;
        try {
            await fetch('http://localhost:8080/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    userId: 1, // tukaj daj user id trenutnega uporabnika **********++++++++++++++++++++++++++++++++++++
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
        console.log("stisnjen login button")
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

        setIsLoginRegisterVisible(false); // Hide the form after submission
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
                                <li className="nav-item"><a className="nav-link text-white" href="/kontakt">Kontakt</a></li>
                            </ul>
                        </nav>
                        <div className="auth-buttons">
                            <button className="btn btn-success" onClick={toggleLoginRegister}>Registracija/Prijava</button>
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

            {/* Conditional render for login/register form */}
            {isLoginRegisterVisible && (
                <div className="container">
                    <h2>Register</h2>
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
                        <button type="submit" className="btn btn-primary">Registracija/Prijava</button>
                    </form>
                </div>
            )}

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
                                            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(recipe)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
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
                                <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                                <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
                                <p><strong>Category:</strong> {selectedRecipe.category?.name || 'Uncategorized'}</p>

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