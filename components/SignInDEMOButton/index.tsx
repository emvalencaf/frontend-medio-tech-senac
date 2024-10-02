import { IconType } from "react-icons";
import { CredentialSignInParams } from "../../actions/auth/schemas";
import toast from "react-hot-toast";
import { userTypes } from "../../constants/userType";

export interface ISignInDEMOButton {
    Icon: IconType;
    handleSignIn: (credentials: CredentialSignInParams) => void;
    email: string;
    password: string;
    userType: 'TEACHER' | 'STUDENT' | 'COORDINATOR';
}

const SignInDEMOButton: React.FC<ISignInDEMOButton> = ({ Icon, handleSignIn, email, password, userType }) => {

    const handleClick = async () => {

        await handleSignIn({
            email,
            password
        });

        toast.success("Bem-vindo de volta!")
    };

    return (
        <button
            onClick={handleClick}
            className="border-2 p-2 flex gap-1.5 justify-center items-center rounded-md bg-purple-700"
        >
            <span className="text-white">
                Entrar com credenciais do {userTypes[userType]}
            </span>
            <Icon
                className="text-xl text-white"
            />
        </button>
    );
}

export default SignInDEMOButton;