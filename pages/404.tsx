import Link from "next/link";

export default function Custom404() {
  return (
    <section className="h-full min-h-[531px] bg-white dark:bg-gray-900">
      <div className="w-full h-full flex justify-center items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            href="/"
            className="btn inline-flex text-primary bg-primary-600 my-4">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
