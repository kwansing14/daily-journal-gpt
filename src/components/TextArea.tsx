interface Prop {
  header: string;
  placeholder: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<Prop> = ({ placeholder, header, input, setInput }) => {
  return (
    <>
      <div className="mt-4 text-white">{header}</div>
      <textarea
        value={input}
        placeholder={placeholder}
        className="h18 w-full rounded-sm py-2 px-2 outline-none"
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  );
};

export default TextArea;
