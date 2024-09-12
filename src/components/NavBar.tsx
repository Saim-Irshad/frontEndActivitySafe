import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="bg-safepayBlue p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">Safepay</div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/grid" className="text-white hover:text-gray-300">
            Grid
          </Link>
        </li>
        <li>
          <Link to="/lookup" className="text-white hover:text-gray-300">
            Lookup
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
