import React, { useState } from 'react';

const ProtocolMetricsChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = [
    { min: 2700, max: 2820 },
    { min: 2650, max: 2740 },
    { min: 2680, max: 2760 },
    { min: 2780, max: 2880 },
    { min: 2670, max: 2790 },
    { min: 2600, max: 2720 },
    { min: 2670, max: 2750 },
    { min: 2720, max: 2850 },
    { min: 2630, max: 2740 },
    { min: 2680, max: 2800 },
    { min: 2850, max: 2980 },
    { min: 2750, max: 2860 },
    { min: 2620, max: 2750 },
    { min: 2750, max: 2900 }
  ];

  const calculateDomain = () => {
    const minValues = data.map(item => item.min);
    const maxValues = data.map(item => item.max);
    return { 
      min: Math.min(...minValues), 
      max: Math.max(...maxValues)
    };
  };

  const domain = calculateDomain();

  return (
    <div className="w-full h-full p-4">
      <div className="h-full flex flex-col">
        <div className="relative flex-1">
          <div className="absolute inset-0">
            {hoveredIndex !== null && (
              <div 
                className="absolute z-20 bg-popover rounded-md shadow-md p-2 text-xs"
                style={{ 
                  top: '20px', 
                  left: `${(hoveredIndex / data.length) * 100 + 5}%`,
                }}
              >
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1 pointer-events-none">
                  <span className="text-muted-foreground">High:</span>
                  <span className="font-medium">{data[hoveredIndex].max}</span>
                  <span className="text-muted-foreground">Low:</span>
                  <span className="font-medium">{data[hoveredIndex].min}</span>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 w-full h-full flex justify-between">
              {data.map((item, i) => {
                const { min, max } = item;
                const domainRange = domain.max - domain.min;
                
                const maxPosPercent = ((domain.max - max) / domainRange) * 100;
                const minPosPercent = ((domain.max - min) / domainRange) * 100;
                const barHeight = minPosPercent - maxPosPercent;
                
                const isHovered = hoveredIndex === i;
                
                return (
                  <div 
                    key={i} 
                    className="h-full relative" 
                    style={{ width: `${100 / data.length}%` }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="absolute h-full w-px border-l border-border border-dotted pointer-events-none opacity-50"></div>
                    
                    <div
                      className={`absolute w-4/5 rounded-sm left-1/2 transform -translate-x-1/2 transition-all duration-300 bg-primary cursor-pointer`}
                      style={{
                        top: `${maxPosPercent}%`,
                        height: `${Math.max(barHeight, 2)}%`,
                        boxShadow: !isHovered 
                          ? '0 0 15px 2px rgba(254, 70, 49, 0.6), 0 0 5px 1px rgba(254, 70, 49, 0.4) inset' 
                          : '0 0 8px 1px rgba(254, 70, 49, 0.4'
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolMetricsChart; 