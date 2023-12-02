"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
export default function NavLink() {
  const router = useParams();
  const { id } = router;

  return (
    <>
      <Link href={`/workspace/${id}/stream`}>Stream</Link>
      <Link href={`/workspace/${id}/upcoming`}>Upcoming</Link>
      <Link href={`/workspace/${id}/people`}>People</Link>
      <Link href={`/workspace/${id}/work`}>Your work</Link>
    </>
  );
}
