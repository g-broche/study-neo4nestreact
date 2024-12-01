import VideoForm from "../component/video-form";

function VideoAdd () {
  return (
    <>
    <main>
        <header className="main-component title-block">
          <h1 className="title">Add new video</h1>
        </header>
        <section className="main-component">
          <VideoForm />
        </section>
      </main>
    </>
  )
}

export default VideoAdd;