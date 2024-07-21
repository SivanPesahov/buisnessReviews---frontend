// src/pages/BusinessesDetailsPage.tsx

import Header from "@/components/Header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api.service";
import { Heart, HeartOff, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IReviwes {
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
  stars:Number[]
}

function BusinessesDetailsPage() {
  const { businessesId } = useParams<{ businessesId: string }>();
  const [business, setBusiness] = useState<IBusiness[]>([]);

  const [reviews, setReviews] = useState<IReviwes[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = '669c02b13181b71095591025';

  useEffect(() => {
    async function getReviews() {
      try {
        const businessResponse = await api.get(`/Business/businesses/${businessesId}`);
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
  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  return (
    <>
    <Card className="w-[350px]" >
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.description}</CardDescription>
            </CardHeader>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  color='black'
                  fill={index < 3?'black': 'white'}
                />
              ))}
            </div>
          </Card>
    <ul>
      {reviews.map((review) => (
        <Card key={review._id} className="w-[350px]" id={review._id}>
          <CardHeader>
          <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  color='black'
                  fill={index < review.stars?'black': 'white'}
                />
              ))}
            </div>
            <CardTitle>{review.content}</CardTitle>
            <CardDescription className="flex items-center space-x-1">
              <span>{review.likes.length}</span>
              <Heart size={20}
                color='black'
                fill={review.likes.includes(userId) ? 'black': 'white'}/>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </ul>
      <button>leave a comment</button>
    </>
  );
}

export default BusinessesDetailsPage;
