import React from "react";
import CreateNew from "./CreateNew";
import JoiningExist from "./JoiningExist";
import LoadingPage from "../LoadingPage";



export default function landing() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');


  const [joinForm, setJoinForm] = React.useState({
    name: '',
    roomId: '',
    joinError: ''
  })


  return (
    <div className="flex w-full min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50">
      {isLoading && (
        <LoadingPage />
      )
      }
      
      {!isLoading && !error && (
        <>
          <CreateNew setIsLoading={setIsLoading} setError={setError} />
          <JoiningExist setIsLoading={setIsLoading} setError={setError} joinForm={joinForm} setJoinForm={setJoinForm} />
        </>
      )}

      {error && (
        <div className="m-auto p-4">
          <h2 className="text-lg font-semibold mb-2">An error occurred: Please Reload the Page</h2>
        </div>
      )}
    </div>
  );
}

