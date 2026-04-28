import Image from "next/image";

export function RamiAvatar() {
  return (
    <div className="relative inline-block">
      {/* The Main Icon Container */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-subtle bg-white overflow-hidden shadow-card flex items-center justify-center p-4">
        <Image 
          src="/MeetRamiCircleIcon.png" 
          alt="Rami the Buying Agent" 
          width={128} 
          height={128}
          className="object-contain"
        />
      </div>

      {/* Live Status Pulse */}
      <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2">
        <span className="relative flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white"></span>
        </span>
      </div>
    </div>
  );
}

export function RamiAppHeader() {
  return (
    <div className="relative inline-block">
      {/* The Main Icon Container */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-subtle 
bg-white overflow-hidden shadow-card flex items-center justify-center p-4">
        <Image 
          src="/MeetRamiCircleIcon.png" 
          alt="Rami the Buying Agent" 
          width={80} 
          height={80}
          className="object-contain"
        />
      </div>


      {/* Live Status Pulse */}
      <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2">
        <span className="relative flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 
border-white"></span>
        </span>
      </div>
    </div>
  );
}