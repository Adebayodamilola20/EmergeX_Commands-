# EmergeX Documentation Site

Official documentation site for [EmergeX](https://github.com/8gi-foundation/emergex-code) - The agentic AI coding assistant built for speed, transparency, and personal local fine-tuning.

![EmergeX Logo](public/logo.png)

## Overview

This repository contains the source code for the EmergeX documentation website. The site is designed to provide a seamless, ADHD-friendly learning experience for developers using EmergeX. It covers everything from installation and quick-start guides to deep dives into the system architecture and kernel fine-tuning protocols.

## Key Features

- **Progressive Navigation**: Sidebar and pagination logic that guides you through the learning journey.
- **Rich Aesthetics**: A modern, premium UI with a dual-accent color palette (Blue/Purple) and smooth animations.
- **Architectural Clarity**: Detailed ASCII diagrams and interactive documentation on the EmergeX kernel and personality protocols.
- **Mobile Responsive**: Fully optimized for all screen sizes.
- **Local First**: Documentation standards that respect your system's internal configurations (`~/.emergex/`).

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [React Query](https://tanstack.com/query/latest)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js (v18+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adebayodamilola20/emergex-documentation-site.git
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

## Repository Structure

- `src/data/`: Contains the documentation content in TypeScript modules (supporting Markdown).
- `src/components/`: Reusable UI components including the `MarkdownRenderer` and `Pagination` logic.
- `src/pages/`: Main application pages including `HomePage` and `DocsPage`.
- `public/`: Static assets and branding logos.

## Contributing

Contributions are welcome! Please see the [Contributing Guide](https://github.com/adebayodamilola20/emergex-documentation-site/blob/main/src/data/reference.ts) for standards and procedures.

## License

MIT © [EmergeX](https://github.com/8gi-foundation/emergex-code)
