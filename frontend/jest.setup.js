import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  }
}))

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
    h5: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
    h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    img: ({ ...props }) => <img {...props} />,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
    aside: ({ children, ...props }) => <aside {...props}>{children}</aside>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    input: ({ ...props }) => <input {...props} />,
    textarea: ({ children, ...props }) => <textarea {...props}>{children}</textarea>,
    select: ({ children, ...props }) => <select {...props}>{children}</select>,
    option: ({ children, ...props }) => <option {...props}>{children}</option>,
    label: ({ children, ...props }) => <label {...props}>{children}</label>,
    fieldset: ({ children, ...props }) => <fieldset {...props}>{children}</fieldset>,
    legend: ({ children, ...props }) => <legend {...props}>{children}</legend>,
    table: ({ children, ...props }) => <table {...props}>{children}</table>,
    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th {...props}>{children}</th>,
    td: ({ children, ...props }) => <td {...props}>{children}</td>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Global test utilities
global.testUtils = {
  // Helper to create test user data
  createTestUser: (overrides = {}) => ({
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    ...overrides
  }),

  // Helper to create test blog post data
  createTestBlogPost: (overrides = {}) => ({
    id: 1,
    title: 'Test Blog Post',
    content: 'This is a test blog post content.',
    excerpt: 'Test excerpt',
    slug: 'test-blog-post',
    author: 'Test Author',
    published: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides
  }),

  // Helper to create test contact form data
  createTestContactData: (overrides = {}) => ({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message',
    ...overrides
  }),

  // Helper to mock API responses
  mockApiResponse: (data, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  }),

  // Helper to create test environment
  setupTestEnvironment: () => {
    // Mock environment variables
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
  }
}

// Setup test environment
global.testUtils.setupTestEnvironment()
