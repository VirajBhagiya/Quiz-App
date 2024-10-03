import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { LeaderBoard } from "./leaderboard/LeaderBoard";
import { Quiz } from "./Quiz";

export const User = () => {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [code, setCode] = useState("");

    if (!submitted) {
        return (
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">
                    <h1 className="text-2xl font-semibold mb-2 text-slate-600">
                        Enter the code to join
                    </h1>
                    <p className="text-gray-600 mb-6">It's on the screen in front of you</p>

                    <input
                        className="text-center w-full p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800 mb-4"
                        placeholder="1234 5678"
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <input
                        className="text-center w-full p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800 mb-6"
                        placeholder="Your Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        className="bg-purple-600 text-white w-full py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
                        onClick={() => setSubmitted(true)}
                    >
                        Join
                    </button>
                </div>
            </div>
        );
    }
    return <UserLoggedin code={code} name={name} />;
};

interface UserLoggedinProps {
    name: string;
    code: string;
}

interface Question {
    id: string;
    title: string;
    options: { title: string }[];
}

export const UserLoggedin = ({ name, code }: UserLoggedinProps) => {
    const [socket, setSocket] = useState<null | Socket>(null);
    const roomId = code;
    const [currentState, setCurrentState] = useState("not_started");
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:3000");
        setSocket(socket);

        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("join", {
                roomId,
                name
            });
        });

        socket.on("init", ({ userId, state }) => {
            setUserId(userId);

            if (state.leaderboard) {
                setLeaderboard(state.leaderboard);
            }

            if (state.problem) {
                setCurrentQuestion(state.problem);
            }

            setCurrentState(state.type);
        });

        socket.on("leaderboard", (data) => {
            setCurrentState("leaderboard");
            setLeaderboard(data.leaderboard);
        });

        socket.on("problem", (data) => {
            setCurrentState("question");
            setCurrentQuestion(data.problem);
        });
    }, [name, roomId]);

    if (currentState === "not_started") {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-xl font-semibold text-gray-600">This quiz hasn't started yet!</h1>
                </div>
            </div>
        );
    }

    if (currentState === "question") {
        return currentQuestion && socket ? (
            <Quiz
                roomId={roomId}
                userId={userId}
                problemId={currentQuestion.id}
                quizData={{
                    title: currentQuestion.title,
                    options: currentQuestion.options
                }}
                socket={socket}
            />
        ) : (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p>Loading question...</p>
                </div>
            </div>
        );
    }

    if (currentState === "leaderboard") {
        return (
            <LeaderBoard
                leaderboardData={leaderboard.map((x: { name: string; points: number; image: string }) => ({
                    username: x.name,
                    points: x.points,
                    profilePicture: x.image
                }))}
            />
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-xl font-semibold text-gray-600">Quiz has ended!</h1>
                <p>{currentState}</p>
            </div>
        </div>
    );
};
