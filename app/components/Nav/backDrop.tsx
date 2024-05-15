interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        z-20
        bg-slate-200
        opacity-50
        fixed
        top-0
        left-0
        w-screen
        h-screen
     "
    ></div>
  );
};

export default BackDrop;
