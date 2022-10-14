# Meet App

### Screenshot of the app:

<p>Login View: <br> Users can have access to the meet app by signing in with their Google account: </p>

![login](src/img/meet1.png)

<p>Main View: <br> The main page where users search for events from different cities, define the number of events they want to see and display a chart to visualize the search data: </p>

![login](src/img/meet.png)

# Description

This app provides a list of upcoming events for any given city, with data provided by Google Calendar. The app works offline using cached data from the last time it was used online. The user can search for events in a specific city or browse all events, customize how many events are shown on screen, click an event for more details, and see how many events are upcoming in certain cities

# How to Use This App

When first opening the app, you will be prompted to sign in with Google in order to gain access to the Google Calendar API. Then, you can specify what city and how many events to view, and click on an event to view more details

# Dependencies

- Amazon Web Services (AWS)
- Google Cloud Platform
- JavaScript (ES6)
- React
- React-DOM
- React-Scripts
- HTML5
- CSS3
- Puppeteer
- Jest
- Enzyme

# API

This app used the Google Calendar API to fetch information about upcoming events by location

# A Note On Privacy

The app requires you to sign in with Google in order to access the data from its Google Calendar. This access goes both ways, as Meet can also access the user's calendar, however it doesn't and will never be given this functionality. Rest assured, the app does not attempt to do anything with the Google user's information in any way. The app is also currently in the process of being verified, but this may take some time

# Feature: Filter events by city

As a user, I would like to be able to filter event by city so I can see the list of events that take place in that city

**Scenario 1**:
When user hasn’t searched for a city, show upcoming events from all cities

- **Given** user has not searched for a city
- **When** the user opens the app
- **Then** the user should see all upcoming events from all cities

**Scenario 2**:
User should see a list of suggestions when they search for a city

- **Given** user wants to see all upcoming events in a city
- **When** the user types the specific city in the search bar
- **Then** the user should see a list of suggestions for a city

**Scenario 3**:
User can select a city from the suggested list

- **Given** user types the city name in an input field for city
- **When** the list of suggestions appears
- **Then** the user can select the city from the suggested list

# Feature: Show and Hide Event Details

As a user, I would like to be able to display and collapse event details so I can see more or less information depending on my preference

**Scenario 1**:
An event element is Collapsed by Default

- **Given** user is on the main page
- **When** nothing is selected
- **Then** the event details will be collapsed

**Scenario 2**:
User can expand an event to see its details

- **Given** user wants to see more about an event
- **When** the user clicks on that event
- **Then** the details for that event will expand

**Scenario 3**:
Collapse the details

- **Given** user has seen the details and wants to collapse
- **When** the user clicks on the expanded details
- **Then** the details will collapse again

# Feature: Specify number of Events

As a user I should be able to choose the number of events I want to see

**Scenario 1**:
When the user hasn’t specified a number, 32 is the default number

- **Given** the user searched for event results for a city
- **When** the user chooses no specific amount of search results
- **Then** the default amount of search results per city will be 32

**Scenario 2**:
The user can change the number of events they want to see

- **Given** the user opened the search results query
- **When** the user changes the default number
- **Then** the default number of results will be changed to what the users select

# Feature: Use App even when offline

As a user I would like to be able to access events even when offline

**Scenario 1**:
Show cached data when there’s no internet connection

- **Given** the app has no internet connection / offline
- **When** the data is cached
- **Then** that data will be shown

**Scenario 2**:
Show error when user changes the settings (city, time range)

- **Given** the user opened the settings tab
- **When** the user changes the settings
- **Then** an error will show

# Feature: Data Visualization

As a user I would like to see charts with the number of upcoming events in my city

**Scenario 1**:
Show a chart with the number of upcoming events in each city

- **Given** the user selected a city
- **When** the user clicks on the city’s upcoming events button
- **Then** a chart will list the upcoming events taking place in the city

# Link

### Meet app:

https://VadimIshkarin.github.io/meet
