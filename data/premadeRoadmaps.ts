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
  }
];
