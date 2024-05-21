import Image from "next/legacy/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    );
  } else {
    return <FaUserCircle size={30} />;
  }
};

export default Avatar;
