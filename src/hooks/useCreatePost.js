import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useCreatePost() {
  return useMutation(
    (values) => axios.post('/api/posts', values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.cancelQueries('posts')

        const oldPosts = queryCache.getQueryData('posts')

        queryCache.setQueryData('posts', (old) => {
          return [
            ...old,
            {
              ...values,
              id: Date.now(),
              isTemp: true,
            },
          ]
        })

        return () => queryCache.setQueryData('posts', oldPosts)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryCache.invalidateQueries('posts'),
    }
  )
}
