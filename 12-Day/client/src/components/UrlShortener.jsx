import React, { useEffect, useState } from "react";
import {
  Copy,
  Trash2,
  ExternalLink,
  Link2,
  MousePointerClick,
} from "lucide-react";
import axios from "axios";

const UrlShortener = () => {
  const [urls, setUrls] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [inputVal, setinputVal] = useState("");

  const getAllLinks = async () => {
    try {
      const res = await axios.get("/api/url/");

      setUrls(res.data.data.urls);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  // Copy short URL
  const handleCopy = async (shortCode) => {
    try {
      const shortUrl = `${window.location.origin}/api/${shortCode}`;

      await navigator.clipboard.writeText(shortUrl);

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleChange = (data) => {
    setInputData({ [data.target.name]: data.target.value });
    setinputVal(data.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/url", inputData);

    setinputVal("");
    getAllLinks();
  };

  const handleDelete = async (code) => {
    await axios.delete(`/api/url/${code}`);

    getAllLinks();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Toast */}
      {showToast && (
        <div className="fixed right-5 top-5 z-50 rounded-xl border border-green-500/20 bg-slate-900 px-4 py-3 text-sm text-green-400 shadow-xl">
          ✓ Link copied successfully
        </div>
      )}

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <Link2 size={19} />
            </div>

            <h1 className="text-xl font-bold tracking-tight">
              Short<span className="text-blue-500">ly</span>
            </h1>
          </div>

          <div className="hidden text-sm text-slate-400 sm:block">
            URL Shortener
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Your shortened URLs
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Create, manage and track all your shortened links.
          </p>
        </div>

        {/* Create URL */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-slate-900 px-4">
              <Link2 size={18} className="mr-3 text-slate-500" />

              <input
                onChange={handleChange}
                value={inputVal}
                name="url"
                type="text"
                placeholder="Paste your long URL here..."
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Shorten URL
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total URLs */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Link2 size={20} />
            </div>

            <p className="text-sm text-slate-400">Total URLs</p>

            <h3 className="mt-1 text-2xl font-bold">{urls.length}</h3>
          </div>

          {/* Total Clicks */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <MousePointerClick size={20} />
            </div>

            <p className="text-sm text-slate-400">Total Clicks</p>

            <h3 className="mt-1 text-2xl font-bold">
              {urls.reduce((total, url) => total + url.countClicks, 0)}
            </h3>
          </div>

          {/* This Month */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <ExternalLink size={20} />
            </div>

            <p className="text-sm text-slate-400">This Month</p>

            <h3 className="mt-1 text-2xl font-bold">{urls.length} URLs</h3>
          </div>
        </div>

        {/* URL List */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h3 className="font-semibold">All URLs</h3>

              <p className="mt-1 text-xs text-slate-500">
                Manage your shortened links
              </p>
            </div>

            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
              {urls.length} links
            </span>
          </div>

          {/* Desktop headings */}
          <div className="hidden grid-cols-[1.5fr_1fr_100px_140px] gap-5 border-b border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 md:grid">
            <span>Original URL</span>
            <span>Short URL</span>
            <span>Clicks</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          <div>
            {urls.map((url) => (
              <div
                key={url._id}
                className="border-b border-white/5 px-5 py-5 transition hover:bg-white/[0.025]"
              >
                <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_100px_140px] md:items-center md:gap-5">
                  {/* Original URL */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs text-slate-500 md:hidden">
                      Original URL
                    </p>

                    <a
                      href={`/api/${url.shortCode}`}
                      className="flex w-80 items-center gap-2"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                        <ExternalLink size={16} />
                      </div>

                      <p className="truncate text-sm text-slate-300 hover:text-blue-400">
                        {`${window.location.origin}/api/${url.shortCode}`}
                      </p>
                    </a>

                    <p className="mt-2 text-xs text-slate-600">
                      Created {new Date(url.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Short URL */}
                  <div>
                    <p className="mb-1 text-xs text-slate-500 md:hidden">
                      Short URL
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="truncate rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400">
                        {url.shortCode}
                      </span>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div>
                    <p className="mb-1 text-xs text-slate-500 md:hidden">
                      Clicks
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <MousePointerClick size={15} className="text-slate-500" />

                      <span className="font-semibold">{url.countClicks}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <p className="mb-1 text-xs text-slate-500 md:hidden">
                      Actions
                    </p>

                    <div className="flex justify-start gap-2 md:justify-end">
                      {/* Copy */}
                      <button
                        title="Copy URL"
                        onClick={() => handleCopy(url.shortCode)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        <Copy size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(url.shortCode)}
                        title="Delete URL"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 text-xs text-slate-500">
            <span>
              Showing {urls.length} of {urls.length} URLs
            </span>

            <div className="flex gap-2">
              <button className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5">
                Previous
              </button>

              <button className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UrlShortener;
