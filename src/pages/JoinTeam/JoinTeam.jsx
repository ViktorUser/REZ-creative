import { Footer } from '@/components/Footer/Footer'
import { InnerTransition } from '@/components/InnerTransition/InnerTransition'
import React, { useEffect } from 'react'
import TeamHero from './TeamHero/TeamHero'
import './JoinTeam.scss';
import Vacancies from './Vacancies/Vacancies';

export default function JoinTeam() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <InnerTransition>
      <main className="join-team">
        <TeamHero />
        <Vacancies />
      </main>
    <Footer />
    </InnerTransition>
  )
}
