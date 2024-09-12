import { Link } from "react-router-dom";
import { CiSquarePlus,  } from "react-icons/ci";
import { logo } from "../assets";
import { MdPerson } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="h-screen bg-darkblue">
      <div className="w-full flex flex-col h-full items-center p-4">
        <div className="flex flex-row text-left mt-4 items-center justify-between">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold uppercase bg-clip-text"
          >
            <MdPerson size={80} color="white"/>
          </Link>
          <div className="flex flex-col text-white">
            <span>
              Caleb Shim
            </span>
            <span>
              Spalding Cove
            </span>
          </div>
          
        </div>
        <div className="flex flex-col items-center mt-4 space-y-4 w-full">
          <Link to="/create" className="w-5/6">
            <button className="w-full py-4 bg-lightgray rounded-lg">
              <div className="flex flex-row justify-between px-4">
                <span className="mr-2 text-darkgray">Sell</span>
                <CiSquarePlus className="text-2xl" color="darkgray" />
              </div>
            </button>
          </Link>
          <Link to="/" className="w-5/6">
            <button className="w-full py-4 bg-lightgray rounded-lg">
              <div className="flex flex-row justify-between px-4">
                <span className="mr-2 text-darkgray">Browse</span>
                <CiSquarePlus className="text-2xl" color="darkgray" />
              </div>
            </button>
          </Link>
          <Link to="/messages" className="w-5/6">
            <button className="w-full py-4 bg-lightgray rounded-lg">
              <div className="flex flex-row justify-between px-4">
                <span className="mr-2 text-darkgray">Messages</span>
                <CiSquarePlus className="text-2xl" color="darkgray" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;