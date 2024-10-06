// natives components
import Image from 'next/image';

const SideNavFooter: React.FC = () => {
    return (
        <footer className="p-4">
            <div className="flex items-center justify-center pb-8 space-x-3">
                <Image src="/assets/senac_logo.png" alt="Logo do Senac" width={100} height={100} className="w-20 h-20 md:w-32 md:h-32" />
            </div>
        </footer>
    );
}

export default SideNavFooter;
