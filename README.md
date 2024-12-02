# React Native Application for JSON Data Processing

## Overview

This application is built using React Native and designed to receive input from a JSON file, process the data, and display the result in the app's UI. The app supports Android and provides basic functionality for handling flight data from a JSON file, such as uploading and displaying flight information. It also includes unit tests to ensure the correct functionality of key components.

## Features

- Upload a JSON file containing flight data.
- Process and display flight data in a user-friendly interface.
- Show the cheapest flight option when available.
- Includes unit tests for core components.

## Prerequisites

Before running the project, make sure you have the following installed:

1. **Node.js** (Recommended version: 18.x.x)
2. **Yarn** (for package management)
3. **Android Studio** (for Android Emulator)
4. **React Native CLI** (if not using Expo)

## Setup Instructions

### 1. Clone the Repository

Start by cloning this repository to your local machine.

```bash
git clone https://github.com/yudistiafirman/MyFlight
cd MyFlight
```

### 2. Install Dependencies
Make sure you have all the necessary dependencies installed by running:

```bash
yarn install
```
This will install all the required dependencies, including React Native and testing libraries.

### 3. Running the App on Android Emulator
1. Start Android Emulator:
- Open Android Studio.
- Go to the AVD Manager and select a virtual device to start the Android Emulator.

2.Start the React Native App:
- Run the following command in your terminal to launch the app on the Android Emulator:
```bash
yarn android
```
This will build the project and start the app on the emulator.


### 4. Using The App

Once the app is running, you can:

- Upload JSON: You can upload a JSON file containing flight data. The app will process and display the flight information.
- View Cheapest Flight: If applicable, the app will calculate and display the cheapest flight option available.

### 5. Running the Unit Tests

This project includes unit tests for the core components. To run the tests, use the following command:

```bash
yarn test
```
This will run all the tests and output the results in your terminal.


