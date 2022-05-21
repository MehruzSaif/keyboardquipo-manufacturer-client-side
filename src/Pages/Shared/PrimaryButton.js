import React from 'react';

const PrimaryButton = ({children}) => {



    return (
        <button 
            className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-neutral"
            
            >{children}
        </button>
    );
};

export default PrimaryButton;