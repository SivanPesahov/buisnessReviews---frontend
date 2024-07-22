import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api.service";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IBusiness {
  _id: string;
  name: string;
  description: string;
  stars:number[]
}

function BusinessesPage() {
  const [businesses, setBusinesses] = useState<IBusiness[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getBusinesses() {
      try {
        const response = await api.get("/Business/businesses");
        setBusinesses(response.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    }
    getBusinesses();
  }, []);

  return (
    <ul>
      {businesses.map((business: IBusiness) => {
        return (
          
          <Card className="w-[350px]" >
            <Link to={`/businesses/${business._id}`}>
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.description}</CardDescription>
            </CardHeader>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                key={index}
                size={20}
                color="black" 
                fill={index < (business.stars.reduce((acc:number, cur) => acc + cur, 0) / business.stars.length)-1 ? 'black' : 'white'}
              />
              
              ))}
            </div>
          </Link>
          </Card>
        );
      })}
    </ul>
  );
}

export default BusinessesPage;
