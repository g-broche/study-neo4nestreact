import { Link } from "react-router-dom"

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
      </header>
    </>
  )
}

export default PageHeader