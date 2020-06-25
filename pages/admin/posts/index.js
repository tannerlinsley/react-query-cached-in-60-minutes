import React from 'react'
import Link from 'next/link'

import PostForm from '../../../components/PostForm'

import usePosts from '../../../hooks/usePosts'
import useCreatePost from '../../../hooks/useCreatePost'

export default function Posts() {
  const postsQuery = usePosts()
  const [createPost, createPostInfo] = useCreatePost()

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id}>
                    <Link
                      href="/admin/posts/[postId]"
                      as={`/admin/posts/${post.id}`}
                    >
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={createPost}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
