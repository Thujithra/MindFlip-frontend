import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./LeaderboardPage.css";

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [level, setLevel] = useState(1); // Default level
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const token = Cookies.get("username");
            if (!token) {
                alert("You need to log in to view the leaderboard.");
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/game/leaderboard/${level}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Leaderboard data fetched:", response.data); // Debug
                setLeaderboard(response.data.leaderboard);
            } catch (err) {
                console.error("Error fetching leaderboard:", err);
                alert("Failed to load leaderboard.");
            }
        };

        fetchLeaderboard();
    }, [level, navigate]);

    return (
        <div className="leaderboard-page">
            <h1 className="headerl">Leaderboard - Level {level}</h1>
            <div className="level-selector">
                {[1, 2, 3].map((lvl) => (
                    <button
                        key={lvl}
                        className={level === lvl ? "active" : ""}
                        onClick={() => setLevel(lvl)}
                    >
                        Level {lvl}
                    </button>
                ))}
            </div>
            <div className="leaderboard">
                {leaderboard.map((user, index) => (
                    <div key={index} className="leaderboard-entry">
                        <span>{index + 1}. {user.username}</span>
                        <span>{user.score} points</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;
