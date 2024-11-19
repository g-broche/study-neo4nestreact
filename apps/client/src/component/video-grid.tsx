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
                  alt={`thumbnail ${video.title}`} 
                />
              </td>
              <td>{video.title}</td>
              <td>{video.hosts![0].date}</td>
              <td className="url-cell list-cell column-list">
                <ul>
                  {video.hosts!.map(host => (
                    <td>{host.url}</td>
                  ))}
                </ul>
              </td>
              <td className="category-cell list-cell row-list">
                <ul>
                  {video.categories!.map(category => (
                    <td>{category.label}</td>
                  ))}
                </ul>
              </td>
              <td className="tag-cell list-cell row-list">
                <ul>
                  {video.tags!.map(tag => (
                    <td>{tag.label}</td>
                  ))}
                </ul>
              </td>
              <td>{video.type!.label}</td>
              <td className="action-cell list-cell column-list">
                <button className="edit">edit-(todo)</button>
                <button className="delete">delete(todo)</button>
              </td>
            </tr>
          ))};
        </tbody>
      </table>
    </>
  )
}
export default VideoGrid;