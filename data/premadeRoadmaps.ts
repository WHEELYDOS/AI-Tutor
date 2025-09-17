import type { Roadmap } from '../types';

export const premadeRoadmaps: Roadmap[] = [
  {
    title: 'Frontend Developer',
    description: 'A complete guide to becoming a modern frontend developer in 2024.',
    root: {
      id: 101,
      title: 'Internet Basics',
      description: 'Understand how the internet works, including HTTP, DNS, and hosting.',
      type: 'core',
      children: [
        {
          id: 102,
          title: 'HTML',
          description: 'The foundation of all web pages.',
          type: 'core',
          children: [
            {
              id: 103,
              title: 'CSS',
              description: 'Used for styling web pages.',
              type: 'core',
              children: [
                {
                  id: 104,
                  title: 'JavaScript',
                  description: 'Makes web pages interactive.',
                  type: 'core',
                  children: [
                    {
                      id: 105,
                      title: 'Version Control (Git)',
                      description: 'Track changes to your code.',
                      type: 'core',
                      children: [
                        {
                          id: 106,
                          title: 'Pick a Framework',
                          description: 'Choose a modern JS framework.',
                          type: 'core',
                          children: [
                            { id: 107, title: 'React', description: 'A popular UI library.', type: 'elective', children: [] },
                            { id: 108, title: 'Vue', description: 'A progressive framework.', type: 'elective', children: [] },
                            { id: 109, title: 'Svelte', description: 'Compiles your code to tiny, framework-less vanilla JS.', type: 'elective', children: [] }
                          ]
                        },
                        {
                          id: 110,
                          title: 'Styling Frameworks',
                          description: 'Faster styling with pre-built components.',
                          type: 'tool',
                          children: [
                            { id: 111, title: 'Tailwind CSS', description: 'A utility-first CSS framework.', type: 'elective', children: [] },
                            { id: 112, title: 'Material UI', description: 'React components for faster and easier web development.', type: 'elective', children: [] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    title: 'Backend Developer',
    description: 'A comprehensive guide to building server-side applications and services.',
    root: {
      id: 301,
      title: 'Choose a Language',
      description: 'Select a programming language for the backend.',
      type: 'core',
      children: [
        { id: 302, title: 'Node.js', description: 'JavaScript runtime for server-side development.', type: 'elective', children: [] },
        { id: 303, title: 'Python', description: 'Versatile language with frameworks like Django & Flask.', type: 'elective', children: [] },
        { id: 304, title: 'Go', description: 'High-performance language built by Google.', type: 'elective', children: [] },
        {
            id: 305,
            title: 'Version Control (Git)',
            description: 'Essential for tracking code changes and collaboration.',
            type: 'core',
            children: [
                {
                    id: 306,
                    title: 'Databases',
                    description: 'Learn how to store and manage data.',
                    type: 'core',
                    children: [
                        { id: 307, title: 'SQL (PostgreSQL)', description: 'Structured Query Language for relational data.', type: 'elective', children: [] },
                        { id: 308, title: 'NoSQL (MongoDB)', description: 'Flexible, document-based databases.', type: 'elective', children: [] },
                    ]
                },
                {
                    id: 309,
                    title: 'APIs',
                    description: 'Understand how services communicate.',
                    type: 'core',
                    children: [
                        { id: 310, title: 'REST APIs', description: 'The standard for building web services.', type: 'elective', children: [] },
                        { id: 311, title: 'GraphQL', description: 'A query language for your API.', type: 'elective', children: [] },
                    ]
                },
                {
                    id: 312,
                    title: 'Authentication & Security',
                    description: 'Learn to secure your applications.',
                    type: 'core',
                    children: []
                },
                {
                    id: 313,
                    title: 'Containerization',
                    description: 'Package your application for deployment.',
                    type: 'tool',
                    children: [
                        { id: 314, title: 'Docker', description: 'Create, deploy, and run applications in containers.', type: 'elective', children: [] },
                    ]
                }
            ]
        }
      ]
    }
  },
  {
    title: 'DevOps Engineer',
    description: 'Learn to bridge the gap between software development and IT operations.',
    root: {
        id: 401,
        title: 'Programming Language',
        description: 'Pick a language for scripting and automation.',
        type: 'core',
        children: [
            { id: 402, title: 'Go', description: 'Ideal for building high-performance tooling.', type: 'elective', children: [] },
            { id: 403, title: 'Python', description: 'Excellent for automation and scripting.', type: 'elective', children: [] },
            {
                id: 404,
                title: 'OS & Networking Concepts',
                description: 'Understand the underlying infrastructure.',
                type: 'core',
                children: [
                    {
                        id: 405,
                        title: 'Infrastructure as Code (IaC)',
                        description: 'Manage infrastructure with configuration files.',
                        type: 'core',
                        children: [
                            { id: 406, title: 'Terraform', description: 'Provision and manage infrastructure.', type: 'tool', children: [] },
                            { id: 407, title: 'Ansible', description: 'Configure systems and deploy software.', type: 'tool', children: [] },
                        ]
                    },
                    {
                        id: 408,
                        title: 'CI/CD Pipelines',
                        description: 'Automate the build, test, and deployment process.',
                        type: 'core',
                        children: [
                            { id: 409, title: 'GitHub Actions', description: 'CI/CD directly within your GitHub repository.', type: 'tool', children: [] },
                            { id: 410, title: 'Jenkins', description: 'A popular open-source automation server.', type: 'tool', children: [] },
                        ]
                    },
                    {
                        id: 411,
                        title: 'Containerization & Orchestration',
                        description: 'Package and manage containerized applications.',
                        type: 'core',
                        children: [
                            { id: 412, title: 'Docker', description: 'The containerization standard.', type: 'tool', children: [] },
                            { id: 413, title: 'Kubernetes', description: 'Automate container deployment and scaling.', type: 'tool', children: [] },
                        ]
                    },
                    {
                        id: 414,
                        title: 'Cloud Providers',
                        description: 'Gain expertise in a major cloud platform.',
                        type: 'core',
                        children: [
                             { id: 415, title: 'AWS', description: 'Amazon Web Services.', type: 'elective', children: [] },
                             { id: 416, title: 'Google Cloud Platform', description: 'GCP by Google.', type: 'elective', children: [] },
                             { id: 417, title: 'Azure', description: 'Microsoft Azure.', type: 'elective', children: [] },
                        ]
                    }
                ]
            }
        ]
    }
  },
  {
    title: 'Data Scientist',
    description: 'The path to becoming a data scientist, from fundamentals to advanced topics.',
    root: {
      id: 201,
      title: 'Programming Foundations',
      description: 'Learn a language for data analysis.',
      type: 'core',
      children: [
        {
          id: 202,
          title: 'Python',
          description: 'The most popular language for data science.',
          type: 'core',
          children: [
            {
              id: 203,
              title: 'Key Libraries',
              description: 'Master the essential data science libraries.',
              type: 'tool',
              children: [
                { id: 204, title: 'NumPy', description: 'For numerical computing.', type: 'elective', children: [] },
                { id: 205, title: 'Pandas', description: 'For data manipulation and analysis.', type: 'elective', children: [] },
                { id: 206, title: 'Matplotlib & Seaborn', description: 'For data visualization.', type: 'elective', children: [] }
              ]
            }
          ]
        },
        {
          id: 207,
          title: 'Mathematics',
          description: 'Understand the mathematical foundations.',
          type: 'core',
          children: [
            { id: 208, title: 'Linear Algebra', description: 'Vectors, matrices, and transformations.', type: 'elective', children: [] },
            { id: 209, title: 'Calculus', description: 'Derivatives, gradients, and optimization basics.', type: 'elective', children: [] },
            { id: 210, title: 'Statistics & Probability', description: 'Data distributions, hypothesis testing, and inference.', type: 'elective', children: [] }
          ]
        },
        {
          id: 211,
          title: 'Machine Learning',
          description: 'Learn to build predictive models.',
          type: 'core',
          children: [
            { id: 212, title: 'Scikit-Learn', description: 'The primary ML library in Python.', type: 'tool', children: [] },
            { id: 213, title: 'Supervised Learning', description: 'Regression, classification, and evaluation metrics.', type: 'core', children: [] },
            { id: 214, title: 'Unsupervised Learning', description: 'Clustering and dimensionality reduction.', type: 'core', children: [] }
          ]
        }
      ]
    }
  },
  {
    title: 'UX Designer',
    description: 'A roadmap for creating user-centered, intuitive, and accessible digital products.',
    root: {
        id: 501,
        title: 'Design Fundamentals',
        description: 'Grasp the core principles of visual design.',
        type: 'core',
        children: [
            { id: 502, title: 'Color Theory', description: 'Understand color harmony and psychology.', type: 'elective', children: [] },
            { id: 503, title: 'Typography', description: 'Learn about fonts, readability, and hierarchy.', type: 'elective', children: [] },
            { id: 504, title: 'Composition', description: 'Master layout, balance, and visual flow.', type: 'elective', children: [] },
            {
                id: 505,
                title: 'User Research',
                description: 'Learn to understand your users and their needs.',
                type: 'core',
                children: [
                    { id: 506, title: 'User Interviews', description: 'Conduct effective user interviews.', type: 'elective', children: [] },
                    { id: 507, title: 'Surveys & Questionnaires', description: 'Gather quantitative user data.', type: 'elective', children: [] },
                    { id: 508, title: 'Personas', description: 'Create user personas to guide design.', type: 'elective', children: [] },
                ]
            },
            {
                id: 509,
                title: 'Wireframing & Prototyping',
                description: 'Create low and high-fidelity designs.',
                type: 'core',
                children: [
                    {
                        id: 510,
                        title: 'Design Tools',
                        description: 'Master the industry-standard software.',
                        type: 'tool',
                        children: [
                            { id: 511, title: 'Figma', description: 'A collaborative interface design tool.', type: 'elective', children: [] },
                            { id: 512, title: 'Adobe XD', description: 'Vector-based UX design tool.', type: 'elective', children: [] },
                            { id: 513, title: 'Sketch', description: 'A design toolkit for macOS.', type: 'elective', children: [] },
                        ]
                    }
                ]
            },
            {
                id: 514,
                title: 'Usability Testing',
                description: 'Validate your designs with real users.',
                type: 'core',
                children: []
            }
        ]
    }
  }
];
