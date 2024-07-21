import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IBusiness {
  _id: string;
  name: string;
  description: string;
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
          
          <Link to={`/businesses/${business._id}`}>
          <Card className="w-[350px]" >
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.description}</CardDescription>
            </CardHeader>
          </Card>
          </Link>
        );
      })}
    </ul>
  );
}

export default BusinessesPage;
