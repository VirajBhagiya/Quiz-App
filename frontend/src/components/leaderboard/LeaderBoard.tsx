import Card from "./Card";

export function LeaderBoard({ leaderboardData }: {
    leaderboardData: Array<{
        points: number;
        username: string,
        profilePicture: string
    }>
}) {
    return (
        <div className="bg-white bg-opacity-80 backdrop-blur-md border border-opacity-30 border-gray-300 p-6 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-semibold text-center my-4 text-gray-800">
                Leaderboard Results 🚀
            </h1>
            <div className="space-y-4">
                {leaderboardData.map((data, index) => (
                    <div key={index} className="flex justify-center">
                        <Card
                            sno={index + 1}
                            name={data.username}
                            points={data.points}
                            image={data.profilePicture}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
