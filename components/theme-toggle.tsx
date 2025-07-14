'use client'

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import { useStickyState } from '@/hooks/useStickeyState'
import { Volume2Icon, Volume } from 'lucide-react'
import { useTheme } from 'next-themes'
import useSound from 'use-sound'
import Image from 'next/image'

export const ThemeToggle = () => {
	// need to work on mute and unmute button.
	const [playing, setIsPlaying] = useStickyState(true, 'play')
	const { setTheme, theme } = useTheme();

	const [playOn] = useSound('/light-toggle-sound.m4a', {
		volume: 0.25,
	});
	const [playOff] = useSound('/dark-toggle-sound.m4a', {
		volume: 0.25,
	});

	return (
		<DropdownMenu>
			<div className="flex items-center gap-4">
				<button>
					{playing ? (
						<Volume2Icon size={18} color="white" />
					) : (
						<Volume size={18} color="white" />
					)}
				</button>

				<DropdownMenuTrigger className="flex items-center gap-2 rounded-md">
					<Image src="/logo-dark.svg" height={18} width={18} alt="theme-logo" className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
					<Image src="/logo-light.svg" height={18} width={18} alt="theme-logo" className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100 " />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-zinc-300/10 border-none rounded-xs backdrop-blur-none mr-4">
					<DropdownMenuItem className="p-1 focus:bg-transparent relative"
						onClick={() => {
							theme === "light" ? (setTheme("dark"), playOff()) : (setTheme("light"), playOn())
						}}
					>
						<Image
							src="https://res.cloudinary.com/dtxxjwdml/image/upload/v1752250594/xms1h28owres0lmmiltw.jpg"
							className="hover:border-2 border-dotted scale-100 rotate-0 transition-all dark:scale-0"
							width={200}
							height={200}
							alt="background picture"
						/>

						<Image
							src="https://res.cloudinary.com/dtxxjwdml/image/upload/v1752248821/zgh21c1dp0wcbzgsuiyx.jpg"
							className="hover:border-2 border-dotted absolute scale-0 transition-all dark:scale-100"
							width={200}
							height={200}
							alt="background picture"
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</div>
		</DropdownMenu>
	)
}
