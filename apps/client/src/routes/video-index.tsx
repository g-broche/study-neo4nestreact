import { useQuery } from "@tanstack/react-query"
import { VideoDTO } from "../interface/dataTransfertObject";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = "/videos";

function VideoIndex(){
  const {
    data: videos,
    isError,
    error,
    isPending,
  } = useQuery ({
    queryKey: [ENDPOINT],
    queryFn: async () => {
      const response = await fetch(`${API_URL}${ENDPOINT}`);

      if(!response.ok){
        try {
          const errorData = await response.json();
          const errorMessage = 
            (errorData.data && errorData.data.message)
            ? errorData.data.message
            : `processing the request cause an error (code: ${response.status})`;
          throw new Error(errorMessage);
        } catch (error) {
          throw new Error(`processing the request cause an unhandled error (code: ${response.status})`);
        }
      }

      const result = await response.json();

      if (result.data && result.data.success && result.data.items){
        console.log(result.data.items)
        return result.data.items as VideoDTO[];
      }

      const errorMessage = 
        (result.data && result.data.message && result.data.message.length > 0)
        ? result.data.message
        : `the server returned an error)`;
      throw new Error(errorMessage);
    }
  })
  return(
    <>
      <h1>Add video index here</h1>
    </>
  )
}

export default VideoIndex