import { VideoDTO } from "../interface/dataTransfertObject";

function VideoGrid({ videos }: { videos: VideoDTO[] }) {
  return (
    <>
      <table className="video-index">
        <thead>
          <tr>
            <th>id</th>
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
              <td>{video.id}</td>
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
                    <li key={`${video.title}-${host.name}`}>{host.url}</li>
                  ))}
                </ul>
              </td>
              <td className="category-cell list-cell">
                <ul className="row-list">
                  {video.categories!.map(category => (
                    <li key={`${video.title}-${category.label}`}>{category.label}</li>
                  ))}
                </ul>
              </td>
              <td className="tag-cell list-cell">
                <ul className="row-list">
                  {video.tags!.map(tag => (
                    <li key={`${video.title}-${tag.label}`}>{tag.label}</li>
                  ))}
                </ul>
              </td>
              <td>{video.type!.label}</td>
              <td className="action-cell list-cell">
                <ul className="row-list column-list">
                  <li>
                    <button className="background-neutral">edit(todo)</button>
                  </li>
                  <li>
                    <button className="background-negative">delete(todo)</button>
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