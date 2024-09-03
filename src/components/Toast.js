import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={ `toast toast-${type}` }>
            { message }
        </div>
    );
};

export default Toast;
