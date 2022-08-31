import { createContext, useState } from "react";
const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [podSlug, setSlug] = useState(null)
  // TODO: Move isLoading state here
  // const [modalContent, setModalContent] = useState({
  //   title: null,
  //   description: null,
  //   videoUrl: null,
  //   thumbnailUrl: null,
  //   hosts: null,
  //   slug: null
  // })
  const changeModal = () => setModal(!modal)
  const InitModal = (slug) => {
    // console.log(`Modal slug: ${slug}`);
    setSlug(slug)
  }
  // console.log(`Current slug is: ${podSlug}`);
  return (
    <ModalContext.Provider value={{ modal, changeModal, InitModal, podSlug }}>{children}</ModalContext.Provider>
  )

}

export default ModalContext;