"use client";
import { useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCheck } from "react-icons/fa6";
import {FaCopy} from "react-icons/fa"

const items = [
  {
    title: "Python",
    content: `import requests\n\nurl = 'https://api.image.antuan01.com/convert'\n image = {'file': open('image.png' ,'rb')}\n\nres = requests.post(url, files = image)\n\nhandle = open('image.webp', 'wb')\nhandle.write(res.content)\nhandle.close()`,
  },
  {
    title: "Go",
    content: `package main

    import (
        "bytes"
        "io"
        "log"
        "mime/multipart"
        "net/http"
        "os"
        "time"
    )
    
    func main() {
    
        client := &http.Client{
            Timeout: time.Second * 10,
        }
    
        body := &bytes.Buffer{}
        writer := multipart.NewWriter(body)
        fw, err := writer.CreateFormFile("file", "chiguire2.png")
        if err != nil {
            log.Printf("Error %d", err.Error)
        }
        file, err := os.Open("chiguire2.png")
        if err != nil {
            log.Printf("Error %d", err.Error)
        }
        _, err = io.Copy(fw, file)
        if err != nil {
            log.Printf("Error %d", err.Error)
        }
        writer.Close()
        req, err := http.NewRequest("POST", "https://api.image.antuan01.com/convert", bytes.NewReader(body.Bytes()))
        if err != nil {
            log.Printf("Error %d", err.Error)
        }
        req.Header.Set("Content-Type", writer.FormDataContentType())
        rsp, _ := client.Do(req)
        if rsp.StatusCode != http.StatusOK {
            log.Printf("Request failed with response code: %d", rsp.StatusCode)
        }
    
        tmpfile, err := os.Create("./imageGo.webp")
        defer tmpfile.Close()
        if err != nil {
            log.Printf("Err: %d", err)
        }
        _, err = io.Copy(tmpfile, rsp.Body)
        if err != nil {
            log.Printf("Err: %d", err)
        }
    
    }`,
  },
  {
    title: "Ruby",
    content: `require "net/http"
require "uri"

uri = URI('https://api.image.antuan01.com/convert')
request = Net::HTTP::Post.new(uri)
form_data = [['file', File.open("./image.png")]]

request.set_form form_data, 'multipart/form-data'

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    http.request(request)
end

File.write("image.webp", response.body, mode: "wb") `,
  },
  {
    title: "Php",
    content: `require 'vendor/autoload.php';

use GuzzleHttp\Psr7;
use GuzzleHttp\Client;

$client = new Client();

$response = $client->request('POST', 'https://api.image.antuan01.com/convert', [
    'multipart' => [
        [
            'name'     => 'file',
            'contents' => Psr7\Utils::tryFopen('image.png', 'r')
        ],
    ]
]);

$myfile = fopen("image.webp", "wb") or die("Unable to open file!");
fwrite($myfile, $response->getBody());
fclose($myfile); `,
  },
  {
    title: "Node",
    content: `const fs = require('fs');
    const path = require('path')
    const fetch = require('node-fetch');
    const FormData = require('form-data');
    
    const formData = new FormData();
    const inputFilename = "image.png";
    const readedFile = fs.readFileSync(inputFilename);
    
    const  getStream = (filename) =>{
        try{
            fs.unlinkSync(filename);
        }catch(e){
        }
        return  new WritableStream({
        write(chunk) {
            return new Promise((resolve, reject) => {
            fs.appendFile(filename, chunk, (err) => {
                if (err) {
                reject(err);
                } else {
                resolve();
                }
            });
            });
        }
        });
    }
    
    const blobImage = new Blob([readedFile],{
        type: "image/png",
        });
    
    formData.append('file', blobImage, "image.png");
    
    fetch("https://api.image.antuan01.com/convert",{
        method: "post",
        body: formData,
    }).then(  res =>{
        const ext = res.headers.get("Content-Type").split('/')[1];
        const name=  path.parse(inputFilename).name;
        res.body.pipeTo(getStream(name + "." + ext));
    }).catch(e => console.log(e));`,
  },
];
const TabsComponent = () => {
  const firstTab = useRef<HTMLButtonElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (code: string) => {
    // Copiar al portapapeles
    navigator.clipboard.writeText(code);
    setCopied(true);

  };

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setCopied(false);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md flex flex-col gap-y-2 w-full">
        <div className=" p-1 grid grid-cols-2 sm:flex sm:flex-row justify-between items-center gap-x-2 font-bold text-white ">
          {items.map((item, index) => (
            <button
              key={index}
              ref={item.title === "Tab 1" ? firstTab : null}
              aria-label={`${item.title} code example`}
              onClick={() => handleTabClick(index)}
              className={` border-b-4  outline-none w-full p-2 hover:border-b-4 hover:border-blue-300 text-center ${
                selectedTab === index ? "border-blue-600" : "border-transparent"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="relative">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${
                selectedTab === index
                  ? "h-[320px] bg-[#161f27] rounded-lg p-8 overflow-auto"
                  : "hidden"
              }`}
            >
              <pre>
                <code>{item.content}</code>
              </pre>
                <button aria-label="Copy content buttom" onClick={() => handleCopy(item.content)} className="absolute top-0 right-0 mt-4 mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {copied ? (<FaCheck />) : (<FaCopy />)}
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
