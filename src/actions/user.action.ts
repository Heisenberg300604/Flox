"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// save users to Database
export async function syncUser() {
    try {
        const {userId} = await auth();
        const user = await currentUser();

        if(!userId || !user) return;

        const existingUser = await prisma.user.findUnique({
            where:{
                clerkId: userId
            }
        })

        if(existingUser) {
            return existingUser;
        };

        const dbUser = await prisma.user.create({
            data:{
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image:user.imageUrl,
            }
        })

        return dbUser;
    } catch (error) {
        console.log("Error in Sync User", error);
    }
}

// get/fetch users from Database

export async function getUserByClerkId(clerkId:string) {
    return prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            _count:{
                select:{
                    followers:true,
                    following:true,
                    posts:true
                },
            },
        },
    });
}

// get userId from Database
export async function getDbUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;
  
    const user = await getUserByClerkId(clerkId);
  
    if (!user) throw new Error("User not found");
  
    return user.id;
  }

// get random users from Database
export async function getRandomUsers() {
    try {
        const userId = await getDbUserId();

        // get 3 random users and exclude ourselves and the users we already follow
        const randomUsers = await prisma.user.findMany({
            take: 3,
            where: {
                AND: [
                    { NOT: { id: userId || undefined } }, // Fix: Ensure valid ID
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followerId: {
                                        equals: userId || undefined, // Fix: Avoid invalid condition
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                _count: {
                    select: {
                        followers: true, // Ensure no syntax issue here
                    },
                },
            },
        });

        return randomUsers;
    } catch (error) {
        console.log("Error in Get Random Users", error);
    }
}

export async function toggleFollow(targetUserId: string) {
    try {
      const userId = await getDbUserId();
  
      if (!userId) return;
  
      if (userId === targetUserId) throw new Error("You cannot follow yourself");
  
      const existingFollow = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
  
      if (existingFollow) {
        // unfollow
        await prisma.follows.delete({
          where: {
            followerId_followingId: {
              followerId: userId,
              followingId: targetUserId,
            },
          },
        });
      } else {
        // follow
        await prisma.$transaction([
          prisma.follows.create({
            data: {
              followerId: userId,
              followingId: targetUserId,
            },
          }),
  
          prisma.notification.create({
            data: {
              type: "FOLLOW",
              userId: targetUserId, // user being followed
              creatorId: userId, // user following
            },
          }),
        ]);
      }
  
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.log("Error in toggleFollow", error);
      return { success: false, error: "Error toggling follow" };
    }
  }