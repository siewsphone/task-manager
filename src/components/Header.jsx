import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
          <span className="header-logo">✓</span>
          <Link to="/tasks" className="header-title"> <span >Task Manager</span></Link> 
      </div>
    </header>
  );
}
