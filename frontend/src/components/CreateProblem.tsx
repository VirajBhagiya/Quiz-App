import { useState } from "react";
import { Socket } from "socket.io-client";

export const CreateProblem = ({ socket, roomId }: { socket: Socket; roomId: string; }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState(0);
    const [options, setOptions] = useState([
        { id: 1, title: "" },
        { id: 2, title: "" },
        { id: 3, title: "" },
        { id: 4, title: "" }
    ]);

    const handleCreateProblem = () => {
        socket.emit("createProblem", {
            roomId,
            problem: {
                title,
                description,
                options,
                answer,
            }
        });

        // Clear the form after submission
        setTitle("");
        setDescription("");
        setAnswer(0);
        setOptions(options.map(option => ({ ...option, title: "" })));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Problem</h2>
            
            <label className="block text-gray-700 mb-2">Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <label className="block text-gray-700 mb-2">Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <fieldset className="mb-4">
                <legend className="text-gray-700 mb-2">Options:</legend>
                {options.map(option => (
                    <div key={option.id} className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={option.id === answer}
                            onChange={() => setAnswer(option.id)}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-600">Option {option.id}</span>
                        <input
                            type="text"
                            value={option.title}
                            onChange={(e) => {
                                setOptions(options => options.map(x => (
                                    x.id === option.id ? { ...x, title: e.target.value } : x
                                )));
                            }}
                            className="ml-2 border border-gray-300 rounded-md p-1 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter option ${option.id}`}
                        />
                    </div>
                ))}
            </fieldset>
            
            <button
                onClick={handleCreateProblem}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Add Problem
            </button>
        </div>
    );
};
