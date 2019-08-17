import React from 'react';

function GamesList({games}) {
    let content;
        content = games.map((games, id) => {
            return (
                <div key={id}>
                    <p>GAME TITLE: {games.title}</p>
                    <p>CONSOLE/PLATFORM: {games.platform}</p>
                </div>
            )

        })

    return (
        <div className="App">
            {content}
        </div>
    );
}

export default GamesList;