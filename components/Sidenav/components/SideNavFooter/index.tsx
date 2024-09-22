// natives components
import Image from 'next/image';

const SideNavFooter: React.FC = () => {
    return (
        <footer className="p-4">
            <div className="flex items-center justify-center pb-8 space-x-3">
                <Image src="/assets/senac_logo.png" className='' alt="Logo do Senac" width="150" height="150" />
            </div>
        </footer>
    );
}

export default SideNavFooter;