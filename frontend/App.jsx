import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";

function Home({ summary, pdfUrl }) {
  return (
    <>
      <MainContent summary={summary} pdfUrl={pdfUrl} />
      <Footer />
    </>
  );
}

export default function App() {
  const [summary, setSummary] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header
          onUploadComplete={(newSummary, newPdfUrl) => {
            setSummary(newSummary);
            setPdfUrl(newPdfUrl);
          }}
        />

        <main className="min-h-[calc(100vh-64px)]"> 
          <Routes>
            <Route path="/" element={<Home summary={summary} pdfUrl={pdfUrl} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Home summary={summary} pdfUrl={pdfUrl} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
