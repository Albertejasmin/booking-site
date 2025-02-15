import Landing from "@/components/Landing";
import LandingTickets from "@/components/LandingTickets";
import LandingArtists from "@/components/LandingArtists";
import LandingProgram from "@/components/LandingProgram";
import LandingStages from "@/components/LandingStages";

// Når vi parser props, hedder det prop drilling
// Prop drilling = parent component parser data ned til sine chrildren, som så sender det videre deres egne børn.
export default function Home({ bandData }) {
  return (
    <section>
      <Landing />
      <LandingTickets />
      <LandingProgram bandData={bandData} />
      <LandingArtists bandData={bandData} />
      <LandingStages />
    </section>
  );
}

export async function getServerSideProps() {
  const apiEndpoint = "https://nova-enchanted-confidence.glitch.me/bands";
  const bandRes = await fetch(apiEndpoint);
  const bandData = await bandRes.json();

  return {
    props: {
      bandData,
      isLanding: true,
    },
  };
}
// isLanding = boolean, som sætter den dynamiske klasse.
