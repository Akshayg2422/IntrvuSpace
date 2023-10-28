
import { VideoStream } from "@Modules";

const WebCamRecorder = ({ isMuted = false }) => {
  return (
    <div>
      <div className="d-block d-md-none d-lg-none d-xl-none" style={{ marginTop: 6, height: 200, width: 200, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}>
        <VideoStream />
        {/* <Webcam mirrored style={{ marginTop: 6, height: 200, width: 200, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }} audio={false} screenshotFormat="image/jpeg" /> */}
      </div>
      <div className="d-none d-md-block d-lg-block d-xl-block" style={{ marginTop: 6, height: 250, width: 250, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}>
        <VideoStream />
        {/* <Webcam mirrored style={{ marginTop: 6, height: 250, width: 250, objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }} audio={false} screenshotFormat="image/jpeg" /> */}
      </div>
    </div>
  );
};

export { WebCamRecorder };
