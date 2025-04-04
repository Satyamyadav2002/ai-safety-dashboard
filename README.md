# AI Safety Incident Dashboard

A React TypeScript application for tracking and managing AI safety incidents.

## Features

- Display list of AI safety incidents with Title, Severity, and Reported Date
- Filter incidents by Severity (All, Low, Medium, High)
- Sort incidents by Reported Date (Newest First, Oldest First)
- View detailed description of each incident
- Add new incidents with Title, Description, and Severity
- Responsive design with modern UI

## Technologies Used

- React
- TypeScript
- CSS3 (Flexbox/Grid)
- date-fns for date formatting

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-safety-dashboard.git
```

2. Install dependencies:
```bash
cd ai-safety-dashboard
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at http://localhost:3000

## Project Structure

```
ai-safety-dashboard/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   ├── index.css
│   ├── types.ts
│   └── mockData.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 