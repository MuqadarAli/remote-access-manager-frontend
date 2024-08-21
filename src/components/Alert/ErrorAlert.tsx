import { CheckCircleIcon, } from '@heroicons/react/20/solid';

export default function ErrorAlert() {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            aria-hidden="true"
            className="h-5 w-5 text-red-400"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">
            Something went wrong. Please try again later or contact support if
            the problem persists.
          </p>
        </div>
        {/* <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
