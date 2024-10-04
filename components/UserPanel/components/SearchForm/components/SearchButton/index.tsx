import { FaSearch } from "react-icons/fa";

export interface ISearchButton {
    isEnabled: boolean;
}

const SearchButton: React.FC<ISearchButton> = ({ isEnabled }) => (
    <button
        type="submit"
        className={`absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center rounded-r-md w-1/5 ${isEnabled
                ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                : 'bg-purple-400 hover:bg-purple-200 focus:purple-600'
            } focus:outline-none focus:ring-2`}
    >
        <FaSearch className="inline-block mr-2 text-white" />
        <span className="hidden md:inline-block text-white font-bold">Buscar</span>
    </button>
);

export default SearchButton;