import TabsComponent from "./TabsComponent";

const ApiSection = () => {
  return (
    <div id="api" className="flex flex-col justify-center items-center w-full py-14 px-4 md:px-14 lg:px-32  bg-gray-700 text-white">
      <h2 className="text-4xl font-bold pb-6 text-center">Developer API</h2>
      <h3 className="font-bold text-center text-2xl pb-4 ">
        Automate your WebP, JPEG and PNG compression workflow
      </h3>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <h3 className="font-bold text-center text-2xl py-8 px-4 ">
            Same API for WebP, JPEG & PNG images
          </h3>
          <p className="text-center mx-6">
            The API compresses WebP, JPEG and PNG images. You only have to
            upload your source image and download the result. Everything else
            happens automatically.
          </p>
          <div className="flex flex-col items-center py-8">
            <h4 className="text-xl font-semibold pb-4">API Details</h4>
            <div className="bg-[#161f27] flex flex-col justify-start rounded-lg p-8">
              <code>https://api.image.antuan01.com/convert</code>
              <code>METHOD: POST/form-data</code>
              <code>FIELDS: file =&gt; &quot;the image file&quot;</code>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="font-bold text-center text-2xl py-8">Code Examples</h3>
          <TabsComponent />
        </div>
      </div>
    </div>
  );
};

export default ApiSection;
