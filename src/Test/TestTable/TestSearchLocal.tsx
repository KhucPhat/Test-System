import React, { useState, useEffect } from 'react';

const SearchComponent = () => {
    const data = [
        { id: 1, name: 'Apple', type: 'Fruit', description: 'Green apple' },
        { id: 2, name: 'Banana', type: 'Fruit', description: 'Yellow banana' },
        { id: 3, name: 'Carrot', type: 'Vegetable', description: 'Orange carrot' },
        { id: 4, name: 'Duck', type: 'Animal', description: 'A small duck' }
    ];

    const [nameSearch, setNameSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [descSearch, setDescSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    // Clear timeout when component unmounts
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleSearch = () => {
        setIsLoading(true);
        const newTimeoutId = setTimeout(() => {
            const results = data.filter(item =>
                (nameSearch ? item.name.toLowerCase().includes(nameSearch.toLowerCase()) : true) &&
                (typeSearch ? item.type.toLowerCase().includes(typeSearch.toLowerCase()) : true) &&
                (descSearch ? item.description.toLowerCase().includes(descSearch.toLowerCase()) : true)
            );
            setSearchResults(results);
            setIsLoading(false);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={nameSearch}
                onChange={e => setNameSearch(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by type..."
                value={typeSearch}
                onChange={e => setTypeSearch(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by description..."
                value={descSearch}
                onChange={e => setDescSearch(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>Search</button>
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {searchResults.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.type} - {item.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
