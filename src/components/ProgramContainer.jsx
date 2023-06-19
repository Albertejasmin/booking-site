import stylesProgram from "../styles/Program.module.css";

const ProgramContainer = ({ title, events, handleBandSelection }) => {
  return (
    <section className={stylesProgram.programContainer}>
      {events.length > 0 && (
        <>
          <h2>{title}</h2>
          {events.map((bandEvent) => {
            if (bandEvent.act.includes("break")) {
              return null;
            }

            const act = bandEvent.act;
            const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

            if (index !== -1) {
              const beforeMatch = act.substring(0, index);
              const match = act.substring(index, index + searchResults.length);
              const afterMatch = act.substring(index + searchResults.length);

              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                  <span>{" " + beforeMatch}</span>
                  <span className={stylesProgram.highlight}>{match}</span>
                  <span>{afterMatch}</span> /
                </p>
              );
            }

            return (
              <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                {" " + bandEvent.act} /
              </p>
            );
          })}
        </>
      )}
    </section>
  );
};

export default ProgramContainer;
