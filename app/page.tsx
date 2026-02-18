import TurnOne from "@/components/turns/TurnOne";
import TurnTwo from "@/components/turns/TurnTwo";
import TurnThree from "@/components/turns/TurnThree";
import TurnFour from "@/components/turns/TurnFour";
import TurnFive from "@/components/turns/TurnFive";
import TurnSix from "@/components/turns/TurnSix";
import TurnSeven from "@/components/turns/TurnSeven";

/**
 * Meet on Chai — homepage
 *
 * Seven turns in a conversation.
 * Each turn earns its place before the next begins.
 * Sequence is intentional — reordering it breaks the logic.
 */
export default function Home() {
  return (
    <main>
      <TurnOne />
      <TurnTwo />
      <TurnThree />
      <TurnFour />
      <TurnFive />
      <TurnSix />
      <TurnSeven />
    </main>
  );
}
