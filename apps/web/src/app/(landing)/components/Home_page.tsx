import Image from "next/image";
import Nav_Home from "./Nav_Home";

export default function Home_page() {
  return (
    
    <div className="w-4/5 mx-auto h-[calc(100vh-6.5rem)] justify-between flex flex-col items-center text-white text-center">
      {/* <Nav_Home/> */}
      <Image
        alt="Image Not Found"
        src={"/img/bgimage.webp"}
        className="-z-30 absolute"
        fill
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <h1 className="mx-auto text-4xl font-bold text-center py-5">
          Experience the power of <br />
          smart scheduling 
        </h1>
        <p className="text-lg">
          TEEM is your one-stop place for smoother collaborations,
          <br /> fewer headaches, and more meaningful outcomes.
        </p>
      </div>
    </div>
  );
}
