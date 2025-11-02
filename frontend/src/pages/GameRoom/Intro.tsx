import React from "react";
const Intro: React.FC = () => {
  const gameStart = true
  const role = "drawer"
  const host = true
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 pt-6 pb-3 mb-5 border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Progress Bar */}
      <div className="mb-4">
        {
        gameStart ? (
          role === "drawer" ? (
            <h2 className="text-2xl font-bold text-center">
              The word is: <span className="text-purple-600">Mario</span>
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-center">
              The category is: <span className="text-purple-600">Video Games</span>
            </h2>
          )
        ) : host ? (
          <div className="text-center mx-2">
            <h2 className="text-xl font-bold mb-4">
              The Room ID is : <span className="text-purple-600">ABCD1234</span>
            </h2>
            <button className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              🎮 Click to Start The Game
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-semibold text-center text-gray-600">
            ⏳ Waiting for host to start the game...
          </h2>
        )}
      </div>

    </div>
  );
};

export default Intro;