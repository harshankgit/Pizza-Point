import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 4 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center text-center">
        <Image
          src="https://e7.pngegg.com/pngimages/431/572/png-clipart-check-mark-checkbox-computer-icons-3d-computer-graphics-others-blue-angle.png"
          alt="Success Icon"
          width={150}
          height={150}
          className="mb-6 animate-bounce"
        />
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for your purchase. Redirecting to the homepage...
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Success;
