import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className=" bg-slate-700  text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="font-bold text-base mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Phones</Link>
            <Link href="#">Phones</Link>
            <Link href="#">Phones</Link>
            <Link href="#">Phones</Link>
            <Link href="#">Phones</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-base mb-2">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FaQs</Link>
          </FooterList>
          <div className="w-full  md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold text-base mb-2">About-Us</h3>
            <p className="mb-2">
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, TVs, laptops, watches, and accessories.
            </p>
            <p>&copy; {new Date().getFullYear()} E-Shop All Rights Reserved </p>
          </div>
          <FooterList>
            <h3 className="font-bold text-base mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillLinkedin size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
