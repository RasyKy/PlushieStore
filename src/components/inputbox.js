export default function InputBox({Type, displayText}) {
  return (
    <input
      type={Type}
      placeholder={displayText}
      className="border p-2 rounded mb-2 mt-2 bg-white"
    ></input>
  );
}
