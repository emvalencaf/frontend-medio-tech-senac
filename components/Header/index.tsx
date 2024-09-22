export interface IHeader {
    title: string;
}

const Header: React.FC<IHeader> = ({ title, }) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export default Header;