# GoalSaver

## Description

GoalSaver is a mobile app designed to help users set and achieve their financial goals for future purchases or experiences. Users can add their savings goals, track their progress with each deposit, and visualize their journey towards making their dreams a reality. 

This project serves as an experiment to test and showcase new functionalities provided by Expo, React Native, NativeWind, and Expo SQLite. Through the development of GoalSaver, I aim to explore the latest features and best practices within these frameworks and libraries, pushing the boundaries of what's possible in mobile app development. 

## Screenshots

| Home Screen             | Create Goal Screen         |
|-------------------------|-----------------------------|
| ![](screenshots/home.png)   | ![](screenshots/home-create.png) |

| Goal Details            | Goal Progress Details       |
|-------------------------|-----------------------------|
| ![](screenshots/goal-details.png) | ![](screenshots/goal-details-create.png) |



## Key Libraries used in GoalSaver

- **@react-navigation/native**: This library provides navigation functionality for React Native apps. It enables the implementation of navigation from one screen to another within the app, supporting both stack navigation and tab navigation, which are essential for a seamless user experience.

- **Day.js**: A minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers. In GoalSaver, Day.js is used to handle all date and time-related operations, ensuring that time-sensitive data is accurately processed and presented.

- **@gorhom/bottom-sheet**: This library offers a highly customizable and performant bottom sheet component, enhancing the interactive capabilities of GoalSaver by allowing users to access additional content and controls without leaving their current context.

- **TailwindCSS & NativeWind**: Leveraging the utility-first CSS framework, TailwindCSS, and NativeWind (its React Native implementation), GoalSaver achieves consistent styling and rapid UI development. These tools enable us to build custom designs with speed and efficiency without sacrificing the app's aesthetics or performance.

- **Expo SQLite**: Provides a simple and efficient way to store, access, and manipulate local data in SQLite databases. This is crucial for GoalSaver's data persistence, allowing the app to store user goals, progress, and preferences locally on the device.

These libraries and frameworks form the backbone of the GoalSaver app, each contributing to its functionality, usability, and overall user experience.


## Installation

Provide step by step series of examples and explanations about how to get a development environment running.

```bash
git clone git@github.com:ivanseibel/goal-saver-react-native-experiments.git
cd goal-saver-react-native-experiments
npm install
```

## Usage

Show examples of usage:
```bash
npm start
```

## Contributing

Contributions are warmly welcome! Whether you're looking to report a bug, propose a feature, or submit a pull request, your help is invaluable and greatly appreciated. Here's how you can get involved:

### Reporting Bugs

If you encounter a bug in the app, please open an issue on our GitHub repository. Include a detailed description of the bug, steps to reproduce it, and any relevant screenshots or error messages. This information will help us diagnose and fix the issue more efficiently.

### Proposing Features

Have an idea for a new feature that could improve GoalSaver? We'd love to hear it! Please submit an issue labeled as a feature request, providing a clear and detailed explanation of your proposed feature and how it would benefit users. We're always looking for ways to make GoalSaver better and more useful.

### Submitting Pull Requests

If you're ready to dive in and contribute code, please follow these steps:

1. **Fork the Repository**: Start by forking the GoalSaver repository to your own GitHub account.
2. **Create a Branch**: Create a branch in your fork for your contributions. It's best to name the branch something descriptive, related to the changes you're making.
3. **Make Your Changes**: Implement your changes, additions, or bug fixes in your branch. Be sure to follow the project's coding standards and guidelines.
4. **Test Your Changes**: Before submitting your changes, please test them thoroughly to ensure they work as expected and don't introduce any new issues.
5. **Submit a Pull Request**: Once your changes are ready and tested, submit a pull request to the main GoalSaver repository. Provide a clear and detailed description of your changes and the benefits they bring.

### Code of Conduct

Please conduct yourself in a professional and respectful manner when interacting with other contributors and maintainers.

### Questions or Suggestions?

If you have any questions or suggestions on how to improve the contributing process, don't hesitate to reach out. We're always looking for feedback to make contributing to GoalSaver a more enjoyable and efficient experience for everyone.

Thank you for considering contributing to GoalSaver. We look forward to your contributions and are excited to see what we can build together!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details