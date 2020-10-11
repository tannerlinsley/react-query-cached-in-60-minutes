import React from 'react'
import { Link } from 'react-router-dom'
import { queryCache } from 'react-query'

import usePosts from '../../hooks/usePosts'
import { fetchPost } from '../../hooks/usePost'

import { PostStyles } from '../../components/styled'

export default function Home() {
  const postsQuery = usePosts()

  return (
    <div>
      <h1>Blog</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostStyles
              as={Link}
              to={`./${post.id}`}
              disabled={post.isTemp}
              key={post.id}
              onMouseEnter={() => {
                if (!queryCache.getQueryData(['posts', String(post.id)])) {
                  queryCache.setQueryData(['posts', String(post.id)], post)
                  queryCache.invalidateQueries(['posts', String(post.id)])
                }
                queryCache.prefetchQuery(
                  ['posts', String(post.id)],
                  fetchPost,
                  {
                    staleTime: 5000,
                  }
                )
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </PostStyles>
          ))
        )}
      </div>
    </div>
  )
}
