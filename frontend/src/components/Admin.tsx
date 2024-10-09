import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"; 
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";

export const Admin = () => {
    const [socket, setSocket] = useState<null | Socket>(null);
    const [quizId, setQuizId] = useState("");
    const [roomId, setRoomId] = useState("");

    useEffect(() => {
        const socket = io("https://quiz-app-icej.vercel.app/");
        setSocket(socket);
        
        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("joinAdmin", {
                password: "admin"
            });
        });
    }, []);

    if (!quizId) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Quiz Room</h2>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:outline-none focus:border-purple-600"
                        onChange={(e) => {
                            setRoomId(e.target.value);
                        }}
                    />
                    <button
                        className="bg-purple-600 text-white w-full py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                        onClick={() => {
                            if (socket) {
                                socket.emit("createQuiz", {
                                    roomId
                                });
                            }
                            setQuizId(roomId);
                        }}
                    >
                        Create Room
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 bg-gray-50">
            {socket && <CreateProblem roomId={quizId} socket={socket} />}
            {socket && <QuizControls socket={socket} roomId={roomId} />}
        </div>
    );
}
