import React from 'react'

export const Loader = () => {
    return (
        <div className="flex space-x-2 p-5 rounded-full justify-center items-center">
            <div className="bg-violet-700 p-2 w-4 h-4 rounded-full animate-bounce"></div>
            <div className="bg-violet-700 p-2 w-4 h-4 rounded-full animate-bounce"></div>
            <div className="bg-violet-700 p-2 w-4 h-4 rounded-full animate-bounce"></div>
        </div>
    )
}
