'use client';

import { usePlaygroundStore, type Device } from '@/store/usePlaygroundStore';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import PreviewComponents from './PreviewComponents';

const devices: { id: Device; label: string; icon: React.ReactNode; width: string }[] = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, width: '375px' },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} />, width: '768px' },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, width: '100%' },
];

export default function LivePreview() {
  const { device, setDevice } = usePlaygroundStore();
  const currentDevice = devices.find((d) => d.id === device)!;

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      {/* Device Switcher Floating Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center p-1 bg-surface/90 backdrop-blur-md border border-border shadow-sm rounded-lg z-20">
        {devices.map((d) => (
          <button
            key={d.id}
            id={`device-${d.id}`}
            onClick={() => setDevice(d.id)}
            title={d.label}
            className={`
              flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 cursor-pointer
              ${
                device === d.id
                  ? 'bg-accent/15 text-accent shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
              }
            `}
          >
            {d.icon}
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center p-6 mt-12 overflow-y-auto w-full">
        <div
          className="transition-all duration-300 ease-out flex items-center mx-auto"
          style={{
            width: currentDevice.width,
            maxWidth: '100%',
          }}
        >
          {/* Inner Content Wrapper */}
          <div className="relative bg-surface border border-border/50 shadow-sm w-full min-h-[400px] flex items-center justify-center overflow-x-hidden">
            <PreviewComponents />
          </div>
        </div>
      </div>
    </div>
  );
}
