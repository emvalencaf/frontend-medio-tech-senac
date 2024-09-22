import Image from "next/image";


export interface IAvatarProfile {
    img_path: string;
    name: string;
    userType: string;
}

const AvatarProfile: React.FC<IAvatarProfile> = ({
    img_path,
    name,
    userType,
}) => {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex-col flex text-right">
                <span className="text-gray-800 font-font-bold text-sm ">{name}</span>
                <span className="font-medium text-xs text-gray-500">{userType}</span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                    src={img_path} // Substitua pelo caminho da imagem do avatar
                    alt="Avatar de Perfil"
                    width={60}
                    height={60}
                    className="object-cover" // Para garantir que a imagem cubra totalmente o contêiner
                />
            </div>
        </div>
    );
}

export default AvatarProfile;