## Campus Events and Entertainment Center Final Report

### 1. Metrics
We utilized **plato**, a JavaScript source code complexity analysis tool, to analyze the complexity of our codebase. The lines of code, maintainability score, estimated errors in implementation and lint errors are calculated.

For the client, the total/average lines of code is 15226/94, and the average maintainability score is 64.58.

For the server, the total/average lines of code is 3229/161, and the average maintainability score is 60.87.

To regenerate the complete plato report for client and server, run the following commands:
```bash
cd client
plato -r -d plato-report src
```
```bash
cd server
plato -r -d plato-report src
```

Then the complete plato report can be found in `client/plato-report` and `server/plato-report`.

We also utilized **madge**, a tool to generate a json file representing the module dependencies in our codebase. The json file can be found in `client/dependency_tree.json` and `server/dependency_tree.json`. There are 410 dependency relationships in client and 437 dependency relationships in server.

To regenerate the json files that represents the module dependencies, run `madge --json src > dependency_tree.json` in the `client` and `server` directories.

Besides the above metrics, we also calculated the following metrics:

| Metric                                         | Client | Server |
|------------------------------------------------|:------:|:------:|
| **Number of packages/modules (directly used)** |   32   |   19   |
| **Number of source files**                     |  224   |   21   |

### 2. Documentation

#### 2.1 Documentation for End Users

##### 2.1.1 Register, Log In and Log Out

##### 2.1.2 Main Page

##### 2.1.3 Profile Page

##### 2.1.4 Event Reservation

##### 2.1.5 Event Release

##### 2.1.6 Notification

##### 2.1.7 Search

The search page allows users to search for users and events, with options to filter and categorize the search results based on various criteria.

###### 2.1.7.1 Search Bar

The search bar is located at the top of the page, where users can enter keywords to perform a search.

###### 2.1.7.2 Filters

The filter section is located below the search bar and offers multiple filtering options:

- **All**: Selecting this option will simultaneously select or deselect the "User" and "Event" filters.
- **User**: Selecting this option will search for users.
- **Event**: Selecting this option will search for events.

If the "Event" filter is selected, the following search criteria can also be selected:

- **All**: Selecting this option will simultaneously select or deselect the "Title," "Tag," "Description," and "Organizer" search criteria.
- **Title**: Search by event title.
- **Tag**: Search by event tag.
- **Description**: Search by event description.
- **Organizer**: Search by event organizer.

###### 2.1.7.3 Search Results

Search results are displayed in a card format, including user and event information. Each user card contains the user's nickname and ID, with a link to view detailed information. Each event card contains the event's title, ID, tag, description, and organizer, with a link to view detailed information.

#### 2.2 Documentation for Developers



### 3. Tests

### 4. Build

### 5. Deployment