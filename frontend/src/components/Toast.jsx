import React from 'react';

export default function Toast({ message, type = 'info' }) {
    const bgColor = {
        error: 'bg-red-500',
        success: 'bg-green-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    }[type] || 'bg-blue-500';

    return (
        <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg mb-4 flex items-center gap-2 animate-in fade-in slide-in-from-top`}>
            <span className="text-lg">
                {type === 'error' && '❌'}
                {type === 'success' && '✅'}
                {type === 'info' && 'ℹ️'}
                {type === 'warning' && '⚠️'}
            </span>
            <span className="font-medium">{message}</span>
        </div>
    );
}
