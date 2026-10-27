"use client";

import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";

const Default = () => {
  return (
    <div className="h-dvh w-dvw bg-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px]">
      <BackgroundPixelStars />
    </div>
  );
};

export default Default;
