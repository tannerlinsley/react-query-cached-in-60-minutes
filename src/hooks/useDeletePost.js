import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useDeletePost() {
  return useMutation(
    (postId) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      onError: (error, variables, rollback) => {
        rollback && rollback()
      },
      onSuccess: (data, postId) => {
        const previousPosts = queryCache.getQueryData('posts')

        const optimisticPosts = previousPosts.filter((d) => d.id !== postId)

        queryCache.setQueryData('posts', optimisticPosts)
        queryCache.invalidateQueries('posts')
      },
    }
  )
}
