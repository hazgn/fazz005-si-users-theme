import { defineStore } from "pinia";

export const themes = defineStore("themes", {
  state: () => ({
    themes: {
      name: localStorage.getItem("themeName") || "Light",
      data: JSON.parse(localStorage["themeData"] || null) || {
        name: "Light",
        headerColor: "#bdc3c7",
        headerTextColor: "#2c3e50",
        detailColor: "#ffffff",
        detailTextColor: "#2c3e50",
      },
    },
  }),
  actions: {
    changeThemes(payload) {
      this.themes.name = payload.name;
      this.themes.data = payload;

      localStorage.setItem("themeName", payload.name);
      localStorage["themeData"] = JSON.stringify(payload);
    },
  },
  getters: {
    themeName(state) {
      return state.themes.name;
    },
    themeData(state) {
      return state.themes.data;
    },
  },
});
