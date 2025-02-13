import { FAQ } from "@/components/faq";

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Support Center</h1>
      <div className="space-y-8">
        <section>
          <FAQ />
        </section>
      </div>
    </div>
  );
}
