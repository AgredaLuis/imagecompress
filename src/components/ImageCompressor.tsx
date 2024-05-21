'use client';
import React, { ChangeEvent, useState } from "react";
import FormData from "form-data";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface ImageInfo {
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressedImage: Blob | null;
}

const ImageCompressor: React.FC = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [originalImages, setOriginalImages] = useState<File[]>([]);

  const compressImages = async (files: File[]): Promise<Blob[]> => {
    try {
      const compressedImages: Blob[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("https://api.image.antuan01.com/convert", {
          method: "POST",
          body: formData as any,
        });

        if (!response.ok) {
          throw new Error("Error al comprimir la imagen");
        }

        const compressedBlob = await response.blob();
        compressedImages.push(compressedBlob);
      }
      return compressedImages;
    } catch (error) {
      console.error("Error comprimiendo las imágenes:", error);
      throw error;
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        const compressedBlobs = await compressImages(Array.from(files));
        if (compressedBlobs.length !== files.length) {
          throw new Error("No se comprimieron todas las imágenes correctamente");
        }
        const newImages: ImageInfo[] = [];
        for (let i = 0; i < files.length; i++) {
          const imageInfo: ImageInfo = {
            originalName: files[i].name,
            originalSize: files[i].size,
            compressedSize: compressedBlobs[i].size,
            compressedImage: compressedBlobs[i],
          };
          newImages.push(imageInfo);
        }
        setOriginalImages(Array.from(files));
        setImages((prevImages) => [...newImages, ...prevImages, ]);
        toast.success("Images compressed successfully");
      } catch (error) {
        console.error("Error comprimiendo las imágenes:", error);
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      try {
        const compressedBlobs = await compressImages(Array.from(files));
        const newImages: ImageInfo[] = [];
        for (let i = 0; i < files.length; i++) {
          const imageInfo: ImageInfo = {
            originalName: files[i].name,
            originalSize: files[i].size,
            compressedSize: compressedBlobs[i].size,
            compressedImage: compressedBlobs[i],
          };
          newImages.push(imageInfo);
        }
        setOriginalImages(Array.from(files));
        setImages((prevImages) => [...newImages, ...prevImages, ]);
      } catch (error) {
        console.error("Error comprimiendo las imágenes:", error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDownload = (compressedImage: Blob, originalName: string) => {
    const url = URL.createObjectURL(compressedImage);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${originalName}_compressed.jpg`; // Cambia la extensión según el tipo de imagen
    link.click();
  };

  const calculateCompressionPercentage = (
    originalSize: number,
    compressedSize: number
  ) => {
    const percentage = ((originalSize - compressedSize) / originalSize) * 100;
    return percentage.toFixed(2);
  };

  const handleUploadButtonClick = async () => {
    const fileInput = document.getElementById("dropzone-file") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-14 px-4 md:px-14 lg:px-32 ">
      <div className="w-full flex flex-col md:flex-row lg:h-[550px] items-center gap-16 md:px-8 py-10">
        <div className="flex flex-col items-start w-full lg:w-[600px] px-4">
          <h1 className="font-bold text-4xl lg:text-5xl tracking-wider pb-10">
            Speed Up Your Website with Lighter Images
          </h1>
          <p className="text-xl mr-4 lg:mx-0">
            Make your website faster with simplest image optimization tool to
            improve web performance and save time. It takes one click to resize,
            compress and convert your images to WebP.
          </p>
          <button aria-label="Upload a image buttom" onClick={handleUploadButtonClick} className=" bg-blue-500 hover:bg-blue-700 text-white rounded-xl font-bold py-4 px-10  mt-10 text-xl">
            Upload Image
          </button>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        <div
          className="w-full lg:w-[600px] bg-slate-900 rounded-xl"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-[320px] border-2 border-gray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-100 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-4-4V6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2m-4 4v2m0 0h-2m2 0h2m-2 0l2-2-2-2"
                    />
                  </svg>
                  <p className="mb-2 text-sm dark:text-gray-100">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-100">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:px-14 lg:pt-4 lg:pb-8 hidden lg:block">
        {images.length > 0 && (
          <div className="mt-8 ">
            <h2 className="text-2xl text-center font-semibold mb-4">
              Compressed Images
            </h2>
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Imagen</th>
                  <th className="border border-gray-400 px-4 py-2 ">
                    Initial Size (bytes)
                  </th>
                  <th className="border border-gray-400 px-4 py-2 ">
                    Compressed Size (bytes)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Reduction (%)
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Download</th>
                </tr>
              </thead>
              <tbody className="">
                {images.map((image, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="border border-gray-400 px-4 py-2">
                      {image.compressedImage && (
                        <Image
                          src={URL.createObjectURL(image.compressedImage)}
                          alt={`Imagen ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                          width={100}
                          height={100}
                        />
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {image.originalSize}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center ">
                      {image.compressedSize}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {image.compressedImage && (
                        <span>
                          (
                          {calculateCompressionPercentage(
                            image.originalSize,
                            image.compressedSize
                          )}
                          %)
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {image.compressedImage && (
                        <button
                        aria-label="Download image"
                          onClick={() =>
                            handleDownload(
                              image.compressedImage!,
                              image.originalName
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                        >
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="lg:hidden">
        {images.length > 0 && (
          <div className="mt-8 ">
            <h2 className="text-2xl text-center font-semibold mb-4">
              Compressed Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
              {images.map((image, index) => (
                <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                  {image.compressedImage && (
                    <Image
                      src={URL.createObjectURL(image.compressedImage)}
                      alt={`Imagen ${index + 1}`}
                      className="w-[300px] h-[300px] object-cover"
                      width={100}
                      height={100}
                    />
                  )}
                  <div className="p-4">
                    <div className="text-sm mb-2">
                      Initial Size (bytes): {image.originalSize}
                    </div>
                    <div className="text-sm mb-2">
                      Compressed Size (bytes): {image.compressedSize}
                    </div>
                    <div className="text-sm mb-2">
                      Reduction (%):{" "}
                      {calculateCompressionPercentage(
                        image.originalSize,
                        image.compressedSize
                      )}
                    </div>
                    <button
                      onClick={() =>
                        handleDownload(image.compressedImage!, image.originalName)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
