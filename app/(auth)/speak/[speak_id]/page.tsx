"use client";
import { Pronounciation } from "@/components/speak/Pronounciation";
// import { useRouter } from 'next/router'
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function SpeakDetailsPage(){
  const params = useParams();
  return <Pronounciation lessonId={params?.speak_id} />;
};


