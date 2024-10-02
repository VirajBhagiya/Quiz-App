export const QuizControls = ({socket, roomId}: {socket: any, roomId: string}) => {
    return <div>
        Quiz controls
        <button onClick={() => {
            socket.emit("next", {
                roomId
            })
        }}>Next Problem</button>
    </div>
}