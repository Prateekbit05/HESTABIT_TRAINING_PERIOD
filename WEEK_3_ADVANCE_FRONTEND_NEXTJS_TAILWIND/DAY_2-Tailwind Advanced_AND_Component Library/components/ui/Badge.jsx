export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  dot = false,
  className = ''
}) {
  const baseStyles = 'inline-flex items-center font-semibold uppercase tracking-wide';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    dark: 'bg-gray-800 text-white',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-[0.65rem]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}`}>
      {dot && (
        <span className={`w-2 h-2 rounded-full mr-1.5 ${getDotColor(variant)}`}></span>
      )}
      {children}
    </span>
  );
}

function getDotColor(variant) {
  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-cyan-500',
    dark: 'bg-gray-300',
  };
  return dotColors[variant] || dotColors.default;
}