"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SiNextdotjs, SiNotion } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const warningMessage =
  "You’re on the waitlist!\n We couldn’t send a confirmation email yet.\nTry using ankitmukhia157@gmail.com for testing.";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      const notionRes = await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!notionRes.ok) {
        throw new Error("Something went wrong with Notion.");
      }

      const mailRes = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!mailRes.ok) {
        if (mailRes.status === 429) {
          throw new Error("Rate limited");
        }

        const data = await mailRes.json();
        if (data?.error) {
          toast.warning(warningMessage);
          return;
        }
        throw new Error("Something went wrong with sending the email.");
      }

      setEmail("");
      toast.success("You've been added to the waitlist!");
    } catch (err) {
      err instanceof Error ? toast.error(err.message) : "Something went wrong.";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto items-center justify-center">
      <div className="mt-10 space-y-6">
        <h1 className="text-6xl text-center text-white font-medium font-serif leading-none tracking-normal">
          <span className="text-black/60 dark:text-orange-500">Launch </span>
          great ideas, right <br /> from this
          <span className="text-black/60 dark:text-orange-500"> template</span>.
        </h1>

        <p className="text-[16px] text-center max-w-xl font-light tracking-wider text-gray-200">
          A simple, elegant waitlist template powered by{" "}
          <span className="inline-flex items-baseline">
            <Link
              href="https://nextjs.org"
              target="_blank"
              className="hover:text-orange-300"
            >
              <SiNextdotjs size="16" />
            </Link>
          </span>{" "}
          and{" "}
          <span className="inline-flex items-baseline">
            <Link
              href="https://notion.com"
              target="_blank"
              className="hover:text-orange-300"
            >
              <SiNotion size="16" />
            </Link>
          </span>
          . Start collecting signups and grow your audience in minutes.
        </p>

        {/* still need to do some work, color fix, more detailed focus button work. */}
        <form onSubmit={handleSubmit}>
          <div className="pt-6 flex gap-2 max-w-lg mx-auto">
            <Input
              value={email}
              placeholder="Your Email"
              className="bg-[#80BDE9] border-2 border-white/50 dark:border-orange-400/20 placeholder:text-white dark:placeholder:text-orange-300/70 text-white dark:text-orange-300/70"
              onChange={handleChange}
            />

            <Button
              type="submit"
              size="lg"
              variant="orange"
              disabled={isLoading}
            >
              {isLoading ? "Joining the waitlist..." : "Join the waitlist"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
