import type { Metadata } from "next";
import { ConversationGate } from "@/components/talk/ConversationGate";

export const metadata: Metadata = {
  title: "Let's talk — Meet on Chai",
  description:
    "Before we build anything, we prefer to understand what's actually going on.",
};

/**
 * /talk — The Conversation Gate.
 *
 * Not a contact page. Not a form page.
 * A single screen that extends an invitation.
 *
 * Primary: Schedule a 30-minute conversation (calendar link)
 * Secondary: Or send a short note (3-field form, reveals on click)
 *
 * This page is reached only from CTAs on the homepage.
 * It is not linked in navigation because there is no navigation.
 */
export default function TalkPage() {
  return <ConversationGate />;
}
