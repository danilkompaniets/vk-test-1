import {RepositoryList} from "@/components/repository-list.tsx";
import {SearchBar} from "@/components/search-bar.tsx";

function App() {
    return (
        <div className={"min-h-screen bg-zinc-800 relative"}>
            <main className={"container mx-auto flex gap-y-4 flex-col items-center"}>
                <h1 className={"text-center text-white text-2xl mt-12"}>
                    Blazingly Fast Github ⚡️
                </h1>

                <p className={"text-gray-300"}>
                    Find top repos here and use it to improve your skills as a developer
                </p>

                <SearchBar
                    placeholder="Search for repositories..."
                    buttonText="Search"
                    containerClassName="w-full max-w-3xl mb-4"
                />

                <RepositoryList/>
            </main>
        </div>
    )
}

export default App
