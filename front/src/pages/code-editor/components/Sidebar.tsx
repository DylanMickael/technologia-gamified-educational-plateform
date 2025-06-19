import ProgramList from "./ProgramList";

const Sidebar = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="300" className="rounded-2xl w-full bg-gradient-to-b from-white via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-5 min-w-40 md:min-w-56 m-2 md:m-5 shadow-lg flex flex-col items-center justify-start p-4 md:p-6 max-w-lg overflow-y-auto">
      <h2 className="text-2xl font-bold text-pink-900 dark:text-pink-200 mb-6 text-center flex items-center gap-2">
        <span role="img" aria-label="robot">🤖</span> Programme Robotique
      </h2>
      <ProgramList />
    </div>
  );
};

export default Sidebar;