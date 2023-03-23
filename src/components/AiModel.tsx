import { toast } from "react-hot-toast";

interface Prop {
  handleGenerate: (selectedOption: number) => void;
  journalData: string;
  isLoading: boolean;
  header: string;
}

const AiModel: React.FC<Prop> = ({
  handleGenerate,
  journalData,
  isLoading,
  header,
}) => {
  const copyToClipBoard = async () => {
    if (journalData) {
      try {
        await navigator.clipboard.writeText(journalData);
        toast.success("Copied to clipboard");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="mt-8 text-white">{header}</div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4 outline-none transition-all focus:shadow-gray-100 focus:outline-gray-400 disabled:opacity-25"
          onClick={() => handleGenerate(4)}
          disabled={isLoading}
        >
          Turbo
        </button>
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

        {journalData && (
          <button
            className="min-w-[100px] rounded-sm bg-gray-200 py-1 px-4"
            onClick={copyToClipBoard}
            disabled={isLoading}
          >
            Copy to clipboard
          </button>
        )}
      </div>
    </>
  );
};

export default AiModel;
