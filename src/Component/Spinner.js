import React from 'react'

export const Spinner = () => {
    return (
        <div className="col-12 text-center">
            <div className="spinner-grow text-main" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
