<img align="left" width="300" height="300" src="https://github.com/wonderlogic/knightly-gazette/assets/121211185/20b80b8c-590f-497b-9eab-8053de902b4a">
<h1>Knightly Gazette</h1>
<h2>Welcome to the Knightly Gazette, your one-stop source for all things Ateneo de Davao University. Stay informed with the latest news, events, and stories that matter most to the Blue Knights community. Join us in celebrating the spirit of excellence and camaraderie!</h2>
<br />
<br />
<br />

## Stack

- Next.js
- Prisma ORM with SQLite
- TailwindCSS
- daisyUI
- next-themes
- Jest

<br />

## Getting Started

First, install Git at https://git-scm.com/downloads

Install Node.js at https://nodejs.org/en/download (choose LTS)

Clone the repository:
```bash
git clone https://github.com/wonderlogic/knightly-gazette.git
cd knightly-gazette
```

Install the dependencies by running:
```bash
npm install
```

Then, rename the `.env.example` file to `.env`

![envExample](https://github.com/wonderlogic/knightly-gazette/assets/121211185/a40fd756-a1d9-41f8-8c15-eff9f663f9f3)

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br />

## Seeding the database

The repository already has a seeded database. But, if you want to customize it, you can edit the `seed.js` inside the `prisma` folder.

Once done, you can delete the `migrations` folder and `dev.db`

Then, run:
```bash
npx prisma migrate dev --name init
```

<br />

## Testing

To run the test suites, do the following:
```bash
npm run test
```

Enter `a` if necessary to run all test suites

![testSuites](https://github.com/wonderlogic/knightly-gazette/assets/121211185/fd791fb5-6bb5-47db-9a08-d8322434d810)

