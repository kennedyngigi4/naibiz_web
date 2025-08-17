import React, { Suspense } from 'react'
import SearchPage from './pageClient'

const Search = () => {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
        <SearchPage />
    </Suspense>
  )
}

export default Search