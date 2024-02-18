"use client";

import { Session } from "next-auth";
import Image from "next/image";
import avatar from "../../public/avatar.png"
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
    session: Session | null;
}

export default function UserMenuButton({session}: UserMenuButtonProps){
   
    const user = session?.user;

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle" >
                {user ? 
                (
                    <Image src={user.image || avatar} width={40} height={40} className="w-10 rounded-full" alt="profile" />
                )
                : 
                (
                    <Image src={avatar} width={40} height={40} className="w-10 rounded-full" alt="avatar" />
                )
            
            }
            </label>
            <ul tabIndex={0} className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-neutral p-2 shadow">
                 <li>
                    {user ? 
                    (<button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button> )
                    :
                    (<button onClick={() => signIn()}>Sign In</button>)}
                 </li>
            </ul>
        </div>
    )

}