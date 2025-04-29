import Link from "next/link";

function NotFoundPage() {
  return (
    <>
      <div className="min-h-full px-4 py-4 mx-auto  sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="mt-5 content-center mx-auto">
            <div className="flex mt-6">
              <p className="text-4xl font-extrabold text-blue600 sm:text-5xl">
                Ups
              </p>
              <div className="ml-6">
                <div className="pl-6 border-l border-gray500">
                  <h2 className="text-3xl font-bold tracking-tight text-gray900 dark:text-white sm:text-4xl">
                    Something went wrong!
                  </h2>
                  <p className="mt-1 text-lg text-gray500 dark:text-white">
                    404 the page you solicited did not get founded
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray600 dark:text-white">
                    <Link href={"/"}> Go back Home! </Link>
                  </p>
                </div>
                <div className="flex mt-10 space-x-3 sm:pl-6"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
