# Plex Movie List

Plex Movie List is a simple list of movies within a [Plex](https://plex.tv) library.

# Installation

Docker is the recommended method of deployment. See below for configuration instructions.

```
docker run -d -p 3000:3000 -e PLEXURL=http://10.10.10.10:32400 -e PLEXLIBRARYID=1 -e PLEXTOKEN=<token> ghcr.io/kenneth-church/plex-movie-list
```

Or if you prefer Docker Compose:

```
services:
  plex-movie-list:
    image: ghcr.io/kenneth-church/plex-movie-list
    ports:
      - 3000:3000
    environment:
        - PLEXURL=http://10.10.10.10:32400
        - PLEXLIBRARYID=1
        - PLEXTOKEN=<token>
```

# Configuration

Plex Movie List is configured through environment variables or a `.env` file.

Available variables below. Any with a default (and `NODE_ENV` with Docker) are optional.

| Variable      | Default | Description                                                                          |
| ------------- | ------- | ------------------------------------------------------------------------------------ |
| NODE_ENV      |         | Used for Node.js optimizations. Needs to be set to `production` unless using Docker. |
| PORT          | 3000    | The port the webserver listens on. If using Docker, use the `-p` flag instead.       |
| PLEXURL       |         | The URL of your Plex server.                                                         |
| PLEXLIBRARYID |         | The ID of the Plex library to query. See below for further.                          |
| PLEXTOKEN     |         | The `X-Plex-Token` parameter used for authorization. See below for further.          |
| DEBUG         | false   | Set to `true` to log more information to the console.                                |

# Library ID and X-Plex-Token

Follow these instructions to find your ID and token.

- Log in to your Plex server, either through it's local IP or at [app.plex.tv](https://app.plex.tv).
- Navigate to the library you wish to display.
- In your browser's URL bar, the end of the URL will contain something like `com.plexapp.plugins.library?source=1`. The number at the end is your library ID.
- On any piece of media, click the menu button on the bottom right of the poster, then 'Get Info'.
- Click the 'View XML' link in the bottom left of the new popup.
- Again in your URL bar, at the end of the URL you'll see `&X-Plex-Token=<token>`. The characters in place of `<token>` is your `X-Plex-Token`.
