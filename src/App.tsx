import SettNav from "./components/SettNav";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import FavouritesDesktop from "./components/FavouritesDesktop";

const App = () => {
  return (
    <>
      <SettNav />
      <main className="flex flex-row pt-14 px-5 pb-3 relative w-full max-w-[1440px] min-h mx-auto">
        <FavouritesDesktop />
        <section className="h-full w-full max-w-[640px] mx-auto pb-1.5">
          <div>
            <p className="text-neutral-400 mb-8 text-2xl text-center">
              Type a word to look up in...
            </p>
            <Form />
            <SimilarToList />
          </div>
          <div className="mt-7">
            <List />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
