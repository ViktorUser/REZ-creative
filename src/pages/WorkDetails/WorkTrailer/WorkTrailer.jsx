import React, { useContext } from 'react'
import { DataContext } from '@/helpers/dataHelpers/dataProvider';

export default function WorkTrailer() {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && (
    <section className="trailer container">
      
    </section>
  )
}
