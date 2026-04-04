interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-neutral-100 transition ${className}`}
    >
      {children}
    </div>
  );
};

export default MenuItem;
