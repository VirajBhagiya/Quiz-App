import { useEffect, useState } from "react";
import { io } from "socket.io-client"; 
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";

export const Admin = () => {
    const [socket, setSocket] = useState<null | any>(null);
    const [quizId, setQuizId] = useState("");
    const [roomId, setroomId] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:3000");
        setSocket(socket);
        
        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("joinAdmin", {
                password: "admin"
            })
        });
    }, []);

    if(!quizId){
    return <div>
        <input type="text" onChange={(e) => {
            setroomId(e.target.value)
        }} />
        <br />
        <button onClick={() => {
            socket.emit("createQuiz", {
                roomId
            });
            setQuizId(roomId);
        }}>Create Room</button>
    </div>
    }
    return <div>
        <CreateProblem roomId={quizId} socket={socket} />
        <QuizControls socket={socket} roomId={roomId} />
    </div>
}