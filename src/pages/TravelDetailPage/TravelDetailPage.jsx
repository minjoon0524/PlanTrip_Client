import React from 'react'
import './TravelDetailPage.style.css'

import { useCommonDetailQuery } from './../../hooks/useCommonDetail';
const TravelDetailPage = () => {
  const { data, isLoading, isError, error } = useCommonDetailQuery()

  console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default TravelDetailPage
