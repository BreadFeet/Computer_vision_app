import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-10 py-5 px-3 bg-white font-bold">
        <li>
          <Link href="/computer-vision">
            <p className="text-black/80"> Computer Vision </p>
          </Link>
        </li>
        <li>
          <Link href="/stable-diffusion">
            <p className="text-black/80"> Stable Diffusion </p>
          </Link>
        </li>
        <li>
         <Link href="/text-generation">
           <p className="text-black/80"> Text Generation </p>
         </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;