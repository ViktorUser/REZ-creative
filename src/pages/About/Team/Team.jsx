import React from 'react'

import './Team.scss';
import teamData from "@/data/team.json"

export default function Team() {
  return (
    <section className="team container">
      <h1 className="super-text">
        Our team
      </h1>

      <ul className="team__list">
        {teamData.map((currMember, i) => (
          <li className="team__item" key={`team-member-${i}`}>
            <img src={currMember.image} alt="team Member" className="team__image"/>
            <div>
              <p>{currMember.name}</p>
              <span className="smallText">{currMember.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
        }
