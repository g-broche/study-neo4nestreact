import { useQuery } from "@tanstack/react-query";
import { VideoMetadataNodes } from "../interface/dataTransfertObject";
import { doesContainEmptyArray } from "../utils/validators";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT_REQUIRED_FORM_DATA = "/videos/metadata";
const ENDPOINT_ADD = "/videos/add";

function VideoForm () {
  const [hostAmount, setHostAmount] = useState(0);
  const {
    data: metadata,
    isError,
    error,
    isLoading
  } = useQuery ({
    queryKey: [ENDPOINT_REQUIRED_FORM_DATA],
    queryFn: async () => {
      const response = await fetch(`${API_URL}${ENDPOINT_REQUIRED_FORM_DATA}`);
      if(!response.ok){
        try {
          const errorData = await response.json();
          const errorMessage = 
            (errorData.data && errorData.data.message)
            ? errorData.data.message
            : `processing the request cause an error (code: ${response.status})`;
          throw new Error(errorMessage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error(`processing the request cause an unhandled error (code: ${response.status})`);
        }
      }

      const result = await response.json();

      if (!result.data || !result.data.success || !result.data.items){
        const errorMessage = 
        (result.data && result.data.message && result.data.message.length > 0)
        ? result.data.message
        : `the server returned an error)`;
        throw new Error(errorMessage);
      }

      if (doesContainEmptyArray(result.data.items)){
        throw new Error(`some required data nodes are missing from the database`);
      }

        return result.data.items as VideoMetadataNodes;
    }
  })

  const appendNewHostGroup = () => {
    setHostAmount(hostAmount+1);
    return (
      <div className="form-group">
        <div>
          <button>Remove</button>
        </div>
        <label htmlFor={`platforms-select-${hostAmount}`}></label>
        <select name={`host[${hostAmount}][platform]`} id={`platforms-select-${hostAmount}`} multiple>
          {metadata!.platforms.map(platform => (
            <option key={`${platform.name}-${hostAmount}`} value={platform.name}>{platform.name}</option>
          ))}
        </select>
        <div className="form-group">
          <label htmlFor={`platforms-url-${hostAmount}`}>Url</label>
          <input id={`platforms-url-${hostAmount}`} name={`host[${hostAmount}][url]`} type="text" />
        </div>
    </div>
    )
  }

  if (isLoading) {
    return <p className="centered-text">Loading form data...</p>
  }
  
  if (isError) {
    return <p className="centered-text">An error as occured: "{error.message}"</p>
  }
  

  return (
    <>
      <form 
        action={`${API_URL}${ENDPOINT_ADD}`}
        method="POST"
        onSubmit={handleCreate}
      >
        <div className="form-group">
          <label htmlFor="title-field">Title</label>
          <input id="title-field" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="description-field">Description</label>
          <input id="description-field" type="text" />
        </div>
        <section id="video-form-hosts">
          <p className="centered-text">Select video hosts</p>
          {appendNewHostGroup()}
          <button onClick={appendNewHostGroup}>add mirror</button>
        </section>
        <div className="form-group">
          <label htmlFor="type-select"></label>
          <select name="type" id="types-select">
            {metadata!.types.map(type => (
              <option key={type.label} value={type.label}>{type.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="categories-select"></label>
          <select name="categories" id="categories-select" multiple>
            {metadata!.categories.map(category => (
              <option key={category.label} value={category.label}>{category.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="games-select"></label>
          <select name="games" id="games-select" multiple>
            {metadata!.games.map(game => (
              <option key={game.name} value={game.name}>{game.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags-select"></label>
          <select name="tags" id="tags-select" multiple>
            {metadata!.tags.map(tag => (
              <option key={tag.label} value={tag.label}>{tag.label}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add video</button>
      </form>
    </>
  )
}

export default VideoForm

/**
 * paused there due to necessity to go back to fansite project for a new feature
 * 
 * at this stage a rough template for the video form has been made (intended for both add new and edit)
 * 
 * next things to do for this implementation:
 * => create api route that will return necessary data the video form depends on
 * => test video form and implement proper way to add/remove extra host source for a video
 * => create api route to add new video (let's ignore the image upload in early implementation)
 * => create function on client to send the create request (likely difficult part to deal with
 * will be to add the hosts properly to the request body)
 * => test proper creation of video with return to video index
 */