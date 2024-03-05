"use client"; // This is a client component 👈🏽

import NavigationSidebar from "./components/NavigationSidebar";

export default function Home() {

  return (
    <main>
        <NavigationSidebar/>
      <div className="d-flex justify-content-center align-items-center">
        <h1>Выберите Таблицу</h1>
      </div>
    </main>
  );
}
