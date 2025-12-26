// const top_songs = [
//   { name: "Believer", artist: "Imagine Dragons" },
//   { name: "Shape of You", artist: "Ed Sheeran" },
//   { name: "Halo", artist: "Beyoncé" },
//   { name: "Blinding Lights", artist: "The Weeknd" },
//   { name: "Viva La Vida", artist: "Coldplay" },
//   { name: "Rolling in the Deep", artist: "Adele" },
//   { name: "Sugar", artist: "Maroon 5" },
//   { name: "Counting Stars", artist: "OneRepublic" },
//   { name: "Shake It Off", artist: "Taylor Swift" },
//   { name: "Circles", artist: "Post Malone" },
// ];
const top_songs = localStorage.getItem("top-songs")
  ? JSON.parse(localStorage.getItem("top-songs"))
  : [
      { name: "Believer", artist: "Imagine Dragons" },
      { name: "Shape of You", artist: "Ed Sheeran" },
      { name: "Halo", artist: "Beyoncé" },
      { name: "Blinding Lights", artist: "The Weeknd" },
      { name: "Viva La Vida", artist: "Coldplay" },
      { name: "Rolling in the Deep", artist: "Adele" },
      { name: "Sugar", artist: "Maroon 5" },
      { name: "Counting Stars", artist: "OneRepublic" },
      { name: "Shake It Off", artist: "Taylor Swift" },
      { name: "Circles", artist: "Post Malone" },
    ];

const updateSongsInList = (songs_arr, el) => {
  if (el) {
    el.innerHTML = songs_arr
      .map(
        (song) =>
          `<li class="top-song__item">${song.artist} — ${song.name}</li>`
      )
      .join("");
  }
};

updateSongsInList(top_songs, document.querySelector(".top-songs__list"));

if (document.querySelector(".song-search__button")) {
  document
    .querySelector(".song-search__button")
    .addEventListener("click", (e) => {
      const result = top_songs.filter((top_song) =>
        `${top_song.artist} ${top_song.name}`
          .toLowerCase()
          .includes(
            document.querySelector(".song-search__input").value.toLowerCase()
          )
      );
      const resultListEl = document.querySelector(".song-search__result");
      resultListEl.innerHTML = "";
      if (result.length) {
        updateSongsInList(result, resultListEl);
        document.querySelector(".song-search__mini-title").innerHTML =
          "Found songs:";
      } else {
        document.querySelector(".song-search__mini-title").innerHTML =
          "Sorry, haven't found any song";
      }
    });
}

if (document.querySelector(".add-song__section")) {
  document.querySelector(".add-song__button").addEventListener("click", () => {
    const nameVal = document.querySelector(".song-name__input").value.trim();
    const artistVal = document
      .querySelector(".song-artist__input")
      .value.trim();
    if (
      top_songs.find(
        (top_song) => top_song.name.toLowerCase() == nameVal.toLowerCase()
      ) == undefined
    ) {
      top_songs.push({
        name: nameVal,
        artist: artistVal,
      });
      localStorage.setItem("top-songs", JSON.stringify(top_songs));
      document.querySelector(".add-song__result").innerHTML =
        "New song successfully added!";
    } else {
      document.querySelector(".add-song__result").innerHTML =
        "You can't add a song with the same title that's already in the playlist.";
    }
  });
}
