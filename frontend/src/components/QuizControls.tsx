import { Socket } from "socket.io-client";

export const QuizControls = ({ socket, roomId }: { socket: Socket, roomId: string }) => {
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quiz Controls</h2>
            <button
                className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                onClick={() => {
                    socket.emit("next", {
                        roomId
                    });
                }}
            >
                Next Problem
            </button>
        </div>
    );
}
