import React from "react";

interface UserAvatarProps {
  name?: string;
  onClick?: () => void;
  size?: string | number;
  className?: string;
  title?: string;
}

const getInitials = (fullName: string = "") => {
  const names = fullName.trim().split(" ");
  const first = names[0]?.charAt(0).toUpperCase();
  const last = names.length > 1 ? names[names.length - 1]?.charAt(0).toUpperCase() : "";
  return first + last;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  name = "",
  onClick = undefined,
  size = "40px",
  className = "",
  title = "",
}) => {
  const initials = getInitials(name);

  const style = {
    width: size,
    height: size,
    fontSize: typeof size === "number" ? `${size / 2.5}px` : `calc(${size} / 2.5)`,
    lineHeight: 1,
    aspectRatio: "1 / 1",
  };

  const baseClasses =
    "rounded-full bg-gray-200 text-[#c09b2d] font-semibold flex items-center justify-center shadow";

  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      title={title || name}
      style={style}
    >
      {initials}
    </Component>
  );
};

export default UserAvatar;
