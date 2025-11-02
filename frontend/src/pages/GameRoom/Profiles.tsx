export default function Profiles() {
  const players = [
    { id: 1, name: 'Alice', score: 250, isDrawing: true, avatar: '👩' },
    { id: 2, name: 'Bob', score: 180, isDrawing: false, avatar: '👨' },
    
  ];

  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 sticky top-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-3xl">🏆</span>
        Leaderboard
      </h3>
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isTopThree = rank <= 3;
          
          return (
            <div
              key={player.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                player.isDrawing
                  ? 'bg-linear-to-r from-purple-50 to-indigo-50 border-purple-300 shadow-md scale-105'
                  : isTopThree
                  ? 'bg-linear-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-purple-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold w-10 text-center">
                  {getMedalIcon(rank)}
                </div>
                <div className="text-3xl">{player.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                    {player.name}
                    {player.isDrawing && (
                      <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full animate-pulse">
                        ✏️ Drawing
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-lg text-purple-600">{player.score}</span> pts
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
