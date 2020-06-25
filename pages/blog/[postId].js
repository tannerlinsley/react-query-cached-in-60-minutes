import React from 'react'

//

import usePost from '../../hooks/usePost'

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      postId: params.postId,
    },
  }
}

export default function Post({ postId }) {
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
            {postQuery.data.title}{' '}
            {postQuery.isFetching ? <small>...</small> : null}
          </h2>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  )
}
