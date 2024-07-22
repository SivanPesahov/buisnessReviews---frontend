import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to SHOWBIZ</h1>
          <p className="mb-8">
            Discover top-rated businesses in your area. Read reviews, compare
            ratings, and find the best services to meet your needs.
          </p>
          {/* <Button
            className=" px-6 py-3 rounded-md  transition duration-300"
            onClick={() => console.log('Get Started clicked!')}
          >
            Get Started
          </Button> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Business Listings</h3>
              <p>
                Browse through an extensive list of businesses across various
                categories.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>
              <p>
                Read genuine reviews and ratings from other users to help you
                make informed decisions.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Easy Search</h3>
              <p>
                Find businesses quickly with our advanced search and filter
                options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center ">
            User Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md dark:bg-white/5">
              <p className="mb-4 ">
                "SHOWBIZ helped me find the best coffee shop in town. The
                reviews were spot on!"
              </p>
              <h3 className="text-lg font-bold">- Jane Doe</h3>
            </div>
            <div className="p-6 rounded-lg shadow-md dark:bg-white/5">
              <p className="mb-4">
                "Thanks to SHOWBIZ, I found a reliable plumber within minutes."
              </p>
              <h3 className="text-lg font-bold">- John Smith</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center dark:bg-white/5">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Top Businesses?
          </h2>
          <p className="mb-8">
            Sign up today and start exploring the best businesses in your area.
          </p>
          <Link className="underline font-bold" to="/auth/register">
            <Button className="  px-6 py-3 rounded-md  transition duration-300">
              Sign Up
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
