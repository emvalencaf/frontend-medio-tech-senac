export interface ISideNavHeader {
    title: string;
}

const SideNavHeader: React.FC<ISideNavHeader> = ({ title }) => {
    return (
        <div className="p-4 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        </div>
    );
}

export default SideNavHeader;