/** @format */

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MangaDetailsPage from "./pages/MangaDetailsPage";
import ReaderPage from "./pages/ReaderPage";
import NotFoundPage from "./pages/NotFoundPage";
import { MangaProvider } from "./contexts/mainContext";
import { DetailsProvider } from "./contexts/detailsContext";
import MainLayout from "./components/layout/MainLayout";
function App() {
    return (
        <MangaProvider>
            <DetailsProvider>
                <MainLayout>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/Home' element={<HomePage />} />
                        <Route
                            path='/mangaDetails/:id'
                            element={<MangaDetailsPage />}
                        />
                        <Route
                            path='/read/:id/:mangaId'
                            element={<ReaderPage />}
                        />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </MainLayout>
            </DetailsProvider>
        </MangaProvider>
    );
}

export default App;
