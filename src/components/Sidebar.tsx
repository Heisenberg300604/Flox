import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Link2 } from "lucide-react"
import { getUserByClerkId } from "@/actions/user.action";

async function Sidebar() {
    const authUser = await currentUser();
    if(!authUser) return <UnAuthenticatedSidebar/>

    const user = await getUserByClerkId(authUser.id);
    console.log({user}); 
    console.log("user loaded")
    if(!user) return null;
  return (
    <Card className="bg-card border border-zinc-800 rounded-lg shadow-lg">
  <CardContent className="pt-6">
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24 border-2 border-zinc-700">
        <AvatarImage src={user.image || ''} alt={user.name || ''} />
        <AvatarFallback className="bg-zinc-700 text-white">
          {user.name}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
        <p className="text-sm text-zinc-400">@{user.username}</p>
        <p className="text-sm text-zinc-300">{user.bio}</p>
      </div>
      <div className="w-full border-t border-zinc-700 my-2"></div> {/* Line after bio */}
      <div className="flex w-full justify-center gap-8">
        <div className="text-center">
          <p className="font-medium text-white">{user._count.following}</p>
          <p className="text-sm text-zinc-400">Following</p>
        </div>
        <div className="w-px h-12"></div> {/* Vertical line between followers and following */}
        <div className="text-center">
          <p className="font-medium text-white">{user._count.followers}</p>
          <p className="text-sm text-zinc-400">Followers</p>
        </div>
      </div>
      <div className="w-full border-t border-zinc-700 my-2"></div> {/* Line after followers/following */}
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link2 className="h-4 w-4 text-zinc-400" />
          <a
            href={user.website || "My website"}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website ? new URL(user.website).hostname : "No website"}
          </a>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
  )
}

export default Sidebar


const UnAuthenticatedSidebar = () => (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Login to access your profile and connect with others.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full" variant="outline">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full mt-3" variant="default">
              Sign Up
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );