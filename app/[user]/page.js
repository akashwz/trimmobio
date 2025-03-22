import API from "@/api";
import User from "@/components/UserProfileComponent/UserProfileComponent";

export async function generateMetadata({ params }) {
  // const { user } = await params; // No need to await params
  // const bioData = await fetchBioData(user);
  // const account = {
  //   Creator: {
  //     title: `Follow ${bioData?.name} – All My Links | Trimmo.bio`,
  //     description: `Stay connected with ${bioData?.name}. Discover my latest content, social media, and collaborations—all in one link-in-bio with Trimmo.bio.`,
  //   },
  //   Business: {
  //     title: `${bioData?.name} – Your One Link for Everything | Trimmo.bio`,
  //     description: `Make it easy for customers to find your website, products, and offers. One simple link-in-bio with Trimmo.bio keeps everything in one place.`,
  //   },
  //   Musician: {
  //     title: `Listen to ${bioData?.name} – Stream & Connect | Trimmo.bio`,
  //     description: `Find all my latest music, streaming links, tour dates, and social media in one place. The easiest way to stay connected—Trimmo.bio.`,
  //   },
  //   "Real estate": {
  //     title: `${bioData?.name} – Properties & Listings | Trimmo.bio`,
  //     description: `Discover homes, real estate listings, and services in one place. Connect with ${bioData?.name} easily through my Trimmo.bio link.`,
  //   },
  //   Personal: {
  //     title: `${bioData?.name}’s Link-in-Bio | Trimmo.bio`,
  //     description: `All my important links in one place. Connect, share, and explore everything about ${bioData?.name} with a single link—Trimmo.bio.`,
  //   },
  //   Other: {
  //     title: `${bioData?.name}’s Link-in-Bio | Trimmo.bio`,
  //     description: `Discover everything that matters to ${bioData?.name}. Whether it’s personal interests, projects, or unique links, find it all in one place with Trimmo.bio.`,
  //   },
  // };
  // const articleUrl = `https://trimmo.bio/${bioData?.username}`;
  // return (
  //   bioData && {
  //     metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL), // Fixes metadataBase error
  //     title: account[bioData?.designation].title,
  //     description: account[bioData?.designation].description,
  //     alternates: {
  //       canonical: articleUrl, // Canonical URL added here
  //     },
  //     openGraph: {
  //       title: account[bioData?.designation].title,
  //       description: account[bioData?.designation].description,
  //       url: articleUrl,
  //       type: "profile",
  //       images: [
  //         {
  //           url:
  //             bioData?.og_image ||
  //             (bioData?.select_profile === "profile"
  //               ? bioData?.profile_picture
  //               : bioData?.avatar_profile) ||
  //             "/default-og-image.png",
  //           width: 1200,
  //           height: 630,
  //           alt: "Profile Image",
  //         },
  //       ],
  //     },
  //     twitter: {
  //       card: "summary_large_image",
  //       title: account[bioData?.designation].title,
  //       description: account[bioData?.designation].description,
  //       images: [
  //         bioData?.og_image ||
  //           (bioData?.select_profile === "profile"
  //             ? bioData?.profile_picture
  //             : bioData?.avatar_profile) ||
  //           "/default-og-image.png",
  //       ],
  //     },
  //   }
  // );
}

// async function fetchBioData(username) {
//   try {
//     const res = await API({
//       url: `${process.env.NEXT_PUBLIC_API_URL}bio/${username}`,
//       method: "get",
//     });
//     return res.data.data;
//   } catch (error) {
//     console.error("Error fetching bio data:", error);
//     return {};
//   }
// }

export default function UserProfilePage({ params }) {
  return <User params={params} />;
}
