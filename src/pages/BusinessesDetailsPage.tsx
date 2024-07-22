import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api.service";
import { Heart, Pencil, Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
}

function BusinessesDetailsPage() {
  const { businessesId } = useParams<{ businessesId: string }>();
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = "669e057f20ab374aca10b4f5";

  useEffect(() => {
    async function getReviews() {
      try {
        const businessResponse = await api.get(`/Business/${businessesId}`);
        setBusiness(businessResponse.data);
        const response = await api.get(`/Reviews/${businessesId}`);
        setReviews(response.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [businessesId]);

  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleMouseEnter = (index: number) => {
    setHoveredStars(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(message);
    console.log(selectedStars);
    
    try {
      await api.post("/Reviews", {
        content: message,
        stars: selectedStars,
        business: businessesId,
        user: userId,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  function handleLike(review:IReviews, userId: string) {
   console.log(review.likes.includes(userId)?'dislike' : 'like');
  }
  function handleDelete(id:string) {
    // delete by id
  }
  function handleEdit(review:IReviews) {
    // edit review
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const averageStars = business!.stars.reduce((acc, cur) => acc + cur, 0) / business!.stars.length;

  return (
    <>
      {/* Business details */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{business!.name}</CardTitle>
          <CardDescription>{business!.description}</CardDescription>
        </CardHeader>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={20}
              color="black"
              fill={index < averageStars ? 'black' : 'white'}
            />
          ))}
        </div>
      </Card>

      {/* Leave comment */}
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={20}
                color="black"
                fill={index < (hoveredStars || selectedStars) ? "black" : "white"}
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

      {/* Comments list */}
      <ul>
        {reviews.map((review) => (
          <Card key={review._id} className="w-[350px]" id={review._id}>
            <CardHeader>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={20}
                    color="black"
                    fill={index < review.stars ? "black" : "white"}
                  />
                ))}
              </div>
              <CardTitle>{review.content}</CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <span>{review.likes.length}</span>
                <Heart
                  size={20}
                  color="black"
                  fill={review.likes.includes(userId) ? "black" : "white"}
                  onClick={()=>handleLike(review,userId)}
                />
                {review.user==userId?<><Pencil onClick={()=>handleEdit(review)} /> <Trash2 onClick={()=>handleDelete(review._id)}/></>:<></>}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </ul>
    </>
  );
}

export default BusinessesDetailsPage;
