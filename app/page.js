"use client";
import Header from "@/components/lending/Header";
import "./globals.css";
import HeroSection from "@/components/lending/HeroSection";
import Services from "@/components/lending/Services";
import Cms1 from "@/components/lending/Cms1";
import Socialmedia from "@/components/lending/Socialmedia";
import Faqs from "@/components/lending/Faqs";
import ImageSlider from "@/components/lending/ImageSlider";
import Testimonials from "@/components/lending/Testimonials";
import Footer from "@/components/lending/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SocialMediaCms1 from "@/components/lending/SocialMediaCms1";
export default function Home() {
  const router = useRouter();
  // const { userData } = useSelector((state) => state?.authReducer || {});

  // useEffect(() => {
  //   localStorage.removeItem("persist:root");
  // }, []);

  // useEffect(() => {
  //   if (!userData) return;

  //   if (userData.data?.profile) {
  //     router.push("/edit-profile");
  //   } else if (userData.data?.token) {
  //     router.push("/about-yourself");
  //   }
  // }, [userData]);
  return (
    <div className="w-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <Services />
      <Cms1 />
      <Socialmedia />
      <SocialMediaCms1 />
      <Faqs />
      <ImageSlider />
      <Testimonials />
      <Footer />
    </div>
  );
}
