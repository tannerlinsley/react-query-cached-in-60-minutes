import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useDeletePost() {
  return useMutation(
    (postId) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      onMutate: (postId) => {
        queryCache.cancelQueries('posts')
        const previousPosts = queryCache.getQueryData('posts')
        const optimisticPosts = previousPosts.filter((d) => d.id !== postId)
        queryCache.setQueryData('posts', optimisticPosts)
        return () => queryCache.setQueryData('posts', previousPosts)
      },
      onError: (error, variables, rollback) => {
        rollback && rollback()
      },
      onSuccess: () => {
        queryCache.invalidateQueries('posts')
      },
    }
  )
}
