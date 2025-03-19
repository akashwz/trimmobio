import API from "@/api";
import CollectionPageComponent from "@/components/CollectionPageComponent/CollectionPageComponent";

export async function generateMetadata({ params }) {
  const { slug } = await params; // No need for `await` here, params is already available
  const collectionData = await fetchData(slug);
  const articleUrl = `${process.env.NEXT_PUBLIC_APP_URL}/help/collection/${collectionData?.slug_name}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL), // Fixes metadataBase error
    title: collectionData?.meta_title,
    description: collectionData?.meta_description || "Check out this amazing user profile on our platform.",
    alternates: {
      canonical: articleUrl, // Canonical URL added here
    },
    openGraph: {
      title: collectionData?.meta_title,
      description: collectionData?.meta_description || "Check out this amazing user profile on our platform.",
      url: articleUrl,
      type: "profile",
      images: [
        {
          url: "/default-og-image.png",
          width: 1200,
          height: 630,
          alt: "Profile Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: collectionData?.meta_title,
      description: collectionData?.meta_description || "Check out this amazing user profile on our platform.",
      images: ["/default-og-image.png"],
    },
  };
}

const fetchData = async (slug) => {
  try {
    const response = await API({ url: `help-category/${slug}`, method: "get" });
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching bio data:", error);
    return {};
  }
};

export default function CollectionPage({ params }) {
  return <CollectionPageComponent params={params} />;
}
