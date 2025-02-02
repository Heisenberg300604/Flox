"use client";

import React from 'react'
import { Button } from './ui/button'
import { Loader2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { toggleFollow } from '@/actions/user.action';

function FollowButton({userId}:{userId:string}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleFollow = async () => {
        setIsLoading(true);
        try {
            await toggleFollow(userId);
            toast.success("User Followed");
        } catch (error) {
          console.log("Error in Follow Button", error);  
        }finally{
            setIsLoading(false);
        }
    };
    return (
        <>
            <Button variant="outline" size="sm"
            disabled={isLoading}
            onClick={handleFollow}>
                {isLoading ? <Loader2Icon/> : "Follow"}
            </Button>
        </>
    )
}

export default FollowButton