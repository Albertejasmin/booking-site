import stylesProgram from "../styles/Program.module.css";
import { useState } from "react";
import Modal from "@/components/Modal";
import Head from "next/head";
import Link from "next/link";
import ProgramContainer from "@/components/ProgramContainer";

export default function Program({ scheduleData, bandData }) {
  const [selectedBand, setSelectedBand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  // callback function that is called when a band event is clicked. It takes the selected bandEvent and day as a parameter.
  const handleBandSelection = (bandEvent, day) => {
    // opretter en variabel og tildeler den en værdi baseret på resultatet filtrering af dataene
    // Hvis længden af det filtrerede array er større end nul, bliver værdien sand
    let stage = scheduleData.Jotunheim[day].filter((act) => act.act === bandEvent.act).length ? "Jotunheim" : false;
    if (!stage) {
      stage = scheduleData.Midgard[day].filter((act) => act.act === bandEvent.act).length ? "Midgard" : false;
    }
    if (!stage) {
      stage = scheduleData.Vanaheim[day].filter((act) => act.act === bandEvent.act).length ? "Vanaheim" : false;
    }

    // søger efter et objekt i bandData-arrayet, hvor name-attributtet er lig med bandEvent.act.
    // find()-metoden returnerer det første objekt, der opfylder betingelsen, ellers undefined
    let bandInfo = bandData.find((band) => band.name === bandEvent.act);
    // setSelectedBand() bliver kaldt med et objekt som argument
    setSelectedBand({
      ...bandEvent,
      day,
      stage,
      bandInfo,
    });
    setShowModal(true);
  };

  return (
    <>
      <Head>
        <title>Program</title>
      </Head>
      <Modal selectedBand={selectedBand} showModal={showModal} handleCloseModal={setShowModal} />

      {!showModal && (
        <section className={stylesProgram.programBackground}>
          <h1 className={stylesProgram.programHeading}>Program</h1>
          <Link className={stylesProgram.link} href="/schedule">
            / Schedule
          </Link>
          <div className={stylesProgram.search}>
            <input type="search" id="search" placeholder="Search artist" onChange={(e) => setSearchResults(e.target.value)} />
          </div>

          <ProgramContainer
            title="Monday"
            events={scheduleData.Midgard.mon.concat(scheduleData.Jotunheim.mon, scheduleData.Vanaheim.mon).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />

          <ProgramContainer
            title="Tuesday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
          <ProgramContainer
            title="Wednesday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
          <ProgramContainer
            title="Thursday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
          <ProgramContainer
            title="Friday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
          <ProgramContainer
            title="Saturday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
          <ProgramContainer
            title="Sunday"
            events={scheduleData.Midgard.tue.concat(scheduleData.Jotunheim.tue, scheduleData.Vanaheim.tue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))}
            handleBandSelection={handleBandSelection}
            searchResults={searchResults}
          />
        </section>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const apiEndpoints = ["https://nova-enchanted-confidence.glitch.me/bands", "https://nova-enchanted-confidence.glitch.me/schedule"];
  // mapper igennem hver array alt efter hvilket endpoint det er og fetcher
  const apiRequest = apiEndpoints.map((endpoint) => fetch(endpoint));
  // Promise.all venter på alle apiRequest er kørt igennem før den går videre.
  const [bandRes, scheduleRes] = await Promise.all(apiRequest);

  const bandData = await bandRes.json();
  const scheduleData = await scheduleRes.json();

  return {
    props: {
      bandData,
      scheduleData,
      isProgram: true,
    },
  };
}
