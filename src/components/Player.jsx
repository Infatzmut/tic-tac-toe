import { useState } from "react";
const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)
    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing((prevState) => !prevState)
        if(isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }

    const nameInput = !isEditing ? <span className="player-name">{playerName}</span>: <input type="text" value={playerName} onChange={handleChange}/>
    return (
        <li className={isActive? 'active': undefined}>
            <span>
            {nameInput}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing? "Save": "Edit"}</button>
        </li>
    )
}

export default Player;