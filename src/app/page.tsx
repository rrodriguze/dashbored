'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {Loader2} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";

export default function Home() {

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      });

      if (response.ok) {
        setIsLoading(false)
        setEmail('')
        toast.success("Added to the waitlist.", { description: "We'll notify you when Dashbored is ready." })
      } else {
        const data = await response.json()
        setIsLoading(false)
        toast.error("Oops!", { description: `Error ${data.error}` })
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("Oops!", { description: "Something went wrong. Please try again."} )
    }
  }

	return (
		<div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
			<main className="flex-grow flex items-center justify-center relative z-20">
				<div className="text-center space-y-4 max-w-2xl mx-auto px-4">
					<div className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-sm font-normal">
						<span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
						Coming Soon
					</div>
					<div className="space-y-4">
						<div className="text-7xl sm:text-8xl font-extrabold tracking-tighter">
							Dash<span className="text-blue-500">bored</span>
						</div>
						<p className="text-lg text-gray-400 tracking-tight max-w-xl mx-auto">
							Simplifying social media management to the point of boredom.<br/>Join the waitlist for early
							access.
						</p>
					</div>
					<form onSubmit={handleSubmit} className="flex space-x-2 max-w-md mx-auto">
						<Input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-white/10 border-white/20 text-white placeholder-gray-400 tracking-tight"
							required
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
							{isLoading ? 'Joining...' : 'Join Waitlist'}
						</Button>
					</form>
				</div>
			</main>

			<Toaster
				theme="dark"
				richColors={true}
			/>

			<footer className="w-full max-2-6xl mx-auto py-4 px-4 text-center relative z-20">
				<p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Dashbored</p>
			</footer>

			<div className="absolute inset-0 z-0">
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"/>
			<div
				className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
			<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
		</div>
		</div>
	);
}
