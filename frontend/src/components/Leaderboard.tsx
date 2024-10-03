interface Leaderboard {
    name: string;
    score: number;
}

export const LeaderBoard = ({ leaderboard }: { leaderboard: Leaderboard[] }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto border border-gray-300 hover:shadow-lg transition-shadow duration-200">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Leaderboard 🚀</h1>
            <ul className="divide-y divide-gray-300">
                {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center py-3 transition-transform duration-200 transform hover:scale-105"
                        >
                            <span className="font-medium text-gray-700">{entry.name}</span>
                            <span className="text-indigo-600 font-bold">{entry.score}</span>
                        </li>
                    ))
                ) : (
                    <li>
                        <p className="text-center text-gray-500 mt-4">No data available</p>
                    </li>
                )}
            </ul>
            {leaderboard.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 text-center">
                        Total Players: {leaderboard.length}
                    </p>
                </div>
            )}
        </div>
    );
};
