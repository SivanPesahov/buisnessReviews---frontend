import Header from "@/components/Header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api.service";
import { Heart, HeartOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IReviwes {
  stars:number
  _id: string;
  content: string;
  business: string;
  user: string;
  likes:string[]
}
function BusinessesDetailsPage() {
  const {businessesId} = useParams();
  const [reviews, setReviews] = useState<IReviwes[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId='669c02b03181b7109559101a'
  useEffect(() => {
    async function getBusinesses() {
      try {
        console.log(businessesId);
        
        const response = await api.get(`/Reviews/${businessesId}`);
        setReviews(response.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    }
    getBusinesses();
  }, []);
  console.log(reviews);
  
  return  (
    <ul>
    {reviews.map((reviews: IReviwes) => {
    return (
      <Card className="w-[350px]" id={reviews._id}>
        <CardHeader>
          <CardTitle>{reviews.content}</CardTitle>
          <CardDescription className="flex">{reviews.likes.length}
            {reviews.user==userId?
            <Heart />:
            <HeartOff />}
            </CardDescription>
        </CardHeader>
      </Card>
    );
    })}
  </ul>
)}

export default BusinessesDetailsPage;
