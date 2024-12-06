export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {/* Heading */}
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-600">
          Welcome to To-Do
        </span>{" "}
        Organizer
      </h1>

      {/* Subtitle */}
      <p className="mb-2 text-center text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">
        Kindly sign up or log in to get started!
      </p>
      <p className="mb-8 text-center text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">
        Your tasks. Organized. Simplified.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex gap-4">
        <a
          href="/signup"
          className="px-6 py-3 text-lg font-medium text-white transition-transform duration-300 ease-in-out bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg hover:scale-105"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="px-6 py-3 text-lg font-medium text-gray-900 transition-transform duration-300 ease-in-out bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg hover:scale-105 dark:text-white dark:from-gray-700 dark:to-gray-900"
        >
          Log In
        </a>
      </div>
    </div>
  );
}


