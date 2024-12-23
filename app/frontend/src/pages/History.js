import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function History({allRecipes}) {
    const [historyRecipes, setHistoryRecipes] = useState([]);
    const [ingredientStats, setIngredientStats] = useState([]);
    const userId = localStorage.getItem('userId');
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/recipes/history/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setHistoryRecipes(data);
                    calculateIngredientStats(data);
                })
                .catch(error => {
                    console.error('Napaka pri pridobivanju zgodovine receptov:', error);
                });
        }
    }, [userId]);

    const calculateIngredientStats = (recipes) => {
        const statsMap = {};

        recipes.forEach(recipe => {
            if (recipe.recipeIngredients && recipe.recipeIngredients.length > 0) {
                recipe.recipeIngredients.forEach(ingredient => {
                    const key = `${ingredient.ingredientName}_${ingredient.unit}`;
                    if (statsMap[key]) {
                        statsMap[key].totalQuantity += ingredient.quantity;
                    } else {
                        statsMap[key] = {
                            name: ingredient.ingredientName,
                            unit: ingredient.unit,
                            totalQuantity: ingredient.quantity
                        };
                    }
                });
            }
        });

        const statsArray = Object.values(statsMap).sort((a, b) => a.name.localeCompare(b.name));
        setIngredientStats(statsArray);
    };

    const recommendRecipesByIngredients = (viewedRecipes, allRecipes) => {
        const viewedIngredients = new Set();

        // Zberi vse sestavine iz ogledanih receptov
        viewedRecipes.forEach(recipe => {
            recipe.recipeIngredients.forEach(ingredient => {
                viewedIngredients.add(ingredient.ingredientName.toLowerCase());
            });
        });

        // Poišči recepte z ujemajočimi sestavinami
        return allRecipes.filter(recipe =>
            recipe.recipeIngredients.some(ingredient =>
                viewedIngredients.has(ingredient.ingredientName.toLowerCase())
            )
        );
    };

    useEffect(() => {
        if (historyRecipes.length > 0 && allRecipes.length > 0) {
            const recommendations = recommendRecipesByIngredients(historyRecipes, allRecipes);
            setRecommendedRecipes(recommendations);
        }
    }, [historyRecipes, allRecipes]); // Preračunaj priporočila, ko se spremenijo podatki



    const handleClearHistory = async () => {
        if (window.confirm('Ali ste prepričani, da želite izbrisati celotno zgodovino ogledov?')) {
            try {
                await fetch(`http://localhost:8080/recipes/history/${userId}`, {
                    method: 'DELETE',
                });
                setHistoryRecipes([]);
                setIngredientStats([]);
                console.log('Zgodovina je bila izbrisana.');
            } catch (error) {
                console.error('Napaka pri brisanju zgodovine:', error);
            }
        }
    };

    const data = {
        labels: ingredientStats.map(stat => stat.name),
        datasets: [
            {
                label: 'Skupna Količina',
                data: ingredientStats.map(stat => stat.totalQuantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistika Sestavin',
            },
        },
    };

    return (
        <div className="container">
            <h2>Zgodovina pregledov</h2>
            <div align="right">
                {historyRecipes.length > 0 && (
                    <button className="btn btn-danger mb-3" onClick={handleClearHistory}>Izbriši zgodovino</button>
                )}
            </div>
            {historyRecipes.length === 0 ? (
                <p>Ni zapisov o ogledanih receptih.</p>
            ) : (
                <>
                    <h3>Ogledani Recepti</h3>
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <ul className="list-group">
                                {historyRecipes.map((recipe) => (
                                    <li
                                        key={recipe.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {recipe.title}  {recipe.category?.name || ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h3>Statistika Sestavin</h3>
                    {ingredientStats.length === 0 ? (
                        <p>Ni podatkov za statistiko sestavin.</p>
                    ) : (
                        <>
                            <Bar data={data} options={options} />
                            <br></br>
                            <table className="table table-bordered mb-5">
                                <thead>
                                    <tr>
                                        <th>Ime Sestavine</th>
                                        <th>Količina</th>
                                        <th>Enota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredientStats.map((ingredient, index) => (
                                        <tr key={index}>
                                            <td>{ingredient.name}</td>
                                            <td>{ingredient.totalQuantity.toFixed(2)}</td>
                                            <td>{ingredient.unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {recommendedRecipes.length > 0 && (
                        <>
                            <h3>Priporočeni recepti</h3>
                            <ul className="list-group">
                                {recommendedRecipes.map((recipe) => (
                                    <li
                                        key={recipe.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {recipe.title}  {recipe.category?.name || ''}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                </>
            )}
        </div>
    );
}

export default History;