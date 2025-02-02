"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Loader2, Send } from "lucide-react"
import { createPost } from "@/actions/post.action"
import toast from "react-hot-toast"
// import ImageUpload from "./ImageUpload"

export function CreatePost() {
  const { user } = useUser()
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return

    setIsPosting(true);
    try {
      // Simulating post creation
      const result = await createPost(content, imageUrl);
      if (result.success) {
        // Reset the form
        setContent("")
        setImageUrl("")
        setShowImageUpload(false)
      }
        toast.success("Post created successfully");
    } catch (error) {
      console.error("Failed to create post:", error)
      // You can add an error toast notification here
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Card className="mb-4 bg-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} alt={user?.username || "User"} />
            </Avatar>
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-none p-0 text-base focus-visible:ring-0"
              disabled={isPosting}
            />
          </div>

          {/* TO DO - Show Image preview */}

          {/* {(showImageUpload || imageUrl) && (
            <div className="rounded-lg border p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url)
                  if (!url) setShowImageUpload(false)
                }}
              />
            </div>
          )} */}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

