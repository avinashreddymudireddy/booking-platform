import React from 'react';

/**
 * BentoGrid: simple responsive grid layout
 */
export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-3 gap-4 auto-rows-[20rem] ${className}`}>{children}</div>
  );
}

/**
 * BentoCard: a card with background image, icon, and text
 */
export function BentoCard({ name, description, href, icon: Icon, backgroundSrc, className = '' }) {
  return (
    <div className={`relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg ${className}`}>
      <img
        src={backgroundSrc}
        alt={`${name} background`}
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />
      <div className="relative z-10 p-6 flex flex-col gap-2">
        {Icon && <Icon className="h-8 w-8 text-gray-700" />}
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <a href={href} className="mt-auto text-blue-600 hover:underline">
          Learn more →
        </a>
      </div>
    </div>
  );
}
