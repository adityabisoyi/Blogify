# Blogify

MERN Blogify is a full-stack blogging platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a seamless experience for users to create, manage, and publish blog posts. This project also integrates AWS S3 for storing images and media files securely.

## Technology
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Features

- User authentication: Register, login, and manage user profiles securely.
- Role-based access control: Define user roles and permissions for accessing different parts of the application.
- Content management: Create, edit, and manage blog posts with Markdown support for rich formatting.
- AWS S3 integration: Seamless integration with AWS S3 bucket for storing and serving images and media files.
- Responsive design: Mobile-friendly user interface built with React.js for optimal viewing experience.
- Author dashboard: View all your blogs to make changes.

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/adityabisoyi/Blogify.git
```

### 2. Install dependencies for the server and client:
```bash
npm run install-server
```
```bash
npm run install-client
```

### 3. Setup the server-side environment variables

- Create a `.env` file in the `server` directory and add necessary environment variables such as MongoDB URI, AWS credentials, JWT secret, User email and App password.
```bash
PORT = YOUR_PORT_NUMBER
MONGO_URI = "YOUR_MONGODB_URI"
JWT_SECRET = "RANDOM_CHARACTER_STRING"
BUCKET_NAME = "S3_BUCKET_NAME"
BUCKET_REGION = "S3_BUCKET_REGION"
BUCKET_ACCESS_KEY = "S3_BUCKET_ACCESS_KEY"
BUCKET_SECRET_KEY = "S3_BUCKET_SECRET_KEY"
USER_EMAIL = "EMAIL_ADDRESS"
APP_PASSWORD = "APP_PASSWORD"
FRONTEND_URL = "FRONTEND_URL"
```
- If you are running the react app on local machine then the frontend url will be
```
http://localhost:3000
```
- For the mongodb uri you can either use the mongodb atlas connection string or if you are using local mongodb database then the url will be
```
mongodb://localhost:27017
```
> [!NOTE]  
> If you are on windows 11 then replace the `localhost` with `127.0.0.1`.
- You can get the S3 bucket access key and secret key after selecting the generate access token.
Refer this [youtube video](https://youtu.be/eQAIojcArRY?si=R6nHn95qEpBjtt29) for creating the S3 bucket and getting the keys.
- For the node mailer to work you need to add your Email address and add app password. For the app password you can follow these [steps](https://support.google.com/mail/answer/185833?hl=en) .

### 4. Setup the client-side environment variables

```bash
REACT_APP_BASE_URL = "YOUR_SERVER_URL"
```
- If you are running the server on your local machine the url will be:
> [!Note]
> Replace the PORT_NUMBER with the PORT number that you have used above.
```bash
http://localhost:[PORT_NUMBER]/api
```

### 5. Run the project:
In the root directory run the following commands
```bash
npm run start-server
```
```bash
npm run start-client
```

- You can also run the server and client from their directories by firing the `npm run start` command.
- If the project doesn't open directly on the browser. Navigate to the link below.
```
http://localhost:3000
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

### Please give a :star: if you like the project.
