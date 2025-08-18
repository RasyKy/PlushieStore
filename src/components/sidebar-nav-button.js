import Link from "next/link";

export default function SidebarButton({ text, activePage }) {

  return (
  <div>
  {activePage ? (
    <div className="text-blue-600 bg-blue-100 p-3 rounded-2xl pl-15 mb-4 font-bold"><span>{text}</span></div> 
    ) : (
    <div className="text-black p-3 rounded-2xl pl-15 mb-4">{text}</div>
)}
  </div>
 
);}