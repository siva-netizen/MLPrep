import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ActivityHeatmap({ data, availableYears = [], selectedYear, onYearChange, className }) {
  const currentYear = selectedYear || new Date().getFullYear().toString();

  // Total activity count for the year
  const totalActivity = useMemo(() => {
    return Object.values(data || {}).reduce((sum, count) => {
      const val = parseInt(count);
      return isNaN(val) ? sum : sum + val;
    }, 0);
  }, [data]);

  // Generate all days for the selected year
  const activities = useMemo(() => {
    const days = [];
    const startDate = new Date(parseInt(currentYear), 0, 1); // Jan 1st
    const endDate = new Date(parseInt(currentYear), 11, 31); // Dec 31st
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = (data && data[dateStr]) || 0;
      
      days.push({
        date: dateStr,
        count: count,
        month: currentDate.getMonth(),
        dayOfWeek: currentDate.getDay()
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }, [data, currentYear]);

  const getColorClass = (count) => {
    if (count === 0) return 'bg-[#ebedf0]'; // GitHub light empty cell
    if (count <= 2) return 'bg-[#9be9a8]'; // Level 1
    if (count <= 5) return 'bg-[#40c463]'; // Level 2
    if (count <= 10) return 'bg-[#30a14e]'; // Level 3
    return 'bg-[#216e39]'; // Level 4
  };

  // Group by weeks for vertical columns
  const weeks = useMemo(() => {
    const w = [];
    let currentWeek = Array(7).fill(null);
    
    activities.forEach((day) => {
      const dayOfWeek = day.dayOfWeek;
      currentWeek[dayOfWeek] = day;
      
      if (dayOfWeek === 6) { // Saturday, end of week
        w.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    });

    if (currentWeek.some(d => d !== null)) {
      w.push(currentWeek);
    }
    
    return w;
  }, [activities]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    
    weeks.forEach((week, index) => {
      const firstDay = week.find(d => d !== null);
      if (firstDay && firstDay.month !== lastMonth) {
        labels.push({ month: firstDay.month, index });
        lastMonth = firstDay.month;
      }
    });
    
    return labels;
  }, [weeks]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className={cn("p-6 bg-white rounded-xl border border-gray-200 text-gray-900 shadow-sm", className)}>
      <div className="flex items-center mb-4 px-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Learning Activity
        </h3>
      </div>

      <div className="flex gap-6">
        {/* Heatmap Area */}
        <div className="flex-grow overflow-x-auto custom-scrollbar pb-2">
          <div className="relative pt-8 px-2">
            {/* Month Labels */}
            <div className="absolute top-0 left-10 flex text-[11px] text-gray-400 font-medium">
              {monthLabels.map((label, i) => (
                <div 
                  key={i} 
                  className="absolute whitespace-nowrap"
                  style={{ left: `${label.index * 13}px` }}
                >
                  {months[label.month]}
                </div>
              ))}
            </div>

            <div className="flex gap-1.5">
              {/* Day Labels - Precisely Aligned to 14px row height (10px box + 4px gap) */}
              <div className="flex flex-col text-[10px] text-gray-400 font-medium w-8 select-none">
                <div className="h-[10px] mb-[4px]"></div> {/* Sun */}
                <div className="h-[10px] mb-[4px]">Mon</div>
                <div className="h-[10px] mb-[4px]"></div>
                <div className="h-[10px] mb-[4px]">Wed</div>
                <div className="h-[10px] mb-[4px]"></div>
                <div className="h-[10px] mb-[4px]">Fri</div>
                <div className="h-[10px]"></div>
              </div>

              {/* Grid */}
              <div className="flex gap-[4px]">
                {weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-[4px]">
                    {week.map((day, dIndex) => (
                      <TooltipProvider key={dIndex}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "w-[10px] h-[10px] rounded-[1.5px] transition-all",
                                day ? getColorClass(day.count) : "bg-transparent pointer-events-none"
                              )}
                            />
                          </TooltipTrigger>
                          {day && (
                            <TooltipContent side="top" className="bg-gray-800 text-white border-none text-[10px] py-1 px-2 rounded shadow-md">
                              <p><span className="font-bold">{day.count || 'No'} activity</span> on {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="mt-4 flex items-center justify-end text-[11px] text-gray-400">
               <div className="flex items-center gap-1.5">
                 <span>Less</span>
                 <div className="flex gap-[3px]">
                   <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#ebedf0]"></div>
                   <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#9be9a8]"></div>
                   <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#40c463]"></div>
                   <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#30a14e]"></div>
                   <div className="w-[10px] h-[10px] rounded-[1.5px] bg-[#216e39]"></div>
                 </div>
                 <span>More</span>
               </div>
            </div>
          </div>
        </div>

        {/* Year Sidebar (GitHub Style) */}
        <div className="flex flex-col gap-1 min-w-[80px] border-l border-gray-100 pl-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Yearly History</p>
          {availableYears.map(yr => (
            <button
              key={yr}
              onClick={() => onYearChange(yr)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-left",
                currentYear === yr 
                  ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
