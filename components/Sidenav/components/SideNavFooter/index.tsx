// natives components
import Image from 'next/image';

const SideNavFooter: React.FC = () => {
    return (
        <footer className="p-4">
            <div className="flex items-center justify-center pb-8 space-x-3">
                <Image 
                    src="/assets/senac_logo.png" 
                    alt="Logo do Senac" 
                    width={100} 
                    height={100} 
                    className="w-16 h-16 md:w-24 md:h-24" /* Tamanho ajustado para telas menores */
                />
            </div>
        </footer>
    );
};

export default SideNavFooter;
