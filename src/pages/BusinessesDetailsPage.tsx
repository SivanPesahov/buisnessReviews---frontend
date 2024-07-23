import { Heart, Pencil, Star, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api.service";
import { User } from "../components/AuthProvider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IReviews {
  stars: number;
  _id: string;
  content: string;
  business: string;
  user: string;
  likes: string[];
}

interface IBusiness {
  _id: string;
  name: string;
  description: string;
  stars: number[];
  imageUrl: string;
}

function BusinessesDetailsPage() {
  const { businessesId } = useParams<{ businessesId: string }>();
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [editSelectedStars, setEditSelectedStars] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const editMessage = useRef<HTMLTextAreaElement>(null);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    async function getBusinessAndReviews() {
      try {
        const [businessResponse, reviewsResponse] = await Promise.all([
          api.get(`/Business/${businessesId}`),
          api.get(`/Reviews/${businessesId}`),
        ]);

        setBusiness(businessResponse.data);
        setReviews(reviewsResponse.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    }

    getBusinessAndReviews();
  }, [businessesId, reviews]);

  function returnIfLiked(review: IReviews) {
    console.log(review.likes.includes(loggedInUser?._id as string));
  }

  const handleMouseEnter = (index: number) => {
    setHoveredStars(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const handleClickEditStars = (index: number) => {
    setEditSelectedStars(index + 1);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/Reviews/create", {
        content: message,
        business: businessesId,
        stars: selectedStars,
      });
      // Clear the form
      setMessage("");
      setSelectedStars(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleLike = useCallback(
    async (review: IReviews, loggedInUser: User) => {
      const userId = loggedInUser._id as string;
      const hasLiked = review.likes.includes(userId);

      try {
        if (hasLiked) {
          await api.patch(`/Reviews/unLike/${review._id}`);
          setReviews((prevReviews) =>
            prevReviews.map((r) =>
              r._id === review._id
                ? { ...r, likes: r.likes.filter((like) => like !== userId) }
                : r
            )
          );
        } else {
          await api.patch(`/Reviews/like/${review._id}`);
          setReviews((prevReviews) =>
            prevReviews.map((r) =>
              r._id === review._id ? { ...r, likes: [...r.likes, userId] } : r
            )
          );
        }
      } catch (error: any) {
        console.error("Error handling like:", error.message);
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: string) => {
    try {
      await api.delete(`/Reviews/${id}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const handleEdit = useCallback(
    async (id: string) => {
      try {
        await api.patch(`/Reviews/${id}`, {
          content: editMessage.current?.value,
          stars: editSelectedStars,
        });
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === id
              ? {
                  ...review,
                  content: editMessage.current?.value || review.content,
                  stars: editSelectedStars,
                }
              : review
          )
        );
        editMessage.current!.value = "";
        setEditSelectedStars(0);
      } catch (error: any) {
        console.log(error.message);
        if (!editMessage.current?.value) alert("Please enter content");
        if (editSelectedStars === 0) alert("Please enter a rating");
      }
    },
    [editSelectedStars]
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!business)
    return <div className="text-center py-10">Business not found</div>;

  const averageStars =
    business!.stars.reduce((acc, cur) => acc + cur, 0) / business!.stars.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="mb-8">
        <img
          src={business.imageUrl || "https://via.placeholder.com/1200x300"}
          alt={business.name}
          className="w-full h-[300px] object-cover rounded-lg shadow-lg mb-4"
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-300">
            {business.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-400">
            {business.description}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={20}
              color="grey"
              fill={index < averageStars ? "yellow" : ""}
            />
          ))}
        </div>
      </motion.div>

      {loggedInUser ? (
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  color="black"
                  fill={
                    index < (hoveredStars || selectedStars) ? "black" : "white"
                  }
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </CardHeader>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              value={message}
              onChange={handleMessageChange}
            />
            <Button onClick={handleSubmit}>Send message</Button>
          </div>
        </Card>
      ) : null}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400"
      >
        Reviews
      </motion.h2>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 transform hover:scale-105">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={
                        index < review.stars
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end items-center pt-2">
                <div className="flex items-center space-x-1 text-gray-500">
                  <span>{review.likes.length}</span>
                  <Heart
                    size={16}
                    className={
                      review.likes.includes(loggedInUser!._id as string)
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }
                    onClick={() => handleLike(review, loggedInUser as User)}
                  />
                  {review.user === loggedInUser?._id ? (
                    <>
                      <Trash2 onClick={() => handleDelete(review._id)} />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost">
                            <Pencil />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit your review here</DialogTitle>
                          </DialogHeader>
                          <DialogDescription></DialogDescription>

                          <Card>
                            <CardHeader>
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <Star
                                    key={index}
                                    size={20}
                                    color="black"
                                    fill={
                                      index <
                                      (hoveredStars || editSelectedStars)
                                        ? "black"
                                        : "white"
                                    }
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClickEditStars(index)}
                                    style={{ cursor: "pointer" }}
                                  />
                                ))}
                              </div>
                            </CardHeader>
                            <div className="grid w-full gap-2">
                              <Textarea
                                placeholder="Type here."
                                ref={editMessage}
                              />
                            </div>
                          </Card>
                          <Button onClick={() => handleEdit(review._id)}>
                            Save changes
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : null}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BusinessesDetailsPage;
