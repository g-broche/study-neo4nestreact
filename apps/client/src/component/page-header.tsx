import { Link } from "react-router-dom"
import ConnectionMenu from "./connection-menu"

function PageHeader(){
  return (
    <>
      <header id="page-header">
        <nav>
          <ul>
            <li>
              <Link to="/" className="button">Home</Link>
            </li>
            <li>
              <Link to="/videos" className="button">Videos</Link>
            </li>
          </ul>
        </nav>
        <section id="connection-pannel">
          <ConnectionMenu />
        </section>
      </header>
    </>
  )
}

export default PageHeader