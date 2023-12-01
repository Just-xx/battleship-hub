import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import CreateCard from '../components/ActionCards/CreateCard/CreateCard'
import { useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal/Modal'
import { toast } from 'react-toastify'

export default function Play() {

  const [ searchParams, setSearchParams ] = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get('quit') === '1') {
      toast.info('You left the game')
      searchParams.set('quit', '0')
      setSearchParams(searchParams)
    }
  }, [])

  return (
    <>
      <Header />
      <CreateCard />
    </>
  )
}
