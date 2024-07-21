import api from "@/services/api.service";
import React, { useEffect, useState } from "react";

interface IBusiness {
  _id: string;
  title: string;
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
          <li key={business._id}>
            {business.title} - {business.description}
          </li>
        );
      })}
    </ul>
  );
}

export default BusinessesPage;
