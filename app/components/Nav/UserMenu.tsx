"use client";
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./backDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
            p-2
            border-[1px]
            rounded-full
            border-slate-400
            flex
            items-center
            flex-grow
            gap-1
            cursor-pointer
            hover:shadow-md
            transition
            text-slate-700
      "
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            onClick={toggleOpen}
            className="
          absolute
          rounded-md
          shadow-md
          w-[170px]
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
          flex
          flex-col
          cursor-pointer
         "
          >
            {currentUser ? (
              <>
                <div>
                  <Link href="/orders" className="">
                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                  </Link>
                  <Link href="/admin" className="">
                    <MenuItem onClick={toggleOpen}>Admin Dashbord</MenuItem>
                  </Link>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </div>
              </>
            ) : (
              <div>
                <Link href="/login" className="">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register" className="">
                  <MenuItem onClick={toggleOpen}>Register </MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
