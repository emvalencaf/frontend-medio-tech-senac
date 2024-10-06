"use client";

import { useSession } from "next-auth/react";
import { userMenuButtons } from "../../../../constants/userMenu";
import AvatarProfile from "../AvatarProfile";
import UserMenuButton from "../UserButton";
import { extractUserTypeFromBackEndToken } from "../../../../utils";
import { userTypes } from "../../../../constants/userType";
import { FaSignOutAlt } from "react-icons/fa";
import { handleSignOut } from "../../../../actions/auth";

/*
    React.Node para enviar ao Bell caso tenha novas notificações:

    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>

*/

export interface IUserMenu {
    actionSignOut: () => Promise<void>;
}

const UserMenu: React.FC<IUserMenu> = ({ actionSignOut }) => {
    const { data } = useSession();

    const name = String(data?.user?.name);
    const userType: 'TEACHER' | 'COORDINATOR' | 'STUDENT' = extractUserTypeFromBackEndToken(String(data?.backendToken));
    
    return (
        <div className="flex items-center space-x-6">

            {
             userMenuButtons.map((btn) => <UserMenuButton key={btn.label} {...btn} />)   
            }
            <UserMenuButton
                Icon={FaSignOutAlt}
                label="Sair"
                onClick={() => actionSignOut()}
            />
            <AvatarProfile
                img_path="/assets/avatar.png"
                name={name}
                userType={userTypes[userType]}
            />
        </div>
    );
}

export default UserMenu;