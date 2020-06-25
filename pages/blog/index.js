import React from 'react'
import Link from 'next/link'
import { queryCache } from 'react-query'

import usePosts from '../../hooks/usePosts'
import { fetchPost } from '../../hooks/usePost'

import { PostStyles } from '../../components/styled'

export default function Home() {
  const postsQuery = usePosts()

  return (
    <div>
      <h1>Blog {postsQuery.isFetching ? <small>...</small> : null}</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading
          ? 'Loading...'
          : postsQuery.isError
          ? postsQuery.error.message
          : postsQuery.data.map((post) => (
              <Link
                href={`/blog/[postId]`}
                as={`/blog/${post.id}`}
                key={post.id}
              >
                <PostStyles
                  as="a"
                  onMouseEnter={() => {
                    if (!queryCache.getQuery(['posts', post.id])) {
                      queryCache.prefetchQuery(['posts', post.id], fetchPost, {
                        staleTime: 2000,
                      })
                    }
                  }}
                >
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </PostStyles>
              </Link>
            ))}
      </div>
    </div>
  )
}
