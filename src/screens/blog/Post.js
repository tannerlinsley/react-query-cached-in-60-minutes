import React from 'react'
import { useParams } from 'react-router-dom'

//

import usePost from '../../hooks/usePost'

import { Loader } from '../../components/styled'

export default function Post() {
  const { postId } = useParams()
  const postQuery = usePost(postId)

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <h2>
            {postQuery.data.title} {postQuery.isFetching ? <Loader /> : null}
          </h2>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  )
}
