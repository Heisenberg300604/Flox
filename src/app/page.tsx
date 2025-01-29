import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <SignedOut>
          
            <SignInButton mode="modal">
            <Button >Login  </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </div>
    </>
  );
}
