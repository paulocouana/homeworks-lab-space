import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";

const ComoFunciona = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default ComoFunciona;