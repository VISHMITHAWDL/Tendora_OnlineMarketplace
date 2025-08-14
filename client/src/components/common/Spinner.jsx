import React from 'react'

const SimpleSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3', 
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md" 
        style={{ backgroundColor: 'rgba(68, 68, 68, 0.8)' }}
      />
      
      {/* Simple spinner */}
      <div 
        className={`${sizeClasses[size]} rounded-full animate-spin`}
        style={{ 
          border: `${size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px'} solid rgba(237, 237, 237, 0.3)`,
          borderTopColor: '#DA0037'
        }}
      />
    </div>
  )
}

// Demo component
const SpinnerDemo = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentSize, setCurrentSize] = React.useState('md')
  
  const sizes = ['sm', 'md', 'lg', 'xl']

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize(prev => {
        const currentIndex = sizes.indexOf(prev)
        return sizes[(currentIndex + 1) % sizes.length]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, #444444 0%, #2a2a2a 50%, #444444 100%)`
      }}
    >
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-6 text-center"
            style={{ color: '#EDEDED' }}
          >
            Simple Spinner
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="backdrop-blur-sm rounded-xl p-6 border"
                style={{ 
                  backgroundColor: 'rgba(237, 237, 237, 0.05)',
                  borderColor: 'rgba(237, 237, 237, 0.1)'
                }}
              >
                <div 
                  className="h-32 rounded-lg mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(218, 0, 55, 0.2) 0%, rgba(237, 237, 237, 0.1) 100%)`
                  }}
                ></div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: '#EDEDED' }}
                >
                  Card {i}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(237, 237, 237, 0.7)' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsLoading(!isLoading)}
              className="px-8 py-3 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ 
                backgroundColor: '#DA0037',
                color: '#EDEDED',
                boxShadow: '0 4px 15px rgba(218, 0, 55, 0.3)'
              }}
            >
              {isLoading ? 'Hide Spinner' : 'Show Spinner'}
            </button>
            <p 
              className="mt-4 text-sm"
              style={{ color: 'rgba(237, 237, 237, 0.6)' }}
            >
              Simple spinning circle - no text, no extras
            </p>
          </div>
        </div>
      </div>

      {/* Simple spinner overlay */}
      {isLoading && <SimpleSpinner size={currentSize} />}
    </div>
  )
}

export default SpinnerDemo