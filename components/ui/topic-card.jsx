import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, FileText } from 'lucide-react';

/**
 * TopicCard component - Beautiful card for displaying study topics
 * with gradient overlays and interactive controls
 */
export const TopicCard = React.forwardRef(
  ({
    category,
    title,
    gradient,
    isCompleted,
    onToggle,
    onOpenNotes,
    imageUrl = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex h-52 cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-white p-4 text-black shadow-md border border-gray-100 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl',
          className
        )}
        {...props}
      >
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Top Section: Category and Completion Status */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                {category}
              </p>
              <h3 className="text-xl font-bold leading-tight text-black">{title}</h3>
            </div>
            {isCompleted && (
              <CheckCircle className="text-green-600 flex-shrink-0 ml-2" size={24} />
            )}
          </div>

          {/* Bottom Section: Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            {/* Checkbox Button */}
            <button
              onClick={onToggle}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300',
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {isCompleted ? '✓ Completed' : 'Mark Done'}
            </button>

            {/* Icon Buttons */}
            <div className="flex gap-1">
              <button
                onClick={onOpenNotes}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition"
                title="Open notes"
              >
                <FileText size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TopicCard.displayName = 'TopicCard';
