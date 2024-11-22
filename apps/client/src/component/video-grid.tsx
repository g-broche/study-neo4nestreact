import { VideoDTO } from "../interface/dataTransfertObject";

function VideoGrid({ videos }: { videos: VideoDTO[] }) {
  return (
    <>
      <table className="video-index">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Date</th>
            <th>Links</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
            <tr>
              <td className="thumbnail-cell">
                <img 
                  src={video.hosts![0].thumbnail}
                  alt={`thumbnail ${video.type!.label} ${video.hosts![0].date}`} 
                />
              </td>
              <td>{video.title}</td>
              <td>{video.hosts![0].date}</td>
              <td className="url-cell list-cell">
                <ul className="column-list">
                  {video.hosts!.map(host => (
                    <li>{host.url}</li>
                  ))}
                </ul>
              </td>
              <td className="category-cell list-cell">
                <ul className="row-list">
                  {video.categories!.map(category => (
                    <li>{category.label}</li>
                  ))}
                </ul>
              </td>
              <td className="tag-cell list-cell">
                <ul className="row-list">
                  {video.tags!.map(tag => (
                    <li>{tag.label}</li>
                  ))}
                </ul>
              </td>
              <td>{video.type!.label}</td>
              <td className="action-cell list-cell">
                <ul className="row-list column-list">
                  <li>
                    <button className="edit">edit(todo)</button>
                  </li>
                  <li>
                    <button className="delete">delete(todo)</button>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default VideoGrid;