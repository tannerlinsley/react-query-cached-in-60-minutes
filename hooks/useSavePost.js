import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useSavePost() {
  return useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries('posts')
        queryCache.invalidateQueries(['posts', variables.id])
      },
    }
  )
}
