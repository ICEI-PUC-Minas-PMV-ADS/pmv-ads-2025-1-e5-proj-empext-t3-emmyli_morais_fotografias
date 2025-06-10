import ReactDOM from "react-dom";

const MenuFlutuante = ({ children, position }) => {
  return ReactDOM.createPortal(
    <div
      className="absolute bg-white border rounded shadow-md z-50"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default MenuFlutuante;
