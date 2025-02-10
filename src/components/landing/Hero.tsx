import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="font-semibold text-indigo-600">New</span>
              <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" />
              <a href="#" className="flex items-center gap-x-1">
                See what's new
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your AI-Powered Financial Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Warri helps you manage your finances with the power of artificial
            intelligence. Track expenses, set budgets, and reach your financial
            goals effortlessly.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button
              className="bg-indigo-600 hover:bg-indigo-500"
              size="lg"
              onClick={() => (window.location.href = "/signup")}
            >
              Get started
            </Button>
            <Button variant="ghost" size="lg">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <img
            className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
            src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  );
}
