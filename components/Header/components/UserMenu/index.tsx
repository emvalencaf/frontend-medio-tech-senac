"use client";

import { userMenuButtons } from "../../../../constants/userMenu";
import AvatarProfile from "../AvatarProfile";
import UserMenuButton from "../UserButton";

/*
    React.Node para enviar ao Bell caso tenha novas notificações:

    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>

*/

const UserMenu: React.FC = () => {
    return (
        <div className="flex items-center space-x-6">

            {
             userMenuButtons.map((btn) => <UserMenuButton key={btn.label} {...btn} />)   
            }
            <AvatarProfile
                img_path="/assets/avatar.png"
                name="João Campos"
                userType="Prefeito de Luiz Paulo & Iago"
            />
        </div>
    );
}

export default UserMenu;