export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_URL
    : "http://localhost:1000/";

// export const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://pizzapoints-3of3x99cm-harshanks-projects-1b7c664f.vercel.app/"
//     : "http://localhost:1000/";
