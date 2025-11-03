import type { Player } from "./Dataclasses";

interface ProfilesProp {
  players: Player[] | null
  hostId: string
  gameStart: boolean
}

export default function Profiles({ players, hostId, gameStart }: ProfilesProp) {
  // Sort only if game started (so ranks make sense)

const safePlayers: Player[] = players ?? [];
  // Sort by score only if game started
  const playersList = gameStart ? [...safePlayers].sort((a, b) => b.score - a.score) : safePlayers;
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };
  console.log(playersList)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-3xl">🏆</span>
        {gameStart ? 'Leaderboard' : 'Players'}
      </h3>
    </div>
  );
}