import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios.js";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

function PublicLinkGenerator() {
  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const [randomString, setRandomString] = useState(generateRandomString());
  const publicLink = `1${randomString}`;
  useEffect(() => {
    setRandomString(generateRandomString());
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Salin Link ini!</h2>
      <p className="mt-4">
        Public Link: <a href={publicLink} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-sm">{publicLink}</a>
      </p>
    </div>
  );
}

export default PublicLinkGenerator;
