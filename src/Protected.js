import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from './AuthService';

const Protected = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProtectedData();
                setData(response);
            } catch (error) {
                alert('Access denied');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Protected Data</h1>
            {data && <p>{data.message}</p>}
        </div>
    );
};

export default Protected;