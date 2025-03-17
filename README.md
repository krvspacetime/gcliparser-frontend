<div align="center">Google Sheets Clipboard Parser</div>
</div>

## Overview

I made this project as a tool to make copying data from a Google Sheets spreadsheet a breeze. I worked as an intern in a design-and-build engineering company where I one of my tasks was to talk to suppliers about material specifications and make a report (basically a list of details from each supplier that I talk to each day) and send them to my supervisor. This supervisor has a very particular instruction on how he wants the data formatted when sent to him, so I needed this tool to make the process more efficient.

## Features

- `Authentication`: via the gspread library
  <img alt="Authentication page screenshot" src="https://media-hosting.imagekit.io//e8741958cc7a40b5/screencapture-localhost-5173-auth-2025-03-17-10_17_25.png?Expires=1836785873&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gB99yFt8V-Z02NbEXQESh0-ow8-bGUsyoRLxbOvMA92tOyyV70eW4VGxsHR4qzZ3CMtq0sbmtVhmjBEKsMJVxroRcRyseDatUe7lqrr7UYujqlQVoyGfHSceW8lknWyCFyl92Dz7GLfxF-9n~7s-9XQpVQX3W-4kSnmvD4eUDRnzYLQ1IHEdWnCPRcW~nHDll8rNLHirPFJeiMFiNi6zZA1ogQgwWJs2DT5kW0QsH2UVtTKKDJ80SHZKBpBV2iCw9g4ieUA2IkNzTpwSAbeu29f0tHePDW91xGi7nyumE2K0WvgZgi2lB8rpMSU5RwNM-8PmLU9dWX6CVrk9XDEdhw__" 
          width="800"
          />
  - Looks for a file called `credentials.json` (generate this file by following gspread docs)
  - If the file is not found, the user is prompted to upload a credentials file otherwise gspread will throw an error
  - If the file is found, use the file to authenticate via gspread and if successful, the user is redirected to the app and bypasses the protected route
- `CRUD`: via the FastAPI backend
  <div class="flex justify-center">
    <img alt="CRUD ADD screenshot" src="https://media-hosting.imagekit.io//634450b7fcc14cef/screencapture-localhost-5173-2025-03-17-10_22_33.png?Expires=1836786178&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jF5bdc7LQliJV3mStEqPYom8urDH69OwZU6njDY5PfnGH8zxACgYPUzaCCWoIONThkleQYOBGhgfTWRv1Xhx~yCFS2JFCl3TZWvrgLsswjjSpU6n1Wo3n8UqZexI6YWs~cRZAF7cT-dp7yD9wDVsL3HYSL9rS-AOWzzR9ML61tvLH~APqxDnvsfyP27--47ikpiUe0ezpBQwWSg5j7d8iRDvPso0HJADfSon0k-dcYjmTY844W3kJO41YapbaXTmzpLkHRj15CRpifXRJXSVj4mRR2U0s9TWegdMr85jJYEbcDbca~HYD~GV9IwDjkkSw2jMDmctZgwVmOg4A0dt1Q__" 
    width="800"
    />
    <img alt="CRUD DELETE screenshot" src="https://media-hosting.imagekit.io//83bcf39f37fa491e/Fast%20Screenshot%202025-03-17%20at%2010.24.33.png?Expires=1836786285&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=LX8d-JtRoBkrE0D8ZGblrx-MEwKvPXo~gB5IkTJPTA8GcvXVcBImDHQjOStULm24pxirg76509cpHlmy8vzK1lfhzXNtgz2~JZglRQrcIfCbpzgQZW1mMBGXihXwRgyURQA7zd1Y3~TuPlAy8iUT2C37MSgxijOgO8-rJdby6rBBNPT2Qjm4K--uNbf3LPD8DnMYNPorsERX5Oig76VnxOSUj0XxAB4y0eBOHsMbwNNKdGeUZ2NABLS6w5wLhVBORtpa2r1hyKr8id~-lmZs~v~i2NipflAfmHjLE5PtbyIybncrjITzOG6bcYvuGxNnxivVlYEWFRAfdjHHWRs-zg__" 
    width="800"
    />
    </div>
  - Add and delete sheets
  - _Note: Make sure the sheet title completely matches the name of the sheet in your Google Sheets library_

- `List virtualization`: via the react-window library
- `Data filtering`:
  <div class="">
    <img alt="Data filtering screenshot" src="https://media-hosting.imagekit.io//2de2a36466f2417f/Fast%20Screenshot%202025-03-17%20at%2010.48.02.png?Expires=1836787699&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wIaGYzq5Ck514Y~SRbZlyAUDH6H7Kt7C-lhVtjkq4sYpestdM0HMuDvFmUYq3QTBSuYLXUFjX2d1cgf1NPB7Rdi2GnXFeril4LSa4NX~gDQF8xNRRz1rq~NoRJBq8GiMZM0a3bb8AkpsxoidmB25tRmgXI0velc0Ut~jjRbOqdXnGo4ShJ6Uo3CtvZuzcVbK51nMInfYUULemUehK0o~szZDPz7~ozRW~hUStpVU1yl0AJBJU7hxwO2sO2ibjuNXIJIWl6qNre0YX3cfMT~brCLxXRUq7zN4SI09-dwpVZxet1iqFn5oyArpUklXsMrbO8skZ9-a9JKONv-xr-Dxjg__" 
    width="800"
    />
    <img alt="Search filter screenshot" src="https://media-hosting.imagekit.io//465c7dd4289b4c78/Fast%20Screenshot%202025-03-17%20at%2010.50.25.png?Expires=1836787837&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XxfD-u-9Fmn61ea7itxtnKo26KwsyX4zQqO1PiXRz5~WQgNoGwTrhq~Z~QeFZ-c71o8iqUvaFM1D8k-0LiTMEG5IZdBy5n3j~eYUaDxihSNHJR2e0oUqjLH7z0tiKxSQiyn1-i6Jwcqsw1UZx9rtevC0rksXA6BAFaxWlvmK4tjvHeYd-gZWOGpZN4Oh5fUfU2tJ51RHQGIklX9kvA5-ojCED2yV~K4~SN4BUhQuEr7B2M4zqMrhKL246t6~nmrLM-~VmFJe5WsGFea7xDAxfVqFYMc0OQtBLLKEheIj2kKoO7Yt6GmYY2kFCGECgVEb5Ts02QGnhToFwo5m5qlrRA__" 
    width="800"
    />
  </div>
  - Filter column headers
  - Search functionality to quickly select rows
- `Clipboard functionality`
  <div >
  <img  alt="Clipboard functionality screenshot" src="https://media-hosting.imagekit.io//b6f974a7f5c64ff7/Fast%20Screenshot%202025-03-17%20at%2010.54.38.png?Expires=1836788087&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uh62X4MYPglQgx9NrqDTdYBEdc18zWrGVzfwwOLtC6iX0jK~2~kMmpqzdlr1wSaLogfwjnaj4GyY5D7yVhZ0iIxWAzqhWX9PlwNGzdBT0UPCfjRa7YPBczNIev0Y226RxjFpASxWUiKVtWH3WfOoKP09z68MMg6Kun-gUIw5FGfXFfLVlc~XYhRZ1pDgTTK7bwr~TFSyfOtbHR76z9ZzeJJYiH1oreIppBJnbcjpZhO5DTE5j9IM8GG2w0jYEymosoNF-w3Qc2ewx524U32l7O-jpfk2l-U~sgpiQACbajnmaH7dhb1byEMnQrnzPEMYfwBX5DF1nwdFHO4mZ7TVsA__" 
      width="800"
  />
  </div>
- `Caching`: via file system
  - Will always look for cached data first before making a new request if no cached data is found

## Technologies Used

- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **FastAPI**: A modern web framework for building APIs with Python, known for its fast performance and ease of use.
- **gspread**: A Python library that allows for easy interaction with Google Sheets.
- **react-window**: A library for efficiently rendering large lists and tabular data by only rendering what is visible on the screen.

## Project Layout

- `src/`: Contains all the source code for the React application.
  - `components/`: Contains reusable components used throughout the application.
    - `credentials/`: Contains components specific to the credentials functionality.
    - `sheets/`: Contains components specific to the sheets functionality.
    - `sidebar/`: Contains components specific to the sidebar functionality.
  - `atoms/`: Contains atoms used for state management.
  - `hooks/`: Contains custom hooks used throughout the application (`useOutsideClick`, `useAuth`)
  - `styles/`: Contains styles used throughout the application.
  - `types/`: Contains Typescript interfaces and types used throughout the application.

## Backend

This is the Github repo [link](https://github.com/krvspacetime/itc-sheets) for the backend code used by this project.

### Packages and libraries used:

- `FastAPI`: For the REST API
- `gspread`: For interacting with the Google Sheet and OAuth
- `pandas`: For turning the spreadsheet data into a dataframe
- `dot-env`: For the environmental variables

## NPM Packages

- `react`: The core library for building the user interface.
- `react-dom`: Provides DOM-specific methods that can be used at the top level of your app.
- `react-window`: Used for optimizing the rendering of large lists and tables.
- `mantine`: React component library.
- `Tailwind`: A CSS framework for rapidly building modern websites without ever leaving your HTML.

## Packages Used

This repository is a template using the following packages:

### Dependencies:

- `React`: ^18.3.1
- `React DOM`: ^18.3.1
- `React Router DOM`: ^7.1.3
- `@mantine/core`: ^7.16.1
- `@mantine/hooks`: ^7.16.1
- `@mantine/notifications`: ^7.16.2
- `Tailwind CSS`: ^4.0.0
- `react-window`: ^1.8.11
- `react-icons`: ^5.4.0

Feel free to customize it as per your needs!
