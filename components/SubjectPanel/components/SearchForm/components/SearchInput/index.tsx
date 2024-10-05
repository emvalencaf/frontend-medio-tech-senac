import { IconType } from "react-icons";
import { SearchFieldsTypes } from "../..";

export interface ISearchInput {
    id: SearchFieldsTypes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    placeholder: string;
    Icon: IconType;
    isActive: boolean;
    onClick: () => void;
}

const SearchInput: React.FC<ISearchInput> = ({ id, register, placeholder, Icon, isActive, onClick }) => {
    return (
        <div className="relative flex-1">
            <input
                id={id}
                type="text"
                className={`absolute inset-0 w-full p-2 border border-gray-300 rounded outline-none transition-transform duration-300 transform ${isActive ? 'opacity-100 translate-x-0 bg-white' : 'opacity-0 translate-x-full'
                    }`}
                {...register(id)}
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`flex items-center justify-between p-3 cursor-pointer text-gray-600 bg-purple-300 transition-transform duration-300 transform ${isActive ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
                    }`}
                onClick={onClick}
            >
                <Icon className="text-gray-600" />
                <span className="hidden md:inline-block ml-2 text-gray-600 font-bold">{placeholder}</span>
            </label>
        </div>
    );
};

export default SearchInput;