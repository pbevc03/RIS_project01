import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function History() {
    const [historyRecipes, setHistoryRecipes] = useState([]);
    const userId = localStorage.getItem('userId');

    const handleClearHistory = async () => {
        if (window.confirm('Ali ste prepričani, da želite izbrisati celotno zgodovino ogledov?')) {
            try {
                await fetch(`http://localhost:8080/recipes/history/${userId}`, {
                    method: 'DELETE',
                });
                setHistoryRecipes([]);
                console.log('Zgodovina je bila izbrisana.');
            } catch (error) {
                console.error('Napaka pri brisanju zgodovine:', error);
            }
        }
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
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group">
                            {historyRecipes.map((recipe) => (
                                <li
                                    key={recipe.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {recipe.title} - {recipe.category?.name || 'Neurejen'}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;