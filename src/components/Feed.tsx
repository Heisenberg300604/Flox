// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Heart, MessageCircle, Repeat } from "lucide-react"
// import { currentUser } from "@clerk/nextjs/server"

// const posts = [
//   {
//     id: 1,
//     user: { name: "Alice Johnson", username: "alice", avatar: "/avatar1.jpg" },
//     content: "Just finished a great book! Any recommendations for my next read?",
//     likes: 15,
//     comments: 3,
//     reposts: 2,
//   },
//   {
//     id: 2,
//     user: { name: "Bob Smith", username: "bob", avatar: "/avatar2.jpg" },
//     content: "Excited to announce that I'll be speaking at the upcoming tech conference! #TechTalks2023",
//     likes: 32,
//     comments: 7,
//     reposts: 5,
//   },
//   // Add more sample posts here
// ]

// export default async function Feed() {

//   const user = await currentUser();
//   const posts =await getPosts();
//   return (
//     <div className="space-y-4">
//       {posts.map((post) => (
        
//       ))}
//     </div>
//   )
// }

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"
import PostCard from "./PostCard"
import { getPosts } from "@/actions/post.action"
import { getDbUserId } from "@/actions/user.action";


export default async function Feed() {
  const dbUserId = await getDbUserId();

  const user = await currentUser();
  const posts =await getPosts();
  console.log(posts);
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post ={post} dbUserId={dbUserId} />
      ))}
    </div>
  )
}

