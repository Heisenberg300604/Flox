import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Home, Mail, LogIn } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
    const user = await currentUser();
    if(user) await syncUser(); // Post request
    console.log(user);
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Flox</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </>
          )}
          <SignedOut>
            <SignInButton mode="modal">
            <Button variant="default">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar;