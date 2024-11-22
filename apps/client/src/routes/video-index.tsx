import { useQuery } from "@tanstack/react-query"
import { VideoDTO } from "../interface/dataTransfertObject";
import VideoGrid from "../component/video-grid";
import PageHeader from "../component/page-header";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = "/videos";

function VideoIndex(){
  const {
    data: videos,
    isError,
    error,
    isLoading
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const  getVideoContent = () => {
      if (isLoading) {
        return <p className="centered-text">Loading data...</p>
      }
      
      if (isError) {
        return <p className="centered-text">An error as occured: "{error.message}"</p>
      }
      
      if (videos && videos.length === 0) {
        return <p className="centered-text">No video are currently listed</p>
      }
      
      return <VideoGrid videos={videos!} />
    }
  
  return(
    <>
      <PageHeader></PageHeader>
      <main>
        <header className="main-component title-block">
          <h1 className="title">Video list</h1>
        </header>
        <section className="main-component">
          {getVideoContent()}
        </section>
      </main>
    </>
  )
}

export default VideoIndex