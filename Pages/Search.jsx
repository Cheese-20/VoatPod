import "../Styles/Search.css";
import { PodNavigation } from "../Components/navigation";
import { useState, useMemo } from "react";
import { useData } from "../config/Data";
import { PodcastCard } from "../Components/PodcastCard";
import Fuse from "fuse.js";

const formatDate = (value) => {
  if (!value) return "Unknown";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const SearchPod = () => {
  const [search, setSearch] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [sortOption, setSortOption] = useState("title-asc");
  const searchData = useData();

  const fuse = useMemo(
    () =>
      new Fuse(searchData, {
        keys: ["title", "description"],
        includeScore: true,
      }),
    [searchData]
  );

  const searchResults = useMemo(() => {
    if (!search) return searchData;
    const results = fuse.search(search);
    return results.map((result) => result.item);
  }, [fuse, search, searchData]);

  const sortedResults = useMemo(() => {
    const source = isSearched ? searchResults : searchData;
    return [...source].sort((a, b) => {
      if (sortOption === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortOption === "date-newest") {
        return new Date(b.updated) - new Date(a.updated);
      }
      if (sortOption === "date-oldest") {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0;
    });
  }, [searchData, searchResults, isSearched, sortOption]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setIsSearched(value.trim().length > 0);
  };

  const handleSearchClick = () => {
    setIsSearched(search.trim().length > 0);
  };

  const isLoading = !searchData || searchData.length === 0;

  if (isLoading)
    return (
      <div className="search">
        <PodNavigation />
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    );

  return (
    <div className="search">
      <PodNavigation />

      <div className="SBox">
        <input
          type="text"
          placeholder="Search..."
          className="SearchBox"
          value={search}
          onChange={handleSearchChange}
        />
        <img
          src="../assets/searchIcon.png"
          alt="Search"
          className="SearchButton"
          onClick={handleSearchClick}
        />
      </div>

      <div className="filter-panel">
        <div className="filter-field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
            <option value="date-newest">Date uploaded (newest)</option>
            <option value="date-oldest">Date uploaded (oldest)</option>
          </select>
        </div>
      </div>

      <div className="SearchResults">
        {sortedResults.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            id={podcast.id}
            img={podcast.image}
            title={podcast.title}
            description={podcast.description}
            seasons={podcast.seasons}
            genres={podcast.genres}
          />
        ))}
      </div>
    </div>
  );
};

 