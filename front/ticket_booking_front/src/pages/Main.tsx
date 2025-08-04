function Main() {
    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full min-h-screen
                      bg-white rounded-4xl">
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => { window.location.href = '/transport/'; }}>
              Transports
          </button>
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => { window.location.href = '/booking/list'; }}>
              Bookings
          </button>
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 mt-5 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => {
                  window.location.href = '/login/';

                }
              }>
              Logout
          </button>
      </div>
    );
}

export default Main;