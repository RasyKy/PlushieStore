import { IoIosSearch  } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className="flex border-1 items-center p-1 rounded-2xl">
      <IoIosSearch className="ml-2 mr-2"/>
      <input id="search-product" type="text" placeholder="Search" className="outline-none flex-1"></input>
    </div>
  );
}
