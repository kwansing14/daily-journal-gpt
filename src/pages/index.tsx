import { type NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { api } from "@/src/utils/api";
import { toast } from "react-hot-toast";
import LoginButton from "@/src/components/loginButton";
import { useSession } from "next-auth/react";

interface JournalData {
  journalData: {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
  };
}

const Home: NextPage = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [date, setDate] = useState("");
  const [dataOption, setDataOption] = useState(0);
  const { data: session } = useSession();

  const callGenerateJournal = api.chatGPT.generateJournal.useMutation({
    onMutate: () =>
      toast.loading("Generating...", { id: "callGenerateJournal" }),
    onSuccess: () => toast.success("Done!", { id: "callGenerateJournal" }),
    onError: (e) =>
      toast.error(`Error: ${e.data?.code || ""}`, {
        id: "callGenerateJournal",
      }),
  });
  const callGenerateJournal2 = api.chatGPT.generateJournal2.useMutation({
    onMutate: () =>
      toast.loading("Generating...", { id: "callGenerateJournal2" }),
    onSuccess: () => toast.success("Done!", { id: "callGenerateJournal2" }),
    onError: (e) =>
      toast.error(`Error: ${e.data?.code || ""}`, {
        id: "callGenerateJournal2",
      }),
  });
  const callGenerateJournal3 = api.chatGPT.generateJournal3.useMutation({
    onMutate: () =>
      toast.loading("Generating...", { id: "callGenerateJournal3" }),
    onSuccess: () => toast.success("Done!", { id: "callGenerateJournal3" }),
    onError: (e) =>
      toast.error(`Error: ${e.data?.code || ""}`, {
        id: "callGenerateJournal3",
      }),
  });

  const handleGenerate = (selectedOption: number) => {
    setDataOption(selectedOption);
    const inputPrompt = `
      Task Assigned:
      ${input1}\n\n
      Task Completed:
      ${input2}\n\n
      Plan For Next Day:
      ${input3}\n\n
      Any Issues Faced:
      ${input4}\n\n
      Using the same header, elaborate and expand on the key points.
    `;
    switch (selectedOption) {
      case 1:
        if (input1 && input2 && input3 && input4) {
          callGenerateJournal.mutate({ text: inputPrompt });
        }
        break;
      case 2:
        if (input1 && input2 && input3 && input4) {
          callGenerateJournal2.mutate({ text: inputPrompt });
        }
        break;
      case 3:
        if (input1 && input2 && input3 && input4) {
          callGenerateJournal3.mutate({ text: inputPrompt });
        }
        break;
      default:
        break;
    }
  };

  const copyToClipBoard = async () => {
    if (callGenerateJournal.data) {
      try {
        await navigator.clipboard.writeText(journalData);
        toast.success("Copied to clipboard");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDebounce = () => {
    const obj = {
      journalData: {
        input1: input1,
        input2: input2,
        input3: input3,
        input4: input4,
      },
    };
    return setTimeout(() => {
      localStorage.setItem("journalData", JSON.stringify(obj));
    }, 1000);
  };

  useEffect(() => {
    const delayDebounceFn = handleDebounce();
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input1, input2, input3, input4]);

  useEffect(() => {
    const storageData = localStorage.getItem("journalData");
    if (!storageData) return;
    const { journalData } = JSON.parse(storageData) as JournalData;
    if (journalData.input1) setInput1(journalData.input1);
    if (journalData.input2) setInput2(journalData.input2);
    if (journalData.input3) setInput3(journalData.input3);
    if (journalData.input4) setInput4(journalData.input4);
    setDate(new Date().toLocaleDateString());
  }, []);

  const journalData = useMemo(() => {
    if (callGenerateJournal.data && dataOption === 1) {
      return `Date: ${new Date().toLocaleDateString()}${
        callGenerateJournal.data
      }`;
    }
    if (callGenerateJournal2.data && dataOption === 2) {
      return `Date: ${new Date().toLocaleDateString()}${
        callGenerateJournal2.data
      }`;
    }
    if (callGenerateJournal3.data && dataOption === 3) {
      return `Date: ${new Date().toLocaleDateString()}${
        callGenerateJournal3.data
      }`;
    }
    return "";
  }, [
    dataOption,
    callGenerateJournal.data,
    callGenerateJournal2.data,
    callGenerateJournal3.data,
  ]);

  const isLoading = useMemo(() => {
    if (!session) return true;
    if (
      callGenerateJournal.isLoading ||
      callGenerateJournal2.isLoading ||
      callGenerateJournal3.isLoading
    ) {
      return true;
    }
    return false;
  }, [
    callGenerateJournal.isLoading,
    callGenerateJournal2.isLoading,
    callGenerateJournal3.isLoading,
    session,
  ]);

  return (
    <>
      <Head>
        <title>Daily Journal Generator</title>
        <meta
          name="description"
          content="Daily Journal Generator, by Alephians for Alephians"
        />
        <meta
          name="google-site-verification"
          content="heFZilYyvGdbQGp7zKFuw6WKHhLQwez2Rr5bhwoi8t4"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex	min-h-screen flex-col items-center bg-black py-8 px-3">
        <h2 className="text-2xl text-white">For Alephians by Alephians</h2>
        <div className="container flex w-full justify-between">
          <div className="text-white">{date}</div>
          <LoginButton />
        </div>
        <div className="container flex flex-col justify-center gap-2 ">
          <div className="mt-4 text-white">Task Assigned:</div>
          <textarea
            value={input1}
            placeholder={`1. API integration for project ABC\n2. Fix ui for XYZ`}
            className="h18 w-full rounded-sm py-2 px-2 outline-none"
            onChange={(e) => setInput1(e.target.value)}
          />
          <div className="mt-4 text-white">Task Completed:</div>
          <textarea
            value={input2}
            placeholder="1. API integrated for project EFG"
            className="h-18 w-full  rounded-sm py-2 px-2 outline-none"
            onChange={(e) => setInput2(e.target.value)}
          />
          <div className="mt-4 text-white">Plan For Next Day:</div>
          <textarea
            value={input3}
            placeholder="1. Unit test for project EFG"
            className="h-18 w-full  rounded-sm py-2 px-2 outline-none"
            onChange={(e) => setInput3(e.target.value)}
          />
          <div className="mt-4 text-white">Any Issues Faced:</div>
          <textarea
            value={input4}
            placeholder="1. Services backend failed."
            className="h-18 w-full  rounded-sm py-2 px-2 outline-none"
            onChange={(e) => setInput4(e.target.value)}
          />
          <div className="mt-8 text-white">Select a Ai-model:</div>
          <div className="flex items-center gap-4">
            <button
              className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4 outline-none transition-all focus:shadow-gray-100 focus:outline-gray-400 disabled:opacity-25"
              onClick={() => handleGenerate(1)}
              disabled={isLoading}
            >
              Davinci
            </button>
            <button
              className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4 outline-none transition-all focus:shadow-gray-100 focus:outline-gray-400 disabled:opacity-25"
              onClick={() => handleGenerate(2)}
              disabled={isLoading}
            >
              Curie
            </button>
            <button
              className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4 outline-none transition-all focus:shadow-gray-100 focus:outline-gray-400 disabled:opacity-25"
              onClick={() => handleGenerate(3)}
              disabled={isLoading}
            >
              Ada
            </button>
            {callGenerateJournal?.data && (
              <button
                className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4"
                onClick={copyToClipBoard}
                disabled={isLoading}
              >
                Copy to clipboard
              </button>
            )}
          </div>
        </div>
        {!session && (
          <div className="container mt-4 text-white">
            Logged in with your aleph email to start.
          </div>
        )}
        <div className="container mt-4 py-4">
          {journalData && (
            <div className="whitespace-pre-line text-white">{journalData}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
