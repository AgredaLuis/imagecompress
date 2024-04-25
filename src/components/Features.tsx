import Image from "next/image";

const Features = () => {
  return (
    <div id="features" className="flex flex-col justify-center items-center w-full py-14 px-4 md:px-14 lg:px-32 ">
      <h2 className="text-4xl font-bold pb-6">Make your website faster</h2>
      <p className="text-center text-lg lg:text-2xl">
        Images can account for 50% of your loading time.
      </p>
      <p className="text-center text-lg lg:text-2xl">
        By compressing them, you will gain precious seconds
      </p>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 pt-14">
        <div className=" flex flex-col justify-center items-center">
          <Image
            src="/search.png"
            alt="search image"
            width={60}
            height={50}
            className="pb-12"
          />
          <h3 className="font-bold text-center text-2xl pb-4">
            Enhance user experience
          </h3>
          <p className="text-center mx-6">
            A fast web page encourages your visitors to stay on your website and
            keep browsing. Offer them an ultra­fast experience!
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center ">
          <Image
            src="/seo.png"
            alt="search image"
            width={60}
            height={50}
            className="pb-12"
          />
          <h3 className="font-bold text-center text-2xl pb-4">
            SEO performance
          </h3>
          <p className="text-center mx-6">
            A fast website also means increasing the SEO visibility on Google –
            which can bring more high-quality traffic.
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <Image
            src="/startup.png"
            alt="search image"
            width={60}
            height={50}
            className="pb-12"
          />
          <h3 className="font-bold text-center text-2xl pb-4">
            Boost Conversions
          </h3>
          <p className="text-center mx-6">
            With more visitors and more engagement, you will naturally have more
            subscribers and more sales!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
