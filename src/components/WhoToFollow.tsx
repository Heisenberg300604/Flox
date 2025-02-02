
import { getRandomUsers } from "@/actions/user.action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FollowButton from "./FollowButton";


async function WhoToFollow() {
    const users = await getRandomUsers();

    if (users?.length === 0) {
        return null;
    }
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(users ?? []).map((user) => (
          <div key={user.username} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.image ?? "/avatar.png"} alt={user.username} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <FollowButton userId ={user.id} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default WhoToFollow