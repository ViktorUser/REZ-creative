import { Footer } from "@/components/Footer/Footer";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import React, { useEffect } from "react";
import TeamHero from "./TeamHero/TeamHero";
import "./JoinTeam.scss";
import Vacancies from "./Vacancies/Vacancies";
import { DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_VACANCIES } from "@/helpers/dataHelpers/linksAPI";

export default function JoinTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DataProvider url={URL_VACANCIES}>
      <PageLayout>
        <main className="join-team">
          <TeamHero />
          <Vacancies />
        </main>
      </PageLayout>
    </DataProvider>
  );
}
