"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useSoundContext } from "@/contexts/useSoundContext";
import { VolumeXIcon, Volume2Icon } from "lucide-react";
import { SiNotion } from "@icons-pack/react-simple-icons";
import { useTheme } from "next-themes";
import useSound from "use-sound";
import Image from "next/image";
import Link from "next/link";

export const ThemeToggle = () => {
  const { isMuted, toggleSound } = useSoundContext();
  const { setTheme, theme } = useTheme();

  const [playOn] = useSound("/light-toggle-sound.m4a", {
    volume: isMuted ? 0.25 : 0,
  });
  const [playOff] = useSound("/dark-toggle-sound.m4a", {
    volume: isMuted ? 0.25 : 0,
  });

  return (
    <DropdownMenu>
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <Link
          href={
            "https://www.notion.so/28adc97d42ca8026b941e16f790d471a?v=28adc97d42ca80b2b701000c3bd4f7cf&source=copy_link"
          }
          target="_blank"
          className="flex text-white hover:text-orange-400 cursor-pointer items-center gap-2"
        >
          <SiNotion size={16} />
          View Demo
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            className="outline-none hover:outline-none focus:outline-none ring-0 hover:ring-0 focus:ring-0"
          >
            {isMuted ? (
              <Volume2Icon size={20} color="white" />
            ) : (
              <VolumeXIcon size={20} color="white" />
            )}
          </button>

          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md">
            <Image
              src="/logo-dark.svg"
              height={18}
              width={18}
              alt="theme-logo"
              className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0"
            />
            <Image
              src="/logo-light.svg"
              height={18}
              width={18}
              alt="theme-logo"
              className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100 "
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-300/10 border-none rounded-xs backdrop-blur-none mr-4">
            <DropdownMenuItem
              className="p-1 focus:bg-transparent relative"
              onClick={() => {
                theme === "light"
                  ? (setTheme("dark"), playOff())
                  : (setTheme("light"), playOn());
              }}
            >
              <Image
                src="https://res.cloudinary.com/dtxxjwdml/image/upload/v1752250594/xms1h28owres0lmmiltw.jpg"
                className="scale-100 rotate-0 transition-all dark:scale-0"
                width={200}
                height={200}
                alt="background picture"
              />

              <Image
                src="https://res.cloudinary.com/dtxxjwdml/image/upload/v1752248821/zgh21c1dp0wcbzgsuiyx.jpg"
                className="absolute scale-0 transition-all dark:scale-100"
                width={200}
                height={200}
                alt="background picture"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </div>
    </DropdownMenu>
  );
};
