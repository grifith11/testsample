import { HeroSection } from "@/components/hero-section";
import { ValentineProposal } from "@/components/valentine-proposal";
import { CompleteStory } from "@/components/complete-story";
import { LoveLetter } from "@/components/love-letter";
import { SpecialMoment } from "@/components/special-moment";
import { FinalSection } from "@/components/final-section";
import { FloatingHearts } from "@/components/floating-hearts";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Floating hearts background animation */}
      <FloatingHearts />

      {/* Hero - Full screen romantic entrance */}
      <HeroSection />

      <SectionDivider />

      {/* Valentine Proposal - Interactive will you be my valentine */}
      <ValentineProposal />

      <SectionDivider />

      {/* Our Story - All 12 chapters with image placeholders */}
      <CompleteStory />

      <SectionDivider />

      {/* Love Letter - Handwritten-style message */}
      <LoveLetter />

      <SectionDivider />

      {/* Special Moment - Surprise reveal with confetti */}
      <SpecialMoment />

      <SectionDivider />

      {/* Final Section - Forever Yours */}
      <FinalSection />
    </main>
  );
}
