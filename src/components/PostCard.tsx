import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat } from "lucide-react"

function PostCard({post}:{post:any}) {
  return (
    <Card key={post.id} className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">@{post.author.username}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              {post._count?.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {post._count?.comments}
            </Button>
            <Button variant="ghost" size="sm">
            </Button>
          </CardFooter>
        </Card>
  )
}

export default PostCard