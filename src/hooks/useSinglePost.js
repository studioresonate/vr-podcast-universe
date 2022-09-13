import { useContext, useEffect, useState } from 'react'

import { getSinglePost } from '../contentful'
import ModalContext from '../ModalContext';

export default function useSinglePost() {
  const { podSlug } = useContext(ModalContext)
  // const promise = getSinglePost(podSlug)

  const [post, setPost] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getSinglePost(podSlug)
      .then(result => {
        setPost(result[0].fields);
        setLoading(false);
      });
  }, [podSlug]);
  return [post, isLoading]
}