interface Props {
  src: string;
  alt?: string;
  className?: string;
}

function IphoneFrame({ src, alt = "App screenshot", className = "" }: Props) {
  return (
    <div className={`iphone-frame ${className}`}>
      {/* iPhone 16 Pro frame using CSS */}
      <div className="iphone-device">
        {/* Dynamic Island */}
        <div className="iphone-dynamic-island" />
        {/* Screen with screenshot */}
        <div className="iphone-screen">
          <img
            src={src}
            alt={alt}
            className="iphone-screenshot"
          />
        </div>
        {/* Side buttons */}
        <div className="iphone-button-left iphone-button-silent" />
        <div className="iphone-button-left iphone-button-volume-up" />
        <div className="iphone-button-left iphone-button-volume-down" />
        <div className="iphone-button-right iphone-button-power" />
      </div>
    </div>
  );
}

export default IphoneFrame;
