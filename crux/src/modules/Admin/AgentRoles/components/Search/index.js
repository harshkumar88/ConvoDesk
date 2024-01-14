import React from 'react'
import styles from '../Search/styles.module.css'

const Search= (props) => {
    const { query, setQuery, data }=props.context;
    return (

        <div>
            <input
                className={styles.input}
                placeholder="Search by Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>

    )
}

export default Search