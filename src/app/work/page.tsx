import { PageHero } from "@/components/agency/PageHero";
import { WorkPageContent } from "@/components/agency/WorkPageContent";

export const metadata = {
  title: "Our Work — Portfolio | INDUS Web Agency",
  description: "Case studies in custom software, websites, and business automation from INDUS Web Agency.",
};

export default function WorkPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Selected work"
        title="Work that ships"
        description="Real projects — dialers, email platforms, scrapers, and the marketplace you're browsing now. Many are also available as licensed products."
      />
      <WorkPageContent />
    </div>
  );
}
