---
applyTo: "**"
---

Always read the package.json to understand the libraries we are using and the commands that we can run.

Config files must be small and simple, with no unnecessary options.

For common dev:

- Use vite
- Use yarn
- Use jest
- Don't add comments
- Validate good practices
- Make everything simple
- Always executes yarn build

For Frontend:

- Use React with latest features and best practices
- Use TypeScript for type safety
- Use tailwindcss for styling

For Styling:

- Make sure to use tailwindcss for styling
- Avoid inline styles
- Use tailwindcss for responsive design
- The app must be responsive and work on mobile devices
- The app must be accessible and follow best practices for accessibility
- The app must have a consistent design and follow best practices for UI/UX
- The app must be pretty but not overdone
- Don't over engineer the design
- Keep it pretty but simple
- Don't duplicate styles or code
- Add loading spinner for async operations. A single spinner component can be used across the app.

For UnitTests:

- Don't mock console logs
- Don't spy console or console logs
- use jest.mock
- Always run the unit tests to verify they pass, if they don't, fix them
