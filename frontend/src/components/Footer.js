// Tailwind.css footer

import React from 'react'

const Footer = () => {
    return (
        // TODO: remove fixed class ------------------------------------------------------------------------------
        <footer className="mt-auto bg-gray-900 text-white text-center py-4 fixed bottom-0 w-full">
            <div className="container">
                <p className="text-center">
                    Copyright &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}

export default Footer
