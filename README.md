# DevConnector

A full-stack social network for developers built with MongoDB, Express, React, and Node.js. Developers can create a professional profile, share their experience and education, showcase public GitHub repositories, and participate in community discussions.

This is a learning project based on the MERN Stack Front To Back course, adapted to the dependencies used in this repository.

## Features

- **Authentication:** register, log in, and access protected pages using JSON Web Tokens (JWT). Passwords are hashed with bcryptjs.
- **Developer profiles:** create and edit a profile with a bio, skills, company, location, website, and social links.
- **Experience and education:** add credentials from the dashboard and remove individual entries.
- **Public developer directory:** browse profiles and view a developer's details without logging in.
- **GitHub integration:** display up to five recently created public repositories for a configured GitHub username.
- **Community posts:** authenticated users can publish posts, browse the feed, and like or unlike posts.
- **Discussions:** open a single post, add comments, and delete your own comments.
- **Ownership controls:** users can delete their own posts; the API checks ownership as well as the UI.
- **Feedback:** alerts and loading/error states for user actions and API requests.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, React Router, CSS, Create React App (`react-scripts`) |
| State management | Redux, React Redux, Redux Thunk |
| HTTP client | Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication and validation | JSON Web Token, bcryptjs, express-validator |
| Testing | Jest, React Testing Library, Node.js test runner |

React renders the interface, Redux stores shared application state, and Redux Thunk handles asynchronous API actions. Express exposes the API, while Mongoose reads and writes the application's MongoDB documents.

## Project structure

```text
DevConnector/
├── client/
│   ├── public/
│   └── src/
│       ├── actions/             # Redux actions and API requests
│       ├── components/
│       │   ├── auth/            # Login and registration
│       │   ├── dashboard/       # Account dashboard and credentials
│       │   ├── layout/          # Navigation, landing page, alerts, spinner
│       │   ├── post/            # Single-post discussion and comments
│       │   ├── posts/           # Post feed, items, and submission form
│       │   ├── profile/         # Public profile sections
│       │   ├── profile-forms/   # Profile, experience, education forms
│       │   ├── profiles/        # Developer directory
│       │   └── routing/         # Protected route wrapper
│       ├── reducers/            # Redux state updates
│       ├── utils/               # Auth headers and safe external URLs
│       ├── App.js              # Application routes
│       └── store.js            # Redux store
├── config/                     # Database connection and local configuration
├── middleware/                 # JWT authentication middleware
├── models/                     # User, Profile, and Post schemas
├── routes/api/                 # Authentication, profile, and post endpoints
├── tests/                      # Backend API regression tests
└── server.js                   # Express entry point
```

## Getting started

### Prerequisites

- Node.js 24 and npm (the project was verified with Node.js 24).
- Git.
- A local MongoDB instance or a MongoDB Atlas database.

### 1. Clone and install

```bash
git clone https://github.com/swayamkr03/DevConnector.git
cd DevConnector
npm ci
npm ci --prefix client
```

The backend and frontend have separate dependencies and lockfiles. Install both before starting the application.

### 2. Configure the backend

Create `config/default.json` with your own values:

```json
{
  "mongoURI": "mongodb://127.0.0.1:27017/devconnector",
  "jwtSecret": "replace-with-a-long-random-secret"
}
```

For MongoDB Atlas, replace `mongoURI` with your database connection string. Ensure your database user has access and your current IP is allowed by Atlas network access settings.

`config/default.json` is ignored by Git. Never commit database credentials, JWT secrets, or access tokens. The backend uses the `config` package for these values; it does not automatically load a `.env` file.

### 3. Start development servers

Run this from the project root:

```bash
npm run dev
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:5000>

The backend starts listening after MongoDB connects. The frontend development server proxies `/api` requests to port `5000`.

To run each server in a separate terminal:

```bash
# Terminal 1, project root
npm run server

# Terminal 2, project root
npm run client
```

### Optional: GitHub API token

Public repositories can be fetched without an OAuth app. If needed, set a server-side `GITHUB_TOKEN` environment variable before starting the backend:

```powershell
# PowerShell: replace the placeholder locally; do not commit your token.
$env:GITHUB_TOKEN = "your-github-token"
npm run dev
```

The token stays on the backend. GitHub availability and rate limits can affect the repository section without preventing the rest of a profile from displaying. No GitHub client ID or client secret is required for this feature.

## Using the application

1. Register an account and log in.
2. Open the dashboard and create your profile. Status and comma-separated skills are required.
3. Add your experience and education, plus an optional GitHub username.
4. Open **Developers** to browse public profiles.
5. Open **Posts** to share a message, like posts, or join a discussion.
6. Use the dashboard to edit your profile and manage your credentials.

## API reference

All paths below are relative to `http://localhost:5000`. Protected endpoints require this header:

```http
x-auth-token: <JWT returned by registration or login>
```

Send JSON request bodies using `Content-Type: application/json`.

### Users and authentication

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/users` | Public | Register with name, email, and password |
| POST | `/api/auth` | Public | Log in with email and password; receive a JWT |
| GET | `/api/auth` | Private | Get the authenticated user |

### Profiles

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/profile` | Public | List developer profiles |
| GET | `/api/profile/user/:user_id` | Public | Get a profile by user ID |
| GET | `/api/profile/github/:username` | Public | Get public GitHub repositories |
| GET | `/api/profile/me` | Private | Get your profile |
| POST | `/api/profile` | Private | Create or update your profile |
| PUT | `/api/profile/experience` | Private | Add experience |
| DELETE | `/api/profile/experience/:exp_id` | Private | Delete experience |
| PUT | `/api/profile/education` | Private | Add education |
| DELETE | `/api/profile/education/:edu_id` | Private | Delete education |
| DELETE | `/api/profile` | Private | Delete your profile and user account |

Account deletion currently removes the user and profile documents, not their existing posts or comments.

### Posts and comments

All post endpoints require authentication.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/posts` | List posts |
| GET | `/api/posts/:id` | Get one post |
| POST | `/api/posts` | Create a post with a `text` field |
| DELETE | `/api/posts/:id` | Delete your own post |
| PUT | `/api/posts/like/:id` | Like a post |
| PUT | `/api/posts/unlike/:id` | Remove your like |
| POST | `/api/posts/comment/:id` | Add a comment with a `text` field |
| DELETE | `/api/posts/comment/:id/:comment_id` | Delete your own comment |

## Tests

Run frontend tests from the project root:

```bash
npm test --prefix client -- --watchAll=false --runInBand
```

Run backend tests (build the frontend first because deployment tests check the actual production assets):

```bash
npm run build --prefix client
node --test --test-isolation=none tests/deployment.test.js tests/posts.test.js tests/github.test.js
```

Frontend tests cover profile rendering, safe links, loading and error handling, post/comment state, and form submission behavior. Backend tests cover the post/comment lifecycle, ownership, validation, missing records, and GitHub response handling.

Backend tests use in-memory model mocks and mocked GitHub responses; they do not connect to MongoDB or modify real data. A local `config/default.json` with a test JWT secret is still needed. These regression tests do not replace a full browser and live-database end-to-end check.

## Production build

```bash
npm run build --prefix client
```

This generates optimized frontend assets in `client/build`.

With `NODE_ENV=production`, Express serves this build and the API from the same origin. Refreshing frontend routes such as `/profiles` returns React's `index.html`. Unknown `/api` requests and missing asset files return 404 rather than HTML.

For a local production check in PowerShell:

```powershell
$env:NODE_ENV = "production"
npm start
```

Open <http://localhost:5000>. Stop the server and clear the variable with `Remove-Item Env:NODE_ENV` before returning to `npm run dev`.

## Deploy to Render

Deploy this repository as **one Node Web Service**, not a Static Site. MongoDB remains hosted separately, for example in MongoDB Atlas.

1. Commit and push the deployment changes to GitHub.
2. Open the [Render dashboard](https://dashboard.render.com), choose **New > Web Service**, and connect `swayamkr03/DevConnector`.
3. Use the following settings:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Language | Node |
| Root directory | Leave blank |
| Build command | `npm ci && npm ci --prefix client && npm run build --prefix client` |
| Start command | `npm start` |
| Health check path | `/` |

The committed `.node-version` pins the locally tested Node version. If the service already has a `NODE_VERSION` override, remove it or set it to `24.13.0`.

4. Add environment variables in Render:

| Variable | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string, including the intended database |
| `JWT_SECRET` | A long random secret generated for this deployment |
| `GITHUB_TOKEN` | Optional server-side token for GitHub API requests |

`config/custom-environment-variables.json` maps these variables to the existing `config.get('mongoURI')` and `config.get('jwtSecret')` calls. Do not upload `config/default.json`, use React-prefixed secrets, or put credentials in Git. You do not need to set `PORT`; the server already uses Render's supplied port.

Generate a JWT secret locally, then paste the output only into Render's secret setting:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. In the Render service, open **Connect > Outbound**. Add all listed CIDR ranges to MongoDB Atlas's **Network Access** allowlist. Use a dedicated database user with access limited to the application's database. Avoid opening access to all IPs.
6. Create/deploy the service. If the first attempt starts before the Atlas allowlist is ready, redeploy after saving the allowlist.
7. Look for `MongoDB Connected...` and `Server started on port ...` in the logs.
8. Open the assigned `https://...onrender.com` URL. Check login, profiles, posting, and a direct refresh on `/profiles`.

The frontend's relative `/api` URLs now work on the same service: no separate frontend host, CORS configuration, or production localhost proxy is needed. Keep the development proxy unchanged for local work.

Free web services sleep after 15 minutes without traffic; the next visit can take about a minute to wake them. Free instances are intended for previews/hobby projects rather than production workloads.

Official references: [Express deployment](https://render.com/docs/deploy-node-express-app), [Node versions](https://render.com/docs/node-version), [outbound IP ranges](https://render.com/docs/outbound-ip-addresses), and [free service limitations](https://render.com/docs/free).

## Troubleshooting

- **Backend does not start:** check MongoDB availability, the connection string, and Atlas permissions. Check that `config/default.json` exists and contains valid JSON.
- **API requests fail:** confirm the backend is running on port `5000`. If you change `PORT`, also update the frontend development proxy.
- **Unauthorized responses:** log in again and use the returned JWT in the `x-auth-token` header when testing the API manually.
- **JSON fields appear missing:** select a raw JSON body in your API client and use `Content-Type: application/json`.
- **GitHub repositories do not load:** check the username and network connection; retry later if GitHub has rate-limited the request.
- **Dependency conflicts:** use the committed lockfiles with `npm ci` in both projects. Avoid replacing packages with older course versions or bypassing peer dependency checks with `--force`.

## Acknowledgements

Built as a learning implementation of [MERN Stack Front To Back: Full Stack React, Redux & Node.js](https://github.com/PacktPublishing/MERN-Stack-Front-To-Back-Full-Stack-React-Redux-and-Node.js), with the [DevConnector reference project](https://github.com/bradtraversy/devconnector_2.0) as a guide.
