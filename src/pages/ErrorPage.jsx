export default function ErrorPage() {
    return (
<div className="h-full">

<div className="h-screen">
    
      <>
        
        <main
          className="min-h-full bg-cover bg-top sm:bg-top"
          style={{
            backgroundImage:
              'url("https://i.imgur.com/SDOVgZI.jpg")',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-base font-semibold text-black text-opacity-50">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Uh oh! I think you’re lost.</h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
      </>
</div>
</div>
    )
  }
  