import { Link } from "react-router-dom";

const Container = ({ children, className }) => {
  return <nav className={`${className}`}>{children}</nav>;
};

const Content = ({ children, className }) => {
  return <div className={`flex justify-between ${className}`}>{children}</div>;
};

const Logo = ({ title, src, alt, href }) => {
  return (
    <>
      <div>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <Link to={href} className="text-lg font-bold">
            {title}
          </Link>
        )}
      </div>
    </>
  );
};

const ItemGroup = ({ children, className }) => {
  return <ul className={`${className}`}>{children}</ul>;
};

const Item = ({ text, href }) => {
  return (
    <li className="flex items-center justify-center">
      <Link
        to={href}
        className="hover:text-link block cursor-pointer hover:underline"
      >
        {text}
      </Link>
    </li>
  );
};

const LinkIconGroup = ({ children }) => {
  return <ul className="flex">{children}</ul>;
};

const LinkIcon = ({ src, alt, onClick }) => {
  return <div></div>;
};

const Navbar = {
  Container,
  Content,
  Logo,
  ItemGroup,
  Item,
  LinkIconGroup,
  LinkIcon,
};

export default Navbar;
