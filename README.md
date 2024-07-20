# Node.js Dynamic File Server

This project is a dynamic file server built with Node.js. It serves static files and dynamically generates listings for directories and files with a user-friendly UI, including icons. The server allows navigation into nested directories and serves actual file contents when accessed directly.

## Features

- Provides a directory listing on the root URL (`/`), displaying all files and folders with appropriate icons.
- Enables navigation into nested directories through URL paths, dynamically generating listings for each directory visited.
- Serves actual file contents when a file is accessed directly.
- Returns a "404 Not Found" error for requests to non-existent directories or files.
- Utilizes the Node.js `path` module to correctly navigate filesystem paths based on URL routes.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dynamic-file-server.git

2. Navigate into the project directory:

    `cd dynamic-file-server`

3. Install the required packages:

    `npm install`

### Usage

1. Start the server:

    `node server.js`

2. Open your web browser and navigate to `http://localhost:3000/`.

### Project Structure

dynamic-file-server/
│
├── server.js        # Main server file
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation

### Code Explanation

1. Modules Used:

    * `http`: To create the server.
    * `path`: To handle and transform file paths.
    * `fs`: To interact with the file system.

2. Server Logic:

    * The server parses the request URL and uses fs.stat to check if the path is a file or directory.
    * Files are served using `fs.createReadStream`.
    * Directory contents are listed using fs.readdir, and dynamic HTML is      generated to display them with appropriate icons.

3. Directory Listing HTML Generation:

* The generateDirectoryListing function creates HTML for directory listings with Unicode icons for files and directories.

### Example

* Accessing `/` displays a list of all directories and files in the root, with icons indicating type (directory or file).

* Accessing `/example-directory` shows the contents of the example-directory with appropriate icons.

### Error Handling

* The server returns a "404 Not Found" error for requests to non-existent directories or files, ensuring proper error handling and user feedback.

### Contributing

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

This project was created by [K MONIKA]. You can find me on [https://github.com/KMONIKA26].
