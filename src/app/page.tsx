import ApiSection from "@/components/ApiSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ImageCompressor from "@/components/ImageCompressor";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between  ">

      <ImageCompressor />
      <Features />
      <ApiSection />
      <Footer/>
    </main>
  );
}
